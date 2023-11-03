"use client";

import Modal from "@/app/_components/Modal";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PreviewModal({ children }: Props) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal isOpen={true} close={close}>
      <div className="h-full overflow-y-scroll bg-noise-white p-8 dark:bg-noise-dark md:h-auto md:max-h-[90%] md:w-[640px] md:rounded-md md:border md:border-gray-300 md:dark:border-gray-800 lg:w-[768px] xl:w-[1024px]">
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
