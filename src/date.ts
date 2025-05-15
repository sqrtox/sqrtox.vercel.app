import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

export const formatDate = (
  date_: number | TZDate | Date,
  displaySec = false,
): string => {
  const timestamp = typeof date_ === "number" ? date_ : date_.getTime();
  const date = new TZDate(timestamp, "Asia/Tokyo");

  return format(date, `yyyy年M月d日 HH時mm分${displaySec ? "ss秒" : ""}`, {
    locale: ja,
  });
};
