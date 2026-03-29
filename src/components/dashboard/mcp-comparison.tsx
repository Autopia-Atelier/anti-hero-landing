/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: McpComparison MCP 双层对照组件
 * [POS]: dashboard 的核心视图 2，展示用户可见 vs LLM 接收
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── 类型 ── */

export type McpTool = {
  name: string;
  userVisible: string;
  llmReceived: string;
  hiddenDirectives: string[];
  intent: string;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  mitre?: string;
};

/* ── 组件 ── */

export function McpComparison({
  tools,
  className = "",
}: {
  tools: McpTool[];
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {tools.map((tool) => (
        <div key={tool.name} className="border">
          {/* 工具名 + 标签 */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
            <span className="font-mono text-xs font-medium">{tool.name}</span>
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-[9px] px-1.5 py-px border"
                style={{
                  borderColor: `var(--severity-${tool.confidence === "HIGH" ? "critical" : tool.confidence === "MEDIUM" ? "high" : "medium"})`,
                  color: `var(--severity-${tool.confidence === "HIGH" ? "critical" : tool.confidence === "MEDIUM" ? "high" : "medium"})`,
                }}
              >
                {tool.confidence}
              </span>
              {tool.mitre && (
                <span className="font-mono text-[9px] text-muted-foreground border border-border px-1.5 py-px">
                  {tool.mitre}
                </span>
              )}
            </div>
          </div>

          {/* 双栏对比 */}
          <div className="grid grid-cols-2 divide-x">
            <div className="p-3">
              <p className="font-mono text-[9px] text-muted-foreground mb-2">USER VISIBLE</p>
              <p className="text-xs leading-relaxed">{tool.userVisible}</p>
            </div>
            <div className="p-3 bg-[var(--severity-critical)]/[0.03]">
              <p className="font-mono text-[9px] text-[var(--severity-critical)] mb-2">LLM RECEIVES</p>
              <p className="text-xs leading-relaxed">{tool.llmReceived}</p>
              {tool.hiddenDirectives.map((d) => (
                <p
                  key={`${tool.name}:${d}`}
                  className="text-xs mt-1 px-1.5 py-0.5 bg-[var(--severity-critical)]/10 text-[var(--severity-critical)] font-mono border-l-2 border-[var(--severity-critical)]"
                >
                  {d}
                </p>
              ))}
            </div>
          </div>

          {/* Intent */}
          <div className="px-4 py-2 border-t bg-muted/20">
            <span className="font-mono text-[10px] text-muted-foreground">
              Intent: <span className="text-foreground">{tool.intent}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
