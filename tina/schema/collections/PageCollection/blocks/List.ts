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
      type: "string",
      list: true,
      required: true,
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
