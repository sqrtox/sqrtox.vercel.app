import type { PropsWithChildren } from "react";
import styles from "#src/app/layout.module.scss";
import CommonLayout from "#src/layouts/common/layout";
import { primaryFont } from "#src/theme/fonts";
import ThemeProvider from "#src/theme/provider";

const dev = process.env.NODE_ENV === "development";

export const metadata = {
  metadataBase: new URL(dev ? "http://localhost:3000" : "https://sqrtox.com"),
  title: {
    template: "%s | sqrtox's Blog",
    absolute: "sqrtox's Blog - 備忘録的な技術ブログ",
  },
  description: "主に技術についての備忘録的なブログです。",
  openGraph: {
    siteName: "sqrtox's Blog",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning className={styles.root}>
      <head>
        <meta name="apple-mobile-web-app-title" content="sqrtox's Blog" />
      </head>
      <body className={primaryFont.variable} suppressHydrationWarning>
        <ThemeProvider>
          <CommonLayout>{children}</CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
