"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2 } from "lucide-react";

const features = [
  "Next.js 16 + App Router",
  "Auth (Better Auth)",
  "Database + Drizzle ORM",
  "Tailwind CSS + shadcn/ui",
  "Dark mode",
  "Email templates",
  "TypeScript, end to end",
  "Lifetime updates",
];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch(
        "/api/checkout?productId=pdt_0NZl0Nq8pGLuZRS4uqlum"
      );
      const data = await res.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <Badge variant="secondary" className="font-mono text-xs">
            Ship faster
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            SaaS Starter Kit
          </h1>
          <p className="text-sm text-muted-foreground">
            Everything you need to launch your next project. Stop
            rebuilding the same stuff.
          </p>
        </div>

        <div className="rounded-lg border p-6 text-left">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">$50</span>
            <span className="text-sm text-muted-foreground">one-time</span>
          </div>

          <Separator className="my-4" />

          <ul className="space-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-3.5 text-foreground" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            className="mt-6 w-full"
            size="lg"
            disabled={loading}
            onClick={handleCheckout}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Get access"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Secure payment via Dodo Payments. Instant access after purchase.
        </p>
      </div>
    </main>
  );
}
