import { validateExperience } from '../../helpers';
import { IExperienceBody } from '../../interfaces';

const now = new Date('2026-10-15T12:00:00Z');

const valid: IExperienceBody = {
  company: 'Nimbus Labs',
  role: 'Mobile Developer',
  startDate: '2024-03',
  endDate: '2025-02',
  description: ['Shipped the driver app.'],
};

const check = (change: Partial<IExperienceBody>) =>
  validateExperience({ ...valid, ...change }, now);

it('has no errors for a finished job or a current job', () => {
  expect(check({})).toEqual({});
  expect(check({ endDate: null })).toEqual({});
});

it('uses the same messages as the API for the names', () => {
  expect(check({ company: '  ' })).toEqual({
    company: "The company name can't be empty",
  });
  expect(check({ role: 'x'.repeat(61) })).toEqual({
    role: 'The role is too long (max 60)',
  });
});

it('needs 1 to 10 points', () => {
  expect(check({ description: [] })).toEqual({
    description: 'Add at least one point',
  });
  expect(
    check({ description: Array.from({ length: 11 }, (_, i) => `Point ${i}`) }),
  ).toEqual({ description: 'You can add up to 10 points' });
  expect(
    check({ description: Array.from({ length: 10 }, (_, i) => `Point ${i}`) }),
  ).toEqual({});
});

it('gives one error per point, in the same order as the boxes', () => {
  expect(
    check({ description: ['Fine', '   ', 'x'.repeat(201), 'x'.repeat(200)] }),
  ).toEqual({
    points: [
      undefined,
      "A point can't be empty",
      'A point is too long (max 200)',
      undefined,
    ],
  });
});

it('checks the length after trimming the spaces', () => {
  expect(check({ description: [`  ${'x'.repeat(200)}  `] })).toEqual({});
});

it('asks for the months', () => {
  expect(check({ startDate: '' })).toEqual({
    startDate: 'Pick the start month',
  });
  expect(check({ endDate: '' })).toEqual({
    endDate: 'Pick the end month, or tick "I currently work here"',
  });
});

it('rejects an end date before the start date', () => {
  expect(check({ startDate: '2025-03', endDate: '2025-01' })).toEqual({
    endDate: "The end date can't be before the start date",
  });
});

it('rejects months in the future', () => {
  expect(check({ startDate: '2026-11', endDate: null })).toEqual({
    startDate: "The start date can't be in the future",
  });
  expect(check({ endDate: '2027-01' })).toEqual({
    endDate: "The end date can't be in the future",
  });
});

it('accepts this month', () => {
  expect(check({ startDate: '2026-10', endDate: '2026-10' })).toEqual({});
});
