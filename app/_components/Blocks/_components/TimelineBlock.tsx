import Timeline from "../../Timeline";
import { PageBlocksTimeline } from "@/tina/__generated__/types";

type Props = {
  data: PageBlocksTimeline;
};

export default function TimelineBlock({ data }: Props) {
  return (
    <section className="col-span-full my-8 space-y-4">
      {data.titleForTimeline && (
        <h3 className="text-xl font-bold md:text-2xl">
          {data.titleForTimeline}
        </h3>
      )}
      <Timeline events={data.events} />
    </section>
  );
}
