import Link from "next/link";
import {
  Triangle,
  Orbit,
  FileCode2,
  Wind,
  Droplets,
  Database,
  ShieldCheck,
  CreditCard,
  Send,
  Component,
  ArrowUpRight,
  Square,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stack: { name: string; desc: string; href: string; icon: LucideIcon }[] = [
  { name: "Next.js", desc: "Framework", href: "https://nextjs.org", icon: Triangle },
  { name: "Motion", desc: "Animation", href: "https://motion.dev", icon: Orbit },
  { name: "TypeScript", desc: "Language", href: "https://typescriptlang.org", icon: FileCode2 },
  { name: "Tailwind", desc: "Styling", href: "https://tailwindcss.com", icon: Wind },
  { name: "Drizzle", desc: "ORM", href: "https://orm.drizzle.team", icon: Droplets },
  { name: "Neon", desc: "Database", href: "https://neon.tech", icon: Database },
  { name: "Better Auth", desc: "Auth", href: "https://better-auth.com", icon: ShieldCheck },
  { name: "Dodo", desc: "Payments", href: "https://dodopayments.com", icon: CreditCard },
  { name: "Resend", desc: "Emails", href: "https://resend.com", icon: Send },
  { name: "shadcn/ui", desc: "Components", href: "https://ui.shadcn.com", icon: Component },
];

const COLS = 5;
const ROWS = 2;

export function TechGrid() {
  return (
    <div className="absolute inset-0 grid grid-cols-5 grid-rows-2">
      {/* horizontal divider */}
      <div className="absolute left-0 right-0 top-1/2 border-t border-border pointer-events-none" />

      {/* vertical dividers */}
      {Array.from({ length: COLS - 1 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 border-l border-border pointer-events-none"
          style={{ left: `${((i + 1) / COLS) * 100}%` }}
        />
      ))}

      {/* squares at intersections */}
      {Array.from({ length: COLS - 1 }).map((_, i) => (
        <Square
          key={`sq-${i}`}
          className="pointer-events-none absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 fill-background stroke-border"
          style={{
            left: `${((i + 1) / COLS) * 100}%`,
            top: "50%",
          }}
        />
      ))}

      {stack.map((tech, i) => (
        <Link
          key={tech.name}
          href={tech.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden"
          style={{
            animation: `tech-fade-in 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms both`,
          }}
        >
          <ArrowUpRight className="absolute top-2.5 right-2.5 size-3 text-muted-foreground opacity-0 translate-y-1 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />

          <tech.icon
            strokeWidth={1.5}
            className="size-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:scale-110"
          />

          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground font-(family-name:--font-geist-pixel-square)">
              {tech.name}
            </span>
            <span className="text-[9px] text-muted-foreground/50 transition-all duration-300 group-hover:text-muted-foreground">
              {tech.desc}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
