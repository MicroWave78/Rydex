'use client'

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import AlertMessage from "@/components/alertMessage";

type ReviewFormProps = {
  carId: number;
};

export default function ReviewForm({ carId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setAlertType("success");
      setAlertTitle("Review Submitted");
      setAlertMessage(
        "Thank you for sharing your experience with this vehicle."
      );

      setOpenAlert(true);

      setComment("");
      setRating(5);

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      setAlertType("error");
      setAlertTitle("Review Failed");
      setAlertMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your review."
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

      <div className="mt-8 rounded-3xl bg-[#222831] p-6 shadow-xl">
        <h3 className="text-xl font-bold">Leave a review</h3>

        <p className="mt-2 text-sm text-[#EEEEEE]/60">
          Share your experience with this car and help other drivers.
        </p>

        <div className="mt-5 flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="cursor-pointer transition hover:scale-110"
            >
              <Star
                className={`h-7 w-7 transition ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others about your experience..."
          className="mt-5 min-h-[140px] max-h-[200px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-[#76ABAE]/60"
        />

        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-5 cursor-pointer bg-[#76ABAE] hover:bg-[#5A8B8E]"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </>
  );
}