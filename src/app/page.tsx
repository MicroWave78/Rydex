"use client";

import TitleSubtitle from "@/components/titleSubtitle";
import { Button } from "@/components/ui/button";
import BrowseCarsDrawer from "@/components/browseCarsDrawer";
import { useEffect, useState } from "react";
import CarsCarousel from "@/components/carsCarousel";
import CarGrid from "@/components/carGrid";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ArrowDown,
  Calendar,
  Car,
  CircleDollarSign,
  Flag,
  Gem,
  KeyRound,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Reviews from "@/components/reviews";

const steps = [
  {
    icon: Car,
    title: "Choose a Car",
    text: "Browse our collection and pick the ride that fits your trip.",
  },
  {
    icon: Calendar,
    title: "Book It",
    text: "Select your dates, check availability, and reserve instantly.",
  },
  {
    icon: KeyRound,
    title: "Pick Up",
    text: "Grab the keys from your selected location and start driving.",
  },
  {
    icon: Flag,
    title: "Enjoy",
    text: "Drive comfortably and return the car when your trip is done.",
  },
];

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    text: "Clear daily prices with no confusing hidden costs.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Vehicles",
    text: "Every listed vehicle is checked before being available to book.",
  },
  {
    icon: Gem,
    title: "Premium Experience",
    text: "From economy cars to luxury options, Rydex keeps the process simple.",
  },
  {
    icon: Tag,
    title: "Flexible Offers",
    text: "Find options for city trips, family rides, business travel, or weekends.",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-50px)] md:min-h-[calc(100vh+10px)] flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#31363F]" />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
            Premium car rental
          </p>

          <TitleSubtitle
            title="Find your next ride."
            subtitle="Discover rental cars built for every kind of trip — from daily drives to premium weekend escapes."
          />

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="rounded-full cursor-pointer bg-[#76ABAE] px-7 py-3 text-base text-white hover:bg-[#5A8B8E]"
              onClick={() => setOpen(true)}
            >
              Browse by Type
            </Button>

            <Link href="/cars">
              <Button
                
                className="rounded-full cursor-pointer border-1 border-[#76ABAE] bg-transparent px-7 py-3 text-base text-[#EEEEEE] hover:bg-[#76ABAE]/10"
              >
                View All Cars
              </Button>
            </Link>
          </div>
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

        <BrowseCarsDrawer open={open} setOpen={setOpen} />
      </section>

      <main className=" bg-[#31363F] text-[#EEEEEE]">
        {/* Featured Carousel */}
        <section className="mx-auto  px-4 py-16">
          <div className="mb-8 text-center" id="main">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Featured rides
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Cars that turn trips into experiences
            </h2>
          </div>

          <CarsCarousel />
        </section>

        {/* How it works */}
        <section id="howto" className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Simple process
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              How Rydex Works
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="group rounded-2xl border border-white/10 bg-[#222831]/80 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#76ABAE]/70 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#76ABAE]/15 text-[#76ABAE] transition group-hover:bg-[#76ABAE] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-[#EEEEEE]/70">{step.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular cars */}
        <section className="mx-auto px-4 py-16">
          <div className="mb-8 w-full flex flex-col items-center gap-4 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
                Popular choices
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Most Searched Cars
              </h2>
            </div>

            <Link href="/cars">
              <Button className="rounded-full cursor-pointer bg-[#76ABAE] px-6 hover:bg-[#5A8B8E]">
                See Inventory
              </Button>
            </Link>
          </div>

          <CarGrid />
        </section>

        {/* Why choose us */}
        <section className="mx-4 my-16 rounded-3xl bg-[#222831] px-6 py-16 shadow-2xl">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
                Why choose us
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Built for smooth rentals
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-[#76ABAE]/40 bg-white/5 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                  >
                    <Icon className="mx-auto mb-4 h-8 w-8 text-[#76ABAE]" />
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-[#EEEEEE]/70">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Reviews />

        {/* CTA */}
        <section className="relative mx-4 my-20 overflow-hidden rounded-3xl bg-[#222831] px-6 py-20 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#76ABAE]/20 via-transparent to-[#76ABAE]/20" />
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#76ABAE]/30 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Ready to drive?
            </p>

            <h2 className="text-3xl font-bold md:text-5xl">
              Your next ride is waiting.
            </h2>

            <p className="mt-4 text-[#EEEEEE]/75">
              Browse our collection, choose the car that fits your trip, and book it in just a few clicks.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/cars">
                <Button className="group cursor-pointer relative h-auto overflow-hidden rounded-full border border-[#76ABAE] bg-[#76ABAE] px-7 py-3 text-base font-medium text-white">
                  <span className="absolute left-1/2 top-full h-8 w-8 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white transition-transform duration-700 ease-in-out group-hover:scale-[18]" />
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-[#222831]">
                    Browse Cars
                  </span>
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  variant="outline"
                  className="h-auto cursor-pointer rounded-full border-[#76ABAE] bg-transparent px-7 py-3 text-base text-[#EEEEEE] hover:bg-[#76ABAE]/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 pb-20 text-center">
          <div>
            <h2 className="text-2xl font-semibold">Join Rydex</h2>
            <p className="mt-2 text-[#EEEEEE]/70">
              Receive pricing updates, shopping tips, and rental inspiration.
            </p>
          </div>

          <div className="w-full max-w-md">
            <InputGroup className="border-white/10 bg-[#222831]">
              <InputGroupInput type="email" placeholder="example@gmail.com" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton className="bg-[#76ABAE] hover:bg-[#5A8B8E] text-white">
                  Sign Up
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </section>
      </main>
    </div>
  );
}