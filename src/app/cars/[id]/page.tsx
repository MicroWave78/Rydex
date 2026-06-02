import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Calendar,
  Car,
  Fuel,
  Gauge,
  Users,
  Wrench,
  Zap,
  Shield,
  ArrowLeft,
  Star
} from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import RentDialog from "./RentDialog";
import CarCard from "@/components/carCard";
import ReviewForm from "./ReviewForm";
import DeleteReviewButton from "./DeleteReviewButton";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id: Number(id) },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              rank: true,
              _count: {
                select: {
                  rentals: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!car) notFound();

  const averageRating =
  car.reviews.length > 0
    ? (
        car.reviews.reduce((acc, r) => acc + r.rating, 0) /
        car.reviews.length
      ).toFixed(1)
    : "0.0";

  const cars = await prisma.car.findMany({
    where: {
      type: car.type,
      id: {
        not: car.id,
      },
      available: true,
    },
  });

  const recommendedCars = cars
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const session = sessionToken
    ? await prisma.session.findUnique({
      where: { token: sessionToken},
      include: { user: true},
    })
    : null;

  const isLoggedIn = !!session && session.expiresAt > new Date();

  const isAdmin =
    !!session &&
    session.expiresAt > new Date() &&
    session.user.role === "ADMIN";

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
      <div className="mx-auto max-w-7xl">
        <Link href="/cars#cars" className="text-sm text-[#76ABAE] hover:underline">
          <ArrowLeft className="inline-block w-4 h-4 mr-2" />
          Back to cars
        </Link>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden bg-[#222831] rounded-3xl shadow-2xl">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition duration-500 hover:scale-105 rounded-3xl"
            />

            {car.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-[#76ABAE] px-4 py-1 text-sm font-semibold text-white">
                Featured
              </span>
            )}
          </div>

          {/* Main Info */}
          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#76ABAE]">
              {car.type}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {car.brand} {car.model}
            </h1>

            <p className="mt-3 text-[#EEEEEE]/70">
              {car.year} • {car.transmission} • {car.fuelType}
            </p>

            <p className="mt-8 text-4xl font-bold text-[#76ABAE]">
              €{car.pricePerDay}
              <span className="text-base font-normal text-[#EEEEEE]/60">
                {" "}
                / day
              </span>
            </p>

            <p className="mt-6 leading-relaxed text-[#EEEEEE]/75">
              {car.description || "A reliable rental car ready for your next trip."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <QuickSpec icon={Users} label="Seats" value={car.seats} />
              <QuickSpec icon={Zap} label="Power" value={`${car.hp} HP`} />
              <QuickSpec icon={Fuel} label="Fuel" value={car.fuelType} />
              <QuickSpec icon={Gauge} label="Mileage" value={`${car.mileage ?? 0} km`} />
            </div>

            <RentDialog
              carId={car.id}
              carName={`${car.brand} ${car.model}`}
              pricePerDay={car.pricePerDay} 
              available = {car.available}
              isLoggedIn = {isLoggedIn}
              userRank={session?.user.rank ?? null} />
          </div>
        </section>

        {/* Specs */}
        <section className="mt-12 rounded-3xl bg-[#222831] p-6 shadow-2xl">
          <h2 className="text-2xl font-bold">Vehicle Specifications</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Spec label="Brand" value={car.brand} />
            <Spec label="Model" value={car.model} />
            <Spec label="Year" value={car.year} />
            <Spec label="Type" value={car.type} />
            <Spec label="Transmission" value={car.transmission} />
            <Spec label="Fuel Type" value={car.fuelType} />
            <Spec label="Horsepower" value={`${car.hp} HP`} />
            <Spec label="Seats" value={car.seats} />
            <Spec label="Color" value={car.color || "N/A"} />
            <Spec label="Mileage" value={`${car.mileage ?? 0} km`} />
            <Spec className={`${car.available ? "text-green-500" : "text-red-500"}`} label="Availability" value={car.available ? "Available" : "Unavailable"} />
            <Spec label="Price / Day" value={`€${car.pricePerDay}`} />
          </div>
        </section>

        {/* Booking / Policies */}
        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">What's included?</h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Feature icon={Shield} title="Verified vehicle" />
              <Feature icon={Calendar} title="Flexible booking" />
              <Feature icon={Wrench} title="24/7 roadside assistance" />
              <Feature icon={Car} title="Clean interior" />
            </div>
          </div>

          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">Rental requirements</h2>

            <ul className="mt-6 list-disc list-inside space-y-3 text-[#EEEEEE]/75">
              <li>Valid driving license required.</li>
              <li>Minimum driver age: 18 years old.</li>
              <li>Security deposit may apply.</li>
              <li>Return the car with the same fuel level.</li>
              <li>Free cancellation up to 24 hours before pickup.</li>
            </ul>
          </div>
        </section>

        {/* reviews section */}
        <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{averageRating}</span>
            </div>

            <p className="text-[#EEEEEE]/60">
              Based on {car.reviews.length} reviews
            </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

          {car.reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-white/10 bg-[#222831] p-5 shadow-lg transition hover:border-[#76ABAE]/40"
              >
              <div className="flex items-start justify-between gap-4">
                
                {/* user info */}
                <Link
                  href={`/users/${review.user.id}`}
                  className="group flex items-center gap-3"
                  >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#76ABAE]/20 text-lg font-bold text-[#76ABAE]">
                    {(review.user.username || review.user.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold group-hover:text-[#76ABAE] transition">
                        {review.user.username || review.user.name}
                      </p>

                      <span className={`rounded-full ${rankColors[review.user.rank] || "bg-[#76ABAE]/20"} px-2 py-0.5 text-xs`}>
                        {review.user.rank}
                      </span>
                    </div>

                    <p className="text-xs text-[#EEEEEE]/50">
                      {review.user._count.rentals} rentals
                    </p>
                  </div>
                </Link>

                {/* stars */}
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

              <p className="mt-4 leading-relaxed text-[#EEEEEE]/75">
                {review.comment}
              </p>

              <span className="mt-2 flex justify-between">
                <p className="mt-4 text-xs text-[#EEEEEE]/40">
                  {review.createdAt.toLocaleDateString()}
                </p>
                {isAdmin && (
                  <DeleteReviewButton reviewId={review.id} />
                )}
              </span>
            </div>
          ))}
          
        </div>
        <ReviewForm carId={car.id} />

        {recommendedCars.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
                  Similar rides
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                  More {car.type} cars you might like
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {recommendedCars.map((recommendedCar) => (
                <CarCard key={recommendedCar.id} {...recommendedCar} />
              ))}
            </div>
          </section>
        )}

        
      </div>
    </main>
  );
}

function QuickSpec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <Icon className="mb-3 h-5 w-5 text-[#76ABAE]" />
      <p className="text-xs text-[#EEEEEE]/50">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Spec({
  label,
  value,
  className
}: {
  label: string;
  value: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-[#EEEEEE]/50">{label}</p>
      <p className={`mt-1 font-semibold ${className}`}>{value}</p>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
      <Icon className="h-5 w-5 text-[#76ABAE]" />
      <span>{title}</span>
    </div>
  );
}