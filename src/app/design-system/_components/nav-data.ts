/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 导航结构、色板、间距、圆角、组件 variant 等常量
 * [POS]: design-system/_components 的数据层，所有子路由共享
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ─────────────────────────────────────────────
 * 导航结构
 * ───────────────────────────────────────────── */

export const CATEGORIES = [
  {
    id: "language",
    title: "Design Language",
    desc: "品牌、调性、写作指南",
    sections: [
      { id: "brand", label: "Brand" },
      { id: "mascot", label: "Mascot · Stewie" },
      { id: "guidelines", label: "Guidelines" },
    ],
  },
  {
    id: "foundations",
    title: "Foundations",
    desc: "色彩、布局、字体、阴影、动效、图标",
    sections: [
      { id: "color", label: "Color" },
      { id: "layout", label: "Layout" },
      { id: "typography", label: "Typography" },
      { id: "elevation", label: "Elevation" },
      { id: "motion", label: "Motion" },
      { id: "icons", label: "Icons" },
    ],
  },
  {
    id: "components",
    title: "Components",
    desc: "29 个可复用 UI 组件",
    sections: [
      { id: "actions", label: "Actions" },
      { id: "feedback", label: "Feedback" },
      { id: "data-input", label: "Data Input" },
      { id: "data-display", label: "Data Display" },
      { id: "navigation", label: "Navigation" },
      { id: "overlays", label: "Overlays" },
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    desc: "文档、流程、贡献指南",
    sections: [
      { id: "documentation", label: "Documentation" },
      { id: "local-libraries", label: "Local Libraries" },
      { id: "processes", label: "Processes" },
      { id: "contribution", label: "Contribution" },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "攻击链可视化、日志、指标、供应链",
    sections: [
      { id: "attack-chain", label: "Attack Chain" },
      { id: "terminal", label: "Terminal Output" },
      { id: "mcp-comparison", label: "MCP Comparison" },
      { id: "supply-chain", label: "Supply Chain" },
      { id: "metrics", label: "Metrics" },
      { id: "fix-points", label: "Fix Points" },
    ],
  },
] as const;

/* ─────────────────────────────────────────────
 * 色板
 * ───────────────────────────────────────────── */

export const SEMANTIC_COLORS = [
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

export const CHART_COLORS = [
  { name: "chart-1", var: "--chart-1" },
  { name: "chart-2", var: "--chart-2" },
  { name: "chart-3", var: "--chart-3" },
  { name: "chart-4", var: "--chart-4" },
  { name: "chart-5", var: "--chart-5" },
] as const;

/* ─────────────────────────────────────────────
 * 间距 & 圆角
 * ───────────────────────────────────────────── */

export const SPACING_SCALE = [
  { name: "1", size: "0.25rem", px: "4px" },
  { name: "2", size: "0.5rem", px: "8px" },
  { name: "3", size: "0.75rem", px: "12px" },
  { name: "4", size: "1rem", px: "16px" },
  { name: "6", size: "1.5rem", px: "24px" },
  { name: "8", size: "2rem", px: "32px" },
  { name: "12", size: "3rem", px: "48px" },
  { name: "16", size: "4rem", px: "64px" },
] as const;

export const RADIUS_SCALE = [
  { name: "sm", class: "rounded-sm" },
  { name: "md", class: "rounded-md" },
  { name: "lg", class: "rounded-lg" },
  { name: "xl", class: "rounded-xl" },
  { name: "2xl", class: "rounded-2xl" },
  { name: "3xl", class: "rounded-3xl" },
  { name: "full", class: "rounded-full" },
] as const;

/* ─────────────────────────────────────────────
 * 组件 Variants
 * ───────────────────────────────────────────── */

export const BUTTON_VARIANTS = [
  "default", "secondary", "outline", "ghost", "destructive", "link",
] as const;

export const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

export const BADGE_VARIANTS = [
  "default", "secondary", "destructive", "outline",
] as const;
