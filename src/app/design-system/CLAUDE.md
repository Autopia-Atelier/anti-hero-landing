# design-system/
> L2 | 父级: src/app/CLAUDE.md

## 成员清单

page.tsx: 总览页，4+2 类目入口卡片，链接到子路由
layout.tsx: 共享布局，顶栏 + 侧边导航，响应式
language/page.tsx: 设计语言，品牌/调性/写作指南/mascot
foundations/page.tsx: 基础，色彩/布局/字体/阴影/动效/图标
components/page.tsx: 29 个 UI 组件展示，按功能分组
maintenance/page.tsx: GEB 协议/文档模板/贡献指南
motion/page.tsx: 动画设计系统，18 skill 知识体系，anime.js live demo
dashboard/page.tsx: Dashboard 组件展示，React Flow + anime.js

## _components/

color-swatch.tsx: ColorSwatch 色板组件
component-card.tsx: ComponentCard 组件展示卡片
dashboard-data.ts: Dashboard mock 数据（攻击链/agent/pipeline/terminal）
motion-demos.tsx: 动画 live demo（TimingBar/EasingPreview/MicroDemo/StaggerDemo/BrandMotionDemo/TimelineDemo）
nav-data.ts: 导航结构 + 色板/间距/圆角/组件 variant 常量
section.tsx: Section/SectionDivider/CornerBrackets/SubHeading 布局组件

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
