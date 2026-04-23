import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const brand = formData.get("brand") as string;
    const type = formData.get("type") as string;
    const model = formData.get("model") as string;
    const year = formData.get("year") as string;
    const pricePerDay = formData.get("pricePerDay") as string;
    const seats = formData.get("seats") as string;
    const hp = formData.get("hp") as string;
    const transmission = formData.get("transmission") as string;
    const fuelType = formData.get("fuelType") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;
    const mileage = formData.get("mileage") as string;

    const featured = formData.get("featured") === "true";
    const available = formData.get("available") !== "false";

    const imageEntry = formData.get("image");

    if (
      !brand ||
      !type ||
      !model ||
      !year ||
      !pricePerDay ||
      !seats ||
      !hp ||
      !transmission ||
      !fuelType
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!(imageEntry instanceof File) || imageEntry.size === 0) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const parsedYear = Number(year);
    const parsedPricePerDay = Number(pricePerDay);
    const parsedSeats = Number(seats);
    const parsedHp = Number(hp);
    const parsedMileage = mileage ? Number(mileage) : null;

    if (
      Number.isNaN(parsedYear) ||
      Number.isNaN(parsedPricePerDay) ||
      Number.isNaN(parsedSeats) ||
      Number.isNaN(parsedHp) ||
      (parsedMileage !== null && Number.isNaN(parsedMileage))
    ) {
      return NextResponse.json(
        { error: "Invalid numeric values" },
        { status: 400 }
      );
    }

    const bytes = await imageEntry.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "cars");
    await mkdir(uploadsDir, { recursive: true });

    const extension = path.extname(imageEntry.name);

    const slugify = (value: string) =>
      value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const safeBrand = slugify(brand);
    const safeModel = slugify(model);

    const safeFileName = `${safeBrand}-${safeModel}-${parsedYear}-${Date.now()}${extension}`;
    const filePath = path.join(uploadsDir, safeFileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/cars/${safeFileName}`;

    const car = await prisma.car.create({
      data: {
        brand,
        type,
        model,
        year: parsedYear,
        pricePerDay: parsedPricePerDay,
        seats: parsedSeats,
        hp: parsedHp,
        transmission,
        fuelType,
        image: imageUrl,
        description: description || null,
        featured,
        color: color || null,
        mileage: parsedMileage,
        available,
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing car ID" },
        { status: 400 }
      );
    }

    const car = await prisma.car.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
      console.error("CAR DELETE ERROR:", error);
      return NextResponse.json(
        { error: "Something went wrong while deleting the car" },
        { status: 500 }
      );
  }
}