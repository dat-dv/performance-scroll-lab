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
    default: "Dat App",
    template: "%s | Dat App",
  },
  description: "High performance UI system built by Dat",
};

import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";

// ===== Layout =====
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="bg-background flex min-h-screen flex-col transition-colors duration-300">
        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-[1200px] flex-grow px-6 py-6">
          <Breadcrumb />
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
