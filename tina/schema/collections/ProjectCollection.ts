import { SEOField } from "../fields";
import type { Collection } from "tinacms";

export const ProjectCollection: Collection = {
	label: "Projects",
	name: "project",
	path: "content/projects",
	ui: {
		router: ({ document }) => {
			const lang = document._sys.relativePath.split("/")[0];
			let filename = document._sys.filename;
			return `/${lang}/projects/${filename}`;
		},
	},
	fields: [
		SEOField,
		{
			label: "Title",
			name: "title",
			type: "string",
			required: true,
		},
		{
			label: "Short Description",
			name: "shortDescription",
			type: "string",
			ui: {
				component: "textarea",
			},
			required: true,
		},
		{
			label: "Body",
			name: "body",
			type: "string",
			ui: {
				component: "textarea",
			},
			required: true,
		},
	],
};
