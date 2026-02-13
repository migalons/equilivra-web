"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import clsx from "clsx";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const locales = ["es", "en", "pt", "ast"];

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={(e) => {
                    const nextLocale = e.target.value;
                    const link = document.querySelector(`a[href*="/${nextLocale}${pathname}"]`) as HTMLAnchorElement;
                    if (link) link.click();
                }}
                className={clsx(
                    "bg-transparent py-2 pl-3 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-0 cursor-pointer"
                )}
            >
                <option value="es" className="text-black">ES</option>
                <option value="en" className="text-black">EN</option>
                <option value="pt" className="text-black">PT</option>
                <option value="ast" className="text-black">AST</option>
            </select>
            {/* Hidden links for navigation */}
            {locales.map((loc) => (
                <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    style={{ display: "none" }}
                    data-locale={loc}
                />
            ))}
        </div>
    );
}
