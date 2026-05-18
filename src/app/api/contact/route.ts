import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const type = String(body.type || "General Inquiry").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and message." },
        { status: 400 }
      );
    }

    await prisma.messages.create({
      data: {
        name,
        email,
        phone,
        type,
        message,
      },
    });

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}