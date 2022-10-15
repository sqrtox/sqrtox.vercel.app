import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticProps } from 'next';
import NextLink from 'next/link';
import { type FC } from 'react';
import Seo from '~/components/Seo';
import BlogEntries from '~/components/blog/BlogEntries';
import SpacingLayout from '~/layouts/spacing';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';

const SITE_SHORT_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_SHORT_DESCRIPTION;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;

type HomeProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const blogEntries = await fetchBlogEntries();

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
          <NextLink href='/blog/' passHref>
            <MuiLink underline='hover'>
              すべての記事をみる
              <KeyboardArrowRightIcon sx={{ verticalAlign: 'bottom' }} />
            </MuiLink>
          </NextLink>
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
