import { Zen_Kaku_Gothic_New } from "next/font/google";
import localFont from "next/font/local";

export const primaryFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const logoFont = localFont({
  src: "../fonts/nyashi_friends.woff2",
});

export const codeFont = localFont({
  src: "../fonts/0xProto-Regular.woff2",
});
