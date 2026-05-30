"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpDown, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
} from "@/components/ui/alert-dialog";
import AdminManagerLayout from "@/components/admin/AdminManagerLayout";

type Rental = {
  id: number;
  userId: number;
  userEmail: string;
  carId: number;
  carName: string;
  carType: string;
  pricePerDay: number;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

type SortKey =
  | "id"
  | "createdAt"
  | "userEmail"
  | "carName"
  | "carType"
  | "pickupLocation"
  | "pickupDate"
  | "returnDate"
  | "days"
  | "totalPrice"
  | "status";

type SortDirection = "asc" | "desc";

export default function RentalsManager({ rentals }: { rentals: Rental[] }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const pageSize = 15;

  const getRentalDays = (pickupDate: string, returnDate: string) => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedRentals = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = rentals.filter((rental) => {
      if (!query) return true;

      const days = getRentalDays(rental.pickupDate, rental.returnDate);

      const searchableText = [
        rental.id,
        rental.userId,
        rental.userEmail,
        rental.carId,
        rental.carName,
        rental.carType,
        rental.pickupLocation,
        formatDate(rental.pickupDate),
        formatDate(rental.returnDate),
        formatDate(rental.createdAt),
        rental.pricePerDay,
        rental.totalPrice,
        days,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    filtered.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (sortKey === "days") {
        aValue = getRentalDays(a.pickupDate, a.returnDate);
        bValue = getRentalDays(b.pickupDate, b.returnDate);
      } else if (
        sortKey === "createdAt" ||
        sortKey === "pickupDate" ||
        sortKey === "returnDate"
      ) {
        aValue = new Date(a[sortKey]).getTime();
        bValue = new Date(b[sortKey]).getTime();
      } else {
        aValue = a[sortKey];
        bValue = b[sortKey];
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
  }, [rentals, search, sortKey, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedRentals.length / pageSize)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * pageSize;
  const paginatedRentals = filteredAndSortedRentals.slice(
    startIndex,
    startIndex + pageSize
  );

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
            sortKey === key ? "text-[#76ABAE]" : "opacity-40"
          }`}
        />
      </button>
    </TableHead>
  );

  return (
    <>
      <AdminManagerLayout
        eyebrow="Rentals"
        title="Manage Rentals"
        description="View, search, and manage all customer rentals."
      >

        <div className="mb-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search rentals by user, car, location..."
              className="dark pl-9"
            />
          </div>

          <p className="text-sm text-gray-400">
            Showing {paginatedRentals.length} of{" "}
            {filteredAndSortedRentals.length} rentals
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-white/10">
          <Table className="dark">
            <TableHeader>
              <TableRow>
                {sortableHead("Id", "id")}
                {sortableHead("Created At", "createdAt")}
                {sortableHead("User", "userEmail")}
                {sortableHead("Car", "carName")}
                {sortableHead("Type", "carType")}
                {sortableHead("Pickup Location", "pickupLocation")}
                {sortableHead("Pickup Date", "pickupDate")}
                {sortableHead("Return Date", "returnDate")}
                {sortableHead("Days", "days")}
                {sortableHead("Total Price", "totalPrice")}
                {sortableHead("Status", "status")}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedRentals.map((rental) => {
                const days = getRentalDays(
                  rental.pickupDate,
                  rental.returnDate
                );

                return (
                  <TableRow key={rental.id}>
                    <TableCell>{rental.id}</TableCell>
                    <TableCell>{formatDate(rental.createdAt)}</TableCell>
                    <TableCell>{rental.userEmail}</TableCell>
                    <TableCell>{rental.carName}</TableCell>
                    <TableCell>{rental.carType}</TableCell>
                    <TableCell>{rental.pickupLocation}</TableCell>
                    <TableCell>{formatDate(rental.pickupDate)}</TableCell>
                    <TableCell>{formatDate(rental.returnDate)}</TableCell>
                    <TableCell>{days}</TableCell>
                    <TableCell className="font-semibold text-[#76ABAE]">
                      €{rental.totalPrice}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          rental.status === "CANCELLED"
                            ? "bg-red-500/10 text-red-400"
                            : rental.status === "CONFIRMED"
                            ? "bg-green-500/10 text-green-400"
                            : rental.status === "COMPLETED"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                        >
                        {rental.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="cursor-pointer bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="dark">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete rental #{rental.id}?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This will permanently remove the booking for{" "}
                              {rental.userEmail} renting {rental.carName}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction asChild>
                              <Button
                                className="cursor-pointer bg-red-400 hover:bg-red-500"
                                onClick={async () => {
                                  const res = await fetch(
                                    `/api/rentals/${rental.id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  );

                                  if (!res.ok) {
                                    toast.error("Failed to delete rental.", {
                                      position: "top-center",
                                    });
                                    return;
                                  }

                                  toast.success(
                                    `Rental #${rental.id} deleted successfully.`,
                                    {
                                      position: "top-center",
                                    }
                                  );

                                  router.refresh();
                                }}
                              >
                                Delete Rental
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })}

              {paginatedRentals.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="py-10 text-center text-gray-400"
                  >
                    No rentals found.
                  </TableCell>
                </TableRow>
              )}
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
              onClick={() =>
                setPage((current) => Math.min(current + 1, totalPages))
              }
              className="dark cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </AdminManagerLayout>
    </>
  );
}