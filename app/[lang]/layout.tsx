import Header from "../_components/Header";
import { ThemeProvider } from "../_components/ThemeProvider";
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
      <body>
        <ThemeProvider attribute="class">
          <main
            className="
              grid w-full grid-cols-12 gap-1 px-4
              md:gap-2 md:px-6
              lg:gap-4 lg:px-24
              xl:mx-auto xl:max-w-screen-lg xl:px-0
            "
          >
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
