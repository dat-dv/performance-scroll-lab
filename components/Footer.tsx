"use client";

/**
 * Minimalist Footer - Clean, simple, and functional.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="block w-full border-t border-border-primary bg-footer-bg py-4 text-center text-xs text-gray-500 backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto max-w-[1200px] px-6">
        © {currentYear} <span className="opacity-50 font-medium">Crafted by datdoan.dev</span>
      </div>
    </footer>
  );
}
