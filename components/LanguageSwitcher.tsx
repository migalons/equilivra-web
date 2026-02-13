"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";
import clsx from "clsx";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="relative">
            <select
                defaultValue={locale}
                onChange={handleChange}
                disabled={isPending}
                className={clsx(
                    "bg-transparent py-2 pl-3 pr-8 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-0 cursor-pointer",
                    isPending && "opacity-50"
                )}
            >
                <option value="es" className="text-black">ES</option>
                <option value="en" className="text-black">EN</option>
                <option value="pt" className="text-black">PT</option>
                <option value="ast" className="text-black">AST</option>
            </select>
        </div>
    );
}
