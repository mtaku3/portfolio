import { PageBlocksProfile } from "@/tina/__generated__/types";
import Image from "next/image";

type Props = {
  data: PageBlocksProfile;
};

export default function ProfileBlock({ data }: Props) {
  return (
    <section className="col-span-full flex items-center space-x-4 py-16">
      <Image
        className="h-24 w-24 rounded-full md:h-32 md:w-32"
        src={data.image}
        alt={`Image of ${data.name}`}
        width={128}
        height={128}
      />
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold md:text-5xl">{data.name}</h1>
        <h2 className="text-sm md:text-base lg:text-lg">{data.position}</h2>
      </div>
    </section>
  );
}
