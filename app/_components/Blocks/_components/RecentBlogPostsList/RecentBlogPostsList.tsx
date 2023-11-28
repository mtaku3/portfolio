import { PostsList, PostsListPreview } from "./PostsList";
import { PreviewParams } from "@/app/_lib/PreviewParams";
import { PageQuery } from "@/tina/__generated__/types";

type Props = {
	params: PreviewParams & {
		lang: string;
	};
	data: Extract<
		PageQuery["page"]["blocks"][0],
		{ __typename: "PageBlocksRecentBlogPostsList" }
	>;
};

export default function RecentBlogPostsListBlock({ params, data }: Props) {
	return (
		<section className="col-span-full my-8 space-y-8">
			{data.titleForRecentBlogPostsList && (
				<h3 className="text-2xl font-bold md:text-3xl">
					{data.titleForRecentBlogPostsList}
				</h3>
			)}
			<ol className="space-y-4">
				{params.isPreview ? (
					<PostsListPreview params={params} />
				) : (
					<PostsList params={params} />
				)}
			</ol>
		</section>
	);
}
