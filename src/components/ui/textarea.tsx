import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 py-2 text-sm text-foreground outline-none placeholder:text-[color:var(--muted)] focus:border-sky-500 focus:ring-2 focus:ring-sky-200",
        className,
      )}
      {...props}
    />
  );
}
