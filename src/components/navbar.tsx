import { House, CircleQuestionMark, UserRound, ReceiptText, Search } from "lucide-react"
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-lg shadow-md">
      <Link href="/">
        <h1 className="text-lg md:text-2xl font-bold">Rydex</h1>
      </Link>

      <div className="flex-1 flex justify-center ">
        <InputGroup className="max-w-xs md:max-w-xl border-none focus-within:bg-[#31363F] hover:bg-[#31363F] transition duration-500">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      

      <ul className="flex flex-row gap-10">
        
        <li>
            <Link href="/">
              <House className="w-4 h-4 inline-block mb-1 mr-1"/>
              Home
            </Link>
        </li>

        <li>
            <Link href="/about">
              <CircleQuestionMark className="w-4 h-4 inline-block mb-1 mr-1"/>
              About
            </Link>
        </li>

        <li>
            <Link href="/contact">
              <ReceiptText className="w-4 h-4 inline-block mb-1 mr-1"/>
              Contact
            </Link>
        </li>

        <li>
            <Link href="/dashboard">
              <UserRound className="w-4 h-4 inline-block mb-1 mr-1"/>
              Account
            </Link>
        </li>

      </ul>
    </nav>
  );
}