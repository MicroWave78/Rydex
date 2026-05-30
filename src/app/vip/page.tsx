import VipUpgradeCard from "./VipUpgradeCard";

export default function VipPage() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mt-8 mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
          Rydex VIP
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-6xl">
          Unlock the premium Rydex experience.
        </h1>

        <p className="mt-5 max-w-2xl text-[#EEEEEE]/70">
          VIP members get exclusive perks, priority booking, reduced service
          fees, and access to premium offers across the Rydex platform.
        </p>

        <VipUpgradeCard />
      </div>
    </main>
  );
}