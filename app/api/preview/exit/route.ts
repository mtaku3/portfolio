import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	// Parse query string parameters
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");

	// Check the slug
	if (!slug) {
		return new Response("Slug cannot be empty", { status: 400 });
	}

	// Disable Draft Mode by setting the cookie
	draftMode().disable();

	// Redirect to the path from the fetched post
	redirect(slug);
}
