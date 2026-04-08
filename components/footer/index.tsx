"use client";

/**
 * Minimalist Footer - Clean, simple, and functional.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border-primary bg-footer-bg block w-full border-t py-4 text-center text-xs text-gray-500 backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-6">
        © {currentYear} <span className="font-medium opacity-50">Crafted by datdoan.dev</span>
      </div>
    </footer>
  );
}
