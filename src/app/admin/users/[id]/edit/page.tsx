import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUsersForm";

type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;

  const userId = Number(id);

  if (Number.isNaN(userId)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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

  if (!user) {
    notFound();
  }

  const formattedUser = {
    ...user,
    createdAt: user.createdAt.toISOString(),
    rentalCount: user._count.rentals,
  };

  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-24 text-[#EEEEEE]">
      <div className="mx-auto max-w-2xl rounded-3xl bg-[#222831] p-6 shadow-2xl">
        <h1 className="text-3xl font-bold">Edit User</h1>

        <p className="mt-2 text-[#EEEEEE]/60">
          Manage user account details, role, rank, and account status.
        </p>

        <div className="mt-8">
          <EditUserForm user={formattedUser} />
        </div>
      </div>
    </main>
  );
}