import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Car,
  Fuel,
  Gauge,
  Palette,
  Users,
  Wrench,
  Zap,
  Shield,
  ArrowLeft
} from "lucide-react";
import { ClassNameValue } from "tailwind-merge";
import RentDialog from "./RentDialog";

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id: Number(id) },
  });

  if (!car) notFound();

  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-7xl">
        <Link href="/cars" className="text-sm text-[#76ABAE] hover:underline">
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
              available = {car.available}/>
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
              <Feature icon={Wrench} title="Roadside support" />
              <Feature icon={Car} title="Clean interior" />
            </div>
          </div>

          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">Rental requirements</h2>

            <ul className="mt-6 list-disc list-inside space-y-3 text-[#EEEEEE]/75">
              <li>Valid driving license required.</li>
              <li>Minimum driver age: 21 years old.</li>
              <li>Security deposit may apply.</li>
              <li>Return the car with the same fuel level.</li>
              <li>Free cancellation up to 24 hours before pickup.</li>
            </ul>
          </div>
        </section>

        
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