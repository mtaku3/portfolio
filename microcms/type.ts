import { z } from "zod";

export const MicroCMSImageSchema = z.object({
  url: z.string(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const MicroCMSListContentSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable(),
  revisedAt: z.string().nullable(),
});
