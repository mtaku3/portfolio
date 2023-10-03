"use client";

import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type Props = {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
};

export default function PagePreview(tinaData: Props) {
  const { data } = useTina(tinaData);

  return <div></div>;
}
