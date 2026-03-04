import { Webhooks } from "@dodopayments/nextjs";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { payment } from "@/db/schema";

export const POST = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET!,
  onPaymentSucceeded: async (payload) => {
    const data = payload.data;
    const customerEmail = data.customer.email;

    await db
      .insert(payment)
      .values({
        paymentId: data.payment_id,
        userId: sql`(SELECT id FROM "user" WHERE email = ${customerEmail} LIMIT 1)`,
        customerEmail,
        amount: data.total_amount,
        currency: data.currency,
        productId: data.product_cart![0].product_id,
        createdAt: new Date(data.created_at),
      })
      .onConflictDoNothing();
  },
  onPaymentFailed: async (payload) => {
    console.log("Payment failed:", payload);
  },
});
