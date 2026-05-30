import prisma from "@/lib/prisma";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Car,
  CircleDollarSign,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const validRevenueStatuses = ["CONFIRMED", "ACTIVE", "COMPLETED"];

export default async function AdminAnalyticsPage() {
  const [rentals, users, cars] = await Promise.all([
    prisma.rental.findMany({
      include: {
        car: {
          select: {
            id: true,
            brand: true,
            model: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.user.findMany({
      select: {
        id: true,
        active: true,
        rank: true,
        createdAt: true,
      },
    }),

    prisma.car.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        type: true,
        available: true,
      },
    }),
  ]);

  const revenueRentals = rentals.filter((rental) =>
    validRevenueStatuses.includes(rental.status)
  );

  const totalRevenue = revenueRentals.reduce(
    (sum, rental) => sum + rental.totalPrice,
    0
  );

  const cancelledRentals = rentals.filter(
    (rental) => rental.status === "CANCELLED"
  ).length;

  const activeUsers = users.filter((user) => user.active).length;

  const averageRentalValue =
    revenueRentals.length > 0 ? totalRevenue / revenueRentals.length : 0;

  const rentalsByStatus = rentals.reduce((acc, rental) => {
    acc[rental.status] = (acc[rental.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const rentalsByType = rentals.reduce((acc, rental) => {
    const type = rental.car.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

    const topCars = Object.entries(
        rentals.reduce((acc, rental) => {
            const name = `${rental.car.brand} ${rental.car.model}`;
            const carId = rental.car.id;
            if (!acc[name]) {
                acc[name] = {
                name,
                count: 0,
                revenue: 0,
                id: carId,
                };
            }

            acc[name].count += 1;

            if (validRevenueStatuses.includes(rental.status)) {
                acc[name].revenue += rental.totalPrice;
            }

            return acc;
        }, {} as Record<string, { name: string; count: number; revenue: number, id: number }>)
    )
    .map(([, value]) => value)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const monthlyRevenue = getMonthlyRevenue(revenueRentals);

  const maxMonthlyRevenue = Math.max(
    ...monthlyRevenue.map((month) => month.revenue),
    1
  );

  const maxStatusCount = Math.max(...Object.values(rentalsByStatus), 1);
  const maxTypeCount = Math.max(...Object.values(rentalsByType), 1);

  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <Link
          href="/admin"
          className="inline-flex items-center text-sm text-[#76ABAE] transition hover:underline"
          >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Panel
        </Link>
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
            Admin Analytics
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Rydex Performance Overview
          </h1>

          <p className="mt-3 max-w-2xl text-[#EEEEEE]/60">
            Track rentals, revenue, users, cancellations, and vehicle demand
            across the platform.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AnalyticsCard
            icon={<CircleDollarSign className="h-6 w-6" />}
            label="Total Revenue"
            value={`€${totalRevenue.toFixed(2)}`}
            subtitle="Excluding cancelled rentals"
          />

          <AnalyticsCard
            icon={<CalendarDays className="h-6 w-6" />}
            label="Total Rentals"
            value={String(rentals.length)}
            subtitle={`${revenueRentals.length} valid bookings`}
          />

          <AnalyticsCard
            icon={<XCircle className="h-6 w-6" />}
            label="Cancelled Rentals"
            value={String(cancelledRentals)}
            subtitle="Cancelled by users or admin"
          />

          <AnalyticsCard
            icon={<Users className="h-6 w-6" />}
            label="Active Users"
            value={String(activeUsers)}
            subtitle={`${users.length} total accounts`}
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <AnalyticsCard
            icon={<Car className="h-6 w-6" />}
            label="Cars Listed"
            value={String(cars.length)}
            subtitle={`${cars.filter((car) => car.available).length} available`}
          />

          <AnalyticsCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="Average Rental"
            value={`€${averageRentalValue.toFixed(2)}`}
            subtitle="Average value per valid rental"
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Monthly Revenue</h2>
              <p className="text-sm text-[#EEEEEE]/50">
                Revenue generated from confirmed, active, and completed rentals.
              </p>
            </div>

            <div className="flex h-72 items-end gap-4">
              {monthlyRevenue.map((month) => {
                const height = (month.revenue / maxMonthlyRevenue) * 100;

                return (
                  <div
                    key={month.label}
                    className="flex h-full flex-1 flex-col justify-end gap-3"
                  >
                    <div className="flex h-full items-end rounded-t-2xl bg-white/5">
                      <div
                        className="w-full rounded-t-2xl bg-[#76ABAE] transition-all"
                        style={{
                          height: `${Math.max(height, 4)}%`,
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-[#EEEEEE]/50">
                        {month.label}
                      </p>
                      <p className="text-sm font-semibold">
                        €{month.revenue.toFixed(0)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">Rental Status</h2>
            <p className="text-sm text-[#EEEEEE]/50">
              Current distribution of booking statuses.
            </p>

            <div className="mt-6 space-y-5">
              {Object.entries(rentalsByStatus).map(([status, count]) => (
                <ProgressRow
                  key={status}
                  label={status}
                  value={count}
                  max={maxStatusCount}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">Top Rented Cars</h2>
            <p className="text-sm text-[#EEEEEE]/50">
              Vehicles with the highest number of rentals.
            </p>

            <div className="mt-6 space-y-4">
              {topCars.length === 0 ? (
                <p className="text-sm text-[#EEEEEE]/50">
                  No rental data available yet.
                </p>
              ) : (
                topCars.map((car, index) => (
                  <div
                    key={car.name}
                    className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
                  >
                    <div>
                        <Link href={`/cars/${car.id}`} className="hover:text-[#76ABAE] transition">
                            <p className="font-semibold">
                                #{index + 1} {car.name}
                            </p>
                        </Link>
                        <p className="text-sm text-[#EEEEEE]/50">
                            {car.count} rentals
                        </p>
                    </div>

                    <p className="font-bold text-[#76ABAE]">
                      €{car.revenue.toFixed(0)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
            <h2 className="text-2xl font-bold">Popular Car Types</h2>
            <p className="text-sm text-[#EEEEEE]/50">
              Demand by vehicle category.
            </p>

            <div className="mt-6 space-y-5">
              {Object.entries(rentalsByType).length === 0 ? (
                <p className="text-sm text-[#EEEEEE]/50">
                  No car type data available yet.
                </p>
              ) : (
                Object.entries(rentalsByType).map(([type, count]) => (
                  <ProgressRow
                    key={type}
                    label={type}
                    value={count}
                    max={maxTypeCount}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AnalyticsCard({
  icon,
  label,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#222831] p-6 shadow-2xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#76ABAE]/20 text-[#76ABAE]">
        {icon}
      </div>

      <p className="text-sm text-[#EEEEEE]/50">{label}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      <p className="mt-2 text-sm text-[#EEEEEE]/40">{subtitle}</p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = (value / max) * 100;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-semibold text-[#76ABAE]">{value}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#76ABAE]"
          style={{
            width: `${Math.max(width, 5)}%`,
          }}
        />
      </div>
    </div>
  );
}

function getMonthlyRevenue(
  rentals: {
    totalPrice: number;
    createdAt: Date;
  }[]
) {
  const now = new Date();

  const months = Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

    return {
      label: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      year: date.getFullYear(),
      month: date.getMonth(),
      revenue: 0,
    };
  });

  rentals.forEach((rental) => {
    const rentalDate = new Date(rental.createdAt);

    const matchingMonth = months.find(
      (month) =>
        month.year === rentalDate.getFullYear() &&
        month.month === rentalDate.getMonth()
    );

    if (matchingMonth) {
      matchingMonth.revenue += rental.totalPrice;
    }
  });

  return months;
}