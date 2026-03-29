/**
 * [INPUT]: 依赖 _components/nav-data, ui/separator
 * [OUTPUT]: Design System 总览页
 * [POS]: design-system 的入口，4 大类目导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "./_components/nav-data";
import { CornerBrackets } from "./_components/section";

export const metadata: Metadata = {
  title: "Design System | Anti Hero",
  description: "Anti Hero 设计系统总览：语言、基础、组件与维护规范。",
};

const CATEGORY_ICONS: Record<string, string> = {
  language: "◇",
  foundations: "△",
  components: "□",
  maintenance: "○",
};

export default function DesignSystemOverview() {
  return (
    <div className="max-w-4xl">
      {/* ── Hero ── */}
      <div className="mb-12">
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

      {/* ── 4 类目入口 ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`/design-system/${cat.id}`}>
            <CornerBrackets className="group h-full">
              <div className="border border-dashed p-6 h-full hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-lg text-muted-foreground">
                    {CATEGORY_ICONS[cat.id]}
                  </span>
                  <h2 className="font-pixel-square text-lg group-hover:text-foreground transition-colors">
                    {cat.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.sections.map((s) => (
                    <span
                      key={s.id}
                      className="font-mono text-[10px] text-muted-foreground/70 border border-border px-1.5 py-0.5"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </CornerBrackets>
          </Link>
        ))}
      </div>

      {/* ── 技术栈概览 ── */}
      <div className="mt-12 border-t pt-8">
        <p className="font-mono text-xs text-muted-foreground mb-4">
          TECH STACK
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js 16",
            "React 19",
            "Tailwind v4",
            "shadcn/ui",
            "Radix UI",
            "OKLCH",
            "Geist Fonts",
            "Lucide Icons",
            "Motion",
            "anime.js",
            "React Flow",
          ].map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] border border-border px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
