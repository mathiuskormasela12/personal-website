import { getUserIdFromResetToken } from '../../helpers/getUserIdFromResetToken';

const b64url = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');
const token = (payload: object) =>
  `${b64url({ alg: 'HS256', typ: 'JWT' })}.${b64url(payload)}.signature`;

describe('getUserIdFromResetToken', () => {
  it('returns the numeric id from the token payload', () => {
    expect(getUserIdFromResetToken(token({ id: 7 }))).toBe(7);
  });

  it('accepts a string id', () => {
    expect(getUserIdFromResetToken(token({ id: '12' }))).toBe(12);
  });

  it('throws on a malformed token', () => {
    expect(() => getUserIdFromResetToken('garbage')).toThrow();
  });
});
