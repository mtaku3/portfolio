"use client";

import Blocks from "@/app/_components/Blocks";
import { PreviewParams } from "@/app/_lib/PreviewParams";
import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type Props = {
	params: PreviewParams & {
		lang: string;
	};
	data: PageQuery;
	variables: PageQueryVariables;
	query: string;
};

export default function PagePreview({ params, ...tinaData }: Props) {
	const { data } = useTina(tinaData);

	return <Blocks params={params} blocks={data.page.blocks} />;
}
