"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
	isOpen: boolean;
	close: () => void;
	children?: React.ReactNode;
};

export default function Modal({ isOpen, close, children }: Props) {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen]);

	function handleClose(e: any) {
		if (e.target === e.currentTarget) {
			close();
		}
	}

	const modal = (
		<>
			{isOpen && (
				<div
					className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
					onClick={handleClose}
				>
					{children}
				</div>
			)}
		</>
	);

	return isMounted && createPortal(modal, document.body);
}
