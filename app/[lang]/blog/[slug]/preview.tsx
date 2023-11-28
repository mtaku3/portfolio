"use client";

import BlogPostTemplate from "./blogPostTemplate";
import {
	BlogPostQuery,
	BlogPostQueryVariables,
} from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

type Props = {
	data: BlogPostQuery;
	variables: BlogPostQueryVariables;
	query: string;
};

export default function BlogPostPreview(tinaData: Props) {
	const { data } = useTina(tinaData);

	return <BlogPostTemplate data={data} />;
}
