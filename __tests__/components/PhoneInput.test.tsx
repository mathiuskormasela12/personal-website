import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneInput } from '../../components';

const Harness = ({
  initial,
  onChange,
  invalidMessage,
}: {
  initial: string;
  onChange: (value: string) => void;
  invalidMessage?: string;
}) => {
  const [value, setValue] = useState(initial);
  return (
    <>
      <label htmlFor="phone">Phone</label>
      <PhoneInput
        id="phone"
        value={value}
        invalidMessage={invalidMessage}
        onChange={(next) => {
          setValue(next);
          onChange(next);
        }}
      />
    </>
  );
};

const setup = (initial: string, invalidMessage?: string) => {
  const onChange = jest.fn();
  const utils = render(
    <Harness
      initial={initial}
      onChange={onChange}
      invalidMessage={invalidMessage}
    />,
  );
  return { onChange, ...utils };
};

const box = () => screen.getByLabelText('Phone', { selector: 'input' });
const country = () => screen.getByRole('button', { name: /^Country:/ });
const lastValue = (onChange: jest.Mock) => onChange.mock.lastCall?.[0];

it('splits a saved number into its country and the rest of the number', () => {
  setup('+628111906204');
  expect(country()).toHaveAccessibleName('Country: Indonesia +62');
  expect(box()).toHaveValue('811 1906 204');
});

it('shows a saved Japanese number with the Japanese flag', () => {
  setup('+819012345678');
  expect(country()).toHaveAccessibleName('Country: Japan +81');
  expect(box()).toHaveValue('90 1234 5678');
});

it('starts with Indonesia and an empty box when there is no number', () => {
  setup('');
  expect(country()).toHaveAccessibleName('Country: Indonesia +62');
  expect(box()).toHaveValue('');
});

it('is a phone field for the keyboard and autofill', () => {
  setup('');
  expect(box()).toHaveAttribute('type', 'tel');
  expect(box()).toHaveAttribute('inputmode', 'tel');
  expect(box()).toHaveAttribute('autocomplete', 'tel-national');
});

it('sends the number in the international form while typing', async () => {
  const { onChange } = setup('');
  await userEvent.type(box(), '811 1906 204');
  expect(lastValue(onChange)).toBe('+628111906204');
});

it('drops the leading 0 that people often type', async () => {
  const { onChange } = setup('');
  await userEvent.type(box(), '0811-1906-204');
  expect(lastValue(onChange)).toBe('+628111906204');
});

it('ignores letters and a typed plus sign', async () => {
  const { onChange } = setup('');
  await userEvent.type(box(), '+81a1');
  expect(box()).toHaveValue('811');
  expect(lastValue(onChange)).toBe('+62811');
});

it('keeps the digits and changes the code when another country is picked', async () => {
  const { onChange } = setup('');
  await userEvent.type(box(), '90 1234 5678');
  await userEvent.click(country());
  await userEvent.type(screen.getByRole('searchbox'), 'japan');
  await userEvent.click(screen.getByRole('option', { name: 'Japan +81' }));
  expect(box()).toHaveValue('90 1234 5678');
  expect(lastValue(onChange)).toBe('+819012345678');
});

it('sends an empty value when the box is cleared, so the phone is hidden', async () => {
  const { onChange } = setup('+628111906204');
  await userEvent.clear(box());
  expect(lastValue(onChange)).toBe('');
});

it('follows a new number from outside', () => {
  const { rerender } = render(
    <PhoneInput id="p" value="+628111906204" onChange={jest.fn()} />,
  );
  rerender(<PhoneInput id="p" value="+6591234567" onChange={jest.fn()} />);
  expect(
    screen.getByRole('button', { name: /^Country:/ }),
  ).toHaveAccessibleName('Country: Singapore +65');
  expect(screen.getByRole('textbox')).toHaveValue('9123 4567');
});

it('shows the error message and a red border', () => {
  setup('+62123', "The phone number doesn't look right");
  expect(
    screen.getByText("The phone number doesn't look right"),
  ).toBeInTheDocument();
  expect(box().parentElement).toHaveStyle({
    borderLeftColor: 'var(--color-danger)',
    borderRightColor: 'var(--color-danger)',
  });
});

it('uses the soft border when the number is fine', () => {
  setup('+628111906204');
  expect(box().parentElement).toHaveStyle({
    borderLeftColor: 'var(--color-input-border)',
    borderRightColor: 'var(--color-input-border)',
  });
});
