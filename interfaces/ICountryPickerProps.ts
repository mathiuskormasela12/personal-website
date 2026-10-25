import { CountryCode } from 'libphonenumber-js/min';

export interface ICountryPickerProps {
  country: CountryCode;
  onChange: (country: CountryCode) => void;
}
