import type { Template } from "tinacms";

export const SelfIntroductionTemplate: Template = {
	name: "selfIntroduction",
	label: "Self-Introduction",
	fields: [
		{
			name: "motd",
			label: "MOTD",
			type: "string",
			required: true,
		},
		{
			name: "introduction",
			label: "Introduction",
			type: "string",
			required: true,
			ui: {
				component: "textarea",
			},
		},
	],
};
