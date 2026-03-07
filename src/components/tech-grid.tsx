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

export function TechGrid() {
  return (
    <div className="grid grid-cols-5 border-b border-border">
      {stack.map((tech, i) => (
        <Link
          key={tech.name}
          href={tech.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-24 flex-col items-center justify-center gap-2 overflow-hidden border-l border-t border-border px-2 py-4 text-center sm:min-h-28 sm:px-3 sm:py-5 sm:gap-2.5 lg:min-h-36 lg:gap-3"
          style={{
            animation: `tech-fade-in 0.5s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 70}ms both`,
          }}
        >
          <ArrowUpRight className="absolute top-2.5 right-2.5 size-3 text-muted-foreground opacity-0 transition-all duration-300 lg:translate-y-1 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:translate-x-0" />

          <tech.icon
            strokeWidth={1.5}
            className="size-[18px] text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:scale-110 sm:size-5 lg:size-[18px]"
          />

          <div className="flex flex-col items-center gap-0.5">
            <span className="font-pixel-square text-[8px] tracking-[0.18em] uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground sm:text-[9px] lg:text-[10px]">
              {tech.name}
            </span>
            <span className="text-[8px] leading-tight text-muted-foreground/50 transition-all duration-300 group-hover:text-muted-foreground sm:text-[9px]">
              {tech.desc}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
