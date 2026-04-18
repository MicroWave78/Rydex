import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome to your account dashboard.</p>
    </div>
  );
}