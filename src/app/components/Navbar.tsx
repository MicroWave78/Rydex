import "../styles/Navbar.css";
import { House, CircleQuestionMark, UserRound, ReceiptText } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/">
        <h1 className="navbar-logo">Rent a Car</h1>
      </a>

      <ul className="nav-links">
        <li>
            <House className="w-4 h-4 inline-block mb-1 mr-1"/>
            <a href="/">Home</a>
        </li>
        <li>
            <CircleQuestionMark className="w-4 h-4 inline-block mb-1 mr-1"/>
            <a href="/about">About</a>
        </li>
        <li>
            <ReceiptText className="w-4 h-4 inline-block mb-1 mr-1"/>
            <a href="/contact">Contact</a>
        </li>
        <li>
            <UserRound className="w-4 h-4 inline-block mb-1 mr-1"/>
            <a href="/dashboard">Account</a>
        </li>
      </ul>
    </nav>
  );
}