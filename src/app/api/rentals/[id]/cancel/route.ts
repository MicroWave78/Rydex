import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendCancellationEmail } from "@/lib/email";
import { Rank } from "@prisma/client";
import { getRankFromRentals } from "@/lib/rank";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(_request: Request, { params }: RouteContext) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Session expired. Please log in again." },
        { status: 401 }
      );
    }

    if (!session.user.active) {
      return NextResponse.json(
        { error: "This account is disabled." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const rentalId = Number(id);

    if (Number.isNaN(rentalId)) {
      return NextResponse.json(
        { error: "Invalid rental id." },
        { status: 400 }
      );
    }

    const rental = await prisma.rental.findUnique({
      where: {
        id: rentalId,
      },
    });

    if (!rental) {
      return NextResponse.json(
        { error: "Rental not found." },
        { status: 404 }
      );
    }

    if (rental.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not allowed to cancel this rental." },
        { status: 403 }
      );
    }

    if (rental.status === "CANCELLED") {
      return NextResponse.json(
        { error: "This rental is already cancelled." },
        { status: 400 }
      );
    }

    if (rental.status === "COMPLETED") {
      return NextResponse.json(
        { error: "Completed rentals cannot be cancelled." },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickup = new Date(rental.pickupDate);
    pickup.setHours(0, 0, 0, 0);

    if (pickup <= today) {
      return NextResponse.json(
        { error: "You can only cancel a rental before the pickup date." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedRental = await tx.rental.update({
        where: {
          id: rentalId,
        },
        data: {
          status: "CANCELLED",
        },
        include: {
          car: {
            select: {
              brand: true,
              model: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              username: true,
              rank: true,
            },
          },
        },
      });

      const totalRentals = await tx.rental.count({
        where: {
          userId: updatedRental.userId,
          status: {
            in: ["CONFIRMED", "ACTIVE", "COMPLETED"],
          },
        },
      });

      const newRank =
        updatedRental.user.rank === Rank.VIP
          ? Rank.VIP
          : getRankFromRentals(totalRentals);

      await tx.user.update({
        where: {
          id: updatedRental.userId,
        },
        data: {
          totalRentals,
          rank: newRank,
        },
      });

      return {
        updatedRental,
        totalRentals,
        newRank,
      };
    });

    try {
      await sendCancellationEmail({
        to: result.updatedRental.user.email,
        name: result.updatedRental.user.name || result.updatedRental.user.username,
        rentalId: result.updatedRental.id,
        carName: `${result.updatedRental.car.brand} ${result.updatedRental.car.model}`,
        pickupDate: result.updatedRental.pickupDate,
        returnDate: result.updatedRental.returnDate,
        pickupLocation: result.updatedRental.pickupLocation,
      });
    } catch (emailError) {
      console.error("CANCEL EMAIL ERROR:", emailError);
    }

    return NextResponse.json({
      message: "Rental cancelled successfully.",
      rental: result.updatedRental,
      totalRentals: result.totalRentals,
      rank: result.newRank,
    });
  } catch (error) {
    console.error("CANCEL RENTAL ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while cancelling the rental." },
      { status: 500 }
    );
  }
}