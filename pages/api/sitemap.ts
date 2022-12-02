import { globby } from "globby";
import { NextApiRequest, NextApiResponse } from "next";
import MicroCMSClient, { Project, Post } from "../../microcms";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pages = await globby([
    "pages/**/*.tsx",
    "!pages/**/\\[*\\].tsx",
    "!pages/**/\\[*\\]",
    "!pages/_*.tsx",
    "!pages/api",
  ]);

  for (let i = 0; i < pages.length; i++) {
    pages[i] = pages[i].replace("pages", "").replace(".tsx", "");

    if (pages[i].includes("/index")) {
      if (pages[i] === "/index") {
        pages[i] = "/";
      } else {
        pages[i] = pages[i].replace("/index", "");
      }
    }
  }

  const { contents: projects } = await MicroCMSClient.getList<Project>({
    endpoint: "projects",
    queries: { fields: ["id", "updatedAt"], limit: 10000 },
  });

  for (let project of projects) {
    pages.push(`/projects/${project.id}`);
  }

  const { contents: posts } = await MicroCMSClient.getList<Post>({
    endpoint: "posts",
    queries: { fields: ["id", "updatedAt"], limit: 10000 },
  });

  for (let post of posts) {
    pages.push(`/blog/${post.id}`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((route) => {
          return `
            <url>
                <loc>${`https://www.mtaku3.com${route}`}</loc>
            </url>
          `;
        })
        .join("")}
  </urlset>
  `;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
  res.write(sitemap);
  res.end();
}
