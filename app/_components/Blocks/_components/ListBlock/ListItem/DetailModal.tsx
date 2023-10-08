"use client";

import Modal from "@/app/_components/Modal";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
};

export default function DetailModal({ isOpen, close, children }: Props) {
  return (
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
  );
}
