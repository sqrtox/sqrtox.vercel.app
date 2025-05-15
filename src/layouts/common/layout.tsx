import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import type { PropsWithChildren } from "react";
import Footer from "#src/layouts/common/footer";
import Header from "#src/layouts/common/header";

export default function CommonLayout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Stack minHeight="100svh">
        <Header />
        <Box
          component="main"
          flex={1}
          display="flex"
          alignItems="stretch"
          paddingY={5}
        >
          {children}
        </Box>
        <Footer />
      </Stack>
    </Container>
  );
}
