import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import BlogEntryCard from '~/components/blog/BlogEntryCard';
import { type BlogEntry } from '~/util/blog/entry';

type BlogEntriesProps = Readonly<{
  blogEntries: readonly BlogEntry[]
}>;

const BlogEntries: FC<BlogEntriesProps> = ({ blogEntries }) => (
  <Stack
    sx={theme => ({
      display: 'grid',
      gridGap: '1rem',
      gridTemplateColumns: '1fr 1fr',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr'
      }
    })}
  >
    {blogEntries.map(blogEntry => (
      <BlogEntryCard key={blogEntry.slug} blogEntry={blogEntry} />
    ))}
  </Stack>
);

export default BlogEntries;
export { type BlogEntriesProps };
