import { formatMonthCount, getCurrentMonth, getDuration } from '../../helpers';

const now = new Date('2026-10-15T12:00:00Z');

it('reads the current month in UTC, like the API', () => {
  expect(getCurrentMonth(new Date('2026-01-31T23:30:00Z'))).toBe('2026-01');
});

it('writes a number of months in short words', () => {
  expect(formatMonthCount(1)).toBe('1 mo');
  expect(formatMonthCount(10)).toBe('10 mos');
  expect(formatMonthCount(12)).toBe('1 yr');
  expect(formatMonthCount(20)).toBe('1 yr 8 mos');
  expect(formatMonthCount(25)).toBe('2 yrs 1 mo');
  expect(formatMonthCount(0)).toBe('1 mo');
});

it('writes a number of months in long words', () => {
  expect(formatMonthCount(63, 'long')).toBe('5 years 3 months');
  expect(formatMonthCount(60, 'long')).toBe('5 years');
  expect(formatMonthCount(13, 'long')).toBe('1 year 1 month');
  expect(formatMonthCount(12, 'long')).toBe('1 year');
  expect(formatMonthCount(4, 'long')).toBe('4 months');
  expect(formatMonthCount(1, 'long')).toBe('1 month');
  expect(formatMonthCount(0, 'long')).toBe('1 month');
});

it('uses the short words by default', () => {
  expect(formatMonthCount(63)).toBe(formatMonthCount(63, 'short'));
});

it('counts both the first and the last month, like LinkedIn', () => {
  expect(getDuration('2024-03', '2025-02', now)).toBe('1 yr');
  expect(getDuration('2021-08', '2022-05', now)).toBe('10 mos');
  expect(getDuration('2025-06', '2025-06', now)).toBe('1 mo');
});

it('counts a current job up to this month', () => {
  expect(getDuration('2025-03', null, now)).toBe('1 yr 8 mos');
});
