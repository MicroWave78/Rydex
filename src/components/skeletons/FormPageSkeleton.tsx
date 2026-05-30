import { Skeleton } from "@/components/ui/skeleton";

export default function FormPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto max-w-4xl">
        <Skeleton className="mb-8 h-6 w-32 bg-white/10" />

        <div className="rounded-3xl bg-[#222831] p-6 shadow-2xl">
          <Skeleton className="h-10 w-72 bg-white/10" />
          <Skeleton className="mt-3 h-5 w-96 max-w-full bg-white/10" />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-24 bg-white/10" />
                <Skeleton className="h-10 w-full bg-white/10" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-8 h-12 w-full rounded-full bg-white/10" />
        </div>
      </div>
    </main>
  );
}