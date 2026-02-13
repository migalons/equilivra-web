"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
    const t = useTranslations("Navigation");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine visual state
    const isLightMode = mounted && resolvedTheme === "light";
    const showSolidHeader = isScrolled || isLightMode;

    const navLinks = [
        { key: "home", href: "/" },
        { key: "services", href: "/services" },
        { key: "about", href: "/about" },
        { key: "contact", href: "/contact" },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center h-20", // Force fixed 80px height
                showSolidHeader
                    ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center">
                            {/* Dark Mode Logo */}
                            <img
                                src="/equilivra-web/images/logo-horizontal-dark.png"
                                alt="Equilivra Logo"
                                className={clsx(
                                    "h-12 w-auto object-contain", // Slightly smaller logo for better fit in fixed h-20
                                    isLightMode ? "hidden" : "block"
                                )}
                            />

                            {/* Light Mode Logo */}
                            <img
                                src="/equilivra-web/images/logo-horizontal-light.png"
                                alt="Equilivra Logo"
                                className={clsx(
                                    "h-12 w-auto object-contain",
                                    isLightMode ? "block" : "hidden"
                                )}
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-semibold leading-6 transition-colors hover:text-red-500",
                                    isLightMode ? "text-gray-900" : "text-white"
                                )}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={clsx(
                            "md:hidden p-2",
                            isLightMode ? "text-gray-900" : "text-white"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg border-t dark:border-gray-800">
                    <div className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-red-500"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                        <div className="pt-4 border-t dark:border-gray-800 flex items-center justify-between">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
