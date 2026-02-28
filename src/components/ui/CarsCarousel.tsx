"use client"

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

const cars = [
  {
    id: 1,
    name: "Car 1",
    image: "/images/test.png",
    hp: 150,
    topSpeed: 200,
    seats: 4,
    zeroToSixty: 7.5,
},
  {
    id: 2,
    name: "Car 2",
    image: "/images/test.png",
    hp: 200,
    topSpeed: 220,
    seats: 2,
    zeroToSixty: 5.0,
  },
  {
    id: 3,
    name: "Car 3",
    image: "/images/test2.jpg",
    hp: 300,
    topSpeed: 250,
    seats: 4,
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
        <Carousel className="max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md" 
        setApi={setApi} 
        plugins={[Autoplay({delay: 4000})]} 
        opts = {{ loop: true, align: "start"}}>

            <CarouselContent>
                {cars.map((car) => (
                    <CarouselItem key={car.id}>
                        <Image src={car.image} alt={car.name} width={600} height={450} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

        <div>
            <h2>Car Details: {cars[current]?.name}</h2>
            <p>Horsepower: {cars[current]?.hp} HP</p>
            <p>Top Speed: {cars[current]?.topSpeed} km/h</p>
            <p>Seats: {cars[current]?.seats}</p>
            <p>0-60 mph: {cars[current]?.zeroToSixty} seconds</p>
        </div>
        </>
    )
}