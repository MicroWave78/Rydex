import { Gem } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
export default function VipButton() {
    return (
        <Link href="/vip" className="hidden md:flex">
            <Button variant="default" className="rounded-full bg-[#76ABAE]/20 text-[#76ABAE] cursor-pointer">
                <Gem className="h-4 w-4" />
                Go VIP
            </Button>
        </Link>
    )
}