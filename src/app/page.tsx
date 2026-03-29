import type { Metadata } from "next";
import { HomePageClient } from "./home-page-client";

export const metadata: Metadata = {
  title: "Anti Hero | Agent Red Teaming",
  description: "Anti Hero is an adversarial AI agent red-teaming platform for finding exploitable paths before production.",
};

export default function HomePage() {
  return <HomePageClient />;
}
