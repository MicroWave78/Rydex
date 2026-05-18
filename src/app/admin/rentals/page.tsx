import prisma from "@/lib/prisma";
import RentalsManager from "./RentalsManager";

export default async function AdminRentalsPage() {
  const rentals = await prisma.rental.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      car: {
        select: {
          id: true,
          brand: true,
          model: true,
          type: true,
          pricePerDay: true,
        },
      },
    },
  });

  const formattedRentals = rentals.map((rental) => ({
    id: rental.id,
    userId: rental.userId,
    userEmail: rental.user.email,
    carId: rental.carId,
    carName: `${rental.car.brand} ${rental.car.model}`,
    carType: rental.car.type,
    pricePerDay: rental.car.pricePerDay,
    pickupLocation: rental.pickupLocation,
    pickupDate: rental.pickupDate.toISOString(),
    returnDate: rental.returnDate.toISOString(),
    totalPrice: rental.totalPrice,
    createdAt: rental.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#31363F] text-[#EEEEEE]">
      <RentalsManager rentals={formattedRentals} />
    </main>
  );
}