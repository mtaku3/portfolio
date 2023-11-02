import { SEOField } from "../../fields";
import { ListTemplate } from "./blocks/List";
import { ProfileTemplate } from "./blocks/Profile";
import { ProjectsListTemplate } from "./blocks/ProjectsList";
import { SelfIntroductionTemplate } from "./blocks/SelfIntroduction";
import { TimelineTemplate } from "./blocks/Timeline";
import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      const lang = document._sys.relativePath.split("/")[0];

      let filename = document._sys.filename;
      if (filename.startsWith("home")) {
        return `/${lang}`;
      }

      return `/${lang}/${filename}`;
    },
  },
  fields: [
    SEOField,
    {
      label: "Blocks",
      name: "blocks",
      type: "object",
      list: true,
      required: true,
      templates: [
        TimelineTemplate,
        ListTemplate,
        ProjectsListTemplate,
        ProfileTemplate,
        SelfIntroductionTemplate,
      ],
    },
  ],
};
