"use client";

import { TechGrid } from "@/components/tech-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  GithubIcon,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import ModeToggle from "@/components/mode-toggle/mode-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import { useSession } from "@/lib/auth-client";
import { motion } from "motion/react";
import Link from "next/link";

const RUNG_COUNT = 10;

const Ladder = ({ side }: { side: "left" | "right" }) => (
  <div
    className="absolute top-0 bottom-0 flex flex-col"
    style={
      side === "left"
        ? {
            right: "calc(100% + (100vw - 100%) / 4 - 5.5rem)",
            left: "calc(-1 * (100vw - 100%) / 2)",
          }
        : {
            left: "calc(100% + (100vw - 100%) / 4 - 5.5rem)",
            right: "calc(-1 * (100vw - 100%) / 2)",
          }
    }
  >
    {Array.from({ length: RUNG_COUNT }).map((_, i) => (
      <div
        key={i}
        className={`relative ${side === "left" ? "border-r" : "border-l"} border-border w-full flex-1 ${i !== RUNG_COUNT - 1 ? "border-b-2" : ""}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "7px 7px",
          backgroundAttachment: "fixed",
          color: "oklch(from var(--foreground) l c h / 0.08)",
        }}
      />
    ))}
  </div>
);

function HeroButton() {
  return (
    <div className="relative w-fit group">
      <Button
        asChild
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
      >
        <a href="https://github.com/sachigoyal/akira" target="_blank" rel="noopener noreferrer">
          <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          <GithubIcon className="size-4" />
          Github
          <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
        </a>
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroButton2() {
  const { data: session } = useSession();

  return (
    <div className="relative w-fit group">
      <Button
        asChild
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1"
      >
        <Link href={session ? "/docs" : "/signin"}>
          <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          Get Akira
          <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
        </Link>
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroBadge() {
  return (
    <Badge
      variant="outline"
      className="mx-auto border border-foreground/40 transition-all duration-300 delay-100 flex items-center gap-2 bg-muted-foreground/10 dark:bg-muted-foreground/20 text-foreground cursor-pointer group [&>svg]:size-0 relative overflow-hidden"
    >
      <span className="shine absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full" />
      <p className="font-light">
        The only starter kit you need to build your next saas
      </p>
    </Badge>
  );
}

{
  /* ── Card 1: Auth ─────────────────────────────────────────── */
}
function MicroHeroOne() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[380px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      {/* shine sweep */}
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* content area */}
      <div className="absolute top-0 bottom-0 left-0 right-[140px] flex flex-col justify-between p-5">
        <div>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Authentication
          </span>
          <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
            Secure by
            <br />
            default.
          </h2>
          <p className="text-muted-foreground text-[9px] leading-relaxed mt-2 max-w-[200px]">
            Session-based auth with social logins, magic links, and role-based
            access out of the box.
          </p>
        </div>

        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[250ms]">
          View docs{" "}
          <ArrowRight
            size={10}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {/* dashed vertical divider (inset 16px top/bottom) */}
      <div className="absolute top-4 bottom-4 right-[140px] w-px border-l border-dashed border-border/40" />

      {/* circle dot at divider midpoint */}
      <div className="absolute top-1/2 right-[140px] -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="size-2 rounded-full border border-border bg-background transition-transform duration-200 delay-100 group-hover:scale-110" />
      </div>

      {/* provider panel */}
      <div className="absolute top-0 bottom-0 right-0 w-[140px] flex flex-col justify-center">
        {["Google", "Github", "Email", "Passkey"].map((provider, i) => (
          <div key={provider}>
            <div
              className="px-4 py-[7px] opacity-0 group-hover:opacity-100 transition-all duration-300 text-foreground/40 group-hover:text-foreground/90"
              style={{ transitionDelay: `${150 + i * 70}ms` }}
            >
              <span className="text-[8px] font-mono">{provider}</span>
            </div>
            {i < 3 && <div className="mx-4 h-px bg-border/15" />}
          </div>
        ))}
      </div>

      {/* corner brackets */}
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

{
  /* ── Card 2: Payments ───────────────────────────────────────── */
}
function MicroHeroTwo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="w-[380px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* content area */}
      <div className="absolute top-0 left-0 right-0 bottom-[52px] p-5 flex flex-col justify-between">
        <div>
          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
            Payments
          </span>
          <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
            Get paid
            <br />
            globally.
          </h2>
          <p className="text-muted-foreground text-[9px] leading-relaxed mt-2 max-w-[220px]">
            Subscriptions, one-time payments, and usage-based billing with zero
            config.
          </p>
        </div>
      </div>

      {/* horizontal border line */}
      <div className="absolute bottom-[52px] left-4 right-4 h-px bg-border/30" />

      {/* circle dot at border/left-edge intersection */}
      <div className="absolute bottom-[52px] left-4 -translate-y-1/2 z-10">
        <div className="size-2 rounded-full border border-border bg-background transition-transform duration-200 delay-100 group-hover:scale-110" />
      </div>

      {/* bottom zone: prices + CTA */}
      <div className="absolute bottom-0 left-0 right-0 h-[52px] flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          {[
            ["Starter", "$9"],
            ["Pro", "$29"],
            ["Team", "$79"],
          ].map(([name, price], i) => (
            <div key={name} className="flex items-center gap-3">
              <div
                className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono"
                style={{ transitionDelay: `${150 + i * 70}ms` }}
              >
                <span
                  className="text-[8px] text-foreground/40 group-hover:text-foreground/90 transition-colors duration-300"
                  style={{ transitionDelay: `${150 + i * 70}ms` }}
                >
                  {name}
                </span>
                <span className="text-[8px] text-foreground font-medium">
                  {price}
                </span>
              </div>
              {i < 2 && <div className="w-px h-3 bg-border/20" />}
            </div>
          ))}
        </div>

        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[300ms]">
          Integrate{" "}
          <ArrowRight
            size={10}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {/* corner brackets */}
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

{
  /* ── Card 3: Database ────────────────────────────────────────── */
}
function MicroHeroThree() {
  const schemaRows = [
    { field: "id", type: "uuid", key: "PK" },
    { field: "email", type: "text", key: "UQ" },
    { field: "name", type: "varchar", key: "" },
    { field: "plan", type: "enum", key: "FK" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="w-[380px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* heading zone */}
      <div className="p-5 pb-0">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          Database
        </span>
        <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1.5">
          Query anything.
        </h2>
      </div>

      {/* dashed horizontal line */}
      <div className="absolute top-[72px] left-4 right-4 border-t border-dashed border-border/40" />

      {/* schema table */}
      <div className="absolute top-[80px] bottom-[36px] left-0 right-0 px-5 flex flex-col">
        {/* column headers */}
        <div className="flex items-center mb-1">
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 w-[80px]">Field</span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 w-[80px]">Type</span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50 text-right flex-1">Key</span>
        </div>

        {/* schema rows */}
        {schemaRows.map((row, i) => (
          <div
            key={row.field}
            className="flex items-center py-[4px] font-mono opacity-60 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ transitionDelay: `${80 + i * 60}ms` }}
          >
            <span className="text-[8px] text-foreground w-[80px]">{row.field}</span>
            <span className="text-[8px] text-muted-foreground w-[80px]">{row.type}</span>
            <span className="text-[8px] text-foreground/50 text-right flex-1 font-semibold">{row.key}</span>
          </div>
        ))}
      </div>

      {/* bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 h-[36px] flex items-center px-5">
        <span className="ml-auto text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[300ms]">
          Explore <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* corner brackets */}
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col mx-auto max-w-7xl border-x">
      <nav className="relative px-4 py-4 flex items-center justify-between">
        <span>Akira</span>
        <UserDropdown />
        <div className="z-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-b absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>
      <section className="relative flex flex-1">
        <Ladder side="left" />
        <Ladder side="right" />
        <div className="flex-1 flex flex-col font-pixel-square ">
          <div className="flex-1 flex flex-col items-start justify-center px-8">
            <div className="flex items-center gap-2 mb-4">
              <HeroBadge />
            </div>
            <h1 className="text-5xl">Akira</h1>
            <p className="text-base text-muted-foreground mt-3 max-w-md leading-relaxed">
              A modern starter with Next.js, Tailwind, shadcn/ui, Postgres,
              Auth, Payments and Email baked in. Skip the setup, start building
              and ship before the weekend.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <HeroButton />
              <HeroButton2 />
            </div>
          </div>
          <div className="flex-1 border-t border-border relative">
            <TechGrid />
          </div>
        </div>
        <div className="flex-1 border-l border-border flex flex-col items-center justify-center gap-6 overflow-y-auto py-6 font-sans">
          <MicroHeroOne />
          <MicroHeroTwo />
          <MicroHeroThree />
        </div>
      </section>
      <footer className="relative px-4 py-4 font-pixel-square">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground ">
            built by{" "}
            <a
              href="https://sachi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              sachi
            </a>
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a
              href="https://github.com/sachigoyal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
            >
              github
            </a>
            <span className="text-3xl leading-none">·</span>
            <a
              href="https://x.com/sachigoyal27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
            >
              x
            </a>
          </div>
          <ModeToggle />
        </div>
        <div className="z-10 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-t absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
      </footer>
    </div>
  );
}
