import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("About");

    return (
        <div className="bg-white dark:bg-black">
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-20"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')",
                    }}
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{t("title")}</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">{t("intro")}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 lg:items-start">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                {t("mission.title")}
                            </h3>
                            <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">
                                {t("mission.description")}
                            </p>
                        </div>
                        <div className="lg:pl-8">
                            <blockquote className="text-xl font-semibold leading-8 text-gray-900 dark:text-white sm:text-2xl sm:leading-9">
                                <p>“{t("quote")}”</p>
                            </blockquote>
                            <figcaption className="mt-8 text-base">
                                <div className="font-semibold text-gray-900 dark:text-white">{t("author")}</div>
                            </figcaption>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
