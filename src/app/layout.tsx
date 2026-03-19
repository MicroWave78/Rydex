import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/navbar";

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
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased min-h-screen flex flex-col bg-[#222831] text-[#EEEEEE]`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        {/* footer */}
        <footer className="bg-[#31363F] p-4 text-center">
          <p>&copy; 2025 Rydex. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
