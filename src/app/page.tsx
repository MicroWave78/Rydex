"use client"
import TitleSubtitle from "@/components/ui/TitleSubtitle"
import { Button } from "@/components/ui/button";
import BrowseCarsDrawer from "@/components/ui/BrowseCarsDrawer";
import { useState } from "react";
import CarsCarousel from "@/components/ui/CarsCarousel";

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
        <h2 className="content-title">Why Choose Us?</h2>
        <p className="content-description">We offer a wide selection of vehicles, competitive pricing, and exceptional customer service. Our easy-to-use platform allows you to book your car rental in just a few clicks.</p>
        
        <div className="cars-carousel">
          <CarsCarousel /> 
        </div>
       

      </div>
    </div>
  );
}
