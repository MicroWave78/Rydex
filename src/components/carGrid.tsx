import prisma from "@/lib/prisma";
import FeaturedCarsCarousel from "./FeaturedCarsCarousel";
import { cookies } from "next/headers";

export default async function CarGrid() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const session = sessionToken
    ? await prisma.session.findUnique({
        where: { token: sessionToken },
        include: {
          user: {
            select: {
              rank: true,
            },
          },
        },
      })
    : null;
  const userRank = session?.user.rank ?? null;

  const cars = await prisma.car.findMany({
    where: {
      featured: true,
      available: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
    select: {
      id: true,
      brand: true,
      model: true,
      type: true,
      description: true,
      image: true,
      pricePerDay: true,
      seats: true,
      hp: true,
      transmission: true,
      fuelType: true,
      year: true,
      mileage: true,
    },
  });

  if (cars.length === 0) {
    return (
      <p className="mt-8 text-center text-[#EEEEEE]/60">
        No featured cars available right now.
      </p>
    );
  }

  return <FeaturedCarsCarousel cars={cars} userRank={userRank} />;
}