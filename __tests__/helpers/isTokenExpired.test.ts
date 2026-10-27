import { isSessionExpired, isTokenExpired } from '../../helpers/isTokenExpired';

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');

const makeToken = (payload: object) =>
  `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`;

const NOW = 1_800_000_000_000;
const inOneHour = makeToken({ exp: NOW / 1000 + 3600 });
const anHourAgo = makeToken({ exp: NOW / 1000 - 3600 });

describe('isTokenExpired', () => {
  it('is false when the expiry time is in the future', () => {
    expect(isTokenExpired(inOneHour, NOW)).toBe(false);
  });

  it('is true when the expiry time has passed', () => {
    expect(isTokenExpired(anHourAgo, NOW)).toBe(true);
  });

  it('is true for an empty token', () => {
    expect(isTokenExpired('', NOW)).toBe(true);
  });

  it('is true for a token that is not a valid JWT', () => {
    expect(isTokenExpired('not-a-token', NOW)).toBe(true);
    expect(isTokenExpired('a.b.c', NOW)).toBe(true);
  });

  it('is true when the token has no expiry time', () => {
    expect(isTokenExpired(makeToken({ id: 1 }), NOW)).toBe(true);
  });
});

describe('isSessionExpired', () => {
  it('is true when both tokens have expired', () => {
    expect(isSessionExpired(anHourAgo, anHourAgo, NOW)).toBe(true);
  });

  it('is false when the access token expired but the refresh token is still valid', () => {
    expect(isSessionExpired(anHourAgo, inOneHour, NOW)).toBe(false);
  });

  it('is false when the user is not logged in at all', () => {
    expect(isSessionExpired('', '', NOW)).toBe(false);
  });

  it('is true when only the expired tokens are left', () => {
    expect(isSessionExpired('', anHourAgo, NOW)).toBe(true);
  });
});
