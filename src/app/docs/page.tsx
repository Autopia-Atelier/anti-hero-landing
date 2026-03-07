"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, ArrowRight, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle/mode-toggle";
import { UserDropdown } from "@/components/user-dropdown";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95 cursor-pointer"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [flash, setFlash] = useState(false);

  return (
    <div
      className={`flex items-center justify-between gap-2 bg-muted border border-dashed px-3 py-2 font-mono text-xs hover:border-foreground/30 transition-colors ${
        flash ? "border-foreground/50" : "border-border"
      }`}
    >
      <code className="text-foreground truncate">{code}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setFlash(true);
          setTimeout(() => setFlash(false), 300);
        }}
        className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95 cursor-pointer"
      >
        {flash ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
      <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
    </>
  );
}

function ShineSweep() {
  return (
    <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
  );
}

function CircleDot() {
  return (
    <div className="size-2 rounded-full border border-border bg-background shrink-0" />
  );
}

function StepCard({
  index,
  label,
  title,
  children,
}: {
  index: number;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className="bg-background border border-border relative group overflow-hidden flex flex-col transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:group-hover:shadow-[0_2px_8px_rgba(255,255,255,0.02)]"
    >
      {/* Step number indicator */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: 0.3 + index * 0.1,
        }}
        className="absolute top-2 right-2 size-5 rounded-full border border-border bg-background text-[8px] flex items-center justify-center font-mono z-10"
      >
        {index + 1}
      </motion.div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          Step {index + 1} — {label}
        </span>
        <h2 className="text-sm font-pixel-square tracking-tight text-foreground mt-1.5 mb-0">
          {title}
        </h2>
        {/* Dashed divider */}
        <div className="border-t border-dashed border-border/40 my-2" />
        <div className="flex-1 flex flex-col justify-center gap-2">
          {children}
        </div>
      </div>
      <CornerBrackets />
    </motion.div>
  );
}

function InstallCard() {
  const [pm, setPm] = useState<"bun" | "npm" | "pnpm" | "yarn">("bun");
  const commands = {
    bun: "bun install",
    npm: "npm install",
    pnpm: "pnpm install",
    yarn: "yarn install",
  };

  return (
    <StepCard index={1} label="Install" title="Install dependencies">
      <div className="flex gap-3 mb-1">
        {(["bun", "npm", "pnpm", "yarn"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPm(p)}
            className={`text-[10px] font-mono pb-0.5 cursor-pointer transition-all duration-200 ${
              pm === p
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <CodeBlock code={commands[pm]} />
    </StepCard>
  );
}

function ConfigureCard() {
  const vars = [
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "DODO_API_KEY",
    "RESEND_API_KEY",
  ];

  return (
    <StepCard index={2} label="Configure" title="Set up environment">
      <div className="border border-border divide-y divide-border mb-2">
        {vars.map((v, i) => (
          <div
            key={v}
            className="px-2 py-1 font-mono text-[9px] text-muted-foreground border-l-2 border-l-transparent group-hover:border-l-foreground/20 opacity-60 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ transitionDelay: `${80 + i * 60}ms` }}
          >
            {v}
          </div>
        ))}
      </div>
      <CodeBlock code="cp .env.example .env" />
    </StepCard>
  );
}

function LaunchCard() {
  return (
    <StepCard index={3} label="Launch" title="You're ready">
      <CodeBlock code="bun dev" />
      <div className="mt-1">
        <a href="/" className="relative w-fit group/cta inline-block">
          <Button
            variant="outline"
            className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
          >
            <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />
            <span className="text-[9px] font-medium text-foreground flex items-center gap-1.5 group-hover/cta:gap-2.5 transition-all duration-300">
              Start building
              <ArrowRightIcon className="size-3 w-0 opacity-0 group-hover/cta:w-3 group-hover/cta:opacity-100 transition-all duration-200" />
            </span>
          </Button>
          <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-b border-r bottom-0 right-0 transition-colors duration-300" />
          <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-b border-l bottom-0 left-0 transition-colors duration-300" />
          <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-t border-r top-0 right-0 transition-colors duration-300" />
          <span className="absolute h-2.5 w-2.5 border-foreground/30 group-hover/cta:border-foreground border-t border-l top-0 left-0 transition-colors duration-300" />
        </a>
      </div>
    </StepCard>
  );
}

function GridConnectors() {
  return (
    <>
      {/* Horizontal line: row 1, between col 1 and col 2 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10">
        <CircleDot />
        <div className="w-8 border-t border-dashed border-border" />
        <CircleDot />
      </div>
      {/* Horizontal line: row 2, between col 1 and col 2 */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10">
        <CircleDot />
        <div className="w-8 border-t border-dashed border-border" />
        <CircleDot />
      </div>
      {/* Vertical line: col 1, between row 1 and row 2 */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <CircleDot />
        <div className="h-8 border-l border-dashed border-border" />
        <CircleDot />
      </div>
      {/* Vertical line: col 2, between row 1 and row 2 */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <CircleDot />
        <div className="h-8 border-l border-dashed border-border" />
        <CircleDot />
      </div>
      {/* Center intersection dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <CircleDot />
      </motion.div>
    </>
  );
}

export default function DocsPage() {
  return (
    <div className="w-full h-screen flex flex-col mx-auto max-w-7xl border-x">
      {/* Nav */}
      <nav className="relative px-4 py-4 font-pixel-square flex items-center justify-between">
        <a href="/" className="hover:opacity-80 transition-opacity">
          Akira
        </a>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <UserDropdown />
        </div>
        <div className="z-10 absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="z-10 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 size-2.5 rounded-full border border-border bg-background" />
        <div className="border-b absolute bottom-0 left-1/2 -translate-x-1/2 w-screen" />
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
              Getting Started
            </span>
            <h1 className="text-2xl font-pixel-square mt-1">
              Set up in 4 steps
            </h1>
          </motion.div>

          {/* 2x2 Grid with connectors */}
          <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-[1px] bg-border relative">
            <StepCard index={0} label="Clone" title="Clone the repo">
              <CodeBlock code="git clone https://github.com/sachigoyal/akira" />
            </StepCard>

            <InstallCard />

            <ConfigureCard />

            <LaunchCard />

            <GridConnectors />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 py-4 font-pixel-square">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
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
            <span className="text-3xl leading-none">&middot;</span>
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
