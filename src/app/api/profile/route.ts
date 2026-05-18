import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return null;
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
    return null;
  }

  return session.user;
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const username = String(body.username || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailTaken = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: user.id,
        },
      },
    });

    if (emailTaken) {
      return NextResponse.json(
        { error: "This email is already used." },
        { status: 400 }
      );
    }

    if (username) {
      const usernameTaken = await prisma.user.findFirst({
        where: {
          username,
          NOT: {
            id: user.id,
          },
        },
      });

      if (usernameTaken) {
        return NextResponse.json(
          { error: "This username is already used." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        username: username,
        email,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        rank: true,
        role: true,
        active: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const rentalCount = await prisma.rental.count({
      where: {
        userId: user.id,
      },
    });

    if (rentalCount > 0) {
      return NextResponse.json(
        {
          error:
            "You cannot delete your account because you have rental history. Contact support or disable the account instead.",
        },
        { status: 400 }
      );
    }

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    const cookieStore = await cookies();
    cookieStore.delete("sessionToken");

    return NextResponse.json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PROFILE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete account." },
      { status: 500 }
    );
  }
}