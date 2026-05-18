"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AlertMessage from "@/components/alertMessage";

type User = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  rank: string;
  active: boolean;
  createdAt: string;
  rentalCount: number;
};

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [rank, setRank] = useState(user.rank);
  const [active, setActive] = useState(user.active);

  const [saving, setSaving] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlertType("error");
      setAlertTitle("Missing Email");
      setAlertMessage("User email cannot be empty.");
      setOpenAlert(true);
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          rank,
          active,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update user.");
      }

      setAlertType("success");
      setAlertTitle("User Updated");
      setAlertMessage(
        <>
          <strong>{email}</strong> was updated successfully.
        </>
      );
      setOpenAlert(true);
    } catch (error) {
      setAlertType("error");
      setAlertTitle("Update Failed");
      setAlertMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setOpenAlert(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AlertMessage
        open={openAlert}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        buttonText={alertType === "success" ? "Back to Users" : "OK"}
        link={alertType === "success" ? "/admin/users" : ""}
        setOpen={setOpenAlert}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl bg-white/5 p-4 text-sm text-[#EEEEEE]/70">
          <div className="flex justify-between">
            <span>User ID</span>
            <span>#{user.id}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Rentals</span>
            <span>{user.rentalCount}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>Created At</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#EEEEEE]/70">Name</Label>
          <Input
            placeholder="User name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dark"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[#EEEEEE]/70">Email</Label>
          <Input
            placeholder="user@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[#EEEEEE]/70">Role</Label>

            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="dark">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#EEEEEE]/70">Rank</Label>

            <Select value={rank} onValueChange={setRank}>
              <SelectTrigger className="dark">
                <SelectValue placeholder="Select rank" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="BRONZE">Bronze</SelectItem>
                <SelectItem value="SILVER">Silver</SelectItem>
                <SelectItem value="GOLD">Gold</SelectItem>
                <SelectItem value="PLATINUM">Platinum</SelectItem>
                <SelectItem value="DIAMOND">Diamond</SelectItem>
                <SelectItem value="VIP">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <Label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />

            <span>
              Account is{" "}
              <strong className={active ? "text-green-400" : "text-red-400"}>
                {active ? "active" : "disabled"}
              </strong>
            </span>
          </Label>

          <p className="mt-2 text-sm text-[#EEEEEE]/50">
            Disabled users should not be able to log in or rent cars.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="default"
            onClick={() => router.push("/admin/users")}
            className="cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={saving}
            className="cursor-pointer bg-[#76ABAE] hover:bg-[#5A8B8E]"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}