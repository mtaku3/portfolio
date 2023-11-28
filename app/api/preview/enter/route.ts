import { IsAuthorized } from "../../_libs/auth";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	// Parse query string parameters
	const { searchParams } = new URL(request.url);
	const token = searchParams.get("token");
	const slug = searchParams.get("slug");

	if (!IsAuthorized(token)) {
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
