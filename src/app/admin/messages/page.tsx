import prisma from "@/lib/prisma";
import MessagesManager from "./MessagesManager";

export default async function AdminMessagesPage() {
  const messages = await prisma.messages.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMessages = messages.map((message) => ({
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    type: message.type,
    status: message.status,
    message: message.message,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#31363F] text-[#EEEEEE]">
      <MessagesManager messages={formattedMessages} />
    </main>
  );
}