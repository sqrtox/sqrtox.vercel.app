import { type ParsedUrlQuery } from 'node:querystring';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { type FC } from 'react';
import KatexStyleSheetLoader from '~/components/KatexStyleSheetLoader';
import Seo from '~/components/Seo';
import BlogEntryTagChips from '~/components/blog/BlogEntryTagChips';
import BlogEntryTime from '~/components/blog/BlogEntryTime';
import SpacingLayout from '~/layouts/spacing';
import style from '~/pages/blog/[slug].module.scss';
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
    <KatexStyleSheetLoader />
    <SpacingLayout>
      <Stack spacing={3} marginY='2rem'>
        <Typography component='h1' variant='h5'>{title}</Typography>
        <BlogEntryTime publishedTimestamp={publishedTimestamp} modifiedTimestamp={modifiedTimestamp} />
        <BlogEntryTagChips tags={tags} />
        <Divider />
        <Box
          className={style.blogEntryContent}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Stack>
    </SpacingLayout>
  </>
);

export default BlogEntryPage;
export {
  type BlogEntryPageParams,
  type BlogEntryPageProps,
  getStaticPaths,
  getStaticProps
};
