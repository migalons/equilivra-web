import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Activity, ClipboardList, Zap, Settings, ShieldCheck, Check } from "lucide-react";
import type { ComponentType } from "react";
import { FigureFrame, FigureCaption } from "@/components/FigurePanel";

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("ServicesPage");

    const services = [
        { key: "commissioning", icon: Activity, id: "commissioning", Diagram: DiagramCommissioning },
        { key: "projectManagement", icon: ClipboardList, id: "project-management", Diagram: DiagramSchedule },
        { key: "energy", icon: Zap, id: "energy-efficiency", Diagram: DiagramGauge },
        { key: "maintenance", icon: Settings, id: "maintenance", Diagram: DiagramGear },
        { key: "risk", icon: ShieldCheck, id: "risk-management", Diagram: DiagramSpof },
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
                                <FigurePanel
                                    number={index + 1}
                                    caption={t(`${service.key}.title`)}
                                >
                                    <service.Diagram />
                                </FigurePanel>
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

/**
 * Engineering-drawing frame for the service illustrations: a bordered panel with
 * corner registration marks, a faint graph-paper grid, and a "FIG. 0X — TITLE" caption.
 * Mirrors the approved "Direction C" mockup (services-proposal.html).
 * Built on the shared `FigureFrame` / `FigureCaption` primitives (components/FigurePanel.tsx),
 * also used by the Contact page's "Engineering Dossier" treatment.
 */
function FigurePanel({
    number,
    caption,
    children,
}: {
    number: number;
    caption: string;
    children: React.ReactNode;
}) {
    const fig = `FIG. ${String(number).padStart(2, "0")} — ${caption}`;

    return (
        <FigureFrame className="rounded flex-1 w-full h-64 lg:h-auto min-h-[300px] flex flex-col items-center justify-center p-5">
            <div className="w-full max-w-[320px]">{children}</div>
            <FigureCaption className="mt-3.5 px-2">{fig}</FigureCaption>
        </FigureFrame>
    );
}

/* ---------------------------------------------------------------------- */
/* Shared diagram style tokens (match --diagram-line / --diagram-label    */
/* from the approved mockup: stone-400/zinc-600 and stone-500/zinc-400)   */
/* ---------------------------------------------------------------------- */
const LINE = "stroke-stone-400 dark:stroke-zinc-600";
const LABEL = "font-mono fill-stone-500 dark:fill-zinc-400";
const RED = "#dc2626";

function DiagramCommissioning() {
    return (
        <svg viewBox="0 0 220 140" className="w-full h-auto block" aria-hidden="true">
            <line x1="20" y1="80" x2="200" y2="80" className={LINE} fill="none" strokeWidth={2} />
            <g>
                <circle cx="30" cy="80" r="11" fill={RED} />
                <path d="M25 80l3.5 3.5L36 76" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g>
                <circle cx="85" cy="80" r="11" fill={RED} />
                <path d="M80 80l3.5 3.5L91 76" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g>
                <circle cx="140" cy="80" r="11" fill={RED} />
                <path d="M135 80l3.5 3.5L146 76" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="195" cy="80" r="11" className={LINE} fill="none" strokeWidth={2} strokeDasharray="3 3" />
            <text x="30" y="110" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">DESIGN</text>
            <text x="85" y="110" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">INSTALL</text>
            <text x="140" y="110" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">TEST</text>
            <text x="195" y="110" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">HAND-OFF</text>
        </svg>
    );
}

function DiagramSchedule() {
    return (
        <svg viewBox="0 0 220 140" className="w-full h-auto block" aria-hidden="true">
            <line x1="30" y1="20" x2="30" y2="120" className={LINE} strokeWidth={1.5} />
            <rect x="30" y="28" width="90" height="12" rx={3} className="fill-stone-400 dark:fill-zinc-600" />
            <rect x="55" y="52" width="130" height="12" rx={3} fill={RED} opacity={0.8} />
            <rect x="45" y="76" width="70" height="12" rx={3} className="fill-stone-400 dark:fill-zinc-600" />
            <rect x="95" y="100" width="95" height="12" rx={3} fill={RED} opacity={0.8} />
            <line x1="130" y1="14" x2="130" y2="124" stroke={RED} strokeWidth={1.5} strokeDasharray="4 3" />
            <text x="130" y="10" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">TODAY</text>
        </svg>
    );
}

function DiagramGauge() {
    return (
        <svg viewBox="0 0 220 140" className="w-full h-auto block" aria-hidden="true">
            <path d="M30 105 A 70 70 0 0 1 190 105" className={LINE} fill="none" strokeWidth={6} />
            <path d="M121 38 A 70 70 0 0 1 190 105" stroke={RED} fill="none" strokeWidth={6} opacity={0.55} />
            <line x1="30" y1="105" x2="18" y2="105" className={LINE} strokeWidth={1.5} />
            <line x1="38" y1="58" x2="27" y2="51" className={LINE} strokeWidth={1.5} />
            <line x1="110" y1="35" x2="110" y2="23" className={LINE} strokeWidth={1.5} />
            <line x1="182" y1="58" x2="193" y2="51" className={LINE} strokeWidth={1.5} />
            <line x1="190" y1="105" x2="202" y2="105" className={LINE} strokeWidth={1.5} />
            <line x1="110" y1="105" x2="150" y2="55" stroke={RED} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx="110" cy="105" r="7" fill={RED} />
            <text x="110" y="128" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">ISO 50001</text>
        </svg>
    );
}

function DiagramGear() {
    return (
        <svg viewBox="0 0 220 140" className="w-full h-auto block" aria-hidden="true">
            <circle cx="110" cy="65" r="32" className={LINE} fill="none" strokeWidth={2.5} />
            <path
                d="M 142.0 65.0 L 149.4 71.9 L 148.0 77.4 L 138.3 80.0 M 132.6 87.6 L 132.9 97.8 L 128.2 100.6 L 119.4 95.6 M 110.0 97.0 L 103.1 104.4 L 97.6 103.0 L 95.0 93.3 M 87.4 87.6 L 77.2 87.9 L 74.4 83.2 L 79.4 74.4 M 78.0 65.0 L 70.6 58.1 L 72.0 52.6 L 81.7 50.0 M 87.4 42.4 L 87.1 32.2 L 91.8 29.4 L 100.6 34.4 M 110.0 33.0 L 116.9 25.6 L 122.4 27.0 L 125.0 36.7 M 132.6 42.4 L 142.8 42.1 L 145.6 46.8 L 140.6 55.6"
                className={LINE}
                fill="none"
                strokeWidth={2.5}
            />
            <circle cx="110" cy="65" r="11" fill={RED} />
            <line x1="60" y1="118" x2="160" y2="20" stroke={RED} strokeWidth={4} strokeLinecap="round" opacity={0.85} />
            <text x="110" y="132" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">SLA</text>
        </svg>
    );
}

function DiagramSpof() {
    return (
        <svg viewBox="0 0 220 140" className="w-full h-auto block" aria-hidden="true">
            <circle cx="30" cy="70" r="13" fill={RED} />
            <circle cx="190" cy="70" r="13" fill={RED} />
            <path d="M43 62 C 100 30, 120 30, 177 62" className={LINE} fill="none" strokeWidth={2} />
            <path d="M43 78 C 100 110, 120 110, 177 78" className={LINE} fill="none" strokeWidth={2} strokeDasharray="5 4" opacity={0.55} />
            <line x1="100" y1="88" x2="112" y2="100" stroke={RED} strokeWidth={2.5} strokeLinecap="round" />
            <line x1="112" y1="88" x2="100" y2="100" stroke={RED} strokeWidth={2.5} strokeLinecap="round" />
            <text x="30" y="100" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">A</text>
            <text x="190" y="100" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">B</text>
            <text x="106" y="38" className={LABEL} fontSize={7.5} letterSpacing="0.04em" textAnchor="middle">SPOF</text>
        </svg>
    );
}
