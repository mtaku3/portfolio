import client from "@/tina/__generated__/client";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: {
    lang: string;
  };
};

export default async function Projects({ params }: Props) {
  const projectsResponse = await client.queries.projectConnection();
  const projects =
    projectsResponse.data.projectConnection.edges
      ?.map((project) => project?.node)
      .filter((v): v is Exclude<typeof v, undefined | null> => !!v) ?? [];

  return (
    <section className="col-span-full">
      <h1 className="my-8 text-4xl font-bold md:text-5xl">Projects</h1>
      <ul className="grid grid-cols-6 gap-4">
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href={`/${params.lang}/projects/${project._sys.filename}`}
            className="col-span-6 cursor-pointer rounded-lg border border-transparent bg-white p-4 hover:border-gray-200 dark:bg-black dark:hover:border-gray-800 md:col-span-3 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p>{project.shortDescription}</p>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let description = "";
  switch (params.lang) {
    case "ja":
      description = "今まで手がけたプロジェクトの一覧";
      break;
    case "en":
      description = "List of projects I've worked on";
      break;
  }

  return {
    title: "Projects",
    description,
  };
}
