"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CreditCard, Loader2, Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const carName = searchParams.get("carName") || "Rydex Rental";
  const price = Number(searchParams.get("price") || 0);
  const days = Number(searchParams.get("days") || 1);

  const serviceFee = 10;
  const total = price + serviceFee;

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        window.opener?.postMessage(
          {
            type: "PAYMENT_SUCCESS",
            carId,
            paidAmount: total,
          },
          "*"
        );

        window.close();
      }, 1500);
    }, 2200);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#31363F] px-4 text-[#EEEEEE]">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
        {!success ? (
          <>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#76ABAE]/20">
                <CreditCard className="h-7 w-7 text-[#76ABAE]" />
              </div>

              <h1 className="text-2xl font-bold">Secure Payment</h1>
              <p className="mt-2 text-sm text-[#EEEEEE]/60">
                Complete your booking for {carName}.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-white/5 p-4">
              <div className="flex justify-between text-sm">
                <span>{carName}</span>
                
              </div>

              <div className="mt-2 flex justify-between text-sm text-[#EEEEEE]/60">
                <span>Rental days</span>
                <span>{days}</span>
              </div>

              <div className="mt-2 flex justify-between text-sm text-[#EEEEEE]/60">
                <span>Service fee</span>
                <span>€{serviceFee}</span>
              </div>

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#76ABAE]">€{total}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Input placeholder="Cardholder name" />
              <Input placeholder="4242 4242 4242 4242" />

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="12/28" />
                <Input placeholder="123" />
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={processing}
              className="mt-6 w-full cursor-pointer rounded-full bg-[#76ABAE] py-6 hover:bg-[#5A8B8E]"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  Processing payment...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Pay €{total}
                </span>
              )}
            </Button>

            <p className="mt-4 text-center text-xs text-[#EEEEEE]/50">
              Demo payment page.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <CheckCircle2 className="h-20 w-20 animate-pulse text-green-400" />
            <h1 className="mt-6 text-3xl font-bold">Payment Confirmed</h1>
            <p className="mt-3 text-[#EEEEEE]/70">
              Your booking is being finalized.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}