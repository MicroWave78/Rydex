import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "You must be logged in to leave a review." },
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
        { error: "This account is currently disabled." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { carId, rating, comment } = body;

    if (!carId || !rating || !comment?.trim()) {
      return NextResponse.json(
        { error: "Please add a rating and a review comment." },
        { status: 400 }
      );
    }

    const ratingNumber = Number(rating);
    const carIdNumber = Number(carId);

    if (
      Number.isNaN(carIdNumber) ||
      Number.isNaN(ratingNumber) ||
      ratingNumber < 1 ||
      ratingNumber > 5
    ) {
      return NextResponse.json(
        { error: "Invalid review data." },
        { status: 400 }
      );
    }

    const rentedCar = await prisma.rental.findFirst({
      where: {
        userId: session.user.id,
        carId: carIdNumber,
        status: {
          in: ["CONFIRMED", "ACTIVE", "COMPLETED"],
        },
      },
    });

    if (!rentedCar) {
      return NextResponse.json(
        { error: "You can only review cars that you rented." },
        { status: 403 }
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        carId: carIdNumber,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You already reviewed this car." },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        carId: carIdNumber,
        rating: ratingNumber,
        comment: comment.trim(),
      },
    });

    return NextResponse.json(
      {
        message: "Review submitted successfully.",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while submitting the review." },
      { status: 500 }
    );
  }
}