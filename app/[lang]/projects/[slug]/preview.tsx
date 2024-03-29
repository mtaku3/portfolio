"use client";

import ProjectTemplate from "./projectTemplate";
import {
  ProjectQuery,
  ProjectQueryVariables,
} from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type Props = {
  data: ProjectQuery;
  variables: ProjectQueryVariables;
  query: string;
};

export default function ProjectPreview(tinaData: Props) {
  const { data } = useTina(tinaData);

  return <ProjectTemplate data={data} />;
}
