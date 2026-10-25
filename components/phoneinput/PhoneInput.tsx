import React, { Fragment, useState } from 'react';
import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/min';
import { IPhoneInputProps } from '../../interfaces';
import { CountryPicker } from '../countrypicker/CountryPicker';
import { ErrorMessage } from '../textfield/textfield.styled';
import * as Styled from './phoneinput.styled';

const DEFAULT_COUNTRY: CountryCode = 'ID';

type PhoneParts = {
  value: string;
  country: CountryCode;
  national: string;
};

const toParts = (value: string): PhoneParts => {
  const parsed =
    value.trim() === '' ? undefined : parsePhoneNumberFromString(value);

  if (!parsed) {
    return { value, country: DEFAULT_COUNTRY, national: '' };
  }

  return {
    value,
    country: parsed.country ?? DEFAULT_COUNTRY,
    national: parsed
      .formatInternational()
      .replace(`+${parsed.countryCallingCode}`, '')
      .trim(),
  };
};

const toValue = (country: CountryCode, national: string): string => {
  const digits = national.replace(/\D/g, '');

  if (digits === '') {
    return '';
  }

  const parsed = parsePhoneNumberFromString(national, country);

  return parsed?.number ?? `+${getCountryCallingCode(country)}${digits}`;
};

export const PhoneInput: React.FC<IPhoneInputProps> = ({
  id,
  value,
  onChange,
  invalidMessage,
}) => {
  const [parts, setParts] = useState(() => toParts(value));
  const current = parts.value === value ? parts : toParts(value);

  if (parts !== current) {
    setParts(current);
  }

  const update = (country: CountryCode, national: string) => {
    const next = toValue(country, national);
    setParts({ value: next, country, national });
    onChange(next);
  };

  return (
    <Fragment>
      <Styled.Field $invalid={Boolean(invalidMessage)}>
        <CountryPicker
          country={current.country}
          onChange={(country) => update(country, current.national)}
        />
        <Styled.Input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="811 1906 204"
          value={current.national}
          onChange={(event) =>
            update(
              current.country,
              event.target.value.replace(/[^\d\s()-]/g, ''),
            )
          }
        />
      </Styled.Field>
      <ErrorMessage>{invalidMessage}</ErrorMessage>
    </Fragment>
  );
};
