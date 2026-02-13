"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Globe } from "lucide-react";

export default function TrustSection() {
    const t = useTranslations("TrustSection");

    return (
        <div className="bg-gray-50 dark:bg-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {t("title")}
                    </h2>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                                <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            Locations
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                            {t("locations")}
                        </dd>
                    </div>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                                <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            ISO Standards
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                            {t("standards")}
                        </dd>
                    </div>
                </div>
            </div>
        </div>
    );
}
