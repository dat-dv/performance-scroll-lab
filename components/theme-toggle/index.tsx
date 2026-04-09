"use client";

import React, { useEffect, useEffectEvent, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeTransition } from "../theme-transition";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { startTransition } = useThemeTransition();

  const initTheme = useEffectEvent(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const isDark = savedTheme ? savedTheme === "dark" : true; // Default to dark mode

    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  });

  useEffect(() => {
    initTheme();
  }, []);

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-full border border-gray-100 bg-white/50 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
};
