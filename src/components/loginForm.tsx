'use client'
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AlertMessage from "@/components/alertMessage";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
type LoginFormProps = {
  onSwitch?: () => void;
  isActive?: boolean;
};

export default function LoginForm({ onSwitch, isActive = false }: LoginFormProps) {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
                    router.push("/");
                    router.refresh();
                }, 3000);   // Redirect after 3 seconds
                setEmail("");
                setPassword("");
                setAlertType("success");
                setAlertTitle("Login Successful");
                setAlertMessage("You have successfully logged in! Redirecting you to home page...");
                setLink("/#main");
                setButtonText("");
                setOpen(true);
                
            } else if (data.role === "ADMIN") {
                router.push("/admin");
                router.refresh();
            }
            
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
            />
            
            <form onSubmit={handleLogin}>
                <FieldSet>
                    <FieldGroup>
                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Email</FieldLabel>
                            <Input 
                                type="email"
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>
                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                            <FieldLabel>Password</FieldLabel>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                        </Field>
                        <Field
                            className={`transition-all duration-500 ${
                            isActive ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-3 delay-0"
                        }`}>
                        <Button className="dark cursor-pointer" type="submit" disabled={loading}>
                            <LogIn className="w-4 h-4 inline-block mr-1"/>
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                    </Field>
                    </FieldGroup>
                </FieldSet>
            </form>

            <h2
                className={`text-base p-2 text-center mt-2 transition-all duration-500 ${
                isActive ? "opacity-100 translate-y-0 delay-400" : "opacity-0 translate-y-3 delay-0"
            }`}>Don't have an account?{" "}
                <Button className="cursor-pointer bg-transparent border border-[#76ABAE] text-[#76ABAE] hover:bg-[#76ABAE] hover:text-white" onClick={onSwitch}>
                    Sign up
                </Button>
            </h2>
        </div>
    )
}