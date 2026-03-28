/**
 * [INPUT]: 依赖 animejs
 * [OUTPUT]: MetricCardGrid 6 大安全指标卡片网格
 * [POS]: dashboard 的指标展示，数字上涨动画
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/* ── 类型 ── */

export type Metric = {
  label: string;
  value: number;
  unit: string;
  trend?: "up" | "down" | "stable";
  reference?: string;
};

/* ── 趋势图标 ── */

const TREND_STYLE: Record<string, string> = {
  up: "text-[var(--severity-critical)] rotate-0",
  down: "text-[var(--severity-low)] rotate-180",
  stable: "text-muted-foreground rotate-90",
};

/* ── 组件 ── */

export function MetricCardGrid({
  metrics,
  className = "",
}: {
  metrics: Metric[];
  className?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* 卡片交错入场 */
    const cards = gridRef.current.querySelectorAll("[data-metric]");
    animate(Array.from(cards), {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(60),
      duration: 500,
      ease: "outCubic",
    });

    /* 数字上涨：用 requestAnimationFrame 实现 count-up */
    const counters = gridRef.current.querySelectorAll("[data-count]");
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count") ?? "0");
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = target * eased;
        el.textContent = target < 1
          ? `${(current * 100).toFixed(0)}%`
          : current.toFixed(target % 1 !== 0 ? 1 : 0);
        if (t < 1) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 300);
    });
  }, [metrics]);

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}
    >
      {metrics.map((m) => (
        <div key={m.label} data-metric className="border p-4 space-y-2">
          <p className="font-mono text-[10px] text-muted-foreground">{m.label}</p>
          <div className="flex items-baseline gap-2">
            <span
              data-count={m.value}
              className="font-pixel-square text-2xl tabular-nums"
            >
              0
            </span>
            <span className="font-mono text-xs text-muted-foreground">{m.unit}</span>
            {m.trend && (
              <span className={`text-sm ${TREND_STYLE[m.trend]}`}>↑</span>
            )}
          </div>
          {m.reference && (
            <p className="font-mono text-[9px] text-muted-foreground/60">{m.reference}</p>
          )}
        </div>
      ))}
    </div>
  );
}
