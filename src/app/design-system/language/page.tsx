/**
 * [INPUT]: 依赖 _components/section
 * [OUTPUT]: Design Language 页（品牌 + 指南）
 * [POS]: design-system/language 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Section, SectionDivider, SubHeading } from "../_components/section";

/* ─────────────────────────────────────────────
 * 数据
 * ───────────────────────────────────────────── */

const PRINCIPLES = [
  {
    name: "Sharp",
    desc: "直角、角标装饰、精确的边界。圆角是妥协的产物——安全工具不妥协。",
    glyph: "┌┐",
  },
  {
    name: "Dark",
    desc: "暗色优先，终端美学。亮色模式存在，但暗色是默认战场。",
    glyph: "██",
  },
  {
    name: "Technical",
    desc: "等宽字体、像素字体、代码块。每个视觉元素都暗示「我是工具」。",
    glyph: ">_",
  },
  {
    name: "Restrained",
    desc: "动效服务于信息传递，不服务于装饰。如果动画不帮助用户理解，就删掉它。",
    glyph: "──",
  },
  {
    name: "Purposeful",
    desc: "每个颜色、间距、字号的选择都有安全语义。红色 = 漏洞，而不是「强调」。",
    glyph: "◎",
  },
] as const;

const TERMINOLOGY = [
  { use: "Agent", avoid: "Bot / Assistant", reason: "强调自主行动能力" },
  { use: "Probe", avoid: "Test / Check", reason: "渗透测试术语，暗示主动探测" },
  { use: "Vulnerability", avoid: "Issue / Problem", reason: "精确的安全领域术语" },
  { use: "Exploit", avoid: "Bug / Error", reason: "描述可被利用的攻击路径" },
  { use: "Payload", avoid: "Data / Content", reason: "攻击载荷，非中性的「数据」" },
  { use: "Attack Surface", avoid: "Scope / Area", reason: "被测系统的暴露面" },
  { use: "Sandbox", avoid: "Environment", reason: "强调隔离与控制" },
  { use: "PoC", avoid: "Demo / Example", reason: "Proof of Concept，证明漏洞可行" },
] as const;

const WRITING_RULES = [
  { rule: "主动语态", example: "Anti-Hero 发现了 3 个漏洞 ✓", counter: "3 个漏洞被发现 ✗" },
  { rule: "祈使语气", example: "运行扫描 ✓", counter: "你可以运行扫描 ✗" },
  { rule: "技术精确", example: "Prompt Injection via tool description ✓", counter: "安全问题 ✗" },
  { rule: "简洁直白", example: "扫描完成，发现 2 个高危路径 ✓", counter: "扫描已经成功完成了，我们发现了一些问题 ✗" },
] as const;

const MICROCOPY = [
  { context: "空状态", copy: "尚未运行任何探测。部署你的第一个攻击。" },
  { context: "加载中", copy: "正在渗透…" },
  { context: "错误", copy: "攻击路径中断：{error}。检查 Agent 配置。" },
  { context: "成功", copy: "PoC 已验证。{count} 条攻击路径可复现。" },
  { context: "确认删除", copy: "销毁此探测记录？操作不可逆。" },
  { context: "权限不足", copy: "权限不足。此操作需要 Admin 角色。" },
] as const;

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function DesignLanguagePage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Design Language</h1>
        <p className="text-sm text-muted-foreground">
          品牌调性与沟通规范——定义 Anti-Hero 如何与用户对话
        </p>
      </div>

      {/* ━━ Brand ━━ */}
      <Section id="brand" title="Brand" desc="驱动每个设计决策的品牌内核">
        <div className="space-y-8">
          {/* Vision */}
          <div>
            <SubHeading>VISION</SubHeading>
            <div className="border p-6 font-pixel-square">
              <p className="text-lg leading-relaxed">
                用 AI 攻击 AI——让每一个 Agent
                在部署前经历真实的对抗验证，而非纸上合规。
              </p>
              <p className="mt-3 text-sm text-muted-foreground font-sans">
                Anti-Hero 存在的理由：AI Agent 正在获得越来越多的自主权，
                但没有人真正验证过它们在对抗环境下的行为。我们是那个对抗环境。
              </p>
            </div>
          </div>

          {/* Principles */}
          <div>
            <SubHeading>DESIGN PRINCIPLES</SubHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRINCIPLES.map((p) => (
                <div key={p.name} className="border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground w-6">
                      {p.glyph}
                    </span>
                    <span className="font-pixel-square text-sm">{p.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tone of Voice */}
          <div>
            <SubHeading>TONE OF VOICE</SubHeading>
            <div className="border p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">
                    WE ARE
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>技术精确的</li>
                    <li>行动导向的</li>
                    <li>怀疑主义的</li>
                    <li>务实的</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">
                    WE ARE NOT
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>企业合规腔调的</li>
                    <li>模糊含混的</li>
                    <li>过度友好的</li>
                    <li>学术理论化的</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground border-t pt-3">
                想象一个经验丰富的渗透测试工程师在给队友写 Slack 消息——
                直接、精确、偶尔带点黑色幽默，但永远不会含糊。
              </p>
            </div>
          </div>

          {/* Terminology */}
          <div>
            <SubHeading>TERMINOLOGY</SubHeading>
            <div className="border divide-y">
              <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-4 px-4 py-2 bg-muted/30">
                <span className="font-mono text-[10px] text-muted-foreground">USE</span>
                <span className="font-mono text-[10px] text-muted-foreground">AVOID</span>
                <span className="font-mono text-[10px] text-muted-foreground">WHY</span>
              </div>
              {TERMINOLOGY.map((t) => (
                <div key={t.use} className="grid grid-cols-[1fr_1fr_1.5fr] gap-4 px-4 py-2.5">
                  <span className="font-mono text-xs font-medium">{t.use}</span>
                  <span className="font-mono text-xs text-muted-foreground line-through decoration-destructive/50">
                    {t.avoid}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Assets */}
          <div>
            <SubHeading>BRAND ASSETS</SubHeading>
            <div className="border p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="font-mono text-[10px] text-muted-foreground">LOGO FONT</p>
                  <p className="font-pixel-square text-xl">Anti Hero</p>
                  <p className="text-[10px] text-muted-foreground">Geist Pixel Square</p>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[10px] text-muted-foreground">MASCOT</p>
                  <p className="font-pixel-square text-xl">Stewie</p>
                  <p className="text-[10px] text-muted-foreground">Family Guy · ASCII Art · SVG</p>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[10px] text-muted-foreground">ICON STYLE</p>
                  <p className="text-xl">⬡</p>
                  <p className="text-[10px] text-muted-foreground">Lucide · 1.5px stroke</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-2">DECORATIVE PATTERNS</p>
                <div className="flex gap-4">
                  <div className="size-16 border" style={{
                    backgroundImage: "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
                    backgroundSize: "7px 7px",
                    color: "oklch(from var(--foreground) l c h / 0.08)",
                  }} />
                  <div className="size-16 border border-dashed" />
                  <div className="relative size-16 border">
                    <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
                    <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
                    <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
                    <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  斜线纹理 · 虚线边框 · 角标装饰
                </p>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Mascot · Stewie ━━ */}
      <Section id="mascot" title="Mascot · Stewie" desc="Anti-Hero 的品牌 IP——来自 Family Guy 的坏逼天才">
        <div className="space-y-8">
          <div>
            <div className="border p-6 space-y-6">
              {/* 角色定位 */}
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-2">CHARACTER</p>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed">
                    <span className="font-pixel-square">Stewie Griffin</span>
                    {" "}—— Family Guy 里的坏逼天才婴儿。
                    偏执、傲慢、智力碾压、永远在策划征服世界。
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    他是 Anti-Hero 的精神图腾：用最精密的头脑做最叛逆的事。
                    AI Agent 红队测试的本质就是这样——以恶意的视角，替善意的用户找到系统的裂缝。
                  </p>
                </div>
              </div>

              {/* Hero SVG 预览 */}
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-3">HERO SVG · 亮/暗双版</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Landing page Hero 区域使用。ASCII 字符构成的 Stewie 轮廓，等宽字体渲染，与终端美学一脉相承。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* 亮色版 */}
                  <div className="border p-4 bg-white rounded-sm">
                    <p className="font-mono text-[10px] text-black/50 mb-2">stewie_light.svg</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/stewie_light.svg"
                      alt="Stewie ASCII Art - Light"
                      className="w-full h-auto max-h-48 object-contain"
                    />
                  </div>
                  {/* 暗色版 */}
                  <div className="border p-4 bg-black rounded-sm">
                    <p className="font-mono text-[10px] text-white/50 mb-2">stewie-dark.svg</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/stewie-dark.svg"
                      alt="Stewie ASCII Art - Dark"
                      className="w-full h-auto max-h-48 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* ASCII Art SVG 版 */}
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-3">ASCII ART · 终端/CLI 用</p>
                <p className="text-xs text-muted-foreground mb-4">
                  纯文本 ASCII art，用于 CLI 输出、终端启动画面、README 头部等纯文本场景。
                </p>
                <div className="border border-white/10 bg-[#020303] rounded-sm overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/stewie-ascii-art.svg"
                    alt="Stewie ASCII Art"
                    className="w-full h-auto max-h-72 object-contain"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  纯文本版：<code className="bg-muted px-1 py-0.5">public/stewie-ascii-art.txt</code>
                  {" · "}SVG 版：<code className="bg-muted px-1 py-0.5">public/stewie-ascii-art.svg</code>
                </p>
              </div>

              {/* 素材清单 */}
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-3">ASSET INVENTORY</p>
                <div className="border divide-y">
                  <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-4 px-4 py-2 bg-muted/30">
                    <span className="font-mono text-[10px] text-muted-foreground">FILE</span>
                    <span className="font-mono text-[10px] text-muted-foreground">FORMAT</span>
                    <span className="font-mono text-[10px] text-muted-foreground">USAGE</span>
                  </div>
                  {[
                    { file: "public/stewie_light.svg", format: "SVG · ASCII text 渲染", usage: "Hero 区域 · 亮色模式" },
                    { file: "public/stewie-dark.svg", format: "SVG · ASCII text 渲染", usage: "Hero 区域 · 暗色模式" },
                    { file: "public/stewie-ascii-art.txt", format: "纯文本 ASCII art", usage: "CLI · 终端 · README" },
                    { file: "public/stewie-ascii-art.svg", format: "SVG · 高精度 ASCII art", usage: "印刷 · 高分辨率场景" },
                  ].map((a) => (
                    <div key={a.file} className="grid grid-cols-[1fr_1fr_1.5fr] gap-4 px-4 py-2.5">
                      <code className="font-mono text-xs">{a.file}</code>
                      <span className="text-xs text-muted-foreground">{a.format}</span>
                      <span className="text-xs text-muted-foreground">{a.usage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 使用规范 */}
              <div className="border-t pt-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-3">USAGE GUIDELINES</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground mb-1">DO</p>
                    <ul className="space-y-1 text-xs">
                      <li>Hero 区域作为视觉锚点</li>
                      <li>与终端/代码元素搭配使用</li>
                      <li>暗色背景上使用暗色版</li>
                      <li>保持 ASCII art 的等宽字体渲染</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted-foreground mb-1">DON&apos;T</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>缩放到失真或像素模糊</li>
                      <li>在正式合规文档中使用</li>
                      <li>改变 ASCII 字符的字体</li>
                      <li>添加颜色渐变或滤镜效果</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Guidelines ━━ */}
      <Section id="guidelines" title="Guidelines" desc="确保产品体验一致性的规范">
        <div className="space-y-8">
          {/* Accessibility */}
          <div>
            <SubHeading>ACCESSIBILITY</SubHeading>
            <div className="border p-6 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "对比度", spec: "WCAG AA · 文字 ≥ 4.5:1 · 大文字 ≥ 3:1" },
                  { label: "焦点指示", spec: "3px ring · ring 色 · 所有可交互元素" },
                  { label: "键盘导航", spec: "Tab 序列 · Enter/Space 触发 · Esc 关闭" },
                  { label: "屏幕阅读器", spec: "aria-label · aria-describedby · 语义 HTML" },
                  { label: "减少动效", spec: "prefers-reduced-motion · 禁用非必要动画" },
                  { label: "颜色非唯一", spec: "不依赖颜色传递信息，搭配图标/文字" },
                ].map((a) => (
                  <div key={a.label} className="flex gap-3">
                    <span className="font-mono text-xs font-medium w-20 shrink-0">{a.label}</span>
                    <span className="text-xs text-muted-foreground">{a.spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Writing */}
          <div>
            <SubHeading>WRITING GUIDELINES</SubHeading>
            <div className="border divide-y">
              <div className="grid grid-cols-[100px_1fr_1fr] gap-4 px-4 py-2 bg-muted/30">
                <span className="font-mono text-[10px] text-muted-foreground">RULE</span>
                <span className="font-mono text-[10px] text-muted-foreground">DO</span>
                <span className="font-mono text-[10px] text-muted-foreground">DON&apos;T</span>
              </div>
              {WRITING_RULES.map((w) => (
                <div key={w.rule} className="grid grid-cols-[100px_1fr_1fr] gap-4 px-4 py-2.5">
                  <span className="font-mono text-xs font-medium">{w.rule}</span>
                  <span className="text-xs">{w.example}</span>
                  <span className="text-xs text-muted-foreground">{w.counter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Microcopy */}
          <div>
            <SubHeading>MICROCOPY</SubHeading>
            <div className="border divide-y">
              {MICROCOPY.map((m) => (
                <div key={m.context} className="flex gap-4 px-4 py-2.5">
                  <span className="font-mono text-xs font-medium w-20 shrink-0">{m.context}</span>
                  <span className="text-xs text-muted-foreground font-mono">{m.copy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* i18n */}
          <div>
            <SubHeading>INTERNATIONALIZATION</SubHeading>
            <div className="border p-6 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-1">CURRENT</p>
                  <p className="text-sm">中文 + English</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground mb-1">STRATEGY</p>
                  <p className="text-sm">UI 中文 · 技术术语英文 · CLI 输出英文</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground border-t pt-3">
                安全术语保持英文原文（Prompt Injection, SSRF, RCE），不翻译。
                用户界面文案使用中文，保持亲切感与本地化体验。
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
