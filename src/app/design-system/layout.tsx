/**
 * [INPUT]: 依赖 _components/nav-data
 * [OUTPUT]: Design System 共享布局（顶栏 + 侧边导航）
 * [POS]: design-system 的 layout，所有子路由共享
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import Link from "next/link";
import { CATEGORIES } from "./_components/nav-data";

function SideNav() {
  return (
    <nav className="space-y-6">
      {CATEGORIES.map((cat) => (
        <div key={cat.id}>
          <Link
            href={cat.id === "language" ? "/design-system/language" : `/design-system/${cat.id}`}
            className="font-mono text-xs font-medium hover:text-foreground transition-colors"
          >
            {cat.title}
          </Link>
          <ul className="mt-1.5 space-y-0.5 border-l border-border ml-1 pl-3">
            {cat.sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/design-system/${cat.id}#${s.id}`}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors block py-0.5"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* ── 顶栏 ── */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-pixel-square text-sm hover:text-muted-foreground transition-colors"
          >
            ← Anti Hero
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/design-system/${cat.id}`}
                className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>
          <Link
            href="/design-system"
            className="font-pixel-square text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Overview
          </Link>
        </div>
      </header>

      {/* ── 内容区：侧边栏 + 主内容 ── */}
      <div className="mx-auto max-w-7xl flex">
        <aside className="hidden lg:block w-56 shrink-0 border-r sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-6 py-8">
          <SideNav />
        </aside>
        <main className="flex-1 min-w-0 px-6 py-12 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
