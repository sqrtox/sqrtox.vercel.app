import "@/styles/global.scss";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ThemeProvider from "@/components/theme/theme-provider";
import { primaryFont } from "@/utils/font";

import type { Viewport } from "next";
import type { ReactNode } from "react";

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
      <head>
        <meta name="google-site-verification" content="E2oyyB5do9EZ1zMN60Y7PxkFLzNeOx8d7iad872R4W0" />
      </head>
      <body className={primaryFont.className}>
        <AppRouterCacheProvider>
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
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
