import CarsGrid from "./CarsGrid";
import prisma from "@/lib/prisma";

export default async function Cars() {
    const cars = await prisma.car.findMany();

    return (
        <CarsGrid cars={cars} />
        
    );
}