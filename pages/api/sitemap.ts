import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import MicroCMSClient, { Project, Post } from "../../microcms";
import { getCanonicalURL } from "../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pages: string[] = [];
  try {
    const request = await fetch(getCanonicalURL("routes.json"));
    const json = await request.json();

    pages = z.string().array().parse(json);
  } catch (err) {
    console.log("Error: ", err);
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
                <loc>${`${process.env.URL}${route}`}</loc>
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
