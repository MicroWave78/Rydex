"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AlertMessage from "@/components/alertMessage";

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

type CancelRentalButtonProps = {
  rentalId: number;
};

export default function CancelRentalButton({
  rentalId,
}: CancelRentalButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

  const handleCancel = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/rentals/${rentalId}/cancel`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel rental.");
      }

      setAlertType("success");
      setAlertTitle("Booking Cancelled");
      setAlertMessage("Your rental has been cancelled successfully.");
      setOpenAlert(true);

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Cancellation Failed");
      setAlertMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setOpenAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertMessage
        open={openAlert}
        setOpen={setOpenAlert}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        buttonText="OK"
        link=""
      />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            disabled={loading}
            className="cursor-pointer rounded-full"
          >
            {loading ? (
              <>
                <Spinner />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Cancel Booking
              </>
            )}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="dark">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This rental will be marked as cancelled. You will still be able to
              see it in your rental history, and admins will see the cancelled
              status in the admin dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Keep Booking
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                disabled={loading}
                onClick={handleCancel}
                className="cursor-pointer"
              >
                {loading ? "Cancelling..." : "Yes, Cancel Booking"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}