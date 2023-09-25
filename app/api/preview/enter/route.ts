import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { isUserAuthorized } from "@tinacms/auth";

export async function GET(request: Request) {
  // Check the environmen
  const isLocal = env.NODE_ENV === "development";

  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const slug = searchParams.get("slug");

  // Check the token
  // This token should only be known to this route handler and the CMS
  const isAuthorizedRes =
    isLocal ||
    (await isUserAuthorized({
      token: `Bearer ${token}`,
      clientID: env.NEXT_PUBLIC_TINACMS_CLIENTID,
    }));
  if (!isAuthorizedRes) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check the slug
  if (!slug) {
    return new Response("Slug cannot be empty", { status: 400 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  redirect(slug);
}
