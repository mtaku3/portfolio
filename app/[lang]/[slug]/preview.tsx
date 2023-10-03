"use client";

import Blocks from "@/app/_components/Blocks";
import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type Props = {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
};

export default function PagePreview(tinaData: Props) {
  const { data } = useTina(tinaData);

  return <Blocks blocks={data.page.blocks} />;
}
