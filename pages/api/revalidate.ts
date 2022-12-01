import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PostSchema } from "../../microcms/post";
import { ProjectSchema } from "../../microcms/project";
import { MicroCMSListContentSchema } from "../../microcms/type";
import crypto from "crypto";
import getRawBody from "raw-body";
import { CategorySchema } from "../../microcms/category";

interface IResponse {
  revalidate: boolean;
  error?: string;
}

function MicroCMSWebhookRequestBody(T?: z.AnyZodObject) {
  const schema =
    T !== undefined
      ? T.merge(MicroCMSListContentSchema)
      : MicroCMSListContentSchema;

  return z.object({
    service: z.string(),
    api: z.string(),
    id: z.string().nullable(),
    type: z.enum(["new", "edit", "delete"]).nullable(),
    contents: z.nullable(
      z.object({
        old: z
          .object({
            id: z.string(),
            status: z.enum(["PUBLISH", "DRAFT"]).array(),
            draftKey: z.string().nullable(),
            publishValue: z.nullable(schema),
            draftValue: z.nullable(schema),
          })
          .nullable(),
        new: z
          .object({
            id: z.string(),
            status: z.enum(["PUBLISH", "DRAFT"]).array(),
            draftKey: z.string().nullable(),
            publishValue: z.nullable(schema),
            draftValue: z.nullable(schema),
          })
          .nullable(),
      })
    ),
  });
}

const WebhookAnySchema = MicroCMSWebhookRequestBody();
const WebhookProjectSchema = MicroCMSWebhookRequestBody(ProjectSchema);
const WebhookPostSchema = MicroCMSWebhookRequestBody(PostSchema);
const WebhookCategorySchema = MicroCMSWebhookRequestBody(CategorySchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  if (req.method === "POST") {
    try {
      if (typeof req.headers["x-microcms-signature"] !== "string") {
        throw new Error("X-MICROCMS-Signature is not found.");
      }

      const rawBody = await getRawBody(req);

      const expectedSignature = crypto
        .createHmac("sha256", process.env.MICROCMS_WEBHOOK_SIGNATURE || "")
        .update(rawBody)
        .digest("hex");
      const signature = req.headers["x-microcms-signature"];
      if (
        !crypto.timingSafeEqual(
          Buffer.from(signature),
          Buffer.from(expectedSignature)
        )
      ) {
        throw new Error("Invalid signature");
      }

      const body = JSON.parse(Buffer.from(rawBody).toString("utf-8"));

      let data = WebhookAnySchema.parse(body);

      if (data.api === "projects") {
        data = WebhookProjectSchema.parse(body);

        if (data.id) {
          await res.revalidate(`/projects/${data.id}`);
        }
        await res.revalidate("/projects");

        await res.revalidate("/");
      } else if (data.api === "posts") {
        data = WebhookPostSchema.parse(body);

        if (data.id) {
          await res.revalidate(`/blog/${data.id}`);
        }
        await res.revalidate("/blog");
      } else if (data.api === "categories") {
        data = WebhookCategorySchema.parse(body);

        await res.revalidate("/blog");
      } else {
        throw new Error("Unexpected api endpoint: " + data.api);
      }

      res.status(200).json({ revalidate: true });
    } catch (err: any) {
      res.status(400).json({ revalidate: false, error: err.message });
      return;
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
