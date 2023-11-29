import type { Template } from "tinacms";

export const ProjectsListTemplate: Template = {
  name: "projectsList",
  label: "List of Projects",
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
          name: "project",
          label: "Project",
          type: "reference",
          collections: ["project"],
          required: true,
        },
      ],
    },
  ],
};
