import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const rentalId = Number(id);

    if (Number.isNaN(rentalId)) {
      return NextResponse.json(
        { error: "Invalid rental id." },
        { status: 400 }
      );
    }

    await prisma.rental.delete({
      where: {
        id: rentalId,
      },
    });

    return NextResponse.json({
      message: "Rental deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE RENTAL ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete rental." },
      { status: 500 }
    );
  }
}