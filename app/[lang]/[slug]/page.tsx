import PageTemplate from "./pageTemplate";
import PagePreview from "./preview";
import client from "@/tina/__generated__/client";
import { Metadata } from "next";
import { draftMode } from "next/headers";

type Props = {
	params: {
		lang: string;
		slug?: string;
	};
};

export default async function Page({ params }: Props) {
	const { isEnabled } = draftMode();

	const pageParams = {
		...params,
		isPreview: isEnabled,
	};

	let relativePath = "";
	if (params.slug === undefined) {
		relativePath = `${params.lang}/home.md`;
	} else {
		relativePath = `${params.lang}/${params.slug}.md`;
	}

	const tinaData = await client.queries.page({
		relativePath,
	});

	if (isEnabled) {
		return <PagePreview params={pageParams} {...tinaData} />;
	} else {
		return <PageTemplate params={pageParams} {...tinaData} />;
	}
}

export async function generateStaticParams() {
	const pagesResponse = await client.queries.pageConnection();
	const pages =
		pagesResponse.data.pageConnection.edges?.map((page) => {
			const lang = page?.node?._sys.relativePath?.split("/")[0];

			let slug = page?.node?._sys.filename;
			if (slug?.startsWith("home")) {
				slug = undefined;
			}

			return {
				lang,
				slug,
			};
		}) ?? [];
	return pages;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	let relativePath = "";
	if (params.slug === undefined) {
		relativePath = `${params.lang}/home.md`;
	} else {
		relativePath = `${params.lang}/${params.slug}.md`;
	}

	const page = await client.queries.page({
		relativePath,
	});

	return {
		title: page.data.page.seo?.title,
		description: page.data.page.seo?.description,
	};
}
