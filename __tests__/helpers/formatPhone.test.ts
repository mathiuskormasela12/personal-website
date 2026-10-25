import { formatPhone } from '../../helpers';

it('formats a saved Indonesian number for visitors and finds its country', () => {
  expect(formatPhone('+628111906204')).toEqual({
    text: '+62 811 1906 204',
    country: 'ID',
  });
});

it('formats a Japanese number', () => {
  expect(formatPhone('+819012345678')).toEqual({
    text: '+81 90 1234 5678',
    country: 'JP',
  });
});

it('returns nothing for an empty phone, so the row can be hidden', () => {
  expect(formatPhone('')).toBeUndefined();
  expect(formatPhone('   ')).toBeUndefined();
});

it('shows a number it cannot read as it is, without a country', () => {
  expect(formatPhone('12')).toEqual({ text: '12', country: undefined });
});
