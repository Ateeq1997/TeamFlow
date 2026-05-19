import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-[var(--field-border)] bg-[var(--field-bg)] px-3 text-sm text-foreground outline-none ring-0 placeholder:text-[color:var(--muted)] focus:border-sky-500 focus:ring-2 focus:ring-sky-200",
        className,
      )}
      {...props}
    />
  );
}
