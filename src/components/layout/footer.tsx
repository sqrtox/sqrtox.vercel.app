import Stack from "@mui/material/Stack";
import Copyright from "@/components/layout/copyright";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Stack
      height="5rem"
      alignItems="center"
      justifyContent="center"
      component="footer"
      direction="row"
      spacing={1}
    >
      <Copyright />
      <MuiLink
        href="/article/acknowledgements"
        component={NextLink}
      >
        謝辞
      </MuiLink>
    </Stack>
  );
}
