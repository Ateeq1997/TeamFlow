"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
      <h2 className="text-lg font-semibold">Something went wrong while loading dashboard.</h2>
      <Button className="mt-4" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
