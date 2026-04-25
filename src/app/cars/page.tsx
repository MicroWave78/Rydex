import CarsGrid from "./CarsGrid";
import prisma from "@/lib/prisma";

export default async function Cars() {
    const cars = await prisma.car.findMany({
        orderBy: {
            pricePerDay: "asc"
        }
    });

    return (
        <CarsGrid cars={cars} />
        
    );
}