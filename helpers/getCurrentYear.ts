// ========== Get Current Year
import dayjs from 'dayjs';

// `now` is an epoch timestamp in milliseconds (defaults to Date.now()).
export const getCurrentYear = (now: number = Date.now()): string =>
  dayjs(now).format('YYYY');
