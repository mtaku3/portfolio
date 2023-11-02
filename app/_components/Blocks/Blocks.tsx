import ListBlock from "./_components/ListBlock/ListBlock";
import ProfileBlock from "./_components/ProfileBlock";
import ProjectsListBlock from "./_components/ProjectsListBlock";
import SelfIntroductionBlock from "./_components/SelfIntroductionBlock";
import TimelineBlock from "./_components/TimelineBlock";
import { PageBlocks, PageQuery } from "@/tina/__generated__/types";

type Props = {
  params: {
    lang: string;
  };
  blocks: PageQuery["page"]["blocks"];
};

export default function Blocks({ params, blocks }: Props) {
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
          case "PageBlocksList":
            return <ListBlock key={idx} data={block} />;
          case "PageBlocksProjectsList":
            return <ProjectsListBlock key={idx} params={params} data={block} />;
          default:
            return <div key={idx}>Nothing to be rendered for this block</div>;
        }
      })}
    </>
  );
}
