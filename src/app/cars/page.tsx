'use client'
import CarCard from "@/components/carCard"
import TitleSubtitle from "@/components/titleSubtitle"
import { ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function Cars() {
    const [scrollY, setScrollY] = useState(0)
    
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="w-full flex flex-col mt-16">
            <div className="fixed inset-0 -z-10">
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <section className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-4">
                
            <TitleSubtitle 
            title="Explore Our Car Collection"
            subtitle="" />

            </section>

            <div className="w-full flex justify-center mb-1 transition-opacity duration-200" style={{
                opacity: Math.max(1 - scrollY / 100, 0),
                pointerEvents: scrollY > 100 ? "none" : "auto",
            }}>
                <ArrowDown className="w-8 h-8 rounded-full text-center animate-bounce bg-white text-black"/>
            </div>

            <div className="w-full bg-[#31363F] text-[#EEEEEE] p-1 rounded-t-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                    <CarCard></CarCard>
                </div>
            </div>
        </div>
    );
}