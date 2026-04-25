import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

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
    <html lang="en" data-scroll-behavior = "smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased min-h-screen flex flex-col bg-[#31363F] text-[#EEEEEE]`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        
        {/* footer */}
        <Footer />
      </body>
    </html>
  );
}
