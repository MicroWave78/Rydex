import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function CarEditPage() {
    const carId = 1; // Replace with actual ID from route params
    const car = await prisma.car.findUnique({ where: { id: carId } });
    return (
        <div className="mt-24">
            <h1>Edit {car?.brand} {car?.model}</h1>
            
        </div>
    );
}