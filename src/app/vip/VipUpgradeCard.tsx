"use client";

import { useEffect, useState } from "react";
import { Crown, Gem, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AlertMessage from "@/components/alertMessage";

const benefits = [
  {
    icon: Gem,
    title: "Exclusive status",
    text: "VIP badge displayed across your account and public profile.",
  },
  {
    icon: Zap,
    title: "Priority booking",
    text: "Get priority access to popular and high-demand vehicles.",
  },
  {
    icon: ShieldCheck,
    title: "Reduced service fees",
    text: "Enjoy lower fees on eligible rentals and premium bookings.",
  },
  {
    icon: Sparkles,
    title: "Premium offers",
    text: "Unlock special offers and future VIP-only vehicles.",
  },
];

export default function VipUpgradeCard() {
    const [loading, setLoading] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

    const handleUpgrade = async () => {
        const paymentWindow = window.open(
            `/payment?type=vip&itemName=${encodeURIComponent(
            "Rydex VIP Membership"
            )}&price=9.99`,
            "_blank",
            "width=720,height=860"
        );

        if (!paymentWindow) {
            setAlertType("error");
            setAlertTitle("Payment Window Blocked");
            setAlertMessage("Please allow popups and try again.");
            setOpenAlert(true);
            return;
        }

        setLoading(true);
    };

    useEffect(() => {
        const handlePaymentMessage = async (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            if (event.data?.type === "VIP_PAYMENT_CANCELLED") {
            setLoading(false);
            return;
            }

            if (event.data?.type !== "VIP_PAYMENT_SUCCESS") return;

            try {
                const res = await fetch("/api/vip/upgrade", {
                    method: "POST",
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to upgrade to VIP.");
                }

                setAlertType("success");
                setAlertTitle("Welcome to VIP");
                setAlertMessage("Your account has been upgraded to VIP successfully.");
                setOpenAlert(true);

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 2000);
            } catch (error) {
                setAlertType("error");
                setAlertTitle("Upgrade Failed");
                setAlertMessage(
                    error instanceof Error ? error.message : "Something went wrong."
                );
                setOpenAlert(true);
                } finally {
                    setLoading(false);
                }
    };

    window.addEventListener("message", handlePaymentMessage);

    return () => {
        window.removeEventListener("message", handlePaymentMessage);
    };
    }, []);

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

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#76ABAE]/20 text-[#76ABAE]">
                <Crown className="h-8 w-8" />
                </div>

                <div>
                <h2 className="text-2xl font-bold">VIP Membership</h2>
                <p className="text-[#EEEEEE]/60">Premium rental benefits</p>
                </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                    <div
                    key={benefit.title}
                    className="rounded-2xl border border-[#76ABAE]/40 bg-white/5 p-6 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                    >
                    <Icon className="mb-3 h-5 w-5 text-[#76ABAE]" />

                    <h3 className="font-semibold">{benefit.title}</h3>

                    <p className="mt-2 text-sm text-[#EEEEEE]/60">
                        {benefit.text}
                    </p>
                    </div>
                );
                })}
            </div>
            </div>

            <div className="rounded-3xl border border-[#76ABAE]/30 bg-[#222831] p-6 shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#76ABAE]">
                    Upgrade plan
                </p>

                <h2 className="mt-4 text-5xl font-bold">
                    €9.99
                    <span className="text-base font-normal text-[#EEEEEE]/50">
                    {" "}
                    / month
                    </span>
                </h2>

                <p className="mt-4 text-sm text-[#EEEEEE]/60">
                    Demo upgrade.
                </p>

                <Button
                    disabled={loading}
                    onClick={handleUpgrade}
                    className="mt-8 w-full cursor-pointer rounded-full bg-[#76ABAE] py-6 text-base hover:bg-[#5A8B8E]"
                >
                    {loading ? (
                    <span className="flex items-center gap-2">
                        <Spinner />
                        Upgrading...
                    </span>
                    ) : (
                    <>
                        <Crown className="h-4 w-4" />
                        Upgrade to VIP
                    </>
                    )}
                </Button>

                <p className="mt-4 text-center text-xs text-[#EEEEEE]/40">
                    VIP is a premium rank and is not earned automatically through rentals.
                </p>
            </div>
        </section>
        </>
  );
}