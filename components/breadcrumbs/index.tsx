"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/cn";

/**
 * Global Breadcrumb Component - Automatically parces current route to show navigation path.
 */
export function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-2 py-5 text-sm font-bold text-slate-400 transition-all duration-300",
        className
      )}
    >
      <Link href="/" className="flex items-center transition-colors hover:text-blue-500">
        <Home size={14} className="mr-1.5" />
        Home
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={12} className="shrink-0 opacity-40" />
            <Link
              href={href}
              className={cn(
                "transition-colors tracking-tight",
                isLast ? "text-blue-600 dark:text-blue-400" : "hover:text-blue-500"
              )}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
