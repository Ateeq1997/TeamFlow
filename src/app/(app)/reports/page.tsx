"use client";

import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

export default function ReportsPage() {
  const activities = useAppStore((s) => s.activities);
  const [fileName, setFileName] = useState<string>("");

  const download = (name: string, contents: string, type: string) => {
    const blob = new Blob([contents], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const rows = ["actor,action,category,createdAt", ...activities.map((item) => `${item.actor},${item.action},${item.category},${item.createdAt}`)];
    download("teamflow-report.csv", rows.join("\n"), "text/csv;charset=utf-8");
    toast.success("CSV report exported");
  };

  const exportPdf = () => {
    const lines = ["TeamFlow Activity Report", "", ...activities.map((item) => `- ${item.actor}: ${item.action} (${item.category})`)];
    download("teamflow-report.txt", lines.join("\n"), "text/plain;charset=utf-8");
    toast.success("Report exported");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Export Reports UI</CardTitle>
        <CardDescription>Download performance and activity snapshots.</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={exportCsv}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="secondary" onClick={exportPdf}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </Card>

      <Card>
        <CardTitle>File Upload UI</CardTitle>
        <CardDescription>Drag and drop style placeholder uploader.</CardDescription>
        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
          <Upload className="mb-2 h-5 w-5" />
          Choose file
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0]?.name || "";
              setFileName(selected);
              if (selected) toast.success("File selected");
            }}
          />
        </label>
        {fileName && <p className="mt-2 text-sm text-slate-600">Selected: {fileName}</p>}
      </Card>

      <Card>
        <CardTitle>Activity Logs</CardTitle>
        <div className="mt-4 space-y-2">
          {activities.map((item) => (
            <div key={item.id} className="rounded-lg bg-slate-100/70 p-3 text-sm text-slate-700">
              <span className="font-medium">{item.actor}</span> {item.action}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
