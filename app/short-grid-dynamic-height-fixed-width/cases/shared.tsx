"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CardData {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
}

export const MOCK_CARDS: CardData[] = Array.from({ length: 44 }, (_, i) => {
  const descriptions = [
    "Mô tả siêu ngắn.",
    "Mô tả trung bình để xem sự co giãn của layout card cơ bản.",
    "Đây là một đoạn mô tả dài hơn một chút, đủ để chiếm khoảng 3-4 dòng trên thiết bị di động.",
    "Một đoạn nội dung cực kỳ dài và chi tiết, được sinh ra với mục đích thử thách khả năng sắp xếp của CSS Grid và Masonry.",
  ];
  const categories = ["Tech", "Design", "Product", "News"];
  return {
    id: i + 1,
    title: `Card Project #${i + 1}`,
    category: categories[i % categories.length],
    description: descriptions[i % descriptions.length],
    icon: ["🚀", "🎨", "📦", "🧩"][i % 4],
  };
});

/**
 * A ultra-premium Card component that displays project information.
 * Features Framer Motion interactions, glassmorphism, and fluid layout.
 * Used across different grid layout cases to demonstrate consistency and responsiveness.
 * 
 * @param props.card - The data object containing card details
 * @param props.extraClass - Optional additional CSS classes for styling overrides
 */
export function Card({ card, extraClass = "" }: { card: CardData; extraClass?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] ${extraClass}`}
    >
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-400/10 dark:to-purple-400/10" />
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl shadow-inner dark:bg-blue-500/20">
          {card.icon}
        </div>
        <span className="rounded-full bg-slate-100/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 backdrop-blur-md dark:bg-white/10 dark:text-slate-400">
          {card.category}
        </span>
      </div>

      <h4 className="mb-3 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {card.title}
      </h4>
      
      <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400/80">
        {card.description}
      </p>

      {/* Interactive Micro-interaction Decorator */}
      <div className="mt-6 flex items-center gap-2 overflow-hidden text-[10px] font-bold uppercase tracking-wider text-blue-600 opacity-0 transition-all group-hover:opacity-100 dark:text-blue-400">
        <span>View Project</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}
