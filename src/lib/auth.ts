import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { Resend } from "resend";
import WelcomeEmail from "@/components/email/email";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  authInstance = betterAuth({
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            const resendApiKey = process.env.RESEND_API_KEY;
            if (!resendApiKey) {
              console.warn("[auth] RESEND_API_KEY missing, skip welcome email");
              return;
            }

            const resend = new Resend(resendApiKey);
            const { data, error } = await resend.emails.send({
              from: "onboarding@resend.dev",
              to: user.email,
              subject: "Welcome!",
              react: WelcomeEmail({
                name: user.name?.split(" ")[0] ?? "there",
              }),
            });
            if (error) console.error("[auth] resend error:", error);
            else console.log("[auth] email sent:", data);
          },
        },
      },
    },
  });

  return authInstance;
}
