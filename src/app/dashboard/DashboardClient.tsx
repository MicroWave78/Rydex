"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Car,
  Crown,
  Mail,
  MapPin,
  Shield,
  Trash2,
  UserRound,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

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

import AlertMessage from "@/components/alertMessage";
import Link from "next/link";

type Rental = {
  id: number;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  car: {
    id: number;
    brand: string;
    model: string;
    type: string;
    image: string;
    pricePerDay: number;
  };
};

type DashboardUser = {
  id: number;
  name: string | null;
  username: string | null;
  email: string;
  role: string;
  rank: string;
  active: boolean;
  totalRentals: number;
  createdAt: string;
  rentals: Rental[];
};

const rankColors: Record<string, string> = {
  BRONZE: "bg-[#CD7F32]/20 text-[#CD7F32]",
  SILVER: "bg-[#C0C0C0]/20 text-[#C0C0C0]",
  GOLD: "bg-[#FFD700]/20 text-[#FFD700]",
  PLATINUM: "bg-[#E5E4E2]/20 text-[#E5E4E2]",
  DIAMOND: "bg-[#B9F2FF]/20 text-[#B9F2FF]",
  VIP: "bg-[#76ABAE]/20 text-[#76ABAE]",
};

export default function DashboardClient({ user }: { user: DashboardUser }) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const rentalsPerPage = 5;

  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

  const totalSpent = useMemo(() => {
    return user.rentals.reduce((sum, rental) => sum + rental.totalPrice, 0);
  }, [user.rentals]);

  const showAlert = (
    type: "success" | "error",
    title: string,
    message: React.ReactNode
  ) => {
    setAlertType(type);
    setAlertTitle(title);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getRentalDays = (pickupDate: string, returnDate: string) => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = end.getTime() - start.getTime();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSavingProfile(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      showAlert("success", "Profile Updated", "Your account details were updated.");
      router.refresh();
    } catch (error) {
      showAlert(
        "error",
        "Update Failed",
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setChangingPassword(true);

    try {
      const res = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password.");
      }

      setCurrentPassword("");
      setNewPassword("");

      showAlert("success", "Password Changed", "Your password was updated successfully.");
    } catch (error) {
      showAlert(
        "error",
        "Password Change Failed",
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }

      window.location.href = "/";
    } catch (error) {
      showAlert(
        "error",
        "Delete Failed",
        error instanceof Error ? error.message : "Something went wrong."
      );
      setDeleting(false);
    }
  };

  
  const totalPages = Math.ceil(user.rentals.length / rentalsPerPage);

  const startIndex = (page - 1) * rentalsPerPage;

  const paginatedRentals = user.rentals.slice(
    startIndex,
    startIndex + rentalsPerPage
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [page, totalPages]);

  return (
    <>
        <AlertMessage
            open={openAlert}
            type={alertType}
            title={alertTitle}
            message={alertMessage}
            buttonText="OK"
            link=""
            setOpen={setOpenAlert}
        />

        <section className="relative overflow-hidden pb-24">
        
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mb-8"
                >
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
                    Rydex Dashboard
                    </p>

                    <h1 className="text-4xl font-bold md:text-5xl">
                    Welcome back, {user.name || user.username || "driver"}
                    </h1>

                    <p className="mt-3 text-[#EEEEEE]/60">
                    Manage your rentals, account details, rank, and security settings.
                    </p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl"
                    >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#76ABAE]/20">
                            <UserRound className="h-7 w-7 text-[#76ABAE]" />
                        </div>

                        <div>
                        <p className="text-sm text-[#EEEEEE]/50">Account</p>
                        <h2 className="text-xl font-bold">
                            {user.username || user.name || "User"}
                        </h2>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-[#EEEEEE]/70">
                        <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#76ABAE]" />
                        {user.email}
                        </div>

                        <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#76ABAE]" />
                        {user.role}
                        </div>

                        <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#76ABAE]" />
                        Joined {formatDate(user.createdAt)}
                        </div>
                    </div>

                    <div className="mt-6">
                        <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            rankColors[user.rank.toUpperCase()] || "bg-white/10 text-[#EEEEEE]/70"
                        }`}
                        >
                        {user.rank}
                        </span>
                    </div>
                    </motion.div>

                    <StatCard
                    delay={0.1}
                    icon={<Car className="h-6 w-6" />}
                    label="Total Rentals"
                    value={String(user.rentals.length)}
                    />

                    <StatCard
                    delay={0.15}
                    icon={<Crown className="h-6 w-6" />}
                    label="Current Rank"
                    value={user.rank}
                    />

                    <StatCard
                    delay={0.2}
                    icon={<CalendarDays className="h-6 w-6" />}
                    label="Total Spent"
                    value={`€${totalSpent.toFixed(2)}`}
                    />
                </div>

                <div className="mt-8 grid gap-6">

                    <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl"
                    >
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                        <h2 className="text-2xl font-bold">Rental History</h2>
                        <p className="text-sm text-[#EEEEEE]/50">
                            Cars you rented and booking details.
                        </p>
                        </div>
                    </div>

                    {paginatedRentals.length === 0 ? (
                        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 py-10 text-center text-[#EEEEEE]/60">
                            <Car className="mb-3 h-10 w-10 text-[#76ABAE]" />
                            <p className="font-semibold text-[#EEEEEE]">No rentals yet</p>
                            <p className="mt-1 text-sm text-[#EEEEEE]/50">
                                Your booked cars will appear here after your first rental.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                        {paginatedRentals.map((rental) => (
                            <div
                            key={rental.id}
                            className="grid gap-4 rounded-2xl bg-white/5 p-4 md:grid-cols-[160px_1fr]"
                            >
                            <div className="relative h-32 overflow-hidden rounded-xl bg-black/20">
                                <Image
                                src={rental.car.image}
                                alt={`${rental.car.brand} ${rental.car.model}`}
                                fill
                                className="object-cover"
                                />
                            </div>

                            <div>
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <Link href={`/cars/${rental.car.id}`} className="hover:underline">
                                        <h3 className="text-lg font-bold">
                                        {rental.car.brand} {rental.car.model}
                                        </h3>
                                    </Link>

                                    <p className="text-sm text-[#EEEEEE]/50">
                                    Rental #{rental.id} · {rental.car.type}
                                    </p>
                                </div>

                                <span className="rounded-full bg-[#76ABAE]/20 px-3 py-3 text-sm font-semibold text-[#76ABAE]">
                                    {rental.status}
                                </span>
                                </div>

                                <div className="mt-4 grid gap-3 text-sm text-[#EEEEEE]/70 md:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#76ABAE]" />
                                    {rental.pickupLocation}
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-[#76ABAE]" />
                                    {formatDate(rental.pickupDate)} →{" "}
                                    {formatDate(rental.returnDate)}
                                </div>

                                <div>
                                    Days:{" "}
                                    <span className="font-semibold text-[#EEEEEE]">
                                    {getRentalDays(
                                        rental.pickupDate,
                                        rental.returnDate
                                    )}
                                    </span>
                                </div>

                                <div>
                                    Total:{" "}
                                    <span className="font-semibold text-[#76ABAE]">
                                    €{rental.totalPrice}
                                    </span>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    )}
                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-between">
                        <Button
                          variant="outline"
                          disabled={page === 1}
                          onClick={() => setPage((prev) => prev - 1)}
                          className="dark cursor-pointer"
                        >
                          Previous
                        </Button>

                        <span className="text-sm text-[#EEEEEE]/70">
                          Page {page} of {totalPages}
                        </span>

                        <Button
                          variant="outline"
                          disabled={page === totalPages}
                          onClick={() => setPage((prev) => prev + 1)}
                          className="dark cursor-pointer"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                    </motion.div>

                    {/* Profile Edit Section */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold">Edit Profile</h2>
                            <p className="mt-1 text-sm text-[#EEEEEE]/50">
                            Update your public account details.
                            </p>

                            <form onSubmit={handleProfileUpdate} className="mt-5 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[#EEEEEE]/70">Name</Label>
                                <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="dark"
                                placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[#EEEEEE]/70">Username</Label>
                                <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="dark"
                                placeholder="username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[#EEEEEE]/70">Email</Label>
                                <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="dark"
                                type="email"
                                placeholder="email@example.com"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    disabled={savingProfile}
                                    className="w-fit cursor-pointer rounded-full bg-[#76ABAE] px-8 hover:bg-[#5A8B8E]"
                                >
                                    {savingProfile ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner />
                                        Saving...
                                    </span>
                                    ) : (
                                    "Save Profile"
                                    )}
                                </Button>
                            </div>
                            </form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold">Security</h2>
                            <p className="mt-1 text-sm text-[#EEEEEE]/50">
                            Change your account password.
                            </p>

                            <form onSubmit={handlePasswordChange} className="mt-5 space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[#EEEEEE]/70">
                                Current Password
                                </Label>
                                <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="dark"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[#EEEEEE]/70">New Password</Label>
                                <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="dark"
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    disabled={changingPassword}
                                    className="w-fit cursor-pointer rounded-full bg-[#76ABAE] px-8 hover:bg-[#5A8B8E]"
                                >
                                    {changingPassword ? (
                                    <span className="flex items-center gap-2">
                                        <Spinner />
                                        Changing...
                                    </span>
                                    ) : (
                                    <span className="flex items-center gap-2">
                                        <Lock className="h-4 w-4" />
                                        Change Password
                                    </span>
                                    )}
                                </Button>
                            </div>
                            </form>
                        </motion.div>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-20 rounded-3xl border border-red-500/20 bg-red-500/5 p-6"
                        >
                        <h2 className="text-2xl font-bold text-red-400">
                        Danger Zone
                        </h2>

                        <p className="mt-2 text-sm text-[#EEEEEE]/60">
                        Delete your account permanently. This should only be allowed if
                        you have no rental history, or you can disable instead.
                        </p>

                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            variant="destructive"
                            className="mt-5 w-fit cursor-pointer rounded-full px-8"
                            >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="dark">
                            <AlertDialogHeader>
                            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. Your profile will be
                                permanently removed if deletion is allowed.
                            </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction asChild>
                                <Button
                                disabled={deleting}
                                variant="destructive"
                                onClick={handleDeleteAccount}
                                className="cursor-pointer"
                                >
                                {deleting ? "Deleting..." : "Delete Account"}
                                </Button>
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </motion.div>
                </div>
            </div>
        </section>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#76ABAE]/20 text-[#76ABAE]">
        {icon}
      </div>

      <p className="text-sm text-[#EEEEEE]/50">{label}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </motion.div>
  );
}