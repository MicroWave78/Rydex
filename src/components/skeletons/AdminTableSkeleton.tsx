import { Skeleton } from "@/components/ui/skeleton";

type AdminTableSkeletonProps = {
  title?: boolean;
  stats?: boolean;
  rows?: number;
  columns?: number;
};

export default function AdminTableSkeleton({
  title = true,
  stats = true,
  rows = 8,
  columns = 6,
}: AdminTableSkeletonProps) {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-7xl">
        {title && (
          <div className="mb-8">
            <Skeleton className="h-10 w-64 bg-white/10" />
            <Skeleton className="mt-3 h-5 w-96 max-w-full bg-white/10" />
          </div>
        )}

        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-28 rounded-3xl bg-[#222831]"
              />
            ))}
          </div>
        )}

        <div className="rounded-3xl bg-[#222831] p-5 shadow-2xl">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-10 w-full max-w-sm bg-white/10" />
            <Skeleton className="h-10 w-40 bg-white/10" />
          </div>

          <div className="space-y-3">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((_, index) => (
                <Skeleton key={index} className="h-6 bg-white/10" />
              ))}
            </div>

            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="grid gap-3 rounded-xl border border-white/5 p-3"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: columns }).map((_, columnIndex) => (
                  <Skeleton
                    key={columnIndex}
                    className="h-6 bg-white/10"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}