import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const ADDIS_ABABA_TIMEZONE = "Africa/Addis_Ababa";
export const LOCAL_DATE_FORMAT = "YYYY-MM-DD";

export function formatDate(
    date?: Date | string,
    format: string = "ddd, MMM DD YYYY (h:mm A)",
    timezoneName: string = ADDIS_ABABA_TIMEZONE,
) {
    if (!date) {
        return "";
    }

    return dayjs.utc(date).tz(timezoneName).format(format);
}