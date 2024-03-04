import Stack from "@mui/material/Stack";
import Copyright from "@/components/copyright";

export default function Footer() {
  return (
    <Stack
      height="5rem"
      alignItems="center"
      justifyContent="center"
      component="footer"
    >
      <Copyright />
    </Stack>
  );
}
