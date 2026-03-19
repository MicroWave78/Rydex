"use client"
import TitleSubtitle from "@/components/ui/titleSubtitle"
import { Button } from "@/components/ui/button";
import BrowseCarsDrawer from "@/components/ui/browseCarsDrawer";
import { useState } from "react";
import CarsCarousel from "@/components/ui/carsCarousel";
import CarGrid from "@/components/ui/carGrid";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

import { Car, Calendar, KeyRound, Flag, CircleDollarSign, Gem, Tag } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full flex flex-col">

      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/test2.jpg')" }}
        />
        <div className="absolute inset-0 backdrop-blur-xs" />
      </div>

      <TitleSubtitle title="Find your next ride." 
      subtitle="Discover the best car rental deals in town. Whether you're looking for a compact car, an SUV, or a luxury vehicle, we have you covered." 
      />

      <Button variant="default" className="mx-auto mt-5 px-5 bg-[#76ABAE] cursor-pointer hover:bg-[#5A8B8E] active:bg-[#3E6B6F]" onClick={() => setOpen(true)}>
        Browse Cars
      </Button>

      <BrowseCarsDrawer open={open} setOpen={setOpen} />

      <div className="w-full bg-[#222831] mt-70 text-[#EEEEEE] p-1 rounded-t-lg">
        
        <CarsCarousel /> 

        {/* How it works section */}
        <div className="w-full px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center">How Rydex Works</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 py-4 text-base md:text-lg">

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
              <Car className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Choose a Car</h3>
              <p className="text-sm">Browse and pick your favorite model.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
              <Calendar className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Book It</h3>
              <p className="text-sm">Select your desired date and time.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
              <KeyRound className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Pick up</h3>
              <p className="text-sm">Grab the keys and go.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:shadow-2xl hover:shadow-[#76ABAE] hover:border-[#76ABAE] hover:-translate-y-1 duration-300">
              <Flag className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Enjoy</h3>
              <p className="text-sm">Drive and have fun.</p>
            </div>
          </div>
        </div>

        {/* Most searched cars section */}
        <div className="w-full p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">The Most Searched Cars</h1>
          
          <CarGrid />
        </div>

        {/* Why choose us section */}
        <div className="w-full p-4">
          <h1 className="text-4xl mt-10 text-center font-bold">Why Choose Us?</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 p-4 text-base md:text-lg">

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
              <CircleDollarSign className="w-8 h-8 mb-4" />
              <h3 className="font-semibold">Special Financing Offers</h3>
              <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
              <Gem className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Trusted Car Dealership</h3>
              <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
              <Tag className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Transparent Pricing</h3>
              <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border-2 border-[#76ABAE] shadow-2xl shadow-[#76ABAE] -translate-y-1 hover:shadow-none hover:translate-y-1 duration-300">
              <Car className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Expert Car Service</h3>
              <p className="text-sm md:text-base">Our stress-free finance department that can find financial solutions to save you money.</p>
            </div>
          </div>
        </div>
        


      </div>

      
    </div>
  );
}
