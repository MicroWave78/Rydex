import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: "300",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rydex",
  description: "Car Rental Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased  flex flex-col bg-[#31363F] text-[#EEEEEE]`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        
        {/* footer */}
        
        <footer className="flex flex-col bg-[#222831] p-6 ">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-14">

            <div className="flex flex-col mx-auto gap-2 ">
              <h1 className="font-bold text-lg">Company</h1>
              <Link href="/about" className="hover:underline"><p >About Us</p></Link>
              <Link href="" className="hover:underline"><p >Services</p></Link>
              <Link href="/about#faq" className="hover:underline"><p >FAQs</p></Link>
              <Link href="" className="hover:underline"><p >Terms</p></Link>
              <Link href="/contact" className="hover:underline"><p >Contact Us</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Quick Links</h1>
              <Link href="/contact" className="hover:underline"><p >Get in Touch</p></Link>
              <Link href="" className="hover:underline"><p >Help center</p></Link>
              <Link href="" className="hover:underline"><p >Live chat</p></Link>
              <Link href="/#howto" className="hover:underline"><p >How it works</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Our Brands</h1>
              <Link href="" className="hover:underline"><p >Toyota</p></Link>
              <Link href="" className="hover:underline"><p >Porche</p></Link>
              <Link href="" className="hover:underline"><p >Audi</p></Link>
              <Link href="" className="hover:underline"><p >BMW</p></Link>
              <Link href="" className="hover:underline"><p >Ford</p></Link>
              <Link href="" className="hover:underline"><p >Nissan</p></Link>
              <Link href="" className="hover:underline"><p >Volkswagen</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Vehicles Type</h1>
              <Link href="" className="hover:underline" ><p >Sedan</p></Link>
              <Link href="" className="hover:underline"><p >Suv</p></Link>
              <Link href="" className="hover:underline"><p >Hybrid</p></Link>
              <Link href="" className="hover:underline"><p >Electric</p></Link>
              <Link href="" className="hover:underline"><p >Convertible</p></Link>
              <Link href="" className="hover:underline"><p >Sport</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Sale Hours</h1>
              <p>Monday - Firday: 09:00AM - 09:00PM</p>
              <p>Saturday: 09:00AM - 07:00PM</p>
              <p>Sunday: Closed</p>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="font-bold text-lg">Connect With Us</h1>

                <div className="grid grid-cols-4">
                  <Link href="https://facebook.com/" target="_blank"><FaFacebook className="w-4 h-4"/></Link>
                  <Link href="https://instagram.com/" target="_blank"><FaInstagram className="w-4 h-4"/></Link>
                  <Link href="https://linkedin.com/" target="_blank"><FaLinkedin className="w-4 h-4"/></Link>
                  <Link href="https://twitter.com/" target="_blank"><FaXTwitter className="w-4 h-4"/></Link>
                </div>
              </div>

              
            </div>
          </div>
          <p className="text-center mt-6">&copy; 2026 Rydex. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
