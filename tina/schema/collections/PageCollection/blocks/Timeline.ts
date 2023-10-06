import type { Template } from "tinacms";

export const TimelineTemplate: Template = {
  name: "timeline",
  label: "Timeline",
  fields: [
    {
      name: "titleForTimeline",
      label: "Title",
      type: "string",
    },
    {
      name: "events",
      label: "Events",
      type: "object",
      list: true,
      required: true,
      fields: [
        {
          name: "date",
          label: "Date",
          type: "string",
          required: true,
        },
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
      ],
    },
  ],
};
