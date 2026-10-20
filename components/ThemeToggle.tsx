"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

export function ThemeToggle({
    className = "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
    iconClassName = "h-5 w-5 text-gray-800 dark:text-gray-200",
}: {
    className?: string;
    iconClassName?: string;
}) {
    const { setTheme, theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={className}
            aria-label="Toggle theme"
        >
            <Sun className={clsx(iconClassName, "sun-icon")} />
            <Moon className={clsx(iconClassName, "moon-icon")} />
        </button>
    );
}
