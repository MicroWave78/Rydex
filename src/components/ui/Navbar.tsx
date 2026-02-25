import "@/app/styles/Navbar.css";
import { House, CircleQuestionMark, UserRound, ReceiptText } from "lucide-react"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <h1 className="navbar-logo">Rent a Car</h1>
      </Link>

      <ul className="nav-links">
        
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