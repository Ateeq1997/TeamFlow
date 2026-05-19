"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { useAppStore } from "@/store/use-app-store";
import { formatDistanceToNow } from "date-fns";

const productivityData = [
  { day: "Mon", focus: 62, output: 45 },
  { day: "Tue", focus: 70, output: 58 },
  { day: "Wed", focus: 66, output: 61 },
  { day: "Thu", focus: 79, output: 69 },
  { day: "Fri", focus: 82, output: 73 },
  { day: "Sat", focus: 65, output: 57 },
  { day: "Sun", focus: 72, output: 64 },
];

const activityData = [
  { week: "W1", value: 34 },
  { week: "W2", value: 48 },
  { week: "W3", value: 42 },
  { week: "W4", value: 63 },
  { week: "W5", value: 71 },
  { week: "W6", value: 68 },
];

export function DashboardOverview() {
  const metrics = useDashboardMetrics();
  const projects = useAppStore((s) => s.projects);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Team Members", value: metrics.teamSize, tone: "info" as const },
          { label: "Active Projects", value: metrics.activeProjects, tone: "success" as const },
          { label: "Task Completion", value: `${metrics.completion}%`, tone: "warning" as const },
          { label: "Productivity", value: `${metrics.avgProductivity}%`, tone: "neutral" as const },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="bg-gradient-to-br from-white/75 to-white/40">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="mt-2 text-3xl">{item.value}</CardTitle>
              <Badge className="mt-3" tone={item.tone}>
                Live metric
              </Badge>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Productivity Curve</CardTitle>
          <CardDescription>Focus and output signals over the week.</CardDescription>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="focus" stroke="#0ea5e9" fill="url(#focusGrad)" />
                <Line type="monotone" dataKey="output" stroke="#6366f1" strokeWidth={3} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardTitle>Team Activity Graph</CardTitle>
          <CardDescription>Weekly collaboration pulse across squads.</CardDescription>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Recent Activity Timeline</CardTitle>
          <div className="mt-4 space-y-4">
            {metrics.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.actor}</p>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                  <p className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Task Completion Stats</CardTitle>
          <div className="mt-4 space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{project.name}</span>
                  <span className="text-slate-500">{project.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
