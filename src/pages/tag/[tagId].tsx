import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntries from '~/components/BlogEntries';
import Seo from '~/components/Seo';
import { type BlogEntry, fetchBlogEntries } from '~/util/blog/entry';
import { type BlogEntryTag, type BlogEntryTagId, getBlogEntryTagById, getTags } from '~/util/blog/tag';
import { type Params } from '~/util/util';

type BlogEntryTagHomeParams = Params<{
  tagId: BlogEntryTagId
}>;

const getStaticPaths: GetStaticPaths<BlogEntryTagHomeParams> = async () => ({
  fallback: false,
  paths: await getTags().then(tags => tags.map(({ id }) => ({
    params: { tagId: id }
  })))
});

type BlogEntryTagHomeProps = Readonly<{
  tag: BlogEntryTag,
  blogEntries: readonly BlogEntry[]
}>;

const getStaticProps: GetStaticProps<BlogEntryTagHomeProps, BlogEntryTagHomeParams> = async ({ params: { tagId } = {} }) => {
  if (typeof tagId === 'undefined') {
    throw new TypeError('Tag id is empty');
  }

  const tag = getBlogEntryTagById(tagId);

  return {
    props: {
      tag,
      blogEntries: await fetchBlogEntries().then(blogEntires => blogEntires.filter(({ tags }) => (
        tags.some(({ id }) => id === tag.id)
      )))
    }
  };
};

const BlogEntryTagHome: FC<BlogEntryTagHomeProps> = ({ tag, blogEntries }) => (
  <>
    <Seo
      title={`${tag.displayName}の記事一覧`}
      description={`${tag.displayName}の記事一覧です。`}
    />
    <Stack spacing={3} marginY='2rem'>
      <Typography component='h1' variant='h5'>{tag.displayName}の記事一覧</Typography>
      <Divider />
      <BlogEntries blogEntries={blogEntries} />
    </Stack>
  </>
);

export default BlogEntryTagHome;
export {
  type BlogEntryTagHomeParams,
  type BlogEntryTagHomeProps,
  getStaticPaths,
  getStaticProps
};
