/**
 * [INPUT]: 依赖 dashboard 组件, _components/section, _components/dashboard-data
 * [OUTPUT]: Dashboard 组件展示页
 * [POS]: design-system/dashboard 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import dynamic from "next/dynamic";
import { Section, SectionDivider, SubHeading } from "../_components/section";
import { McpComparison } from "@/components/dashboard/mcp-comparison";
import { SkillSupplyChain } from "@/components/dashboard/skill-supply-chain";
import { FixControlPoints } from "@/components/dashboard/fix-control-points";
import {
  ATTACK_NODES, ATTACK_EDGES, TERMINAL_LINES,
  MCP_TOOLS, SKILL_RESULTS, METRICS, FIX_POINTS,
} from "../_components/dashboard-data";

/* ── 客户端组件动态导入（SSR 安全） ── */

const AttackChainGraph = dynamic(
  () => import("@/components/dashboard/attack-chain-graph").then((m) => m.AttackChainGraph),
  { ssr: false, loading: () => <div className="h-[400px] w-full border bg-muted/20 animate-pulse" /> },
);

const TerminalOutput = dynamic(
  () => import("@/components/dashboard/terminal-output").then((m) => m.TerminalOutput),
  { ssr: false, loading: () => <div className="h-[300px] w-full border bg-muted/20 animate-pulse" /> },
);

const ProofPayload = dynamic(
  () => import("@/components/dashboard/proof-payload").then((m) => m.ProofPayload),
  { ssr: false },
);

const MetricCardGrid = dynamic(
  () => import("@/components/dashboard/metric-card-grid").then((m) => m.MetricCardGrid),
  { ssr: false, loading: () => <div className="h-[200px] w-full border bg-muted/20 animate-pulse" /> },
);

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          攻击链可视化、CLI 日志、MCP 双层对照、供应链扫描、安全指标——
          用 React Flow + Anime.js 呈现红队测试全流程
        </p>
      </div>

      {/* ━━ Attack Chain Graph ━━ */}
      <Section
        id="attack-chain"
        title="Attack Chain Graph"
        desc="View 1 · React Flow 有向图——注入→工具→数据流→外泄，节点按严重性着色"
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
          <SubHeading>交互设计</SubHeading>
          <p className="text-xs text-muted-foreground">
            点击节点展开「如果在此处添加防御，攻击链在何处断裂」分析。
            边的虚线流动动画表示数据流方向。节点入场使用 anime.js 级联 ease-out 动画。
          </p>
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
        desc="View 2 · 用户可见描述 vs LLM 实际接收——高亮隐藏指令，证明 MCP 投毒"
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
        desc="View 4 · 代码行级精确定位——不是泛泛的「添加输入校验」，而是 file.py:23"
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
    </div>
  );
}
