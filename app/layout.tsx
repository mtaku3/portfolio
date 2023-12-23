import "./globals.css";
import { locales } from "@/locales";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | mtaku3's Portfolio",
    default: "mtaku3's Portfolio",
  },
  alternates: {
    canonical: "/",
    languages: locales.reduce(
      (acc, locale) => Object.assign(acc, { [locale]: `/${locale}` }),
      {},
    ),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
