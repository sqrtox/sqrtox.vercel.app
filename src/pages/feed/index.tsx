import { type GetServerSideProps } from 'next';
import { type FC } from 'react';
import { generateRss } from '~/util/blog/generateRss';

const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateRss();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');
  res.write(feed.rss2());
  res.end();

  return { props: {} };
};

const FeedPage: FC = () => (
  <></>
);

export default FeedPage;
export { getServerSideProps };
