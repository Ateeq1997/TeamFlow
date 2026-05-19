"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  CalendarDays,
  ChartColumn,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  Bell,
  Files,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/team", label: "Team", icon: Users },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/reports", label: "Reports", icon: ChartColumn },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const content = (
    <div className="h-full w-72 border-r border-white/30 bg-[var(--surface-soft)] p-4 text-[var(--foreground)] backdrop-blur-2xl">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span className="rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 p-2 text-white">
            <Files className="h-4 w-4" />
          </span>
          TeamFlow
        </Link>
        <button className="md:hidden" onClick={onClose}>
          <X className="h-5 w-5 text-[var(--muted)]" />
        </button>
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                  : "text-[var(--muted)] hover:bg-[var(--surface-strong)]",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 240, damping: 25 }}
              className="h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
