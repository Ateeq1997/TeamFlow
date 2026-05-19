"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppStore } from "@/store/use-app-store";
import type { ThemeMode } from "@/types";

export function SettingsPanel() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const authUser = useAppStore((s) => s.authUser);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const emailNotifications = useAppStore((s) => s.emailNotifications);
  const weeklyReports = useAppStore((s) => s.weeklyReports);
  const setPreferences = useAppStore((s) => s.setPreferences);

  const [name, setName] = useState(authUser?.name ?? "");
  const [email, setEmail] = useState(authUser?.email ?? "");

  useEffect(() => {
    setName(authUser?.name ?? "");
    setEmail(authUser?.email ?? "");
  }, [authUser]);

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Keep your personal details updated.</CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-3">
          <Button
            onClick={() => {
              updateProfile({ name, email, avatar: (name.slice(0, 2) || "US").toUpperCase() });
              toast.success("Profile updated");
            }}
          >
            Save Profile
          </Button>
        </div>
      </Card>

      <Card>
        <CardTitle>Theme Customization</CardTitle>
        <CardDescription>Switch visual mode and app color profile.</CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Select
            value={theme}
            onChange={(value) => setTheme(value as ThemeMode)}
            options={["light", "dark", "sunset"]}
          />
          <Button variant="secondary" onClick={() => toast.success("Theme preferences saved")}>
            Save Preferences
          </Button>
        </div>
      </Card>

      <Card>
        <CardTitle>Account Preferences</CardTitle>
        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-700">
          <label className="flex items-center justify-between rounded-xl bg-slate-100/70 p-3">
            Email notifications
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => setPreferences({ emailNotifications: checked })}
            />
          </label>
          <label className="flex items-center justify-between rounded-xl bg-slate-100/70 p-3">
            Weekly reports
            <Switch
              checked={weeklyReports}
              onCheckedChange={(checked) => setPreferences({ weeklyReports: checked })}
            />
          </label>
        </div>
      </Card>
    </div>
  );
}
