import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import styles from "#src/layouts/common/logo.module.scss";

export default function Logo() {
  return (
    <Typography
      component={NextLink}
      href="/"
      variant="h4"
      color="textPrimary"
      className={styles.link}
    >
      <span>sqrtox</span>
      <Box component="span" color="primary.main">
        '
      </Box>
      <span>s Blog</span>
    </Typography>
  );
}
