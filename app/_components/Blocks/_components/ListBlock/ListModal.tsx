"use client";

import Modal from "@/app/_components/Modal";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
	buttonText: string;
	children?: React.ReactNode;
};

export default function ListModal({ buttonText, children }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}

	return (
		<>
			<li
				onClick={open}
				className="relative -left-2 cursor-pointer rounded-md p-2 text-sm text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800 md:text-base"
			>
				{buttonText}
			</li>
			<Modal isOpen={isOpen} close={close}>
				<div className="h-full w-full bg-noise-white p-8 dark:bg-noise-dark md:h-auto md:w-[640px] md:rounded-md md:border md:border-gray-300 md:dark:border-gray-800">
					<div className="mb-8 space-y-4 md:hidden">
						<button onClick={close}>
							<X className="h-6 w-6" />
						</button>
						<hr className="border-t border-gray-300" />
					</div>
					{children}
				</div>
			</Modal>
		</>
	);
}
