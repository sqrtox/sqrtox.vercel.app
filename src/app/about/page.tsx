import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Bird from "#src/app/about/bird";
import Landscape from "#src/app/about/landscape";
import styles from "#src/app/about/page.module.scss";
import avatar from "./avatar.png";

export const metadata = {
  title: "About",
  description: "このサイトと私について。",
  openGraph: {
    type: "article",
    url: "/about",
  },
};

export default function About() {
  return (
    <Stack alignItems="flex-start" spacing={3}>
      <Typography variant="h5" component="h1">
        About
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card variant="outlined" className={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                このサイトについて
              </Typography>
              <Typography>
                覚えた技術を書いたり書かなかったりするブログ
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Landscape />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card className={styles.card}>
            <CardContent>
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                <Box>
                  <Box
                    component="img"
                    alt="avatar"
                    src={avatar.src}
                    width={100}
                    height={100}
                    loading="lazy"
                    className={styles.avatar}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" component="h2">
                    sqrtox
                  </Typography>
                  <Typography>趣味でコード書いてる人です</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" className={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                趣味
              </Typography>
              <Typography className={styles.wbrContainer}>
                <Typography component="span" whiteSpace="nowrap">
                  👨‍💻コーディング、
                </Typography>
                <wbr />
                <Typography component="span" whiteSpace="nowrap">
                  🎮️ゲーム、
                </Typography>
                <wbr />
                <Typography component="span" whiteSpace="nowrap">
                  📚️読書、
                </Typography>
                <wbr />
                <Typography component="span" whiteSpace="nowrap">
                  📹️動画編集、
                </Typography>
                <wbr />
                <Typography component="span" whiteSpace="nowrap">
                  🌐ネットサーフィンなど
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" className={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                好きなフレームワーク
              </Typography>
              <Typography>
                言語はJavaScript/TypeScript、Rustをよく使っています。フロントエンドのフレームワークはNext.js(React)が好きです
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card variant="outlined" className={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                SNS
              </Typography>
              <Box paddingLeft="2rem">
                <List className={styles.list}>
                  <ListItem className={styles.listItem}>
                    <Stack direction="row" flexWrap="wrap">
                      GitHub：
                      <MuiLink
                        href="https://github.com/sqrtox"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Stack
                          whiteSpace="nowrap"
                          direction="row"
                          component="span"
                          alignItems="center"
                        >
                          https://github.com/sqrtox
                          <OpenInNewIcon fontSize="inherit" />
                        </Stack>
                      </MuiLink>
                    </Stack>
                  </ListItem>
                  <ListItem className={styles.listItem}>
                    <Stack direction="row" flexWrap="wrap">
                      Qiita：
                      <MuiLink
                        href="https://qiita.com/sqrtox"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Stack
                          whiteSpace="nowrap"
                          direction="row"
                          component="span"
                          alignItems="center"
                        >
                          https://qiita.com/sqrtox
                          <OpenInNewIcon fontSize="inherit" />
                        </Stack>
                      </MuiLink>
                    </Stack>
                  </ListItem>
                  <ListItem className={styles.listItem}>
                    <Stack direction="row" flexWrap="wrap">
                      X（Twitter）：
                      <MuiLink
                        href="https://x.com/sqrtox"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Stack
                          whiteSpace="nowrap"
                          direction="row"
                          component="span"
                          alignItems="center"
                        >
                          https://x.com/sqrtox
                          <OpenInNewIcon fontSize="inherit" />
                        </Stack>
                      </MuiLink>
                    </Stack>
                    <Typography>今のところXは全く動かしていません</Typography>
                  </ListItem>
                </List>
                <Bird />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
