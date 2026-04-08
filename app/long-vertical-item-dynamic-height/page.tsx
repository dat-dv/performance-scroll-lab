import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle, Terminal, Activity } from "lucide-react";
import { Docs } from "./docs";

interface LogEntry {
  id: number;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

const LOG_LEVELS = ["INFO", "WARN", "ERROR"] as const;
const MOCK_LOGS: LogEntry[] = Array.from({ length: 10000 }, (_, i) => {
  const sentenceCount = 1 + Math.floor(Math.random() * 8);
  const message = Array.from(
    { length: sentenceCount },
    () =>
      "This is a log message that has dynamic height because the content length varies randomly."
  ).join(" ");

  return {
    id: i,
    timestamp: new Date().toISOString(),
    level: LOG_LEVELS[i % 3],
    message: `${message} [Ref ID: ${Math.random().toString(36).substring(7)}]`,
  };
});

/**
 * Case 5: Huge Dataset / Vertical / Dynamic Height
 * Demonstrates advanced virtualization where items have varying heights.
 */
export default function DynamicHeightPage() {
  const tabs = [
    {
      label: "Technical Docs",
      value: "docs",
      icon: <BookOpen className="size-4" />,
      children: <Docs />,
    },
    {
      label: "Live Demo",
      value: "demo",
      icon: <PlayCircle className="size-4" />,
      children: (
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/5 dark:bg-white/5">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Terminal className="size-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">System Activity Logs</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {MOCK_LOGS.length.toLocaleString()} dynamic height entries rendered in O(logn)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-600 uppercase dark:bg-emerald-500/10 dark:text-emerald-400">
              <Activity className="size-3" />
              Real-time Measuring
            </div>
          </div>

          <div className="h-[650px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-2 shadow-2xl dark:border-white/10"></div>
        </div>
      ),
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
