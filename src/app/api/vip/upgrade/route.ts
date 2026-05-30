import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Rank } from "@prisma/client";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "You must be logged in to upgrade to VIP." },
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

    if (session.user.rank === Rank.VIP) {
      return NextResponse.json(
        { error: "You already have VIP status." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        rank: Rank.VIP,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        rank: true,
      },
    });

    return NextResponse.json({
      message: "VIP upgrade successful.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("VIP UPGRADE ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while upgrading to VIP." },
      { status: 500 }
    );
  }
}