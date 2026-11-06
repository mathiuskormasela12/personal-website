import { groupByCompany } from '../../helpers';
import { IExperience } from '../../interfaces';

const item = (id: number, company: string) =>
  ({
    id,
    company,
    role: `Role ${id}`,
    startDate: '2024-01',
    endDate: null,
    description: ['D'],
  }) as IExperience;

it('puts roles in a row at the same company into one group', () => {
  const groups = groupByCompany([
    item(1, 'Nimbus Labs'),
    item(2, 'Nimbus Labs'),
    item(3, 'Kopi Digital'),
  ]);
  expect(
    groups.map(({ company, roles }) => [company, roles.map(({ id }) => id)]),
  ).toEqual([
    ['Nimbus Labs', [1, 2]],
    ['Kopi Digital', [3]],
  ]);
});

it('ignores upper case and extra spaces when it compares names', () => {
  const groups = groupByCompany([
    item(1, 'Nimbus Labs'),
    item(2, ' nimbus labs '),
  ]);
  expect(groups).toHaveLength(1);
  expect(groups[0].company).toBe('Nimbus Labs');
});

it('keeps two groups when the same company comes back later', () => {
  const groups = groupByCompany([
    item(1, 'Nimbus Labs'),
    item(2, 'Kopi Digital'),
    item(3, 'Nimbus Labs'),
  ]);
  expect(groups.map(({ company }) => company)).toEqual([
    'Nimbus Labs',
    'Kopi Digital',
    'Nimbus Labs',
  ]);
});

it('returns no groups for an empty list', () => {
  expect(groupByCompany([])).toEqual([]);
});
