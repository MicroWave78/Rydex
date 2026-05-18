import prisma from "@/lib/prisma";
import UsersManager from "./UsersManager";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      rank: true,
      active: true,
      createdAt: true,
      _count: {
        select: {
          rentals: true,
        },
      },
    },
  });

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    rank: user.rank,
    active: user.active,
    createdAt: user.createdAt.toISOString(),
    rentalCount: user._count.rentals,
  }));

  return (
    <main className="min-h-screen bg-[#31363F] text-[#EEEEEE]">
      <UsersManager users={formattedUsers} />
    </main>
  );
}