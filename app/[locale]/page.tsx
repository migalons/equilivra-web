import Hero from '@/components/Hero';
import ServiceHighlights from '@/components/ServiceHighlights';
import TrustSection from '@/components/TrustSection';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Hero />
            <ServiceHighlights />
            <TrustSection />
        </>
    );
}
