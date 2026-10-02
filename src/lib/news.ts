import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsEntry = CollectionEntry<'news'>;

export async function getSortedNews(): Promise<NewsEntry[]> {
  const entries = await getCollection('news');
  return entries.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || b.id.localeCompare(a.id),
  );
}
