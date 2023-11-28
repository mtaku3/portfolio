"use client";

import PostsListTemplate from "./PostsListTemplate";
import client from "@/tina/__generated__/client";
import { BlogPostConnectionQuery } from "@/tina/__generated__/types";
import { useEffect, useState } from "react";

type Props = {
	params: {
		lang: string;
	};
};

export default function PostsListPreview({ params }: Props) {
	const [blogPosts, setBlogPosts] = useState<
		NonNullable<
			NonNullable<
				NonNullable<BlogPostConnectionQuery["blogPostConnection"]["edges"]>[0]
			>["node"]
		>[]
	>([]);

	useEffect(() => {
		async function fetchPosts() {
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
			setBlogPosts(blogPosts);
		}

		fetchPosts();
	}, []);

	return <PostsListTemplate params={params} blogPosts={blogPosts} />;
}
