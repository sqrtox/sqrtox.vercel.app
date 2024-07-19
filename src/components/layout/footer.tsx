import pkg from "@/../package.json" with { type: "json" };
import { logoFont } from "@/utils/font";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import type { ReactNode } from "react";

export default function Footer(): ReactNode {
  return (
    <Stack
      height="5rem"
      direction="row"
      justifyContent="center"
      padding="2rem"
      spacing={1}
      alignItems="center"
    >
      <Typography color="text.secondary">
        <span>&#169; 2022 </span>
        <Typography
          component="span"
          className={logoFont.className}
          sx={logoFont.style}
        >
          {pkg.author}
        </Typography>
        <span>, All Rights Reserved.</span>
      </Typography>
      <MuiLink component={NextLink} href="/article/acknowledgements">
        <span>謝辞</span>
      </MuiLink>
    </Stack>
  );
}
