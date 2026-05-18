import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Role, Rank } from "@prisma/client";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user id." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        _count: {
          select: {
            rentals: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    if (user._count.rentals > 0) {
      return NextResponse.json(
        {
          error:
            "This user has rentals. Delete their rentals first before deleting the user.",
        },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete user." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user id." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const role = String(body.role || "USER").trim().toUpperCase();
    const rank = String(body.rank || "BRONZE").trim().toUpperCase();
    const active = Boolean(body.active);

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const allowedRoles = Object.values(Role);
    const allowedRanks = Object.values(Rank);

    if (!allowedRoles.includes(role as Role)) {
      return NextResponse.json(
        { error: "Invalid user role." },
        { status: 400 }
      );
    }

    if (!allowedRanks.includes(rank as Rank)) {
      return NextResponse.json(
        { error: "Invalid user rank." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const emailTaken = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
    });

    if (emailTaken) {
      return NextResponse.json(
        { error: "This email is already used by another account." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name || existingUser.name,
        email,
        role: role as Role,
        rank: rank as Rank,
        active,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        rank: true,
        active: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 }
    );
  }
}