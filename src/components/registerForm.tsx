'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react"
import Link from "next/link";
import AlertMessage from "@/components/alertMessage";
import React from "react";
type RegisterFormProps = {
  onSwitch?: () => void;
  isActive?: boolean;
  onRegisterSuccess?: () => void;
};

export default function RegisterForm({ onSwitch, isActive = false, onRegisterSuccess }: RegisterFormProps) {
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
            setButtonText("Ok");
            setLink("");
            setAlertMessage("You have successfully registered! You can now log in with your new account.");
            setOpen(true);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
        }

    };
    return (
        <div className="w-full bg-[#1E2127] rounded-2xl shadow-lg p-6 flex flex-col justify-center">
            <AlertMessage
                type={alertType}
                title={alertTitle}
                message={alertMessage}
                open={open}
                setOpen={setOpen}
                buttonText={buttonText}
                link={link}
                onConfirm={alertType === "success" ? onRegisterSuccess : undefined}
            />
            <FieldSet>
                <form onSubmit={handleRegister}>
                    <FieldGroup>
                        
                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Full name</FieldLabel>
                            <Input type="text" placeholder="Jon Doe" value={name} onChange={(e) => setName(e.target.value)} />
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Email</FieldLabel>
                            <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Username</FieldLabel>
                            <Input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-400" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Password</FieldLabel>
                            <Input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-600" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <Button className="dark cursor-pointer" type="submit">
                                Sign Up
                            </Button>
                        </Field>
                </FieldGroup>
                </form>
            </FieldSet>
            
            
            <h2
                className={`text-base p-2 text-center mt-2 transition-all duration-500 ${
                isActive ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-3 delay-0"
            }`}>Already have an account?{" "}
                <Button className="cursor-pointer bg-transparent border border-[#76ABAE] text-[#76ABAE] hover:bg-[#76ABAE] hover:text-white" onClick={onSwitch}>
                    Log in
                </Button>
            </h2>
        </div>
    )
}