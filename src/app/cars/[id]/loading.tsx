import { Skeleton } from "@/components/ui/skeleton";

export default function CarDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-7xl">
        <Skeleton className="h-5 w-32 bg-white/10" />

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skeleton className="h-[260px] rounded-3xl bg-white/10 sm:h-[340px] lg:h-[420px]" />

          <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <Skeleton className="mt-4 h-12 w-3/4 bg-white/10" />
            <Skeleton className="mt-4 h-5 w-64 bg-white/10" />
            <Skeleton className="mt-8 h-10 w-40 bg-white/10" />

            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-5/6 bg-white/10" />
              <Skeleton className="h-4 w-2/3 bg-white/10" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-24 rounded-2xl bg-white/10"
                />
              ))}
            </div>

            <Skeleton className="mt-8 h-12 w-full rounded-full bg-white/10" />
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-[#222831] p-6 shadow-2xl">
          <Skeleton className="h-8 w-64 bg-white/10" />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-24 rounded-2xl bg-white/10"
              />
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-3xl bg-white/10" />
          <Skeleton className="h-72 rounded-3xl bg-white/10" />
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-center gap-4">
            <Skeleton className="h-8 w-24 bg-white/10" />
            <Skeleton className="h-5 w-40 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-48 rounded-3xl bg-white/10"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}