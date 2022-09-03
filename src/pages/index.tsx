import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntries from '~/components/BlogEntries';
import Link from '~/components/Link';
import Seo from '~/components/Seo';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';

const SITE_SHORT_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;

type HomeProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    blogEntries: await fetchBlogEntries().then(blogEntries => (
      blogEntries
        .slice()
        .sort((a, b) => b.publishedTimestamp - a.publishedTimestamp)
        .slice(0, 2)
    ))
  }
});

const Home: FC<HomeProps> = ({ blogEntries }) => (
  <>
    <Seo />
    <Typography component='h1' variant='h4' marginY='1rem'>{SITE_SHORT_DESCRIPTION}</Typography>
    <Typography>{SITE_DESCRIPTION}</Typography>
    <Stack marginTop='2rem' spacing={1}>
      <Stack component='section' spacing={1}>
        <Typography component='h1' variant='h5'>新着記事</Typography>
        <BlogEntries blogEntries={blogEntries} />
        <Link href='/blog/'>すべての記事をみる→</Link>
      </Stack>
    </Stack>
  </>
);

export default Home;
export {
  type HomeProps,
  getStaticProps
};
