import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
