/**
 * [INPUT]: 依赖 animejs
 * [OUTPUT]: TerminalOutput CLI 风格日志展示组件
 * [POS]: dashboard 的 CLI 输出模拟，逐行动画显现
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/* ── 类型 ── */

export type LogLine = {
  prefix: "+" | "!" | "~" | "*" | ">" | "-";
  text: string;
};

/* ── 前缀样式 ── */

const PREFIX_STYLES: Record<string, string> = {
  "+": "text-[var(--severity-low)]",
  "!": "text-[var(--severity-critical)]",
  "~": "text-[var(--severity-medium)]",
  "*": "text-[var(--severity-info)]",
  ">": "text-foreground",
  "-": "text-muted-foreground",
};

/* ── 组件 ── */

export function TerminalOutput({
  lines,
  className = "",
  animate: shouldAnimate = true,
}: {
  lines: LogLine[];
  className?: string;
  animate?: boolean;
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
    <div
      ref={containerRef}
      className={`bg-[oklch(0.13_0_0)] border border-border p-4 overflow-x-auto ${className}`}
    >
      <div className="font-mono text-xs leading-relaxed space-y-0.5">
        {lines.map((line, i) => (
          <div key={i} data-line className="flex gap-2">
            <span className={`shrink-0 ${PREFIX_STYLES[line.prefix] ?? "text-foreground"}`}>
              [{line.prefix}]
            </span>
            <span className="text-[oklch(0.85_0_0)]">{line.text}</span>
          </div>
        ))}
        {/* 闪烁光标 */}
        <div className="flex gap-2">
          <span className="text-foreground animate-pulse">▊</span>
        </div>
      </div>
    </div>
  );
}
