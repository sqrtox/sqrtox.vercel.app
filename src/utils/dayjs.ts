import { extend } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

extend(utc);
extend(timezone);

export { default } from "dayjs";
