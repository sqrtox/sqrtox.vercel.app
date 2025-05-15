import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Chip from "@mui/material/Chip";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Stack alignItems="center" justifyContent="center" padding={3}>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Typography color="textSecondary">
          © 2022 sqrtox, All Rights Reserved.
        </Typography>
        <MuiLink component={NextLink} href="/acknowledgments">
          acknowledgments
        </MuiLink>
        <Chip
          icon={<GitHubIcon />}
          label={
            <Stack direction="row" alignItems="center">
              リポジトリ
              <OpenInNewIcon fontSize="inherit" />
            </Stack>
          }
          clickable
          component="a"
          // TODO: relは本当に正しい？綴りはあってる？
          rel="noreferrer noopener"
          target="_blank"
          // TODO: あとでリポジトリのリンク変えるかも
          href="https://github.com/sqrtox/sqrtox.vercel.app"
        />
      </Stack>
    </Stack>
  );
}
