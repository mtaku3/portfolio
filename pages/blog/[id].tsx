import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import MicroCMSClient, { Post } from "../../microcms";
import { BiHistory } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";
import { useEffect, useState } from "react";
import { AiOutlineTags } from "react-icons/ai";
import { NextSeo } from "next-seo";

type PostPageProps = {
  post: Post & MicroCMSListContent;
};

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    setUpdatedAt(new Date(post.updatedAt).toLocaleString());
  }, [post.updatedAt]);

  return (
    <>
      <NextSeo title={`Blog - ${post.title}`} description={post.description} />
      <Container className="space-y-4">
        <h1 className="text-5xl font-extrabold">{post.title}</h1>
        <div className="ml-4 flex gap-4">
          <h2 className="flex-grow">{post.description}</h2>
          <div className="flex items-center gap-2">
            {post.categories.map((category) => (
              <div
                key={category.id}
                className="flex gap-1 items-center justify-center"
              >
                <AiOutlineTags className="h-4 w-4" />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
            <BiHistory className="h-5 w-5" />
            <span>{updatedAt}</span>
          </div>
        </div>
        <div>
          <HTMLParser src={post.content} />
        </div>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const res = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
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
  PostPageProps,
  { id: string }
> = async ({ params }) => {
  if (params === undefined) {
    throw new Error("params is undefined");
  }

  const res = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
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
      post: res.contents[0],
    },
  };
};
