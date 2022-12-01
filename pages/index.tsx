import { NextSeo } from "next-seo";
import Image from "next/image";
import Container from "../components/container";
import ProjectCard from "../components/projectCard";
import MicroCMSClient, { Project } from "../microcms";
import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type HomeProps = {
  projects: (Project & MicroCMSListContent)[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: {
      limit: 10,
    },
  });

  return {
    props: {
      projects: res.contents,
    },
  };
};

export default function Home({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="w-full flex flex-col items-center mt-8 min-h-fit">
        <Container className="flex">
          <div className="flex-grow mr-4">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text from-blue-600 to-blue-200 bg-gradient-to-r">
              mtaku3
            </h1>
            <span className="mt-2">鹿児島工業高等専門学校の学生</span>
            <h2 className="mt-4">
              独学でプログラミングを学びながら、AIの研究をしています。
              <br />
              興味はWEB開発に限らず、アセンブリ言語やデスクトップアプリなど幅広く勉強しています。
            </h2>
            <h3 className="text-lg font-bold mt-4">Projects</h3>
          </div>
          <div className="flex-wrap shrink-0">
            <Image
              className="rounded-full h-32 w-32"
              src="/mtaku3.webp"
              alt="mtaku3's profile picture"
              width={128}
              height={128}
            />
          </div>
        </Container>
        <div className="max-w-full flex p-4 space-x-4 overflow-x-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              className="shrink-0 h-48 w-48"
              id={project.id}
              title={project.title}
              description={project.description}
              image={project.image.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
