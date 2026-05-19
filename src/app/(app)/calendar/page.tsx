"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

export default function CalendarPage() {
  const meetings = useAppStore((s) => s.meetings);
  const addMeeting = useAppStore((s) => s.addMeeting);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-05-26");
  const [time, setTime] = useState("11:00");

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>Meeting Scheduler UI</CardTitle>
        <CardDescription>Calendar integration style interface.</CardDescription>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Input placeholder="Meeting title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Button
            onClick={() => {
              if (!title.trim()) {
                toast.error("Meeting title is required");
                return;
              }
              addMeeting({ title, date, time, attendees: [] });
              toast.success("Meeting scheduled");
              setTitle("");
            }}
          >
            Schedule
          </Button>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardTitle>{meeting.title}</CardTitle>
            <CardDescription>
              {meeting.date} at {meeting.time}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
