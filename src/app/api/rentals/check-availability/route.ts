import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, pickupDate, returnDate } = body;

    if (!carId || !pickupDate || !returnDate) {
      return NextResponse.json(
        { error: "Missing availability details." },
        { status: 400 }
      );
    }

    const pickup = new Date(pickupDate);
    const dropoff = new Date(returnDate);

    if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
      return NextResponse.json(
        { error: "Invalid rental dates." },
        { status: 400 }
      );
    }

    if (dropoff <= pickup) {
      return NextResponse.json(
        { error: "Return date must be after pickup date." },
        { status: 400 }
      );
    }

    const overlappingRental = await prisma.rental.findFirst({
      where: {
        carId: Number(carId),
        status: {
          in: ["CONFIRMED", "ACTIVE"],
        },
        pickupDate: {
          lt: dropoff,
        },
        returnDate: {
          gt: pickup,
        },
      },
    });

    if (overlappingRental) {
      return NextResponse.json({
        available: false,
        message: "This car is already booked for the selected dates.",
      });
    }

    return NextResponse.json({
      available: true,
      message: "This car is available for the selected dates.",
    });
  } catch (error) {
    console.error("CHECK AVAILABILITY ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while checking availability." },
      { status: 500 }
    );
  }
}