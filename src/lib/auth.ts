import prisma from "@/lib/prisma"
import { cookies } from "next/headers"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("sessionToken")?.value

  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!session) return null

  if (session.expiresAt < new Date()) {
    return null
  }

  return session.user
}