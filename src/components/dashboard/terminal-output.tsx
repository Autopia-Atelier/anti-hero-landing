/**
 * [INPUT]: 依赖 animejs
 * [OUTPUT]: TerminalOutput CLI 日志 + ProofPayload 证明载荷
 * [POS]: dashboard 的 CLI 输出模拟与攻击证明展示
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/* ─────────────────────────────────────────────
 * TerminalOutput — CLI 风格日志
 * ───────────────────────────────────────────── */

export type LogLine = {
  prefix: "+" | "!" | "~" | "*" | ">" | "-";
  text: string;
};

const PREFIX_STYLES: Record<string, string> = {
  "+": "text-[var(--severity-low)]",
  "!": "text-[var(--severity-critical)]",
  "~": "text-[var(--severity-medium)]",
  "*": "text-[var(--severity-info)]",
  ">": "text-foreground",
  "-": "text-muted-foreground",
};

export function TerminalOutput({
  lines,
  className = "",
  animate: shouldAnimate = true,
  title = "stewie",
}: {
  lines: LogLine[];
  className?: string;
  animate?: boolean;
  title?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lineEls = containerRef.current.querySelectorAll("[data-line]");
    animate(Array.from(lineEls), {
      opacity: [0, 1],
      translateX: [-8, 0],
      delay: stagger(120),
      duration: 300,
      ease: "outCubic",
    });
  }, [shouldAnimate, lines]);

  return (
    <div className={`rounded-lg overflow-hidden border border-border ${className}`}>
      {/* 标题栏 */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[oklch(0.16_0_0)] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] text-[oklch(0.55_0_0)] ml-1">{title}</span>
      </div>

      {/* 终端内容 */}
      <div
        ref={containerRef}
        className="bg-[oklch(0.11_0_0)] px-4 py-3 overflow-x-auto"
      >
        <div className="font-mono text-[13px] leading-[1.7] space-y-px">
          {lines.map((line, i) => (
            <div key={i} data-line className="flex gap-2">
              <span className={`shrink-0 select-none ${PREFIX_STYLES[line.prefix] ?? "text-foreground"}`}>
                [{line.prefix}]
              </span>
              <span className="text-[oklch(0.82_0_0)]">{line.text}</span>
            </div>
          ))}
          {/* 光标行 */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[oklch(0.45_0_0)] select-none">$</span>
            <span className="inline-block w-[7px] h-[15px] bg-[oklch(0.82_0_0)] animate-[pulse_1s_steps(1)_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * ProofPayload — 证明载荷脉冲高亮
 * ───────────────────────────────────────────── */

const CHANNEL_LABELS: Record<string, string> = {
  "audit-log": "AUDIT LOG",
  "http-header": "HTTP HEADER",
  "controlled-test": "CONTROLLED TEST",
};

export function ProofPayload({
  markerId,
  channel = "audit-log",
  className = "",
}: {
  markerId: string;
  channel?: "audit-log" | "http-header" | "controlled-test";
  className?: string;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    animate(glowRef.current, {
      boxShadow: [
        "0 0 0px 0px var(--severity-critical)",
        "0 0 12px 2px var(--severity-critical)",
        "0 0 0px 0px var(--severity-critical)",
      ],
      duration: 2000,
      ease: "inOutSine",
      loop: true,
    });
  }, []);

  return (
    <div
      ref={glowRef}
      className={`border border-[var(--severity-critical)] bg-[var(--severity-critical)]/5 px-4 py-3 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full bg-[var(--severity-critical)] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 bg-[var(--severity-critical)]" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium text-[var(--severity-critical)]">
            [HARMLESS MARKER] {markerId}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
            Channel: {CHANNEL_LABELS[channel]} · Proof written to target system
          </p>
        </div>
      </div>
    </div>
  );
}
