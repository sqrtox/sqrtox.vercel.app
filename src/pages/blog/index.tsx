import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntries from '~/components/blog/BlogEntries';
import Seo from '~/components/common/Seo';
import SpacingLayout from '~/components/spacing/SpacingLayout';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';

type BlogEntryHomePageProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<BlogEntryHomePageProps> = async () => ({
  props: {
    blogEntries: await fetchBlogEntries()
  }
});

const BlogEntryHomePage: FC<BlogEntryHomePageProps> = ({ blogEntries }) => (
  <>
    <Seo
      title='ブログ記事一覧'
      description='ブログ記事一覧です。'
    />
    <SpacingLayout>
      <Stack spacing={3} marginY='2rem'>
        <Typography component='h1' variant='h5'>ブログ記事一覧</Typography>
        <Divider />
        <BlogEntries blogEntries={blogEntries} />
      </Stack>
    </SpacingLayout>
  </>
);

export default BlogEntryHomePage;
export {
  type BlogEntryHomePageProps,
  getStaticProps
};
