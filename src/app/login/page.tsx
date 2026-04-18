'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import AlertMessage from "@/components/alertMessage";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);
    const [buttonText, setButtonText] = useState("OK");
    const [link, setLink] = useState("/login");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        const data = await res.json();
        setLoading(false);
        if (!res.ok) {
            setAlertType("error");
            setAlertTitle("Login Failed");
            setAlertMessage(data.error);
            setOpen(true);
        } else {
            if (data.role === "USER") {
                setTimeout(() => {
                    window.location.href = "/";
                }, 4000);   // Redirect after 4 seconds
                setAlertType("success");
                setAlertTitle("Login Successful");
                setAlertMessage("You have successfully logged in! Redirecting to home page...");
                setLink("/");
                setButtonText("");
                setOpen(true);
                
            } else if (data.role === "ADMIN") {
                window.location.href = "/admin";
            }
            
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

            <h1 className="text-2xl md:text-4xl font-bold mt-5">Welcome back to Rydex</h1>
            <p className="text-sm md:text-base mt-4 text-[#EEEEEE]/80">Log in to your account and hit the road with us.</p>

            <div className="w-full max-w-md mt-10 bg-[#1E2127] rounded-lg shadow-lg p-6">
                <form onSubmit={handleLogin}>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input 
                                    type="email"
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            <Field >
                            <Button className="dark cursor-pointer" type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Log In"}
                            </Button>
                        </Field>
                        </FieldGroup>
                    </FieldSet>
                </form>

                <h2 className="text-base p-2">Don't have an account? <Link href="/register" className="text-blue-300 hover:underline">Sign up</Link></h2>
            </div>
        </section>
    )
}