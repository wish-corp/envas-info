# envas-info
![envas-info-deploy-status](https://github.com/wish-corp/envas-info/actions/workflows/deploy.yml/badge.svg)

WEB 席次表 envas のお知らせサイト

## セットアップと起動

Node.js 24（`.nvmrc` 参照）が必要です。

```bash
npm ci
npm run dev
```

http://localhost:4321 で確認できます。検索は dev サーバーでは動かないので、検索を確かめるときは `npm run build && npm run preview` を使います。型検査は `npm run check` です。

## お知らせの追加

`src/content/news/YYYY-MM-DD-slug.md` を作ります。ファイル名がそのまま URL（`/news/YYYY-MM-DD-slug/`）になるので、公開後は変えないでください。

先頭に frontmatter を書きます。

```md
---
title: "お知らせのタイトル"
publishedAt: "2026-10-02T19:00:00+09:00"
description: "一覧の抜粋に出す文章（任意）"
---
```

- `publishedAt` は上の形でダブルクォートが必須です。クォートが無いと`publishedAt: Expected type "string", received "object"`のようなエラーでビルドが止まります。時刻が未定なら 19:00 にします。
- `description` は最新のお知らせのときだけ一覧の抜粋に出ます。ページの説明文（検索結果や SNS で共有されたときに出る文）と RSS の各記事の説明にも使われます。省くとページの説明文はサイトの説明文になり、RSS には説明が出ません。
- 本文に `# 見出し` は書きません。タイトルは frontmatter から出ます。
- 段落内の改行はそのまま改行として表示されます。
- `**` のすぐ内側が「」や（）などの約物で、すぐ外側に約物でも空白でもない文字が続くと太字になりません（例 `**和テーマ「wa」**を`）。この場合は `<strong>和テーマ「wa」</strong>を` と書きます。

### 注意書き

```md
:::warning[タイトル]
本文
:::

:::danger[タイトル]
本文
:::
```

### 動画

```md
::youtube[説明]{id="動画ID"}
::video[説明]{src="/videos/<slug>/xxx.mp4"}
```

ローカル動画のファイルは `public/videos/<slug>/` に置きます。1 ファイル 100 MB 未満にしてください。

### 画像

```md
![説明](./images/<slug>/xxx.png)
```

画像のファイルは `src/content/news/images/<slug>/` に置きます。

### 記法を誤ったとき

ビルドが「Markdown の変換に失敗した」で止まります。直前の `Error rendering` のログに原因が出ます。

## デプロイ

main への push で GitHub Actions がビルドし、gh-pages ブランチへ反映します。
