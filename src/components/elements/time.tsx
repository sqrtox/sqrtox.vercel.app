import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import dayjs from "@/utils/dayjs";

export type TimeProps = {
  icon: JSX.Element,
  timestamp: number,
  label?: string,
  timezone?: string
};

export default function Time({
  icon,
  timestamp,
  label,
  timezone = "Asia/Tokyo"
}: TimeProps) {
  const time = dayjs.tz(timestamp, timezone);

  return (
    <Typography
      color="text.secondary"
      whiteSpace="nowrap"
      sx={{
        gap: 1,
        display: "flex",
        alignItems: "center"
      }}
    >
      <Stack
        component="span"
        direction="row"
        alignItems="center"
      >
        {icon}
        {label}
      </Stack>
      <time dateTime={time.toISOString()}>
        {time.format("YYYY/MM/DD HH:mm:ss")}
      </time>
    </Typography>
  );
}
