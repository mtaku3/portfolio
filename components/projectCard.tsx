import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";

type ProjectCardProps = {
  className?: string;
  description: string;

  id: string;
  title: string;
  image: string;
};

export default function ProjectCard({
  className,
  description,
  id,
  title,
  image,
}: ProjectCardProps) {
  return (
    <Link
      className={`relative group odd:rotate-2 even:-rotate-2 ${
        className !== undefined ? className : ""
      }`}
      href={`/projects/${id}`}
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
          <span className="select-none text-black dark:text-white font-bold">
            {title}
          </span>
          <AiOutlineLink className="text-black dark:text-white" />
        </div>
        <p className="text-xs text-left whitespace-pre-wrap text-black dark:text-white select-none">
          {description}
        </p>
      </div>
    </Link>
  );
}
