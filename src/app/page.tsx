import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

export default function Home() {
  return (
    <div className="main-container">

      <div className="hero-bg"></div>

      <div className="hero-content">
        <h1 className="hero-title">Find your next ride.</h1>
        <p className="hero-description">Discover the best car rental deals in town. Whether you're looking for a compact car, an SUV, or a luxury vehicle, we have you covered.</p>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="lg" className="hero-button" >Browse Cars</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Choose Style</DrawerTitle>
              <DrawerDescription>Here you can select the style of car you want to rent.</DrawerDescription>
            </DrawerHeader>
            
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="hero-button">
                  Cancel
                </Button>
              </DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="content">
        <h2 className="content-title">Why Choose Us?</h2>
        <p className="content-description">We offer a wide selection of vehicles, competitive pricing, and exceptional customer service. Our easy-to-use platform allows you to book your car rental in just a few clicks.</p>
      </div>
    </div>
  );
}
