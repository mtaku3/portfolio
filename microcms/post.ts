import { MicroCMSListContent } from "microcms-js-sdk";
import { Category } from "./category";

export type Post = {
  title: string;
  description: string;
  content: string;
  categories: (Category & MicroCMSListContent)[];
};
