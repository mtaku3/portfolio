import { TinaField } from "tinacms";

export const SEOField: TinaField<false> = {
	label: "SEO Information",
	name: "seo",
	type: "object",
	fields: [
		{
			label: "Title",
			name: "title",
			type: "string",
		},
		{
			label: "Description",
			name: "description",
			type: "string",
		},
	],
};
