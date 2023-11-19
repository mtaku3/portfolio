import client from "@/tina/__generated__/client";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

type Props = {
  params: {
    lang: string;
  };
};

export default async function BlogPosts({ params }: Props) {
  const blogPostsResponse = await client.queries.blogPostConnection();
  const blogPosts =
    blogPostsResponse.data.blogPostConnection.edges
      ?.map((post) => post?.node)
      .filter(
        (v): v is NonNullable<typeof v> =>
          !!v && v._sys.relativePath.startsWith(params.lang),
      ) ?? [];

  return (
    <section className="col-span-full">
      <h1 className="my-8 text-4xl font-bold md:text-5xl">Blog</h1>
      <ul className="grid grid-cols-6 gap-4">
        {blogPosts.map((post, idx) => (
          <Link
            key={idx}
            href={`/${params.lang}/blog/${post._sys.filename}`}
            className="col-span-6 cursor-pointer rounded-lg border border-transparent bg-white p-4 hover:border-gray-200 dark:bg-black dark:hover:border-gray-800 md:col-span-3 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.shortDescription}</p>
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
      description = "技術情報などを発信するブログ";
      break;
    case "en":
      description = "Blog where I share technical information and more";
      break;
  }

  return {
    title: "Blog",
    description,
  };
}
