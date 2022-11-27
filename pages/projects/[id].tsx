import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import MicroCMSClient, { Project } from "../../microcms";

type ProjectPageProps = {
  project: Project & MicroCMSListContent;
};

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{project.title}</div>;
}

export async function getStaticPaths() {
  const res = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: {
      fields: "id",
      limit: 10000,
    },
  });

  return {
    paths: res.contents.map((project) => {
      return {
        params: {
          id: project.id,
        },
      };
    }),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<
  ProjectPageProps,
  { id: string }
> = async ({ params }) => {
  if (params === undefined) {
    throw new Error("params is undefined");
  }

  const res = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: {
      ids: params.id,
    },
  });

  return {
    props: {
      project: res.contents[0],
    },
  };
};
