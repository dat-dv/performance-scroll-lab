import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export function RenderItem({
  index,
  item,
}: {
  index: number;
  item: {
    id: number;
    title: string;
    category: string;
    color: string;
  };
}) {
  return (
    <div className="group relative flex size-full items-center justify-center p-4">
      {/* 🔮 Background Glow Effect */}
      <div
        className={`absolute inset-0 mx-auto aspect-square w-3/4 bg-gradient-to-br opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40 ${item.color}`}
      />

      {/* 🃏 Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index % 10) * 0.05, duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -12, scale: 1.02 }}
        className="relative flex h-80 w-full max-w-sm flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/70 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-shadow hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.15)] dark:border-white/10 dark:bg-slate-900/40"
      >
        {/* 🎨 Top Gradient Strip */}
        <div className={`h-2.5 w-full bg-gradient-to-r ${item.color}`} />

        <div className="flex flex-1 flex-col p-8">
          {/* 🏷️ Badge & Counter */}
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase dark:bg-white dark:text-slate-900">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </div>
          </div>

          {/* 📝 Content */}
          <div className="space-y-4">
            <h3 className="text-3xl leading-tight font-black tracking-tight text-slate-900 dark:text-white">
              {item.title}
            </h3>
            <p className="line-clamp-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              Explore this high-performance project module. Optimized with advanced windowing
              virtualization strategies for seamless horizontal flow.
            </p>
          </div>

          {/* 🔗 Footer / Action */}
          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6 dark:border-white/5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-white bg-slate-200 ring-2 ring-transparent transition-transform hover:z-10 hover:scale-110 dark:border-slate-900 dark:bg-slate-800"
                />
              ))}
            </div>

            <button className="flex size-10 items-center justify-center rounded-2xl bg-slate-900 text-white transition-all hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-400">
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* 🪄 Glossy highlight overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 dark:from-white/0 dark:via-white/5 dark:to-white/10" />
      </motion.div>
    </div>
  );
}
