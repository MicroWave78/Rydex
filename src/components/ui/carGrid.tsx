import Image from "next/image"
import { BookmarkIcon, Gauge, Fuel, Cog, MoveUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

const cars = [
    {
        name: "Ford Transit",
        price: "$22,000",
        miles: "2500 Miles",
        fuel: "Diesel",
        transmission: "Manual",
        img: "/images/demo-car-1.webp",
        badge: "Great Price",
        badgeColor: "bg-[#207d24]",
        description: "4.0 D5 PowerPulse Momentum 5dr AWD"
    },
    {
        name: "New GLC",
        price: "$95,000",
        miles: "50 Miles",
        fuel: "Petrol",
        transmission: "Automatic",
        img: "/images/demo-car-1.webp",
        badge: "Low Mileage",
        badgeColor: "bg-[#2363b8]",
        description: "4.0 D5 PowerPulse Momentum 5dr AWD"
    },
    {
        name: "Audi A6 3.5",
        price: "$58,000",
        miles: "100 Miles",
        fuel: "Petrol",
        transmission: "Automatic",
        img: "/images/demo-car-1.webp",
        description: "3.5 D5 PowerPulse Momentum 5dr AWD"
    },
    {
        name: "Ford Transit",
        price: "$45,000",
        miles: "15000 Miles",
        fuel: "Diesel",
        transmission: "Manual",
        img: "/images/demo-car-1.webp",
        description: "3.5 D5 PowerPulse Momentum 5dr AWD"
    }
]

export default function CarGrid() {
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mt-5">
            {cars.map((car, i) => (
                <div key={i}
                className="rounded-2xl overflow-hidden border-none bg-[#0f172a] hover:scale-[1.02] transition duration-300 shadow-2xl hover:shadow-[#1d4f52]"
                >
                    {/* img */}
                    <div className="relative">
                        <img
                            src={car.img}
                            className="w-full h-auto md:h-70 object-cover"
                            alt="demo car"
                        />

                        {/* badge */}
                        {car.badge && (
                            <span className={`absolute top-3 left-3 ${car.badgeColor} text-white text-xs px-3 py-1 rounded-full`}>
                                {car.badge}
                            </span>
                        )}

                        {/* bookmark */}
                        <Toggle aria-label="Toggle bookmark" size="sm" className="absolute top-3 right-3 p-1 rounded-full">
                            <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
                        </Toggle>

                    </div>

                    {/* Info */}
                    <div className="p-4 text-white bg-gradient-to-b from-[#31363F] to-[#08383b]">
                        <h3 className="font-semibold text-sm mb-1">
                            {car.name}
                        </h3>

                        <p className="text-xs text-gray-300 mb-3">
                            {car.description}
                        </p>

                        <div className="flex justify-between text-xs text-white mb-3 p-1">
                            <span className="flex flex-col items-center">
                                <Gauge className="w-5 h-5"/>
                                {car.miles}
                            </span>
                            <span className="flex flex-col items-center">
                                <Fuel className="w-5 h-5"/>
                                {car.fuel}
                            </span>
                            <span className="flex flex-col items-center">
                                <Cog className="w-5 h-5"/>
                                {car.transmission}
                            </span>
                        </div>

                        {/* footer */}
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">
                                {car.price}
                            </span>

                            <Button className="text-sm text-grey-300 hover:text-white cursor-pointer hover:-translate-y-1 transition duration-300">
                                View Details <MoveUpRight className="w-1 h-1"/>
                            </Button>

                        </div>
                    </div>

                </div>
            ))}
            
            
        </div>
        <div className="flex flex-row justify-center gap-2 mt-2">
            <span className="p-2"><ChevronLeft className="cursor-pointer hover:text-[#76ABAE] transition duration-200"/></span>
            <span className="p-2"><ChevronRight className="cursor-pointer hover:text-[#76ABAE] transition duration-200"/></span>
        </div>
        </>
    )
}