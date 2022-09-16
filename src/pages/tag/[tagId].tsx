import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntries from '~/components/blog/BlogEntries';
import Seo from '~/components/common/Seo';
import SpacingLayout from '~/components/spacing/SpacingLayout';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';
import { type BlogEntryTag, type BlogEntryTagId, getBlogEntryTagById, getTags } from '~/util/blog/tag';
import { type Params } from '~/util/types/Params';

type BlogEntryTagHomePageParams = Params<{
  tagId: BlogEntryTagId
}>;

const getStaticPaths: GetStaticPaths<BlogEntryTagHomePageParams> = async () => ({
  fallback: false,
  paths: await getTags().then(tags => tags.map(({ id }) => ({
    params: { tagId: id }
  })))
});

type BlogEntryTagHomePageProps = Readonly<{
  blogEntries: readonly BlogEntry[],
  tag: BlogEntryTag
}>;

const getStaticProps: GetStaticProps<BlogEntryTagHomePageProps, BlogEntryTagHomePageParams> = async ({ params: { tagId } = {} }) => {
  if (typeof tagId === 'undefined') {
    throw new TypeError('Tag id is empty');
  }

  const tag = getBlogEntryTagById(tagId);

  return {
    props: {
      blogEntries: await fetchBlogEntries().then(blogEntires => blogEntires.filter(({ tags }) => (
        tags.some(({ id }) => id === tag.id)
      ))),
      tag
    }
  };
};

const BlogEntryTagHomePage: FC<BlogEntryTagHomePageProps> = ({ tag, blogEntries }) => (
  <>
    <Seo
      title={`${tag.displayName}の記事一覧`}
      description={`${tag.displayName}の記事一覧です。`}
    />
    <SpacingLayout>
      <Stack spacing={3} marginY='2rem'>
        <Typography component='h1' variant='h5'>{tag.displayName}の記事一覧</Typography>
        <Divider />
        <BlogEntries blogEntries={blogEntries} />
      </Stack>
    </SpacingLayout>
  </>
);

export default BlogEntryTagHomePage;
export {
  type BlogEntryTagHomePageParams,
  type BlogEntryTagHomePageProps,
  getStaticPaths,
  getStaticProps
};
