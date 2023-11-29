import ProjectPreview from "./preview";
import ProjectTemplate from "./projectTemplate";
import client from "@/tina/__generated__/client";
import { Metadata } from "next";
import { draftMode } from "next/headers";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function Project({ params }: Props) {
  const { isEnabled } = draftMode();

  const tinaData = await client.queries.project({
    relativePath: `${params.lang}/${params.slug}.md`,
  });

  if (isEnabled) {
    return <ProjectPreview {...tinaData} />;
  } else {
    return <ProjectTemplate {...tinaData} />;
  }
}

export async function generateStaticParams() {
  const projectsResponse = await client.queries.projectConnection();
  const projects =
    projectsResponse.data.projectConnection.edges?.map((project) => {
      const lang = project?.node?._sys.relativePath?.split("/")[0];
      const slug = project?.node?._sys.filename;

      return {
        lang,
        slug,
      };
    }) ?? [];
  return projects;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await client.queries.project({
    relativePath: `${params.lang}/${params.slug}.md`,
  });

  return {
    title: project.data.project.seo?.title,
    description: project.data.project.seo?.description,
  };
}
