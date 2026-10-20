"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";

export default function Header() {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

    const navLinks = [
        { key: "home", href: "/" },
        { key: "services", href: "/services" },
        { key: "about", href: "/about" },
        { key: "contact", href: "/contact" },
    ];

    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    // Click-outside and Escape-to-close for the mobile menu, mirroring LanguageSwitcher's pattern.
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target as Node) &&
                mobileMenuButtonRef.current &&
                !mobileMenuButtonRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center bg-white/90 shadow-sm backdrop-blur-md dark:bg-black/90">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        <div className="flex items-center">
                            <img
                                src="/images/logo-horizontal-light.png"
                                alt="Equilivra Logo"
                                className="h-12 w-auto object-contain theme-logo-light"
                            />
                            <img
                                src="/images/logo-horizontal-dark.png"
                                alt="Equilivra Logo"
                                className="h-12 w-auto object-contain theme-logo-dark"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={clsx(
                                        "relative pb-1 text-sm font-semibold leading-6 transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
                                        active
                                            ? "text-red-600 dark:text-red-500"
                                            : "text-gray-900 hover:text-red-500 dark:text-white"
                                    )}
                                >
                                    {t(link.key)}
                                    {active && (
                                        <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-red-600" />
                                    )}
                                </Link>
                            );
                        })}
                        <LanguageSwitcher />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        ref={mobileMenuButtonRef}
                        className="md:hidden p-2 text-gray-900 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-menu"
                    ref={mobileMenuRef}
                    className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg border-t dark:border-gray-800"
                >
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={clsx(
                                        "flex items-center justify-between text-base font-semibold rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
                                        active
                                            ? "text-red-600 dark:text-red-500"
                                            : "text-gray-900 hover:text-red-500 dark:text-gray-100"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t(link.key)}
                                    {active && <span className="h-1.5 w-1.5 rounded-full bg-red-600" />}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t dark:border-gray-800">
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
