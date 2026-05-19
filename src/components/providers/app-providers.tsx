"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { useAppStore } from "@/store/use-app-store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
  }, [theme]);

  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}
