"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import TitleSubtitle from "@/components/titleSubtitle";
import BrowseCarsDrawer from "@/components/browseCarsDrawer";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-50px)] flex-col items-center justify-center px-4 text-center md:min-h-[calc(100vh+10px)]">
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
            className="cursor-pointer rounded-full bg-[#76ABAE] px-7 py-3 text-base text-white hover:bg-[#5A8B8E]"
            onClick={() => setOpen(true)}
          >
            Browse by Type
          </Button>

          <Link href="/cars">
            <Button className="cursor-pointer rounded-full border-1 border-[#76ABAE] bg-transparent px-7 py-3 text-base text-[#EEEEEE] hover:bg-[#76ABAE]/10">
              View All Cars
            </Button>
          </Link>
        </div>
      </div>

      <div
        className="flex flex-col items-center absolute bottom-6 transition-opacity duration-200"
        style={{
          opacity: Math.max(1 - scrollY / 100, 0),
          pointerEvents: scrollY > 100 ? "none" : "auto",
        }}
      >
        <p className="text-sm text-[#EEEEEE]/70 mb-6">Scroll down to explore</p>
        <ArrowDown className="h-9 w-9 animate-bounce rounded-full bg-white p-1 text-black" />
      </div>

      <BrowseCarsDrawer open={open} setOpen={setOpen} />
    </section>
  );
}