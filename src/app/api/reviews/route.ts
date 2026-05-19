import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Invalid session." },
        { status: 401 }
      );
    }

    const userId = session.userId;

    const body = await request.json();

    const carId = Number(body.carId);
    const rating = Number(body.rating);
    const comment = String(body.comment || "").trim();

    if (!carId || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing review data." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const rental = await prisma.rental.findFirst({
      where: {
        userId,
        carId,
        status: "CONFIRMED",
      },
    });

    if (!rental) {
      return NextResponse.json(
        {
          error: "You can only review cars you rented.",
        },
        { status: 403 }
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId,
        carId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "You already reviewed this car.",
        },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId,
        carId,
        rating,
        comment,
      },
    });

    return NextResponse.json({
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create review." },
      { status: 500 }
    );
  }
}