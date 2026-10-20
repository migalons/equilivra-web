import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Linkedin, Twitter, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Footer() {
    const tNav = useTranslations("Navigation");
    const tFooter = useTranslations("Footer");
    const tServices = useTranslations("ServiceHighlights");
    const tContact = useTranslations("Contact");

    return (
        <footer className="relative bg-gray-900 text-white py-12">
            {/* Thin red brand accent along the top edge */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 to-red-900" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr_1fr_1fr] md:gap-8">
                    {/* Closing CTA — gives the footer a conversion job */}
                    <div className="flex flex-col justify-center gap-3 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                        <p className="text-base font-bold text-white">{tFooter("cta.title")}</p>
                        <p className="text-sm text-gray-400">{tFooter("cta.subtitle")}</p>
                        <Link
                            href="/contact"
                            className="inline-flex w-fit items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {tFooter("cta.button")}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                            {tNav("services")}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded">
                                    Commissioning
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded">
                                    Project Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 rounded">
                                    {tServices("energyEfficiency.title")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                            {tNav("contact")}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>C/ Luis Carlos Vázquez 16, oficina izquierda</li>
                            <li>28043 Madrid</li>
                            <li>info@equilivra.com</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-start gap-4 md:items-end">
                        <img
                            src="/images/logo-horizontal-dark.png"
                            alt="Equilivra Logo"
                            // Footer is always dark regardless of theme; there is no dedicated
                            // white logo asset, so force the dark-variant PNG to pure white:
                            // brightness-0 flattens it to solid black, invert flips that to white.
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                        <p className="text-xs text-gray-500 text-left md:text-right">{tFooter("tagline")}</p>
                        <div className="flex gap-2">
                            <a
                                href={tContact("social.linkedin_url")}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
                            </a>
                            <a
                                href={tContact("social.twitter_url")}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                <Twitter className="h-5 w-5 text-white" aria-hidden="true" />
                            </a>
                            <ThemeToggle
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-700 transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                iconClassName="h-5 w-5 text-gray-300"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Equilivra Ingenieros. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
