/**
 * [INPUT]: 依赖 ui/separator
 * [OUTPUT]: Section, SectionDivider, CornerBrackets 布局原语
 * [POS]: design-system/_components 的布局层，所有子路由共享
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Separator } from "@/components/ui/separator";

/* ── Section 容器 ── */

export function Section({
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

/* ── 斜线纹理分隔符 ── */

export function SectionDivider() {
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

/* ── 角标装饰 ── */

export function CornerBrackets({
  children,
  className = "",
  dashed = false,
}: {
  children: React.ReactNode;
  className?: string;
  dashed?: boolean;
}) {
  const b = dashed ? "border-dashed" : "";
  return (
    <div className={`relative ${className}`}>
      {children}
      <span className={`absolute h-2 w-2 border-foreground ${b} border-t border-l top-0 left-0`} />
      <span className={`absolute h-2 w-2 border-foreground ${b} border-t border-r top-0 right-0`} />
      <span className={`absolute h-2 w-2 border-foreground ${b} border-b border-l bottom-0 left-0`} />
      <span className={`absolute h-2 w-2 border-foreground ${b} border-b border-r bottom-0 right-0`} />
    </div>
  );
}

/* ── 子标题 ── */

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs font-medium text-muted-foreground mb-4">
      {children}
    </h3>
  );
}
