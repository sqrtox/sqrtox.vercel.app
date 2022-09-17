import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntries from '~/components/blog/BlogEntries';
import Link from '~/components/common/Link';
import Seo from '~/components/common/Seo';
import SpacingLayout from '~/components/spacing/SpacingLayout';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';
import { generateRss } from '~/util/blog/generateRss';

const SITE_SHORT_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;

type HomeProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const blogEntries = await fetchBlogEntries();

  await generateRss(blogEntries);

  return ({
    props: {
      blogEntries: (
        blogEntries
          .slice()
          .sort((a, b) => b.publishedTimestamp - a.publishedTimestamp)
          .slice(0, 2)
      )
    }
  });
};

const Home: FC<HomeProps> = ({ blogEntries }) => (
  <>
    <Seo />
    <SpacingLayout>
      <Typography component='h1' fontSize='2rem' marginY='1rem'>{SITE_SHORT_DESCRIPTION}</Typography>
      <Typography>{SITE_DESCRIPTION}</Typography>
      <Stack marginTop='2rem' spacing={1}>
        <Stack component='section' spacing={1}>
          <Typography component='h1' variant='h5'>新着記事</Typography>
          <BlogEntries blogEntries={blogEntries} />
          <Link href='/blog/'>
            すべての記事をみる
            <KeyboardArrowRightIcon sx={{ verticalAlign: 'bottom' }} />
          </Link>
        </Stack>
      </Stack>
    </SpacingLayout>
  </>
);

export default Home;
export {
  type HomeProps,
  getStaticProps
};
