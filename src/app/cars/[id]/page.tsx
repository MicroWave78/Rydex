import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function CarsByTypePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id: Number(id)},
  });

  if (!car) notFound()

  return <div className="cars-by-type-page">Showing cars of type: {id}</div>
}