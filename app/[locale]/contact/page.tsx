import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from '@/components/ContactForm';

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("Contact");

    return (
        <div className="bg-white dark:bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{t("title")}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">{t("subtitle")}</p>
                </div>
                <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 text-base leading-7 sm:grid-cols-2">
                    <ContactForm />
                    <div className="flex flex-col gap-8 justify-center">
                        <div className="flex gap-4 items-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
                                <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{t("info.address")}</h3>
                                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">C/ Luis Carlos Vázquez 16, oficina izquierda<br />28043 Madrid</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
                                <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{t("info.phone")}</h3>
                                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">+34 91.039.45.59</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600">
                                <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{t("info.email")}</h3>
                                <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">info@equilivra.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
