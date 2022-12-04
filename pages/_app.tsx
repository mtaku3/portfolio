import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class">
      <DefaultSeo
        defaultTitle="mtaku3's Portfolio"
        description="mtaku3のポートフォリオ兼ブログサイト"
        openGraph={{
          type: "website",
          locale: "ja_JP",
          title: "mtaku3's Portfolio",
          description:
            "mtaku3のポートフォリオ兼ブログサイト サイドプロジェクトの詳細情報や技術記事が閲覧できます",
          url: process.env.URL,
          site_name: "mtaku3's portfolio & blog",
        }}
        twitter={{
          handle: "@DYZdK2oir7Pm",
          site: "@DYZdK2oir7Pm",
          cardType: "summary_large_image",
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
