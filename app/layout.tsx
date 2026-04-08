import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ===== Fonts =====
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// ===== Metadata =====
export const metadata: Metadata = {
  title: {
    default: "Virtualization — High Performance UI",
    template: "%s | Virtualization",
  },
  description:
    "A professional suite of virtualization strategies, infinite scrolling patterns, and windowing techniques for modern web applications.",
};

import { Breadcrumb } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";

// ===== Layout =====
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="bg-background flex min-h-screen flex-col pt-[72px] transition-colors duration-300">
        {/* Navigation / Breadcrumb Container (Fixed Header) */}
        <div className="fixed inset-x-0 top-0 z-[100] border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-black/80">
          <div className="mx-auto max-w-[1200px] px-6">
            <Breadcrumb />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-[1200px] flex-grow px-6 py-6">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
