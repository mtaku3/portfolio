import { env } from "@/env.mjs";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, writeFileSync } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import { Media } from "tinacms";

type Props = {
  params: {
    media: string[];
  };
};

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const directory = searchParams.get("directory") ?? '""';
    const limit = parseInt(searchParams.get("limit") ?? "500");
    const offset = searchParams.get("offset") ?? undefined;

    const useRootDirectory =
      !directory || directory === "/" || directory === '""';

    const query = useRootDirectory ? 'folder=""' : `folder="${directory}"`;

    const response = await cloudinary.search
      .expression(query)
      .max_results(limit)
      .next_cursor(offset)
      .execute();

    const files = response.resources.map((file: any) => {
      const filename = path.basename(file.public_id);
      const directory = path.dirname(file.public_id);

      return {
        id: file.public_id,
        filename,
        directory,
        src: file["secure_url"],
        thumbnails: {
          "75x75": transformCloudinaryImage(
            file["secure_url"],
            "w_75,h_75,c_fit,q_auto",
          ),
          "400x400": transformCloudinaryImage(
            file["secure_url"],
            "w_400,h_400,c_fit,q_auto",
          ),
          "1000x1000": transformCloudinaryImage(
            file["secure_url"],
            "w_1000,h_1000,c_fit,q_auto",
          ),
        },
        type: "file",
      };
    });

    // @ts-ignore
    cloudinary.api.folders = (directory: string = '""') => {
      if (useRootDirectory) {
        return cloudinary.api.root_folders();
      } else {
        return cloudinary.api.sub_folders(directory);
      }
    };
    let folders: string[] = [];
    let folderRes = null;

    try {
      // @ts-ignore
      folderRes = await cloudinary.api.folders(directory);
    } catch (e: any) {
      // If the folder doesn't exist, just return an empty array
      if (e.error?.message.startsWith("Can't find folder with path")) {
        // ignore
      } else {
        console.error("Error getting folders");
        console.error(e);
        throw e;
      }
    }

    if (folderRes?.folders) {
      folders = folderRes.folders.map(function (folder: {
        name: string;
        path: string;
      }): Media {
        "empty-repo/004";
        return {
          id: folder.path,
          type: "dir",
          filename: path.basename(folder.path),
          directory: path.dirname(folder.path),
        };
      });
    }

    return Response.json({
      items: [...folders, ...files],
      offset: response.next_cursor,
    });
  } catch (e) {
    console.log(e);
    const message = findErrorMessage(e);
    return Response.json({ e: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const directory = data.get("directory");
  if (!directory || typeof directory !== "string") {
    return Response.json({ e: "No directory specified" }, { status: 500 });
  }

  const file = data.get("file");
  if (!file || !(file instanceof File)) {
    return Response.json({ e: "No file uploaded" }, { status: 500 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `/tmp/${file.name}`;
  writeFileSync(path, buffer);

  //@ts-ignore
  const result = await cloudinary.uploader.upload(path, {
    folder: directory.replace(/^\//, ""),
    use_filename: true,
    overwrite: false,
  });

  return Response.json(result);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const media = params.media;
  const [, public_id] = media;

  try {
    await cloudinary.uploader.destroy(public_id, {});
  } catch (e: any) {
    console.log(e);
    const message = findErrorMessage(e);
    return Response.json({ e: message, public_id }, { status: 500 });
  }
}

function transformCloudinaryImage(
  url: string,
  transformations: string,
): string {
  const parts = url.split("/image/upload/");

  if (parts.length === 2) {
    return parts[0] + "/image/upload/" + transformations + "/" + parts[1];
  }

  return url;
}

/**
 * we're getting inconsistent errors in this try-catch
 * sometimes we just get a string, sometimes we get the whole response.
 * I suspect this is coming from Cloudinary SDK so let's just try to
 * normalize it into a string here.
 */
const findErrorMessage = (e: any) => {
  if (typeof e == "string") return e;
  if (e.message) return e.message;
  if (e.error && e.error.message) return e.error.message;
  return "an error occurred";
};
