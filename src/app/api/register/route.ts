import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { error } from "console";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name, username } = body;

    if (!email || !password || !name || !username) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    const existingUsername = await prisma.user.findUnique({ where: {username}})

    if (existingUsername) {
      return NextResponse.json({ error: "Username already in use."}, { status: 400})
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