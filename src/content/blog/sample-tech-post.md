---
title: "サンプル記事：記事内で使える表現の一覧"
description: "デザインシステムを適用した記事本文の表示パターンを網羅的に確認するためのサンプルです。"
pubDate: 2026-07-04
tags: ["astro", "sample", "design-system"]
category: "技術メモ"
---

記事本文で使える表現をひととおり並べたサンプルです。デザインシステム（`@noa4021j/design-system`）を適用したときの見た目を、ライト / ダークを切り替えながら確認するために使います。

## テキスト

段落はこのように表示されます。**強調**、*斜体*、~~打ち消し~~、[リンク](/blog/)、`インラインコード` を文中に混ぜるとこうなります。

一文が長くなった場合の行間と行長も確認しておきたいところです。本文の行長は読みやすさを優先して抑えてあり、行間は広めに取っています。長い日本語の文章がどのように折り返され、どの程度の密度で読めるのかを、実際の分量で見るためのダミーテキストです。

### 見出しレベル3

見出しの直後に続く段落です。

#### 見出しレベル4

さらに下位の見出しです。日本語の見出しもアンカーとして機能します。

## リスト

- 箇条書きの第1項
- 第2項
  - 入れ子の項目
  - もう1つ
- 第3項

1. 順序付きの第1項
2. 第2項
   1. 入れ子の順序付き
   2. もう1つ
3. 第3項

## 引用

> 引用ブロックは左に3pxのアクセント罫線が付きます。
>
> 複数段落の引用も可能です。

## コード

インラインは `pnpm build` のように表示されます。

言語指定のないブロック。

```
knowledge-base/
├── src/
│   ├── content/
│   └── styles/
└── astro.config.mjs
```

TypeScript。

```ts
type Token = {
  name: string;
  value: string;
};

const toCssVar = (t: Token): string => `--${t.name}: ${t.value};`;

export const build = (tokens: Token[]) => tokens.map(toCssVar).join("\n");
```

シェル。

```bash
pnpm install
pnpm dev
```

CSS。

```css
.noa-callout {
  border: var(--noa-callout-border);
  border-radius: var(--noa-callout-radius);
  background: var(--noa-callout-bg);
}
```

## テーブル

| 領域 | 書籍 | 優先度 |
|------|------|--------|
| OS | 試して理解 Linuxのしくみ | ★★★ |
| Network | マスタリングTCP/IP 入門編 | ★★★ |
| Data | データ指向アプリケーションデザイン | ★★★★ |

## 区切り線

---

区切り線のあとの段落です。

## まとめ

以上が記事内で使える表現の一覧です。見た目の実体はすべて `@noa4021j/design-system` にあり、トークンを変更すればこの記事の表示も追従します。
