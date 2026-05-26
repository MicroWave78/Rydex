import prisma from "@/lib/prisma";
import FeaturedCarsCarousel from "./FeaturedCarsCarousel";

export default async function CarGrid() {
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

  return <FeaturedCarsCarousel cars={cars} />;
}