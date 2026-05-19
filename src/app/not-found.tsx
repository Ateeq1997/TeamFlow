import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Link href="/">
          <Button className="mt-6">Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
