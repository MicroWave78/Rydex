import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCarForm from "./EditCarForm"

type EditCarPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCarPage({ params }: EditCarPageProps) {
  const { id } = await params;

  const carId = Number(id);

  if (Number.isNaN(carId)) {
    notFound();
  }

  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-24 text-[#EEEEEE]">
      <div className="mt-16 mx-auto max-w-3xl rounded-3xl bg-[#222831] p-6 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold">
          Edit {car.brand} {car.model}
        </h1>

        <p className="mb-8 text-[#EEEEEE]/60">
          Update car details, pricing, specs, and image.
        </p>

        <EditCarForm car={car} />
        
      </div>
    </main>
  );
}