import ListItemTemplate from "./ListItemTemplate";
import { PageBlocksListItems } from "@/tina/__generated__/types";

type Props = {
	item: PageBlocksListItems;
};

export default function SimpleListItem({ item }: Props) {
	return (
		<li>
			<ListItemTemplate item={item} />
		</li>
	);
}
