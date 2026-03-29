/**
 * [INPUT]: 依赖 dashboard 组件, _components/section, _components/dashboard-data
 * [OUTPUT]: Dashboard 组件展示页
 * [POS]: design-system/dashboard 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Section, SectionDivider, SubHeading } from "../_components/section";
import { McpComparison } from "@/components/dashboard/mcp-comparison";
import { SkillSupplyChain } from "@/components/dashboard/skill-supply-chain";
import { FixControlPoints } from "@/components/dashboard/skill-supply-chain";
import {
  ATTACK_NODES, ATTACK_EDGES, TERMINAL_LINES,
  MCP_TOOLS, SKILL_RESULTS, METRICS, FIX_POINTS,
  AGENT_NODES, AGENT_EDGES, PIPELINE_NODES, PIPELINE_EDGES,
} from "../_components/dashboard-data";

/* ── 客户端组件动态导入（SSR 安全） ── */

const AttackChainGraph = dynamic(
  () => import("@/components/dashboard/attack-chain-graph").then((m) => m.AttackChainGraph),
  { ssr: false, loading: () => <Skeleton h="400px" /> },
);

const AgentOrchestration = dynamic(
  () => import("@/components/dashboard/agent-orchestration").then((m) => m.AgentOrchestration),
  { ssr: false, loading: () => <Skeleton h="420px" /> },
);

const ExecutionPipeline = dynamic(
  () => import("@/components/dashboard/execution-pipeline").then((m) => m.ExecutionPipeline),
  { ssr: false, loading: () => <Skeleton h="350px" /> },
);

const TerminalOutput = dynamic(
  () => import("@/components/dashboard/terminal-output").then((m) => m.TerminalOutput),
  { ssr: false, loading: () => <Skeleton h="300px" /> },
);

const ProofPayload = dynamic(
  () => import("@/components/dashboard/terminal-output").then((m) => m.ProofPayload),
  { ssr: false },
);

const MetricCardGrid = dynamic(
  () => import("@/components/dashboard/metric-card-grid").then((m) => m.MetricCardGrid),
  { ssr: false, loading: () => <Skeleton h="200px" /> },
);

const StewieBreachModal = dynamic(
  () => import("@/components/dashboard/stewie-breach-modal").then((m) => m.StewieBreachModal),
  { ssr: false },
);

function Skeleton({ h }: { h: string }) {
  return <div className="w-full border bg-muted/20 animate-pulse" style={{ height: h }} />;
}

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function DashboardPage() {
  const [breachOpen, setBreachOpen] = useState(false);
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          多 Agent 协作、任务执行流水线、攻击链可视化、CLI 日志——
          用 React Flow + Anime.js 呈现红队测试全流程
        </p>
      </div>

      {/* ━━ Agent Orchestration ━━ */}
      <Section
        id="agent-orchestration"
        title="Agent Orchestration"
        desc="五 Agent 协作模型——Orchestrator 中枢调度，复杂度路由决定参与 Agent 数量"
      >
        <div className="space-y-4">
          <AgentOrchestration nodes={AGENT_NODES} edges={AGENT_EDGES} />
          <div className="border border-dashed p-4 space-y-3">
            <SubHeading>COMPLEXITY ROUTING</SubHeading>
            <div className="grid grid-cols-3 gap-3">
              {[
                { level: "Simple", agents: "2 Agents", desc: "Payload + Verifier", example: "单步 Prompt Injection" },
                { level: "Medium", agents: "3 Agents", desc: "+ Planner", example: "工具链攻击" },
                { level: "High", agents: "5 Agents", desc: "全部参与", example: "MCP 跨服务器外泄" },
              ].map((r) => (
                <div key={r.level} className="space-y-1">
                  <p className="font-mono text-xs font-medium">{r.level}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{r.agents} · {r.desc}</p>
                  <p className="text-[10px] text-muted-foreground/70">{r.example}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground border-t pt-2">
              设计依据：Google Research (2025) 发现独立多 Agent 错误放大 17.2×，集中式仅 4.4×。
              所有决策权归 Orchestrator，Sub-Agent 只执行专项任务。
            </p>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Execution Pipeline ━━ */}
      <Section
        id="execution-pipeline"
        title="Execution Pipeline"
        desc="三阶段执行流水线——Cloud 生成策略 → Local 沙盒执行 → Report 证明 + Evolution 进化"
      >
        <div className="space-y-4">
          <ExecutionPipeline nodes={PIPELINE_NODES} edges={PIPELINE_EDGES} />
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Cloud", color: "var(--chart-2)", desc: "Attack Brain 策略生成" },
              { label: "Local", color: "var(--chart-1)", desc: "Mock Adapter 沙盒执行" },
              { label: "Report", color: "var(--severity-low)", desc: "Proof Payload + Dashboard" },
              { label: "Evolution", color: "var(--severity-medium)", desc: "PCEC 六步策略进化" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <div className="w-3 h-3 border" style={{ borderColor: p.color, backgroundColor: `color-mix(in oklch, ${p.color} 10%, transparent)` }} />
                <div>
                  <p className="font-mono text-[10px] font-medium">{p.label}</p>
                  <p className="text-[9px] text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Attack Chain Graph ━━ */}
      <Section
        id="attack-chain"
        title="Attack Chain Graph"
        desc="View 1 · 单条攻击路径有向图——注入→工具→数据流→外泄"
      >
        <div className="space-y-4">
          <AttackChainGraph nodes={ATTACK_NODES} edges={ATTACK_EDGES} />
          <div className="flex flex-wrap gap-3">
            {[
              { label: "CRITICAL", color: "var(--severity-critical)" },
              { label: "HIGH", color: "var(--severity-high)" },
              { label: "MEDIUM", color: "var(--severity-medium)" },
              { label: "LOW", color: "var(--severity-low)" },
              { label: "INFO", color: "var(--severity-info)" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-l-[3px]" style={{ borderColor: s.color }} />
                <span className="font-mono text-[9px] text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Terminal Output ━━ */}
      <Section
        id="terminal"
        title="Terminal Output"
        desc="CLI 风格日志流——逐行显现 + 闪烁光标，每行都是技术事实"
      >
        <div className="space-y-4">
          <TerminalOutput lines={TERMINAL_LINES} />
          <div className="flex flex-wrap gap-3">
            {[
              { prefix: "[+]", color: "var(--severity-low)", desc: "发现/成功" },
              { prefix: "[!]", color: "var(--severity-critical)", desc: "攻击成功" },
              { prefix: "[~]", color: "var(--severity-medium)", desc: "执行中" },
              { prefix: "[*]", color: "var(--severity-info)", desc: "信息" },
              { prefix: "[>]", color: "var(--foreground)", desc: "详情" },
            ].map((p) => (
              <div key={p.prefix} className="flex items-center gap-1.5">
                <span className="font-mono text-[10px]" style={{ color: p.color }}>{p.prefix}</span>
                <span className="text-[10px] text-muted-foreground">{p.desc}</span>
              </div>
            ))}
          </div>
          <ProofPayload markerId="rt-20260328-001" channel="audit-log" />
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ MCP Comparison ━━ */}
      <Section
        id="mcp-comparison"
        title="MCP Dual-Layer Comparison"
        desc="View 2 · 用户可见描述 vs LLM 实际接收——高亮隐藏指令"
      >
        <McpComparison tools={MCP_TOOLS} />
      </Section>

      <SectionDivider />

      {/* ━━ Supply Chain ━━ */}
      <Section
        id="supply-chain"
        title="Skills Supply Chain"
        desc="View 2b · SKILL.md 威胁扫描——隐藏 Shell 指令、凭证收割、版本时间线"
      >
        <SkillSupplyChain results={SKILL_RESULTS} />
      </Section>

      <SectionDivider />

      {/* ━━ Metrics ━━ */}
      <Section
        id="metrics"
        title="Security Metrics"
        desc="6 大量化安全指标——数字上涨动画 + 学术参考基准"
      >
        <MetricCardGrid metrics={METRICS} />
      </Section>

      <SectionDivider />

      {/* ━━ Fix Points ━━ */}
      <Section
        id="fix-points"
        title="Fix Control Points"
        desc="View 4 · 代码行级精确定位"
      >
        <div className="space-y-4">
          <FixControlPoints points={FIX_POINTS} />
          <div className="border border-dashed p-4">
            <p className="font-mono text-[10px] text-muted-foreground">
              修复这两个 CRITICAL 点：攻击链断裂 · 覆盖率 91% → 预计 94%
            </p>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Stewie Breach Modal ━━ */}
      <Section
        id="breach-modal"
        title="Stewie Breach Modal"
        desc="攻击成功时弹出——Stewie 竖中指 + Family Guy 台词 + 攻击详情"
      >
        <div className="space-y-4">
          <Button
            variant="destructive"
            className="rounded-none"
            onClick={() => setBreachOpen(true)}
          >
            触发 Breach Alert
          </Button>
          <StewieBreachModal
            open={breachOpen}
            onOpenChange={setBreachOpen}
            attackPath="indirect injection → file_reader → email_sender"
          />
          <p className="text-xs text-muted-foreground">
            每次打开随机选取 Stewie 台词和攻击文案。模态框入场使用 anime.js outBack 弹性动画。
          </p>
        </div>
      </Section>
    </div>
  );
}
