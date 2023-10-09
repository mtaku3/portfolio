import { PageCollection } from "./schema/collections";
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINACMS_CLIENTID,
  token: process.env.TINACMS_TOKEN,
  localContentPath: "../../portfolio-contents",
  admin: {
    auth: {
      onLogin: async ({ token }) => {
        location.href = `/api/preview/enter?token=${token.id_token}&slug=${location.pathname}`;
      },
      onLogout: async () => {
        location.href = "/api/preview/exit";
      },
    },
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [PageCollection],
  },
});
