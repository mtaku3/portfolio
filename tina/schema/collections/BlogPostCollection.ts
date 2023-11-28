import { SEOField } from "../fields";
import type { Collection } from "tinacms";

export const BlogPostCollection: Collection = {
	label: "Blog",
	name: "blogPost",
	path: "content/blogPosts",
	ui: {
		router: ({ document }) => {
			const lang = document._sys.relativePath.split("/")[0];
			let filename = document._sys.filename;
			return `/${lang}/blog/${filename}`;
		},
		beforeSubmit: async ({ form, cms, values }) => {
			let res = { ...values };
			if (form.crudType === "create") {
				res = Object.assign(res, {
					createdAt: new Date().toISOString(),
				});
			}
			res = Object.assign(res, {
				updatedAt: new Date().toISOString(),
			});
			return res;
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
		{
			label: "Created At",
			name: "createdAt",
			type: "datetime",
		},
		{
			label: "Updated At",
			name: "updatedAt",
			type: "datetime",
		},
	],
};
