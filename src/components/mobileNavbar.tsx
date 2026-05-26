"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  House,
  CircleQuestionMark,
  UserRound,
  ReceiptText,
  LogOut,
  Car,
  Menu,
  Gem,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type MobileUser = {
  name: string | null;
  username: string | null;
  rank: string;
  role: string;
} | null;

type MobileNavbarMenuProps = {
  user: MobileUser;
  dashboardHref: string;
  dashboardLabel: string;
  rankClassName: string;
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
];

export default function MobileNavbarMenu({
  user,
  dashboardHref,
  dashboardLabel,
  rankClassName,
}: MobileNavbarMenuProps) {

  return (
  <div className="flex items-center">
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="dark cursor-pointer">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="dark border-none bg-[#222831] rounded-t-xl rounded-b-xl px-6 pb-8 text-[#EEEEEE]">
        <DrawerHeader>
          <DrawerTitle className="text-[#EEEEEE]">Rydex Menu</DrawerTitle>
          <DrawerDescription className="text-[#EEEEEE]/70">
            Explore our car rental services and find your perfect ride.
          </DrawerDescription>
        </DrawerHeader>

        <div className="mt-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <DrawerClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#EEEEEE]/80 transition hover:bg-white/10 hover:text-[#76ABAE]"
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </DrawerClose>
            );
          })}

          <div className="my-3 h-px bg-white/10" />

          {user ? (
            <>
              <div className="flex justify-between">
                <div
                  className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${rankClassName}`}
                >
                  {user.username || user.name || "User"} · {user.rank}
                  
                </div>
                
              </div>

              <DrawerClose asChild>
                <Link href={dashboardHref}>
                  <Button className="mt-2 w-full cursor-pointer rounded-full">
                    <UserRound className="h-4 w-4" />
                    {dashboardLabel}
                  </Button>
                </Link>
              </DrawerClose>

              <form action="/api/logout" method="POST">
                <Button
                  className="mt-2 w-full cursor-pointer rounded-full"
                  variant="outline"
                  type="submit"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </form>
            </>
          ) : (
            <DrawerClose asChild>
              <Link href="/auth">
                <Button className="w-full cursor-pointer rounded-full bg-[#76ABAE] hover:bg-[#5A8B8E]">
                  <UserRound className="h-4 w-4" />
                  My Account
                </Button>
              </Link>
            </DrawerClose>
          )}
          
        </div>
      </DrawerContent>
    </Drawer>
  </div>
);
}