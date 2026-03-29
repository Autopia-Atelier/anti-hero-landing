import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/mode-toggle/theme-provider";
import { Toaster } from "sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from 'geist/font/pixel';

const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "Akira | Modern Next.js Starter",
  description: "A modern starter with Next.js, Tailwind, ShadCN/ui, Motion, Drizzle, Postgres, Auth, Dodo Payments, and Resend.",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-black.svg",
      href: "/favicon-black.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-white.svg",
      href: "/favicon-white.svg",
    }
  ],
  openGraph: {
    title: "Akira | Modern Next.js Starter",
    description: "A modern starter with Next.js, Tailwind, ShadCN/ui, Motion, Drizzle, Postgres, Auth, Dodo Payments, and Resend.",
    siteName: "Akira",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Akira - Modern Next.js Starter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akira | Modern Next.js Starter",
    description: "A modern starter with Next.js, Tailwind, ShadCN/ui, Motion, Drizzle, Postgres, Auth, Dodo Payments, and Resend.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
