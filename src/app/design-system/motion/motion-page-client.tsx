"use client";

/**
 * [INPUT]: 依赖 _components/section, _components/motion-demos (dynamic)
 * [OUTPUT]: Motion Design System 页（动画哲学 + 时间尺度 + 缓动 + 微交互 + 序列 + 品牌动效 + tokens）
 * [POS]: design-system/motion 的入口，集成 18 个动画 skill 的知识体系
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Section, SectionDivider, SubHeading } from "../_components/section";
import {
  TimingBar,
  EasingPreview,
  MicroDemo,
  StaggerDemo,
  BrandMotionDemo,
  TimelineDemo,
} from "../_components/motion-demos";

/* ─────────────────────────────────────────────
 * 静态数据
 * ───────────────────────────────────────────── */

const DISNEY_PRINCIPLES = [
  { name: "Squash & Stretch", impl: "scaleX/scaleY 压缩拉伸，保持体积守恒。快速运动 = 更多拉伸，冲击 = 瞬间压缩" },
  { name: "Anticipation", impl: "动作前的微小反向预备 20-100ms。像猎豹扑击前的蓄力——不是犹豫，是聚力" },
  { name: "Staging", impl: "主角先动，配角跟随。运动层级清晰，不让次要元素抢夺注意力" },
  { name: "Follow Through", impl: "stagger 延迟，子元素在父元素停止后继续运动。重物不会突然停止" },
  { name: "Slow In / Slow Out", impl: "ease-out 主导，永远不用 linear。时间在边缘是弹性的" },
  { name: "Arc", impl: "translateX + translateY 不同缓动模拟弧线。力量走直线，优雅走弧线" },
  { name: "Secondary Action", impl: "阴影、光晕、背景响应主动作。当力量落地，环境要有反应" },
  { name: "Timing", impl: "micro 100-200ms · standard 200-400ms · complex 400-700ms。帧数决定重量感" },
  { name: "Exaggeration", impl: "scale 1.05-1.15，不超过 1.2。放大冲击，不放大运动过程" },
  { name: "Appeal", impl: "60fps · transform/opacity only · 有意图的运动。节奏感让动画有生命" },
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

export function MotionPageClient() {
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

          {/* Timing Mastery */}
          <div>
            <SubHeading>TIMING MASTERY · 像鼓手一样思考</SubHeading>
            <div className="border p-6 space-y-4">
              <p className="text-xs text-muted-foreground">
                动画是节奏的可视化。帧与帧之间的间隔，和帧本身一样重要。
                同样的运动，不同的速度讲述完全不同的故事：
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { speed: "Fast", feel: "轻盈 · 紧迫 · 喜剧感", color: "var(--severity-low)" },
                  { speed: "Medium", feel: "自信 · 专业 · 有意图", color: "var(--severity-info)" },
                  { speed: "Slow", feel: "沉重 · 戏剧性 · 深思熟虑", color: "var(--severity-medium)" },
                ].map((s) => (
                  <div key={s.speed} className="border p-3 text-center">
                    <p className="font-mono text-xs font-medium" style={{ color: s.color }}>{s.speed}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{s.feel}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-1">
                <p className="font-mono text-[10px] text-muted-foreground mb-2">GOLDEN RULE</p>
                <p className="text-xs">
                  <span className="font-medium">时间是相对的。</span>
                  <span className="text-muted-foreground"> 快只有在慢的衬托下才显得快。建立对比——让安静的时刻放大喧嚣的时刻。笑点前的停顿，才是让它落地的原因。</span>
                </p>
              </div>
            </div>
          </div>

          {/* Rhythm & Pacing */}
          <div>
            <SubHeading>RHYTHM & PACING · 像作曲家一样编排</SubHeading>
            <div className="border p-6 space-y-4">
              <p className="text-xs text-muted-foreground">
                动画是视觉音乐。节拍、小节、渐强、休止——都可以转化为运动与静止的时间编排。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">MUSICAL TERMS</p>
                  <div className="space-y-1">
                    {[
                      { term: "Accelerando", def: "加速——向高潮推进" },
                      { term: "Ritardando", def: "减速——进入解决段" },
                      { term: "Fermata", def: "延长停顿——比预期更久的 hold" },
                      { term: "Staccato", def: "短促有力——快速弹性动作" },
                      { term: "Legato", def: "连贯流畅——平滑过渡" },
                    ].map((m) => (
                      <div key={m.term} className="flex gap-3">
                        <span className="font-mono text-[10px] w-24 shrink-0 text-[var(--severity-info)]">{m.term}</span>
                        <span className="text-[10px] text-muted-foreground">{m.def}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">SCENE STRUCTURE</p>
                  <div className="space-y-1">
                    {[
                      { phase: "Opening", action: "建立节奏基调" },
                      { phase: "Development", action: "在基调内变化" },
                      { phase: "Climax", action: "最快或最强烈" },
                      { phase: "Resolution", action: "回归平静或新节奏" },
                    ].map((s) => (
                      <div key={s.phase} className="flex gap-3">
                        <span className="font-mono text-[10px] w-24 shrink-0 text-muted-foreground">{s.phase}</span>
                        <span className="text-[10px]">{s.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-xs">
                  <span className="font-medium">节奏 = 预期 + 惊喜。</span>
                  <span className="text-muted-foreground"> 建立模式让观众感受到节拍，然后在完美的时机打破它。艺术在于知道何时可预测，何时切分。</span>
                </p>
              </div>
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
                { name: "linear", delay: "stagger(80)", desc: "等间距，整齐感。适合列表、表格行" },
                { name: "cascade", delay: "stagger(60, { start: 0 })", desc: "瀑布流，自然感。适合卡片网格" },
                { name: "wave", delay: "stagger(50, { from: 'center' })", desc: "从中心扩散，聚焦感。适合 hero 区域" },
                { name: "grid", delay: "stagger(30, { grid: [4,3] })", desc: "二维网格，空间感。适合图标矩阵" },
                { name: "accelerating", delay: "delays: [0, 80, 140, 180]", desc: "越来越快，紧迫感。适合 loading 序列" },
                { name: "decelerating", delay: "delays: [0, 40, 100, 180]", desc: "越来越慢，沉淀感。适合结果展示" },
              ].map((s) => (
                <div key={s.name} className="grid grid-cols-[90px_1fr_1fr] gap-4 px-4 py-2.5">
                  <span className="font-mono text-xs font-medium">{s.name}</span>
                  <code className="font-mono text-[10px] text-muted-foreground">{s.delay}</code>
                  <span className="text-xs text-muted-foreground">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>ORCHESTRATION PRINCIPLE</SubHeading>
            <div className="border p-4 space-y-3">
              <p className="text-xs text-muted-foreground">
                编排是时间中的构图。就像视觉设计在空间中排列元素，动画编排在时间中排列运动。
                目标是一个连贯的整体表演，而不是一堆独立动画的集合。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-1">HIERARCHY</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>主角先动，配角跟随</li>
                    <li>同一缓动家族保持一致</li>
                    <li>主元素更夸张，支撑元素更克制</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-1">COHESION</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>不要混用弹性和刚性风格</li>
                    <li>元素运动方向要互补，不要随机</li>
                    <li>每个元素在构图中都有角色</li>
                  </ul>
                </div>
              </div>
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
            <SubHeading>ANIME.JS V4 API MAP</SubHeading>
            <div className="border divide-y">
              {[
                { api: "animate()", bundle: "5.2KB", desc: "核心动画，CSS/transform/opacity/SVG 属性" },
                { api: "createTimeline()", bundle: "+0.55KB", desc: "多元素时间轴，支持相对时间位置 (<, >, +=)" },
                { api: "stagger()", bundle: "+0.48KB", desc: "延迟分布，支持 grid/from/start/ease" },
                { api: "createSpring()", bundle: "+0.52KB", desc: "弹簧物理，stiffness/damping/mass/velocity" },
                { api: "onScroll()", bundle: "+4.3KB", desc: "滚动同步，sync/threshold/repeat" },
                { api: "createDraggable()", bundle: "+6.4KB", desc: "拖拽，spring release，container 约束" },
                { api: "splitText()", bundle: "~0.3KB", desc: "文字拆分为 chars/words/lines，逐字动画" },
                { api: "createDrawable()", bundle: "~0.35KB", desc: "SVG 路径描边动画，draw: ['0 0', '0 1']" },
                { api: "createScope()", bundle: "+0.22KB", desc: "React 集成，自动 cleanup，mediaQuery 响应" },
              ].map((a) => (
                <div key={a.api} className="grid grid-cols-[140px_70px_1fr] gap-4 px-4 py-2.5">
                  <code className="font-mono text-xs font-medium">{a.api}</code>
                  <span className="font-mono text-[10px] text-[var(--severity-low)]">{a.bundle}</span>
                  <span className="text-xs text-muted-foreground">{a.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>ANIME.JS QUICK REFERENCE</SubHeading>
            <div className="border bg-[oklch(0.11_0_0)] p-4">
              <pre className="font-mono text-[11px] text-[oklch(0.75_0_0)] leading-relaxed overflow-x-auto">{`import { animate, stagger, createTimeline, createSpring } from "animejs";

// 单元素入场
animate(el, { opacity: [0, 1], translateY: [-8, 0], duration: 300, ease: "outCubic" });

// stagger 列表（wave from center）
animate(items, {
  opacity: [0, 1], translateY: [-12, 0],
  delay: stagger(80, { from: "center" }),
  duration: 350, ease: "outCubic",
});

// timeline 攻击序列
const tl = createTimeline({ defaults: { ease: "outCubic" } });
tl.add(probe, { opacity: [0, 1], duration: 200 }, 0)
  .add(inject, { translateX: [-8, 0], duration: 200 }, 200)
  .add(verify, { scale: [0.9, 1], duration: 300 }, "<");

// spring 弹性（Stewie 模态框）
animate(modal, { scale: [0.8, 1], ease: createSpring({ stiffness: 200, damping: 15 }) });

// 必须检查 prefers-reduced-motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;`}</pre>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
