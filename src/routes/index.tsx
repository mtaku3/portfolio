import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { SiX, SiGithub } from "@qwikest/icons/simpleicons";

export default component$(() => {
  return (
    <div class="flex flex-col w-full gap-8 my-10">
      <div class="mx-auto flex flex-col items-center gap-4 md:flex-row">
        <MyIcon />
        <Biography />
        <Links />
      </div>
      <AboutMe />
      <Projects />
      <Articles />
    </div>
  );
});

const MyIcon = component$(() => {
  return (
    <img src="/images/mtaku3.webp" alt="mtaku3's icon" class="w-8/12 max-w-72 aspect-square rounded-full md:w-64" />
  );
});

const Biography = component$(() => {
  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col text-amber-600 items-center md:items-start">
        <span class="font-medium text-lg leading-none">ゑむたくさん</span>
        <span class="font-bold text-3xl">mtaku3</span>
      </div>
      <div>
        <h2 class="font-medium leading-none">所属</h2>
        <p class="text-lg">東京科学大学 情報工学系 (22B)</p>
      </div>
      <div>
        <h2 class="font-medium leading-none">趣味</h2>
        <p class="text-lg">開発, ゲーム, 音楽</p>
      </div>
      <div>
        <h2 class="font-medium leading-none">好きな動物</h2>
        <p class="text-lg font-bold text-amber-600">カピバラ</p>
      </div>
      <div>
        <h2 class="font-medium leading-none">使用中のOS</h2>
        <p class="text-lg font-bold text-[#5277C3]">NixOS</p>
      </div>
    </div>
  );
});

const Links = component$(() => {
  return (
    <div class="flex gap-4 md:flex-col flex-wrap">
      <a href="https://x.com/oRqSXxv8GeDK" target="_blank" class="px-4 py-2 flex gap-4 rounded-md bg-black text-white items-center border-2 border-gray-400 hover:cursor-pointer hover:border-gray-300 w-full justify-center">
        <SiX />
        <span class="leading-none font-inter font-semibold">X (旧Twitter)</span>
      </a>
      <a href="https://github.com/mtaku3" target="_blank" class="px-4 py-2 flex gap-4 rounded-md bg-[#181717] text-white items-center border-2 border-gray-400 hover:cursor-pointer hover:border-gray-300 w-full justify-center">
        <SiGithub />
        <span class="leading-none font-inter font-semibold">GitHub</span>
      </a>
    </div>
  );
});

const AboutMe = component$(() => {
  return (
    <div class="flex flex-col gap-2 items-center">
      <h3 class="text-lg font-bold">歴史</h3>
      <div class="flex flex-col gap-2 w-fit">
        <div class="rounded-md border-2 border-gray-400 px-4 py-2 flex flex-col">
          <span class="text-gray-800 leading-none">2019 - 2024</span>
          <span>鹿児島工業高等専門学校 情報工学科</span>
        </div>
        <div class="mx-auto">
          <Connector />
        </div>
        <div class="rounded-md border-2 border-gray-400 px-4 py-2 flex flex-col">
          <span class="text-gray-800 leading-none">2023/12 - 2024/9</span>
          <span>株式会社TRUSTART システム開発部 インターン</span>
        </div>
        <div class="mx-auto">
          <Connector />
        </div>
        <div class="rounded-md border-2 border-gray-400 px-4 py-2 flex flex-col">
          <span class="text-gray-800 leading-none">2024 - Present</span>
          <span>東京科学大学 情報工学系</span>
        </div>
      </div>
    </div>
  );
});

const Connector = component$(() => {
  return (
    <div class="relative h-[44px]">
      <div class="absolute top-[6px] h-[32px] w-[2px] ml-[5px] bg-gray-400" />
      <div class="h-[12px] w-[12px] bg-gray-400 rounded-full" />
      <div class="absolute top-[32px] h-[12px] w-[12px] bg-gray-400 rounded-full" />
    </div>
  );
});

const Projects = component$(() => {
  return (
    <div class="flex flex-col gap-2 items-center">
      <h3 class="text-lg font-bold">プロジェクト</h3>
      <div class="flex flex-col gap-4 w-fit">
        <a href="https://github.com/mtaku3/portfolio" target="_blank" class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2">
          <div class="font-medium text-lg">mtaku3.com</div>
          <p class="font-light">
            このポートフォリオサイト <br />
            定期的に更新 & リニューアル
          </p>
        </a>
        <a href="https://github.com/mtaku3/automuteus-portable" target="_blank" class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2 font-medium">
          <div class="font-medium text-lg">AutoMuteUs Portable</div>
          <p class="font-light">
            AutoMuteUs というサーバーを実行するための Docker 代替ソフト <br />
            現在メンテナンス外, リプレイス予定有
          </p>
        </a>
        <a href="https://github.com/mtaku3/capybara-online-judge" target="_blank" class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2 font-medium">
          <div class="font-medium text-lg">Capybara Online Judge</div>
          <p class="font-light">
            高専時代に授業でチーム開発したオンラインジャッジシステム <br />
            フレームワークなしのPHP, DDD, オニオンアーキテクチャ <br />
            ジャッジ実行鯖とWeb鯖が分離していて地味なマイクロサービス
          </p>
        </a>
      </div>
    </div>
  );
});

const Articles = component$(() => {
  const signal = useArticles();
  return (
    <div class="flex flex-col gap-2 items-center">
      <h3 class="text-lg font-bold">記事</h3>
      <div class="flex flex-col gap-4 w-fit">
      {signal.value.map((article, idx) => (
        <a key={idx} href={article.url} target="_blank" class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2">
          <div class="font-medium text-lg">{article.title}</div>
        </a>
      ))}
      </div>
    </div>
  );
});

interface ZennApiArticle {
  articles: {
    id: string;
    title: string;
    path: string;
    published_at: string;
  }[]
}

interface Article {
  title: string;
  url: string;
  publishedAt: Date;
}

export const useArticles = routeLoader$(() => {
  return fetch("https://zenn.dev/api/articles?username=mtaku3")
    .then((res) => res.json() as Promise<ZennApiArticle>)
    .then((res) => 
      res.articles.map<Article>((article) => {
        return {
          title: article.title,
          url: `https://zenn.dev${article.path}`,
          publishedAt: new Date(article.published_at),
        };
      }).sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
    );
});

export const head: DocumentHead = {
  title: "mtaku3 のポートフォリオ",
};
