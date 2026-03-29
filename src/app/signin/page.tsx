import type { Metadata } from "next";
import { SignInPageClient } from "./signin-page-client";

export const metadata: Metadata = {
  title: "Sign In | Anti Hero",
  description: "Sign in to Anti Hero and continue adversarial agent testing workflows.",
};

export default function SignInPage() {
  return <SignInPageClient />;
}
