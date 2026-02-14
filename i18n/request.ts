import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // In Next.js 15+, the requestLocale needs to be awaited
    const locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    const activeLocale = (!locale || !routing.locales.includes(locale as any))
        ? routing.defaultLocale
        : locale;

    // Load messages from all JSON files in the locale directory
    // Note: We're doing a simple merge. In a production app you might want deeper merging.
    const mainMessages = (await import(`../messages/${activeLocale}/main.json`)).default;
    const contactMessages = (await import(`../messages/${activeLocale}/contact.json`)).default;

    const messages = {
        ...mainMessages,
        ...contactMessages
    };

    return {
        locale: activeLocale,
        messages
    };
});
