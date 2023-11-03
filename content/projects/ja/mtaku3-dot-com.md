---
title: mtaku3.com
shortDescription: Next.js 14とTinaCMSで開発したポートフォリオサイト
body: "本サイト(mtaku3.com)はNext.js 14とTinaCMSで開発したポートフォリオサイトです。\n\nNext.js 13から実装されたApp Routerを採用しており、最適化に注力して開発しました。\n\n## Next.js 13/14 の恩恵\n以前まではNext.js Pages Routerで実装しており、CMSにもmicroCMSを利用していました。しかし、microCMSの使い勝手が個人的に好きではなかったので新たにTinaCMSを使ったポートフォリオサイトを開発したいと考えていました。\n\nそんなときNext.js 13がリリースされ、App Routerが登場しました。Pages Routerとはかなり異なるコンセプトで困惑しましたが、これを機にフルスクラッチで再実装しようと決意し開発しました。\n\nApp Routerの主な印象はPages Routerに比べレンダリングやフェッチングの仕方に厳密になっているという感覚です。Server ComponentとClient Componentによってフェッチングが厳密に分けられていて実装時に考えることが増えた感覚がありました。\n\n最適化という面では良いアップデートではあると思いますが、個人開発をやっている身としては　思い立ってすぐ実装　というのが難しくなったのは辛いところです。\n\nPages RouterからApp Routerの移行も簡単ではなさそうなので、最初Pages Routerで軽く実装して後からApp Routerに移行してきちんと実装というわけにもいきそうにありません\U0001F625\n\n### Parallel Routing, Intercepting Routing ってなに？？\nさて、App Routerの恩恵ですが最適化はもちろんのこと、個人的に一番気に入ったのはParallel Routing & Intercepting Routingです。\n\n要するに\n![Parallel Routing](https://res.cloudinary.com/dxqbtsvkr/image/upload/v1698929621/parallel-routes_drtuyo.avif)\n- **Parallel Routing** はその名の通り1つのページ上に複数のルートを表示させてみようという試みで\n\n![Intercepting Routing](https://res.cloudinary.com/dxqbtsvkr/image/upload/v1698929618/intercepting-routes-soft-navigate_c4knat.avif)\n- **Intercepting Routing** はルート推移時とルートに直接訪れた際に異なるページを表示させようという試み\n\nです。私が思いつく用途としてはページのプレビューを表示させることで、実際に本サイトのプロジェクト一覧で採用しています。（プロジェクト一覧からプロジェクトの詳細にルート推移する場合はモーダルで、ルートに直接訪れた場合には全体表示しています)\n\n## なぜ TinaCMS に？ \U0001F9D0\nTinaCMS の Visual Editing に魅了されて移行しました。\n使ってみた感触はなかなか便利です。が、新しいドキュメント作成時にプレビューが見れないのが唯一不便だと感じました。\n![TinaCMS Visual Editing](https://res.cloudinary.com/dxqbtsvkr/image/upload/v1699000842/tinacms-visual-editing_ardsxx.gif)"
seo:
  title: mtaku3.com
  description: Next.js 14とTinaCMSで開発したポートフォリオサイト
---



