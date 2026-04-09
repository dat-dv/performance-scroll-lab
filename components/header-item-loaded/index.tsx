import { cn } from "@/libs/cn";
import { Sparkles, Loader2 } from "lucide-react";
import React from "react";

const HeaderItemLoaded = ({
  length,
  title,
  description,
  isLoading = false,
  className,
  ...props
}: {
  length: number;
  title: string;
  description: string;
  isLoading?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center justify-between", className)} {...props}>
      <div className="space-y-1">
        <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">{title}</h3>
        <p className="text-xs text-slate-500 italic">{description}</p>
      </div>
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
          isLoading ? "bg-amber-500/10 text-amber-600" : "bg-blue-500/10 text-blue-600"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-3 animate-spin" />
            Syncing Datastore...
          </>
        ) : (
          <>
            <Sparkles className="size-3" />
            {length} Items Loaded
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderItemLoaded;
