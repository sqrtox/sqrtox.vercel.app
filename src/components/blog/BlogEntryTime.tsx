import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReplayIcon from '@mui/icons-material/Replay';
import Stack from '@mui/material/Stack';
import { type FC } from 'react';
import Time from '~/components/common/Time';

type BlogEntryTimeProps = Readonly<{
  publishedTimestamp: number,
  modifiedTimestamp?: number
}>;

const BlogEntryTime: FC<BlogEntryTimeProps> = ({ publishedTimestamp, modifiedTimestamp }) => (
  <Stack direction='row' spacing={2}>
    <Time Icon={AccessTimeIcon} timestamp={publishedTimestamp} />
    {typeof modifiedTimestamp === 'undefined' ? undefined : <Time Icon={ReplayIcon} timestamp={modifiedTimestamp} />}
  </Stack>
);

export default BlogEntryTime;
export { type BlogEntryTimeProps };
