import { PageBlocksListItems } from "@/tina/__generated__/types";

type Props = {
	item: PageBlocksListItems;
};

export default function ListItemTemplate({ item }: Props) {
	return (
		<>
			<p className="font-semibold md:text-lg">{item.name}</p>
			{item.shortDescription && (
				<p className="text-sm text-gray-400 dark:text-gray-500 md:text-base">
					{item.shortDescription}
				</p>
			)}
		</>
	);
}
