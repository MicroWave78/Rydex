import { Skeleton } from "@/components/ui/skeleton";

export default function CarCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#EEEEEE] shadow-lg">
      <Skeleton className="h-52 w-full rounded-none bg-gray-300" />

      <div className="space-y-4 p-5">
        <div className="flex justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-300" />
            <Skeleton className="h-4 w-24 bg-gray-300" />
          </div>

          <Skeleton className="h-6 w-20 bg-gray-300" />
        </div>

        <Skeleton className="h-4 w-full bg-gray-300" />

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-14 bg-gray-300" />
          ))}
        </div>

        <Skeleton className="h-10 w-full bg-gray-300" />
      </div>
    </div>
  );
}