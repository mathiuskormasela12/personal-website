import { render } from '@testing-library/react';
import { CountryFlag } from '../../components';

const flagOf = (country: string) =>
  render(<CountryFlag country={country} />).container.querySelector('img');

it('shows the flag image copied to public/flags', () => {
  expect(flagOf('JP')?.getAttribute('src')).toBe('/flags/JP.svg');
});

it('is only decoration, because the text next to it says the country', () => {
  expect(flagOf('ID')).toHaveAttribute('alt', '');
});

it('keeps the 3:2 shape of the flag files', () => {
  const flag = flagOf('ID');
  expect(flag).toHaveAttribute('width', '21');
  expect(flag).toHaveAttribute('height', '14');
});
