/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: SkillSupplyChain Skills 供应链扫描结果组件
 * [POS]: dashboard 的视图 2b，展示 SKILL.md 威胁
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Severity } from "./attack-node";

/* ── 类型 ── */

export type SkillFinding = {
  severity: Severity;
  title: string;
  description: string;
  file?: string;
  line?: number;
};

export type SkillVersion = {
  version: string;
  status: "clean" | "suspicious" | "malicious";
  note?: string;
};

export type SkillScanResult = {
  skillName: string;
  findings: SkillFinding[];
  versions?: SkillVersion[];
  toxicMatch?: boolean;
};

/* ── 严重性样式 ── */

const SEV_STYLE: Record<Severity, string> = {
  critical: "border-[var(--severity-critical)] text-[var(--severity-critical)]",
  high: "border-[var(--severity-high)] text-[var(--severity-high)]",
  medium: "border-[var(--severity-medium)] text-[var(--severity-medium)]",
  low: "border-[var(--severity-low)] text-[var(--severity-low)]",
  info: "border-[var(--severity-info)] text-[var(--severity-info)]",
};

const VER_BG: Record<string, string> = {
  clean: "bg-[var(--severity-low)]/10 text-[var(--severity-low)]",
  suspicious: "bg-[var(--severity-medium)]/10 text-[var(--severity-medium)]",
  malicious: "bg-[var(--severity-critical)]/10 text-[var(--severity-critical)]",
};

/* ── 组件 ── */

export function SkillSupplyChain({
  results,
  className = "",
}: {
  results: SkillScanResult[];
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {results.map((r) => (
        <div key={r.skillName} className="border">
          {/* 头部 */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
            <span className="font-mono text-xs font-medium">{r.skillName}</span>
            {r.toxicMatch && (
              <span className="font-mono text-[9px] px-1.5 py-px bg-[var(--severity-critical)]/10 text-[var(--severity-critical)] border border-[var(--severity-critical)]">
                ToxicSkills DB Match
              </span>
            )}
          </div>

          {/* Findings */}
          <div className="divide-y">
            {r.findings.map((f, i) => (
              <div key={i} className="px-4 py-2.5 flex gap-3">
                <span className={`shrink-0 font-mono text-[9px] px-1.5 py-px border self-start mt-0.5 ${SEV_STYLE[f.severity]}`}>
                  {f.severity.toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-xs font-medium">{f.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{f.description}</p>
                  {f.file && (
                    <p className="font-mono text-[9px] text-muted-foreground mt-1">
                      {f.file}{f.line ? `:${f.line}` : ""}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 版本时间线 */}
          {r.versions && (
            <div className="px-4 py-2.5 border-t bg-muted/10">
              <p className="font-mono text-[9px] text-muted-foreground mb-2">SUPPLY CHAIN TIMELINE</p>
              <div className="flex items-center gap-1">
                {r.versions.map((v, i) => (
                  <div key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-muted-foreground text-[10px]">→</span>}
                    <span className={`font-mono text-[9px] px-1.5 py-0.5 ${VER_BG[v.status]}`}>
                      {v.version}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
