"use client"
import TitleSubtitle from "@/components/titleSubtitle"
import { Button } from "@/components/ui/button";
import BrowseCarsDrawer from "@/components/browseCarsDrawer";
import { useState, useEffect } from "react";
import CarsCarousel from "@/components/carsCarousel";
import CarGrid from "@/components/carGrid";
import Image from "next/image";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { Car, Calendar, KeyRound, Flag, CircleDollarSign, Gem, Tag, Star, ArrowDown } from "lucide-react";



export default function Home() {
  const [open, setOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full flex flex-col">

      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <section className="min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-33px)] flex flex-col items-center justify-center text-center px-4">
        <TitleSubtitle 
          title="Find your next ride." 
          subtitle="Discover the best car rental deals in town. Whether you're looking for a compact car, an SUV, or a luxury vehicle, we have you covered." 
        />

        <Button
          variant="default"
          className="mt-5 px-5 bg-[#76ABAE] cursor-pointer hover:bg-[#5A8B8E] active:bg-[#3E6B6F]"
          onClick={() => setOpen(true)}
        >
          Browse Cars by Type
        </Button>
        <Link href="/cars" className="mt-3 text-sm md:text-base text-[#EEEEEE] hover:underline">
          Or check out all our cars
        </Link>
        <BrowseCarsDrawer open={open} setOpen={setOpen} />
      </section>

      
      <div className="w-full flex justify-center mb-1 transition-opacity duration-200" style={{
        opacity: Math.max(1 - scrollY / 100, 0),
        pointerEvents: scrollY > 100 ? "none" : "auto",
      }}>
        <ArrowDown className="w-8 h-8 rounded-full text-center animate-bounce bg-white text-black"/>
      </div>
      

      {/* Main content */}
      <div className="w-full bg-[#31363F] text-[#EEEEEE] p-1 rounded-t-lg">
        
        <CarsCarousel /> 

        {/* How it works section */}
        <div className="w-full px-4 py-16" id="howto">
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
        <div className="w-full py-5 px-4">
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
        
        {/* Latest Cars */}
        <div className="w-full p-4 mt-5">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Latest Cars</h1>
          <CarGrid />
        </div>

        {/* Who is Rydex */}
        <div className="w-full flex bg-[#222831] rounded-xl py-6 mb-6">
          <div className="w-full flex flex-col md:flex-row items-center justify-around gap-6 px-10">
            <div className="flex flex-col md:w-1/4 text-center">
              <h1 className="text-3xl md:text-4xl font-bold ">Who is Rydex?</h1>
              <p className="text-lg md:text-base">Rydex is a modern car rental platform designed to make finding and booking your next ride simple and stress-free. From everyday vehicles to premium options, we connect you with reliable cars at competitive prices, all in just a few clicks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-1/2">

              <div className="flex flex-col items-center text-center text-black rounded-xl p-4 justify-center bg-white gap-2">
                <h2 className="text-lg font-semibold">Great</h2>
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5}).map((_, i) => (
                    <div key={i} className="group/star">
                      <Star className="text-green-500 bg-green-500 fill-background transition-all group-hover/star:-translate-y-1 duration-200 ease-out" />
                    </div>
                  ))}
                </div>
                <p>Based on 5,801 reviews</p>
                <Link href={"https://www.trustpilot.com"}>
                <Image src={"/images/Trustpilot_logo.png"}
                alt=""
                width={100}
                height={200}
                className="h-auto w-full"
                /></Link>
                
              </div>

              <div className="flex flex-col items-center text-center text-black rounded-xl p-4 justify-center bg-white gap-2">
                <h2 className="text-lg font-semibold">Great</h2>
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5}).map((_, i) => (
                    <div key={i} className="group/star">
                      <Star className="text-green-500 bg-green-500 fill-background transition-all group-hover/star:-translate-y-1 duration-200 ease-out" />
                    </div>
                  ))}
                </div>
                <p>Based on 5,801 reviews</p>
                <Link href={"https://customerreviews.google.com"}>
                <Image src={"/images/Google-Review-Logo.png"}
                alt=""
                width={100}
                height={100}
                className="h-auto w-full"
                /></Link>
              </div>

              <div className="flex flex-col items-center text-center text-black rounded-xl p-4 justify-center bg-white gap-2">
                <h2 className="text-lg font-semibold">Great</h2>
                <div className="flex flex-row gap-1">
                  {Array.from({ length: 5}).map((_, i) => (
                    <div key={i} className="group/star">
                      <Star className="text-green-500 bg-green-500 fill-background transition-all group-hover/star:-translate-y-1 duration-200 ease-out" />
                    </div>
                  ))}
                </div>
                <p>Based on 5,801 reviews</p>
                <Link href={"https://www.yelp.com"}>
                <Image src={"/images/Yelp_Logo.svg.png"}
                alt=""
                width={100}
                height={100}
                className="h-auto w-full"
                /></Link>
              </div>

            </div>
          </div>
        </div>

        {/* Join Rydex */}
        <div className="w-full flex flex-col items-center gap-4 py-10">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Join Rydex</h2>
            <p className="text-sm md:text-base">Recieve pricing updates, shopping tips & more!</p>
          </div>

          <div className="w-full max-w-xs md:max-w-sm">
            <InputGroup>
              <InputGroupInput placeholder="example@gmail.com" className="" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="default" className="cursor-pointer bg-[#76ABAE]">Sign Up</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

      </div>
    </div>
  );
}
