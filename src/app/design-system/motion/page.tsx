/**
 * [INPUT]: 依赖 _components/section, _components/motion-demos (dynamic)
 * [OUTPUT]: Motion Design System 页（动画哲学 + 时间尺度 + 缓动 + 微交互 + 序列 + 品牌动效 + tokens）
 * [POS]: design-system/motion 的入口，集成 18 个动画 skill 的知识体系
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import dynamic from "next/dynamic";
import { Section, SectionDivider, SubHeading } from "../_components/section";

/* ─────────────────────────────────────────────
 * 动态导入（client components）
 * ───────────────────────────────────────────── */

const TimingBar = dynamic(
  () => import("../_components/motion-demos").then((m) => m.TimingBar),
  { ssr: false }
);
const EasingPreview = dynamic(
  () => import("../_components/motion-demos").then((m) => m.EasingPreview),
  { ssr: false }
);
const MicroDemo = dynamic(
  () => import("../_components/motion-demos").then((m) => m.MicroDemo),
  { ssr: false }
);
const StaggerDemo = dynamic(
  () => import("../_components/motion-demos").then((m) => m.StaggerDemo),
  { ssr: false }
);
const BrandMotionDemo = dynamic(
  () => import("../_components/motion-demos").then((m) => m.BrandMotionDemo),
  { ssr: false }
);
const TimelineDemo = dynamic(
  () => import("../_components/motion-demos").then((m) => m.TimelineDemo),
  { ssr: false }
);

/* ─────────────────────────────────────────────
 * 静态数据
 * ───────────────────────────────────────────── */

const DISNEY_PRINCIPLES = [
  { name: "Squash & Stretch", impl: "scaleX/scaleY 压缩拉伸，保持体积守恒" },
  { name: "Anticipation", impl: "动作前的微小反向预备，20-100ms" },
  { name: "Staging", impl: "运动层级：主角先动，配角跟随" },
  { name: "Follow Through", impl: "stagger 延迟，子元素在父元素停止后继续" },
  { name: "Slow In / Slow Out", impl: "ease-out 主导，永远不用 linear" },
  { name: "Arc", impl: "translateX + translateY 不同缓动模拟弧线" },
  { name: "Secondary Action", impl: "阴影、光晕响应主动作" },
  { name: "Timing", impl: "micro 100-200ms · standard 200-400ms · complex 400-700ms" },
  { name: "Exaggeration", impl: "scale 1.05-1.15，不超过 1.2" },
  { name: "Appeal", impl: "60fps · transform/opacity only · 有意图的运动" },
] as const;

const MOTION_TOKENS = [
  { token: "--duration-instant", value: "100ms", usage: "hover 反馈、tooltip" },
  { token: "--duration-micro", value: "150ms", usage: "按钮点击、开关" },
  { token: "--duration-small", value: "200ms", usage: "图标变换、badge" },
  { token: "--duration-standard", value: "300ms", usage: "下拉、展开" },
  { token: "--duration-medium", value: "400ms", usage: "模态框、抽屉" },
  { token: "--duration-large", value: "500ms", usage: "页面过渡" },
  { token: "--duration-complex", value: "700ms", usage: "编排序列" },
  { token: "--ease-standard", value: "cubic-bezier(0.4,0,0.2,1)", usage: "通用过渡" },
  { token: "--ease-enter", value: "cubic-bezier(0,0,0.2,1)", usage: "元素入场" },
  { token: "--ease-exit", value: "cubic-bezier(0.4,0,1,1)", usage: "元素离场" },
  { token: "--ease-spring", value: "cubic-bezier(0.34,1.56,0.64,1)", usage: "弹性反馈" },
  { token: "--ease-power", value: "cubic-bezier(0.0,0,0.2,1)", usage: "力量感入场" },
] as const;

const ANTI_HERO_RULES = [
  { rule: "动效服务信息传递", detail: "每个动画必须帮助用户理解状态变化，装饰性动画一律删除" },
  { rule: "暗色优先", detail: "动效在暗色背景上设计，光晕/脉冲效果用 oklch 颜色空间" },
  { rule: "终端美学", detail: "打字机效果、光标闪烁、逐行出现——模拟 CLI 的节奏感" },
  { rule: "严重性语义", detail: "critical 红色脉冲 · high 橙色 · medium 黄色 · low 绿色 · info 蓝色" },
  { rule: "prefers-reduced-motion", detail: "所有动画必须检查 matchMedia，尊重用户的无障碍设置" },
  { rule: "GPU 加速", detail: "只用 transform + opacity，不动 width/height/top/left" },
] as const;

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function MotionPage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Motion Design System</h1>
        <p className="text-sm text-muted-foreground">
          基于 anime.js + Disney 12 原则的动画设计体系——动效即性格，运动即语言
        </p>
      </div>

      {/* ━━ Philosophy ━━ */}
      <Section id="philosophy" title="Philosophy" desc="动画的哲学基础——为什么动、何时动、怎么动">
        <div className="space-y-8">

          {/* Anti-Hero 动效原则 */}
          <div>
            <SubHeading>ANTI-HERO MOTION RULES</SubHeading>
            <div className="border divide-y">
              {ANTI_HERO_RULES.map((r) => (
                <div key={r.rule} className="grid grid-cols-[180px_1fr] gap-4 px-4 py-3">
                  <span className="font-mono text-xs font-medium">{r.rule}</span>
                  <span className="text-xs text-muted-foreground">{r.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disney 12 原则 */}
          <div>
            <SubHeading>DISNEY 12 PRINCIPLES · WEB IMPL</SubHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DISNEY_PRINCIPLES.map((p) => (
                <div key={p.name} className="border border-border p-3">
                  <p className="font-mono text-xs font-medium mb-1">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.impl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 认知模型 */}
          <div>
            <SubHeading>COGNITIVE MODEL</SubHeading>
            <div className="border p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { range: "0–100ms", label: "感知不到", note: "系统响应阈值" },
                  { range: "100–300ms", label: "感知到了", note: "微交互甜区" },
                  { range: "300–1000ms", label: "在等待", note: "需要反馈指示" },
                ].map((c) => (
                  <div key={c.range} className="border border-dashed p-3">
                    <p className="font-mono text-xs font-medium">{c.range}</p>
                    <p className="text-sm mt-1">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{c.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground border-t pt-3">
                动画的本质是时间的雕塑。快到感知不到的动画是系统响应；
                慢到需要等待的动画是加载状态；中间的 100-300ms 是动效设计师的战场。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Timing Scale ━━ */}
      <Section id="timing" title="Timing Scale" desc="100ms 到 1s 的节奏选择——点击播放感受差异">
        <TimingBar />
      </Section>

      <SectionDivider />

      {/* ━━ Easing Library ━━ */}
      <Section id="easing" title="Easing Library" desc="anime.js 缓动曲线——点击行播放">
        <div className="space-y-6">
          <EasingPreview />
          <div>
            <SubHeading>EASING DECISION TREE</SubHeading>
            <div className="border p-4 space-y-2">
              {[
                { q: "元素入场？", a: "outCubic / outBack（有弹性）" },
                { q: "元素离场？", a: "inCubic（快速消失）" },
                { q: "状态切换？", a: "inOutCubic（双向平滑）" },
                { q: "成功反馈？", a: "outBack（轻微超调）" },
                { q: "错误抖动？", a: "outElastic（强烈弹性）" },
                { q: "数据加载？", a: "inOutSine（呼吸感）" },
                { q: "力量感入场？", a: "cubicBezier(0.0,0,0.2,1)（急加速）" },
              ].map((item) => (
                <div key={item.q} className="flex gap-4">
                  <span className="font-mono text-xs text-muted-foreground w-28 shrink-0">{item.q}</span>
                  <span className="font-mono text-xs">{item.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Micro Interactions ━━ */}
      <Section id="micro" title="Micro Interactions" desc="100-300ms 的精妙——快到几乎察觉不到但能感知">
        <MicroDemo />
      </Section>

      <SectionDivider />

      {/* ━━ Sequences ━━ */}
      <Section id="sequences" title="Sequences" desc="编排序列——多元素像交响乐一样协同运动">
        <div className="space-y-8">
          <div>
            <SubHeading>STAGGER PATTERNS</SubHeading>
            <StaggerDemo />
          </div>
          <div>
            <SubHeading>ATTACK TIMELINE · createTimeline</SubHeading>
            <TimelineDemo />
          </div>
          <div>
            <SubHeading>STAGGER STRATEGIES</SubHeading>
            <div className="border divide-y">
              {[
                { name: "linear", delay: "stagger(80)", desc: "等间距，整齐感" },
                { name: "cascade", delay: "stagger(60, { start: 0 })", desc: "瀑布流，自然感" },
                { name: "wave", delay: "stagger(50, { from: 'center' })", desc: "从中心扩散，聚焦感" },
                { name: "grid", delay: "stagger(30, { grid: [4,3] })", desc: "二维网格，空间感" },
              ].map((s) => (
                <div key={s.name} className="grid grid-cols-[80px_1fr_1fr] gap-4 px-4 py-2.5">
                  <span className="font-mono text-xs font-medium">{s.name}</span>
                  <code className="font-mono text-[10px] text-muted-foreground">{s.delay}</code>
                  <span className="text-xs text-muted-foreground">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Brand Motion ━━ */}
      <Section id="brand-motion" title="Brand Motion" desc="动画即性格——4 种品牌调性的动效表达">
        <div className="space-y-6">
          <BrandMotionDemo />
          <div>
            <SubHeading>ANTI-HERO BRAND PROFILE</SubHeading>
            <div className="border p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">PRIMARY STYLE</p>
                  <p className="font-pixel-square text-sm">Power + Professionalism</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    稳重果断的入场 + 克制精准的过渡
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">SECONDARY STYLE</p>
                  <p className="font-pixel-square text-sm">SaaS Productivity</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    工作流中快速清晰，不打扰用户专注
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-2">EXCEPTION: BREACH ALERT</p>
                <p className="text-xs text-muted-foreground">
                  攻击成功时使用 outBack 弹性 + 红色脉冲——这是唯一允许「夸张」的场景。
                  Stewie 模态框是品牌个性的极端表达，其他场景保持克制。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Motion Tokens ━━ */}
      <Section id="tokens" title="Motion Tokens" desc="动效设计 token——统一时间与缓动的语言">
        <div className="space-y-6">
          <div>
            <SubHeading>DURATION TOKENS</SubHeading>
            <div className="border divide-y">
              <div className="grid grid-cols-[180px_100px_1fr] gap-4 px-4 py-2 bg-muted/30">
                <span className="font-mono text-[10px] text-muted-foreground">TOKEN</span>
                <span className="font-mono text-[10px] text-muted-foreground">VALUE</span>
                <span className="font-mono text-[10px] text-muted-foreground">USAGE</span>
              </div>
              {MOTION_TOKENS.filter((t) => t.token.startsWith("--duration")).map((t) => (
                <div key={t.token} className="grid grid-cols-[180px_100px_1fr] gap-4 px-4 py-2.5">
                  <code className="font-mono text-xs">{t.token}</code>
                  <span className="font-mono text-xs text-[var(--severity-info)]">{t.value}</span>
                  <span className="text-xs text-muted-foreground">{t.usage}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>EASING TOKENS</SubHeading>
            <div className="border divide-y">
              <div className="grid grid-cols-[180px_1fr_120px] gap-4 px-4 py-2 bg-muted/30">
                <span className="font-mono text-[10px] text-muted-foreground">TOKEN</span>
                <span className="font-mono text-[10px] text-muted-foreground">VALUE</span>
                <span className="font-mono text-[10px] text-muted-foreground">USAGE</span>
              </div>
              {MOTION_TOKENS.filter((t) => t.token.startsWith("--ease")).map((t) => (
                <div key={t.token} className="grid grid-cols-[180px_1fr_120px] gap-4 px-4 py-2.5">
                  <code className="font-mono text-xs">{t.token}</code>
                  <code className="font-mono text-[10px] text-muted-foreground">{t.value}</code>
                  <span className="text-xs text-muted-foreground">{t.usage}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>ANIME.JS QUICK REFERENCE</SubHeading>
            <div className="border bg-[oklch(0.11_0_0)] p-4">
              <pre className="font-mono text-[11px] text-[oklch(0.75_0_0)] leading-relaxed overflow-x-auto">{`import { animate, stagger, createTimeline } from "animejs";

// 单元素入场
animate(el, {
  opacity: [0, 1],
  translateY: [-8, 0],
  duration: 300,
  ease: "outCubic",
});

// stagger 列表
animate(items, {
  opacity: [0, 1],
  translateY: [-12, 0],
  delay: stagger(80),
  duration: 350,
  ease: "outCubic",
});

// timeline 序列
const tl = createTimeline();
tl.add(el1, { translateX: [0, 100], duration: 300 }, 0);
tl.add(el2, { opacity: [0, 1], duration: 200 }, 200);

// 检查 prefers-reduced-motion（必须）
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;`}</pre>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
