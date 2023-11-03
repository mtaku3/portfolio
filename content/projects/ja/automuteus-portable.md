---
seo:
  title: AutoMuteUs Portable
  description: Discord BOTであるAutoMuteUsを実行・管理するポータブルアプリケーション
title: AutoMuteUs Portable
shortDescription: Discord BOTであるAutoMuteUsを実行・管理するポータブルアプリケーション
body: "## なぜ開発した？ \U0001F914\nAutoMuteUsとは、宇宙人狼でおなじみ Among Us というゲームとDiscordを連携させるためのBOTサーバーです。\n\nもちろん開発元が公式のBOTサーバーを運用していますが同時利用者数に制限があり、Among Usプレイ者数の多い金曜の夜などにはBOTを使用できないことが多々ありました。\n\nそんな中、AutoMuteUsはOSSで開発されているのでセルフホストすることが流行りました。しかし、AutoMuteUsはマイクロサービスアーキテクチャで開発されていてDocker Composeでデプロイすることを前提に開発されていました。よって、Windows上で実行するにはWSL 2をインストールし、Docker Desktopをインストールし、GitでAutoMuteUsをクローンして、docker-compose.ymlを編集して実行する必要があり、普段からWSLやDockerを使用している人には簡単ですが、サーバー等の知識の少ないカジュアルゲーマーにはかなり難しいプロセスになっていました。\n\nさらに、WSLとDockerを動作させることからメモリ消費量が多く、ゲームと同時に動かすというのも現実的ではありません。\n\nよって、設定を簡単に、かつリソース消費を少なくしたAutoMuteUs Portableの開発に着手しました。\n\n## Dockerなしでどうすれば。。？\n方法は至ってシンプルで、AutoMuteUsの各コンポーネントをWindows用にビルドし、正しく環境変数を与え実行するアプリケーションを開発する。というものです。\n\n有難いことに累計ダウンロード数は7800, 最新版のダウンロード数は928と、未だに多く利用していただいています。\n\n## メジャーアップデート計画中 \U0001F503\n現在の最新版はv3.1.1ですが、開発当時（高専2年生の冬）は未熟で、付け焼刃の雑なコーディングになってしまったので、フルスクラッチのアップデートをしたいと考えています。\n\nしかし中々いい仕組みが思いつかず足踏み中です \U0001F62A"
---



