const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export const formatMonth = (value: string): string => {
  if (!MONTH_PATTERN.test(value)) {
    return '';
  }

  const [year, month] = value.split('-').map(Number);
  return `${MONTH_NAMES[month - 1]} ${year}`;
};
