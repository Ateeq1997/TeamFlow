import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg hover:opacity-90",
        secondary: "bg-[var(--surface-soft)] text-[var(--foreground)] backdrop-blur-md hover:opacity-90",
        ghost: "text-[var(--foreground)] hover:bg-[var(--surface-soft)]",
        outline: "border border-[var(--field-border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-soft)]",
        danger: "bg-rose-500 text-white hover:bg-rose-600",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
