/**
 * [INPUT]: 依赖 @dodopayments/nextjs, @/lib/evlog
 * [OUTPUT]: 对外提供 POST handler（Dodo Payments webhook）
 * [POS]: api/webhook/ 的支付回调处理，结构化记录支付事件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Webhooks } from "@dodopayments/nextjs";
import { log } from "@/lib/evlog";

/* DODO 未配置时跳过初始化，避免构建报错 */
export const POST = process.env.DODO_WEBHOOK_SECRET
  ? Webhooks({
      webhookKey: process.env.DODO_WEBHOOK_SECRET,
      onPaymentSucceeded: async (payload) => {
        log.info({
          action: "payment_succeeded",
          paymentId: payload.data.payment_id,
        });
      },
      onPaymentFailed: async (payload) => {
        log.error({
          action: "payment_failed",
          paymentId: payload.data.payment_id,
          payload: payload.data,
        });
      },
    })
  : () => new Response("Webhook not configured", { status: 503 });
