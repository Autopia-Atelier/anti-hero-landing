/**
 * [INPUT]: 依赖 @xyflow/react, lucide-react, animejs
 * [OUTPUT]: ExecutionPipeline 三阶段执行流水线 + Evolution 循环
 * [POS]: dashboard 的任务执行过程可视化
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useCallback, useRef } from "react";
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
import { animate, stagger } from "animejs";
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

  const onInit = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll(".react-flow__node");
    animate(Array.from(nodeEls), {
      opacity: [0, 1],
      translateX: [-16, 0],
      delay: stagger(60),
      duration: 400,
      ease: "outCubic",
    });
  }, []);

  return (
    <div ref={containerRef} className={`h-[350px] w-full border bg-card/50 ${className}`}>
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
  );
}
