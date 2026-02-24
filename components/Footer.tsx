import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
    const t = useTranslations("Navigation");

    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/images/logo-horizontal-dark.png"
                                alt="Equilivra Logo"
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                        </div>
                        <p className="text-gray-400 text-sm">
                            Ingeniería de Valor Añadido en Infraestructuras Críticas.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                            {t("services")}
                        </h3>
                        <ul className="space-y-2">
                            <li><Link href="/services" className="text-gray-300 hover:text-white">Commissioning</Link></li>
                            <li><Link href="/services" className="text-gray-300 hover:text-white">Project Management</Link></li>
                            <li><Link href="/services" className="text-gray-300 hover:text-white">Eficiencia Energética</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                            {t("contact")}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>C/ Luis Carlos Vázquez 16, oficina izquierda</li>
                            <li>28043 Madrid</li>
                            <li>info@equilivra.com</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Equilivra Ingenieros. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
