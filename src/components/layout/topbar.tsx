"use client";

import { Menu, Moon, Sun, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const logout = useAppStore((s) => s.logout);
  const unread = useAppStore((s) => s.notifications.filter((n) => !n.read).length);
  const router = useRouter();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    toast.success(`${next[0].toUpperCase()}${next.slice(1)} mode enabled`);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/30 bg-[var(--surface-soft)] px-4 backdrop-blur-2xl md:px-6">
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={onMenu}>
          <Menu className="h-5 w-5 text-[var(--foreground)]" />
        </button>
        <div>
          <p className="text-sm text-[var(--muted)]">Monday, May 19</p>
          <h1 className="text-lg font-semibold text-[var(--foreground)]">Team Management Suite</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light" : "Dark"}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => router.push("/notifications")}>
          <Bell className="h-4 w-4" />
          {unread}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logout();
            toast.success("Logged out");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
