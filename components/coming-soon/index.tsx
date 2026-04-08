"use client";

import React from "react";
import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComingSoonProps {
  title: string;
}

/**
 * Premium Coming Soon placeholder component.
 */
export function ComingSoon({ title }: ComingSoonProps) {
  const router = useRouter();
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-slate-200 bg-white/50 p-12 text-center backdrop-blur-3xl dark:border-white/5 dark:bg-black/20">
      {/* Background Decor */}
      <div className="absolute -top-24 -left-24 size-64 rounded-full bg-blue-500/10 blur-[100px]" />
      <div className="absolute -right-24 -bottom-24 size-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 shadow-2xl shadow-black/20 dark:bg-slate-100">
          <Construction className="size-10 text-slate-100 dark:text-slate-900" />
        </div>

        <div className="space-y-3">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">
            In Development
          </h2>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="mx-auto max-w-lg text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            Chúng tôi đang nỗ lực hoàn thiện module ảo hóa này. Kịch bản này yêu cầu cấu trúc xử lý
            dữ liệu phức tạp để đảm bảo hiệu suất tốt nhất. Sẽ sớm có mặt!
          </p>
        </div>

        <button
          onClick={router.back}
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-[10px] font-black tracking-widest text-slate-900 shadow-sm transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
          Trở lại
        </button>
      </motion.div>
    </div>
  );
}
