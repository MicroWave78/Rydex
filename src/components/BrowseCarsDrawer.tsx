import Image from "next/image";
import { Button } from "@/components/ui/button";
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

import { cn } from "@/lib/utils"

var type = "";

export default function BrowseCarsDrawer() {
    return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="lg" className="hero-button" >Browse Cars</Button>
          </DrawerTrigger>
          
          <DrawerContent className={cn("drawer-content", "bg-[#31363F]", "text-[#EEEEEE]")}>
            <DrawerHeader>
              <DrawerTitle className="relative text-center text-[#EEEEEE]">
                <span>Choose Style</span>
                <DrawerClose asChild>
                  <X className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"/>
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription className="text-[#EEEEEE]">Here you can select the style of car you want to rent.</DrawerDescription>
            </DrawerHeader>

            <div className="drawer-content">
              <Card className="car-card">
                <CardHeader>
                  <CardTitle>Standard</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for city driving and daily commuting.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/images/test2.jpg" alt="Standard Car" width={400} height={300} className="car-image" />
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href={`/cars/standard`}>
                    <Button variant="default" className="cursor-pointer">Select</Button>
                </Link>
                </CardFooter>
              </Card>

              <Card className="car-card">
                <CardHeader>
                  <CardTitle>SUV</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for family trips and off-road adventures.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/images/test2.jpg" alt="SUV" width={400} height={300} className="car-image" />
                </CardContent>
                <CardFooter className="justify-center">
                  
                <Link href={`/cars/suv`}>
                    <Button variant="default" className="cursor-pointer">Select</Button>
                </Link>

                </CardFooter>
              </Card>

              <Card className="car-card">
                <CardHeader>
                  <CardTitle>Sports</CardTitle>
                  <CardDescription className="text-[#EEEEEE]">Perfect for speed and performance. Or just for fun!</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image src="/images/test2.jpg" alt="Sports Car" width={400} height={300} className="car-image" />
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href={`/cars/sports`}>
                    <Button variant="default" className="cursor-pointer">Select</Button>
                </Link>
                </CardFooter>
              </Card>

            </div>
          </DrawerContent>
        </Drawer>
    )
}