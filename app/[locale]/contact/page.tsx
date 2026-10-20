import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Linkedin, Twitter } from "lucide-react";
import ContactForm from '@/components/ContactForm';
import { FigureFrame, FigureCaption } from '@/components/FigurePanel';

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("Contact");
    const tNav = await getTranslations("Navigation");

    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/*
                    "Engineering Dossier" treatment (approved Direction A): instead of a
                    third full-bleed photo hero, Contact borrows the Services page's
                    graph-paper panel / registration-mark / red FIG.-caption language so
                    the whole block reads as one "submittal sheet" rather than a bare
                    form + icon list on an empty canvas.
                */}
                <FigureFrame className="mx-auto max-w-5xl p-6 sm:p-10 lg:p-12">
                    <FigureCaption align="left" className="mb-5">
                        {`FIG. 06 — ${tNav("contact")}`}
                    </FigureCaption>

                    <div className="mb-10 sm:mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            {t("title")}
                        </h2>
                        <p className="mt-2 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 items-start">
                        <ContactForm />

                        <div className="border-t border-dashed border-stone-300 dark:border-zinc-700 pt-6">
                            <SpecRow label={t("info.address")}>
                                <span className="whitespace-pre-line">{t("info.address_value")}</span>
                            </SpecRow>

                            <SpecRow label={t("info.email")}>
                                {t("info.email_value")}
                            </SpecRow>

                            <SpecRow label={t("info.channels")}>
                                <div className="flex gap-3">
                                    <a
                                        href={t("social.linkedin_url")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                                    >
                                        <Linkedin className="h-5 w-5 text-white" aria-hidden="true" />
                                    </a>
                                    <a
                                        href={t("social.twitter_url")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Twitter"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                                    >
                                        <Twitter className="h-5 w-5 text-white" aria-hidden="true" />
                                    </a>
                                </div>
                            </SpecRow>

                            <FigureCaption align="right" className="mt-6">
                                Scale N.T.S. &middot; Rev. A
                            </FigureCaption>
                        </div>
                    </div>
                </FigureFrame>
            </div>
        </div>
    );
}

/**
 * Mono-label spec row — "LOCATION / EMAIL / CHANNELS" — matching the
 * red monospace labeling convention used on the Services diagrams
 * (DESIGN / INSTALL / TEST, SPOF, SLA, etc.).
 */
function SpecRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[100px_1fr] gap-3 py-3 border-b border-gray-200 dark:border-zinc-800">
            <div className="font-mono text-[11px] tracking-[0.05em] text-red-600 uppercase pt-0.5">
                {label}
            </div>
            <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {children}
            </div>
        </div>
    );
}
