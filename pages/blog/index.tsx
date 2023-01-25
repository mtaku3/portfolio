import { MicroCMSListContent } from "microcms-js-sdk";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Container from "../../components/container";
import { Category, Post } from "../../microcms";
import MicroCMSClient from "../../microcms";
import { HiOutlineFlag } from "react-icons/hi2";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AiOutlineTags } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { MdClear, MdClearAll } from "react-icons/md";
import { getCanonicalURL } from "../../utils";

type BlogProps = {
  posts: (Post & MicroCMSListContent)[];
  categories: (Category & MicroCMSListContent)[];
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const { contents: posts } = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
    queries: {
      orders: "-createdAt",
      limit: 10000,
    },
  });

  const { contents: categories } = await MicroCMSClient.getList<Category>({
    endpoint: "categories",
    queries: {
      limit: 10000,
    },
  });

  return {
    props: {
      posts,
      categories,
    },
  };
};

export default function Blog({
  posts,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortedPosts, setSortedPosts] =
    useState<(Post & MicroCMSListContent)[]>(posts);

  const [isSortDropdownOpened, setIsSortDropdownOpened] =
    useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("-createdAt");

  const [isFilterDropdownOpened, setIsFilterDropdownOpened] =
    useState<boolean>(false);
  const [filterOption, setfilterOption] = useState<{
    category?: string;
  }>({});

  useEffect(() => {
    if (filterOption.category) {
      setSortedPosts(
        [...posts].filter((post) =>
          post.categories.some(
            (category) => category.id === filterOption.category
          )
        )
      );
    } else {
      setSortedPosts(posts);
    }

    if (sortOption === "-createdAt") {
      setSortedPosts((prev) =>
        [...prev].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      );
    } else if (sortOption === "createdAt") {
      setSortedPosts((prev) =>
        [...prev].sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      );
    }
  }, [sortOption, filterOption, posts]);

  const setSortOptionAndClose = (option: string) => {
    setSortOption(option);
    setIsSortDropdownOpened(false);
  };

  const toggleSortDropdown = useCallback(() => {
    setIsSortDropdownOpened(!isSortDropdownOpened);
  }, [isSortDropdownOpened]);

  const filterOptionToString = () => {
    if (filterOption.category) {
      const category = categories.find(
        (category) => category.id === filterOption.category
      );
      return category?.name;
    }
  };

  const setfilterOptionAndClose = (option: {}) => {
    setfilterOption(option);
    setIsFilterDropdownOpened(false);
  };

  const toggleFilterDropdown = useCallback(() => {
    setIsFilterDropdownOpened(!isFilterDropdownOpened);
  }, [isFilterDropdownOpened]);

  return (
    <>
      <NextSeo
        title="mtaku3 - Blog"
        description="技術記事や開発記録を投稿しています"
        canonical={getCanonicalURL("/blog")}
        openGraph={{
          title: "mtaku3 - Blog",
          description: "技術記事や開発記録を投稿しています",
          url: getCanonicalURL("/blog"),
        }}
      />
      <Container className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Image
            className="mx-auto my-auto"
            src="/seo_illustrations_8.svg"
            alt="seo illustrations"
            height={150}
            width={250}
          />
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-2xl font-extrabold">Blog</h1>
          </div>
        </div>
        <div className="ml-auto flex space-x-2">
          <div className="relative">
            <button
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-black px-4 py-2 text-xs font-medium shadow-sm hover:bg-gray-50"
              onClick={toggleFilterDropdown}
            >
              カテゴリー
              {Object.keys(filterOption).length > 0 &&
                `：${filterOptionToString()}`}
            </button>
            {isFilterDropdownOpened && (
              <div className="absolute right-0 z-10 mt-2 py-1 min-w-full max-h-32 overflow-y-auto origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
                {Object.keys(filterOption).length > 0 && (
                  <button
                    className="w-full flex items-center text-gray-700 dark:text-white px-4 py-2 text-sm whitespace-nowrap"
                    onClick={() => setfilterOptionAndClose({})}
                  >
                    <div className="mx-auto flex items-center gap-2">
                      <MdClearAll className="h-4 w-4" />
                      <span>クリア</span>
                    </div>
                  </button>
                )}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex items-center text-gray-700 dark:text-white px-4 py-2 text-sm whitespace-nowrap"
                    onClick={() =>
                      setfilterOptionAndClose({ category: category.id })
                    }
                  >
                    <div className="mx-auto flex items-center gap-2">
                      <AiOutlineTags className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
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
              <div className="absolute right-0 z-10 mt-2 py-1 w-full origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  className="w-full text-gray-700 dark:text-white block px-4 py-2 text-sm whitespace-nowrap"
                  onClick={() => setSortOptionAndClose("-createdAt")}
                >
                  投稿日（新しい順）
                </button>
                <button
                  className="w-full text-gray-700 dark:text-white block px-4 py-2 text-sm whitespace-nowrap"
                  onClick={() => setSortOptionAndClose("createdAt")}
                >
                  投稿日（古い順）
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          {sortedPosts.map((post) => (
            <Link
              key={post.id}
              className="flex flex-col rounded-sm p-4 border-b-2 last:border-b-0 bg-gray-100 hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-700"
              href={`/blog/${post.id}`}
            >
              <div className="flex gap-x-2 items-center">
                <h3 className="font-bold text-xl break-all whitespace-normal">{post.title}</h3>
                <div className="ml-2 flex items-center">
                  {post.categories.length > 0 && (
                    <div className="flex flex-row gap-2">
                      {post.categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex gap-1 items-center"
                        >
                          <AiOutlineTags className="h-4 w-4" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <h4 className="ml-2 text-sm whitespace-pre-wrap">
                {post.description}
              </h4>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
