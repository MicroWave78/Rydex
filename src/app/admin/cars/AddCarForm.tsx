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
  DialogFooter,
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
  const [image, setImage] = useState<File | null>(null);
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

    if (!image) {
      setAlertType("error");
      setAlertTitle("Image Required");
      setAlertMessage("Please upload an image for the car.");
      setButtonText("OK");
      setLink("");
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("type", type);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("pricePerDay", pricePerDay);
    formData.append("seats", seats);
    formData.append("hp", hp);
    formData.append("transmission", transmission);
    formData.append("fuelType", fuelType);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("mileage", mileage);
    formData.append("featured", featured.toString());
    formData.append("available", available.toString());


    const res = await fetch("/api/cars", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setAlertType("error");
      setAlertTitle("Failed to Add Car");
      setAlertMessage(data.error);
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
    setImage(null);
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

      <DialogContent className="dark h-[92vh] overflow-y-auto w-full min-w-2xl no-scrollbar">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new car to the database.
          </DialogDescription>
        </DialogHeader>
      <form onSubmit={handleSubmit}>
        <FieldSet className="w-full max-w-lg mt-8 mx-auto justify-center">
          
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
                <Input value={seats} max={7} onChange={(e) => setSeats(e.target.value)} placeholder="Seats" type="number" className="border p-2 rounded" />
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

            <Field className="">
              <FieldLabel>Image</FieldLabel>
              <FieldContent>
                <Input accept="image/*" 
                type="file" 
                className="cursor-pointer"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
              </FieldContent>
            </Field>
          </FieldGroup>

          <DialogFooter className="items-center justify-center py-2">
            <Button 
              type="submit" 
              className="cursor-pointer px-6 py-2 bg-[#76ABAE] text-white hover:bg-[#5A8B8E] transition">
              Add Car
            </Button>
          </DialogFooter>
        </FieldSet>

        
      </form>
        
      </DialogContent>
    </Dialog>    
  );
}