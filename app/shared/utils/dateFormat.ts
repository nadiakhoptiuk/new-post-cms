import dayjs from "dayjs";

export const formatDateWithTime = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD  HH:mm");
};
