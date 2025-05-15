import Stack from "@mui/material/Stack";
import type { PropsWithChildren, ReactNode } from "react";

export type ThemeSwitchThumbProps = PropsWithChildren<{
  bgcolor: string;
}>;

export default function ThemeSwitchThumb({
  children,
  bgcolor,
}: ThemeSwitchThumbProps): ReactNode {
  return (
    <Stack
      width={25}
      height={25}
      bgcolor={bgcolor}
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Stack>
  );
}
