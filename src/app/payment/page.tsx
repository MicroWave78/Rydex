"use client";

import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import AlertMessage from "@/components/alertMessage";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const paymentCompleteRef = useRef(false);
  

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

  const paymentType = searchParams.get("type") || "rental";

  const carId = searchParams.get("carId");
  const itemName =
    searchParams.get("itemName") ||
    searchParams.get("carName") ||
    "Rydex Payment";

  const price = Number(searchParams.get("price") || 0);
  const days = Number(searchParams.get("days") || 1);

  const isVipPayment = paymentType === "vip";

  const serviceFee = isVipPayment ? 0 : 10;
  const total = price + serviceFee;

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!paymentCompleteRef.current) {
        window.opener?.postMessage(
          {
            type: isVipPayment ? "VIP_PAYMENT_CANCELLED" : "PAYMENT_CANCELLED",
            carId,
            paymentType,
          },
          window.location.origin
        )
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [carId, isVipPayment, paymentType]);

  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiry || !cvc) {
      setAlertType("error");
      setAlertTitle("Invalid Payment Details");
      setAlertMessage("Please fill in all payment details.");
      setOpen(true);
      return;
    }
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        paymentCompleteRef.current = true;

        window.opener?.postMessage(
          {
            type: isVipPayment ? "VIP_PAYMENT_SUCCESS" : "PAYMENT_SUCCESS",
            carId,
            paidAmount: total,
            paymentType,
          },
          window.location.origin
        );

        window.close();
      }, 1500);
    }, 2200);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#31363F] px-4 text-[#EEEEEE]">
      <AlertMessage
        open={open}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        buttonText="OK"
        link=""
        setOpen={setOpen}
      />
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
        {!success ? (
          <>
          <form onSubmit={handlePayment}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#76ABAE]/20">
                <CreditCard className="h-7 w-7 text-[#76ABAE]" />
              </div>

              <h1 className="text-2xl font-bold">Secure Payment</h1>
              <p className="mt-2 text-sm text-[#EEEEEE]/60">
                Complete your booking for {itemName}.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-white/5 p-4">
              <div className="flex justify-between text-sm">
                <span>{itemName}</span>
                <span>€{price.toFixed(2)}</span>
              </div>

              {!isVipPayment && (
                <div className="mt-2 flex justify-between text-sm text-[#EEEEEE]/60">
                  <span>Rental days</span>
                  <span>{days}</span>
                </div>
              )}

              {!isVipPayment && (
                <div className="mt-2 flex justify-between text-sm text-[#EEEEEE]/60">
                  <span>Service fee</span>
                  <span>€{serviceFee}</span>
                </div>
              )}

              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#76ABAE]">€{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Input
                placeholder="Cardholder name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <Input
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="12/28"
                  value={expiry}
                  maxLength={5}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2, 4);
                    }
                    setExpiry(value)}}
                />
                <Input
                  placeholder="123"
                  inputMode="numeric"
                  value={cvc}
                  maxLength={3}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
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

          </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <CheckCircle2 className="h-20 w-20 animate-pulse text-green-400" />
            <h1 className="mt-6 text-3xl font-bold">Payment Confirmed</h1>
            <p className="mt-3 text-[#EEEEEE]/70">
              {isVipPayment 
              ? "Your VIP upgrade is successful." 
              : "Your booking is being finalized."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}