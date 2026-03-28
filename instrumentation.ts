/**
 * [INPUT]: 依赖 evlog/next/instrumentation, src/lib/evlog
 * [OUTPUT]: 对外提供 register, onRequestError（Next.js 自动调用）
 * [POS]: 项目根目录 instrumentation hook，仅在 Node 运行时加载 evlog
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineNodeInstrumentation } from 'evlog/next/instrumentation'

export const { register, onRequestError } = defineNodeInstrumentation(
  () => import('./src/lib/evlog'),
)
