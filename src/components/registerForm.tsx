'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react"
import AlertMessage from "@/components/alertMessage";
import React from "react";
import { CheckCircle2, Eye, EyeClosed, X} from "lucide-react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validations = [
        { text: "At least 8 characters", valid: password.length >= 8 },
        { text: "Contains a number", valid: /\d/.test(password) },
        { text: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
        { text: "Contains special character", valid: /[!@#$%^&*]/.test(password) },
    ]

    const strength = validations.filter((v) => v.valid).length;

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-muted";
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score <= 3) return "bg-teal-400";
        return "bg-green-500";
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return "";
        if (score <= 1) return "Weak";
        if (score <= 2) return "Moderate";
        if (score <= 3) return "Strong";
        return "Very Strong";
    };

    const getStrengthTextColor = (score: number) => {
        if (score === 0) return "text-muted-foreground";
        if (score <= 1) return "text-red-500";
        if (score <= 2) return "text-orange-500";
        if (score <= 3) return "text-teal-400";
        return "text-green-500";
    };


    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertTitle, setAlertTitle] = useState("");
    const [buttonText, setButtonText] = useState("OK");
    const [link, setLink] = useState("/register");
    const [alertMessage, setAlertMessage] = useState<React.ReactNode>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Password must be at least 8 characters long.");
            setOpen(true);
            return;
        }

        if (strength < 3) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Password is not strong enough. Please make sure it contains a number, an uppercase letter, and a special character.");
            setOpen(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Passwords do not match.");
            setOpen(true);
            return;
        }

        if (password.toLowerCase().includes(email.toLowerCase())) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Password should not contain your email.");
            setOpen(true);
            return;
        }

        if (password.toLowerCase().includes(username.toLowerCase()) || password.toLowerCase().includes(name.toLowerCase())) {
            setAlertType("error");
            setAlertTitle("Registration Failed");
            setAlertMessage("Password should not contain your username or name.");
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
            setLink("");
            setAlertMessage("You have successfully registered! You can now log in with your new account.");
            setOpen(true);

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");

            setShowPassword(false);
            setShowConfirmPassword(false);
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
                            <div className="relative">
                                <Input type= {showPassword ? "text" : "password"} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button
                                    type="button"
                                    className="absolute top-0 right-0 h-full px-3 hover:bg-transparent cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className={`h-full transition-all duration-500 ease-out ${getStrengthColor(
                                        strength
                                        )}`}
                                        style={{ width: `${(strength / 4) * 100}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs font-medium">
                                    <span className="text-muted-foreground">Password must contain</span>
                                    <span className={getStrengthTextColor(strength)}>
                                        {getStrengthText(strength)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5 pt-1">
                                {validations.map((validation, index) => (
                                    <div
                                        className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                                        validation.valid
                                            ? "text-green-400"
                                            : "text-muted-foreground"
                                        }`}
                                        key={index}
                                    >
                                        {validation.valid ? (
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        ) : (
                                        <X className="h-3.5 w-3.5" />
                                        )}
                                        
                                        <span className="text-[13px]">{validation.text}</span>
                                    </div>
                                ))}
                            </div>
                        </Field>

                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Confirm Password</FieldLabel>

                            <div className="relative">
                                <Input type= {showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button
                                    type="button"
                                    className="absolute top-0 right-0 h-full px-3 hover:bg-transparent cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeClosed className="w-4 h-4" />}
                                </Button>
                            </div>
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