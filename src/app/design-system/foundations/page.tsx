/**
 * [INPUT]: 依赖 _components/section, _components/color-swatch, _components/nav-data, ui/separator
 * [OUTPUT]: Foundations 页（色彩/布局/字体/阴影/动效/图标）
 * [POS]: design-system/foundations 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Separator } from "@/components/ui/separator";
import {
  Shield, Lock, Bug, Terminal, Eye, Zap, ArrowRight,
  Scan, Fingerprint, KeyRound, ShieldAlert, ShieldCheck,
  Skull, Siren, Radio, Radar, Network, Unplug, FileWarning,
} from "lucide-react";
import { Section, SectionDivider, SubHeading } from "../_components/section";
import { ColorSwatch } from "../_components/color-swatch";
import {
  SEMANTIC_COLORS, CHART_COLORS, SPACING_SCALE, RADIUS_SCALE,
} from "../_components/nav-data";

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function FoundationsPage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Foundations</h1>
        <p className="text-sm text-muted-foreground">
          设计系统的基础层——token、网格、字体、阴影、动效、图标
        </p>
      </div>

      {/* ━━ Color ━━ */}
      <Section id="color" title="Color" desc="基于 OKLCH 色彩空间的语义色板，支持 light/dark 自适应">
        <div className="space-y-6">
          <div>
            <SubHeading>SEMANTIC TOKENS</SubHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SEMANTIC_COLORS.map((c) => (
                <ColorSwatch key={c.var} name={c.name} cssVar={c.var} desc={c.desc} />
              ))}
            </div>
          </div>
          <div>
            <SubHeading>CHART PALETTE</SubHeading>
            <div className="flex gap-1">
              {CHART_COLORS.map((c) => (
                <div key={c.var} className="flex-1 space-y-2">
                  <div className="h-16 w-full border border-border" style={{ background: `var(${c.var})` }} />
                  <p className="font-mono text-[10px] text-center text-muted-foreground">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>ACCESSIBILITY · CONTRAST</SubHeading>
            <div className="border p-4 space-y-2">
              {[
                { pair: "foreground / background", level: "AA ✓", ratio: "≥ 15:1" },
                { pair: "primary-fg / primary", level: "AA ✓", ratio: "≥ 12:1" },
                { pair: "muted-fg / background", level: "AA ✓", ratio: "≥ 4.5:1" },
                { pair: "destructive / white", level: "AA ✓", ratio: "≥ 4.5:1" },
              ].map((c) => (
                <div key={c.pair} className="flex items-center gap-4 font-mono text-xs">
                  <span className="w-48 text-muted-foreground">{c.pair}</span>
                  <span className="w-16">{c.level}</span>
                  <span className="text-muted-foreground">{c.ratio}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>USAGE GUIDELINES</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { token: "primary", when: "主要操作按钮、强调链接" },
                { token: "secondary", when: "次要操作、标签背景" },
                { token: "destructive", when: "漏洞标记、危险操作、删除" },
                { token: "muted", when: "禁用状态、占位符、分隔背景" },
                { token: "accent", when: "hover 高亮、选中态背景" },
                { token: "chart-*", when: "数据可视化、攻击路径图表" },
              ].map((g) => (
                <div key={g.token} className="flex gap-2">
                  <span className="font-mono text-xs font-medium w-24 shrink-0">{g.token}</span>
                  <span className="text-xs text-muted-foreground">{g.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Layout ━━ */}
      <Section id="layout" title="Layout" desc="网格系统、断点与间距">
        <div className="space-y-6">
          <div>
            <SubHeading>GRID SYSTEM</SubHeading>
            <div className="border p-4 space-y-3">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-8 bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="font-mono text-[9px] text-muted-foreground">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">
                12 列 · max-w-7xl (80rem) · px-6 gutter
              </p>
            </div>
          </div>
          <div>
            <SubHeading>BREAKPOINTS</SubHeading>
            <div className="border divide-y">
              {[
                { name: "sm", px: "640px", desc: "手机横屏 / 小平板" },
                { name: "md", px: "768px", desc: "平板竖屏" },
                { name: "lg", px: "1024px", desc: "平板横屏 / 小桌面" },
                { name: "xl", px: "1280px", desc: "标准桌面" },
                { name: "2xl", px: "1536px", desc: "大屏桌面" },
              ].map((bp) => (
                <div key={bp.name} className="flex items-center gap-4 px-4 py-2">
                  <span className="font-mono text-xs font-medium w-8">{bp.name}</span>
                  <span className="font-mono text-xs text-muted-foreground w-16">{bp.px}</span>
                  <div className="flex-1 h-2 bg-muted relative">
                    <div className="h-full bg-primary/30" style={{ width: `${(parseInt(bp.px) / 1536) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-32 text-right">{bp.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>SPACING SCALE</SubHeading>
            <div className="space-y-2">
              {SPACING_SCALE.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="w-12 shrink-0 font-mono text-[10px] text-muted-foreground text-right">{s.name}</span>
                  <div className="h-3 bg-primary/80" style={{ width: s.size }} />
                  <span className="font-mono text-[10px] text-muted-foreground">{s.size} · {s.px}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>RADIUS SCALE · base: 0.625rem</SubHeading>
            <div className="flex flex-wrap gap-4">
              {RADIUS_SCALE.map((r) => (
                <div key={r.name} className="flex flex-col items-center gap-2">
                  <div className={`size-16 border-2 border-primary/60 ${r.class}`} />
                  <span className="font-mono text-[10px] text-muted-foreground">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Typography ━━ */}
      <Section id="typography" title="Typography" desc="三字体族：Sans 阅读、Mono 代码、Pixel Square 品牌">
        <div className="space-y-6">
          {[
            { family: "GEIST SANS", cls: "", desc: "font-sans · 正文、描述、界面文字", role: "默认阅读字体" },
            { family: "GEIST MONO", cls: "font-mono", desc: "font-mono · 代码块、终端输出、技术数据", role: "代码与数据" },
            { family: "PIXEL SQUARE", cls: "font-pixel-square", desc: "font-pixel-square · 标题、品牌、强调", role: "品牌标识" },
          ].map((f) => (
            <div key={f.family} className="space-y-2">
              <SubHeading>{f.family} · {f.role}</SubHeading>
              <div className={`border p-6 space-y-1 ${f.cls}`}>
                <p className="text-3xl font-light">The quick brown fox jumps</p>
                <p className="text-xl">over the lazy dog</p>
                <p className="text-base">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
                <p className="text-sm text-muted-foreground font-sans">{f.desc}</p>
              </div>
            </div>
          ))}
          <div>
            <SubHeading>TYPE SCALE</SubHeading>
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
                  <span className="w-24 shrink-0 font-mono text-[10px] text-muted-foreground">{t.label}</span>
                  <span className={t.cls}>Anti Hero</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>RESPONSIVE · READABILITY · PERFORMANCE</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">RESPONSIVE</p>
                <p className="text-xs">标题 text-4xl → md:text-5xl → lg:text-6xl</p>
                <p className="text-xs text-muted-foreground">正文保持 text-sm/text-base 不变</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">READABILITY</p>
                <p className="text-xs">正文 leading-relaxed · max-w-2xl</p>
                <p className="text-xs text-muted-foreground">Mono 正文限 max-w-xl</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">PERFORMANCE</p>
                <p className="text-xs">next/font/google 自动优化</p>
                <p className="text-xs text-muted-foreground">字体子集: latin · 无 FOUT</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Elevation ━━ */}
      <Section id="elevation" title="Elevation" desc="阴影层级与 z-index 系统">
        <div className="space-y-6">
          <div>
            <SubHeading>SHADOW SCALE</SubHeading>
            <div className="flex flex-wrap gap-6 p-4">
              {[
                { name: "shadow-xs", cls: "shadow-xs" },
                { name: "shadow-sm", cls: "shadow-sm" },
                { name: "shadow", cls: "shadow" },
                { name: "shadow-md", cls: "shadow-md" },
                { name: "shadow-lg", cls: "shadow-lg" },
                { name: "shadow-xl", cls: "shadow-xl" },
                { name: "shadow-2xl", cls: "shadow-2xl" },
              ].map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-3">
                  <div className={`size-16 bg-card border ${s.cls}`} />
                  <span className="font-mono text-[10px] text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Anti-Hero 风格偏好边框而非阴影。阴影仅用于浮层（dropdown、modal、tooltip）。
            </p>
          </div>
          <div>
            <SubHeading>Z-INDEX SYSTEM</SubHeading>
            <div className="border divide-y">
              {[
                { name: "base", value: "0", usage: "普通内容" },
                { name: "dropdown", value: "50", usage: "下拉菜单、popover" },
                { name: "sticky", value: "100", usage: "粘性导航、表头" },
                { name: "overlay", value: "150", usage: "遮罩层" },
                { name: "modal", value: "200", usage: "对话框" },
                { name: "toast", value: "300", usage: "通知提示" },
              ].map((z) => (
                <div key={z.name} className="flex items-center gap-4 px-4 py-2">
                  <span className="font-mono text-xs font-medium w-20">{z.name}</span>
                  <span className="font-mono text-xs text-muted-foreground w-12">{z.value}</span>
                  <div className="flex-1 h-3 bg-muted relative">
                    <div className="h-full bg-primary/30" style={{ width: `${(parseInt(z.value) / 300) * 100 || 3}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{z.usage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Motion ━━ */}
      <Section id="motion" title="Motion" desc="动效系统：缓动、时长、关键帧、无障碍">
        <div className="space-y-6">
          <div>
            <SubHeading>EASING TOKENS</SubHeading>
            <div className="border p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "ease-out", css: "cubic-bezier(0, 0, 0.2, 1)", usage: "入场" },
                { name: "ease-in", css: "cubic-bezier(0.4, 0, 1, 1)", usage: "退场" },
                { name: "ease-in-out", css: "cubic-bezier(0.4, 0, 0.2, 1)", usage: "过渡" },
                { name: "spring", css: "cubic-bezier(0.34, 1.56, 0.64, 1)", usage: "弹性反馈" },
              ].map((e) => (
                <div key={e.name}>
                  <p className="font-mono text-xs font-medium">{e.name}</p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-1">{e.css}</p>
                  <p className="text-[10px] text-muted-foreground">{e.usage}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>DURATION TOKENS</SubHeading>
            <div className="border p-4 flex gap-6">
              {[
                { name: "fast", ms: "150ms", usage: "hover、focus" },
                { name: "normal", ms: "300ms", usage: "展开、切换" },
                { name: "slow", ms: "500ms", usage: "入场、页面过渡" },
              ].map((d) => (
                <div key={d.name}>
                  <p className="font-mono text-xs font-medium">{d.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{d.ms}</p>
                  <p className="text-[10px] text-muted-foreground">{d.usage}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>KEYFRAME ANIMATIONS</SubHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-4 space-y-2">
                <p className="font-mono text-xs font-medium">tech-fade-in</p>
                <p className="text-[10px] text-muted-foreground">opacity + translateY + scale + blur</p>
                <div className="h-10 bg-primary/20 border border-primary/30" style={{ animation: "tech-fade-in 1.5s ease-out infinite" }} />
              </div>
              <div className="border p-4 space-y-2">
                <p className="font-mono text-xs font-medium">ping-sequence</p>
                <p className="text-[10px] text-muted-foreground">双拍 ping 脉冲</p>
                <div className="flex gap-4 items-center h-10">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full bg-foreground opacity-75" style={{ animation: "ping-sequence 2s linear infinite" }} />
                    <span className="relative inline-flex h-3 w-3 bg-foreground" />
                  </span>
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full bg-destructive opacity-75" style={{ animation: "ping-sequence 2s linear infinite 0.5s" }} />
                    <span className="relative inline-flex h-3 w-3 bg-destructive" />
                  </span>
                </div>
              </div>
              <div className="border p-4 space-y-2">
                <p className="font-mono text-xs font-medium">rotate-sequence</p>
                <p className="text-[10px] text-muted-foreground">阶梯旋转：0° → 45° → 90°</p>
                <div className="h-10 flex items-center">
                  <div className="size-6 border-2 border-foreground" style={{ animation: "rotate-sequence 2s linear infinite" }} />
                </div>
              </div>
              <div className="group border p-4 space-y-2 cursor-pointer">
                <p className="font-mono text-xs font-medium">shine</p>
                <p className="text-[10px] text-muted-foreground">Hover 光泽扫过</p>
                <div className="relative h-10 bg-primary/20 border border-primary/30 overflow-hidden">
                  <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <SubHeading>REDUCED MOTION</SubHeading>
            <div className="border p-4">
              <p className="text-xs text-muted-foreground">
                当 <code className="font-mono text-xs bg-muted px-1">prefers-reduced-motion: reduce</code> 时，
                所有动画降级为即时过渡（duration: 0ms）。关键信息的状态变化使用颜色而非动画传达。
              </p>
            </div>
          </div>
          <div>
            <SubHeading>PLANNED · 攻击流程可视化</SubHeading>
            <div className="border border-dashed p-4 flex gap-6">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-muted-foreground" />
                <div>
                  <p className="font-mono text-xs font-medium">anime.js</p>
                  <p className="text-[10px] text-muted-foreground">攻击执行过程的精细动画编排</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-auto" />
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-muted-foreground" />
                <div>
                  <p className="font-mono text-xs font-medium">React Flow</p>
                  <p className="text-[10px] text-muted-foreground">任务流图、攻击路径拓扑</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Icons ━━ */}
      <Section id="icons" title="Iconography" desc="基于 Lucide React · 线性 1.5px 描边">
        <div className="space-y-6">
          <div>
            <SubHeading>SECURITY DOMAIN ICONS</SubHeading>
            <div className="border p-4">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {[
                  { Icon: Shield, name: "Shield" },
                  { Icon: ShieldCheck, name: "ShieldCheck" },
                  { Icon: ShieldAlert, name: "ShieldAlert" },
                  { Icon: Lock, name: "Lock" },
                  { Icon: KeyRound, name: "KeyRound" },
                  { Icon: Bug, name: "Bug" },
                  { Icon: Skull, name: "Skull" },
                  { Icon: Terminal, name: "Terminal" },
                  { Icon: Eye, name: "Eye" },
                  { Icon: Scan, name: "Scan" },
                  { Icon: Fingerprint, name: "Fingerprint" },
                  { Icon: Siren, name: "Siren" },
                  { Icon: Radio, name: "Radio" },
                  { Icon: Radar, name: "Radar" },
                  { Icon: Network, name: "Network" },
                  { Icon: Unplug, name: "Unplug" },
                  { Icon: FileWarning, name: "FileWarning" },
                  { Icon: Zap, name: "Zap" },
                  { Icon: ArrowRight, name: "ArrowRight" },
                ].map(({ Icon, name }) => (
                  <div key={name} className="flex flex-col items-center gap-2 py-2">
                    <Icon className="size-5" />
                    <span className="font-mono text-[9px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SubHeading>SIZE SCALE</SubHeading>
            <div className="border p-4 flex items-end gap-6">
              {[
                { size: "size-3", label: "12px" },
                { size: "size-4", label: "16px" },
                { size: "size-5", label: "20px" },
                { size: "size-6", label: "24px" },
                { size: "size-8", label: "32px" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <Shield className={s.size} />
                  <span className="font-mono text-[10px] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SubHeading>NAMING · ACCESSIBILITY · RESERVED</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">NAMING</p>
                <p className="text-xs">名词优先：Shield, Bug, Lock</p>
                <p className="text-xs text-muted-foreground">搜索关键词跟随 Lucide 规范</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">ACCESSIBILITY</p>
                <p className="text-xs">装饰性: aria-hidden=&quot;true&quot;</p>
                <p className="text-xs">功能性: aria-label=&quot;描述&quot;</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">RESERVED</p>
                <p className="text-xs">Shield = 安全 · Bug = 漏洞</p>
                <p className="text-xs">Terminal = CLI · Lock = 认证</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
