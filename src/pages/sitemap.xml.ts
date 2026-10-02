import type { APIContext } from 'astro';
import { getSortedNews } from '../lib/news';

export async function GET(context: APIContext) {
  const entries = await getSortedNews();
  const paths = ['/', ...entries.map((entry) => `/news/${entry.id}/`)];
  const urls = paths.map((path) => `  <url><loc>${new URL(path, context.site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
