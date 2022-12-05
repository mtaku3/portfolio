import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import MicroCMSClient, { Post } from "../../microcms";
import { z } from "zod";
import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { getCanonicalURL } from "../../utils";
import Container from "../../components/container";
import { BiHistory } from "react-icons/bi";
import HTMLParser from "../../components/HTMLParser";
import { AiOutlineTags } from "react-icons/ai";

type PreviewProps = {
  post: Post & MicroCMSListContent;
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

  const res = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
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
      post: res.contents[0],
    },
  };
};

export default function PostPage({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [updatedAt, setUpdatedAt] = useState<string>("");

  useEffect(() => {
    setUpdatedAt(new Date(post.updatedAt).toLocaleString());
  }, [post.updatedAt]);

  return (
    <>
      <NextSeo
        title={`PREVIEW | Blog - ${post.title}`}
        description={post.description}
        canonical={getCanonicalURL(`/blog/${post.id}`)}
        openGraph={{
          type: "article",
          title: `PREVIEW | Blog - ${post.title}`,
          description: post.description,
          url: getCanonicalURL(`/blog/${post.id}`),
          article: {
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            tags: post.categories.map((category) => category.name),
          },
        }}
      />
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
