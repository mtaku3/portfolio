import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import MicroCMSClient, { Project } from "../../microcms";
import { BiHistory } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";

type ProjectPageProps = {
  project: Project & MicroCMSListContent;
};

export default function ProjectPage({
  project,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    setUpdatedAt(new Date(project.updatedAt).toLocaleString());
  }, [project.updatedAt]);

  return (
    <Container className="space-y-4">
      <p className="text-5xl font-extrabold">{project.title}</p>
      <div className="ml-4 flex gap-4">
        <p className="flex-grow">{project.description}</p>
        <div className="flex items-center gap-2">
          {project.url && (
            <Link className="flex items-center gap-2" href={project.url}>
              <BiLinkExternal className="h-5 w-5" />
              <p>詳細を見る</p>
            </Link>
          )}
          <BiHistory className="h-5 w-5" />
          <p>{updatedAt}</p>
        </div>
      </div>
      <div>
        <HTMLParser src={project.content} />
      </div>
    </Container>
  );
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
