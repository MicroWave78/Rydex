"use client"
import TitleSubtitle from "@/components/ui/TitleSubtitle"
import { Button } from "@/components/ui/button";
import BrowseCarsDrawer from "@/components/ui/BrowseCarsDrawer";
import { useState } from "react";
import CarsCarousel from "@/components/ui/CarsCarousel";

import { Car, Calendar, KeyRound, Flag } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <div className="main-container">

      <div className="hero-bg"></div>

      <TitleSubtitle title="Find your next ride." 
      subtitle="Discover the best car rental deals in town. Whether you're looking for a compact car, an SUV, or a luxury vehicle, we have you covered." 
      />

      <Button variant="default" className="hero-button" onClick={() => setOpen(true)}>
        Browse Cars
      </Button>

      <BrowseCarsDrawer open={open} setOpen={setOpen} />

      <div className="content">
        
        <CarsCarousel /> 

        <div className="w-full px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center">How Rydex Works</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-5 py-4">

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <Car className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Choose a Car</h3>
              <p className="text-sm">Browse and pick your favorite model.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <Calendar className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Book It</h3>
              <p className="text-sm">Select your desired date and time.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <KeyRound className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Pick up</h3>
              <p className="text-sm">Grab the keys and go.</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <Flag className="w-8 h-8 mb-4"/>
              <h3 className="font-semibold">Enjoy</h3>
              <p className="text-sm">Drive and have fun.</p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl mt-10 text-center">Why Choose Us?</h1>
        <p className="text-lg mt-5 text-center">We offer a wide selection of vehicles, competitive pricing, and exceptional customer service.</p>
        <p className="text-lg text-center">Our easy-to-use platform allows you to book your car rental in just a few clicks.</p>


      </div>

      <div className="footer">
        <p>&copy; 2025 Rydex. All rights reserved.</p>
      </div>
    </div>
  );
}
