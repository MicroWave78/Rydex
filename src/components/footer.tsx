import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "FAQs", href: "/about#faq" },
      { label: "Terms", href: "/" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Live Chat", href: "/contact" },
      { label: "How It Works", href: "/#howto" },
    ],
  },
  {
    title: "Our Brands",
    links: [
      { label: "Toyota", href: "/cars" },
      { label: "Porsche", href: "/cars" },
      { label: "Audi", href: "/cars" },
      { label: "BMW", href: "/cars" },
      { label: "Ford", href: "/cars" },
      { label: "Nissan", href: "/cars" },
      { label: "Volkswagen", href: "/cars" },
    ],
  },
  {
    title: "Vehicle Types",
    links: [
      { label: "Sedan", href: "/cars" },
      { label: "SUV", href: "/cars" },
      { label: "Hybrid", href: "/cars" },
      { label: "Electric", href: "/cars" },
      { label: "Convertible", href: "/cars" },
      { label: "Sport", href: "/cars" },
    ],
  },
];
    return (
        <footer className="bg-[#222831] px-6 py-10 text-[#EEEEEE]">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    {footerSections.map((section) => (
                        <div key={section.title} className="space-y-3">
                            <h2 className="text-lg font-bold">{section.title}</h2>

                            <div className="flex flex-col gap-2 text-sm text-[#EEEEEE]/75">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="w-fit transition hover:text-[#76ABAE] hover:underline"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="space-y-5">
                        <div>
                            <h2 className="text-lg font-bold">Sale Hours</h2>
                            <div className="mt-3 space-y-2 text-sm text-[#EEEEEE]/75">
                                <p>Monday - Friday: 09:00AM - 09:00PM</p>
                                <p>Saturday: 09:00AM - 07:00PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold">Connect With Us</h2>
                            <div className="mt-3 flex gap-4">
                                <Link href="https://facebook.com/" target="_blank" className="hover:text-[#76ABAE]">
                                <FaFacebook className="h-5 w-5" />
                                </Link>
                                <Link href="https://instagram.com/" target="_blank" className="hover:text-[#76ABAE]">
                                <FaInstagram className="h-5 w-5" />
                                </Link>
                                <Link href="https://linkedin.com/" target="_blank" className="hover:text-[#76ABAE]">
                                <FaLinkedin className="h-5 w-5" />
                                </Link>
                                <Link href="https://twitter.com/" target="_blank" className="hover:text-[#76ABAE]">
                                <FaXTwitter className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-[#EEEEEE]/60">
                © 2026 Rydex. All rights reserved.
                </div>
            </div>
        </footer>
    )
}