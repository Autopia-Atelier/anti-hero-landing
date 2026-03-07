import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/mode-toggle/theme-provider";
import { Toaster } from "sonner";
import { GeistPixelSquare } from 'geist/font/pixel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable} antialiased`}
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
