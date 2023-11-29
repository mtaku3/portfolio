import PreviewModal from "../../PreviewModal";
import BlogPostTemplate from "@/app/[lang]/blog/[slug]/blogPostTemplate";
import client from "@/tina/__generated__/client";

type Props = {
  params: {
    lang: string;
    blogPostSlug: string;
  };
};

export default async function BlogPostModal({ params }: Props) {
  const { data } = await client.queries.blogPost({
    relativePath: `${params.lang}/${params.blogPostSlug}.md`,
  });

  return (
    <PreviewModal>
      <BlogPostTemplate data={data} />
    </PreviewModal>
  );
}
