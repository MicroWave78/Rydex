"use client"

import "@/app/styles/CarsCarousel.css"
import { useState, useEffect, use } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronsUp, Gauge, Timer } from "lucide-react";



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
    seats: 4,
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
    const [api, setApi] = useState<any>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap())
        
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    return (
        <>
        <Carousel 
        setApi={setApi} 
        plugins={[Autoplay({delay: 4000})]} 
        opts = {{ loop: true}}>

            <CarouselContent>
                {cars.map((car) => (
                    <CarouselItem key={car.id} className="basis-1/3">
                        <Image src={car.image} alt={car.name} width={700} height={450} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

        <div className="car-details">
            <span className="material-symbols-outlined">
                <p className="flex items-center gap-2">
                    <ChevronsUp className="w-4 h-4" />Horsepower: {cars[current]?.hp} HP
                </p>
                <p className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />Top Speed: {cars[current]?.topSpeed} km/h
                </p>
            </span>

            <h2>{cars[current]?.name}</h2>
            
            <span className="material-symbols-outlined">
                <p>Seats: {cars[current]?.seats}</p>
                <p className="flex items-center gap-2"><Timer className="w-4 h-4" />0-60 mph: {cars[current]?.zeroToSixty} seconds</p>
            </span>
        </div>
        </>
    )
}