import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { type FC } from 'react';

const Loading: FC = () => (
  <>
    <CssBaseline />
    <Stack
      alignItems='flex-start'
      spacing={1}
    >
      <LinearProgress sx={{ width: '100%' }} />
    </Stack>
  </>
);

export default Loading;
