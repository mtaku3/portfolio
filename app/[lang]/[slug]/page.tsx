import client from "@/tina/__generated__/client";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  return <></>;
}

export async function generateStaticParams() {
  const pagesResponse = await client.queries.pageConnection();
  const pages = pagesResponse.data.pageConnection.edges?.map((page) => {
    const lang = page?.node?._sys.relativePath?.split("/")[0];

    let slug = page?.node?._sys.filename;
    if (slug?.startsWith("home")) {
      slug = undefined;
    }

    return {
      lang,
      slug,
    };
  });
  return pages;
}
