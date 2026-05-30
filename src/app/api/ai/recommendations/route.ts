import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is missing." },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    const session = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Session expired. Please log in again." },
        { status: 401 }
      );
    }

    if (!session.user.active) {
      return NextResponse.json(
        { error: "This account is disabled." },
        { status: 403 }
      );
    }

    const [rentals, cars] = await Promise.all([
      prisma.rental.findMany({
        where: {
          userId: session.user.id,
          status: {
            in: ["CONFIRMED", "ACTIVE", "COMPLETED"],
          },
        },
        include: {
          car: {
            select: {
              id: true,
              brand: true,
              model: true,
              type: true,
              fuelType: true,
              transmission: true,
              pricePerDay: true,
              hp: true,
              seats: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      }),

      prisma.car.findMany({
        where: {
          available: true,
        },
        include: {
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        take: 30,
      }),
    ]);

    const availableCars = cars.map((car) => {
      const averageRating =
        car.reviews.length > 0
          ? car.reviews.reduce((sum, review) => sum + review.rating, 0) /
            car.reviews.length
          : 0;

      return {
        id: car.id,
        brand: car.brand,
        model: car.model,
        type: car.type,
        fuelType: car.fuelType,
        transmission: car.transmission,
        pricePerDay: car.pricePerDay,
        hp: car.hp,
        seats: car.seats,
        featured: car.featured,
        averageRating: Number(averageRating.toFixed(1)),
      };
    });

    const rentalHistory = rentals.map((rental) => ({
      carId: rental.car.id,
      carName: `${rental.car.brand} ${rental.car.model}`,
      type: rental.car.type,
      fuelType: rental.car.fuelType,
      transmission: rental.car.transmission,
      pricePerDay: rental.car.pricePerDay,
      hp: rental.car.hp,
      seats: rental.car.seats,
    }));

    const prompt = `
        You are an AI recommendation engine for a rent-a-car platform called Rydex.

        User rental history:
        ${JSON.stringify(rentalHistory, null, 2)}

        Available cars:
        ${JSON.stringify(availableCars, null, 2)}

        Task:
        Recommend exactly 3 cars from the available cars list.

        Rules:
        - Only recommend cars that exist in the available cars list.
        - Use the car id exactly as provided.
        - Prefer cars matching the user's previous type, fuel type, transmission, budget, and performance preferences.
        - If the user has no rental history, recommend featured cars and highly rated cars.
        - Avoid recommending the exact same car too often unless it is clearly relevant.
        - Return only valid JSON. No markdown.

        JSON format:
        {
            "recommendations": [
                {
                "carId": 1,
                "reason": "Short reason written for the user."
                }
            ]
        }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text || "";

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiResult = JSON.parse(cleanedText) as {
      recommendations: {
        carId: number;
        reason: string;
      }[];
    };

    const recommendedIds = aiResult.recommendations
      .map((item) => Number(item.carId))
      .filter(Boolean);

    const recommendedCars = await prisma.car.findMany({
      where: {
        id: {
          in: recommendedIds,
        },
      },
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const recommendations = recommendedIds
      .map((id) => {
        const car = recommendedCars.find((car) => car.id === id);
        const aiRecommendation = aiResult.recommendations.find(
          (item) => Number(item.carId) === id
        );

        if (!car) return null;

        const averageRating =
          car.reviews.length > 0
            ? car.reviews.reduce((sum, review) => sum + review.rating, 0) /
              car.reviews.length
            : null;

        return {
          id: car.id,
          brand: car.brand,
          model: car.model,
          type: car.type,
          image: car.image,
          pricePerDay: car.pricePerDay,
          fuelType: car.fuelType,
          transmission: car.transmission,
          seats: car.seats,
          hp: car.hp,
          averageRating,
          reviewCount: car.reviews.length,
          reason:
            aiRecommendation?.reason ||
            "Recommended based on your Rydex activity.",
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      recommendations,
    });
  } catch (error) {
    console.error("AI RECOMMENDATIONS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate AI recommendations." },
      { status: 500 }
    );
  }
}