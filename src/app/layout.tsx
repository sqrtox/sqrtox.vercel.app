import Header from "@/components/layout/header";
import ThemeProvider from "@/components/theme/theme-provider";
import type { ReactNode } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Noto_Sans_JP } from "next/font/google";
import type { Viewport } from "next";
import Footer from "@/components/layout/footer";

import "@/styles/global.scss";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});

export const viewport: Viewport = {
  themeColor: "#f381a7"
};

export { generateDefaultMetadata as generateMetadata } from "@/utils/metadata";

export type LayoutProps = {
  children: ReactNode
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <head />
      <body className={notoSansJp.className}>
        <ThemeProvider>
          <Stack minHeight="100svh">
            <Header />
            <Container
              sx={{
                paddingY: "1rem",
                display: "flex",
                flexDirection: "column",
                flex: 1
              }}
            >
              {children}
            </Container>
            <Footer />
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  );
}
