import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSortedNews } from '../lib/news';

export async function GET(context: APIContext) {
  const entries = await getSortedNews();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: String(context.site),
    customData: '<language>ja</language>',
    items: entries.map((entry) => ({
      title: entry.data.title,
      link: `/news/${entry.id}/`,
      pubDate: entry.data.publishedAt,
      description: entry.data.description,
    })),
  });
}
