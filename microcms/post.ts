import { MicroCMSListContent } from "microcms-js-sdk";
import { z } from "zod";
import { Category, CategorySchema } from "./category";
import { MicroCMSListContentSchema } from "./type";

export const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  categories: z.array(MicroCMSListContentSchema.merge(CategorySchema)),
});

export type Post = z.infer<typeof PostSchema>;
