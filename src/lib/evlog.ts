/**
 * [INPUT]: 依赖 evlog/next, evlog/next/instrumentation, evlog/fs
 * [OUTPUT]: 对外提供 withEvlog, useLogger, log, createError, register, onRequestError
 * [POS]: lib/ 的日志基础设施，全局唯一 evlog 实例
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createEvlog } from 'evlog/next'
import { createInstrumentation } from 'evlog/next/instrumentation'
import { createFsDrain } from 'evlog/fs'

/* ------------------------------------------------------------------ */
/*  Drain — 本地 NDJSON 文件，生产环境可替换为 Axiom / OTLP 等        */
/* ------------------------------------------------------------------ */

const drain = createFsDrain()

/* ------------------------------------------------------------------ */
/*  Per-request wide events                                           */
/* ------------------------------------------------------------------ */

export const { withEvlog, useLogger, log, createError } = createEvlog({
  service: 'anti-hero',

  routes: {
    '/api/auth/**': { service: 'auth' },
    '/api/checkout/**': { service: 'checkout' },
    '/api/webhook/**': { service: 'webhook' },
  },

  sampling: {
    keep: [
      { status: 400 },
      { duration: 1000 },
    ],
  },

  drain,
})

/* ------------------------------------------------------------------ */
/*  Instrumentation — server startup + unhandled error reporting      */
/* ------------------------------------------------------------------ */

export const { register, onRequestError } = createInstrumentation({
  service: 'anti-hero',
  drain,
  captureOutput: true,
})
