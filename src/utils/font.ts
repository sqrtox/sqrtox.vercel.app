import { Zen_Kaku_Gothic_New } from "next/font/google";
import localFont from "next/font/local";

export const primaryFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const logoFont = localFont({
  src: "../fonts/nyashi_friends.woff2",
});

/**
 * This Font Software is licensed under the SIL Open Font License, Version 1.1.
 * @see {@link https://github.com/0xType/0xProto}
 */
export const codeFont = localFont({
  src: "../fonts/0xProto-Regular.woff2",
});
