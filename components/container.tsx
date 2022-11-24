import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`w-11/12 lg:w-1/2 ${className !== undefined ? className : ""}`}
    >
      {children}
    </div>
  );
}
