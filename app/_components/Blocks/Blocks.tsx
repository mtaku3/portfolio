import ProfileBlock from "./_components/ProfileBlock";
import { PageBlocks } from "@/tina/__generated__/types";

type Props = {
  blocks: PageBlocks[];
};

export default function Blocks({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.__typename) {
          case "PageBlocksProfile":
            return <ProfileBlock key={idx} data={block} />;
          default:
            return <div key={idx}>Nothing to be rendered for this block</div>;
        }
      })}
    </>
  );
}
