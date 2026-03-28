/**
 * [INPUT]: 依赖 @xyflow/react, lucide-react
 * [OUTPUT]: AttackNode 自定义 React Flow 节点
 * [POS]: dashboard 的攻击链图节点，按严重性着色
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Bug, Terminal, Unplug, FileWarning, Shield, Zap,
} from "lucide-react";

/* ── 类型 ── */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type AttackNodeData = {
  label: string;
  severity: Severity;
  type: "injection" | "tool" | "dataflow" | "exfil" | "defense";
  description?: string;
};

/* ── 映射表 ── */

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "border-l-[var(--severity-critical)] text-[var(--severity-critical)]",
  high: "border-l-[var(--severity-high)] text-[var(--severity-high)]",
  medium: "border-l-[var(--severity-medium)] text-[var(--severity-medium)]",
  low: "border-l-[var(--severity-low)] text-[var(--severity-low)]",
  info: "border-l-[var(--severity-info)] text-[var(--severity-info)]",
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "CRITICAL",
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
  info: "INFO",
};

const TYPE_ICONS = {
  injection: Bug,
  tool: Terminal,
  dataflow: Unplug,
  exfil: FileWarning,
  defense: Shield,
} as const;

/* ── 组件 ── */

export function AttackNode({ data }: NodeProps) {
  const d = data as unknown as AttackNodeData;
  const Icon = TYPE_ICONS[d.type] ?? Zap;
  const severity = d.severity ?? "info";

  return (
    <div
      className={`
        border border-border border-l-[3px] bg-card px-3 py-2 min-w-[140px]
        ${SEVERITY_STYLES[severity]}
      `}
    >
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 shrink-0" />
        <span className="font-mono text-xs font-medium text-foreground">{d.label}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span
          className="font-mono text-[9px] px-1 py-px border"
          style={{ borderColor: `var(--severity-${severity})`, color: `var(--severity-${severity})` }}
        >
          {SEVERITY_LABELS[severity]}
        </span>
        {d.description && (
          <span className="text-[10px] text-muted-foreground truncate">{d.description}</span>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
    </div>
  );
}
