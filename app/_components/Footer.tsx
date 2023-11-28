import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="col-span-full mb-4 mt-auto flex flex-col space-y-4">
			<hr className="w-full border-t border-zinc-600 dark:border-zinc-400" />
			<div className="flex w-full items-center">
				<p className="text-sm font-bold md:text-lg">
					Developed by <span className="underline">mtaku3</span>
				</p>
				<div className="ml-auto space-x-2">
					<Link href="https://github.com/mtaku3" target="_blank">
						<SiGithub className="h-5 w-5 md:h-6 md:w-6" />
					</Link>
				</div>
			</div>
		</footer>
	);
}
