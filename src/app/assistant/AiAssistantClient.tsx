"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Brain,
  Fuel,
  Gauge,
  Send,
  Sparkles,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type RecommendedCar = {
  id: number;
  brand: string;
  model: string;
  type: string;
  image: string;
  pricePerDay: number;
  fuelType: string;
  transmission: string;
  seats: number;
  hp: number;
  averageRating: number | null;
  reviewCount: number;
  reason: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  cars?: RecommendedCar[];
};

const examplePrompts = [
  "I’m going to the beach with 3 friends and want something fun but comfortable.",
  "I need a cheap car for a business trip in the city.",
  "I want a premium car for a weekend mountain road trip.",
];

function createMessageId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function AiAssistantClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hey, I’m your Rydex AI Assistant. Tell me about your trip and I’ll recommend the best cars from our fleet.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async (customMessage?: string) => {
    const messageText = (customMessage || input).trim();

    if (!messageText || loading) return;

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: messageText,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/trip-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI assistant failed.");
      }

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content: data.reply,
        cars: data.recommendations || [],
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const assistantError: ChatMessage = {
        id: createMessageId(),
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Something went wrong while generating recommendations.",
      };

      setMessages((current) => [...current, assistantError]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  return (
    <section className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#222831] shadow-2xl">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#76ABAE]/20 text-[#76ABAE]">
            <Brain className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Trip Assistant Chat</h2>
            <p className="text-sm text-[#EEEEEE]/50">
              Describe your trip and get AI-powered recommendations.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#76ABAE]/20 text-[#76ABAE]">
                <Bot className="h-5 w-5" />
              </div>
            )}

            <div
              className={`max-w-[900px] rounded-3xl p-4 ${
                message.role === "user"
                  ? "bg-[#76ABAE] text-white"
                  : "bg-white/5 text-[#EEEEEE]"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-6">
                {message.content}
              </p>

              {message.cars && message.cars.length > 0 && (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {message.cars.map((car) => (
                    <AssistantCarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </div>

            {message.role === "user" && (
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#EEEEEE]">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#76ABAE]/20 text-[#76ABAE]">
              <Bot className="h-5 w-5" />
            </div>

            <div className="rounded-3xl bg-white/5 p-4 text-sm text-[#EEEEEE]/60">
              <span className="flex items-center gap-2">
                <Spinner />
                Thinking about the best cars for your trip...
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {examplePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-xs text-[#EEEEEE]/70 transition hover:border-[#76ABAE]/60 hover:text-[#76ABAE]"
            >
              <Sparkles className="mr-1 inline h-3 w-3" />
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Tell me about your trip..."
            className="min-h-[56px] max-h-36 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[#76ABAE]/70"
          />

          <Button
            disabled={loading || !input.trim()}
            onClick={() => sendMessage()}
            className="h-auto cursor-pointer rounded-2xl bg-[#76ABAE] px-5 hover:bg-[#5A8B8E]"
          >
            {loading ? <Spinner /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </section>
  );
}

function AssistantCarCard({ car }: { car: RecommendedCar }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#222831] shadow-xl">
      <Link href={`/cars/${car.id}`}>
        <div className="relative h-36 w-full overflow-hidden bg-black/20">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/cars/${car.id}`}>
              <h3 className="font-bold transition hover:text-[#76ABAE]">
                {car.brand} {car.model}
              </h3>
            </Link>

            <p className="text-xs text-[#EEEEEE]/50">{car.type}</p>
          </div>

          <span className="text-sm font-bold text-[#76ABAE]">
            €{car.pricePerDay}/day
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#EEEEEE]/70">
          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
            <Fuel className="h-3 w-3" />
            {car.fuelType}
          </span>

          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
            <Gauge className="h-3 w-3" />
            {car.transmission}
          </span>

          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
            <Zap className="h-3 w-3" />
            {car.hp} HP
          </span>

          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1">
            <Users className="h-3 w-3" />
            {car.seats}
          </span>

          {car.averageRating && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-400/10 px-2 py-1 text-yellow-400">
              <Star className="h-3 w-3 fill-yellow-400" />
              {car.averageRating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-6 line-clamp-2 text-[#EEEEEE]/60">
          {car.reason}
        </p>

        <Button
          asChild
          className="mt-5 w-full cursor-pointer rounded-full bg-[#76ABAE] hover:bg-[#5A8B8E]"
        >
          <Link href={`/cars/${car.id}`}>View Car</Link>
        </Button>
      </div>
    </div>
  );
}