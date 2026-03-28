/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: ColorSwatch 色块展示组件
 * [POS]: design-system/_components 的色彩展示原语
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export function ColorSwatch({
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
