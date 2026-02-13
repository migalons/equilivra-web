"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Activity, ClipboardList, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceHighlights() {
    const t = useTranslations("ServiceHighlights");

    const services = [
        {
            key: "commissioning",
            icon: Activity,
            href: "/services#commissioning",
        },
        {
            key: "projectManagement",
            icon: ClipboardList,
            href: "/services#project-management",
        },
        {
            key: "energyEfficiency",
            icon: Zap,
            href: "/services#energy-efficiency",
        },
    ];

    return (
        <div className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-red-600">Equilivra Ingenieros</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t("title")}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        {t("subtitle")}
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col"
                            >
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <service.icon className="h-5 w-5 flex-none text-red-600" aria-hidden="true" />
                                    {t(`${service.key}.title`)}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">{t(`${service.key}.description`)}</p>
                                    <p className="mt-6">
                                        <Link href={service.href} className="text-sm font-semibold leading-6 text-red-600 hover:text-red-500">
                                            Learn more <span aria-hidden="true">→</span>
                                        </Link>
                                    </p>
                                </dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
