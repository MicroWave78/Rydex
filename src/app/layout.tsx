import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Link from "next/link";

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
              <Link href="/about"><p >About Us</p></Link>
              <Link href=""><p >Blog</p></Link>
              <Link href=""><p >Services</p></Link>
              <Link href=""><p >FAQs</p></Link>
              <Link href=""><p >Terms</p></Link>
              <Link href=""><p >Contact Us</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Quick Links</h1>
              <Link href=""><p >Get in Touch</p></Link>
              <Link href=""><p >Help center</p></Link>
              <Link href=""><p >Live chat</p></Link>
              <Link href=""><p >How it works</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Our Brands</h1>
              <Link href=""><p >Toyota</p></Link>
              <Link href=""><p >Porche</p></Link>
              <Link href=""><p >Audi</p></Link>
              <Link href=""><p >BMW</p></Link>
              <Link href=""><p >Ford</p></Link>
              <Link href=""><p >Nissan</p></Link>
              <Link href=""><p >Volkswagen</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Vehicles Type</h1>
              <Link href=""><p >Sedan</p></Link>
              <Link href=""><p >Suv</p></Link>
              <Link href=""><p >Hybrid</p></Link>
              <Link href=""><p >Electric</p></Link>
              <Link href=""><p >Convertible</p></Link>
              <Link href=""><p >Sport</p></Link>
            </div>

            <div className="flex flex-col mx-auto gap-2">
              <h1 className="font-bold text-lg">Sale Hours</h1>
              <p>Monday - Firday: 09:00AM - 09:00PM</p>
              <p>Saturday: 09:00AM - 07:00PM</p>
              <p>Sunday: Closed</p>

              <div className="flex flex-col gap-2 mt-4">
                <h1 className="font-bold text-lg">Connect With Us</h1>

                <div className="grid grid-cols-4">
                  <Link href=""><FaFacebook className="w-4 h-4"/></Link>
                  <Link href=""><FaInstagram className="w-4 h-4"/></Link>
                  <Link href=""><FaLinkedin className="w-4 h-4"/></Link>
                  <Link href=""><FaXTwitter className="w-4 h-4"/></Link>
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
