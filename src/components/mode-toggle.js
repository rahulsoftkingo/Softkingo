// src/components/mode-toggle.js
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * A button to toggle between light and dark mode.
 * Requires wrapping your app in <ThemeProvider> from "next-themes".
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
