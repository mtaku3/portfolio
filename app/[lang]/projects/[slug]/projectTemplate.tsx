import Markdown from "@/app/_components/Markdown";
import { ProjectQuery } from "@/tina/__generated__/types";

type Props = {
  data: ProjectQuery;
};

export default function ProjectTemplate({ data }: Props) {
  return (
    <div className="col-span-full">
      <h1 className="my-8 text-4xl font-bold md:text-5xl">
        {data.project.title}
      </h1>
      <Markdown>{data.project.body}</Markdown>
    </div>
  );
}
