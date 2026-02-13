import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Activity, ClipboardList, Zap, Settings, ShieldCheck, Check } from "lucide-react";

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("ServicesPage");

    const services = [
        { key: "commissioning", icon: Activity, id: "commissioning" },
        { key: "projectManagement", icon: ClipboardList, id: "project-management" },
        { key: "energy", icon: Zap, id: "energy-efficiency" },
        { key: "maintenance", icon: Settings, id: "maintenance" },
        { key: "risk", icon: ShieldCheck, id: "risk-management" },
    ];

    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("title")}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">{t("intro")}</p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-y-16 lg:gap-y-24">
                        {services.map((service, index) => (
                            <div key={service.key} id={service.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-600">
                                            <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {t(`${service.key}.title`)}
                                        </h3>
                                    </div>
                                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                        {t(`${service.key}.description`)}
                                    </p>

                                    {/* Correct approach for array: */}
                                    <ServiceList items={t.raw(`${service.key}.items`) as string[]} />
                                </div>
                                <div className="flex-1 w-full bg-gray-100 dark:bg-zinc-900 rounded-2xl h-64 lg:h-auto min-h-[300px] flex items-center justify-center">
                                    {/* Placeholder for service image */}
                                    <service.icon className="h-32 w-32 text-gray-300 dark:text-zinc-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServiceList({ items }: { items: string[] }) {
    return (
        <ul className="mt-8 space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex gap-3">
                    <Check className="h-6 w-5 flex-none text-red-600" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
            ))}
        </ul>
    );
}
