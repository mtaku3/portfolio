import type { Template } from "tinacms";

export const RecentBlogPostsListTemplate: Template = {
  name: "recentBlogPostsList",
  label: "Recent Blog Posts",
  fields: [
    {
      name: "titleForRecentBlogPostsList",
      label: "Title",
      type: "string",
    },
    {
      name: "numOfPostsToShow",
      label: "Number of posts to show",
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
