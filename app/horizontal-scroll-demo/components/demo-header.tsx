import { motion } from "framer-motion";
import { ChevronLeft, Cpu, MousePointer2 } from "lucide-react";
import Link from "next/link";

export function DemoHeader() {
  return (
    <header className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/"
          className="group flex w-fit items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO SOLUTIONS</span>
        </Link>
      </motion.div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Horizontal <br />
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Static Virtualization
            </span>
          </h1>
          <p className="max-w-xl text-lg font-medium text-slate-500 dark:text-slate-400">
            A high-performance demonstration of horizontal windowing. Only the visible fragments
            of the list are kept in the DOM.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
            <Cpu className="size-3 text-blue-500" />
            <span>Optimized DOM Nodes</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[10px] font-black tracking-widest text-slate-500 uppercase shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
            <MousePointer2 className="size-3 text-cyan-500" />
            <span>Smooth Inertia</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
