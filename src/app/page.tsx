import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--app-shell-bg)" }}>
      <header className="sticky top-0 z-30 border-b border-white/35 bg-[var(--surface-soft)] backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <p className="text-lg font-bold text-[var(--foreground)]">TeamFlow</p>
          <div className="hidden gap-8 text-sm text-[var(--muted)] md:flex">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="secondary" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Launch App</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:py-16">
        <section className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
              Modern Team Management SaaS
            </p>
            <h1 className="font-mono text-4xl font-bold leading-tight text-[var(--foreground)] md:text-6xl">
              Manage teams, projects, and momentum in one premium workspace.
            </h1>
            <p className="mt-4 max-w-xl text-[var(--muted)]">
              TeamFlow combines analytics, collaboration, AI insights, and smart scheduling into a
              fast, elegant experience built for modern product teams.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <Card className="bg-gradient-to-br from-sky-500/90 to-indigo-500/90 text-white">
            <CardTitle className="text-white">Live Workspace Pulse</CardTitle>
            <CardDescription className="text-white/80">Animated statistics and outcomes</CardDescription>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Active teams", "28"],
                ["Tasks completed", "1,482"],
                ["Average velocity", "+18%"],
                ["Meeting efficiency", "92%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white/15 p-3 backdrop-blur">
                  <p className="text-xs text-white/80">{label}</p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section id="features" className="grid gap-4 md:grid-cols-3">
          {["Smart Dashboard", "Team Operations", "AI Productivity"].map((title) => (
            <Card key={title}>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="mt-2">
                Glassmorphism surfaces, clear analytics, and responsive interactions for every role.
              </CardDescription>
            </Card>
          ))}
        </section>

        <section id="pricing" className="grid gap-4 md:grid-cols-3">
          {[
            ["Starter", "$19", ["Up to 5 members", "Basic analytics", "Email support"]],
            ["Growth", "$49", ["Up to 25 members", "Advanced dashboard", "AI insights"]],
            ["Scale", "$99", ["Unlimited seats", "Priority support", "Custom themes"]],
          ].map(([plan, price, perks]) => (
            <Card key={String(plan)} className="flex flex-col">
              <CardTitle>{plan}</CardTitle>
              <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">{price}</p>
              <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {(perks as string[]).map((perk) => (
                  <p key={perk} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {perk}
                  </p>
                ))}
              </div>
              <Link href={`/signup?plan=${encodeURIComponent(String(plan).toLowerCase())}`} className="mt-6">
                <Button className="w-full">Choose plan</Button>
              </Link>
            </Card>
          ))}
        </section>

        <section id="testimonials" className="grid gap-4 md:grid-cols-2">
          {["TeamFlow doubled our release confidence.", "Our PMs now run operations from one view."].map(
            (quote) => (
              <Card key={quote}>
                <p className="text-lg font-medium text-[var(--foreground)]">“{quote}”</p>
                <p className="mt-2 text-sm text-[var(--muted)]">Product leaders at high-growth startups</p>
              </Card>
            ),
          )}
        </section>

        <section id="faq" className="grid gap-4 md:grid-cols-2">
          {[
            ["Is this connected to real APIs?", "This build uses local persisted mock data for UI demos."],
            ["Can I customize themes?", "Yes, light, dark, and sunset modes are included."],
            ["Is mobile responsive?", "Layouts adapt across desktop, tablet, and mobile."],
            ["Does it support team CRUD?", "You can add, edit status, filter, sort, and delete members."],
          ].map(([q, a]) => (
            <Card key={String(q)}>
              <CardTitle>{q}</CardTitle>
              <CardDescription className="mt-2">{a}</CardDescription>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
