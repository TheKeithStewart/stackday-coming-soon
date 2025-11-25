import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackDay - Time-Blocking That Warns You Before You Overcommit",
  description: "Stop planning impossible days. StackDay warns you when you're overcommitting BEFORE you fail. Built specifically for ADHD brains that struggle with time blindness. Join the waitlist for 40% off.",
  keywords: "ADHD, time blocking, time management, productivity, time blindness, task management, calendar, overcommitment",
  authors: [{ name: "Keith Stewart" }],
  openGraph: {
    title: "Your day has 8 hours. Your tasks have 12. We'll tell you BEFORE you fail.",
    description: "StackDay is the first time-blocking app that warns you when you're overcommitting—before your day begins. Built for ADHD brains.",
    url: "https://stackday.app",
    siteName: "StackDay",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StackDay - Build days that actually fit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StackDay - Time-Blocking for ADHD",
    description: "Stop planning impossible days. Get warned BEFORE you overcommit.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
