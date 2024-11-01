import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { SiX, SiGithub } from "@qwikest/icons/simpleicons";
import { LuChevronDown, LuHistory } from "@qwikest/icons/lucide";
import jwt from "jsonwebtoken";
import { Collapsible } from "@qwik-ui/headless";

export default component$(() => {
  return (
    <div class="flex flex-col w-full gap-8 my-10 items-center">
      <div class="w-11/12 max-w-[400px] md:w-[720px] md:max-w-none lg:w-[768px] flex flex-col items-center gap-4 md:flex-row">
        <MyIcon />
        <Biography />
        <Links />
      </div>
      <div class="w-11/12 max-w-[560px] flex flex-col items-center gap-4">
        <AboutMe />
        <Projects />
        <Articles />
        <Music />
      </div>
    </div>
  );
});

const MyIcon = component$(() => {
  return (
    <img
      src="/images/mtaku3.webp"
      alt="mtaku3's icon"
      class="w-8/12 max-w-72 aspect-square rounded-full md:w-64"
    />
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
      <a
        href="https://x.com/oRqSXxv8GeDK"
        target="_blank"
        class="px-4 py-2 flex gap-4 rounded-md bg-black text-white items-center border-2 border-gray-400 hover:cursor-pointer hover:border-gray-300 w-full justify-center"
      >
        <SiX />
        <span class="leading-none font-inter font-semibold">X (旧Twitter)</span>
      </a>
      <a
        href="https://github.com/mtaku3"
        target="_blank"
        class="px-4 py-2 flex gap-4 rounded-md bg-[#181717] text-white items-center border-2 border-gray-400 hover:cursor-pointer hover:border-gray-300 w-full justify-center"
      >
        <SiGithub />
        <span class="leading-none font-inter font-semibold">GitHub</span>
      </a>
    </div>
  );
});

const AboutMe = component$(() => {
  return (
    <div class="flex flex-col gap-2 items-center w-full">
      <h3 class="text-lg font-bold">歴史</h3>
      <div class="flex flex-col gap-2 w-full">
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
    <div class="flex flex-col gap-2 items-center w-full">
      <h3 class="text-lg font-bold">プロジェクト</h3>
      <div class="flex flex-col gap-4 w-full">
        <a
          href="https://github.com/mtaku3/portfolio"
          target="_blank"
          class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2"
        >
          <div class="font-medium text-lg">mtaku3.com</div>
          <p class="font-light">
            このポートフォリオサイト <br />
            定期的に更新 & リニューアル
          </p>
        </a>
        <a
          href="https://github.com/mtaku3/automuteus-portable"
          target="_blank"
          class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2 font-medium"
        >
          <div class="font-medium text-lg">AutoMuteUs Portable</div>
          <p class="font-light">
            AutoMuteUs というサーバーを実行するための Docker 代替ソフト <br />
            現在メンテナンス外, リプレイス予定有
          </p>
        </a>
        <a
          href="https://github.com/mtaku3/capybara-online-judge"
          target="_blank"
          class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2 font-medium"
        >
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
    <div class="flex flex-col gap-2 items-center w-full">
      <h3 class="text-lg font-bold">記事</h3>
      <div class="flex flex-col gap-4 w-full">
        {signal.value.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            class="rounded-md border-2 border-gray-400 hover:border-gray-300 hover:text-gray-600 px-4 py-2"
          >
            <div class="font-medium text-lg">{article.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
});

// https://toolbox.marketingtools.apple.com/en-us/apple-music/jp
const Music = component$(() => {
  return (
    <div class="flex flex-col gap-2 items-center w-full">
      <h3 class="text-lg font-bold">お気に入りの曲</h3>
      <p>最近聴いてるお気に入りの曲を不定期で更新してます</p>
      <div>
        <a
          href="https://findmestore.thinkr.jp/collections/asu/products/5sr-000-0076"
          target="_blank"
          class="underline decoration-dotted font-semibold"
        >
          ソラゴト - Acoustic Arrange - / twilight by 明透
        </a>
      </div>
      <PreviousMusic />
    </div>
  );
});

const PreviousMusic = component$(() => {
  return (
    <Collapsible.Root class="w-full">
      <Collapsible.Trigger class="group mx-auto flex items-center gap-2 py-2 text-gray-600">
        <LuChevronDown class="group-data-[open=]:-rotate-180 transition" />
        <span>過去のお気に入りの曲</span>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div class="space-y-2">
          <div class="flex gap-2 justify-center items-center text-gray-600">
            <LuHistory />
            <p class="font-light text-center">2024/10</p>
          </div>
          <iframe
            height="175"
            width="100%"
            title="Media player"
            src="https://embed.music.apple.com/jp/album/rebirth/1609933481?i=1609933491&amp;l=en-US&amp;itscg=30200&amp;itsct=music_box_player&amp;ls=1&amp;app=music&amp;mttnsubad=1609933491&amp;theme=light"
            id="embedPlayer"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            allow="autoplay *; encrypted-media *; clipboard-write"
            style="border: 0px; border-radius: 12px; width: 100%; height: 175px; max-width: 650px;"
          ></iframe>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
});

interface Article {
  title: string;
  url: string;
  publishedAt: Date;
}

export const useArticles = routeLoader$((requestEvent) => {
  const TRAP_GHOST_API_KEY = requestEvent.env.get("TRAP_GHOST_API_KEY");
  if (TRAP_GHOST_API_KEY == null) {
    throw new Error("TRAP_GHOST_API_KEY is not set");
  }

  return Promise.all([
    getZennArticles(),
    getNoteArticles(),
    getTrapArticles(TRAP_GHOST_API_KEY),
  ]).then(([zennArticles, noteArticles, trapArticles]) => {
    return [...zennArticles, ...noteArticles, ...trapArticles].sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
  });
});

interface ZennApiArticle {
  articles: {
    id: string;
    title: string;
    path: string;
    published_at: string;
  }[];
  next_page: number | null;
}

const getZennArticles = async () => {
  let page = 1;
  const articles: Article[] = [];

  while (true) {
    const res = await fetch(
      `https://zenn.dev/api/articles?username=mtaku3&page=${page}`,
    );
    const data = (await res.json()) as ZennApiArticle;
    for (const article of data.articles) {
      articles.push({
        title: article.title,
        url: `https://zenn.dev${article.path}`,
        publishedAt: new Date(article.published_at),
      });
    }

    if (data.next_page != null) {
      page = data.next_page;
      await new Promise((res) => setTimeout(res, 1000));
    } else {
      break;
    }
  }

  return articles;
};

interface NoteApiArticle {
  data: {
    contents: {
      name: string;
      publishAt: string;
      noteUrl: string;
    }[];
    isLastPage: boolean;
  };
}

const getNoteArticles = async () => {
  let page = 1;
  const articles: Article[] = [];

  while (true) {
    const res = await fetch(
      `https://note.com/api/v2/creators/mtaku3/contents?kind=note&page=${page}`,
    );
    const data = (await res.json()) as NoteApiArticle;
    for (const article of data.data.contents) {
      articles.push({
        title: article.name,
        url: article.noteUrl,
        publishedAt: new Date(article.publishAt),
      });
    }

    if (!data.data.isLastPage) {
      page += 1;
      await new Promise((res) => setTimeout(res, 1000));
    } else {
      break;
    }
  }

  return articles;
};

interface TrapGhostApiArticle {
  posts: {
    title: string;
    url: string;
    published_at: string;
  }[];
  meta: {
    pagination: {
      page: number;
      next: number | null;
      prev: number | null;
    };
  };
}

const ghostApiKey2Token = (apiKey: string) => {
  const [id, secret] = apiKey.split(":");

  return jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: id,
    algorithm: "HS256",
    expiresIn: "5m",
    audience: "/admin/",
  });
};

const getTrapArticles = async (apiKey: string) => {
  const searchParams = new URLSearchParams({
    includes: "authors",
    fields: "title,url,published_at",
    filter: "authors.name:mtaku3+status:published+visibility:public",
    limit: "all",
    order: "published_at desc",
  });
  const apiUrl = new URL("https://blog-admin.trap.jp/ghost/api/admin/posts");
  apiUrl.search = searchParams.toString();

  const articles: Article[] = [];

  const res = await fetch(apiUrl, {
    headers: {
      authorization: `Ghost ${ghostApiKey2Token(apiKey)}`,
    },
  });
  const data = (await res.json()) as TrapGhostApiArticle;
  for (const article of data.posts) {
    articles.push({
      title: article.title,
      url: article.url,
      publishedAt: new Date(article.published_at),
    });
  }

  return articles;
};

export const head: DocumentHead = {
  title: "mtaku3 のポートフォリオ",
};
