import { IHero, IHeroErrors } from '../interfaces';
import { isHttpUrl } from './isHttpUrl';

interface IHeroFieldRule {
  label: string;
  max: number;
  required: boolean;
}

const HERO_FIELD_RULES: Record<keyof IHero, IHeroFieldRule> = {
  titlePrefix: { label: 'greeting', max: 60, required: true },
  titleHighlight: { label: 'highlighted text', max: 60, required: true },
  titleSuffix: { label: 'ending', max: 10, required: false },
  subtitle: { label: 'subtitle', max: 300, required: true },
  buttonText: { label: 'button text', max: 30, required: true },
  buttonUrl: { label: 'button link', max: 255, required: false },
};

const getFieldError = (field: keyof IHero, rawValue: string) => {
  const { label, max, required } = HERO_FIELD_RULES[field];
  const value = rawValue.trim();

  if (required && value === '') {
    return `The ${label} can't be empty`;
  }

  if (value.length > max) {
    return `The ${label} is too long (max ${max})`;
  }

  if (field === 'buttonUrl' && !isHttpUrl(value)) {
    return 'The button link should be a http(s) URL';
  }

  return undefined;
};

export const validateHero = (hero: IHero): IHeroErrors =>
  (Object.keys(HERO_FIELD_RULES) as (keyof IHero)[]).reduce<IHeroErrors>(
    (errors, field) => {
      const error = getFieldError(field, hero[field]);
      return error ? { ...errors, [field]: error } : errors;
    },
    {},
  );
