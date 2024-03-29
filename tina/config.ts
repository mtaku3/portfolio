import {
  BlogPostCollection,
  PageCollection,
  ProjectCollection,
} from "./schema/collections";
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINACMS_CLIENTID,
  token: process.env.TINACMS_TOKEN,
  admin: {
    auth: {
      onLogin: async ({ token }) => {
        location.href = `/api/preview/enter?token=${token.id_token}&slug=${location.pathname}`;
      },
      onLogout: async () => {
        location.href = `/api/preview/exit?slug=${location.pathname}`;
      },
    },
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("./cloudinary/TinaCloudCloudinaryMediaStore");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  schema: {
    collections: [PageCollection, ProjectCollection, BlogPostCollection],
  },
});
