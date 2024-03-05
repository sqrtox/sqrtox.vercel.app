import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";

export type LogoPartProps = {
  children: ReactNode,
  accent?: boolean
};

export function LogoPart({ children, accent = false }: LogoPartProps) {
  return (
    <Typography
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
