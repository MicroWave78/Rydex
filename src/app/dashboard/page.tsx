import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: {
        include: {
          rentals: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              car: {
                select: {
                  id: true,
                  brand: true,
                  model: true,
                  type: true,
                  image: true,
                  pricePerDay: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    redirect("/login");
  }

  if (!session.user.active) {
    redirect("/login");
  }

  const user = session.user;

  const formattedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    rank: user.rank,
    active: user.active,
    totalRentals: user.totalRentals,
    createdAt: user.createdAt.toISOString(),
    rentals: user.rentals.map((rental) => ({
      id: rental.id,
      pickupDate: rental.pickupDate.toISOString(),
      returnDate: rental.returnDate.toISOString(),
      pickupLocation: rental.pickupLocation,
      totalPrice: rental.totalPrice,
      status: rental.status,
      createdAt: rental.createdAt.toISOString(),
      car: rental.car,
    })),
  };

  return (
    <main className="min-h-screen bg-[#31363F] text-[#EEEEEE]">
      <div className="mx-auto mt-24 w-full max-w-[1500px] px-4 py-10">
        <DashboardClient user={formattedUser} />
      </div>
    </main>
  );
}