import { isValidPhoneNumber } from 'libphonenumber-js/min';
import { IProfile, IProfileErrors } from '../interfaces';
import { isHttpUrl } from './isHttpUrl';
import { isValidEmail } from './isValidEmail';

const MAX_SKILLS = 24;
const MAX_SKILL_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 300;
const MAX_LINK_LENGTH = 255;
const MAX_NAME_LENGTH = 30;
const MAX_EMAIL_LENGTH = 255;
const INTERNATIONAL_PHONE = /^\+[1-9]\d{5,14}$/;

const SOCIAL_LINKS: [keyof IProfile, string][] = [
  ['facebookUrl', 'Facebook'],
  ['twitterUrl', 'Twitter'],
  ['youtubeUrl', 'Youtube'],
];

export const validateSkills = (skills: string[]): string | undefined => {
  const names = skills.map((skill) => skill.trim());

  if (names.length < 1) {
    return 'Add at least one skill';
  }

  if (names.length > MAX_SKILLS) {
    return `You can add up to ${MAX_SKILLS} skills`;
  }

  if (names.some((name) => name === '')) {
    return "A skill can't be empty";
  }

  if (names.some((name) => name.length > MAX_SKILL_LENGTH)) {
    return `A skill is too long (max ${MAX_SKILL_LENGTH})`;
  }

  const lowerCaseNames = names.map((name) => name.toLowerCase());
  if (new Set(lowerCaseNames).size !== names.length) {
    return 'Each skill can only be added once';
  }

  return undefined;
};

const validateDescription = (description: string): string | undefined => {
  const value = description.trim();

  if (value === '') {
    return "The description can't be empty";
  }

  if (value.length > MAX_DESCRIPTION_LENGTH) {
    return `The description is too long (max ${MAX_DESCRIPTION_LENGTH})`;
  }

  return undefined;
};

const validateLink = (link: string, name: string): string | undefined => {
  const value = link.trim();

  if (value === '') {
    return undefined;
  }

  if (value.length > MAX_LINK_LENGTH) {
    return `The ${name} link is too long (max ${MAX_LINK_LENGTH})`;
  }

  if (!isHttpUrl(value)) {
    return `The ${name} link should be a http(s) URL`;
  }

  return undefined;
};

const validateName = (name: string): string | undefined => {
  const value = name.trim();

  if (value === '') {
    return "Your name can't be empty";
  }

  if (value.length > MAX_NAME_LENGTH) {
    return `Your name is too long (max ${MAX_NAME_LENGTH})`;
  }

  return undefined;
};

const validateEmail = (email: string): string | undefined => {
  const value = email.trim();

  if (value === '') {
    return undefined;
  }

  if (value.length > MAX_EMAIL_LENGTH) {
    return `The email is too long (max ${MAX_EMAIL_LENGTH})`;
  }

  if (!isValidEmail(value)) {
    return "The email doesn't look right";
  }

  return undefined;
};

const validatePhone = (phone: string): string | undefined => {
  const value = phone.trim();

  if (value === '') {
    return undefined;
  }

  if (!INTERNATIONAL_PHONE.test(value)) {
    return 'The phone number should start with + and the country code';
  }

  if (!isValidPhoneNumber(value)) {
    return "The phone number doesn't look right";
  }

  return undefined;
};

export const validateProfile = (profile: IProfile): IProfileErrors => {
  const errors: IProfileErrors = {
    skills: validateSkills(profile.skills),
    skillsDescription: validateDescription(profile.skillsDescription),
    name: validateName(profile.name),
    email: validateEmail(profile.email),
    phone: validatePhone(profile.phone),
  };

  SOCIAL_LINKS.forEach(([field, name]) => {
    errors[field] = validateLink(String(profile[field]), name);
  });

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  );
};
