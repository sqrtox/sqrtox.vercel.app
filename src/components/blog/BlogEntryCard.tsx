import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { type FC } from 'react';
import BlogEntryTagChips from '~/components/blog/BlogEntryTagChips';
import BlogEntryTime from '~/components/blog/BlogEntryTime';
import { type BlogEntry } from '~/util/blog/entry';

type BlogEntryCardProps = Readonly<{
  blogEntry: BlogEntry
}>;

const BlogEntryCard: FC<BlogEntryCardProps> = ({
  blogEntry: {
    slug,
    title,
    tags,
    publishedTimestamp,
    modifiedTimestamp
  }
}) => (
  <article>
    <Card sx={{ height: '100%' }}>
      <CardActionArea sx={{ height: '100%' }}>
        <NextLink href={`/blog/${slug}/`} passHref>
          <MuiLink color='text.primary' sx={{ textDecoration: 'none' }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <BlogEntryTime
                publishedTimestamp={publishedTimestamp}
                modifiedTimestamp={modifiedTimestamp}
              />
              <Stack
                flex={1}
                marginY='0.5rem'
                marginX='0 1rem'
                spacing={1}
              >
                <Typography variant='h6' component='h1'>{title}</Typography>
              </Stack>
              <BlogEntryTagChips tags={tags} />
            </CardContent>
          </MuiLink>
        </NextLink>
      </CardActionArea>
    </Card>
  </article>
);

export default BlogEntryCard;
export { type BlogEntryCardProps };
