import type { ReactNode } from "react";

/**
 * Shared engineering-drawing visual DNA: a bordered panel with corner
 * registration marks and a faint graph-paper grid. Originated on the
 * Services page (approved "Direction C" mockup) to frame the service
 * illustrations, and reused on the Contact page (approved "Direction A —
 * Engineering Dossier" mockup) to frame the whole contact block as a
 * "submittal sheet."
 *
 * `FigureFrame` only owns the border / grid-paper background / corner marks —
 * callers control their own padding, sizing and internal layout via
 * `className`, so the same primitive works both as a small square diagram
 * frame (Services) and a large full-width section frame (Contact).
 */
export function FigureFrame({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`relative border border-stone-300 dark:border-zinc-700
                       bg-[#fcfcfb] dark:bg-[#0f0f10]
                       bg-[image:repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(0,0,0,.035)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,rgba(0,0,0,.035)_20px)]
                       dark:bg-[image:repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(255,255,255,.045)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,rgba(255,255,255,.045)_20px)]
                       ${className}`}
        >
            <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-stone-300 dark:border-zinc-700" />
            <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r-2 border-t-2 border-stone-300 dark:border-zinc-700" />
            <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-stone-300 dark:border-zinc-700" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 border-stone-300 dark:border-zinc-700" />
            {children}
        </div>
    );
}

/** Red monospace "FIG. 0X — CAPTION" / "SCALE N.T.S." style label used throughout the drawing system. */
export function FigureCaption({
    children,
    align = "center",
    className = "",
}: {
    children: ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
}) {
    const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
    return (
        <div className={`font-mono text-[11px] tracking-[0.06em] text-red-600 uppercase ${alignClass} ${className}`}>
            {children}
        </div>
    );
}
