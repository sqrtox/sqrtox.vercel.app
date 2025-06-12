import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatDate } from "#src/date";
import type { ArticleHistory } from "./history";

export interface ArticleHistoryListProps {
  history: ArticleHistory;
}

export default function ArticleHistoryList({
  history,
}: ArticleHistoryListProps) {
  return (
    <>
      {history.length > 0 && (
        <Stack alignItems="flex-start" spacing={1}>
          {history.map((log) => {
            const date = new Date(log.timestamp);

            return (
              <Stack
                key={log.commit}
                direction="row"
                rowGap={0.5}
                columnGap={1}
                flexWrap="wrap"
              >
                <MuiLink
                  rel="noreferrer noopener"
                  target="_blank"
                  href={`https://github.com/sqrtox/sqrtox.vercel.app/commit/${log.commit}#diff-${log.filePathHash}`}
                >
                  {log.commit.slice(0, 7)} - {log.message}
                </MuiLink>
                <Typography
                  component="time"
                  dateTime={date.toISOString()}
                  color="textSecondary"
                >
                  {formatDate(date, true)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
      {history.length < 1 && <Typography>履歴が存在しません</Typography>}
    </>
  );
}
