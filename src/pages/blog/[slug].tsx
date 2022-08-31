import { type ParsedUrlQuery } from 'node:querystring';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { type FC } from 'react';
import BlogEntryTagChips from '~/components/BlogEntryTagChips';
import BlogEntryTime from '~/components/BlogEntryTime';
import Seo from '~/components/Seo';
import { type BlogEntry, assertIsBlogEntrySlug, fetchBlogEntryBySlug, getBlogEntrySlugs } from '~/util/blog/entry';

type BlogEntryPageParams = ParsedUrlQuery & Readonly<{
  slug: string
}>;

const getStaticPaths: GetStaticPaths<BlogEntryPageParams> = async () => ({
  fallback: false,
  paths: await getBlogEntrySlugs().then(slugs => (
    slugs.map(slug => ({
      params: { slug }
    }))
  ))
});

type BlogEntryPageProps = Readonly<{
  blogEntry: BlogEntry
}>;

const getStaticProps: GetStaticProps<BlogEntryPageProps, BlogEntryPageParams> = async ({ params: { slug } = {} }) => {
  if (!slug) {
    throw new TypeError('Slug is empty');
  }

  assertIsBlogEntrySlug(slug);

  const blogEntry = await fetchBlogEntryBySlug(slug);

  return {
    props: { blogEntry }
  };
};

const BlogEntryPage: FC<BlogEntryPageProps> = ({
  blogEntry: {
    title,
    description,
    publishedTimestamp,
    modifiedTimestamp,
    tags,
    html
  }
}) => (
  <>
    <Seo
      title={title}
      description={description}
    />
    <Stack spacing={3} marginY='2rem'>
      <Typography component='h1' variant='h5'>{title}</Typography>
      <BlogEntryTime publishedTimestamp={publishedTimestamp} modifiedTimestamp={modifiedTimestamp} />
      <BlogEntryTagChips tags={tags} />
      <Divider />
      <Box
        className='BlogEntryContent'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Stack>
  </>
);

export default BlogEntryPage;
export {
  type BlogEntryPageParams,
  type BlogEntryPageProps,
  getStaticPaths,
  getStaticProps
};