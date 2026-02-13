import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale: localePromise }) => {
    // In Next.js 15+, the locale might be a promise
    const locale = await localePromise;

    // Validate that the incoming `locale` parameter is valid
    const activeLocale = (!locale || !routing.locales.includes(locale as any))
        ? routing.defaultLocale
        : locale;

    return {
        locale: activeLocale,
        messages: (await import(`../messages/${activeLocale}.json`)).default
    };
});
