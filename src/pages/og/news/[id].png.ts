import { renderOgImage } from '../../../og/render';
import { getSortedNews } from '../../../lib/news';

export async function getStaticPaths() {
  const entries = await getSortedNews();
  return entries.map((entry) => ({ params: { id: entry.id }, props: { title: entry.data.title } }));
}

export async function GET({ props }: { props: { title: string } }) {
  return new Response(await renderOgImage(props.title), { headers: { 'Content-Type': 'image/png' } });
}
