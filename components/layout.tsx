import React from "react";
import Header from "./header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-white dark:bg-black">
      <Header />
      {children}
    </div>
  );
}
