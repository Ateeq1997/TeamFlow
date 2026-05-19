"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { useAppStore } from "@/store/use-app-store";
import type { Role, TeamMember } from "@/types";

const roleOptions: Role[] = ["Admin", "Manager", "Developer", "Designer"];

export function TeamManagement() {
  const members = useAppStore((s) => s.members);
  const addMember = useAppStore((s) => s.addMember);
  const updateMember = useAppStore((s) => s.updateMember);
  const deleteMember = useAppStore((s) => s.deleteMember);
  const addActivity = useAppStore((s) => s.addActivity);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [form, setForm] = useState<Omit<TeamMember, "id">>({
    name: "",
    email: "",
    role: "Developer",
    status: "online",
    avatar: "NA",
    productivity: 70,
  });

  const filtered = useMemo(() => {
    return [...members]
      .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
      .filter((m) => (roleFilter === "All" ? true : m.role === roleFilter))
      .sort((a, b) => {
        if (sortBy === "productivity") return b.productivity - a.productivity;
        return a.name.localeCompare(b.name);
      });
  }, [members, query, roleFilter, sortBy]);

  const submit = () => {
    if (!form.name || !form.email) {
      toast.error("Please fill name and email");
      return;
    }
    addMember({ ...form, avatar: form.name.slice(0, 2).toUpperCase() });
    addActivity({ action: "Added new team member", actor: "You", category: "team" });
    toast.success("Member added");
    setForm({ ...form, name: "", email: "" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Add Team Member</CardTitle>
        <CardDescription>Manage member roles and statuses from one place.</CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
          <Select
            value={form.role}
            onChange={(value) => setForm((p) => ({ ...p, role: value as Role }))}
            options={roleOptions}
          />
          <Input
            type="number"
            value={form.productivity}
            onChange={(e) => setForm((p) => ({ ...p, productivity: Number(e.target.value) || 0 }))}
          />
          <Button onClick={submit}>Add Member</Button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-3 md:flex-row">
          <Input placeholder="Search member" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            options={["All", "Admin", "Manager", "Developer", "Designer"]}
          />
          <Select value={sortBy} onChange={setSortBy} options={["name", "productivity"]} />
        </div>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <Card key={member.id} className="bg-gradient-to-b from-white/90 to-white/55">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 font-bold text-sky-700">
                  {member.avatar}
                </div>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.email}</CardDescription>
                </div>
              </div>
              <Badge tone={member.status === "online" ? "success" : member.status === "away" ? "warning" : "neutral"}>
                {member.status}
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <Select
                value={member.role}
                onChange={(value) => {
                  updateMember(member.id, { role: value as Role });
                  toast.success("Role updated");
                }}
                options={roleOptions}
                className="h-8"
              />
              <span>{member.productivity}% productivity</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  updateMember(member.id, {
                    status: member.status === "online" ? "away" : "online",
                  });
                  toast.success("Member updated");
                }}
              >
                Toggle Status
              </Button>
              <Button size="sm" variant="danger" onClick={() => deleteMember(member.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </section>

      {filtered.length === 0 && (
        <Card>
          <CardTitle>Empty state</CardTitle>
          <CardDescription>No team members match your filters.</CardDescription>
        </Card>
      )}
    </div>
  );
}
