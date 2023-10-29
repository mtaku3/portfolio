import Blocks from "@/app/_components/Blocks";
import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";

type Props = {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
};

export default function PageTemplate({ data }: Props) {
  return <Blocks blocks={data.page.blocks} />;
}
