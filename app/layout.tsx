import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | mtaku3's Portfolio",
    default: "mtaku3's Portfolio",
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
    </html>
  );
}
