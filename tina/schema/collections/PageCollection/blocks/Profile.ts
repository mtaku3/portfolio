import type { Template } from "tinacms";

export const ProfileTemplate: Template = {
  name: "profile",
  label: "Profile",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "string",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "image",
      required: true,
    },
    {
      name: "position",
      label: "Position",
      type: "string",
    },
  ],
};
