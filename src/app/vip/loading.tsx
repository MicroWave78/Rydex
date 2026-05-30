import { Skeleton } from "@/components/ui/skeleton";

export default function VipLoading() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="h-4 w-40 bg-white/10" />
        <Skeleton className="mt-4 h-14 w-full max-w-3xl bg-white/10" />
        <Skeleton className="mt-5 h-5 w-full max-w-2xl bg-white/10" />
        <Skeleton className="mt-2 h-5 w-full max-w-xl bg-white/10" />

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl bg-white/10" />
              <div>
                <Skeleton className="h-8 w-48 bg-white/10" />
                <Skeleton className="mt-2 h-5 w-40 bg-white/10" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-36 rounded-2xl bg-white/10"
                />
              ))}
            </div>
          </div>

          <Skeleton className="h-[420px] rounded-3xl bg-[#222831]" />
        </section>
      </div>
    </main>
  );
}