import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Container from "../../components/container";
import { Post } from "../../microcms";
import MicroCMSClient from "../../microcms";
import { HiOutlineFlag } from "react-icons/hi2";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AiOutlineTags } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";

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

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isSortDropdownOpened, setIsSortDropdownOpened] =
    useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("-createdAt");
  const [sortedPosts, setSortedPosts] =
    useState<(Post & MicroCMSListContent)[]>(posts);

  useEffect(() => {
    if (sortOption === "-createdAt") {
      setSortedPosts(
        [...sortedPosts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      );
    } else if (sortOption === "createdAt") {
      setSortedPosts(
        [...sortedPosts].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      );
    }
  }, [sortOption, sortedPosts]);

  const setSortOptionAndClose = (option: string) => {
    setSortOption(option);
    setIsSortDropdownOpened(false);
  };

  const toggleSortDropdown = useCallback(() => {
    setIsSortDropdownOpened(!isSortDropdownOpened);
  }, [isSortDropdownOpened]);

  return (
    <>
      <NextSeo title="mtaku3 - Blog" />
      <Container className="flex flex-col gap-y-4">
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
        <div className="ml-auto relative inline-block text-left">
          <button
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-black px-4 py-2 text-xs font-medium shadow-sm hover:bg-gray-50"
            onClick={toggleSortDropdown}
          >
            並べ替え：
            {sortOption === "-createdAt"
              ? "投稿日（新しい順）"
              : "投稿日（古い順）"}
          </button>
          {isSortDropdownOpened && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  className="text-gray-700 dark:text-white block px-4 py-2 text-sm"
                  onClick={() => setSortOptionAndClose("-createdAt")}
                >
                  投稿日（新しい順）
                </button>
                <button
                  className="text-gray-700 dark:text-white block px-4 py-2 text-sm"
                  onClick={() => setSortOptionAndClose("createdAt")}
                >
                  投稿日（古い順）
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {sortedPosts.map((post) => (
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
              {post.categories.length > 0 && (
                <div className="mt-2 ml-auto flex flex-row gap-2">
                  {post.categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex gap-1 items-center justify-center"
                    >
                      <AiOutlineTags className="h-4 w-4" />
                      <p className="text-sm">{category.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
