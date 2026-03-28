/**
 * [INPUT]: 依赖 next/server, @/lib/auth, evlog/next
 * [OUTPUT]: 对外提供 default proxy 中间件 + config
 * [POS]: 全局 middleware，认证守卫 + evlog 请求 ID / 计时头注入
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { NextRequest, NextResponse } from "next/server";
import { evlogMiddleware } from "evlog/next";
import { auth } from "@/lib/auth";

/* evlog 注入 x-request-id 和 x-evlog-start 头 */
const withEvlogHeaders = evlogMiddleware();

export default async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return withEvlogHeaders(request);
}

export const config = {
  matcher: ["/docs", "/api/:path*"],
};
