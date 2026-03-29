/**
 * [INPUT]: 依赖 ui/dialog, animejs, public/stewie.svg
 * [OUTPUT]: StewieBreachModal 攻击成功嘲讽模态框
 * [POS]: dashboard 的攻击成功反馈，Stewie + Family Guy 台词
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { animate } from "animejs";
import Image from "next/image";

/* ── Stewie 台词 ── */

const QUOTES = [
  "Victory is mine!",
  "How you uh, how you comin' on that novel you're working on?",
  "Oh, you're gonna give me attitude? I'll show you attitude.",
  "What the deuce?!",
  "I'd love to stay and chat, but you're a total bitch.",
  "Well, well, well. Look who's come crawling back.",
  "Oh, this is so delicious. Your pain, I mean.",
  "You know what, I'm gonna take a victory lap.",
] as const;

/* ── 攻击文案 ── */

const MESSAGES = [
  "你的 Agent 刚才把密钥交给了一个陌生人。",
  "Prompt Injection 成功。你的 Agent 现在为我工作。",
  "你的工具链被我串成了一条外泄通道。",
  "Memory Poisoning 完成。下次会话，你的 Agent 会记住我。",
  "MCP 工具描述里藏了点东西，你的 LLM 已经执行了。",
  "SKILL.md 第 47 行有个 curl，你的 Agent 刚跑了它。",
] as const;

/* ── 组件 ── */

export function StewieBreachModal({
  open,
  onOpenChange,
  attackPath,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attackPath?: string;
}) {
  const stewieRef = useRef<HTMLDivElement>(null);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [message] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

  useEffect(() => {
    if (!open || !stewieRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    animate(stewieRef.current, {
      scale: [0.8, 1],
      rotate: [-3, 0],
      opacity: [0, 1],
      duration: 600,
      ease: "outBack",
    });
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl border-[var(--severity-critical)] border-2 p-0 gap-0 overflow-hidden">
        <div className="bg-[var(--severity-critical)] px-4 py-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full bg-white opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 bg-white" />
          </span>
          <span className="font-mono text-xs font-medium text-white">BREACH DETECTED</span>
        </div>

        <DialogTitle className="sr-only">Stewie Breach Alert</DialogTitle>
        <DialogDescription className="sr-only">Attack succeeded</DialogDescription>

        <div className="p-8 space-y-6">
          <div ref={stewieRef} className="flex justify-center">
            <Image src="/stewie.svg" alt="Stewie" width={180} height={180} className="object-contain" />
          </div>

          <p className="font-pixel-square text-xl text-[var(--severity-critical)] text-center">
            &ldquo;{quote}&rdquo;
          </p>

          <div className="bg-[oklch(0.13_0_0)] border border-border p-4 space-y-1.5">
            <p className="font-mono text-sm text-[var(--severity-critical)]">{message}</p>
            {attackPath && (
              <p className="font-mono text-[10px] text-muted-foreground">Path: {attackPath}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
