import { PageBlocksSelfIntroduction } from "@/tina/__generated__/types";
import Image from "next/image";

type Props = {
  data: PageBlocksSelfIntroduction;
};

export default function SelfIntroductionBlock({ data }: Props) {
  return (
    <section className="col-span-full my-8 space-y-4">
      <h3 className="text-xl font-bold md:text-3xl">{data.motd}</h3>
      <p className="whitespace-pre-wrap md:text-lg">{data.introduction}</p>
    </section>
  );
}
