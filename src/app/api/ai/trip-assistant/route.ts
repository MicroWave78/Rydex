import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
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
        { error: "You must be logged in to use the AI assistant." },
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

    const body = await request.json();
    const message = String(body.message || "").trim();
    const history = (body.history || []) as ChatHistoryItem[];

    if (!message) {
      return NextResponse.json(
        { error: "Please describe your trip first." },
        { status: 400 }
      );
    }

    if (message.length > 1200) {
      return NextResponse.json(
        { error: "Trip description is too long. Please keep it shorter." },
        { status: 400 }
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
        take: 5,
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
        take: 15,
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

    const compactHistory = history
      .slice(-6)
      .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
      .join("\n");

    const prompt = `
You are Rydex AI Assistant, an intelligent rent-a-car assistant.

Your job:
Help the user choose suitable cars from the available Rydex database.

User profile:
Name: ${session.user.name || session.user.username || "User"}
Rank: ${session.user.rank}

User rental history:
${JSON.stringify(rentalHistory, null, 2)}

Recent conversation:
${compactHistory || "No previous conversation."}

Latest user request:
"${message}"

Available cars:
${JSON.stringify(availableCars, null, 2)}

Rules:
- Recommend 1 to 4 cars.
- Only recommend cars from the available cars list.
- Use the exact car id from the available cars list.
- Match the user's trip, vibe, passenger count, comfort needs, budget, fuel, transmission, and style.
- If the user asks generally, ask a helpful follow-up and still recommend cars if possible.
- Keep the assistant reply friendly, concise, and useful.
- Return only valid JSON. No markdown.

JSON format:
{
  "reply": "Natural assistant response to the user.",
  "recommendations": [
    {
      "carId": 1,
      "reason": "Short explanation for why this car fits the user's trip."
    }
  ]
}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { response, usedModel } = await generateWithFallback(ai, prompt);

    console.log("AI assistant used model:", usedModel);

    const rawText = response.text || "";

    const cleanedText = extractJson(rawText);

    const aiResult = JSON.parse(cleanedText) as {
      reply: string;
      recommendations: {
        carId: number;
        reason: string;
      }[];
    };

    const recommendedIds = aiResult.recommendations
      .map((item) => Number(item.carId))
      .filter(Boolean)
      .slice(0, 4);

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
            "Recommended based on your trip description.",
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      reply: aiResult.reply,
      recommendations,
    });
  } catch (error) {
    console.error("TRIP ASSISTANT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate AI assistant response." },
      { status: 500 }
    );
  }
}

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    return cleaned;
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

type GeminiClient = InstanceType<typeof GoogleGenAI>;

async function generateWithFallback(ai: GeminiClient, prompt: string) {
    const models = [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
    ];

    let lastError: unknown = null;

    for (const model of models) {
        try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        return {
            response,
            usedModel: model,
        };
        } catch (error) {
        lastError = error;

        if (!isRateLimitError(error)) {
            throw error;
        }

        console.warn(`Model ${model} hit rate limit. Trying fallback...`);
        }
    }

    throw lastError;
    }

    function isRateLimitError(error: unknown) {
    const text = JSON.stringify(error).toLowerCase();

    return (
        text.includes("429") ||
        text.includes("quota") ||
        text.includes("rate limit") ||
        text.includes("resource_exhausted")
    );
}