import { House, CircleQuestionMark, UserRound, ReceiptText, Search, Menu, LogOut } from "lucide-react"
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Button } from "./ui/button";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-lg shadow-md ">
      
      <Link href="/" className="flex items-center shrink-0 py-1 px-3">
        <Image
          src="/images/logo-white.png"
          alt="Rydex Logo"
          width={180}
          height={70}
          className="h-14 w-auto"
          priority
        />
      </Link>

      <div className="flex-1 flex justify-center hidden md:flex">
        <InputGroup className="max-w-xs md:max-w-xl border-none focus-within:bg-[#222831] hover:bg-[#222831] transition duration-500">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      

      <div className="flex flex-row gap-10 hidden md:flex items-center">
        
        <Link href="/">
          <House className="w-4 h-4 inline-block mb-1 mr-1"/>
          Home
        </Link>
    
        <Link href="/about">
          <CircleQuestionMark className="w-4 h-4 inline-block mb-1 mr-1"/>
          About
        </Link>
    
        <Link href="/contact">
          <ReceiptText className="w-4 h-4 inline-block mb-1 mr-1"/>
          Contact
        </Link>
    
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <Link href={user.role === "ADMIN" ? "/admin" : "/dashboard"}>
              <Button className="dark cursor-pointer rounded-full" variant={"default"}>
                <UserRound className="w-4 h-4 inline-block"/>
                {user.role === "ADMIN" ? "Admin Dashboard" : "My Account"}
              </Button>
            </Link>

            <form action="/api/logout" method="POST" >
              <Button className="dark cursor-pointer rounded-full" variant={"outline"} type="submit">
                <LogOut className="w-4 h-4 inline-block"/>
                Log Out
              </Button>
            </form>
            
          </div>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link href="/register">
              <Button className="dark cursor-pointer rounded-full" variant={"default"}>Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button className="dark cursor-pointer rounded-full" variant={"outline"}>Log In</Button>
            </Link>
          </div>
        )}
        
      </div>
    </nav>
  );
}