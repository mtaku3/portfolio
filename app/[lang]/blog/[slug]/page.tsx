import BlogPostTemplate from "./blogPostTemplate";
import BlogPostPreview from "./preview";
import client from "@/tina/__generated__/client";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function BlogPost({ params }: Props) {
  const { isEnabled } = draftMode();

  try {
    const tinaData = await client.queries.blogPost({
      relativePath: `${params.lang}/${params.slug}.md`,
    });

    if (isEnabled) {
      return <BlogPostPreview {...tinaData} />;
    } else {
      return <BlogPostTemplate {...tinaData} />;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return notFound();
    } else {
      throw e;
    }
  }
}

export async function generateStaticParams() {
  const blogPostsResponse = await client.queries.blogPostConnection();
  const blogPosts =
    blogPostsResponse.data.blogPostConnection.edges?.map((post) => {
      const lang = post?.node?._sys.relativePath?.split("/")[0];
      const slug = post?.node?._sys.filename;

      return {
        lang,
        slug,
      };
    }) ?? [];
  return blogPosts;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await client.queries.blogPost({
      relativePath: `${params.lang}/${params.slug}.md`,
    });

    return {
      title: project.data.blogPost.seo?.title,
      description: project.data.blogPost.seo?.description,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return {};
    } else {
      throw e;
    }
  }
}
