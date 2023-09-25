import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mtaku3's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
