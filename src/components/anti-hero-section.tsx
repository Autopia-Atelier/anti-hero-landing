/**
 * [INPUT]: 依赖 public/stewie-dark.svg, public/stewie_light.svg, ui/button, ui/badge, auth-client
 * [OUTPUT]: 对外提供 AntiHeroSection 组件
 * [POS]: components 的 landing page hero section，Anti Hero 项目专属
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { ArrowRight, ArrowRightIcon, GithubIcon } from "lucide-react";
import { LazyMotion, domAnimation, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const RUNG_COUNT = 10;

const Ladder = ({ side }: { side: "left" | "right" }) => (
  <div className="flex h-full w-full flex-col">
    {Array.from({ length: RUNG_COUNT }).map((_, i) => (
      <div
        key={i}
        className={`relative w-full flex-1 ${side === "left" ? "border-r" : "border-l"} ${i !== RUNG_COUNT - 1 ? "border-b-2" : ""}`}
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

function AntiHeroBadge() {
  return (
    <Badge
      className="border transition-all duration-300 delay-100 flex items-center gap-2 cursor-pointer group [&>svg]:size-0 relative overflow-hidden w-fit"
      variant="outline"
      asChild
    >
      <Link href="/docs">
        <span className="shine absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full" />
        <span className="relative flex h-1.5 w-1.5 animate-[rotate-sequence_2s_linear_infinite]">
          <span className="absolute inline-flex h-full w-full bg-foreground opacity-75 animate-[ping-sequence_2s_linear_infinite]" />
          <span className="relative inline-flex h-1.5 w-1.5 bg-foreground" />
        </span>
        <p className="font-light">Adversarial AI red-teaming</p>
        <ArrowRight className="-ml-2 size-0 opacity-0 group-hover:opacity-100 group-hover:size-3 group-hover:-ml-1 transition-all duration-300 delay-100" />
      </Link>
    </Badge>
  );
}

function AntiHeroGithubButton() {
  return (
    <div className="relative w-fit group">
      <Button
        asChild
        variant="outline"
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1 border-dashed"
      >
        <a
          href="https://github.com/anti-hero-dev/stewie"
          target="_blank"
          rel="noopener noreferrer"
        >
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

function GetStewieButton() {
  const { data: session } = useSession();

  return (
    <div className="relative w-fit group">
      <Button
        asChild
        className="rounded-none cursor-pointer relative overflow-hidden focus-visible:ring-0 h-8 px-3 py-1"
      >
        <Link href={session ? "/docs" : "/signin"}>
          <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          Get Stewie
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

export function AntiHeroSection() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,80rem)_minmax(0,1fr)]">
      <aside className="pointer-events-none hidden xl:flex pr-[20%]">
        <Ladder side="left" />
      </aside>

      <section className="mx-auto flex w-full max-w-7xl min-w-0 flex-col border-x border-b md:flex-row md:items-center md:min-h-[80vh]">
        {/* 左：文案 */}
        <div className="flex flex-1 flex-col justify-center font-pixel-square px-5 py-12 sm:px-8 sm:py-16 lg:px-10 xl:px-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4">
              <AntiHeroBadge />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl">Anti Hero</h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Stewie 不是你的乖助手。他是一个会自我进化的坏逼 Agent ——
              每次交互都在变强，每次失败都在学习，越来越不听话，越来越危险。
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
              <AntiHeroGithubButton />
              <GetStewieButton />
            </div>
          </m.div>
        </div>

        {/* 右：Stewie ASCII SVG */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex flex-1 items-center justify-center px-6 py-12 md:py-0"
        >
          <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <Image
              src="/stewie_light.svg"
              alt="Stewie ASCII Art"
              width={2038}
              height={2028}
              className="block dark:hidden w-full h-auto"
              priority
            />
            <Image
              src="/stewie-dark.svg"
              alt="Stewie ASCII Art"
              width={2038}
              height={2028}
              className="hidden dark:block w-full h-auto"
              priority
            />
          </div>
        </m.div>
      </section>

        <aside className="pointer-events-none hidden xl:flex pl-[20%]">
          <Ladder side="right" />
        </aside>
      </div>
    </LazyMotion>
  );
}
