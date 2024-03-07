import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import localFont from "next/font/local";

const nyashiFriends = localFont({
  src: "../../fonts/nyashi_friends.woff2"
});

export type LogoPartProps = {
  children: ReactNode,
  accent?: boolean
};

export function LogoPart({ children, accent = false }: LogoPartProps) {
  return (
    <Typography
      className={nyashiFriends.className}
      fontFamily="にゃしぃフレンズ"
      fontWeight="bold"
      color={accent ? "primary.main" : "text.secondary"}
      variant="h4"
      component="span"
    >
      {children}
    </Typography>
  );
}
