import dayjs, { extend } from 'dayjs';
import dayjsPluginTimezone from 'dayjs/plugin/timezone';
import dayjsPluginUtc from 'dayjs/plugin/utc';
import { Feed } from 'feed';
import { fetchBlogEntries } from '~/util/blog/entry';

extend(dayjsPluginUtc);
extend(dayjsPluginTimezone);

const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const generateRss = async (): Promise<Feed> => {
  const feed = new Feed({
    copyright: `© ${new Date().getFullYear()} sqrtox`,
    description: SITE_DESCRIPTION,
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

  const blogEntries = await fetchBlogEntries();

  for (const { title, slug, modifiedTimestamp, description } of blogEntries) {
    const { href } = new URL(`/blog/${slug}`, BASE_URL);
    const time = dayjs.tz(modifiedTimestamp, 'Asia/Tokyo');

    feed.addItem({
      date: time.toDate(),
      description,
      id: href,
      link: href,
      title
    });
  }

  return feed;
};

export { generateRss };
