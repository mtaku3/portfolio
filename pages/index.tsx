import Image from "next/image";
import Container from "../components/container";
import ProjectCard from "../components/projectCard";

interface IProjectCard {
  title: string;
  description: React.ReactNode;
  link: string;
  image: string;
}

export default function Home() {
  const projects: IProjectCard[] = [];

  return (
    <div className="w-full flex flex-col items-center mt-8 min-h-fit">
      <Container className="flex">
        <div className="flex-grow mr-4">
          <p className="text-5xl font-bold text-transparent bg-clip-text from-blue-600 to-blue-200 bg-gradient-to-r">
            mtaku3
          </p>
          <p className="mt-2">鹿児島工業高等専門学校の学生</p>
          <p className="mt-4">
            独学でプログラミングを学びながら、AIの研究をしています。
            <br />
            興味はWEB開発に限らず、アセンブリ言語やデスクトップアプリなど幅広く勉強しています。
          </p>
          <p className="text-lg font-bold mt-4">Projects</p>
        </div>
        <div className="flex-wrap shrink-0">
          <Image
            className="rounded-full h-32 w-32"
            src="/mtaku3.jpg"
            alt="mtaku3's profile picture"
            width={200}
            height={200}
          />
        </div>
      </Container>
      <div className="max-w-full flex p-4 space-x-4 overflow-x-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            className="shrink-0 h-48 w-48"
            title={project.title}
            link={project.link}
            image={project.image}
          >
            {project.description}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}
