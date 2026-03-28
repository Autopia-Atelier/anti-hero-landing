/**
 * [INPUT]: 依赖 animejs
 * [OUTPUT]: ProofPayload 证明载荷高亮组件
 * [POS]: dashboard 的攻击证明展示，脉冲光晕效果
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/* ── 组件 ── */

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

  const CHANNEL_LABELS: Record<string, string> = {
    "audit-log": "AUDIT LOG",
    "http-header": "HTTP HEADER",
    "controlled-test": "CONTROLLED TEST",
  };

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
