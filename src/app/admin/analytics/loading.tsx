import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAnalyticsLoading() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <Skeleton className="h-4 w-48 bg-white/10" />

          <Skeleton className="mt-4 h-12 w-full max-w-2xl bg-white/10" />

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full max-w-xl bg-white/10" />
            <Skeleton className="h-4 w-full max-w-md bg-white/10" />
          </div>
        </div>

        {/* Main stat cards */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-44 rounded-3xl bg-[#222831]"
            />
          ))}
        </section>

        {/* Secondary stat cards */}
        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-44 rounded-3xl bg-[#222831]"
            />
          ))}
        </section>

        {/* Revenue chart + status */}
        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <Skeleton className="h-8 w-56 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-96 max-w-full bg-white/10" />

            <div className="mt-8 flex h-72 items-end gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end gap-3"
                >
                  <Skeleton
                    className="w-full rounded-t-2xl bg-white/10"
                    style={{
                      height: `${35 + index * 8}%`,
                    }}
                  />

                  <Skeleton className="mx-auto h-4 w-10 bg-white/10" />
                  <Skeleton className="mx-auto h-4 w-14 bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <Skeleton className="h-8 w-44 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-64 bg-white/10" />

            <div className="mt-8 space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-4 w-8 bg-white/10" />
                  </div>

                  <Skeleton className="h-3 w-full rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom cards */}
        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <Skeleton className="h-8 w-48 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-72 bg-white/10" />

            <div className="mt-6 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-20 rounded-2xl bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <Skeleton className="h-8 w-52 bg-white/10" />
            <Skeleton className="mt-3 h-4 w-72 bg-white/10" />

            <div className="mt-8 space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-4 w-8 bg-white/10" />
                  </div>

                  <Skeleton className="h-3 w-full rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}