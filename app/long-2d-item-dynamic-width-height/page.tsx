"use client";

import React from "react";
import { Docs } from "./docs";
import { ComingSoon } from "@/components/coming-soon";
import ShowcaseLayout from "@/components/show-case-layout";
import { BookOpen, PlayCircle } from "lucide-react";

export default function Case10() {
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
      children: <ComingSoon title="Long 2d Item Dynamic Width Height" />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
