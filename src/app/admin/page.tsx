import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default async function Dashboard() {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
        redirect("/")
    }
    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard.</p>
        </div>
    );
}