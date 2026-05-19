"use client";

import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/use-app-store";

export function NotificationCenter() {
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationRead);
  const addNotification = useAppStore((s) => s.addNotification);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <CardTitle>Real-time Style Notifications</CardTitle>
          <Button
            onClick={() => {
              addNotification({
                title: "Deployment Update",
                message: "A new deployment has been queued.",
                type: "info",
              });
              toast.success("New notification pushed");
            }}
          >
            Simulate Event
          </Button>
        </div>
      </Card>

      {notifications.map((item) => (
        <Card key={item.id} className={item.read ? "opacity-70" : ""}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h4 className="font-semibold text-slate-800">{item.title}</h4>
                <Badge tone={item.type === "success" ? "success" : item.type === "warning" ? "warning" : "info"}>
                  {item.type}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">{item.message}</p>
              <p className="mt-2 text-xs text-slate-400">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </p>
            </div>
            {!item.read && (
              <Button size="sm" variant="outline" onClick={() => markRead(item.id)}>
                Mark read
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
