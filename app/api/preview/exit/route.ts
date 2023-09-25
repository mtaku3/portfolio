import { draftMode } from "next/headers";

export async function GET(request: Request) {
  // TODO: Implement slug redirection with slug validation to prevent arbitrary redirects
  draftMode().disable();
  return new Response("Draft mode is disabled");
}
