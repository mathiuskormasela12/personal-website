import { sortExperiences } from '../../helpers';
import { IExperience } from '../../interfaces';

const item = (id: number, startDate: string, endDate: string | null) =>
  ({
    id,
    company: 'C',
    role: 'R',
    startDate,
    endDate,
    description: ['D'],
  }) as IExperience;

it('puts current jobs first, then the newest start date', () => {
  const sorted = sortExperiences([
    item(1, '2021-08', '2022-05'),
    item(2, '2024-03', '2025-02'),
    item(3, '2023-01', null),
    item(4, '2025-03', null),
  ]);
  expect(sorted.map(({ id }) => id)).toEqual([4, 3, 2, 1]);
});

it('shows the newest entry first when two start in the same month', () => {
  const sorted = sortExperiences([
    item(1, '2024-03', '2025-01'),
    item(2, '2024-03', '2025-01'),
  ]);
  expect(sorted.map(({ id }) => id)).toEqual([2, 1]);
});

it('does not change the list it was given', () => {
  const list = [item(1, '2021-01', '2021-02'), item(2, '2022-01', null)];
  sortExperiences(list);
  expect(list.map(({ id }) => id)).toEqual([1, 2]);
});
