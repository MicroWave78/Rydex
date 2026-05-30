import AiAssistantClient from "./AiAssistantClient"

export default function AiAssistantPage() {
  return (
    <main className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl flex-col">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
            Rydex AI
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            AI Rental Assistant
          </h1>

          <p className="mt-3 max-w-2xl text-[#EEEEEE]/60">
            Tell the assistant where you are going, who you are traveling with,
            and what kind of vibe you want. It will recommend cars from the
            Rydex fleet.
          </p>
        </div>

        <AiAssistantClient />
      </div>
    </main>
  );
}