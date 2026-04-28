"use client"

import TitleSubtitle from "@/components/titleSubtitle"
import { ArrowDown } from "lucide-react"
import { useState } from "react"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion";
import CarCard from "@/components/carCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

type CarCardProps = {
  id: number;
  brand: string;
  model: string;
  type: string;
  description?: string | null;
  image: string;
  pricePerDay: number;
  seats: number;
  hp: number;
  transmission: string;
  fuelType: string;
  year: number;
};

export default function CarsGrid({ cars }: { cars: CarCardProps[] }) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [fuelFilter, setFuelFilter] = useState("all");
    const [transmissionFilter, setTransmissionFiler] = useState("all");

    const minCarPrice = Math.min(...cars.map((car) => car.pricePerDay));
    const maxCarPrice = Math.max(...cars.map((car) => car.pricePerDay));
    const [maxPrice, setMaxPrice] = useState(maxCarPrice);
    const [minPrice, setMinPrice] = useState(minCarPrice);

    const types = Array.from(new Set(cars.map((car) => car.type.trim())));
    const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType.trim())));
    const transmissionType = Array.from(new Set(cars.map((car) => car.transmission.trim())));

    const filteredCars = cars.filter((car) => {
        const matchesSearch =
            `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            typeFilter === "all" || 
            car.type.trim().toLowerCase() === typeFilter.trim().toLowerCase();

        const matchesFuel =
            fuelFilter === "all" || 
            car.fuelType.trim().toLowerCase() === fuelFilter.trim().toLowerCase();

        const matchesTransmission =
            transmissionFilter === "all" ||
            car.transmission.trim().toLowerCase() === transmissionFilter.trim().toLowerCase();

        const matchesPrice = car.pricePerDay >= minPrice && car.pricePerDay <= maxPrice;

        return matchesSearch && matchesType && matchesFuel && matchesPrice && matchesTransmission;
    });
    const [scrollY, setScrollY] = useState(0)
    
    
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    

    return (
        <div className="w-full overflow-x-hidden">
              <div className="fixed inset-0 -z-10">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
              </div>
        
              <section className="relative mt-16 flex min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-50px)] flex-col items-center justify-center px-4 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#31363F]" />
        
                <div className="relative z-10">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
                    More than rentals
                  </p>
        
                  <TitleSubtitle
                    title="Explore Our Car Collection"
                    subtitle=""
                  />
                </div>
        
                <div
                  className="absolute bottom-6 transition-opacity duration-200"
                  style={{
                    opacity: Math.max(1 - scrollY / 100, 0),
                    pointerEvents: scrollY > 100 ? "none" : "auto",
                  }}
                >
                  <ArrowDown className="h-9 w-9 animate-bounce rounded-full bg-white p-1 text-black" />
                </div>
              </section>

            <div className="w-full bg-[#31363F] text-[#EEEEEE] p-1">
                <div className="w-full px-4 py-6">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-[#222831] p-4 shadow-xl md:flex-row md:items-center">
                        
                        <Input
                        placeholder="Search by brand or model..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-[#31363F] text-[#EEEEEE]"
                        />

                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="bg-[#31363F] text-[#EEEEEE] md:w-[180px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {types.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={fuelFilter} onValueChange={setFuelFilter}>
                            <SelectTrigger className="bg-[#31363F] text-[#EEEEEE] md:w-[180px]">
                                <SelectValue placeholder="Fuel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Fuel</SelectItem>
                                {fuelTypes.map((fuel) => (
                                    <SelectItem key={fuel} value={fuel}>
                                        {fuel}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={transmissionFilter} onValueChange={setTransmissionFiler}>
                            <SelectTrigger className="bg-[#31363F] text-[#EEEEEE] md:w-[180px]">
                                <SelectValue placeholder="Transmission" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Transmissions</SelectItem>
                                {transmissionType.map((trans) => (
                                    <SelectItem key={trans} value={trans}>
                                        {trans}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="w-full max-w-xs">
                            <div className="mb-2 flex justify-between text-sm">
                                <span>Price range</span>
                                <span>€{minPrice} - €{maxPrice}</span>
                            </div>

                            <Slider
                                className="dark"
                                defaultValue={[minCarPrice, maxCarPrice]}
                                min={minCarPrice}
                                max={maxCarPrice}
                                step={5}
                                onValueChange={(value) => {
                                    setMinPrice(value[0])
                                    setMaxPrice(value[1])
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4">
                    <AnimatePresence mode="popLayout">
                        {filteredCars.map((car) => (
                            <motion.div
                            key={car.id}
                            layout
                            className="w-full"
                            initial = {{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                            <CarCard {...car} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredCars.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-10 text-[#EEEEEE]/70"
                        >
                            No cars found.
                        </motion.p>
                    )}
                </div>
            </div>
        </div>
    );
}