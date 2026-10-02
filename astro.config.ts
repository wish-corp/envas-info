import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://info.envas.jp',
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkBreaks],
    }),
  },
});
