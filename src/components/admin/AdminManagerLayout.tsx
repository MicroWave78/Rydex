import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AdminManagerLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AdminManagerLayout({
  eyebrow,
  title,
  description,
  children,
}: AdminManagerLayoutProps) {
  return (
    <section className="min-h-screen bg-[#31363F] px-4 py-28 text-[#EEEEEE]">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm text-[#76ABAE] transition hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Panel
      </Link>
      <div className="mx-auto w-full max-w-7xl">
        
        <div className="mx-auto w-full max-w-7xl">
          

          <div className="mb-10 max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#76ABAE]">
              {eyebrow}
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {title}
            </h1>

            <p className="mt-3 text-[#EEEEEE]/60">
              {description}
            </p>
          </div>
        </div>

        
      </div>
        <div className="p-6">
            {children}
        </div>
    </section>
  );
}