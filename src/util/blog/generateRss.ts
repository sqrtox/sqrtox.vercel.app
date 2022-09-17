import { mkdir, writeFile } from 'node:fs/promises';
import dayjs, { extend } from 'dayjs';
import dayjsPluginTimezone from 'dayjs/plugin/timezone';
import dayjsPluginUtc from 'dayjs/plugin/utc';
import { Feed } from 'feed';
import { type BlogEntry } from '~/util/blog/entry';

extend(dayjsPluginUtc);
extend(dayjsPluginTimezone);

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const generateRss = async (blogEntries: readonly BlogEntry[]): Promise<void> => {
  const feed = new Feed({
    copyright: `© ${new Date().getFullYear()} sqrtox`,
    feedLinks: {
      atom: `${BASE_URL}/rss/atom.xml`,
      json: `${BASE_URL}/rss/feed.json`,
      rss2: `${BASE_URL}/rss/feed.xml`
    },
    id: BASE_URL,
    image: `${BASE_URL}/favicons/favicon-16x16.png`,
    language: 'ja',
    link: BASE_URL,
    title: SITE_NAME
  });

  for (const { title, slug, publishedTimestamp, description } of blogEntries) {
    const { href } = new URL(`/blog/${slug}`, BASE_URL);
    const time = dayjs.tz(publishedTimestamp, 'Asia/Tokyo');

    feed.addItem({
      date: time.toDate(),
      description,
      id: href,
      link: href,
      title
    });
  }

  await mkdir('./public/rss/', { recursive: true });
  await writeFile('./public/rss/feed.xml', feed.rss2());
  await writeFile('./public/rss/atom.xml', feed.atom1());
  await writeFile('./public/rss/feed.json', feed.json1());
};

export { generateRss };
