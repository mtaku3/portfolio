import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Container from "../../components/container";
import { Project } from "../../microcms";
import MicroCMSClient from "../../microcms";
import { HiOutlineFlag } from "react-icons/hi2";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCanonicalURL } from "../../utils";

type ProjectsProps = {
  projects: (Project & MicroCMSListContent)[];
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const res = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: {
      limit: 10000,
    },
  });

  return {
    props: {
      projects: res.contents,
    },
  };
};

export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title="mtaku3 - Projects"
        description="開発したアプリケーションやサービスの一覧です。併せてGithubもご覧ください。"
        canonical={getCanonicalURL("/projects")}
        openGraph={{
          title: "mtaku3 - Projects",
          description:
            "開発したアプリケーションやサービスの一覧です。併せてGithubもご覧ください。",
          url: getCanonicalURL("/projects"),
        }}
      />
      <Container className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Image
            className="mx-auto my-auto"
            src="/webdesign_icons1.svg"
            alt="webdesign icon"
            height={180}
            width={250}
          />
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-2xl font-extrabold">Projects</h1>
            <h2>
              一部のプロジェクトはこの一覧には載っていない場合があります。
              詳しくはGithubをご確認くださいませ
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              className="flex flex-col p-4 shadow-md hover:bg-gray-100 dark:shadow-gray-800 dark:bg-gray-900 hover:dark:bg-gray-800 rounded-xl select-none"
              href={`/projects/${project.id}`}
            >
              <div className="flex gap-x-2 items-center">
                <HiOutlineFlag className="h-4 w-4 shrink-0" />
                <h3 className="font-bold break-all whitespace-normal">
                  {project.title}
                </h3>
              </div>
              <h4 className="text-sm whitespace-pre-wrap">
                {project.description}
              </h4>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
