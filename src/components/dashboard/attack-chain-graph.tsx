/**
 * [INPUT]: 依赖 @xyflow/react, lucide-react, animejs
 * [OUTPUT]: AttackChainGraph 攻击链有向图 + AttackNode 自定义节点
 * [POS]: dashboard 的核心视图 1，React Flow 封装
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { animate, stagger, createTimeline } from "animejs";
import {
  Bug, Terminal, Unplug, FileWarning, Shield, Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────
 * 类型 & 映射
 * ───────────────────────────────────────────── */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type AttackNodeData = {
  label: string;
  severity: Severity;
  type: "injection" | "tool" | "dataflow" | "exfil" | "defense";
  description?: string;
};

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "border-l-[var(--severity-critical)] text-[var(--severity-critical)]",
  high: "border-l-[var(--severity-high)] text-[var(--severity-high)]",
  medium: "border-l-[var(--severity-medium)] text-[var(--severity-medium)]",
  low: "border-l-[var(--severity-low)] text-[var(--severity-low)]",
  info: "border-l-[var(--severity-info)] text-[var(--severity-info)]",
};

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "var(--severity-critical)",
  high: "var(--severity-high)",
  medium: "var(--severity-medium)",
  low: "var(--severity-low)",
  info: "var(--severity-info)",
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "CRITICAL", high: "HIGH", medium: "MEDIUM", low: "LOW", info: "INFO",
};

const TYPE_ICONS = {
  injection: Bug, tool: Terminal, dataflow: Unplug,
  exfil: FileWarning, defense: Shield,
} as const;

/* ─────────────────────────────────────────────
 * AttackNode — 自定义节点
 * ───────────────────────────────────────────── */

function AttackNode({ data }: NodeProps) {
  const d = data as unknown as AttackNodeData;
  const Icon = TYPE_ICONS[d.type] ?? Zap;
  const severity = d.severity ?? "info";

  return (
    <div
      className={`border border-border border-l-[3px] bg-card px-3 py-2 min-w-[140px] cursor-pointer transition-colors duration-150 hover:bg-card/80 ${SEVERITY_STYLES[severity]}`}
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

/* ─────────────────────────────────────────────
 * 拓扑排序 — 按边关系确定传播顺序
 * ───────────────────────────────────────────── */

function topoSort(nodeIds: string[], edges: Edge[]): string[] {
  const inDegree = new Map(nodeIds.map((id) => [id, 0]));
  const adj = new Map(nodeIds.map((id) => [id, [] as string[]]));

  for (const e of edges) {
    adj.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
  }

  const queue = nodeIds.filter((id) => inDegree.get(id) === 0);
  const result: string[] = [];

  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);
    for (const next of adj.get(node) ?? []) {
      const deg = (inDegree.get(next) ?? 1) - 1;
      inDegree.set(next, deg);
      if (deg === 0) queue.push(next);
    }
  }

  return result.length === nodeIds.length ? result : nodeIds;
}

/* ─────────────────────────────────────────────
 * AttackChainGraph — 有向图容器
 * ───────────────────────────────────────────── */

const nodeTypes: NodeTypes = { attack: AttackNode } as unknown as NodeTypes;

const defaultEdgeOptions = {
  type: "default",
  animated: true,
  style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5, strokeDasharray: "6 3" },
};

export type AttackChainProps = {
  nodes: Node<AttackNodeData>[];
  edges: Edge[];
  className?: string;
};

export function AttackChainGraph({ nodes, edges, className = "" }: AttackChainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [propagating, setPropagating] = useState(false);
  const reduced = useRef(false);

  const onInit = useCallback(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current || !containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll(".react-flow__node");
    animate(Array.from(nodeEls), {
      opacity: [0, 1],
      translateY: [12, 0],
      delay: stagger(80),
      duration: 400,
      ease: "outCubic",
    });
  }, []);

  /* ── 攻击路径传播动画 ── */
  const runPropagation = useCallback(() => {
    if (propagating || reduced.current || !containerRef.current) return;
    setPropagating(true);

    const order = topoSort(nodes.map((n) => n.id), edges);
    const tl = createTimeline({
      onComplete: () => setPropagating(false),
    });

    order.forEach((nodeId, i) => {
      const el = containerRef.current!.querySelector<HTMLElement>(
        `[data-id="${nodeId}"] .react-flow__node-attack`
      ) ?? containerRef.current!.querySelector<HTMLElement>(`[data-id="${nodeId}"]`);
      if (!el) return;

      const severity = nodes.find((n) => n.id === nodeId)?.data.severity ?? "info";
      const color = SEVERITY_COLORS[severity as Severity];

      tl.add(el, {
        scaleX: [1, 1.04, 1],
        scaleY: [1, 0.97, 1],
        boxShadow: [
          `0 0 0px 0px ${color}`,
          `0 0 14px 3px ${color}`,
          `0 0 0px 0px ${color}`,
        ],
        duration: 500,
        ease: "outCubic",
      }, i * 280);
    });
  }, [propagating, nodes, edges]);

  /* ── 重置 ── */
  const reset = useCallback(() => {
    if (!containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll<HTMLElement>(".react-flow__node");
    animate(Array.from(nodeEls), {
      boxShadow: "0 0 0px 0px transparent",
      duration: 200,
      ease: "outCubic",
    });
    setPropagating(false);
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* 控制栏 */}
      <div className="flex items-center gap-2">
        <button
          onClick={runPropagation}
          disabled={propagating}
          className="border border-[var(--severity-critical)] px-3 py-1 font-mono text-[10px] text-[var(--severity-critical)] hover:bg-[var(--severity-critical)]/10 disabled:opacity-40 transition-colors"
        >
          {propagating ? "PROPAGATING…" : "▶ RUN ATTACK"}
        </button>
        <button
          onClick={reset}
          className="border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground hover:bg-muted/30 transition-colors"
        >
          RESET
        </button>
        <span className="font-mono text-[10px] text-muted-foreground ml-auto">
          点击节点查看详情 · RUN ATTACK 播放传播路径
        </span>
      </div>

      <div ref={containerRef} className="h-[400px] w-full border bg-card/50">
        <ReactFlow
          nodes={nodes.map((n) => ({
            ...n,
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          }))}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onInit={onInit}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          minZoom={0.8}
          maxZoom={1.2}
        >
          <Background gap={20} size={1} color="var(--border)" />
        </ReactFlow>
      </div>
    </div>
  );
}
