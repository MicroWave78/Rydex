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
            return NextResponse.json({ error: "User or password is incorrect" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "User or password is incorrect" }, { status: 404 });
        }

        const response = NextResponse.json({ message: "Login successful" });

        response.cookies.set("userId", String(user.id), {
            httpOnly: true,
            path: "/",
        })

        response.cookies.set("username", user.username, {
            httpOnly: true,
            path: "/",
        })

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}