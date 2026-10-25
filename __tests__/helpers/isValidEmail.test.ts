import { isValidEmail } from '../../helpers';

it.each([
  'mathiuskormasela12@gmail.com',
  'first.last@example.co.id',
  'me+portfolio@sub.example.com',
  'a_b-c@my-domain.dev',
])('accepts %s', (email) => {
  expect(isValidEmail(email)).toBe(true);
});

it.each([
  '',
  'mathius@gmail',
  'mathius gmail.com',
  'mathius@@gmail.com',
  'me @gmail.com',
  '.me@gmail.com',
  'me.@gmail.com',
  'me..you@gmail.com',
  'me@-gmail.com',
  'me@gmail.c',
  `${'a'.repeat(65)}@gmail.com`,
])('rejects %p', (email) => {
  expect(isValidEmail(email)).toBe(false);
});
