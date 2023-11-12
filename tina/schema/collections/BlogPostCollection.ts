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
