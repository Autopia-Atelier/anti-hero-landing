"use client";

import { TechGrid } from "@/components/tech-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, GithubIcon, ArrowRight, ArrowUpRight, Square } from "lucide-react";
import { motion } from "motion/react";

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
          backgroundImage: "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "7px 7px",
          backgroundAttachment: "fixed",
          color: "rgba(0,0,0,0.08)",
        }}
      >
        {i !== RUNG_COUNT - 1 && (
          <div
            className={`absolute z-10 ${
              side === "left"
                ? "right-0 border-y-4 border-y-transparent border-r-4 border-r-border"
                : "left-0 border-y-4 border-y-transparent border-l-4 border-l-border"
            } bottom-[-4px]`}
          />
        )}
      </div>
    ))}
  </div>
);

function HeroButton() {
  return (
    <div className="relative w-fit group">
      <Button
        type="submit"
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        <GithubIcon className="size-4" />
        Github
        <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
      </Button>
      <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
      <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
    </div>
  );
}

function HeroButton2() {
  return (
    <div className="relative w-fit group">
      <Button
        type="submit"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1"
      >
        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
        Get Akira
        <ArrowRightIcon className="size-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" />
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

{/* ── Shared hatch style ──────────────────────────────────── */}
const hatchStyle = {
  backgroundImage:
    "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
  backgroundSize: "7px 7px",
  backgroundAttachment: "fixed" as const,
  color: "rgba(0,0,0,0.08)",
};

{/* ── Card 1: Auth ─────────────────────────────────────────── */}
function MicroHeroOne() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-[340px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      {/* shine sweep */}
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* hatched left strip */}
      <div className="absolute left-0 top-0 bottom-0 w-7 border-r border-border" style={hatchStyle} />

      {/* main content area */}
      <div className="absolute top-0 bottom-0 left-7 right-[130px] flex flex-col justify-between p-4">
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
            Session-based auth with social logins, magic links,
            and role-based access out of the box.
          </p>
        </div>

        <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[250ms]">
          View docs <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* dashed vertical divider */}
      <div className="absolute top-0 bottom-0 right-[130px] w-px border-l border-dashed border-border" />

      {/* circle dot at divider midpoint */}
      <div className="absolute top-1/2 right-[130px] -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="size-2.5 rounded-full border border-border bg-background transition-transform duration-200 delay-100 group-hover:scale-125" />
      </div>

      {/* provider panel */}
      <div className="absolute top-0 bottom-0 right-0 w-[130px] flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {["Google", "Github", "Email", "Passkey"].map((provider, i) => (
            <div key={provider} className="relative">
              <div
                className="flex items-center gap-2 px-3 py-[7px] opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                style={{ transitionDelay: `${150 + i * 50}ms` }}
              >
                <div className="w-1 h-1 rounded-full bg-foreground/20 group-hover:bg-foreground transition-colors duration-300" style={{ transitionDelay: `${150 + i * 50}ms` }} />
                <span className="text-[8px] font-mono text-foreground">{provider}</span>
              </div>
              {/* row divider with triangle notch */}
              {i < 3 && (
                <div className="relative w-full h-px bg-border/40">
                  <div className="absolute right-0 top-0 -translate-y-1/2 border-y-[3px] border-y-transparent border-r-[3px] border-r-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* hatched footer strip */}
        <div className="h-5 border-t border-border" style={hatchStyle} />
      </div>

      {/* corner brackets */}
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

{/* ── Card 2: Payments ───────────────────────────────────────── */}
function MicroHeroTwo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="w-[340px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* inverted top bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-foreground border-b border-border flex items-center px-4 justify-between">
        <span className="text-[8px] uppercase tracking-[0.2em] text-background/60">
          Payments
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-background/40 group-hover:bg-background transition-colors duration-300" />
          <span className="text-[7px] text-background/60">Active</span>
        </div>
      </div>

      {/* square marker at top bar / vertical divider intersection */}
      <div className="absolute top-8 right-[135px] -translate-y-1/2 -translate-x-1/2 z-10">
        <Square className="size-2.5 fill-background stroke-border transition-transform duration-200 delay-[50ms] group-hover:rotate-45" />
      </div>

      {/* bottom area */}
      <div className="absolute top-8 bottom-0 left-0 right-0 flex">
        {/* left: content */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-foreground leading-tight mt-1">
              Get paid
              <br />
              globally.
            </h2>
            <p className="text-muted-foreground text-[9px] leading-relaxed mt-2 max-w-[160px]">
              Subscriptions, one-time payments, and usage-based billing with zero config.
            </p>
          </div>

          <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300 delay-[300ms]">
            Integrate <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* right: receipt area */}
        <div className="w-[130px] border-l border-border flex">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-[90px] flex flex-col gap-0">
              <div className="border border-dashed border-border px-2.5 py-2 flex flex-col gap-1.5">
                {[
                  ["Starter", "$9"],
                  ["Pro", "$29"],
                  ["Team", "$79"],
                ].map(([name, price], i) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transitionDelay: `${200 + i * 80}ms` }}
                  >
                    {/* circle dot bullet */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-foreground/30" />
                      <span className="text-[8px] text-muted-foreground">{name}</span>
                    </div>
                    <span className="text-[8px] text-foreground font-medium">{price}</span>
                  </div>
                ))}
              </div>
              <div className="border border-dashed border-t-0 border-border px-2.5 py-1.5 flex items-center justify-between bg-foreground/[0.03]">
                <span className="text-[7px] text-muted-foreground uppercase tracking-wider">Total</span>
                <span className="text-[10px] text-foreground font-bold group-hover:tracking-wider transition-all duration-500">$117</span>
              </div>
            </div>
          </div>

          {/* hatched right-edge strip */}
          <div className="w-5 border-l border-border" style={hatchStyle} />
        </div>
      </div>

      {/* corner brackets */}
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </motion.div>
  );
}

{/* ── Card 3: Database ────────────────────────────────────────── */}
function MicroHeroThree() {
  const schemaRows = [
    { field: "id", type: "uuid", key: "PK" },
    { field: "email", type: "text", key: "UQ" },
    { field: "name", type: "varchar", key: "" },
    { field: "plan", type: "enum", key: "FK" },
    { field: "created_at", type: "timestamptz", key: "" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="w-[340px] h-[214px] border border-border relative cursor-pointer group overflow-hidden"
    >
      <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

      {/* hatched left gutter */}
      <div
        className="absolute left-0 top-0 bottom-0 w-7 border-r border-border opacity-60 group-hover:opacity-100 transition-opacity duration-300 delay-[250ms]"
        style={hatchStyle}
      />

      {/* top label bar */}
      <div className="absolute top-0 left-7 right-0 h-8 border-b border-border flex items-center px-4 justify-between">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          Database
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors duration-500" />
          <span className="text-[7px] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            Connected
          </span>
        </div>
      </div>

      {/* schema table area */}
      <div className="absolute top-8 bottom-[36px] left-7 right-0 flex flex-col">
        {/* column headers */}
        <div className="flex items-center px-3 py-1.5 border-b border-border relative">
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground w-[90px]">Field</span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground w-[80px]">Type</span>
          <span className="text-[7px] uppercase tracking-wider text-muted-foreground text-right flex-1">Key</span>

          {/* dashed vertical column divider */}
          <div className="absolute top-0 bottom-0 left-[95px] w-px border-l border-dashed border-border/60" />

          {/* square marker at column header / divider intersection */}
          <div className="absolute bottom-0 left-[95px] translate-y-1/2 -translate-x-1/2 z-10">
            <Square className="size-2 fill-background stroke-border transition-transform duration-200 delay-[150ms] group-hover:scale-125" />
          </div>
        </div>

        {/* schema rows */}
        <div className="flex-1 flex flex-col relative">
          {/* dashed vertical divider continuing through rows */}
          <div className="absolute top-0 bottom-0 left-[95px] w-px border-l border-dashed border-border/40" />

          {schemaRows.map((row, i) => (
            <div key={row.field} className="relative">
              <div
                className="flex items-center px-3 py-[5px] opacity-60 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-mono"
                style={{ transitionDelay: `${50 + i * 60}ms` }}
              >
                <span className="text-[7px] text-foreground w-[90px]">{row.field}</span>
                <span className="text-[7px] text-muted-foreground w-[80px]">{row.type}</span>
                <span className="text-[7px] text-foreground/60 text-right flex-1 font-semibold">{row.key}</span>
              </div>
              {/* row divider with triangle notch on left edge */}
              {i < schemaRows.length - 1 && (
                <div className="relative w-full h-px bg-border/30">
                  <div className="absolute left-0 top-0 -translate-y-1/2 border-y-[3px] border-y-transparent border-l-[3px] border-l-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* bottom CTA bar */}
      <div className="absolute bottom-0 left-7 right-0 h-[36px] border-t border-border flex items-center px-4">
        <h2 className="text-[13px] font-bold tracking-tight text-foreground leading-tight">
          Query anything.
        </h2>
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
      <nav className="relative px-4 py-4">
        Akira
        <div className="z-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-b absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>
      <section className="relative flex flex-1">
        <Ladder side="left" />
        <Ladder side="right" />
        <div className="flex-1 flex flex-col font-(family-name:--font-geist-pixel-square) ">
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
      <footer className="relative px-4 py-4">
        <div className="z-10 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-t absolute top-0 left-1/2 -translate-x-1/2 w-screen" />
      </footer>
    </div>
  );
}
