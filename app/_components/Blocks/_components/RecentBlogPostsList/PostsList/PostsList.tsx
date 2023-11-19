import PostsListTemplate from "./PostsListTemplate";
import client from "@/tina/__generated__/client";

type Props = {
  params: {
    lang: string;
  };
};

export default async function PostsList({ params }: Props) {
  const blogPostsResponse = await client.queries.blogPostConnection();
  const blogPosts =
    blogPostsResponse.data.blogPostConnection.edges
      ?.map((post) => post?.node)
      .filter((v): v is NonNullable<typeof v> => !!v) ?? [];
  blogPosts.sort(
    (a, b) =>
      new Date(b.createdAt ?? "").getTime() -
      new Date(a.createdAt ?? "").getTime(),
  );

  return <PostsListTemplate params={params} blogPosts={blogPosts} />;
}
