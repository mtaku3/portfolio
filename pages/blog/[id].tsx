import { MicroCMSListContent } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Container from "../../components/container";
import MicroCMSClient, { Post } from "../../microcms";
import { BiHistory } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";
import { useEffect, useState } from "react";
import { AiOutlineTags } from "react-icons/ai";

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
    <Container className="space-y-4">
      <p className="text-5xl font-extrabold">{post.title}</p>
      <div className="ml-4 flex gap-4">
        <p className="flex-grow">{post.description}</p>
        <div className="flex items-center gap-2">
          {post.categories.map((category) => (
            <div
              key={category.id}
              className="flex gap-1 items-center justify-center"
            >
              <AiOutlineTags className="h-4 w-4" />
              <p className="text-sm">{category.name}</p>
            </div>
          ))}
          <BiHistory className="h-5 w-5" />
          <p>{updatedAt}</p>
        </div>
      </div>
      <div>
        <HTMLParser src={post.content} />
      </div>
    </Container>
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
    fallback: false,
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

  return {
    props: {
      post: res.contents[0],
    },
  };
};
