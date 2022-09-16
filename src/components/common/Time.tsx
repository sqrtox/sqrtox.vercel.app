import { type SvgIconComponent } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs, { extend } from 'dayjs';
import dayjsPluginTimezone from 'dayjs/plugin/timezone';
import dayjsPluginUtc from 'dayjs/plugin/utc';
import { type FC } from 'react';

extend(dayjsPluginUtc);
extend(dayjsPluginTimezone);

type TimeProps = Readonly<{
  timestamp: number,
  Icon: SvgIconComponent
}>;

const Time: FC<TimeProps> = ({ Icon, timestamp }) => {
  const time = dayjs.tz(timestamp, 'Asia/Tokyo').subtract(9, 'hour');

  return (
    <Typography component='div' color='text.secondary' variant='body2'>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Icon fontSize='small' />
        <time dateTime={time.toISOString()}>
          {time.format('YYYY/MM/DD HH:mm:ss')}
        </time>
      </Stack>
    </Typography>
  );
};

export default Time;
export { type TimeProps };
