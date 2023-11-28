"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
	className?: string;
};

export default function ThemeSwitch({ className }: Props) {
	const { setTheme } = useTheme();

	return (
		<>
			<button
				className={clsx("dark:hidden", className)}
				onClick={() => setTheme("dark")}
			>
				<Moon className="h-5 w-5 md:h-6 md:w-6" />
			</button>
			<button
				className={clsx("hidden dark:inline-block", className)}
				onClick={() => setTheme("light")}
			>
				<Sun className="h-5 w-5 md:h-6 md:w-6" />
			</button>
		</>
	);
}
