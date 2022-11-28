import type { MicroCMSImage } from "microcms-js-sdk";

export type Project = {
  title: string;
  description: string;
  content: string;
  url?: string;
  image: MicroCMSImage;
};
