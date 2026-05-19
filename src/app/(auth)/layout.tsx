export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen p-4" style={{ background: "var(--app-shell-bg)" }}>
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">{children}</div>
    </main>
  );
}
