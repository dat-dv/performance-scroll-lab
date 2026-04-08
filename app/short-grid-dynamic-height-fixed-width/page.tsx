"use client";

import React from "react";
import { Case1 } from "./cases/Case1";
import { Case2 } from "./cases/Case2";
import { Case3 } from "./cases/Case3";
import { Case4 } from "./cases/Case4";
import ShowcaseLayout from "@/components/show-case-layout";
import { LayoutList, Maximize, Columns, Grid } from "lucide-react";

/**
 * Case 3.3 Hub - Product Grids with Dynamic Heights.
 * Organized with nested ShowcaseLayouts: Scenarios at top-level, Docs/Demo at sub-level.
 */
export default function DynamicHeightPage() {
  const tabs = [
    {
      label: "Standard Grid",
      value: "standard",
      icon: <LayoutList className="size-4" />,
      children: <Case1 />,
    },
    {
      label: "Wide Grid",
      value: "wide",
      icon: <Maximize className="size-4" />,
      children: <Case2 />,
    },
    {
      label: "Non-Uniform Height",
      value: "non-uniform",
      icon: <Columns className="size-4" />,
      children: <Case3 />,
    },
    {
      label: "Masonry Layout",
      value: "masonry",
      icon: <Grid className="size-4" />,
      children: <Case4 />,
    },
  ];

  return <ShowcaseLayout tabs={tabs} />;
}
