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
                message
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
        <section className="min-h-[80vh] md:min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
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
    );
}