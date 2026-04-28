// app/admin/cars/CarsManager.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import AddCarForm from "./AddCarForm"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Car = {
  id: number
  brand: string
  type: string
  model: string
  year: number
  pricePerDay: number
  seats: number
  hp: number
  transmission: string
  fuelType: string
  image: string
  description: string | null
  featured: boolean
  color: string | null
  mileage: number | null
  available: boolean
  createdAt: Date
}

export default function CarsManager({ cars }: { cars: Car[] }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <Link href="/admin" className="inline-block mt-24 text-white px-6 py-2 cursor-pointer hover:underline">
        <ArrowLeft className="inline-block w-4 h-4 mr-2" />
        Back to Admin Panel
      </Link>

      <div className="w-full flex flex-col items-center py-15 px-8">
        <h1 className="text-3xl font-bold mb-2">Manage Cars</h1>
        <p className="text-lg text-gray-500 mb-8">Add, edit, or remove cars from your fleet.</p>

        <Button
          variant={"outline"}
          className="dark mb-8 self-start cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Add New Car
        </Button>

        <AddCarForm open={open} setOpen={setOpen} />

        <Table className="dark">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Fuel Type</TableHead>
              <TableHead>HP</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Transmission</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Price per Day</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{new Date(car.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.type}</TableCell>
                <TableCell>{car.description ?? "-"}</TableCell>
                <TableCell>{car.featured ? "Yes" : "No"}</TableCell>
                <TableCell>{car.fuelType}</TableCell>
                <TableCell>{car.hp}</TableCell>
                <TableCell>{car.mileage ?? "-"}</TableCell>
                <TableCell>{car.seats}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell>{car.color ?? "-"}</TableCell>
                <TableCell>{car.available ? "Yes" : "No"}</TableCell>
                <TableCell>${car.pricePerDay}</TableCell>
                <TableCell className="flex">
                  <Link href={`/admin/cars/${car.id}/edit`}>
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Edit
                    </Button>
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        
                        size="sm"
                        className="cursor-pointer ml-2 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="dark">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete {car.brand} {car.model}?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          This action cannot be undone. The car will be permanently removed from the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction asChild>
                          <Button
                          className="cursor-pointer bg-red-400 hover:bg-red-500 "
                          onClick={async () => {
                            await fetch(`/api/cars?id=${car.id}`, {
                              method: "DELETE",
                            });
                            
                            toast.success(`${car.brand} ${car.model} deleted successfully.`, {position: "top-center"});
                            router.refresh();
                          }}>
                            Delete Car
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}