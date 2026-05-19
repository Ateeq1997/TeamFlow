"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@teamflow.dev");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to send OTP");
        return;
      }

      toast.success(`OTP sent. Demo code: ${data.otp}`);
      router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
    } catch {
      toast.error("Could not connect to auth service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardTitle>Forgot password</CardTitle>
      <CardDescription>We will send an OTP to your email.</CardDescription>
      <div className="mt-4 space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button className="w-full" onClick={() => void sendOtp()} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        <Link href="/otp-verification">Go to OTP verification</Link>
      </p>
    </Card>
  );
}
