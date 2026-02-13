import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Barlow, Inter } from "next/font/google";
import "../globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from "@/components/ThemeProvider";

const barlow = Barlow({
    variable: "--font-barlow",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Await the params object
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme') || 'system';
                                    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                                    document.documentElement.classList.toggle('dark', isDark);
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${barlow.variable} ${inter.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        <div className="min-h-screen pt-20">
                            {children}
                        </div>
                        <Footer />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
