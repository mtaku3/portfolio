import {
	BlogPost,
	BlogPostConnection,
	BlogPostConnectionQuery,
} from "@/tina/__generated__/types";
import Link from "next/link";

type Props = {
	params: {
		lang: string;
	};
	blogPosts: NonNullable<
		NonNullable<
			NonNullable<BlogPostConnectionQuery["blogPostConnection"]["edges"]>[0]
		>["node"]
	>[];
};

export default function PostsListTemplate({ params, blogPosts }: Props) {
	return (
		<>
			{blogPosts.map((post, idx) => (
				<Link
					key={idx}
					href={`${params.lang}/blog/${post._sys.filename}`}
					scroll={false}
					className="relative -left-2 list-item cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<p className="font-semibold md:text-lg">{post.title}</p>
					<p className="text-sm text-gray-400 dark:text-gray-500 md:text-base">
						{post.shortDescription}
					</p>
				</Link>
			))}
		</>
	);
}
