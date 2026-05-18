"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import AlertMessage from "@/components/alertMessage";

type RentDialogProps = {
  carId: number;
  carName: string;
  pricePerDay: number;
  available: boolean;
  isLoggedIn: boolean;
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
  available,
  isLoggedIn,
}: RentDialogProps) {
  const [open, setOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");

  const [processing, setProcessing] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);
  const [secondaryButtonText, setSecondaryButtonText] = useState("");

  const paymentWindowRef = useRef<Window | null>(null);
  const paymentCheckerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const paymentFinishedRef = useRef(false);

  const clearPaymentChecker = () => {
    if (paymentCheckerRef.current) {
      clearInterval(paymentCheckerRef.current);
      paymentCheckerRef.current = null;
    }
    paymentWindowRef.current = null;
  };

  const createRental = async () => {
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
          throw new Error(data.error || "Something went wrong.");
        }

        return data.rental;
  }

  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  }, [pickupDate, returnDate]);

  const totalPrice = rentalDays * pricePerDay;

  useEffect(() => {
    const handlePaymentMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.carId && Number(event.data.carId) !== carId) return;

      if (event.data?.type === "PAYMENT_CANCELLED") {
        paymentFinishedRef.current = true;
        clearPaymentChecker();
        setProcessing(false);
        return;
      }

      if (event.data?.type !== "PAYMENT_SUCCESS") return;

      paymentFinishedRef.current = true;
      clearPaymentChecker();

      try {
        const rental = await createRental();

        setProcessing(false);
        setOpen(false);

        setAlertType("success");
        setAlertTitle(`Booking Confirmed (Rental ID: #${rental.id})`);
        setAlertMessage(
          <>
            Your payment was successful and your rental has been booked.
            <br />
            You can view it in your profile.
          </>
        );
        setOpen(false);
        setOpenAlert(true);
      } catch (error) {
        setProcessing(false);

        setAlertType("error");
        setAlertTitle("Booking Failed");
        setAlertMessage(
          error instanceof Error
            ? error.message
            : "Payment succeeded, but the booking could not be saved."
        );
        setOpen(false);
        setOpenAlert(true);
      }
    };

    window.addEventListener("message", handlePaymentMessage);

    return () => {
      window.removeEventListener("message", handlePaymentMessage);
      clearPaymentChecker();
    };
  }, [carId, pickupDate, returnDate, pickupLocation, totalPrice]);

  const handleConfirm = () => {
    if (!pickupDate || !returnDate || !pickupLocation) {
      setAlertType("error");
      setAlertTitle("Missing Details");
      setAlertMessage("Please complete all booking fields.");
      setOpenAlert(true);
      return;
    }

    if (rentalDays <= 0) {
      setAlertType("error");
      setAlertTitle("Invalid Dates");
      setAlertMessage("Return date must be after pickup date.");
      setOpenAlert(true);
      return;
    }

    paymentFinishedRef.current = false;
    clearPaymentChecker();

    

    const paymentWindow = window.open(
      `/payment?carId=${carId}&carName=${encodeURIComponent(carName)}&price=${totalPrice}&days=${rentalDays}`,
      "_blank",
      "width=720, height=860"
    );

    if (!paymentWindow) {
      setProcessing(false);
      setAlertType("error");
      setAlertTitle("Payment Window Blocked");
      setAlertMessage("Please allow popups and try again.");
      setOpenAlert(true);
    }

    paymentWindowRef.current = paymentWindow;
    setProcessing(true);

    paymentCheckerRef.current = setInterval(() => {
      if (paymentWindow?.closed && !paymentFinishedRef.current) {
        clearPaymentChecker();
        setProcessing(false);
      }
    }, 500);
    
  };

  return (
    <>
    <AlertMessage
      type={alertType}
      title={alertTitle}
      message={alertMessage}
      open={openAlert}
      setOpen={setOpenAlert}
      buttonText={!isLoggedIn ? "Cancel" : "OK"}
      link=""
      secondaryButtonText={secondaryButtonText}
      onSecondaryConfirm={() => window.location.href = "/login"}
    />

    <Button
      disabled = {!available}
      className="mt-8 w-full cursor-pointer rounded-full bg-[#76ABAE] py-6 text-base hover:bg-[#5A8B8E]"
      onClick={() => {
        if (!isLoggedIn) {
          setAlertType("error");
          setAlertTitle("Login Required");
          setAlertMessage("You need to be logged in before booking a car.");
          setSecondaryButtonText("Go to Login");
          setOpenAlert(true);
          return;
        }
        setOpen(true);
      }}>
      {available ? "Rent This Car" : "Currently Unavailable"}
    </Button>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="dark rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
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
            disabled={processing}
            className="bg-[#76ABAE] hover:bg-[#5A8B8E] cursor-pointer"
            onClick={handleConfirm}
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Processing payment...
              </span>
            ) : (
              "Confirm Booking"
            )}
            
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
