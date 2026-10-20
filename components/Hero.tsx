"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <div className="relative isolate overflow-hidden bg-white dark:bg-black py-24 sm:py-32">
            <div
                className="theme-logo-light absolute inset-0 -z-20 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-datacenter-day.webp')" }}
            />
            <div
                className="theme-logo-dark absolute inset-0 -z-20 h-full w-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-datacenter-night.webp')" }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/80 to-white/20 dark:from-black dark:via-black/80 dark:to-black/20" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
                    >
                        {t("subtitle")}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-10 flex items-center gap-x-6"
                    >
                        <Link
                            href="/contact"
                            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {t("cta")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
