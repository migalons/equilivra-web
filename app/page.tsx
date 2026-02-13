"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Detect browser language and redirect
        const browserLang = typeof navigator !== 'undefined' ? navigator.language.split("-")[0] : 'es';
        const supportedLocales = ["es", "en", "pt", "ast"];
        const targetLocale = supportedLocales.includes(browserLang) ? browserLang : "es";

        router.replace(`/${targetLocale}`);
    }, [router]);

    return null;
}
