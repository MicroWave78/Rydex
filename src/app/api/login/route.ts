import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "User or password is incorrect" }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "User or password is incorrect" }, { status: 401 });
        }

        if (!user.active) {
            return NextResponse.json({ error: "This account is currently disabled. Please contact support for assistance." }, { status: 403 });
        }

        const token = randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1); // Token expires in 1 day

        await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        })

        await prisma.session.create({
            data: {
                token,
                userId: user.id,
                expiresAt
            }
        });
        
        const cookieStore = await cookies();
        cookieStore.set("sessionToken", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            expires: expiresAt,
            path: "/"
        });

        const response = NextResponse.json({ 
            success: true,
            role: user.role
         });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}