import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Cog, MoveUpRight, Users } from "lucide-react"
import { Button } from "./ui/button";


type CarCardProps = {
  id: number;
  brand: string;
  model: string;
  type: string;
  description?: string | null;
  image: string;
  pricePerDay: number;
  seats: number;
  hp: number;
  transmission: string;
  fuelType: string;
  year: number;
};

export default function CarCard({
  id,
  brand,
  model,
  type,
  description,
  image,
  pricePerDay,
  seats,
  hp,
  transmission,
  fuelType,
  year,
}: CarCardProps) {
  return (
    <div className="w-full bg-[#EEEEEE] rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition duration-300">
      
      <div className="relative w-full h-52">
        <Image
          src={image}
          alt={`${brand} ${model}`}
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            20vw
            "
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5 text-[#222831]">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h2 className="text-xl font-bold">
              {brand} {model}
            </h2>
            <p className="text-sm text-gray-500">
              {year} • {type}
            </p>
          </div>

          <span className="text-lg font-bold text-[#76ABAE]">
            ${pricePerDay}/day
          </span>
        </div>

        <p className="text-sm mt-3 text-gray-700 line-clamp-2">
          {description || "Premium rental car ready for your next trip."}
        </p>

        <div className="grid grid-cols-4 gap-2 mt-4 text-xs text-center">
          <div className="bg-gray-100 rounded p-2">
            <Users className="w-5 h-5 inline-block mr-1" />
            {seats} Seats
          </div>
          <div className="bg-gray-100 rounded p-2">
            <Gauge className="w-5 h-5 inline-block mr-1" />
            {hp} HP
          </div>
          <div className="bg-gray-100 rounded p-2">
            <Cog className="w-5 h-5 inline-block mr-1" />
            {transmission}
          </div>
          <div className="bg-gray-100 rounded p-2">
            <Fuel className="w-5 h-5 inline-block mr-1" />
            {fuelType}
          </div>
        </div>

        <Link href={`/cars/${id}`}>
          <Button className="w-full mt-5 px-4 py-2 bg-[#31363F] text-[#EEEEEE] cursor-pointer rounded-lg hover:bg-[#222831] transition">
            View Details
            <MoveUpRight className="w-4 h-4 inline-block ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}