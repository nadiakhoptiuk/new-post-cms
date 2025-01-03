import dayjs from "dayjs";

export const formatDateWithTime = (date: Date | null | undefined) => {
  return date !== null ? dayjs(date).format("YYYY-MM-DD  HH:mm") : null;
};
