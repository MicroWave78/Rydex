import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const carId = Number(id);

    if (Number.isNaN(carId)) {
      return NextResponse.json(
        { error: "Invalid car id." },
        { status: 400 }
      );
    }

    const existingCar = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: "Car not found." },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    const brand = String(formData.get("brand") || "");
    const model = String(formData.get("model") || "");
    const type = String(formData.get("type") || "");
    const description = String(formData.get("description") || "");
    const pricePerDay = Number(formData.get("pricePerDay"));
    const seats = Number(formData.get("seats"));
    const hp = Number(formData.get("hp"));
    const transmission = String(formData.get("transmission") || "");
    const fuelType = String(formData.get("fuelType") || "");
    const year = Number(formData.get("year"));
    const color = String(formData.get("color") || "");
    const mileage = Number(formData.get("mileage") || 0);
    const featured = formData.get("featured") === "true";
    const available = formData.get("available") === "true";

    if (
      !brand ||
      !model ||
      !type ||
      !pricePerDay ||
      !seats ||
      !hp ||
      !transmission ||
      !fuelType ||
      !year
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    let imagePath = existingCar.image;

    const image = formData.get("image") as File | null;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "images", "cars");

      await mkdir(uploadDir, {
        recursive: true,
      });

      const safeFileName = image.name.replace(/[^a-zA-Z0-9.-]/g, "-");
      const fileName = `${Date.now()}-${safeFileName}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      imagePath = `/images/cars/${fileName}`;
    }

    const updatedCar = await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        brand,
        model,
        type,
        description,
        pricePerDay,
        seats,
        hp,
        transmission,
        fuelType,
        year,
        color,
        mileage,
        featured,
        available,
        image: imagePath,
      },
    });

    return NextResponse.json({
      message: "Car updated successfully.",
      car: updatedCar,
    });
  } catch (error) {
    console.error("UPDATE CAR ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update car." },
      { status: 500 }
    );
  }
}