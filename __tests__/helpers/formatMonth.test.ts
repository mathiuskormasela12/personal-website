import { MONTH_PATTERN, formatMonth } from '../../helpers';

it('turns YYYY-MM into a short month and year', () => {
  expect(formatMonth('2025-03')).toBe('Mar 2025');
  expect(formatMonth('2021-12')).toBe('Dec 2021');
  expect(formatMonth('2026-01')).toBe('Jan 2026');
});

it('returns an empty text for anything that is not a month', () => {
  ['', '2025-13', '2025-3', 'March 2025', '2025-00'].forEach((value) =>
    expect(formatMonth(value)).toBe(''),
  );
});

it('accepts only YYYY-MM with a real month', () => {
  expect(MONTH_PATTERN.test('2025-09')).toBe(true);
  expect(MONTH_PATTERN.test('2025-9')).toBe(false);
  expect(MONTH_PATTERN.test('2025-13')).toBe(false);
});
