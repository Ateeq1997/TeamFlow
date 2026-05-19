"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OtpVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = useMemo(() => searchParams.get("email") || "demo@teamflow.dev", [searchParams]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    try {
      setLoading(true);
      const code = otp.join("");
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }

      toast.success("OTP verified. Please login.");
      router.push("/login");
    } catch {
      toast.error("Could not verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardTitle>OTP Verification</CardTitle>
      <CardDescription>Enter the 6-digit code sent to your email.</CardDescription>
      <p className="mt-2 text-xs text-slate-500">Verifying for: {email}</p>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Input
            key={i}
            maxLength={1}
            className="text-center"
            value={otp[i]}
            onChange={(e) => {
              const value = e.target.value.slice(-1);
              setOtp((prev) => prev.map((item, idx) => (idx === i ? value : item)));
            }}
          />
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={() => void verify()} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </Card>
  );
}
