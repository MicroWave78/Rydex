import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { getRankFromRentals } from "@/lib/rank";
import { Rank } from "@prisma/client";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { applyRankDiscount } from "@/lib/rankBenefits";

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
        const { carId, pickupDate, returnDate, pickupLocation} = body;

        if (!carId || !pickupDate || !returnDate || !pickupLocation) {
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

        const pickup = new Date(pickupDate);
        const dropoff = new Date(returnDate);

        if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
            return NextResponse.json(
                { error: "Invalid rental dates." },
                { status: 400 }
            );
            }

        if (dropoff <= pickup) {
        return NextResponse.json(
            { error: "Return date must be after pickup date." },
            { status: 400 }
        );
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pickupDay = new Date(pickup);
        pickupDay.setHours(0, 0, 0, 0);

        if (pickupDay < today) {
        return NextResponse.json(
            { error: "Pickup date cannot be in the past." },
            { status: 400 }
        );
        }

        const rentalDays = Math.ceil(
        (dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)
        );

        const baseTotalPrice = rentalDays * car.pricePerDay;

        const { discountPercent, discountAmount, finalPrice } = applyRankDiscount(
            baseTotalPrice,
            user.rank
        );
        
        const result = await prisma.$transaction(async (tx) => {
            const overlappingRental = await tx.rental.findFirst({
                where: {
                carId: Number(carId),
                status: {
                    in: ["CONFIRMED", "ACTIVE"],
                },
                pickupDate: {
                    lt: dropoff,
                },
                returnDate: {
                    gt: pickup,
                },
                },
            });

            if (overlappingRental) {
                throw new Error("CAR_ALREADY_BOOKED");
            }

            const rental = await tx.rental.create({
                data: {
                userId,
                carId: Number(carId),
                pickupDate: pickup,
                returnDate: dropoff,
                pickupLocation,
                totalPrice: finalPrice,
                status: "CONFIRMED",
                },
            });

            const totalRentals = await tx.rental.count({
                where: {
                userId,
                status: {
                    in: ["CONFIRMED", "ACTIVE", "COMPLETED"],
                },
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
                currentUser?.rank === Rank.VIP
                ? Rank.VIP
                : getRankFromRentals(totalRentals);

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
                baseTotalPrice,
                discountPercent,
                discountAmount,
                finalPrice,
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
                baseTotalPrice: result.baseTotalPrice,
                discountAmount: result.discountAmount,
                discountPercent: result.discountPercent,
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
                baseTotalPrice: result.baseTotalPrice,
                discountAmount: result.discountAmount,
                discountPercent: result.discountPercent,
                finalPrice: result.finalPrice,
            },
            { status: 201 }
        );

        } catch (error) {
            console.error("RENTAL CREATE ERROR:", error);

            if (error instanceof Error && error.message === "CAR_ALREADY_BOOKED") {
                return NextResponse.json(
                { error: "This car is already booked for the selected dates." },
                { status: 400 }
                );
            }

            return NextResponse.json(
                { error: "Something went wrong while creating the rental." },
                { status: 500 }
            );
        }
}