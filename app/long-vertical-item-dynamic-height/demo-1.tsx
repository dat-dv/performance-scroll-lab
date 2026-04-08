import VirtualScrollDynamicHeight from "@/libs/virtual-scroll/virtual-scroll-with-dynamic-item-height";
import { Terminal, Activity } from "lucide-react";
import React, { useState } from "react";

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
}

const generateMockLogs = (count: number, startId: number = 0): LogEntry[] =>
  Array.from({ length: count }, (_, i) => {
    const sentenceCount = 1 + Math.floor(Math.random() * 8);
    const message = Array.from(
      { length: sentenceCount },
      () =>
        "This is a log message that has dynamic height because the content length varies randomly."
    ).join(" ");

    return {
      id: startId + i,
      timestamp: new Date().toISOString(),
      message: `${message} [Ref ID: ${Math.random().toString(36).substring(7)}]`,
    };
  });

const Demo = () => {
  const [items, setItems] = useState<LogEntry[]>(() => generateMockLogs(50));

  const hasNext = items.length < 300;

  const handleLoadMore = () => {
    setItems((prev) => [...prev, ...generateMockLogs(20, prev.length)]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/5 dark:bg-white/5">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <Terminal className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">System Activity Logs</h3>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {items.length.toLocaleString()} dynamic height entries rendered in O(logn)
              </p>
              {!hasNext && (
                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-400">
                  <div className="size-1 rounded-full bg-slate-400" />
                  All caught up
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-600 uppercase dark:bg-emerald-500/10 dark:text-emerald-400">
          <Activity className={`size-3 ${hasNext ? "animate-pulse" : ""}`} />
          {hasNext ? "Real-time Measuring" : "Historical Data"}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 shadow-2xl dark:border-white/10">
        <VirtualScrollDynamicHeight<LogEntry>
          items={items}
          overscan={10}
          className="scrollbar-hide"
          onEndReached={handleLoadMore}
          hasNext={hasNext}
        >
          {({ item }) => (
            <div className="px-4 py-2">
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-slate-500 tabular-nums">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{item.message}</p>
                </div>
              </div>
            </div>
          )}
        </VirtualScrollDynamicHeight>
        {hasNext && (
          <div className="py-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                Scroll to load more
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
