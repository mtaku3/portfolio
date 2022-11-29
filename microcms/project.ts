import type { MicroCMSImage } from "microcms-js-sdk";
import { z } from "zod";
import { MicroCMSImageSchema } from "./type";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  url: z.string().optional(),
  image: MicroCMSImageSchema,
});

export type Project = z.infer<typeof ProjectSchema>;
