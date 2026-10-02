import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { toIsoJst } from './lib/datetime';

const JST_ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/;

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().min(1),
    // クォートが無いと YAML が先に Date へ変え、オフセットの有無を判別できなくなるので文字列に限る
    publishedAt: z
      .string()
      .regex(JST_ISO_PATTERN, 'publishedAt は "YYYY-MM-DDTHH:mm:ss+09:00" をダブルクォートで囲んで書く')
      .refine((value) => toIsoJst(new Date(value)) === value, 'publishedAt が存在しない日時になっている')
      .transform((value) => new Date(value)),
    description: z.string().optional(),
  }),
});

export const collections = { news };
