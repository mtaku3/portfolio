import clsx from "clsx";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	className?: string;
	children?: string;
};

export default function Markdown({ className, children }: Props) {
	// TODO: Add support for syntax highlighting
	// TODO: Add support for math equations
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			className={clsx("markdown", className)}
		>
			{children}
		</ReactMarkdown>
	);
}
