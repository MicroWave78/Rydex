import prisma from "@/lib/prisma";
import { MessageStatus } from "@prisma/client";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const messageId = Number(id);

    if (Number.isNaN(messageId)) {
      return NextResponse.json(
        { error: "Invalid message id." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const status = String(body.status || "").trim().toUpperCase();

    const allowedStatuses = Object.values(MessageStatus);

    if (!allowedStatuses.includes(status as MessageStatus)) {
      return NextResponse.json(
        { error: "Invalid message status." },
        { status: 400 }
      );
    }

    const existingMessage = await prisma.messages.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    const updatedMessage = await prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        status: status as MessageStatus,
      },
    });

    return NextResponse.json({
      message: "Message updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("UPDATE MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update message." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const messageId = Number(id);

    if (Number.isNaN(messageId)) {
      return NextResponse.json(
        { error: "Invalid message id." },
        { status: 400 }
      );
    }

    const existingMessage = await prisma.messages.findUnique({
      where: {
        id: messageId,
      },
    });

    if (!existingMessage) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      );
    }

    await prisma.messages.delete({
      where: {
        id: messageId,
      },
    });

    return NextResponse.json({
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}