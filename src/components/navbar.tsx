import {
  House,
  CircleQuestionMark,
  UserRound,
  ReceiptText,
  LogOut,
  Car,
  Gem,
  BotMessageSquare
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { getCurrentUser } from "@/lib/auth";
import { Rank } from "@prisma/client";

import MobileNavbarMenu from "./mobileNavbar";
import VipButton from "./vipButton";

export default async function Navbar() {
  const user = await getCurrentUser();

  const rankColors: Record<Rank, string> = {
    BRONZE: "bg-[#CD7F32]/20 text-[#CD7F32]",
    SILVER: "bg-[#C0C0C0]/20 text-[#C0C0C0]",
    GOLD: "bg-[#FFD700]/20 text-[#FFD700]",
    PLATINUM: "bg-[#E5E4E2]/20 text-[#E5E4E2]",
    DIAMOND: "bg-[#B9F2FF]/20 text-[#B9F2FF]",
    VIP: "bg-[#76ABAE]/20 text-[#76ABAE]",
  };

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: House,
    },
    {
      href: "/cars",
      label: "Cars",
      icon: Car,
    },
    {
      href: "/about",
      label: "About",
      icon: CircleQuestionMark,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: ReceiptText,
    },
    {
      href: "/assistant", 
      label: "AI Assistant", 
      icon: BotMessageSquare
    }
  ];

  const dashboardHref = user?.role === "ADMIN" ? "/admin" : "/dashboard";
  const dashboardLabel =
    user?.role === "ADMIN" ? "Admin Dashboard" : "My Account";

return (
  <nav className="fixed left-0 top-0 z-50 h-20 w-full  px-6 text-[#EEEEEE] shadow-md backdrop-blur-lg">
    <div className="relative flex h-full w-full items-center justify-between">
      {/* LEFT: Logo */}
      <div className="flex items-center shrink-0 py-4 px-2">
        <Link href="/" className="inline-flex w-fit shrink-0 items-center">
          <Image
            src="/images/logo-white.png"
            alt="Rydex Logo"
            width={240}
            height={100}
            className="h-10 w-auto object-contain md:h-12"
            priority
          />
        </Link>
      </div>

      {/* CENTER: Desktop nav links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
        
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 whitespace-nowrap text-md font-medium text-[#EEEEEE]/80 transition hover:text-[#76ABAE]"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        
      </div>

      {/* RIGHT: Desktop account + mobile menu */}
      <div className="flex shrink-0 items-center gap-4 justify-end">
        
          {user ? (
            <>
              {user.rank !== Rank.VIP && (
                <VipButton />
              )}
              <span
                className={`hidden md:flex max-w-[130px] truncate rounded-full px-4 py-1 text-sm font-semibold ${
                  rankColors[user.rank] || "bg-white/10 text-[#EEEEEE]/70"
                }`}
              >
                {user.username || user.name || "User"}
              </span>

              <Link href={dashboardHref} className="hidden md:flex">
                <Button className="dark cursor-pointer rounded-full">
                  <UserRound className="h-4 w-4" />
                  {dashboardLabel}
                </Button>
              </Link>

              <form action="/api/logout" method="POST" className="hidden md:flex">
                  <Button
                      className="dark w-full cursor-pointer rounded-full"
                      variant="outline"
                  >
                      <LogOut className="h-4 w-4" />
                      Log Out
                  </Button>
              </form>
            </>
          ) : (
            <Link href="/auth" className="hidden md:flex">
              <Button className="dark cursor-pointer rounded-full">
                <UserRound className="h-4 w-4" />
                My Account
              </Button>
            </Link>
          )}

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <MobileNavbarMenu
            user={
              user
                ? {
                    name: user.name,
                    username: user.username,
                    rank: user.rank,
                    role: user.role,
                  }
                : null
            }
            dashboardHref={dashboardHref}
            dashboardLabel={dashboardLabel}
            rankClassName={
              user
                ? rankColors[user.rank] || "bg-white/10 text-[#EEEEEE]/70"
                : "bg-white/10 text-[#EEEEEE]/70"
            }
          />
        </div>
      </div>
    </div>
  </nav>
);
}