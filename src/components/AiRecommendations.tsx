"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brain, Fuel, Gauge, Star, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

const AI_RECOMMENDATIONS_CACHE_KEY = "rydex-ai-dashboard-recommendations";
const AI_RECOMMENDATIONS_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours

type CachedRecommendations = {
    timestamp: number;
    recommendations: RecommendedCar[];
};

export default function AiRecommendations() {
  const hasFetchedRef = useRef(false);
  const [cars, setCars] = useState<RecommendedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    
    const getRecommendations = async () => {
      try {
      const cached = sessionStorage.getItem(AI_RECOMMENDATIONS_CACHE_KEY);

      if (cached) {
        const parsedCache = JSON.parse(cached) as CachedRecommendations;
        const isCacheStillValid =
        Date.now() - parsedCache.timestamp < AI_RECOMMENDATIONS_CACHE_TIME;

        if (isCacheStillValid) {
        setCars(parsedCache.recommendations);
        setLoading(false);
        return;
        }

        sessionStorage.removeItem(AI_RECOMMENDATIONS_CACHE_KEY);
      }

      const res = await fetch("/api/ai/recommendations");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load recommendations.");
      }

      const recommendations = data.recommendations || [];

      setCars(recommendations);

      sessionStorage.setItem(
        AI_RECOMMENDATIONS_CACHE_KEY,
        JSON.stringify({
        timestamp: Date.now(),
        recommendations,
        })
      );
      } catch (error) {
      setError(
        error instanceof Error
        ? error.message
        : "Could not load AI recommendations."
      );
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, []);

  return (
    <section className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#76ABAE]/20 text-[#76ABAE]">
          <Brain className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">AI Recommended For You</h2>
          <p className="text-sm text-[#EEEEEE]/50">
            Personalized car suggestions based on your rental behavior.
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl bg-white/5">
              <Skeleton className="h-40 w-full rounded-none bg-white/10" />

              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-32 bg-white/10" />
                <Skeleton className="h-4 w-24 bg-white/10" />
                <Skeleton className="h-16 w-full bg-white/10" />
                <Skeleton className="h-10 w-full rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && cars.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-[#EEEEEE]/60">
          No recommendations available yet.
        </div>
      )}

      {!loading && !error && cars.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#76ABAE]/50"
            >
              <Link href={`/cars/${car.id}`}>
                <div className="relative h-40 w-full overflow-hidden bg-black/20">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
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

                <p className="mt-4 line-clamp-3 text-sm text-[#EEEEEE]/60">
                  {car.reason}
                </p>

                <Button
                  asChild
                  className="mt-5 w-full cursor-pointer rounded-full bg-[#76ABAE] hover:bg-[#5A8B8E]"
                >
                  <Link href={`/cars/${car.id}`}>View Recommendation</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}