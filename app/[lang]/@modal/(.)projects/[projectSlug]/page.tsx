import PreviewModal from "./modal";
import ProjectTemplate from "@/app/[lang]/projects/[slug]/projectTemplate";
import client from "@/tina/__generated__/client";

type Props = {
  params: {
    lang: string;
    projectSlug: string;
  };
};

export default async function ProjectModal({ params }: Props) {
  const { data } = await client.queries.project({
    relativePath: `${params.lang}/${params.projectSlug}.md`,
  });

  return (
    <PreviewModal>
      <ProjectTemplate data={data} />
    </PreviewModal>
  );
}
