const LOCAL_PART = /^[^\s@"(),:;<>[\]\\.]+(\.[^\s@"(),:;<>[\]\\.]+)*$/;
const DOMAIN = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const MAX_LOCAL_PART_LENGTH = 64;

export const isValidEmail = (email: string): boolean => {
  const parts = email.split('@');

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  return (
    localPart.length <= MAX_LOCAL_PART_LENGTH &&
    LOCAL_PART.test(localPart) &&
    DOMAIN.test(domain)
  );
};
