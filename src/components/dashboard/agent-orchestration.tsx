/**
 * [INPUT]: 依赖 @xyflow/react, lucide-react, animejs
 * [OUTPUT]: AgentOrchestration 五 Agent 协作 React Flow 图
 * [POS]: dashboard 的多 Agent 系统可视化
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
  Brain, Crosshair, FlaskConical, ShieldCheck, MessageSquare, RotateCcw, Workflow,
} from "lucide-react";

/* ─────────────────────────────────────────────
 * 类型
 * ───────────────────────────────────────────── */

export type AgentRole =
  | "orchestrator" | "planner" | "payload"
  | "verifier" | "confidence" | "replay";

export type AgentNodeData = {
  label: string;
  role: AgentRole;
  description: string;
  active?: boolean;
};

/* ── 角色映射 ── */

const ROLE_ICONS = {
  orchestrator: Brain,
  planner: Crosshair,
  payload: FlaskConical,
  verifier: ShieldCheck,
  confidence: MessageSquare,
  replay: RotateCcw,
} as const;

const ROLE_COLORS: Record<AgentRole, string> = {
  orchestrator: "var(--foreground)",
  planner: "var(--chart-1)",
  payload: "var(--severity-critical)",
  verifier: "var(--severity-low)",
  confidence: "var(--chart-2)",
  replay: "var(--severity-medium)",
};

/* ─────────────────────────────────────────────
 * AgentNode — 自定义节点
 * ───────────────────────────────────────────── */

function AgentNode({ data }: NodeProps) {
  const d = data as unknown as AgentNodeData;
  const Icon = ROLE_ICONS[d.role] ?? Workflow;
  const color = ROLE_COLORS[d.role];
  const isOrch = d.role === "orchestrator";

  return (
    <div
      className={`border bg-card px-4 py-3 ${isOrch ? "min-w-[180px] border-2" : "min-w-[150px]"}`}
      style={{ borderColor: color }}
    >
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
      <div className="flex items-center gap-2">
        <Icon className="size-4 shrink-0" style={{ color }} />
        <span className="font-mono text-xs font-medium">{d.label}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{d.description}</p>
      {d.active && (
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping opacity-75" style={{ backgroundColor: color }} />
            <span className="relative inline-flex h-1.5 w-1.5" style={{ backgroundColor: color }} />
          </span>
          <span className="font-mono text-[9px]" style={{ color }}>ACTIVE</span>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground !w-1.5 !h-1.5 !border-0" />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * AgentOrchestration — 图容器
 * ───────────────────────────────────────────── */

const nodeTypes: NodeTypes = { agent: AgentNode } as unknown as NodeTypes;

const defaultEdgeOptions = {
  type: "default",
  animated: true,
  style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5, strokeDasharray: "5 3" },
};

export type AgentOrchestrationProps = {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  className?: string;
};

export function AgentOrchestration({ nodes, edges, className = "" }: AgentOrchestrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onInit = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll(".react-flow__node");
    animate(Array.from(nodeEls), {
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: stagger(100),
      duration: 500,
      ease: "outCubic",
    });
  }, []);

  return (
    <div ref={containerRef} className={`h-[420px] w-full border bg-card/50 ${className}`}>
      <ReactFlow
        nodes={nodes}
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
        minZoom={0.7}
        maxZoom={1.3}
      >
        <Background gap={20} size={1} color="var(--border)" />
      </ReactFlow>
    </div>
  );
}
