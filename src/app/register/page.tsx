'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react"
import Link from "next/link";
import AlertMessage from "@/components/alertMessage";


export default function Register() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [buttonText, setButtonText] = useState("OK");
    const [link, setLink] = useState("/register");
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Passwords do not match.");
            setOpen(true);
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name,
                username
            })
        });

        const data = await res.json();
        if (!res.ok) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage(data.error);
            setOpen(true);
        } else {
            setAlertType("success");
            setAlertTitle("Registration Successful");
            setButtonText("Go to Login");
            setLink("/login");
            setAlertMessage(
                <>
                    Account created successfully! You can now {" "} 
                    <Link href="/login" 
                    className="text-blue-300 hover:underline">log in</Link>.
                </>
            );
            setOpen(true);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
        }

    };
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
            <h1 className="text-2xl md:text-4xl font-bold mt-5">Create your Rydex account</h1>
            <p className="text-sm md:text-base mt-4 text-[#EEEEEE]/80">Join us today and experience the future of car rentals.</p>

            <div className="w-full max-w-md mt-10 bg-[#1E2127] rounded-lg shadow-lg p-6">
                
                <FieldSet>
                    <form onSubmit={handleRegister}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Full name</FieldLabel>
                                <Input type="text" placeholder="Jon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Username</FieldLabel>
                                <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Field>
                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Field>
                            <Field >
                                <Button className="dark cursor-pointer" type="submit">
                                    Sign Up
                                </Button>
                            </Field>
                    </FieldGroup>
                    </form>
                </FieldSet>
                
                
                <h2 className="text-base p-2">Already have an account? <Link href="/login" className="text-blue-300 hover:underline">Log in</Link></h2>
            </div>
        </section>
    )
};