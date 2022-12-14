import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import MicroCMSClient, { Project } from "../../microcms";
import { BiHistory } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { NextSeo } from "next-seo";
import { getCanonicalURL } from "../../utils";

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
    <>
      <NextSeo
        title={`Project - ${project.title}`}
        description={project.description}
        canonical={getCanonicalURL(`/projects/${project.id}`)}
        openGraph={{
          type: "article",
          title: `Project - ${project.title}`,
          description: project.description,
          url: getCanonicalURL(`/projects/${project.id}`),
          article: {
            publishedTime: project.createdAt,
            modifiedTime: project.updatedAt,
          },
        }}
      />
      <Container className="space-y-4">
        <h1 className="text-5xl font-extrabold">{project.title}</h1>
        <div className="ml-4 flex gap-4">
          <h2 className="flex-grow">{project.description}</h2>
          <div className="flex items-center gap-2">
            {project.url && (
              <Link className="flex items-center gap-2" href={project.url}>
                <BiLinkExternal className="h-5 w-5" />
                <span>詳細を見る</span>
              </Link>
            )}
            <BiHistory className="h-5 w-5" />
            <span>{updatedAt}</span>
          </div>
        </div>
        <div>
          <HTMLParser src={project.content} />
        </div>
      </Container>
    </>
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
    fallback: "blocking",
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

  if (res.totalCount === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: res.contents[0],
    },
  };
};
