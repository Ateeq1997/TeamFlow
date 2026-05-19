"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

export default function LoginPage() {
  const setSession = useAppStore((s) => s.setSession);
  const addActivity = useAppStore((s) => s.addActivity);
  const router = useRouter();
  const [email, setEmail] = useState("demo@teamflow.dev");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const submit = async (provider?: "google" | "github") => {
    try {
      setLoading(true);
      const payload = {
        email: provider ? "demo@teamflow.dev" : email,
        password: provider ? "demo123" : password,
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      setSession(data.user, data.token);
      addActivity({ action: "Logged into workspace", actor: data.user.name, category: "auth" });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch {
      toast.error("Could not connect to auth service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardTitle>Welcome back</CardTitle>
      <CardDescription>Login to continue managing your team.</CardDescription>
      <div className="mt-4 space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={() => void submit()} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => void submit("google")} disabled={loading}>
            Google
          </Button>
          <Button variant="secondary" onClick={() => void submit("github")} disabled={loading}>
            GitHub
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-slate-600">
        <Link href="/forgot-password">Forgot password</Link>
        <Link href="/signup">Create account</Link>
      </div>
    </Card>
  );
}
