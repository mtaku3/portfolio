import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import MicroCMSClient, { Project } from "../../microcms";
import { z } from "zod";
import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { getCanonicalURL } from "../../utils";
import Container from "../../components/container";
import Link from "next/link";
import { BiHistory, BiLinkExternal } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";

type PreviewProps = {
  project: Project & MicroCMSListContent;
};

export const getServerSideProps: GetServerSideProps<PreviewProps> = async ({
  query,
}) => {
  const { contentId, draftKey, secret } = z
    .object({
      contentId: z.string(),
      draftKey: z.string(),
      secret: z.string(),
    })
    .parse(query);

  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return {
      notFound: true,
    };
  }

  const res = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: {
      ids: contentId,
      draftKey,
    },
  });

  if (res.contents.length === 0) {
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

export default function Preview({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    setUpdatedAt(new Date(project.updatedAt).toLocaleString());
  }, [project.updatedAt]);

  return (
    <>
      <NextSeo
        title={`PREVIEW | Project - ${project.title}`}
        description={project.description}
        openGraph={{
          type: "article",
          title: `PREVIEW | Project - ${project.title}`,
          description: project.description,
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
