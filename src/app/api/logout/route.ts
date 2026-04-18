import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session_token")?.value

  if (token) {
    await prisma.session.deleteMany({
      where: { token }
    })
  }

  cookieStore.delete("sessionToken")

  redirect("/login")
}