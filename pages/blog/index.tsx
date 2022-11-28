import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Container from "../../components/container";
import { Post } from "../../microcms";
import MicroCMSClient from "../../microcms";
import { HiOutlineFlag } from "react-icons/hi2";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type BlogProps = {
  posts: (Post & MicroCMSListContent)[];
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const res = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
    queries: {
      orders: "-createdAt",
      limit: 10000,
    },
  });

  return {
    props: {
      posts: res.contents,
    },
  };
};

export default function blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo title="mtaku3 - Blog" />
      <Container className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Image
            className="mx-auto my-auto"
            src="/seo_illustrations_8.svg"
            alt="seo illustrations"
            height={300}
            width={300}
          />
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <p className="text-2xl font-extrabold">Blog</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              className="flex flex-col p-4 shadow-md dark:shadow-gray-800 rounded-xl select-none"
              href={`/blog/${post.id}`}
            >
              <div className="flex gap-x-2 items-center">
                <HiOutlineFlag className="h-4 w-4 shrink-0" />
                <p className="font-bold break-all whitespace-normal">
                  {post.title}
                </p>
              </div>
              <p className="text-sm whitespace-pre-wrap">{post.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
