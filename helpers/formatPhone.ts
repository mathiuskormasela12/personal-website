import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js/min';

export const formatPhone = (
  phone: string,
): { text: string; country?: CountryCode } | undefined => {
  const value = phone.trim();

  if (value === '') {
    return undefined;
  }

  const parsed = parsePhoneNumberFromString(value);

  return parsed
    ? { text: parsed.formatInternational(), country: parsed.country }
    : { text: value, country: undefined };
};
