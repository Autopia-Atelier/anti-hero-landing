/**
 * [INPUT]: 依赖 _components/section
 * [OUTPUT]: Maintenance 页（文档/流程/贡献）
 * [POS]: design-system/maintenance 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Section, SectionDivider, SubHeading } from "../_components/section";

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function MaintenancePage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Maintenance</h1>
        <p className="text-sm text-muted-foreground">
          设计系统的维护规范——文档、流程、贡献指南
        </p>
      </div>

      {/* ━━ Documentation ━━ */}
      <Section id="documentation" title="Documentation" desc="组件文档与代码注释规范">
        <div className="space-y-6">
          <div>
            <SubHeading>GEB PROTOCOL · 三层分形文档</SubHeading>
            <div className="border divide-y">
              {[
                { layer: "L1", path: "/CLAUDE.md", role: "项目宪法·全局地图·技术栈" },
                { layer: "L2", path: "/{module}/CLAUDE.md", role: "局部地图·成员清单·暴露接口" },
                { layer: "L3", path: "文件头部注释", role: "INPUT/OUTPUT/POS 契约" },
              ].map((l) => (
                <div key={l.layer} className="flex items-center gap-4 px-4 py-3">
                  <span className="font-mono text-xs font-medium w-8">{l.layer}</span>
                  <span className="font-mono text-xs text-muted-foreground w-48">{l.path}</span>
                  <span className="text-xs text-muted-foreground">{l.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>L3 FILE HEADER TEMPLATE</SubHeading>
            <div className="border p-4 bg-muted/20">
              <pre className="font-mono text-xs text-muted-foreground leading-relaxed">{`/**
 * [INPUT]: 依赖 {模块/文件} 的 {具体能力}
 * [OUTPUT]: 对外提供 {导出的函数/组件/类型}
 * [POS]: {所属模块} 的 {角色定位}
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */`}</pre>
            </div>
          </div>

          <div>
            <SubHeading>COMPONENT DOCUMENTATION TEMPLATE</SubHeading>
            <div className="border p-4 space-y-3">
              {[
                { field: "Name", desc: "组件名称（PascalCase）" },
                { field: "Description", desc: "一句话说明组件用途" },
                { field: "Props", desc: "所有属性、类型、默认值、是否必填" },
                { field: "Variants", desc: "CVA variant 列表与适用场景" },
                { field: "Accessibility", desc: "ARIA 属性、键盘交互、屏幕阅读器行为" },
                { field: "Usage", desc: "代码示例（基础 + 组合）" },
              ].map((f) => (
                <div key={f.field} className="flex gap-3">
                  <span className="font-mono text-xs font-medium w-28 shrink-0">{f.field}</span>
                  <span className="text-xs text-muted-foreground">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>DESIGN BEST PRACTICES</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "组件单一职责，不混合业务逻辑",
                "Props 接口最小化，提供合理默认值",
                "Composition 优先于 Configuration",
                "所有可交互元素支持键盘操作",
                "颜色不作为唯一信息通道",
                "动效支持 reduced-motion 降级",
              ].map((rule) => (
                <div key={rule} className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0">·</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>DEVELOPMENT BEST PRACTICES</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "CVA 管理 variant，不手写条件 className",
                "Radix 提供无障碍原语，不重新造轮子",
                "cn() 合并 className，不字符串拼接",
                "Server Component 优先，仅需交互时 use client",
                "类型从 props 推导，不手动 interface",
                "函数 ≤20 行，文件 ≤800 行",
              ].map((rule) => (
                <div key={rule} className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0">·</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>BROWSER & ENVIRONMENT</SubHeading>
            <div className="border p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { env: "Chrome", ver: "≥ 120" },
                { env: "Firefox", ver: "≥ 120" },
                { env: "Safari", ver: "≥ 17" },
                { env: "Edge", ver: "≥ 120" },
                { env: "Node.js", ver: "≥ 20" },
                { env: "React", ver: "19.x" },
                { env: "Next.js", ver: "16.x" },
                { env: "TypeScript", ver: "5.x" },
              ].map((e) => (
                <div key={e.env}>
                  <p className="font-mono text-xs font-medium">{e.env}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{e.ver}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Local Libraries ━━ */}
      <Section id="local-libraries" title="Local Libraries" desc="如何扩展组件库">
        <div className="space-y-6">
          <div>
            <SubHeading>ADDING SHADCN COMPONENTS</SubHeading>
            <div className="border p-4 bg-muted/20 space-y-2">
              <pre className="font-mono text-xs text-muted-foreground">
                {`# 安装单个组件
bunx shadcn@latest add <component-name>

# 批量安装
bunx shadcn@latest add alert dialog tooltip

# 组件会被添加到 src/components/ui/`}
              </pre>
            </div>
          </div>

          <div>
            <SubHeading>CUSTOM COMPONENT PATTERN</SubHeading>
            <div className="border p-4 bg-muted/20">
              <pre className="font-mono text-xs text-muted-foreground leading-relaxed">
{`// src/components/ui/my-component.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const myComponentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { sm: "...", default: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})

function MyComponent({
  className, variant, size, ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof myComponentVariants>) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  )
}`}</pre>
            </div>
          </div>

          <div>
            <SubHeading>FILE ORGANIZATION</SubHeading>
            <div className="border p-4 space-y-2">
              {[
                { path: "src/components/ui/", desc: "shadcn 原子组件（由 CLI 管理）" },
                { path: "src/components/", desc: "业务组件（组合 ui/ 原子组件）" },
                { path: "src/app/*/_components/", desc: "路由私有组件（不跨路由共享）" },
              ].map((f) => (
                <div key={f.path} className="flex gap-3">
                  <span className="font-mono text-xs w-48 shrink-0">{f.path}</span>
                  <span className="text-xs text-muted-foreground">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Processes ━━ */}
      <Section id="processes" title="Team Processes" desc="设计系统的运营流程">
        <div className="space-y-6">
          <div>
            <SubHeading>DESIGN REVIEW CHECKLIST</SubHeading>
            <div className="border p-4 space-y-2">
              {[
                "是否复用了已有组件/token？",
                "新增组件是否有 3+ 处复用场景？",
                "是否通过 WCAG AA 对比度检查？",
                "是否支持键盘导航和屏幕阅读器？",
                "是否在 light/dark 两种模式下测试？",
                "是否遵循 Anti-Hero 的视觉调性？",
                "是否更新了 L2/L3 文档头部？",
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs">
                  <span className="font-mono text-muted-foreground shrink-0">□</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>COMPONENT ACCEPTANCE CRITERIA</SubHeading>
            <div className="border p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "TypeScript 类型完整，无 any",
                "CVA variants 覆盖所有状态",
                "Server Component 优先（除非需要交互）",
                "L3 头部注释完整",
                "在 Design System 页面有展示",
                "build + typecheck 通过",
              ].map((c) => (
                <div key={c} className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0">✓</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SubHeading>DECISION LOG</SubHeading>
            <div className="border p-4">
              <p className="text-xs text-muted-foreground">
                重大设计决策记录在 git commit message 中。架构变更同步更新 CLAUDE.md。
                争议性决策使用 ADR（Architecture Decision Record）格式追踪。
              </p>
            </div>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Contribution ━━ */}
      <Section id="contribution" title="Contribution" desc="如何为设计系统贡献代码">
        <div className="space-y-6">
          <div>
            <SubHeading>CONTRIBUTION FLOW</SubHeading>
            <div className="border p-4">
              <div className="flex flex-wrap gap-2 items-center font-mono text-xs">
                <span className="border px-2 py-1">提议</span>
                <span className="text-muted-foreground">→</span>
                <span className="border px-2 py-1">评审</span>
                <span className="text-muted-foreground">→</span>
                <span className="border px-2 py-1">实现</span>
                <span className="text-muted-foreground">→</span>
                <span className="border px-2 py-1">文档</span>
                <span className="text-muted-foreground">→</span>
                <span className="border px-2 py-1">合并</span>
              </div>
            </div>
          </div>

          <div>
            <SubHeading>PROPOSAL TEMPLATE</SubHeading>
            <div className="border p-4 bg-muted/20">
              <pre className="font-mono text-xs text-muted-foreground leading-relaxed">
{`## 组件提议: [Name]

**问题**: 描述当前缺少什么
**提议**: 新组件/token/pattern 的定义
**复用场景**: 列出 3+ 个使用位置
**参考**: 其他设计系统的实现链接
**替代方案**: 为什么不用已有组件解决`}</pre>
            </div>
          </div>

          <div>
            <SubHeading>HOUSE RULES</SubHeading>
            <div className="border p-4 space-y-2">
              {[
                "新组件必须有 ≥3 处真实使用场景",
                "Token 修改影响全局，需要团队评审",
                "Breaking change 需要迁移计划",
                "所有贡献必须通过 lint + typecheck",
                "UI 变更附截图（light + dark）",
              ].map((rule) => (
                <div key={rule} className="flex gap-2 text-xs">
                  <span className="text-muted-foreground shrink-0">·</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
