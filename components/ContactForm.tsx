"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
    const t = useTranslations("Contact.form");
    const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("SUBMITTING");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("https://formspree.io/f/xjgeyoar", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("SUCCESS");
                (e.target as HTMLFormElement).reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    setErrorMessage(data["errors"].map((error: any) => error["message"]).join(", "));
                } else {
                    setErrorMessage("Oops! There was a problem submitting your form");
                }
                setStatus("ERROR");
            }
        } catch (error) {
            setErrorMessage("Oops! There was a problem submitting your form");
            setStatus("ERROR");
        }
    };

    if (status === "SUCCESS") {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                    {t("success_title") || "Message Sent!"}
                </h3>
                <p className="text-green-700 dark:text-green-300">
                    {t("success_message") || "Thank you for contacting us. We will get back to you shortly."}
                </p>
                <button
                    onClick={() => setStatus("IDLE")}
                    className="mt-6 text-sm font-semibold text-green-700 dark:text-green-400 hover:underline"
                >
                    {t("send_another") || "Send another message"}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                        {t("name")}
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-base transition-all sm:leading-6"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-base transition-all sm:leading-6"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                        {t("message")}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder={t("message_placeholder") || "How can we help you?"}
                        className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-base transition-all sm:leading-6"
                    />
                </div>

                {/* Honeypot field */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                {status === "ERROR" && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === "SUBMITTING"}
                    className="flex justify-center items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === "SUBMITTING" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t("submitting") || "Sending..."}
                        </>
                    ) : (
                        t("submit")
                    )}
                </button>
            </form>
        </div>
    );
}
