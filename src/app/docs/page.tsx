import type { Metadata } from "next";
import DocsPageClient from "./docs-page-client";

export const metadata: Metadata = {
  title: "Docs",
  description: "Set up Akira in four quick steps.",
};

export default function DocsPage() {
  return <DocsPageClient />;
}
