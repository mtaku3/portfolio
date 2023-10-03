import { PageQuery, PageQueryVariables } from "@/tina/__generated__/types";

type Props = {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
};

export default function PageTemplate({ data }: Props) {
  return <div></div>;
}
