export const getCurrentMonth = (now: Date = new Date()): string =>
  now.toISOString().slice(0, 7);

export const toMonthIndex = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + month - 1;
};

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

const UNITS = {
  short: ['yr', 'mo'],
  long: ['year', 'month'],
} as const;

export type MonthCountStyle = keyof typeof UNITS;

export const formatMonthCount = (
  months: number,
  style: MonthCountStyle = 'short',
): string => {
  const [year, month] = UNITS[style];
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [
    years > 0 ? plural(years, year) : '',
    rest > 0 || years === 0 ? plural(Math.max(rest, 1), month) : '',
  ];

  return parts.filter(Boolean).join(' ');
};

export const getDuration = (
  startDate: string,
  endDate: string | null,
  now: Date = new Date(),
): string => {
  const end = toMonthIndex(endDate ?? getCurrentMonth(now));

  return formatMonthCount(end - toMonthIndex(startDate) + 1);
};
