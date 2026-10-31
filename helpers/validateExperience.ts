import { IExperienceBody, IExperienceErrors } from '../interfaces';
import { MONTH_PATTERN } from './formatMonth';
import { getCurrentMonth } from './getDuration';

const MAX_NAME_LENGTH = 60;
export const MAX_POINTS = 10;
export const MAX_POINT_LENGTH = 200;

const validateName = (value: string, label: string): string | undefined => {
  const text = value.trim();

  if (text === '') {
    return `The ${label} can't be empty`;
  }

  if (text.length > MAX_NAME_LENGTH) {
    return `The ${label} is too long (max ${MAX_NAME_LENGTH})`;
  }

  return undefined;
};

const validateMonth = (
  value: string,
  label: string,
  currentMonth: string,
): string | undefined => {
  if (!MONTH_PATTERN.test(value)) {
    return `Pick the ${label} month`;
  }

  if (value > currentMonth) {
    return `The ${label} date can't be in the future`;
  }

  return undefined;
};

const validateEndDate = (
  values: IExperienceBody,
  currentMonth: string,
): string | undefined => {
  if (values.endDate === null) {
    return undefined;
  }

  if (values.endDate === '') {
    return 'Pick the end month, or tick "I currently work here"';
  }

  const problem = validateMonth(values.endDate, 'end', currentMonth);

  if (problem) {
    return problem;
  }

  if (
    MONTH_PATTERN.test(values.startDate) &&
    values.endDate < values.startDate
  ) {
    return "The end date can't be before the start date";
  }

  return undefined;
};

const validateDescription = (points: string[]): string | undefined => {
  if (points.length < 1) {
    return 'Add at least one point';
  }

  if (points.length > MAX_POINTS) {
    return `You can add up to ${MAX_POINTS} points`;
  }

  return undefined;
};

const validatePoint = (point: string): string | undefined => {
  const text = point.trim();

  if (text === '') {
    return "A point can't be empty";
  }

  if (text.length > MAX_POINT_LENGTH) {
    return `A point is too long (max ${MAX_POINT_LENGTH})`;
  }

  return undefined;
};

export const validateExperience = (
  values: IExperienceBody,
  now: Date = new Date(),
): IExperienceErrors => {
  const currentMonth = getCurrentMonth(now);
  const errors: IExperienceErrors = {
    company: validateName(values.company, 'company name'),
    role: validateName(values.role, 'role'),
    startDate: validateMonth(values.startDate, 'start', currentMonth),
    endDate: validateEndDate(values, currentMonth),
    description: validateDescription(values.description),
  };
  const points = values.description.map(validatePoint);
  const found = Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  ) as IExperienceErrors;

  return points.some(Boolean) ? { ...found, points } : found;
};
