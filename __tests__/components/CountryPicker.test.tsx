import React, { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountryCode } from 'libphonenumber-js/min';
import { CountryPicker } from '../../components';

const Harness = ({
  onChange,
}: {
  onChange: (country: CountryCode) => void;
}) => {
  const [country, setCountry] = useState<CountryCode>('ID');
  return (
    <div>
      <CountryPicker
        country={country}
        onChange={(next) => {
          setCountry(next);
          onChange(next);
        }}
      />
      <p>outside</p>
    </div>
  );
};

const setup = () => {
  const onChange = jest.fn();
  render(<Harness onChange={onChange} />);
  return onChange;
};

const trigger = () => screen.getByRole('button', { name: /^Country:/ });
const open = () => userEvent.click(trigger());
const options = () =>
  within(screen.getByRole('listbox')).getAllByRole('option');

it('shows the flag and dial code of the chosen country', () => {
  setup();
  expect(trigger()).toHaveAccessibleName('Country: Indonesia +62');
  expect(trigger()).toHaveTextContent('+62');
  expect(trigger().querySelector('img')?.getAttribute('src')).toBe(
    '/flags/ID.svg',
  );
  expect(trigger()).toHaveAttribute('aria-haspopup', 'listbox');
  expect(trigger()).toHaveAttribute('aria-expanded', 'false');
});

it('opens a list of every country, sorted by name, with the search box focused', async () => {
  setup();
  await open();
  expect(trigger()).toHaveAttribute('aria-expanded', 'true');
  expect(
    screen.getByRole('searchbox', { name: 'Search country' }),
  ).toHaveFocus();
  const names = options().map((option) => option.textContent ?? '');
  expect(names.length).toBeGreaterThan(200);
  expect(names).toContain('Japan+81');
  const countryNames = names.map((name) => name.replace(/\+\d+$/, ''));
  expect([...countryNames].sort((a, b) => a.localeCompare(b))).toEqual(
    countryNames,
  );
});

it('marks the chosen country as selected', async () => {
  setup();
  await open();
  expect(screen.getByRole('option', { selected: true })).toHaveTextContent(
    'Indonesia+62',
  );
});

it.each([
  ['jap', 'Japan+81'],
  ['+81', 'Japan+81'],
  ['81', 'Japan+81'],
  ['JP', 'Japan+81'],
])('finds a country by typing %p', async (query, expected) => {
  setup();
  await open();
  await userEvent.type(screen.getByRole('searchbox'), query);
  expect(options().map((option) => option.textContent)).toContain(expected);
  expect(options().length).toBeLessThan(5);
});

it('says so when no country matches', async () => {
  setup();
  await open();
  await userEvent.type(screen.getByRole('searchbox'), 'zzzz');
  expect(screen.queryAllByRole('option')).toHaveLength(0);
  expect(screen.getByText('No country found')).toBeInTheDocument();
});

it('picks a country with a click, closes and focuses the button again', async () => {
  const onChange = setup();
  await open();
  await userEvent.type(screen.getByRole('searchbox'), 'japan');
  await userEvent.click(screen.getByRole('option', { name: 'Japan +81' }));
  expect(onChange).toHaveBeenCalledWith('JP');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(trigger()).toHaveAccessibleName('Country: Japan +81');
  expect(trigger()).toHaveFocus();
});

it('can be used with the keyboard only', async () => {
  const onChange = setup();
  trigger().focus();
  await userEvent.keyboard('{Enter}');
  await userEvent.keyboard('singa');
  await userEvent.keyboard('{ArrowDown}');
  expect(screen.getByRole('option', { name: 'Singapore +65' })).toHaveFocus();
  await userEvent.keyboard('{Enter}');
  expect(onChange).toHaveBeenCalledWith('SG');
  expect(trigger()).toHaveFocus();
});

it('moves through the list with the arrow keys', async () => {
  setup();
  await open();
  await userEvent.type(screen.getByRole('searchbox'), 'gu');
  const [first, second] = options();
  await userEvent.keyboard('{ArrowDown}');
  expect(first).toHaveFocus();
  await userEvent.keyboard('{ArrowDown}');
  expect(second).toHaveFocus();
  await userEvent.keyboard('{ArrowUp}');
  expect(first).toHaveFocus();
  await userEvent.keyboard('{ArrowUp}');
  expect(screen.getByRole('searchbox')).toHaveFocus();
});

it('closes with Escape without changing the country', async () => {
  const onChange = setup();
  await open();
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(trigger()).toHaveFocus();
  expect(onChange).not.toHaveBeenCalled();
});

it('closes on a click outside', async () => {
  setup();
  await open();
  await userEvent.click(screen.getByText('outside'));
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

it('starts with an empty search every time it opens', async () => {
  setup();
  await open();
  await userEvent.type(screen.getByRole('searchbox'), 'japan');
  await userEvent.click(trigger());
  await open();
  expect(screen.getByRole('searchbox')).toHaveValue('');
});

it('shows the list without bullet points', async () => {
  setup();
  await open();
  expect(screen.getByRole('listbox')).toHaveStyle({ listStyle: 'none' });
});
