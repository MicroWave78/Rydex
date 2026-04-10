import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !phone || !message ) {
            return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
        }

        const msg = await prisma.messages.create({
            data: {
                name,
                email,
                phone,
                message,
                type: "General Inquiry"
            }
        });

        return NextResponse.json({ message: "Message sent successfully!" });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}