import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import { remarkDirectiveBlocks } from './src/markdown/directives';
import { rehypeHeadingPermalinks } from './src/markdown/heading-ids';

export default defineConfig({
  site: 'https://info.envas.jp',
  markdown: {
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkDirective, remarkDirectiveBlocks, remarkBreaks],
      rehypePlugins: [rehypeHeadingPermalinks],
    }),
  },
});
