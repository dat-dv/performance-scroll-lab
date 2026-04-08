"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
};

export function CodeBlock({ code, language = "tsx", title = "Code" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-100 px-4 py-2 dark:bg-white/5">
        <span className="text-xs font-medium text-slate-500">{title}</span>

        <button
          onClick={handleCopy}
          className="rounded bg-slate-800 px-2 py-1 text-[10px] text-white transition hover:opacity-80"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        style={dracula}
        language={language}
        customStyle={{
          margin: 0,
          padding: 16,
          fontSize: 12,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
