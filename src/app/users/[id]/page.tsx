import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Star,
  Calendar,
  Car,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PublicUserPage({ params }: Props) {
    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: {
        id: Number(id),
        },

        include: {
        rentals: {
            include: {
            car: true,
            },
            orderBy: {
            createdAt: "desc",
            },
            take: 6,
        },

        reviews: {
            include: {
            car: true,
            },
            orderBy: {
            createdAt: "desc",
            },
            take: 5,
        },

        _count: {
            select: {
            rentals: true,
            reviews: true,
            },
        },
        },
    });

    if (!user) notFound();

    const averageRating =
        user.reviews.length > 0
        ? (
            user.reviews.reduce(
                (acc, review) => acc + review.rating,
                0
            ) / user.reviews.length
            ).toFixed(1)
        : "0.0";

    const favoriteType =
        user.rentals.length > 0
        ? Object.entries(
            user.rentals.reduce((acc, rental) => {
                const type = rental.car.type;

                acc[type] = (acc[type] || 0) + 1;

                return acc;
            }, {} as Record<string, number>)
            ).sort((a, b) => b[1] - a[1])[0][0]
        : "No favorites yet";
    
      const rankColors: Record<string, string> = {
        BRONZE: "bg-[#CD7F32]/20 text-[#CD7F32]",
        SILVER: "bg-[#C0C0C0]/20 text-[#C0C0C0]",
        GOLD: "bg-[#FFD700]/20 text-[#FFD700]",
        PLATINUM: "bg-[#E5E4E2]/20 text-[#E5E4E2]",
        DIAMOND: "bg-[#B9F2FF]/20 text-[#B9F2FF]",
        VIP: "bg-[#76ABAE]/20 text-[#76ABAE]",
    };

    return (
        <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
        <div className="mx-auto max-w-6xl">

            <Link
                href="/cars"
                className="text-sm text-[#76ABAE] hover:underline"
            >
                <ArrowLeft className="mr-2 inline-block h-4 w-4" />
                Back
            </Link>

            {/* HERO */}
            <section className="mt-8 rounded-3xl bg-[#222831] p-8 shadow-2xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-5">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#76ABAE]/20 text-4xl font-bold text-[#76ABAE]">
                        {(user.username || user.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">
                            {user.username || user.name}
                        </h1>

                        <div
                            className={`mt-3 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                                rankColors[user.rank]
                            }`}
                        >
                            {user.rank}
                        </div>

                        <p className="mt-4 text-[#EEEEEE]/60">
                            Member since{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:min-w-[320px]">
                    <StatCard
                        label="Total Rentals"
                        value={user._count.rentals}
                    />

                    <StatCard
                        label="Reviews"
                        value={user._count.reviews}
                    />

                    <StatCard
                        label="Average Rating"
                        value={averageRating}
                    />

                    <StatCard
                        label="Favorite Type"
                        value={favoriteType}
                    />
                </div>
            </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold">
                    Recent Rentals
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {user.rentals.map((rental) => (
                    <div
                        key={rental.id}
                        className="rounded-3xl bg-[#222831] p-5 shadow-xl"
                    >
                        <p className="text-lg font-semibold">
                        {rental.car.brand} {rental.car.model}
                        </p>

                        <p className="mt-2 text-[#EEEEEE]/60">
                        {rental.car.type}
                        </p>

                        <p className="mt-4 text-sm text-[#EEEEEE]/40">
                        {new Date(
                            rental.createdAt
                        ).toLocaleDateString()}
                        </p>
                    </div>
                    ))}
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-bold">
                    Recent Reviews
                </h2>

                <div className="mt-6 space-y-4">
                    {user.reviews.map((review) => (
                    <div
                        key={review.id}
                        className="rounded-3xl bg-[#222831] p-5 shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <Link
                                href={`/cars/${review.car.id}`}
                                className="font-semibold hover:text-[#76ABAE]"
                            >
                                {review.car.brand} {review.car.model}
                            </Link>

                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                    i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-600"
                                    }`}
                                />
                                ))}
                            </div>
                        </div>

                        <p className="mt-4 text-[#EEEEEE]/70">
                        {review.comment}
                        </p>
                    </div>
                    ))}
                </div>
            </section>
        </div>
        </main>
    );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-sm text-[#EEEEEE]/50">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}