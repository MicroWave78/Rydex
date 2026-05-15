"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import AlertMessage from "@/components/alertMessage";

type Car = {
  id: number;
  brand: string;
  model: string;
  type: string;
  description: string | null;
  image: string;
  pricePerDay: number;
  seats: number;
  hp: number;
  transmission: string;
  fuelType: string;
  year: number;
  color?: string | null;
  mileage?: number | null;
  featured?: boolean;
  available?: boolean;
};

export default function EditCarForm({ car }: { car: Car }) {
  const router = useRouter();

  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [type, setType] = useState(car.type);
  const [description, setDescription] = useState(car.description || "");
  const [pricePerDay, setPricePerDay] = useState(String(car.pricePerDay));
  const [seats, setSeats] = useState(String(car.seats));
  const [hp, setHp] = useState(String(car.hp));
  const [transmission, setTransmission] = useState(car.transmission);
  const [fuelType, setFuelType] = useState(car.fuelType);
  const [year, setYear] = useState(String(car.year));
  const [color, setColor] = useState(car.color || "");
  const [mileage, setMileage] = useState(String(car.mileage || 0));
  const [featured, setFeatured] = useState(Boolean(car.featured));
  const [available, setAvailable] = useState(Boolean(car.available));

  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSaving(true);
        setError("");

        const formData = new FormData();

        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("type", type);
        formData.append("description", description);
        formData.append("pricePerDay", pricePerDay);
        formData.append("seats", seats);
        formData.append("hp", hp);
        formData.append("transmission", transmission);
        formData.append("fuelType", fuelType);
        formData.append("year", year);
        formData.append("color", color);
        formData.append("mileage", mileage);
        formData.append("featured", String(featured));
        formData.append("available", String(available));

        if (image) {
        formData.append("image", image);
        }

        try {
            const res = await fetch(`/api/cars/${car.id}`, {
                method: "PATCH",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update car.");
            }
            setAlertType("success");
            setAlertTitle("Car updated");
            setAlertMessage(
                <>
                    <strong>{car.brand} {car.model}</strong> has been updated.
                </>
            )
            setOpenAlert(true);
        } catch (err) {
            setAlertType("error");
            setAlertTitle("Update failed");
            setAlertMessage(
                err instanceof Error ? err.message : "Something went wrong."
            );
            setOpenAlert(true);
            
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
        <AlertMessage
            open={openAlert}
            type={alertType}
            title={alertTitle}
            message={alertMessage}
            buttonText={alertType === "success" ? "Back to Cars" : "OK"}
            link={alertType === "success" ? "/admin/cars" : ""}
            setOpen={setOpenAlert}
        />

        <div className="grid gap-4 md:grid-cols-2">
            <Label className="text-sm text-[#EEEEEE]/70">Brand</Label>
            <Input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            />
            <Label className="text-sm text-[#EEEEEE]/70">Model</Label>
            <Input
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Type</Label>
            <Input
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Fuel Type</Label>
            <Input
            placeholder="Fuel type"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Transmission</Label>
            <Input
            placeholder="Transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Year</Label>
            <Input
            placeholder="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Price per day</Label>
            <Input
            placeholder="Price per day"
            type="number"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Seats</Label>
            <Input
            placeholder="Seats"
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Horsepower</Label>
            <Input
            placeholder="Horsepower"
            type="number"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Mileage</Label>
            <Input
            placeholder="Mileage"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            />

            <Label className="text-sm text-[#EEEEEE]/70">Color</Label>
            <Input
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />
        </div>

        <div>
            <Label className="mb-2 block text-sm text-[#EEEEEE]/70">
            Description
            </Label>

            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-28 w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm outline-none"
            placeholder="Car description..."
            />
        </div>

        <div className="space-y-3 dark">
            <Label className="text-sm text-[#EEEEEE]/70">Current image</Label>

            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-white/5">
            <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
            />
            </div>

            <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-white/5 p-4">
            <Label className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
            />
            <span>Featured car</span>
            </Label>

            <Label className="flex items-center gap-3">
            <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
            />
            <span>Available for rent</span>
            </Label>
        </div>

        <div className="flex gap-3">
            <Button
            type="button"
            variant="destructive"
            onClick={() => router.push("/admin/cars")}
            >
            Cancel
            </Button>

            <Button
            type="submit"
            disabled={saving}
            className="bg-[#76ABAE] hover:bg-[#5A8B8E]"
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
    );
}