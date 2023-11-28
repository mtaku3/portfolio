import Blocks from "@/app/_components/Blocks";
import { PreviewParams } from "@/app/_lib/PreviewParams";
import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";

type Props = {
	params: PreviewParams & {
		lang: string;
	};
	data: PageQuery;
	variables: PageQueryVariables;
	query: string;
};

export default function PageTemplate({ params, data }: Props) {
	return <Blocks params={params} blocks={data.page.blocks} />;
}
