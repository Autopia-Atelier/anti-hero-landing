import { Checkout } from "@dodopayments/nextjs";

/* DODO 未配置时跳过初始化，避免构建报错 */
export const GET = process.env.DODO_API_KEY
  ? Checkout({
      bearerToken: process.env.DODO_API_KEY,
      returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
      environment: "test_mode",
      type: "static",
    })
  : () => new Response("Checkout not configured", { status: 503 });
