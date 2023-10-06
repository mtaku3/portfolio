import ProfileBlock from "./_components/ProfileBlock";
import SelfIntroductionBlock from "./_components/SelfIntroductionBlock";
import TimelineBlock from "./_components/TimelineBlock";
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
          case "PageBlocksSelfIntroduction":
            return <SelfIntroductionBlock key={idx} data={block} />;
          case "PageBlocksTimeline":
            return <TimelineBlock key={idx} data={block} />;
          default:
            return <div key={idx}>Nothing to be rendered for this block</div>;
        }
      })}
    </>
  );
}
