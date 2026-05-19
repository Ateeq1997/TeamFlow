"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created. Verify OTP next.");
      router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
    } catch {
      toast.error("Could not connect to auth service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardTitle>Create account</CardTitle>
      <CardDescription>Start your premium team workspace.</CardDescription>
      <div className="mt-4 space-y-3">
        <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={() => void signup()} disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </Card>
  );
}
