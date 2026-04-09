import type { Metadata } from "next";
import { Be_Vietnam_Pro, Geist_Mono } from "next/font/google";
import "./globals.css";

// ===== Fonts =====
const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const mono = Geist_Mono({
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

import { Footer } from "@/components/footer";
import { Suspense } from "react";
import Header from "@/components/header";
import { ThemeTransitionProvider } from "@/components/theme-transition";

// ===== Layout =====
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} custom-scrollbar h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || !theme) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background flex min-h-screen flex-col pt-[72px] transition-colors duration-300">
        <ThemeTransitionProvider>
          <Suspense>
            {/* Navigation / Breadcrumb Container (Fixed Header) */}
            <Header />

            {/* Main Content Area */}
            <main className="mx-auto w-full max-w-[1200px] flex-grow px-6 py-6">{children}</main>

            {/* Footer */}
            <Footer />
          </Suspense>
        </ThemeTransitionProvider>
      </body>
    </html>
  );
}
