'use client'
import { useState } from "react"
import LoginForm from "@/components/loginForm"
import RegisterForm from "@/components/registerForm";

export default function Register() {
    const [flipped, setFlipped] = useState(false);
    return (
        <>
        <div className="fixed inset-0 -z-10">
            <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            />
            <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <section className="min-h-screen flex items-center justify-center px-4 py-18">
            <div className="w-full flex flex-col items-center text-center xl:mt-10">
                <div
                    key={flipped ? "register" : "login"}
                    className="transition-all duration-500 animate-in fade-in slide-in-from-top-2"
                    >
                    <h1 className="text-2xl md:text-4xl font-bold mt-5">
                        {flipped ? "Join Rydex and start your journey" : "Welcome back to Rydex!"}
                    </h1>
                    <p className="text-sm md:text-base mt-4 text-[#EEEEEE]/80">
                        {flipped ? "Sign up to create an account and start your journey!" : "Log in to your account and hit the road with us."}
                    </p>
                </div>

                <div className={`w-full max-w-md [perspective:1200px] mt-10 transition-all duration-700 ${
                    flipped ? "drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]" : "drop-shadow-[0_0_30px_rgba(118,171,174,0.35)]"
                    }`}>
                    <div
                        className={`relative w-full min-h-[800px] transition-transform duration-700 [transform-style:preserve-3d] ${
                            flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                        }`}
                    >
                        {/* Front - Login */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                            <LoginForm onSwitch={() => setFlipped(true)} isActive={!flipped} />
                        </div>

                        {/* Back - Register */}
                        <div className="inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <RegisterForm 
                            onSwitch={() => setFlipped(false)} 
                            isActive={flipped}
                            onRegisterSuccess={() => setFlipped(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
};