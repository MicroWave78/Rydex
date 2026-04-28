"use client";

import { useMemo, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type RentDialogProps = {
  carId: number;
  carName: string;
  pricePerDay: number;
  available: boolean;
};

const pickupPoints = [
  { id: 1, name: "Rydex Downtown Hub", top: "35%", left: "45%" },
  { id: 2, name: "Airport Partner Point", top: "55%", left: "70%" },
  { id: 3, name: "Mall Pickup Zone", top: "65%", left: "30%" },
  { id: 4, name: "Train Station Pickup", top: "42%", left: "20%" },
];

export default function RentDialog({
  carId,
  carName,
  pricePerDay,
  available
}: RentDialogProps) {
  const [open, setOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  }, [pickupDate, returnDate]);

  const totalPrice = rentalDays * pricePerDay;

  const handleConfirm = async () => {
    if (!pickupDate || !returnDate || !pickupLocation) {
      alert("Please complete all booking fields.");
      return;
    }

    if (rentalDays <= 0) {
      alert("Return date must be after pickup date.");
      return;
    }

    const res = await fetch("/api/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId,
        pickupDate,
        returnDate,
        pickupLocation,
        totalPrice,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

    alert("Booking created successfully!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
            disabled = {!available}
            className="mt-8 w-full cursor-pointer rounded-full bg-[#76ABAE] py-6 text-base hover:bg-[#5A8B8E]">
            {available ? "Book This Car" : "Currently Unavailable"}
        </Button>
      </DialogTrigger>

      <DialogContent className="dark max-w-3xl">
        <DialogHeader>
          <DialogTitle>Book {carName}</DialogTitle>
          <DialogDescription>
            Choose your pickup point, rental dates, and confirm your booking.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Fake Map */}
          <div>
            <h3 className="mb-3 font-semibold">Pickup point</h3>

            <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-[#222831]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#76ABAE22,transparent_55%)]" />

              
              <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
              <div className="absolute top-1/2 left-0 h-px w-full bg-white/10" />

              {pickupPoints.map((point) => (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setPickupLocation(point.name)}
                  className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition ${
                    pickupLocation === point.name
                      ? "scale-125 bg-[#76ABAE] shadow-lg shadow-[#76ABAE]/50"
                      : "bg-white text-black hover:scale-110"
                  }`}
                  style={{ top: point.top, left: point.left }}
                  title={point.name}
                >
                  <MapPin className="h-4 w-4" />
                </button>
              ))}
            </div>

            <p className="mt-3 text-sm text-[#EEEEEE]/70">
              Selected:{" "}
              <span className="font-semibold text-[#76ABAE]">
                {pickupLocation || "No pickup point selected"}
              </span>
            </p>
          </div>

          {/* Booking Form */}
          <div className="rounded-3xl bg-[#222831] p-5">
            <h3 className="mb-4 font-semibold">Rental details</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-[#EEEEEE]/70">
                  Pickup date
                </label>
                <Input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#EEEEEE]/70">
                  Return date
                </label>
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-sm">
                <div className="flex justify-between">
                  <span>Price / day</span>
                  <span>€{pricePerDay}</span>
                </div>

                <div className="mt-2 flex justify-between">
                  <span>Days</span>
                  <span>{rentalDays}</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#76ABAE]">€{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            className="bg-[#76ABAE] hover:bg-[#5A8B8E] cursor-pointer"
            onClick={handleConfirm}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}