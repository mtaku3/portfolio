import { locales } from "@/locales";
import client from "@/tina/__generated__/client";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export async function pagesSitemap(): Promise<MetadataRoute.Sitemap> {
  const pagesResponse = await client.queries.pageConnection();
  const pages =
    pagesResponse.data.pageConnection.edges?.map((page) => {
      const lang = page?.node?._sys.relativePath?.split("/")[0];

      let slug = page?.node?._sys.filename;
      if (slug?.startsWith("home")) {
        slug = undefined;
      }

      return {
        lang,
        slug,
      };
    }) ?? [];
  return pages.map((page) => ({
    url: `${baseUrl}/${page.lang}` + (page.slug ? `/${page.slug}` : ""),
  }));
}

export async function projectsSitemap() {
  const projectsResponse = await client.queries.projectConnection();
  const projects =
    projectsResponse.data.projectConnection.edges?.map((project) => {
      const lang = project?.node?._sys.relativePath?.split("/")[0];
      const slug = project?.node?._sys.filename;

      return {
        lang,
        slug,
      };
    }) ?? [];
  return projects.map((project) => ({
    url: `${baseUrl}/${project.lang}/projects/${project.slug}`,
  }));
}

export async function blogPostsSitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostsResponse = await client.queries.blogPostConnection();
  const blogPosts =
    blogPostsResponse.data.blogPostConnection.edges?.map((post) => {
      const lang = post?.node?._sys.relativePath?.split("/")[0];
      const slug = post?.node?._sys.filename;

      return {
        lang,
        slug,
      };
    }) ?? [];
  return blogPosts.map((post) => ({
    url: `${baseUrl}/${post.lang}/blog/${post.slug}`,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await pagesSitemap();
  const projects = await projectsSitemap();
  const blogPosts = await blogPostsSitemap();

  const routes: MetadataRoute.Sitemap = [];
  for (const lang of locales) {
    routes.push({
      url: `${baseUrl}/${lang}/projects`,
    });
    routes.push({
      url: `${baseUrl}/${lang}/blog`,
    });
  }

  return [...routes, ...pages, ...projects, ...blogPosts];
}
