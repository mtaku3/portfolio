import { PreviewParams } from "@/app/_lib/PreviewParams";
import { PageBlocksProjectsList, PageQuery } from "@/tina/__generated__/types";
import Link from "next/link";

type Props = {
	params: PreviewParams & {
		lang: string;
	};
	data: Extract<
		PageQuery["page"]["blocks"][0],
		{ __typename: "PageBlocksProjectsList" }
	>;
};

export default function ProjectsListBlock({ params, data }: Props) {
	return (
		<section className="col-span-full my-8 space-y-8">
			{data.titleForList && (
				<h3 className="text-2xl font-bold md:text-3xl">{data.titleForList}</h3>
			)}
			<ol className="space-y-4">
				{data.items.map((item, idx) => (
					<Link
						key={idx}
						href={`${params.lang}/projects/${item.project._sys.filename}`}
						scroll={false}
						className="relative -left-2 list-item cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
					>
						<p className="font-semibold md:text-lg">{item.project.title}</p>
						<p className="text-sm text-gray-400 dark:text-gray-500 md:text-base">
							{item.project.shortDescription}
						</p>
					</Link>
				))}
			</ol>
		</section>
	);
}
