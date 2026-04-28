import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Reviews() {
    const reviews = [
        {
            name: "Trustpilot",
            logo: "/images/Trustpilot_logo.png",
            href: "https://www.trustpilot.com",
            rating: "4.8",
            reviews: "5,801",
        },
        {
            name: "Google Reviews",
            logo: "/images/Google-Review-Logo.png",
            href: "https://customerreviews.google.com",
            rating: "4.7",
            reviews: "4,219",
        },
        {
            name: "Yelp",
            logo: "/images/Yelp_Logo.svg.png",
            href: "https://www.yelp.com",
            rating: "4.6",
            reviews: "2,947",
        },
    ];
    return (
        <>
            {/* Who is Rydex */}
            <section className="relative mx-4 my-16 overflow-hidden rounded-3xl bg-[#222831] px-6 py-16 text-[#EEEEEE] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#76ABAE]/20 via-transparent to-black/30" />
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#76ABAE]/20 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#76ABAE]/10 blur-3xl" />

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.4fr]">
                <div className="text-center lg:text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#76ABAE]">
                    Trusted rentals
                </p>

                <h1 className="text-3xl font-bold md:text-5xl">
                    Who is Rydex?
                </h1>

                <p className="mt-5 text-base leading-relaxed text-[#EEEEEE]/75 md:text-lg">
                    Rydex is a modern car rental platform designed to make finding and booking your next ride simple and stress-free. From everyday vehicles to premium options, we connect you with reliable cars at competitive prices, all in just a few clicks.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div>
                    <p className="text-2xl font-bold text-[#76ABAE]">10K+</p>
                    <p className="text-xs text-[#EEEEEE]/60">Bookings</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-[#76ABAE]">500+</p>
                    <p className="text-xs text-[#EEEEEE]/60">Cars</p>
                    </div>
                    <div>
                    <p className="text-2xl font-bold text-[#76ABAE]">98%</p>
                    <p className="text-xs text-[#EEEEEE]/60">Satisfaction</p>
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {reviews.map((review) => (
                    <Link
                    key={review.name}
                    href={review.href}
                    target="_blank"
                    className="group rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#76ABAE]/70 hover:bg-white/15 hover:shadow-2xl hover:shadow-[#76ABAE]/20"
                    >
                    <p className="text-sm text-[#EEEEEE]/60">{review.name}</p>

                    <div className="mt-3 flex items-end justify-center gap-1">
                        <span className="text-4xl font-bold text-white">{review.rating}</span>
                        <span className="mb-1 text-sm text-[#EEEEEE]/60">/5</span>
                    </div>

                    <div className="mt-4 flex justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="h-5 w-5 fill-[#76ABAE] text-[#76ABAE] transition-transform duration-200 group-hover:-translate-y-1"
                            style={{ transitionDelay: `${i * 40}ms` }}
                        />
                        ))}
                    </div>

                    <p className="mt-3 text-sm text-[#EEEEEE]/70">
                        Based on {review.reviews} reviews
                    </p>

                    <div className="mt-5 flex h-10 items-center justify-center rounded-xl bg-white px-4">
                        <Image
                        src={review.logo}
                        alt={`${review.name} logo`}
                        width={120}
                        height={40}
                        className="max-h-7 w-auto object-contain"
                        />
                    </div>
                    </Link>
                ))}
                </div>
            </div>
            </section>
        </>
    )
}