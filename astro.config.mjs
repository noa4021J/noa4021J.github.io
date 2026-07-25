// @ts-check
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// シンタックスハイライトの配色もデザイントークンから引く。
// Shiki のテーマはビルド時に解決されるため CSS 変数を参照できず、
// ここで tokens.json を直接読んで組み立てている。
const require = createRequire(import.meta.url);
const tokens = JSON.parse(fs.readFileSync(require.resolve('@noa4021j/design-system/tokens.json'), 'utf8'));

/** @param {Record<string, { $value: string }>} o */
const flat = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, v.$value]));

/**
 * デザインシステムの --code-* をそのまま写した TextMate テーマ
 * @param {string} name
 * @param {'light' | 'dark'} type
 * @param {Record<string, string>} c
 */
const codeTheme = (name, type, c) => ({
  name,
  type,
  colors: {
    'editor.background': c.bg,
    'editor.foreground': c.text,
  },
  settings: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.comment } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'keyword.operator', 'keyword.control', 'variable.language'],
      settings: { foreground: c.keyword },
    },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: c.function } },
    { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: c.type } },
    { scope: ['string', 'string.quoted', 'string.template', 'constant.other.symbol'], settings: { foreground: c.string } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: c.meta } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: c.type } },
  ],
});

// https://astro.build/config
export default defineConfig({
  site: 'https://noa4021j.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    // コードブロックはライト/ダークで切り替える。
    // defaultColor: false により Shiki が両方の色を CSS 変数
    // （--shiki-light / --shiki-dark）で出力し、切替は global.css が担う。
    shikiConfig: {
      themes: {
        light: codeTheme('noa-light', 'light', flat(tokens.color.code.light)),
        dark: codeTheme('noa-dark', 'dark', flat(tokens.color.code.dark)),
      },
      defaultColor: false,
    }
  }
});
