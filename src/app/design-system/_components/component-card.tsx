/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: ComponentCard 组件展示卡片
 * [POS]: design-system/_components 的组件展示原语
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export function ComponentCard({
  name,
  desc,
  children,
}: {
  name: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border">
      <div className="border-b px-4 py-2.5 bg-muted/30">
        <p className="font-mono text-xs font-medium">{name}</p>
        {desc && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{desc}</p>
        )}
      </div>
      <div className="p-4 flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}
