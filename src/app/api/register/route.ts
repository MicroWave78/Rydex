import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    const { email, password, name, username } = body;

    const hasMinLength = password.length >= 8;

    const extraChecks = [
      /\d/.test(password),
      /[A-Z]/.test(password),
      /[!@#$%^&*]/.test(password),
    ];

    const extraScore = extraChecks.filter(Boolean).length;

    if (!email?.trim() || !password || !name?.trim() || !username?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!hasMinLength || extraScore < 2) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters and contain at least 2 of: number, uppercase letter, special character." },
        { status: 400 }
      );
    }

    if (password.toLowerCase().includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Password should not contain your email." },
        { status: 400 }
      );
    }

    if (
      password.toLowerCase().includes(username.toLowerCase()) ||
      password.toLowerCase().includes(name.toLowerCase())
    ) {
      return NextResponse.json(
        { error: "Password should not contain your username or name." },
        { status: 400 }
      );
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } });

    if (existingUsername) {
      return NextResponse.json({ error: "Username already in use." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, username },
    });

    return NextResponse.json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}