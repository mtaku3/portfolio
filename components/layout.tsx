import React from "react";
import Footer from "./footer";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white dark:bg-black">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
