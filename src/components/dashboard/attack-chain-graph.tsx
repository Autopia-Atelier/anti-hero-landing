/**
 * [INPUT]: 依赖 @xyflow/react, attack-node, animejs
 * [OUTPUT]: AttackChainGraph 攻击链有向图组件
 * [POS]: dashboard 的核心视图 1，React Flow 封装
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  type NodeTypes,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { animate, stagger } from "animejs";
import { AttackNode, type AttackNodeData } from "./attack-node";

/* ── 节点类型注册 ── */

const nodeTypes: NodeTypes = { attack: AttackNode } as unknown as NodeTypes;

/* ── 默认样式覆盖 ── */

const defaultEdgeOptions = {
  type: "default",
  animated: true,
  style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5, strokeDasharray: "6 3" },
};

/* ── Props ── */

export type AttackChainProps = {
  nodes: Node<AttackNodeData>[];
  edges: Edge[];
  className?: string;
};

/* ── 组件 ── */

export function AttackChainGraph({ nodes, edges, className = "" }: AttackChainProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* 入场动画：节点级联 fade-in */
  const onInit = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;
    const nodeEls = containerRef.current.querySelectorAll(".react-flow__node");
    animate(Array.from(nodeEls), {
      opacity: [0, 1],
      translateY: [12, 0],
      delay: stagger(80),
      duration: 400,
      ease: "outCubic",
    });
  }, []);

  return (
    <div ref={containerRef} className={`h-[400px] w-full border bg-card/50 ${className}`}>
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
  );
}
