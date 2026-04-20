"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AlertMessage from "@/components/alertMessage";
import { Textarea } from "@/components/ui/textarea";

export default function AddCarForm({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [seats, setSeats] = useState("");
  const [hp, setHp] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);

  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);
  const [buttonText, setButtonText] = useState("OK");
  const [link, setLink] = useState("/login");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brand,
        type,
        model,
        year,
        pricePerDay,
        seats,
        hp,
        transmission,
        fuelType,
        image,
        description,
        color,
        mileage,
        featured,
        available,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setAlertType("error");
      setAlertTitle("Failed to Add Car");
      setAlertMessage(data.error || "An error occurred while adding the car.");
      setButtonText("OK");
      setLink("");
      setAlertOpen(true);
      return;
    }

    setAlertType("success");
    setAlertTitle("Car Added Successfully");
    setAlertMessage("The car has been added to the database.");
    setButtonText("OK");
    setLink("");
    setAlertOpen(true);

    setBrand("");
    setType("");
    setModel("");
    setYear("");
    setPricePerDay("");
    setSeats("");
    setHp("");
    setTransmission("");
    setFuelType("");
    setImage("");
    setDescription("");
    setColor("");
    setMileage("");
    setFeatured(false);
    setAvailable(true);
    router.refresh();
    setOpen(false);

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertMessage
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        open={alertOpen}
        setOpen={setAlertOpen}
        buttonText={buttonText}
        link={link}
      />

      <DialogContent className="dark h-[90vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new car to the database.
          </DialogDescription>
        </DialogHeader>

      <FieldSet>
          <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel>Brand</FieldLabel>
              <FieldContent>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Model</FieldLabel>
              <FieldContent>
                <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Year</FieldLabel>
              <FieldContent>
                <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" type="number" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Type</FieldLabel>
              <FieldContent>
                <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded h-20 max-h-25" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Fuel Type</FieldLabel>
              <FieldContent>
                <Input value={fuelType} onChange={(e) => setFuelType(e.target.value)} placeholder="Fuel Type" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>HP</FieldLabel>
              <FieldContent>
                <Input value={hp} onChange={(e) => setHp(e.target.value)} placeholder="HP" type="number" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Mileage</FieldLabel>
              <FieldContent>
                <Input value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage" type="number" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Seats</FieldLabel>
              <FieldContent>
                <Input value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Seats" type="number" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Transmission</FieldLabel>
              <FieldContent>
                <Input value={transmission} onChange={(e) => setTransmission(e.target.value)} placeholder="Transmission" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Color</FieldLabel>
              <FieldContent>
                <Input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" className="border p-2 rounded" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Price per Day</FieldLabel>
              <FieldContent>
                <Input value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="Price per Day" type="number" className="border p-2 rounded" />
              </FieldContent>
            </Field>

            <Field className="mb-4">
              <FieldLabel>Image</FieldLabel>
              <FieldContent>
                <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/cars/example.jpg" />
                
              </FieldContent>
            </Field>
          </FieldGroup>
          <Button type="submit" className="cursor-pointer mt-4 bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5A8B8E] transition">
            Add Car
          </Button>
          </form>
      </FieldSet>

        
      </DialogContent>
    </Dialog>    
  );
}