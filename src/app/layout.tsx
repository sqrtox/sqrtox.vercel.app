import Header from "@/components/header";
import ThemeProvider from "@/components/theme-provider";
import type { ReactNode } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Footer from "@/components/footer";

import "@/styles/global.scss";

const nyashiFriends = localFont({
  src: "../fonts/nyashi_friends.woff2"
});

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
      <body className={`${nyashiFriends.className} ${notoSansJp.className}`}>
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
