# TeamFlow SaaS

Modern full-stack style Team Management SaaS UI built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style reusable components, Framer Motion, Recharts, and Zustand with localStorage persistence.

## Stack

- Next.js
- TypeScript
- Tailwind CSS v4
- Zustand (persist middleware)
- Framer Motion
- Recharts
- Sonner
- Lucide icons

## Features

- Authentication UI: Login, signup, forgot password, OTP verification, social buttons
- Dashboard: Animated analytics cards, productivity chart, activity graph, task progress, timeline
- Team Management: Add/edit status/delete members, role filters, search and sort
- Project Management: Create project, progress bars, Kanban columns, deadline and priority labels
- AI Assistant section: recommendations UI, summary UI, chatbot UI
- Notifications: toast messages and notification center UI
- Settings: profile, preferences, and theme customization (light/dark/sunset)
- Premium landing page: sticky navbar, hero, pricing, testimonials, FAQ, statistics
- Additional UIs: export reports, activity logs, calendar scheduler, file upload, responsive sidebar

## Project Structure

```text
src/
  app/
    (auth)/
    (app)/
  components/
    ui/
    layout/
    dashboard/
    team/
    projects/
    assistant/
    notifications/
    settings/
  store/
  hooks/
  data/
  types/
  lib/
```

## Run

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Data and Persistence

- Seed JSON: src/data/mock-data.json
- Local persistence key: teamflow-saas-store
- No external backend required for this UI-focused demo
