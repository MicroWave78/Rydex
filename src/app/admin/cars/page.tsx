import prisma from "@/lib/prisma"
import CarsManager from "./CarsManager"

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany()

  return <CarsManager cars={cars} />
}