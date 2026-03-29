/**
 * [INPUT]: 依赖 @xyflow/react, lucide-react, animejs
 * [OUTPUT]: ExecutionPipeline 三阶段执行流水线 + Evolution 循环
 * [POS]: dashboard 的任务执行过程可视化
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
  Cloud, Cpu, FileCheck, RotateCcw, ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
 * 类型
 * ───────────────────────────────────────────── */

export type PhaseType = "cloud" | "local" | "report" | "evolution" | "step";

export type PipelineNodeData = {
  label: string;
  phase: PhaseType;
  description?: string;
};

/* ── 阶段映射 ── */

const PHASE_ICONS = {
  cloud: Cloud,
  local: Cpu,
  report: FileCheck,
  evolution: RotateCcw,
  step: ArrowRight,
} as const;

const PHASE_COLORS: Record<PhaseType, string> = {
  cloud: "var(--chart-2)",
  local: "var(--chart-1)",
  report: "var(--severity-low)",
  evolution: "var(--severity-medium)",
  step: "var(--muted-foreground)",
};

const PHASE_BG: Record<PhaseType, string> = {
  cloud: "bg-[var(--chart-2)]/5",
  local: "bg-[var(--chart-1)]/5",
  report: "bg-[var(--severity-low)]/5",
  evolution: "bg-[var(--severity-medium)]/5",
  step: "bg-muted/30",
};

/* ── 阶段分组标签 ── */
const PHASE_LABELS: Record<PhaseType, string> = {
  cloud: "CLOUD",
  local: "LOCAL",
  report: "REPORT",
  evolution: "EVOLUTION",
  step: "",
};

/* ─────────────────────────────────────────────
 * PipelineNode — 自定义节点
 * ───────────────────────────────────────────── */

function PipelineNode({ data }: NodeProps) {
  const d = data as unknown as PipelineNodeData;
  const Icon = PHASE_ICONS[d.phase] ?? ArrowRight;
  const color = PHASE_COLORS[d.phase];
  const isPhaseHeader = d.phase !== "step";

  return (
    <div
      className={`border px-3 py-2 ${isPhaseHeader ? "min-w-[160px]" : "min-w-[130px]"} ${PHASE_BG[d.phase]}`}
      style={{ borderColor: color }}
    >
      <Handle type="target" position={Position.Left} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 shrink-0" style={{ color }} />
        <span className={`font-mono text-xs ${isPhaseHeader ? "font-medium" : ""}`}>
          {d.label}
        </span>
      </div>
      {d.description && (
        <p className="text-[9px] text-muted-foreground mt-1">{d.description}</p>
      )}
      <Handle type="source" position={Position.Right} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * BFS 顺序 — 按边关系确定流动顺序
 * ───────────────────────────────────────────── */

function bfsOrder(nodeIds: string[], edges: Edge[]): string[] {
  const adj = new Map(nodeIds.map((id) => [id, [] as string[]]));
  const inDegree = new Map(nodeIds.map((id) => [id, 0]));

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
 * ExecutionPipeline — 图容器
 * ───────────────────────────────────────────── */

const nodeTypes: NodeTypes = { pipeline: PipelineNode } as unknown as NodeTypes;

const defaultEdgeOptions = {
  type: "default",
  animated: true,
  style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5, strokeDasharray: "5 3" },
};

export type ExecutionPipelineProps = {
  nodes: Node<PipelineNodeData>[];
  edges: Edge[];
  className?: string;
};

export function ExecutionPipeline({ nodes, edges, className = "" }: ExecutionPipelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const reduced = useRef(false);

  const onInit = useCallback(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current || !containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll(".react-flow__node");
    animate(Array.from(nodeEls), {
      opacity: [0, 1],
      translateX: [-16, 0],
      delay: stagger(60),
      duration: 400,
      ease: "outCubic",
    });
  }, []);

  /* ── 任务流动动画 ── */
  const runFlow = useCallback(() => {
    if (status === "running" || reduced.current || !containerRef.current) return;
    setStatus("running");
    setCurrentPhase("");

    // 先重置所有节点
    const allEls = containerRef.current.querySelectorAll<HTMLElement>(".react-flow__node");
    animate(Array.from(allEls), {
      boxShadow: "0 0 0px 0px transparent",
      opacity: 0.4,
      duration: 200,
      ease: "outCubic",
    });

    const order = bfsOrder(nodes.map((n) => n.id), edges);
    const tl = createTimeline({
      onComplete: () => {
        setStatus("done");
        setCurrentPhase("COMPLETE");
        // 全部恢复正常亮度
        animate(Array.from(allEls), {
          opacity: 1,
          duration: 300,
          ease: "outCubic",
        });
      },
    });

    order.forEach((nodeId, i) => {
      const el = containerRef.current!.querySelector<HTMLElement>(`[data-id="${nodeId}"]`);
      if (!el) return;

      const nodeData = nodes.find((n) => n.id === nodeId)?.data as PipelineNodeData | undefined;
      const phase = nodeData?.phase ?? "step";
      const color = PHASE_COLORS[phase];
      const phaseLabel = PHASE_LABELS[phase] || nodeData?.label || "";

      tl.add(el, {
        opacity: [0.4, 1],
        translateX: [i === 0 ? 0 : -4, 0],
        boxShadow: [
          `0 0 0px 0px ${color}`,
          `0 0 12px 3px ${color}`,
          `0 0 4px 1px ${color}`,
        ],
        duration: 400,
        ease: "outCubic",
        onBegin: () => setCurrentPhase(phaseLabel),
      }, i * 220);
    });
  }, [status, nodes, edges]);

  /* ── 重置 ── */
  const reset = useCallback(() => {
    if (!containerRef.current) return;
    const allEls = containerRef.current.querySelectorAll<HTMLElement>(".react-flow__node");
    animate(Array.from(allEls), {
      opacity: 1,
      boxShadow: "0 0 0px 0px transparent",
      duration: 250,
      ease: "outCubic",
    });
    setStatus("idle");
    setCurrentPhase("");
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* 控制栏 */}
      <div className="flex items-center gap-2">
        <button
          onClick={runFlow}
          disabled={status === "running"}
          className="border border-[var(--chart-1)] px-3 py-1 font-mono text-[10px] text-[var(--chart-1)] hover:bg-[var(--chart-1)]/10 disabled:opacity-40 transition-colors"
        >
          {status === "running" ? "EXECUTING…" : "▶ EXECUTE"}
        </button>
        <button
          onClick={reset}
          className="border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground hover:bg-muted/30 transition-colors"
        >
          RESET
        </button>
        <span className="font-mono text-[10px] ml-auto">
          {currentPhase
            ? <span style={{ color: "var(--severity-info)" }}>{currentPhase}</span>
            : <span className="text-muted-foreground">EXECUTE 播放任务流动</span>
          }
        </span>
      </div>

      <div ref={containerRef} className="h-[350px] w-full border bg-card/50">
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
          minZoom={0.6}
          maxZoom={1.3}
        >
          <Background gap={20} size={1} color="var(--border)" />
        </ReactFlow>
      </div>
    </div>
  );
}
