"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useHydrated } from "@/hooks/use-hydrated";
import { useAppStore } from "@/store/use-app-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const authUser = useAppStore((s) => s.authUser);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !authUser) {
      router.replace("/login");
    }
  }, [authUser, hydrated, router]);

  if (!hydrated || !authUser) {
    return <div className="grid min-h-screen place-items-center text-[var(--muted)]">Loading workspace...</div>;
  }

  return (
    <div className="relative min-h-screen" style={{ background: "var(--app-shell-bg)" }}>
      <div className="flex min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onMenu={() => setOpen(true)} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
