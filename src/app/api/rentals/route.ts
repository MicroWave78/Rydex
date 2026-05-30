import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getRankFromRentals } from "@/lib/rank";
import { Rank } from "@prisma/client";
import { sendBookingConfirmationEmail } from "@/lib/email";

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
            return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId },
        });

        if (!user || !user.active) {
            return NextResponse.json({ error: "This account is currently disabled. Please contact support for assistance." }, { status: 403 });
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
        
        const result = await prisma.$transaction(async (tx) => {
            const rental = await tx.rental.create({
                data: {
                    userId,
                    carId: Number(carId),
                    pickupDate: new Date(pickupDate),
                    returnDate: new Date(returnDate),
                    pickupLocation,
                    totalPrice: Number(totalPrice),
                    status: "CONFIRMED",
                },
            });

            const totalRentals = await tx.rental.count({
                where: {
                    userId,
                    status: "CONFIRMED",
                },
            });

            const currentUser = await tx.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    rank: true,
                },
            });

            const newRank = 
                currentUser?.rank === Rank.VIP ? Rank.VIP : getRankFromRentals(totalRentals);

            await tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    totalRentals,
                    rank: newRank,
                },
            });

            return {
                rental,
                totalRentals,
                newRank,
            };
        });

        try {
            await sendBookingConfirmationEmail({
                to: user.email,
                name: user.name || user.username,
                rentalId: result.rental.id,
                carName: `${car.brand} ${car.model}`,
                pickupDate: result.rental.pickupDate,
                returnDate: result.rental.returnDate,
                pickupLocation: result.rental.pickupLocation,
                totalPrice: result.rental.totalPrice,
            });
            } catch (emailError) {
                console.error("BOOKING EMAIL ERROR:", emailError);
        }
        
        return NextResponse.json(
            {
                message: "Rental created successfully.",
                rental: result.rental,
                totalRentals: result.totalRentals,
                rank: result.newRank,
            },
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