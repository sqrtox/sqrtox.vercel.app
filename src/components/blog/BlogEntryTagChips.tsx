import TagIcon from '@mui/icons-material/Tag';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import NextLink from 'next/link';
import { type FC } from 'react';
import { type BlogEntryTag } from '~/util/blog/tag';

type BlogEntryTagChipsProps = Readonly<{
  tags: readonly BlogEntryTag[]
}>;

const BlogEntryTagChips: FC<BlogEntryTagChipsProps> = ({ tags }) => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}
  >
    {tags.map(({ displayName, id }) => (
      <NextLink href={`/tag/${id}/`} key={id}>
        <Tooltip title={`${displayName}の記事一覧へ`} enterDelay={300}>
          <Chip
            size='small'
            icon={<TagIcon fontSize='small' />}
            label={displayName}
          />
        </Tooltip>
      </NextLink>
    ))}
  </Box>
);

export default BlogEntryTagChips;
export { type BlogEntryTagChipsProps };
