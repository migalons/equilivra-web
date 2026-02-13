"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value as "es" | "en" | "pt" | "ast";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <div className="relative">
            <select
                value={locale}
                onChange={handleChange}
                className="bg-transparent py-2 pl-3 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-0 cursor-pointer"
            >
                <option value="es" className="text-black">ES</option>
                <option value="en" className="text-black">EN</option>
                <option value="pt" className="text-black">PT</option>
                <option value="ast" className="text-black">AST</option>
            </select>
        </div>
    );
}
