"use client";

import Modal from "@/app/_components/Modal";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  buttonText: string;
  children?: React.ReactNode;
};

export default function DetailModal({ buttonText, children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={open}
        className="text-sm text-gray-400 dark:text-gray-500 md:text-base"
      >
        {buttonText}
      </button>
      <Modal isOpen={isOpen} close={close}>
        <div className="h-full w-full rounded-md border border-gray-300 bg-noise-white p-8 dark:border-gray-800 dark:bg-noise-dark md:h-auto md:w-[640px]">
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
