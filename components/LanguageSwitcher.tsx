"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const languages = [
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "pt", label: "PT", flag: "🇵🇹" },
    { code: "ast", label: "AST", flag: null }, // Asturias custom
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((l) => l.code === locale) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale as any });
        setIsOpen(false);
    };

    const AsturiasFlag = () => (
        <img
            src="/equilivra-web/images/asturias.png"
            alt="Asturias"
            className="w-5 h-auto object-contain rounded-[1px]"
        />
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="flex items-center gap-1.5 min-w-[40px]">
                    {currentLanguage.flag ? (
                        <span className="text-base leading-none select-none">{currentLanguage.flag}</span>
                    ) : (
                        <AsturiasFlag />
                    )}
                    <span>{currentLanguage.label}</span>
                </span>
                <ChevronDown className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-[60]"
                        role="listbox"
                    >
                        {languages.map((lang) => (
                            <li key={lang.code}>
                                <button
                                    onClick={() => handleSelect(lang.code)}
                                    className={clsx(
                                        "flex items-center gap-2 w-full px-4 py-2.5 text-sm transition-colors text-left",
                                        locale === lang.code
                                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                    )}
                                    role="option"
                                    aria-selected={locale === lang.code}
                                >
                                    <span className="flex items-center gap-2">
                                        {lang.flag ? (
                                            <span className="text-base leading-none select-none">{lang.flag}</span>
                                        ) : (
                                            <AsturiasFlag />
                                        )}
                                        <span>{lang.label}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}
