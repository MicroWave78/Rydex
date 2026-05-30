import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[#31363F] text-[#EEEEEE]">
      <div className="mx-auto mt-24 w-full max-w-6xl px-4 py-20">
        <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <Skeleton className="h-20 w-20 rounded-full bg-white/10" />

            <div className="space-y-3">
              <Skeleton className="h-8 w-56 bg-white/10" />
              <Skeleton className="h-5 w-72 bg-white/10" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-32 rounded-3xl bg-[#222831]"
            />
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-[#222831] p-6 shadow-2xl">
          <Skeleton className="h-8 w-48 bg-white/10" />

          <div className="mt-6 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-28 rounded-2xl bg-white/10"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skeleton className="h-96 rounded-3xl bg-[#222831]" />
          <Skeleton className="h-96 rounded-3xl bg-[#222831]" />
        </div>

        <Skeleton className="mt-8 h-48 rounded-3xl bg-[#222831]" />
      </div>
    </main>
  );
}