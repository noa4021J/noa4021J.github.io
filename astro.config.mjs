// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://noa4021j.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    // コードブロックは常時ダーク面（--code-bg）。Shikiのテーマはそれに近い github-dark を使用。
    // 背景色自体は global.css の .prose pre で var(--code-bg) に上書きしている。
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
