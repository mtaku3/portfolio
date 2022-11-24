import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";

type ProjectCardProps = {
  className?: string;
  children: React.ReactNode;

  title: string;
  link: string;
  image: string;
};

export default function ProjectCard({
  className,
  children,
  title,
  link,
  image,
}: ProjectCardProps) {
  return (
    <Link
      className={`relative group odd:rotate-2 even:-rotate-2 ${
        className !== undefined ? className : ""
      }`}
      href={link}
    >
      <Image
        className="h-full w-full rounded-xl -z-10 transition-opacity opacity-30 md:opacity-100 md:group-hover:opacity-30"
        src={image}
        alt={title}
        height={200}
        width={200}
      />
      <div className="absolute left-0 right-0 bottom-0 m-2 transition md:invisible md:group-hover:visible">
        <div className="flex items-center space-x-1">
          <p className="select-none text-black dark:text-white font-bold">
            {title}
          </p>
          <AiOutlineLink className="text-black dark:text-white" />
        </div>
        <p className="text-xs text-left whitespace-normal text-black dark:text-white select-none">
          {children}
        </p>
      </div>
    </Link>
  );
}
