import CarCardSkeleton from "@/components/skeletons/CarCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CarsLoading() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <section className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-center gap-4">
          <Skeleton className="h-4 w-48 bg-white/10" />
          <Skeleton className="h-10 w-full max-w-xl bg-white/10" />
        </div>

        <div className="mb-10 rounded-2xl bg-[#222831] p-4 shadow-xl">
          <div className="grid gap-4 md:grid-cols-4">
            <Skeleton className="h-10 bg-white/10" />
            <Skeleton className="h-10 bg-white/10" />
            <Skeleton className="h-10 bg-white/10" />
            <Skeleton className="h-10 bg-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}