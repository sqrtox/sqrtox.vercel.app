import { type GetServerSideProps } from 'next';
import { type FC } from 'react';
import { generateRss } from '~/util/blog/generateRss';

const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = await generateRss();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml');
  res.write(feed.atom1());
  res.end();

  return { props: {} };
};

const FeedAtomPage: FC = () => (
  <></>
);

export default FeedAtomPage;
export { getServerSideProps };
