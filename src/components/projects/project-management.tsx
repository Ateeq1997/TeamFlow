"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { useAppStore } from "@/store/use-app-store";
import type { Priority, ProjectStatus } from "@/types";

const statusCols: Array<{ title: "Todo" | "In Progress" | "Done" }> = [
  { title: "Todo" },
  { title: "In Progress" },
  { title: "Done" },
];

export function ProjectManagement() {
  const projects = useAppStore((s) => s.projects);
  const members = useAppStore((s) => s.members);
  const addProject = useAppStore((s) => s.addProject);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [deadline, setDeadline] = useState("2026-06-15");

  const allTasks = useMemo(() => projects.flatMap((p) => p.tasks), [projects]);

  const createProject = () => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    addProject({
      name,
      description,
      status: "Planning" as ProjectStatus,
      deadline,
      progress: 0,
      priority,
      memberIds: members.slice(0, 2).map((m) => m.id),
      tasks: [
        {
          id: `task-${Date.now()}`,
          title: "Kickoff and scope planning",
          assigneeId: members[0]?.id || "",
          status: "Todo",
          priority,
          dueDate: deadline,
        },
      ],
    });

    toast.success("Project created");
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Assign members, deadlines, and priorities quickly.</CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Input placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <Select
            value={priority}
            onChange={(value) => setPriority(value as Priority)}
            options={["Low", "Medium", "High", "Critical"]}
          />
          <Button onClick={createProject}>Create</Button>
        </div>
        <div className="mt-3">
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Project Progress</CardTitle>
          <div className="mt-4 space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{project.name}</p>
                    <p className="text-xs text-slate-500">Deadline: {project.deadline}</p>
                  </div>
                  <Badge tone={project.priority === "Critical" ? "danger" : "info"}>{project.priority}</Badge>
                </div>
                <Progress value={project.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Kanban Board</CardTitle>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {statusCols.map((col) => (
              <div key={col.title} className="rounded-xl bg-slate-100/80 p-3">
                <p className="mb-2 text-sm font-semibold text-slate-700">{col.title}</p>
                <div className="space-y-2">
                  {allTasks
                    .filter((task) => task.status === col.title)
                    .map((task) => (
                      <div key={task.id} className="rounded-lg bg-white p-2 text-xs shadow">
                        <p className="font-medium text-slate-700">{task.title}</p>
                        <p className="text-slate-500">Due {task.dueDate}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
