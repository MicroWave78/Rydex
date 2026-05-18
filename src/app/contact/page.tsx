'use client'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AlertMessage from "@/components/alertMessage";


export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("General Inquiry");

    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [buttonText, setButtonText] = useState("OK");
    const [link, setLink] = useState("/register");
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                phone,
                name,
                message,
                type
            })
        });

       

        const data = await res.json();
        if (!res.ok) {
            setAlertType("error");
            setAlertTitle("Submission Failed");
            setAlertMessage(data.error);
            setOpen(true);
        } else {
            setAlertType("success");
            setAlertTitle("Message Sent");
            setAlertMessage("Your message has been sent successfully! We will get back to you shortly.");
            setLink("/");
            setButtonText("Go to Home Page");
            setOpen(true);
        }
    }

    return (
        <>
        <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
        <section className="min-h-[100vh] flex flex-col items-center justify-center text-center px-4 py-20">
            <AlertMessage
                type={alertType}
                title={alertTitle}
                message={alertMessage}
                open={open}
                setOpen={setOpen}
                buttonText={buttonText}
                link={link}
            />
            <h1 className="text-2xl md:text-4xl font-bold mt-8">Get in Touch with Rydex</h1>

            <div className="w-full max-w-md mt-10 bg-[#1E2127] rounded-lg shadow-lg p-6">
                <FieldSet>
                    <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Full name</FieldLabel>
                            <Input autoComplete="off" placeholder="Jon Doe"
                            value={name} onChange={(e) => setName(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input autoComplete="off" type="email" placeholder="example@gmail.com" 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phonenumber">Phone number</FieldLabel>
                            <Input autoComplete="off" type="tel" placeholder="(123) 456-7890" 
                            value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Field>

                        <Field>
                            <FieldLabel>Message type</FieldLabel>

                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select message type" />
                                </SelectTrigger>

                                <SelectContent>
                                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                <SelectItem value="Rental Question">Rental Question</SelectItem>
                                <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                                <SelectItem value="Technical Support">Technical Support</SelectItem>
                                <SelectItem value="Partnership">Partnership</SelectItem>
                                <SelectItem value="Complaint">Complaint</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field orientation="horizontal">
                            <Textarea id="message" placeholder="Your message here..." className="w-full h-30 max-h-50"
                                value={message} onChange={(e) => setMessage(e.target.value)} />
                        </Field>
                        <Field >
                            <Button className="dark cursor-pointer" type="submit">Submit</Button>
                        </Field>
                    </FieldGroup>
                    </form>
                </FieldSet>
            </div>
        </section>
        </>
    );
}