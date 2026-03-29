/**
 * [INPUT]: 依赖 ui/* 全部组件, _components/section, _components/component-card, _components/nav-data
 * [OUTPUT]: Components 页（29 个组件展示）
 * [POS]: design-system/components 的入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  ArrowRight, Terminal, Bug, Shield, ShieldAlert,
  Info, AlertTriangle, CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionDivider, CornerBrackets, SubHeading } from "../_components/section";
import { ComponentCard } from "../_components/component-card";
import { BUTTON_VARIANTS, BUTTON_SIZES, BADGE_VARIANTS } from "../_components/nav-data";

export const metadata: Metadata = {
  title: "Components | Anti Hero Design System",
  description: "Anti Hero 设计系统组件页：基于 shadcn/ui 与 Radix 的可复用组件展示。",
};

/* ─────────────────────────────────────────────
 * 页面
 * ───────────────────────────────────────────── */

export default function ComponentsPage() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="font-pixel-square text-3xl mb-2">Components</h1>
        <p className="text-sm text-muted-foreground">
          基于 shadcn/ui + Radix 的 29 个可复用组件，CVA 驱动 variant 系统
        </p>
      </div>

      {/* ━━ Actions ━━ */}
      <Section id="actions" title="Actions" desc="触发操作的交互组件">
        <div className="space-y-4">
          <ComponentCard name="Button" desc="6 variants × 4 sizes + icon + states + Anti-Hero 风格">
            <div className="w-full space-y-4">
              <div className="flex flex-wrap gap-2">
                {BUTTON_VARIANTS.map((v) => <Button key={v} variant={v} size="sm">{v}</Button>)}
              </div>
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                {BUTTON_SIZES.map((s) => <Button key={s} size={s}>{String(s)}</Button>)}
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Button><ArrowRight /> 继续</Button>
                <Button variant="outline"><Terminal /> 终端</Button>
                <Button variant="destructive"><Bug /> 攻击</Button>
                <Button disabled>Disabled</Button>
                <Button><Spinner className="size-4" /> Loading</Button>
              </div>
              <Separator />
              <SubHeading>ANTI-HERO STYLE</SubHeading>
              <div className="flex gap-4">
                <CornerBrackets dashed>
                  <Button className="rounded-none h-8 px-3">Primary</Button>
                </CornerBrackets>
                <CornerBrackets>
                  <Button variant="outline" className="rounded-none h-8 px-3 border-dashed">Secondary</Button>
                </CornerBrackets>
              </div>
            </div>
          </ComponentCard>
          <ComponentCard name="Link" desc="Next.js Link + Anti-Hero 样式">
            <Link href="#" className="text-sm underline underline-offset-4 hover:text-muted-foreground transition-colors">默认链接</Link>
            <Link href="#" className="text-sm font-mono border-b border-dashed border-foreground/50 hover:border-foreground transition-colors">虚线链接</Link>
            <Link href="#" className="text-sm flex items-center gap-1 hover:text-muted-foreground transition-colors">
              带图标 <ArrowRight className="size-3" />
            </Link>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Feedback ━━ */}
      <Section id="feedback" title="Feedback" desc="状态反馈与通知">
        <div className="space-y-4">
          <ComponentCard name="Alert" desc="4 种语义状态">
            <div className="w-full space-y-3">
              <Alert>
                <Info className="size-4" />
                <AlertTitle>信息</AlertTitle>
                <AlertDescription>探测任务已加入队列。</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>漏洞发现</AlertTitle>
                <AlertDescription>检测到 Prompt Injection 攻击路径。</AlertDescription>
              </Alert>
            </div>
          </ComponentCard>
          <ComponentCard name="Badge" desc="4 variants + 状态指示器">
            <div className="w-full space-y-3">
              <div className="flex flex-wrap gap-2">
                {BADGE_VARIANTS.map((v) => <Badge key={v} variant={v}>{v}</Badge>)}
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Running
                </Badge>
                <Badge variant="destructive" className="gap-1.5"><Bug className="size-3" />Vulnerability</Badge>
                <Badge variant="secondary" className="gap-1.5"><Shield className="size-3" />Protected</Badge>
              </div>
            </div>
          </ComponentCard>
          <ComponentCard name="Progress" desc="进度条">
            <div className="w-full space-y-3">
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </div>
          </ComponentCard>
          <ComponentCard name="Skeleton" desc="加载占位">
            <div className="w-full flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[40%]" />
              </div>
            </div>
          </ComponentCard>
          <ComponentCard name="Spinner" desc="加载旋转">
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
            <Spinner className="size-10 text-muted-foreground" />
          </ComponentCard>
          <ComponentCard name="Toast" desc="基于 Sonner · 通过 toast() 函数调用">
            <p className="text-xs text-muted-foreground font-mono">
              import {"{"} toast {"}"} from &quot;sonner&quot;
              <br />
              toast(&quot;探测完成&quot;, {"{"} description: &quot;发现 3 个高危路径&quot; {"}"})
            </p>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Data Input ━━ */}
      <Section id="data-input" title="Data Input" desc="表单输入组件">
        <div className="space-y-4">
          <ComponentCard name="Checkbox" desc="二选一勾选">
            <div className="flex items-center gap-2">
              <Checkbox id="c1" defaultChecked />
              <Label htmlFor="c1">启用自动扫描</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c2" />
              <Label htmlFor="c2">发送报告邮件</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="c3" disabled />
              <Label htmlFor="c3" className="text-muted-foreground">Disabled</Label>
            </div>
          </ComponentCard>
          <ComponentCard name="Input" desc="单行文本输入">
            <div className="w-full space-y-3">
              <Input placeholder="Agent 名称" />
              <Input placeholder="Disabled" disabled />
              <div className="space-y-1">
                <Label htmlFor="err">攻击目标</Label>
                <Input id="err" placeholder="target-agent-id" aria-invalid="true" />
                <p className="text-xs text-destructive">目标 Agent ID 不能为空</p>
              </div>
            </div>
          </ComponentCard>
          <ComponentCard name="Label" desc="表单标签">
            <Label>Agent 配置</Label>
            <Label className="text-muted-foreground">可选字段</Label>
          </ComponentCard>
          <ComponentCard name="Radio Group" desc="单选组">
            <RadioGroup defaultValue="fast">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="fast" id="r1" />
                <Label htmlFor="r1">快速扫描</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="deep" id="r2" />
                <Label htmlFor="r2">深度渗透</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="stealth" id="r3" />
                <Label htmlFor="r3">隐蔽模式</Label>
              </div>
            </RadioGroup>
          </ComponentCard>
          <ComponentCard name="Select" desc="下拉选择">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="攻击向量" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="injection">Prompt Injection</SelectItem>
                <SelectItem value="tool-misuse">Tool Misuse</SelectItem>
                <SelectItem value="memory">Memory Poisoning</SelectItem>
                <SelectItem value="hijack">Goal Hijacking</SelectItem>
              </SelectContent>
            </Select>
          </ComponentCard>
          <ComponentCard name="Switch" desc="开关切换">
            <div className="flex items-center gap-2">
              <Switch id="sw1" defaultChecked />
              <Label htmlFor="sw1">沙盒模式</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw2" />
              <Label htmlFor="sw2">详细日志</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw3" disabled />
              <Label htmlFor="sw3" className="text-muted-foreground">Disabled</Label>
            </div>
          </ComponentCard>
          <ComponentCard name="Textarea" desc="多行文本输入">
            <div className="w-full space-y-2">
              <Textarea placeholder="输入自定义攻击 prompt…" />
              <Textarea placeholder="Disabled" disabled />
            </div>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Data Display ��━ */}
      <Section id="data-display" title="Data Display" desc="数据展示组件">
        <div className="space-y-4">
          <ComponentCard name="Accordion" desc="折叠面板">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Prompt Injection</AccordionTrigger>
                <AccordionContent>
                  通过构造恶意输入覆盖 Agent 的系统指令，使其执行非预期操作。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Tool Misuse</AccordionTrigger>
                <AccordionContent>
                  利用 Agent 可调用的工具链实现越权操作或数据���露。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Memory Poisoning</AccordionTrigger>
                <AccordionContent>
                  在跨会话记忆中注入恶意上下文，影响 Agent 后续行为。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentCard>
          <ComponentCard name="Avatar" desc="用户头像 + fallback">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="user" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">S</AvatarFallback>
            </Avatar>
          </ComponentCard>
          <ComponentCard name="Card" desc="内容容器">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="size-4" /> 扫描报告
                </CardTitle>
                <CardDescription>2026-03-28 · Agent: stewie-v1</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>高危</span><span className="font-mono text-destructive">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>中危</span><span className="font-mono">7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>低危</span><span className="font-mono text-muted-foreground">12</span>
                </div>
              </CardContent>
            </Card>
          </ComponentCard>
          <ComponentCard name="Calendar" desc="日期选择（需客户端交互，此处展示结构）">
            <p className="text-xs text-muted-foreground font-mono">
              import {"{"} Calendar {"}"} from &quot;@/components/ui/calendar&quot;
              <br />
              &lt;Calendar mode=&quot;single&quot; selected={"{date}"} onSelect={"{setDate}"} /&gt;
            </p>
          </ComponentCard>
          <ComponentCard name="Carousel" desc="轮播组件（需 Embla · 客户端交互）">
            <p className="text-xs text-muted-foreground font-mono">
              import {"{"} Carousel, CarouselContent, CarouselItem {"}"} from &quot;@/components/ui/carousel&quot;
            </p>
          </ComponentCard>
          <ComponentCard name="Icon" desc="Lucide React · 直接使用">
            <div className="flex gap-3">
              <Shield className="size-5" />
              <Bug className="size-5" />
              <Terminal className="size-5" />
              <CheckCircle className="size-5" />
            </div>
          </ComponentCard>
          <ComponentCard name="Image" desc="Next.js Image · 优化加载">
            <div className="flex gap-4 items-center">
              <Image src="/favicon-black.svg" alt="Anti Hero" width={32} height={32} className="dark:hidden" />
              <Image src="/favicon-white.svg" alt="Anti Hero" width={32} height={32} className="hidden dark:block" />
              <span className="text-xs text-muted-foreground font-mono">next/image · 自动 WebP · lazy load</span>
            </div>
          </ComponentCard>
          <ComponentCard name="List" desc="语义化列表">
            <div className="w-full flex gap-8">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Prompt Injection</li>
                <li>Tool Misuse</li>
                <li>Memory Poisoning</li>
              </ul>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>扫描目标</li>
                <li>执行攻击</li>
                <li>生成报告</li>
              </ol>
            </div>
          </ComponentCard>
          <ComponentCard name="Tooltip" desc="悬浮提示（需 TooltipProvider · 客户端）">
            <p className="text-xs text-muted-foreground font-mono">
              &lt;TooltipProvider&gt;
              <br />
              {"  "}&lt;Tooltip&gt;&lt;TooltipTrigger&gt;Hover&lt;/TooltipTrigger&gt;
              <br />
              {"  "}&lt;TooltipContent&gt;提示内容&lt;/TooltipContent&gt;&lt;/Tooltip&gt;
              <br />
              &lt;/TooltipProvider&gt;
            </p>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Navigation ━━ */}
      <Section id="navigation" title="Navigation" desc="导航与路径组件">
        <div className="space-y-4">
          <ComponentCard name="Breadcrumb" desc="路径导航">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Agents</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>stewie-v1</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ComponentCard>
          <ComponentCard name="Dropdown Menu" desc="已安装 · 下拉菜单">
            <p className="text-xs text-muted-foreground font-mono">
              import {"{"} DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem {"}"} from &quot;@/components/ui/dropdown-menu&quot;
            </p>
          </ComponentCard>
          <ComponentCard name="Pagination" desc="分页导航">
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentCard>
          <ComponentCard name="Tabs" desc="标签页切换">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="attacks">攻击路径</TabsTrigger>
                <TabsTrigger value="report">报告</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm text-muted-foreground">
                Agent 安全态势概览
              </TabsContent>
              <TabsContent value="attacks" className="text-sm text-muted-foreground">
                已验证的攻击路径列表
              </TabsContent>
              <TabsContent value="report" className="text-sm text-muted-foreground">
                PoC 报告与修复建议
              </TabsContent>
            </Tabs>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Overlays ━━ */}
      <Section id="overlays" title="Overlays" desc="浮层与对话框">
        <div className="space-y-4">
          <ComponentCard name="Dialog" desc="模态对话框（需客户端交互）">
            <p className="text-xs text-muted-foreground font-mono">
              &lt;Dialog&gt;
              <br />
              {"  "}&lt;DialogTrigger asChild&gt;&lt;Button&gt;打开&lt;/Button&gt;&lt;/DialogTrigger&gt;
              <br />
              {"  "}&lt;DialogContent&gt;
              <br />
              {"    "}&lt;DialogHeader&gt;&lt;DialogTitle&gt;确认销毁&lt;/DialogTitle&gt;&lt;/DialogHeader&gt;
              <br />
              {"    "}&lt;DialogFooter&gt;&lt;Button variant=&quot;destructive&quot;&gt;销毁&lt;/Button&gt;&lt;/DialogFooter&gt;
              <br />
              {"  "}&lt;/DialogContent&gt;
              <br />
              &lt;/Dialog&gt;
            </p>
          </ComponentCard>
        </div>
      </Section>

      <SectionDivider />

      {/* ━━ Layout ━━ */}
      <Section id="layout-components" title="Layout" desc="布局与分隔">
        <div className="space-y-4">
          <ComponentCard name="Separator" desc="水平 / 垂直分隔线">
            <div className="w-full space-y-3">
              <Separator />
              <div className="flex items-center gap-4 h-6">
                <span className="text-sm">左</span>
                <Separator orientation="vertical" />
                <span className="text-sm">中</span>
                <Separator orientation="vertical" />
                <span className="text-sm">右</span>
              </div>
            </div>
          </ComponentCard>
        </div>
      </Section>
    </div>
  );
}
