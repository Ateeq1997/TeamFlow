"use client";

import { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const recommendations = [
  "Shift standups to 10:30 to reduce context switching.",
  "Design reviews on Tuesdays improve deployment velocity by 9%.",
  "Move critical tasks to first 3 hours for better completion rates.",
];

export function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "user" as const,
      text: "How can I improve sprint planning?",
    },
    {
      role: "assistant" as const,
      text: "Try reducing sprint WIP by 15% and grouping tasks by dependency cluster.",
    },
  ]);

  const send = () => {
    const content = prompt.trim();
    if (!content) return;
    const response = `AI insight: prioritize the top 3 blockers, then schedule a 20-minute alignment around \"${content.slice(0, 24)}...\".`;
    setMessages((prev) => [...prev, { role: "user", text: content }, { role: "assistant", text: response }]);
    setPrompt("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <Badge tone="info">AI Recommendations (UI Only)</Badge>
        <CardTitle className="mt-3">Smart Productivity Insights</CardTitle>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {recommendations.map((tip) => (
            <div key={tip} className="rounded-xl border border-sky-100 bg-sky-50/70 p-3 text-sm text-slate-700">
              {tip}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>AI Generated Summary</CardTitle>
        <CardDescription>
          Team momentum is stable. High-priority roadmap items are 84% complete with increased async collaboration.
        </CardDescription>
      </Card>

      <Card>
        <CardTitle>AI Chatbot</CardTitle>
        <CardDescription>Frontend chatbot experience only.</CardDescription>
        <div className="mt-4 space-y-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "assistant"
                  ? "rounded-xl bg-sky-100 p-3 text-sm text-sky-800"
                  : "rounded-xl bg-slate-100 p-3 text-sm text-slate-700"
              }
            >
              {message.text}
            </div>
          ))}
          <Textarea
            placeholder="Ask the AI assistant..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={send}>Send Message</Button>
        </div>
      </Card>
    </div>
  );
}
