"use client"

import Image from "next/image";
import Link from "next/link";
import { X } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function BrowseCarsDrawer({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
    return (
        <Drawer open = {open} onOpenChange={setOpen}>
          <DrawerContent className="bg-[#31363F] p-4">
            <DrawerHeader>
              <DrawerTitle className="text-center relative text-[#EEEEEE]">
                <span>Choose Style</span>
                <DrawerClose asChild>
                  <X className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"/>
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription className="text-[#EEEEEE]">
                Here you can select the style of car you want to rent.
              </DrawerDescription>
            </DrawerHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto md:overflow-hidden">
              <Card className="text-center bg-[#31363F] border-none text-[#EEEEEE] shadow-none">
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for city driving and daily commuting.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/cars/standard`}>
                    <div className="relative group w-full">
                      <Image 
                      src="/images/hero-bg.jpg" 
                      alt="Standard Car" 
                      width={400}
                      height={300} 
                      className="w-full h-auto object-cover rounded-lg"></Image> 
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200">Select</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center bg-[#31363F] border-none text-[#EEEEEE] shadow-none">
                <CardHeader>
                  <CardTitle>SUV</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for family trips and off-road adventures.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/cars/suv`}>
                    <div className="relative group w-full">
                      <Image 
                      src="/images/hero-bg.jpg" 
                      alt="SUV Car" 
                      width={400}
                      height={300} 
                      className="w-full h-auto object-cover rounded-lg"></Image> 
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200">Select</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center bg-[#31363F] border-none text-[#EEEEEE] shadow-none">
                <CardHeader>
                  <CardTitle>Sports</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for speed and performance. Or just for fun!</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/cars/sports`}>
                    <div className="relative group w-full">
                      <Image 
                      src="/images/hero-bg.jpg" 
                      alt="Sports Car" 
                      width={400}
                      height={300} 
                      className="w-full h-auto object-cover rounded-lg"></Image> 
                      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200">Select</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

            </div>
          </DrawerContent>
        </Drawer>
    )
}