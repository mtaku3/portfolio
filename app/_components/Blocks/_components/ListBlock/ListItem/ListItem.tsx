import DetailedListItem from "./DetailedListItem";
import SimpleListItem from "./SimpleListItem";
import { PageBlocksListItems } from "@/tina/__generated__/types";

type Props = {
	item: PageBlocksListItems;
};

export default function ListItem({ item }: Props) {
	return item.description ? (
		<DetailedListItem item={item} />
	) : (
		<SimpleListItem item={item} />
	);
}
