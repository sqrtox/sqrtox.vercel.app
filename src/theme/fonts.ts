import { M_PLUS_1_Code as PrimaryFont } from "next/font/google";

export const primaryFont = PrimaryFont({
  weight: ["400", "500"],
  display: "swap",
  subsets: ["latin"],
  variable: "--primaryFont",
});
