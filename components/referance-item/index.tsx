import { ExternalLink } from "lucide-react";

function ReferenceItem({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-xl dark:border-white/5 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </span>
        <ExternalLink className="size-4 text-slate-400 transition-colors group-hover:text-blue-500" />
      </div>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </a>
  );
}

export default ReferenceItem;
