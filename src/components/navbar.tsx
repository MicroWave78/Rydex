import { House, CircleQuestionMark, UserRound, ReceiptText, Search, Menu } from "lucide-react"
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
import { cookies } from "next/headers";

export default async function Navbar() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const username = cookieStore.get("username")?.value;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-lg shadow-md">
      <Link href="/">
        <h1 className="text-lg md:text-2xl font-bold">Rydex</h1>
      </Link>

      <div className="flex-1 flex justify-center invisible md:visible">
        <InputGroup className="max-w-xs md:max-w-xl border-none focus-within:bg-[#222831] hover:bg-[#222831] transition duration-500">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      

      <div className="flex flex-row gap-10 visible md:visible items-center">
        
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
    
        {userId ? (
          <div className="flex justify-center items-center gap-4">
            <Link href="/dashboard">
              <Button className="dark cursor-pointer rounded-full" variant={"default"}>
                <UserRound className="w-4 h-4 inline-block mb-1 mr-1"/>
                Your Dashboard</Button>
            </Link>

            
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