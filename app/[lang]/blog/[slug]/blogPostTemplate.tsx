import Markdown from "@/app/_components/Markdown";
import { BlogPostQuery } from "@/tina/__generated__/types";

type Props = {
  data: BlogPostQuery;
};

export default function BlogPostTemplate({ data }: Props) {
  return (
    <div className="col-span-full">
      <h1 className="my-8 text-4xl font-bold md:text-5xl">
        {data.blogPost.title}
      </h1>
      <Markdown>{data.blogPost.body}</Markdown>
    </div>
  );
}
