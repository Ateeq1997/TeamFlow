"use client";

import { useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";

export function useDashboardMetrics() {
  const members = useAppStore((s) => s.members);
  const projects = useAppStore((s) => s.projects);
  const activities = useAppStore((s) => s.activities);

  return useMemo(() => {
    const avgProductivity =
      members.length > 0
        ? Math.round(members.reduce((acc, m) => acc + m.productivity, 0) / members.length)
        : 0;
    const completion =
      projects.length > 0
        ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
        : 0;

    return {
      teamSize: members.length,
      activeProjects: projects.filter((p) => p.status !== "Completed").length,
      completion,
      avgProductivity,
      recentActivities: activities.slice(0, 6),
    };
  }, [activities, members, projects]);
}
