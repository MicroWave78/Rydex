import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

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
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased min-h-screen flex flex-col bg-[#31363F] text-[#EEEEEE] `}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        {/* footer */}
        
        <footer className="flex flex-col bg-[#222831] p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-20">

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Company</h1>
              <p className="cursor-pointer">About Us</p>
              <p className="cursor-pointer">Blog</p>
              <p className="cursor-pointer">Services</p>
              <p className="cursor-pointer">FAQs</p>
              <p className="cursor-pointer">Terms</p>
              <p className="cursor-pointer">Contact Us</p>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Quick Links</h1>
              <p className="cursor-pointer">Get in Touch</p>
              <p className="cursor-pointer">Help center</p>
              <p className="cursor-pointer">Live chat</p>
              <p className="cursor-pointer">How it works</p>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Our Brands</h1>
              <p className="cursor-pointer">Toyota</p>
              <p className="cursor-pointer">Porche</p>
              <p className="cursor-pointer">Audi</p>
              <p className="cursor-pointer">BMW</p>
              <p className="cursor-pointer">Ford</p>
              <p className="cursor-pointer">Nissan</p>
              <p className="cursor-pointer">Volkswagen</p>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Vehicles Type</h1>
              <p className="cursor-pointer">Sedan</p>
              <p className="cursor-pointer">Suv</p>
              <p className="cursor-pointer">Hybrid</p>
              <p className="cursor-pointer">Electric</p>
              <p className="cursor-pointer">Convertible</p>
              <p className="cursor-pointer">Sport</p>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Sale Hours</h1>
              <p>Monday - Firday: 09:00AM - 09:00PM</p>
              <p>Saturday: 09:00AM - 07-00PM</p>
              <p>Sunday: Closed</p>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="font-bold text-lg">Connect With Us</h1>

                <div className="grid grid-cols-4">
                  <FaFacebook className="cursor-pointer"/>
                  <FaInstagram className="cursor-pointer"/>
                  <FaLinkedin className="cursor-pointer"/>
                  <FaXTwitter className="cursor-pointer"/>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center mt-6">&copy; 2025 Rydex. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
