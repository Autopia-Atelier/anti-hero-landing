/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: FixControlPoints 代码行级修复点组件
 * [POS]: dashboard 的视图 4，精确到代码行的修复建议
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Severity } from "./attack-node";

/* ── 类型 ── */

export type FixPoint = {
  severity: Severity;
  file: string;
  line: number;
  description: string;
  suggestion?: string;
};

/* ── 严重性样式 ── */

const SEV_STYLE: Record<Severity, string> = {
  critical: "border-[var(--severity-critical)] text-[var(--severity-critical)]",
  high: "border-[var(--severity-high)] text-[var(--severity-high)]",
  medium: "border-[var(--severity-medium)] text-[var(--severity-medium)]",
  low: "border-[var(--severity-low)] text-[var(--severity-low)]",
  info: "border-[var(--severity-info)] text-[var(--severity-info)]",
};

/* ── 组件 ── */

export function FixControlPoints({
  points,
  className = "",
}: {
  points: FixPoint[];
  className?: string;
}) {
  return (
    <div className={`border divide-y ${className}`}>
      {points.map((p, i) => (
        <div key={i} className="px-4 py-3 flex gap-3">
          <span className={`shrink-0 font-mono text-[9px] px-1.5 py-px border self-start mt-0.5 ${SEV_STYLE[p.severity]}`}>
            {p.severity.toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-foreground">
                {p.file}:{p.line}
              </span>
              <span className="text-[10px] text-muted-foreground">← {p.description}</span>
            </div>
            {p.suggestion && (
              <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">
                Fix: {p.suggestion}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
