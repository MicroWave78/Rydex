import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("sessionToken")?.value;

        if (!sessionToken) {
        return NextResponse.json(
            { error: "You must be logged in to rent a car." },
            { status: 401 }
        );
        }

        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
        });

        if (!session || session.expiresAt < new Date()) {
            return NextResponse.json({ error: "Session expired." }, { status: 401 });
        }

        const userId = session.userId;

        const body = await request.json();
        const { carId, pickupDate, returnDate, pickupLocation, totalPrice } = body;

        if (!carId || !pickupDate || !returnDate || !pickupLocation || totalPrice == null) {
            return NextResponse.json(
                { error: "Missing rental details." },
                { status: 400 }
            );
        }

        const car = await prisma.car.findUnique({
            where: { id: Number(carId) },
        });

        if (!car) {
            return NextResponse.json(
                { error: "Car not found." },
                { status: 404 }
            );
        }

        if (!car.available) {
            return NextResponse.json(
                { error: "This car is currently unavailable." },
                { status: 400 }
            );
        }
        console.log({
            userId,
            carId,
            pickupDate,
            returnDate,
            pickupLocation,
            totalPrice,
        });
        const rental = await prisma.rental.create({
            data: {
                userId: userId,
                carId: Number(carId),
                pickupDate: new Date(pickupDate),
                returnDate: new Date(returnDate),
                pickupLocation: pickupLocation,
                totalPrice: Number(totalPrice),
                status: "CONFIRMED",
            },
        });

        return NextResponse.json(
            { message: "Rental created successfully.", rental },
            { status: 201 }
            );
        } catch (error) {
            console.error("RENTAL CREATE ERROR:", error);

            return NextResponse.json(
                { error: "Something went wrong while creating the rental." },
                { status: 500 }
            );
        }
}