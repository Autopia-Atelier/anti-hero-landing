/**
 * [INPUT]: 依赖 ui/button, ui/badge, ui/separator, ui/spinner, globals.css tokens
 * [OUTPUT]: 对外提供 Design System 展示页
 * [POS]: app/design-system 的入口，设计系统文档与组件展览
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowRight,
  Shield,
  Terminal,
  Zap,
  Eye,
  Lock,
  Bug,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
 * 数据定义
 * ───────────────────────────────────────────── */

const SEMANTIC_COLORS = [
  { name: "background", var: "--background", desc: "页面底色" },
  { name: "foreground", var: "--foreground", desc: "主文字" },
  { name: "primary", var: "--primary", desc: "主操作色" },
  { name: "secondary", var: "--secondary", desc: "次级元素" },
  { name: "muted", var: "--muted", desc: "弱化背景" },
  { name: "muted-fg", var: "--muted-foreground", desc: "弱化文字" },
  { name: "accent", var: "--accent", desc: "强调背景" },
  { name: "destructive", var: "--destructive", desc: "危险/错误" },
  { name: "border", var: "--border", desc: "边框" },
  { name: "input", var: "--input", desc: "输入框边框" },
  { name: "ring", var: "--ring", desc: "焦点环" },
  { name: "card", var: "--card", desc: "卡片背景" },
] as const;

const CHART_COLORS = [
  { name: "chart-1", var: "--chart-1" },
  { name: "chart-2", var: "--chart-2" },
  { name: "chart-3", var: "--chart-3" },
  { name: "chart-4", var: "--chart-4" },
  { name: "chart-5", var: "--chart-5" },
] as const;

const RADIUS_SCALE = [
  { name: "sm", class: "rounded-sm" },
  { name: "md", class: "rounded-md" },
  { name: "lg", class: "rounded-lg" },
  { name: "xl", class: "rounded-xl" },
  { name: "2xl", class: "rounded-2xl" },
  { name: "3xl", class: "rounded-3xl" },
  { name: "full", class: "rounded-full" },
] as const;

const SPACING_SCALE = [
  { name: "1", size: "0.25rem", px: "4px" },
  { name: "2", size: "0.5rem", px: "8px" },
  { name: "3", size: "0.75rem", px: "12px" },
  { name: "4", size: "1rem", px: "16px" },
  { name: "6", size: "1.5rem", px: "24px" },
  { name: "8", size: "2rem", px: "32px" },
  { name: "12", size: "3rem", px: "48px" },
  { name: "16", size: "4rem", px: "64px" },
] as const;

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
] as const;

/* ─────────────────────────────────────────────
 * 布局组件
 * ───────────────────────────────────────────── */

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <h2 className="font-pixel-square text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="relative py-2">
      <Separator />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "6px 6px",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * 色板展示
 * ───────────────────────────────────────────── */

function ColorSwatch({
  name,
  cssVar,
  desc,
}: {
  name: string;
  cssVar: string;
  desc?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 shrink-0 border border-border"
        style={{ background: `var(${cssVar})` }}
      />
      <div className="min-w-0">
        <p className="font-mono text-xs font-medium">{name}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{cssVar}</p>
        {desc && (
          <p className="text-[10px] text-muted-foreground/70">{desc}</p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * 导航
 * ───────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "components", label: "Components" },
  { id: "motion", label: "Motion" },
  { id: "icons", label: "Icons" },
] as const;

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen">
      {/* ── 顶栏 ── */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-pixel-square text-sm hover:text-muted-foreground transition-colors"
          >
            ← Anti Hero
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            v0.1.0 · Anti Hero Design System
          </p>
          <h1 className="font-pixel-square text-4xl md:text-5xl lg:text-6xl">
            Design System
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Anti-Hero 的视觉语言——为 AI Agent
            红队安全测试而生。暗黑技术感、终端美学、精准克制的动效。
            不是企业合规仪表盘，是渗透测试者的工具台。
          </p>
        </div>
      </div>

      {/* ── 内容 ── */}
      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">
        {/* ━━ Colors ━━ */}
        <Section
          id="colors"
          title="Colors"
          desc="基于 OKLCH 色彩空间的语义色板，支持 light/dark 自适应"
        >
          <div className="space-y-8">
            {/* 语义色 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                SEMANTIC TOKENS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SEMANTIC_COLORS.map((c) => (
                  <ColorSwatch
                    key={c.var}
                    name={c.name}
                    cssVar={c.var}
                    desc={c.desc}
                  />
                ))}
              </div>
            </div>

            {/* 图表色 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                CHART PALETTE
              </h3>
              <div className="flex gap-1">
                {CHART_COLORS.map((c) => (
                  <div key={c.var} className="flex-1 space-y-2">
                    <div
                      className="h-16 w-full border border-border"
                      style={{ background: `var(${c.var})` }}
                    />
                    <p className="font-mono text-[10px] text-center text-muted-foreground">
                      {c.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ━━ Typography ━━ */}
        <Section
          id="typography"
          title="Typography"
          desc="三字体族体系：Sans 阅读、Mono 代码、Pixel Square 品牌标识"
        >
          <div className="space-y-8">
            {/* Geist Sans */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                GEIST SANS · 默认阅读字体
              </h3>
              <div className="space-y-1 border p-6">
                <p className="text-4xl font-light">
                  The quick brown fox jumps
                </p>
                <p className="text-2xl">over the lazy dog</p>
                <p className="text-base">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                  0123456789
                </p>
                <p className="text-sm text-muted-foreground">
                  font-sans · Geist Sans · 正文、描述、界面文字
                </p>
              </div>
            </div>

            {/* Geist Mono */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                GEIST MONO · 代码与数据
              </h3>
              <div className="space-y-1 border p-6 font-mono">
                <p className="text-4xl font-light">
                  The quick brown fox jumps
                </p>
                <p className="text-2xl">over the lazy dog</p>
                <p className="text-base">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                  0123456789
                </p>
                <p className="text-sm text-muted-foreground">
                  font-mono · Geist Mono · 代码块、终端输出、技术数据
                </p>
              </div>
            </div>

            {/* Pixel Square */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                PIXEL SQUARE · 品牌标识
              </h3>
              <div className="space-y-1 border p-6 font-pixel-square">
                <p className="text-4xl">The quick brown fox jumps</p>
                <p className="text-2xl">over the lazy dog</p>
                <p className="text-base">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                  0123456789
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  font-pixel-square · Geist Pixel Square · 标题、品牌、强调
                </p>
              </div>
            </div>

            {/* 字号阶梯 */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                TYPE SCALE
              </h3>
              <div className="border divide-y">
                {[
                  { cls: "text-xs", label: "xs · 12px" },
                  { cls: "text-sm", label: "sm · 14px" },
                  { cls: "text-base", label: "base · 16px" },
                  { cls: "text-lg", label: "lg · 18px" },
                  { cls: "text-xl", label: "xl · 20px" },
                  { cls: "text-2xl", label: "2xl · 24px" },
                  { cls: "text-3xl", label: "3xl · 30px" },
                  { cls: "text-4xl", label: "4xl · 36px" },
                ].map((t) => (
                  <div key={t.cls} className="flex items-baseline gap-4 px-6 py-3">
                    <span className="w-24 shrink-0 font-mono text-[10px] text-muted-foreground">
                      {t.label}
                    </span>
                    <span className={t.cls}>Anti Hero</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ━━ Spacing & Radius ━━ */}
        <Section
          id="spacing"
          title="Spacing & Radius"
          desc="基于 4px 基准的间距系统，以及从 --radius 派生的圆角阶梯"
        >
          <div className="space-y-8">
            {/* 间距 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                SPACING SCALE
              </h3>
              <div className="space-y-2">
                {SPACING_SCALE.map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <span className="w-12 shrink-0 font-mono text-[10px] text-muted-foreground text-right">
                      {s.name}
                    </span>
                    <div
                      className="h-3 bg-primary/80"
                      style={{ width: s.size }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {s.size} · {s.px}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 圆角 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                RADIUS SCALE · base: 0.625rem
              </h3>
              <div className="flex flex-wrap gap-4">
                {RADIUS_SCALE.map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div
                      className={`size-16 border-2 border-primary/60 ${r.class}`}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {r.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ━━ Components ━━ */}
        <Section
          id="components"
          title="Components"
          desc="基于 shadcn/ui + Radix 的组件库，CVA 驱动 variant 系统"
        >
          <div className="space-y-10">
            {/* Button */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                BUTTON · 6 variants × 4 sizes
              </h3>

              {/* 按 variant 展示 */}
              <div className="border p-6 space-y-6">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-3">
                    Variants
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {BUTTON_VARIANTS.map((v) => (
                      <Button key={v} variant={v}>
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-3">
                    Sizes
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {BUTTON_SIZES.map((s) => (
                      <Button key={s} size={s}>
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-3">
                    With Icon
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <ArrowRight /> 继续
                    </Button>
                    <Button variant="outline">
                      <Terminal /> 终端
                    </Button>
                    <Button variant="destructive">
                      <Bug /> 攻击
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-3">
                    States
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button>
                      <Spinner className="size-4" /> Loading
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Anti-Hero 风格按钮 */}
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-3">
                    Anti-Hero Style · 直角 + 角标装饰
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="relative w-fit group">
                      <Button className="rounded-none relative overflow-hidden h-8 px-3 py-1">
                        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                        Primary Action
                      </Button>
                      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-r bottom-0 right-0" />
                      <span className="absolute h-2 w-2 border-foreground border-dashed border-b border-l bottom-0 left-0" />
                      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-r top-0 right-0" />
                      <span className="absolute h-2 w-2 border-foreground border-dashed border-t border-l top-0 left-0" />
                    </div>
                    <div className="relative w-fit group">
                      <Button
                        variant="outline"
                        className="rounded-none relative overflow-hidden h-8 px-3 py-1 border-dashed"
                      >
                        <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                        Secondary Action
                      </Button>
                      <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
                      <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
                      <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
                      <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                BADGE
              </h3>
              <div className="border p-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  {BADGE_VARIANTS.map((v) => (
                    <Badge key={v} variant={v}>
                      {v}
                    </Badge>
                  ))}
                </div>
                <Separator />
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping bg-green-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 bg-green-500" />
                    </span>
                    Running
                  </Badge>
                  <Badge variant="destructive" className="gap-1.5">
                    <Bug className="size-3" />
                    Vulnerability
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5">
                    <Shield className="size-3" />
                    Protected
                  </Badge>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                SEPARATOR
              </h3>
              <div className="border p-6 space-y-4">
                <Separator />
                <div className="flex items-center gap-4 h-6">
                  <span className="text-sm">左</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm">中</span>
                  <Separator orientation="vertical" />
                  <span className="text-sm">右</span>
                </div>
              </div>
            </div>

            {/* Spinner */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-medium text-muted-foreground">
                SPINNER
              </h3>
              <div className="border p-6">
                <div className="flex items-center gap-6">
                  <Spinner className="size-4" />
                  <Spinner className="size-6" />
                  <Spinner className="size-8" />
                  <Spinner className="size-10 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ━━ Motion ━━ */}
        <Section
          id="motion"
          title="Motion"
          desc="动效系统：入场动画、交互反馈、攻击流程可视化"
        >
          <div className="space-y-8">
            {/* 已有动画 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                KEYFRAME ANIMATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border p-6 space-y-3">
                  <p className="font-mono text-xs font-medium">tech-fade-in</p>
                  <p className="text-[10px] text-muted-foreground">
                    入场：opacity + translateY + scale + blur
                  </p>
                  <div
                    className="h-12 w-full bg-primary/20 border border-primary/30"
                    style={{
                      animation: "tech-fade-in 1.5s ease-out infinite",
                    }}
                  />
                </div>
                <div className="border p-6 space-y-3">
                  <p className="font-mono text-xs font-medium">
                    ping-sequence
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    状态指示：双拍 ping 脉冲
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="relative flex h-3 w-3">
                      <span
                        className="absolute inline-flex h-full w-full bg-foreground opacity-75"
                        style={{
                          animation: "ping-sequence 2s linear infinite",
                        }}
                      />
                      <span className="relative inline-flex h-3 w-3 bg-foreground" />
                    </span>
                    <span className="relative flex h-3 w-3">
                      <span
                        className="absolute inline-flex h-full w-full bg-destructive opacity-75"
                        style={{
                          animation: "ping-sequence 2s linear infinite 0.5s",
                        }}
                      />
                      <span className="relative inline-flex h-3 w-3 bg-destructive" />
                    </span>
                  </div>
                </div>
                <div className="border p-6 space-y-3">
                  <p className="font-mono text-xs font-medium">
                    rotate-sequence
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    阶梯旋转：0° → 45° → 90°
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="size-6 border-2 border-foreground"
                      style={{
                        animation: "rotate-sequence 2s linear infinite",
                      }}
                    />
                  </div>
                </div>
                <div className="group border p-6 space-y-3 cursor-pointer">
                  <p className="font-mono text-xs font-medium">shine</p>
                  <p className="text-[10px] text-muted-foreground">
                    Hover 触发光泽扫过效果
                  </p>
                  <div className="relative h-12 w-full bg-primary/20 border border-primary/30 overflow-hidden">
                    <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* 规划中 */}
            <div>
              <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
                PLANNED · 攻击流程可视化
              </h3>
              <div className="border border-dashed p-6 space-y-4">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-mono text-xs font-medium">
                        anime.js
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        攻击执行过程的精细动画编排
                      </p>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="flex items-center gap-2">
                    <Eye className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-mono text-xs font-medium">
                        React Flow
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        任务流图、攻击路径拓扑可视化
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  动效原则：克制、精准、有信息量。动画服务于理解，不服务于装饰。
                </p>
              </div>
            </div>
          </div>
        </Section>

        <SectionDivider />

        {/* ━━ Icons ━━ */}
        <Section
          id="icons"
          title="Iconography"
          desc="基于 Lucide React 图标库，线性风格 + 1.5px 描边"
        >
          <div className="space-y-4">
            <div className="border p-6">
              <p className="font-mono text-[10px] text-muted-foreground mb-4">
                安全领域常用图标
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {[
                  { Icon: Shield, name: "Shield" },
                  { Icon: Lock, name: "Lock" },
                  { Icon: Bug, name: "Bug" },
                  { Icon: Terminal, name: "Terminal" },
                  { Icon: Eye, name: "Eye" },
                  { Icon: Zap, name: "Zap" },
                  { Icon: ArrowRight, name: "ArrowRight" },
                ].map(({ Icon, name }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 py-2"
                  >
                    <Icon className="size-5" />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border p-6">
              <p className="font-mono text-[10px] text-muted-foreground mb-4">
                SIZE SCALE
              </p>
              <div className="flex items-end gap-6">
                {[
                  { size: "size-3", label: "12px" },
                  { size: "size-4", label: "16px" },
                  { size: "size-5", label: "20px" },
                  { size: "size-6", label: "24px" },
                  { size: "size-8", label: "32px" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <Shield className={s.size} />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Footer ── */}
        <div className="border-t pt-8 pb-16">
          <p className="font-mono text-xs text-muted-foreground">
            Anti Hero Design System · 基于 shadcn/ui + Tailwind v4 + OKLCH ·
            切换主题查看 light/dark 适配
          </p>
        </div>
      </main>
    </div>
  );
}
