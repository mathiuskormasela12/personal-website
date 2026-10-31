import { getExperienceTotal } from '../../helpers';
import { IExperience } from '../../interfaces';

const now = new Date('2026-10-15T12:00:00Z');

const role = (
  company: string,
  startDate: string,
  endDate: string | null,
): IExperience => ({
  id: Math.random(),
  company,
  role: 'Developer',
  startDate,
  endDate,
  description: ['Did things.'],
});

it('adds up jobs that follow each other without a break', () => {
  expect(
    getExperienceTotal(
      [
        role('Nimbus Labs', '2025-03', null),
        role('Nimbus Labs', '2024-03', '2025-02'),
        role('Kopi Digital', '2022-06', '2024-02'),
        role('Bright Studio', '2021-08', '2022-05'),
      ],
      now,
    ),
  ).toEqual({ months: 63, companies: 3 });
});

it('counts the months of overlapping jobs only once', () => {
  expect(
    getExperienceTotal(
      [
        role('Day Job', '2024-01', '2024-12'),
        role('Side Gig', '2024-07', '2025-06'),
      ],
      now,
    ),
  ).toEqual({ months: 18, companies: 2 });
});

it('does not count the break between two jobs', () => {
  expect(
    getExperienceTotal(
      [role('A', '2023-01', '2023-06'), role('B', '2024-01', '2024-03')],
      now,
    ).months,
  ).toBe(9);
});

it('counts a current job up to this month', () => {
  expect(getExperienceTotal([role('A', '2026-01', null)], now).months).toBe(10);
});

it('counts a job that starts and ends in the same month as 1 month', () => {
  expect(getExperienceTotal([role('A', '2025-06', '2025-06')], now)).toEqual({
    months: 1,
    companies: 1,
  });
});

it('counts the same company only once, even with a break', () => {
  expect(
    getExperienceTotal(
      [
        role('Nimbus Labs', '2025-01', null),
        role('Kopi Digital', '2023-01', '2024-12'),
        role('Nimbus Labs', '2021-01', '2022-12'),
      ],
      now,
    ).companies,
  ).toBe(2);
});

it('returns zero for an empty list', () => {
  expect(getExperienceTotal([], now)).toEqual({ months: 0, companies: 0 });
});

it('uses the real current month when no date is given', () => {
  jest.useFakeTimers({ now: new Date('2026-03-10T00:00:00Z') });
  expect(getExperienceTotal([role('A', '2026-01', null)]).months).toBe(3);
  jest.useRealTimers();
});
