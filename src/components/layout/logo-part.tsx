import { logoFont } from "@/utils/font";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type LogoPartProps = {
  children: ReactNode;
  accent?: boolean;
};

export function LogoPart({ children, accent = false }: LogoPartProps) {
  return (
    <Typography
      className={logoFont.className}
      {...logoFont.style}
      color={accent ? "primary.main" : "text.secondary"}
      variant="h5"
      component="span"
    >
      {children}
    </Typography>
  );
}
