/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function Handler() {
  return new ImageResponse(
    (
      <div tw="w-screen h-screen flex items-center bg-white">
        <div tw="flex">
          <div tw="flex flex-col flex-grow mr-4">
            <h1 tw="text-5xl font-bold">mtaku3</h1>
            <span tw="mt-2">鹿児島工業高等専門学校の学生</span>
            <h2 tw="mt-4">
              独学でプログラミングを学びながら、AIの研究をしています。
              <br />
              興味はWEB開発に限らず、アセンブリ言語やデスクトップアプリなど幅広く勉強しています。
            </h2>
          </div>
          <div tw="flex shrink-0">
            <img
              tw="rounded-full h-32 w-32"
              src="http://localhost:3000/mtaku3.jpg"
              alt="mtaku3's profile picture"
              width={128}
              height={128}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      debug: true,
    }
  );
}
