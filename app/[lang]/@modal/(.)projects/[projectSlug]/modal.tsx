"use client";

import Modal from "@/app/_components/Modal";
import clsx from "clsx";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function PreviewModal({ children }: Props) {
  const router = useRouter();
  const close = () => router.back();

  const [isMinimized, setIsMinimized] = useState<boolean>(true);

  const minimizedStyle =
    "md:h-auto md:max-h-[90%] md:w-[640px] md:rounded-md md:border md:border-gray-300 md:dark:border-gray-800 lg:w-[768px] xl:w-[1024px]";

  return (
    <Modal isOpen={true} close={close}>
      <div
        className={clsx(
          "h-full overflow-y-scroll bg-noise-white p-8 dark:bg-noise-dark",
          isMinimized && minimizedStyle,
        )}
      >
        <div className="mb-8 space-y-4">
          <div className="flex">
            <button onClick={close}>
              <X className="h-6" />
            </button>
            <div className="ml-auto hidden md:inline-block">
              {isMinimized ? (
                <button onClick={() => setIsMinimized(false)}>
                  <Maximize2 className="h-6" />
                </button>
              ) : (
                <button onClick={() => setIsMinimized(true)}>
                  <Minimize2 className="h-6" />
                </button>
              )}
            </div>
          </div>
          <hr className="border-t border-gray-300" />
        </div>
        {children}
      </div>
    </Modal>
  );
}
