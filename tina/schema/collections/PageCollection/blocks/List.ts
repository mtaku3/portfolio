import type { Template } from "tinacms";

export const ListTemplate: Template = {
	name: "list",
	label: "List",
	fields: [
		{
			name: "titleForList",
			label: "Title",
			type: "string",
		},
		{
			name: "items",
			label: "Items",
			type: "object",
			list: true,
			required: true,
			fields: [
				{
					name: "name",
					label: "Name",
					type: "string",
					required: true,
				},
				{
					name: "shortDescription",
					label: "Short Description",
					type: "string",
				},
				{
					name: "description",
					label: "Description",
					type: "string",
					ui: {
						component: "textarea",
					},
				},
			],
		},
		{
			name: "numOfItemsToShow",
			label: "Number of items to show",
			type: "number",
			required: true,
			ui: {
				validate: (value) => {
					if (value < 0) {
						return "The number must be greater than 0";
					}
				},
			},
		},
	],
};
