import * as React from "react";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-sky-100 text-sky-700",
  danger: "bg-rose-100 text-rose-700",
  neutral: "bg-slate-100 text-slate-700",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof toneMap }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneMap[tone],
        className,
      )}
      {...props}
    />
  );
}
