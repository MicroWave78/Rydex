"use client";

import TitleSubtitle from "@/components/titleSubtitle";
import FAQ from "@/components/faq";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  ArrowDown,
  Calendar,
  Car,
  CircleDollarSign,
  Component,
  Cpu,
  Gem,
  ShieldCheck,
  ShieldQuestionMark,
  Tag,
  Wrench,
} from "lucide-react";

const storyCards = [
  {
    icon: CircleDollarSign,
    title: "Fair Pricing",
    text: "Clear daily rates designed to help customers choose confidently.",
  },
  {
    icon: Gem,
    title: "Premium Feel",
    text: "A clean rental experience with cars for every kind of trip.",
  },
  {
    icon: Tag,
    title: "Simple Offers",
    text: "Browse, compare, and book without confusing steps.",
  },
  {
    icon: Car,
    title: "Reliable Fleet",
    text: "Vehicles selected to fit city drives, weekends, and business travel.",
  },
];

const values = [
  {
    icon: CircleDollarSign,
    title: "Customer Satisfaction",
    text: "Every feature is built around making the rental process easier.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Transparent information, honest pricing, and predictable booking.",
  },
  {
    icon: Cpu,
    title: "Innovation",
    text: "Modern tools and a clean interface for a better rental flow.",
  },
  {
    icon: Car,
    title: "Sustainability",
    text: "A growing mix of efficient, hybrid, and electric vehicle options.",
  },
  {
    icon: Wrench,
    title: "Teamwork",
    text: "A platform built around smooth coordination between cars and clients.",
  },
];

const reasons = [
  {
    icon: ShieldQuestionMark,
    title: "No Hidden Fees",
    text: "Transparent prices from the beginning, with no surprise checkout costs.",
  },
  {
    icon: Calendar,
    title: "Fast Booking",
    text: "Choose your car, select dates, and reserve in just a few clicks.",
  },
  {
    icon: Car,
    title: "Wide Variety",
    text: "Economy, SUV, luxury, electric, and sports cars in one place.",
  },
  {
    icon: Component,
    title: "Clean UI",
    text: "A smooth interface that makes browsing and booking feel natural.",
  },
];

export default function About() {
  const [start, setStart] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.45,
  });

  useEffect(() => {
    if (inView) setStart(true);
  }, [inView]);

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

      <section className="relative mt-16 flex min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-50px)] flex-col items-center justify-center px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#31363F]" />

        <div className="relative z-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
            More than rentals
          </p>

          <TitleSubtitle
            title="About Rydex"
            subtitle="Premium car rental experience, redefined."
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

      <main className="bg-[#31363F] text-[#EEEEEE]">
        {/* Story */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Our Story
            </p>

            <h1 className="mt-3 text-3xl font-bold md:text-5xl">
              Built to make car rental feel effortless.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#EEEEEE]/75 md:text-lg">
              Rydex was created to simplify the way people rent cars. No complicated
              processes, no hidden fees — just a smooth experience from search to drive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {storyCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#222831]/80 p-6 transition duration-300 hover:-translate-y-2 hover:border-[#76ABAE]/70 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#76ABAE]/15 text-[#76ABAE] transition group-hover:bg-[#76ABAE] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#EEEEEE]/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mx-4 rounded-3xl bg-[#222831] px-6 py-20 shadow-2xl">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Our Values
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              What Rydex stands for
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#76ABAE]/30 bg-white/5 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                  >
                    <Icon className="mx-auto mb-4 h-8 w-8 text-[#76ABAE]" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#EEEEEE]/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why best */}
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Why Rydex
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Why is Rydex the best choice?
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#222831]/80 p-6 text-center transition duration-300 hover:-translate-y-2 hover:border-[#76ABAE]/70 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#76ABAE]/15 text-[#76ABAE] transition group-hover:bg-[#76ABAE] group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#EEEEEE]/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        <section ref={ref} className="mx-4 rounded-3xl bg-[#222831] px-6 py-20 shadow-2xl">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
              Achievements
            </p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Numbers that tell the story
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              <StatCircle
                value={start ? <CountUp start={0} end={10000} duration={2} delay={0.5} /> : 0}
                suffix="+"
                label="Bookings"
                text="Rydex proudly serves thousands of satisfied customers."
              />

              <StatCircle
                value={start ? <CountUp start={0} end={500} duration={2} delay={1.5} /> : 0}
                suffix="+"
                label="Cars"
                text="A growing fleet built for every type of journey."
              />

              <StatCircle
                value={start ? <CountUp start={0} end={98} duration={2} delay={2.5} /> : 0}
                suffix="%"
                label="Satisfaction"
                text="A customer-first experience from browsing to booking."
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-20">
          <FAQ />
        </section>
      </main>
    </div>
  );
}

function StatCircle({
  value,
  suffix,
  label,
  text,
}: {
  value: React.ReactNode;
  suffix: string;
  label: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-[#76ABAE]/70 bg-white/5 shadow-2xl shadow-[#76ABAE]/10 transition duration-300 hover:-translate-y-2 hover:shadow-[#76ABAE]/30">
        <h3 className="text-3xl font-bold text-[#76ABAE]">
          {value}
          {suffix}
        </h3>
        <p className="mt-1 text-sm text-[#EEEEEE]/70">{label}</p>
      </div>

      <p className="max-w-xs text-sm text-[#EEEEEE]/70 md:text-base">{text}</p>
    </div>
  );
}