"use client";

import Image from "next/image";
import Link from "next/link";

import {
  BookmarkIcon,
  Gauge,
  Fuel,
  Cog,
  MoveUpRight,
  Users,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FeaturedCar = {
  id: number;
  brand: string;
  model: string;
  type: string;
  description: string | null;
  image: string;
  pricePerDay: number;
  seats: number;
  hp: number;
  transmission: string;
  fuelType: string;
  year: number;
  mileage: number | null;
};

export default function FeaturedCarsCarousel({
  cars,
}: {
  cars: FeaturedCar[];
}) {

    const isSmallSet = cars.length <= 3;

    const getItemBasis = () => {
        if (cars.length === 1) {
            return "basis-full";
        }

        if (cars.length === 2) {
            return "basis-full md:basis-1/2";
        }

        if (cars.length === 3) {
            return "basis-full md:basis-1/2 lg:basis-1/3";
        }

        return "basis-full md:basis-1/2 lg:basis-1/4";
    };

    const showArrows = cars.length > 4;
    return (
        <div className="mt-5 px-4">
            <Carousel
                opts={{
                align: cars.length < 4 ? "center" : "start",
                loop: cars.length > 4,
                }}
                className="w-full"
                >
                <CarouselContent className={`py-6 ${isSmallSet ? "justify-center" : ""}`}>
                {cars.map((car) => (
                    <CarouselItem key={car.id} className={getItemBasis()}>
                    <div className={`mx-auto h-full overflow-hidden rounded-2xl border-none bg-[#0f172a] shadow-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[#1d4f52] ${
                        isSmallSet ? "max-w-[360px]" : "w-full"
                    }`}>
                        <Link href={`/cars/${car.id}`}>
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                            src={car.image}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition duration-500 hover:scale-102 hover:brightness-110"
                            />

                            <Badge className="absolute left-3 top-3 rounded-full bg-[#76ABAE] px-3 py-1 text-xs text-white">
                            Featured
                            </Badge>

                        </div>
                        </Link>

                        <div className="bg-gradient-to-b from-[#31363F] to-[#08383b] p-4 text-white">
                        <h3 className="mb-1 text-sm font-semibold">
                            {car.brand} {car.model}
                        </h3>

                        <p className="mb-3 line-clamp-1 text-xs text-gray-300">
                            {car.description ||
                            `${car.year} ${car.type} ready for your next trip.`}
                        </p>

                        <div className="mb-3 flex justify-between p-1 text-xs text-white">
                            <span className="flex flex-col items-center">
                            <Gauge className="h-5 w-5" />
                            {car.mileage ?? 0} km
                            </span>

                            <span className="flex flex-col items-center">
                            <Fuel className="h-5 w-5" />
                            {car.fuelType}
                            </span>

                            <span className="flex flex-col items-center">
                            <Cog className="h-5 w-5" />
                            {car.transmission}
                            </span>

                            <span className="flex flex-col items-center">
                            <Users className="h-5 w-5" />
                            {car.seats} Seats
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <span className="text-lg font-bold">
                            €{car.pricePerDay} / Day
                            </span>

                            <Button
                            asChild
                            className="cursor-pointer text-sm transition duration-300 hover:-translate-y-1 hover:text-white"
                            >
                            <Link href={`/cars/${car.id}`}>
                                View Details
                                <MoveUpRight className="h-4 w-4" />
                            </Link>
                            </Button>
                        </div>
                        </div>
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>

                {showArrows && (
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <CarouselPrevious className="static translate-y-0 bg-[#222831] text-[#EEEEEE] hover:bg-[#76ABAE] hover:text-white" />
                        <CarouselNext className="static translate-y-0 bg-[#222831] text-[#EEEEEE] hover:bg-[#76ABAE] hover:text-white" />
                    </div>
                )}
            </Carousel>
        </div>
    );
}