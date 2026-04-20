import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      brand,
      type,
      model,
      year,
      pricePerDay,
      seats,
      hp,
      transmission,
      fuelType,
      image,
      description,
      featured,
      color,
      mileage,
      available,
    } = body;

    if (
      !brand ||
      !type ||
      !model ||
      !year ||
      !pricePerDay ||
      !seats ||
      !hp ||
      !transmission ||
      !fuelType ||
      !image
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const car = await prisma.car.create({
      data: {
        brand,
        type,
        model,
        year: Number(year),
        pricePerDay: Number(pricePerDay),
        seats: Number(seats),
        hp: Number(hp),
        transmission,
        fuelType,
        image,
        description: description || null,
        featured: featured ?? false,
        color: color || null,
        mileage: mileage ? Number(mileage) : null,
        available: available ?? true,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("CAR CREATE ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong while adding the car" },
      { status: 500 }
    );
  }
}