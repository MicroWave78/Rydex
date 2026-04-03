import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 404 });
        }

        return NextResponse.json({ message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}