import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticProps } from 'next';
import { type FC } from 'react';
import Seo from '~/components/Seo';
import BlogEntries from '~/components/blog/BlogEntries';
import SpacingLayout from '~/layouts/spacing';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';

type BlogEntryHomeProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<BlogEntryHomeProps> = async () => ({
  props: {
    blogEntries: await fetchBlogEntries()
  }
});

const BlogEntryHome: FC<BlogEntryHomeProps> = ({ blogEntries }) => (
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

export default BlogEntryHome;
export {
  type BlogEntryHomeProps,
  getStaticProps
};
