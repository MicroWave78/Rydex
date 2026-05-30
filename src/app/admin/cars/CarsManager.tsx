"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, ArrowUpDown, Search, XCircle, Star, CheckCircle2, Car } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import AdminManagerLayout from "@/components/admin/AdminManagerLayout"
import AdminStatCard from "@/components/admin/AdminStatCard"

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

type SortKey = 
  | "id"
  | "createdAt"
  | "brand"
  | "model"
  | "year"
  | "type"
  | "featured"
  | "fuelType"
  | "hp"
  | "mileage"
  | "seats"
  | "transmission"
  | "color"
  | "available"
  | "pricePerDay";

type SortDirection = "asc" | "desc"

export default function CarsManager({ cars }: { cars: Car[] }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const [sortKey, setSortKey] = useState<SortKey>("id")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 15

  const handleSort = (key: SortKey) => {
    setPage(1)
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedCars = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = cars.filter((car) => {
      if (!query) return true

      const searchableText = [
        car.id,
        car.brand,
        car.model,
        car.year,
        car.type,
        car.featured ? "featured yes" : "not featured no",
        car.fuelType,
        car.hp,
        car.mileage,
        car.seats,
        car.transmission,
        car.color,
        car.available ? "available yes" : "unavailable no",
        car.pricePerDay,
        new Date(car.createdAt).toLocaleDateString(),
      ]
      .join(" ")
      .toLowerCase();

      return searchableText.includes(query);
    });

    filtered.sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      if (sortKey === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      }

      if (typeof aValue === "boolean") {
        aValue = aValue ? 1 : 0;
      }

      if (typeof bValue === "boolean") {
        bValue = bValue ? 1 : 0;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      const result = String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? result : -result;
    });

    return filtered;
  }, [cars, search, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedCars.length / pageSize))

  useEffect(() => {
  if (page > totalPages) {
    setPage(totalPages);
  }
}, [page, totalPages]);

const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;

const paginatedCars = filteredAndSortedCars.slice(startIndex, endIndex);

const sortableHead = (label: string, key: SortKey) => (
  <TableHead>
    <button
      type="button"
      onClick={() => handleSort(key)}
      className="flex items-center gap-1 cursor-pointer whitespace-nowrap transition hover:text-[#76ABAE]"
    >
      {label}
      <ArrowUpDown
        className={`h-3 w-3 ${
          sortKey === key ? "text-[#76ABAE]" : "opacity-70"
        }`}
      />
    </button>
  </TableHead>
);

  return (
    <>

      <AdminManagerLayout
        eyebrow="Manage Cars"
        title="Car Inventory"
        description="Add, edit, or remove cars from your fleet."
      >
        
      
        <Button
          variant={"outline"}
          className="dark mb-8 self-start cursor-pointer hidden md:block"
          onClick={() => setOpen(true)}
        >
          Add New Car
        </Button>

        <AddCarForm open={open} setOpen={setOpen} />

        <div className="mb-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search cars by brand, model, fuel, type..."
              className="dark pl-9"
            />
          </div>

          <p className="text-sm text-gray-400">
            Showing {paginatedCars.length} of {filteredAndSortedCars.length} cars
          </p>
        </div>
        <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
        <Table className="dark">
          <TableHeader>
            <TableRow>
              {sortableHead("Id", "id")}
              {sortableHead("Created At", "createdAt")}
              {sortableHead("Brand", "brand")}
              {sortableHead("Model", "model")}
              {sortableHead("Year", "year")}
              {sortableHead("Type", "type")}
              <TableHead>Description</TableHead>
              {sortableHead("Featured", "featured")}
              {sortableHead("Fuel Type", "fuelType")}
              {sortableHead("HP", "hp")}
              {sortableHead("Mileage", "mileage")}
              {sortableHead("Seats", "seats")}
              {sortableHead("Transmission", "transmission")}
              {sortableHead("Color", "color")}
              {sortableHead("Available", "available")}
              {sortableHead("Price per Day", "pricePerDay")}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{new Date(car.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.type}</TableCell>
                <TableCell>{car.description ?? "-"}</TableCell>
                <TableCell className={car.featured ? "text-green-500" : "text-red-500"}>
                  {car.featured ? "Yes" : "No"}
                </TableCell>
                <TableCell>{car.fuelType}</TableCell>
                <TableCell>{car.hp}</TableCell>
                <TableCell>{car.mileage ?? "-"}</TableCell>
                <TableCell>{car.seats}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell>{car.color ?? "-"}</TableCell>
                <TableCell className={car.available ? "text-green-500" : "text-red-500"}>
                  {car.available ? "Yes" : "No"}
                </TableCell>
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

        <div className="mt-6 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-400">
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              className="dark cursor-pointer"
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
              className="dark cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
        
      </AdminManagerLayout>
    </>
  )
}