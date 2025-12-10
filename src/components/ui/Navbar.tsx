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
            <House className="w-4 h-4 inline-block mb-1 mr-1"/>
            <Link href="/">Home</Link>
        </li>
        <li>
            <CircleQuestionMark className="w-4 h-4 inline-block mb-1 mr-1"/>
            <Link href="/about">About</Link>
        </li>
        <li>
            <ReceiptText className="w-4 h-4 inline-block mb-1 mr-1"/>
            <Link href="/contact">Contact</Link>
        </li>
        <li>
            <UserRound className="w-4 h-4 inline-block mb-1 mr-1"/>
            <Link href="/dashboard">Account</Link>
        </li>
      </ul>
    </nav>
  );
}