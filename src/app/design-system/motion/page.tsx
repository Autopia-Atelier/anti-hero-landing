import type { Metadata } from "next";
import { MotionPageClient } from "./motion-page-client";

export const metadata: Metadata = {
  title: "Motion | Anti Hero Design System",
  description: "Anti Hero 动效设计系统：动画哲学、时间尺度、缓动、序列与品牌动效规范。",
};

export default function MotionPage() {
  return <MotionPageClient />;
}
