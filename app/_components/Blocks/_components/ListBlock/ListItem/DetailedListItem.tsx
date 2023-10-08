"use client";

import DetailModal from "./DetailModal";
import ListItemTemplate from "./ListItemTemplate";
import Markdown from "@/app/_components/Markdown";
import { PageBlocksListItems } from "@/tina/__generated__/types";
import { useState } from "react";

type Props = {
  item: PageBlocksListItems;
};

export default function DetailedListItem({ item }: Props) {
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
        className="relative -left-2 cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={open}
      >
        <ListItemTemplate item={item} />
      </li>
      <DetailModal isOpen={isOpen} close={close}>
        <div className="space-y-8">
          <h3 className="text-4xl font-bold md:text-5xl">{item.name}</h3>
          <Markdown>{item.description ?? ""}</Markdown>
        </div>
      </DetailModal>
    </>
  );
}
