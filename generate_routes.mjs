import { globby } from "globby";
import prettier from "prettier";
import { writeFileSync } from "fs";

async function generate_routes() {
  const routes = await globby([
    "pages/**/*.tsx",
    "!pages/**/preview.tsx",
    "!pages/**/\\[*\\].tsx",
    "!pages/**/\\[*\\]",
    "!pages/_*.tsx",
    "!pages/api",
  ]);

  for (let i = 0; i < routes.length; i++) {
    routes[i] = routes[i].replace("pages", "").replace(".tsx", "");

    if (routes[i].includes("/index")) {
      if (routes[i] === "/index") {
        routes[i] = "/";
      } else {
        routes[i] = routes[i].replace("/index", "");
      }
    }
  }

  const formatted = prettier.format(JSON.stringify(routes), {
    parser: "json",
  });

  writeFileSync("public/routes.json", formatted);
}

generate_routes();
