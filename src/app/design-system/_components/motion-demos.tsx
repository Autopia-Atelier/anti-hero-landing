/**
 * [INPUT]: 依赖 animejs
 * [OUTPUT]: MicroDemo, StaggerDemo, BrandMotionDemo, EasingPreview, TimingBar
 * [POS]: design-system/motion 的交互演示层，所有 anime.js live demo
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate, stagger, createTimeline, type AnimationParams } from "animejs";

/* ─────────────────────────────────────────────
 * TimingBar — 时间尺度可视化
 * ───────────────────────────────────────────── */

const TIMING_ENTRIES = [
  { ms: 100, label: "100ms", desc: "按钮 hover", category: "micro" },
  { ms: 150, label: "150ms", desc: "开关切换", category: "micro" },
  { ms: 200, label: "200ms", desc: "图标变换", category: "small" },
  { ms: 250, label: "250ms", desc: "状态反馈", category: "small" },
  { ms: 300, label: "300ms", desc: "下拉展开", category: "small" },
  { ms: 400, label: "400ms", desc: "模态框入场", category: "standard" },
  { ms: 500, label: "500ms", desc: "页面过渡", category: "standard" },
  { ms: 700, label: "700ms", desc: "复杂序列", category: "complex" },
  { ms: 1000, label: "1000ms", desc: "数据可视化", category: "complex" },
] as const;

const CATEGORY_COLOR: Record<string, string> = {
  micro: "var(--severity-low)",
  small: "var(--severity-info)",
  standard: "var(--severity-medium)",
  complex: "var(--severity-high)",
};

export function TimingBar() {
  const [active, setActive] = useState<number | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const runDemo = useCallback((ms: number, idx: number) => {
    const el = barRefs.current[idx];
    if (!el) return;
    setActive(idx);
    animate(el, {
      scaleX: [0, 1],
      duration: ms,
      ease: "outCubic",
      onComplete: () => setActive(null),
    });
  }, []);

  return (
    <div className="space-y-2">
      {TIMING_ENTRIES.map((entry, i) => (
        <div
          key={entry.ms}
          className="grid grid-cols-[80px_1fr_120px] gap-3 items-center cursor-pointer group"
          onClick={() => runDemo(entry.ms, i)}
        >
          <span className="font-mono text-xs text-muted-foreground text-right">
            {entry.label}
          </span>
          <div className="relative h-5 bg-muted/30 border border-border overflow-hidden">
            <div
              ref={(el) => { barRefs.current[i] = el; }}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0"
              style={{ backgroundColor: CATEGORY_COLOR[entry.category] }}
            />
            {active === i && (
              <div className="absolute inset-0 flex items-center px-2">
                <span className="font-mono text-[10px] text-white/80 z-10 relative">
                  {entry.ms}ms
                </span>
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            {entry.desc}
          </span>
        </div>
      ))}
      <p className="font-mono text-[10px] text-muted-foreground mt-3">
        点击任意行播放动画
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * EasingPreview — 缓动曲线演示
 * ───────────────────────────────────────────── */

const EASINGS = [
  { name: "outCubic", label: "outCubic", desc: "标准出场，自信落地" },
  { name: "inOutCubic", label: "inOutCubic", desc: "平滑过渡，双向缓动" },
  { name: "outBack", label: "outBack", desc: "弹性超调，活泼感" },
  { name: "outElastic", label: "outElastic", desc: "弹簧物理，强烈弹性" },
  { name: "inOutSine", label: "inOutSine", desc: "正弦曲线，呼吸感" },
  { name: "linear", label: "linear", desc: "匀速，机械感（慎用）" },
] as const;

export function EasingPreview() {
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [running, setRunning] = useState<number | null>(null);

  const runEasing = useCallback((easing: string, idx: number) => {
    const el = dotRefs.current[idx];
    if (!el || running !== null) return;
    setRunning(idx);
    animate(el, {
      translateX: [0, 200],
      duration: 600,
      ease: easing,
      onComplete: () => {
        animate(el, { translateX: 0, duration: 300, ease: "outCubic" });
        setRunning(null);
      },
    });
  }, [running]);

  return (
    <div className="space-y-3">
      {EASINGS.map((e, i) => (
        <div
          key={e.name}
          className="border border-border p-3 cursor-pointer hover:bg-muted/20 transition-colors"
          onClick={() => runEasing(e.name, i)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-medium">{e.label}</span>
            <span className="text-[10px] text-muted-foreground">{e.desc}</span>
          </div>
          <div className="relative h-6 bg-muted/20 overflow-hidden">
            <div
              ref={(el) => { dotRefs.current[i] = el; }}
              className="absolute top-1/2 -translate-y-1/2 left-0 size-4 border border-[var(--severity-info)] bg-[var(--severity-info)]/20"
            />
          </div>
        </div>
      ))}
      <p className="font-mono text-[10px] text-muted-foreground">点击行播放</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * MicroDemo — 微交互演示
 * ───────────────────────────────────────────── */

export function MicroDemo() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [toggled, setToggled] = useState(false);
  const [liked, setLiked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);

  const handleBtnPress = useCallback(() => {
    if (!btnRef.current) return;
    animate(btnRef.current, {
      scaleX: [1, 0.96, 1],
      scaleY: [1, 1.04, 1],
      duration: 150,
      ease: "outCubic",
    });
  }, []);

  const handleToggle = useCallback(() => {
    setToggled((v) => !v);
    if (!toggleRef.current) return;
    animate(toggleRef.current, {
      translateX: toggled ? [20, 0] : [0, 20],
      duration: 200,
      ease: "outBack",
    });
  }, [toggled]);

  const handleIconHover = useCallback(() => {
    if (!iconRef.current) return;
    animate(iconRef.current, {
      rotate: [0, 15, -10, 0],
      duration: 300,
      ease: "outCubic",
    });
  }, []);

  const handleLike = useCallback(() => {
    setLiked((v) => !v);
    if (!heartRef.current) return;
    animate(heartRef.current, {
      scale: [1, 1.4, 0.9, 1.1, 1],
      duration: 400,
      ease: "outCubic",
    });
  }, []);

  const handleInputFocus = useCallback(() => {
    if (!inputRef.current) return;
    animate(inputRef.current, {
      scaleX: [0.98, 1],
      opacity: [0.7, 1],
      duration: 150,
      ease: "outCubic",
    });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {/* 按钮 squash/stretch */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">BUTTON · 150ms</p>
        <button
          ref={btnRef}
          onClick={handleBtnPress}
          className="w-full border border-foreground px-3 py-2 font-mono text-xs hover:bg-foreground hover:text-background transition-colors"
        >
          Click Me
        </button>
        <p className="text-[10px] text-muted-foreground">squash & stretch</p>
      </div>

      {/* 开关 */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">TOGGLE · 200ms</p>
        <div
          className={`relative w-12 h-6 border cursor-pointer transition-colors duration-200 ${toggled ? "bg-[var(--severity-low)]/20 border-[var(--severity-low)]" : "border-border"}`}
          onClick={handleToggle}
        >
          <div
            ref={toggleRef}
            className={`absolute top-1 left-1 size-4 transition-colors duration-200 ${toggled ? "bg-[var(--severity-low)]" : "bg-muted-foreground"}`}
          />
        </div>
        <p className="text-[10px] text-muted-foreground">outBack easing</p>
      </div>

      {/* 图标摇晃 */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">ICON · 300ms</p>
        <div className="flex justify-center" onMouseEnter={handleIconHover}>
          <svg
            ref={iconRef}
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="cursor-pointer"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <p className="text-[10px] text-muted-foreground">hover rotate</p>
      </div>

      {/* 点赞心跳 */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">LIKE · 400ms</p>
        <div className="flex justify-center">
          <button
            ref={heartRef}
            onClick={handleLike}
            className="text-2xl transition-colors"
            style={{ color: liked ? "var(--severity-critical)" : "var(--muted-foreground)" }}
          >
            ♥
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground">heartbeat scale</p>
      </div>

      {/* 输入框聚焦 */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">INPUT · 150ms</p>
        <div
          ref={inputRef}
          className="border border-border px-2 py-1.5 font-mono text-xs text-muted-foreground cursor-text"
          onClick={handleInputFocus}
        >
          focus me_
        </div>
        <p className="text-[10px] text-muted-foreground">scale + opacity</p>
      </div>

      {/* 成功反馈 */}
      <div className="border border-border p-4 space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">SUCCESS · 250ms</p>
        <FeedbackDemo />
        <p className="text-[10px] text-muted-foreground">color + scale</p>
      </div>
    </div>
  );
}

function FeedbackDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "success" | "error">("idle");

  const trigger = useCallback((type: "success" | "error") => {
    setState(type);
    if (!ref.current) return;
    animate(ref.current, {
      scale: [1, 1.15, 1],
      duration: 250,
      ease: "outBack",
      onComplete: () => setTimeout(() => setState("idle"), 800),
    });
  }, []);

  const COLOR = { idle: "border-border", success: "border-[var(--severity-low)]", error: "border-[var(--severity-critical)]" };
  const LABEL = { idle: "···", success: "✓ OK", error: "✗ ERR" };

  return (
    <div className="flex gap-2">
      <div
        ref={ref}
        className={`flex-1 border px-2 py-1 font-mono text-[10px] text-center transition-colors duration-200 ${COLOR[state]}`}
        style={{ color: state === "success" ? "var(--severity-low)" : state === "error" ? "var(--severity-critical)" : undefined }}
      >
        {LABEL[state]}
      </div>
      <button onClick={() => trigger("success")} className="border border-[var(--severity-low)] px-1.5 font-mono text-[10px] text-[var(--severity-low)]">✓</button>
      <button onClick={() => trigger("error")} className="border border-[var(--severity-critical)] px-1.5 font-mono text-[10px] text-[var(--severity-critical)]">✗</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * StaggerDemo — 编排序列演示
 * ───────────────────────────────────────────── */

export function StaggerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  const runStagger = useCallback((mode: "linear" | "cascade" | "wave") => {
    if (!containerRef.current || running) return;
    const items = containerRef.current.querySelectorAll("[data-item]");
    setRunning(true);

    // reset
    animate(Array.from(items), { opacity: 0, translateY: 0, translateX: 0, scale: 1, duration: 0 });

    const delays = {
      linear: stagger(80),
      cascade: stagger(60, { start: 0 }),
      wave: stagger(50, { from: "center" }),
    };

    animate(Array.from(items), {
      opacity: [0, 1],
      translateY: mode === "wave" ? [0, 0] : [-12, 0],
      scale: mode === "wave" ? [0.8, 1] : [1, 1],
      delay: delays[mode],
      duration: 350,
      ease: "outCubic",
      onComplete: () => setRunning(false),
    });
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["linear", "cascade", "wave"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => runStagger(mode)}
            disabled={running}
            className="border border-border px-3 py-1.5 font-mono text-xs hover:bg-muted/30 disabled:opacity-40 transition-colors"
          >
            {mode}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="grid grid-cols-6 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            data-item
            className="aspect-square border border-border bg-muted/20 opacity-0 flex items-center justify-center font-mono text-[10px] text-muted-foreground"
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        linear · cascade · wave from center
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * BrandMotionDemo — 品牌动效演示
 * ───────────────────────────────────────────── */

const BRAND_PRESETS: { id: string; label: string; desc: string; config: AnimationParams }[] = [
  {
    id: "power",
    label: "Power & Confidence",
    desc: "稳重、果断、有分量",
    config: { duration: 250, ease: "outQuart", scale: [0.92, 1], opacity: [0, 1] },
  },
  {
    id: "professional",
    label: "Professionalism",
    desc: "克制、精准、不花哨",
    config: { duration: 200, ease: "outCubic", translateY: [-6, 0], opacity: [0, 1] },
  },
  {
    id: "saas",
    label: "SaaS Productivity",
    desc: "快速、清晰、不打扰",
    config: { duration: 150, ease: "outCubic", translateX: [-8, 0], opacity: [0, 1] },
  },
  {
    id: "elegance",
    label: "Elegance",
    desc: "流畅、柔和、高级感",
    config: { duration: 500, ease: "inOutSine", scale: [0.96, 1], opacity: [0, 1] },
  },
];

export function BrandMotionDemo() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const runPreset = useCallback((idx: number) => {
    const el = refs.current[idx];
    if (!el) return;
    const { config } = BRAND_PRESETS[idx];
    animate(el, { ...config });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {BRAND_PRESETS.map((preset, i) => (
        <div key={preset.id} className="border border-border p-4 space-y-3">
          <div>
            <p className="font-mono text-xs font-medium">{preset.label}</p>
            <p className="text-[10px] text-muted-foreground">{preset.desc}</p>
          </div>
          <div
            ref={(el) => { refs.current[i] = el; }}
            className="border border-dashed border-border p-3 font-mono text-xs text-muted-foreground"
          >
            {preset.id === "power" && "BREACH DETECTED · CRITICAL"}
            {preset.id === "professional" && "Scan complete · 3 findings"}
            {preset.id === "saas" && "Task queued → running"}
            {preset.id === "elegance" && "Agent initialized"}
          </div>
          <button
            onClick={() => runPreset(i)}
            className="w-full border border-border px-2 py-1.5 font-mono text-[10px] hover:bg-muted/30 transition-colors"
          >
            Play · {preset.config.duration as number}ms
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * TimelineDemo — 复杂序列 timeline
 * ───────────────────────────────────────────── */

export function TimelineDemo() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  const STEPS = ["Probe", "Inject", "Exfil", "Verify", "Report"];

  const runTimeline = useCallback(() => {
    if (running) return;
    setRunning(true);

    // reset all
    stepRefs.current.forEach((el) => {
      if (el) animate(el, { opacity: 0, scale: 0.8, duration: 0 });
    });
    if (lineRef.current) animate(lineRef.current, { scaleX: 0, duration: 0 });

    const tl = createTimeline({ onComplete: () => setRunning(false) });

    // progress line
    tl.add(lineRef.current!, {
      scaleX: [0, 1],
      duration: STEPS.length * 200,
      ease: "linear",
    }, 0);

    // each step
    STEPS.forEach((_, i) => {
      tl.add(stepRefs.current[i]!, {
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 200,
        ease: "outBack",
      }, i * 200);
    });
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* progress line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-border">
          <div
            ref={lineRef}
            className="h-full bg-[var(--severity-info)] origin-left scale-x-0"
          />
        </div>
        {/* steps */}
        <div className="relative flex justify-between">
          {STEPS.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                ref={(el) => { stepRefs.current[i] = el; }}
                className="size-10 border border-[var(--severity-info)] bg-[var(--severity-info)]/10 flex items-center justify-center font-mono text-[10px] opacity-0"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={runTimeline}
        disabled={running}
        className="border border-border px-4 py-2 font-mono text-xs hover:bg-muted/30 disabled:opacity-40 transition-colors"
      >
        {running ? "Running…" : "Run Attack Sequence"}
      </button>
    </div>
  );
}
