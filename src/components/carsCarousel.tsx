"use client"

import { useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { ChevronsUp, Gauge, Timer, Armchair } from "lucide-react"

const cars = [
  {
    id: 1,
    name: "Audi R8",
    image: "/images/demo-car-5.png",
    hp: 420,
    topSpeed: 200,
    seats: 2,
    zeroToSixty: 7.5,
  },
  {
    id: 2,
    name: "MINI John Cooper Works",
    image: "/images/demo-car-2.png",
    hp: 228,
    topSpeed: 220,
    seats: 4,
    zeroToSixty: 5.0,
  },
  {
    id: 3,
    name: "BMW i8 Protonic",
    image: "/images/demo-car-3.png",
    hp: 374,
    topSpeed: 250,
    seats: 2,
    zeroToSixty: 4.0,
  },
  {
    id: 4,
    name: "Audi R8",
    image: "/images/demo-car-5.png",
    hp: 420,
    topSpeed: 200,
    seats: 2,
    zeroToSixty: 7.5,
  },
  {
    id: 5,
    name: "MINI John Cooper Works",
    image: "/images/demo-car-2.png",
    hp: 228,
    topSpeed: 220,
    seats: 4,
    zeroToSixty: 5.0,
  },
  {
    id: 6,
    name: "BMW i8 Protonic",
    image: "/images/demo-car-3.png",
    hp: 374,
    topSpeed: 250,
    seats: 2,
    zeroToSixty: 4.0,
  },
]

export default function CarsCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="max-w-full px-4">

      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {cars.map((car) => (
            <CarouselItem key={car.id} className="sm:basis-1/3 flex justify-center">
              <Image
                src={car.image}
                alt={car.name}
                width={500}
                height={300}
                className="object-contain hover:scale-105 transition"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center gap-6 mt-8">

        <div className="flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            <ChevronsUp className="w-4 h-4" />
            Horsepower: {cars[current]?.hp} HP
          </p>
          <p className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            Top Speed: {cars[current]?.topSpeed} km/h
          </p>
        </div>

        <h2 className="text-2xl font-semibold">
          {cars[current]?.name}
        </h2>

        <div className="flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            <Armchair className="w-4 h-4"/>
            Seats: {cars[current]?.seats}
          </p>
          <p className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            0-60 mph: {cars[current]?.zeroToSixty} seconds
          </p>
        </div>

      </div>
    </div>
  )
}