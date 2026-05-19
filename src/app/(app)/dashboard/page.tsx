"use client";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { Skeleton } from "@/components/ui/skeleton";
import { useFakeLoading } from "@/hooks/use-fake-loading";

export default function DashboardPage() {
  const loading = useFakeLoading();

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    );
  }

  return <DashboardOverview />;
}
