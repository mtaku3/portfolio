import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { ThemeProvider } from "../_components/ThemeProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
  modal: React.ReactNode;
};

export default function RootLayout({ children, params, modal }: Props) {
  return (
    <html lang={params.lang}>
      <body>
        <ThemeProvider attribute="class">
          <main
            className="
              flex min-h-full w-full flex-col px-4
              md:px-6
              lg:px-24
              xl:mx-auto xl:max-w-screen-lg xl:px-0
            "
          >
            <Header lang={params.lang} />
            <article
              className="
                grid w-full grid-cols-12 gap-1
                md:gap-2
                lg:gap-4
              "
            >
              {children}
              {modal}
            </article>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
