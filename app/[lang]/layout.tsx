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
        <main
          className="
            mx-4 grid min-h-screen w-full grid-cols-12 gap-1
            md:gap-2 md:px-6
            lg:gap-4 lg:px-24
            xl:mx-auto xl:max-w-screen-lg xl:px-0
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
