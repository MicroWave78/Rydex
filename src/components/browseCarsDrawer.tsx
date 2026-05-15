"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BrowseCarsDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const carTypes = [
  {
    title: "Standard",
    description: "Perfect for city driving and daily commuting.",
    type: "standard",
    image: "/images/hero-bg.jpg",
    alt: "Standard Car",
  },
  {
    title: "SUV",
    description: "Perfect for family trips and off-road adventures.",
    type: "suv",
    image: "/images/hero-bg.jpg",
    alt: "SUV Car",
  },
  {
    title: "Sports",
    description: "Perfect for speed and performance. Or just for fun!",
    type: "sports",
    image: "/images/hero-bg.jpg",
    alt: "Sports Car",
  },
];

export default function BrowseCarsDrawer({
  open,
  setOpen,
}: BrowseCarsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-h-[90vh] bg-[#31363F] p-4 text-[#EEEEEE]">
        <DrawerHeader>
          <DrawerTitle className="relative text-center text-[#EEEEEE]">
            <span>Choose Type</span>

            <DrawerClose asChild>
              <button
                type="button"
                aria-label="Close drawer"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-1 hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerTitle>

          <DrawerDescription className="text-center text-[#EEEEEE]/80">
            Here you can select the type of car you want to rent.
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid grid-cols-1 gap-6 overflow-y-auto px-2 pb-4 md:grid-cols-3 md:overflow-visible">
          {carTypes.map((type) => (
            <Card
              key={type.title}
              className="border-none bg-transparent text-center text-[#EEEEEE] shadow-none"
            >
              <CardHeader>
                <CardTitle>{type.title}</CardTitle>
                <CardDescription className="text-[#EEEEEE]/80">
                  {type.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Link href={`/cars?type=${type.type}`} onClick={() => setOpen(false)}>
                  <div className="group relative w-full overflow-hidden rounded-lg">
                    <Image
                      src={type.image}
                      alt={type.alt}
                      width={400}
                      height={300}
                      className="h-auto w-full rounded-lg object-cover transition duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 text-lg font-semibold text-white opacity-0 transition duration-200 group-hover:opacity-100">
                      Select
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}