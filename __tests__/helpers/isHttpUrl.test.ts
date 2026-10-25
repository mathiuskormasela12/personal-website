import { isHttpUrl } from '../../helpers';

it.each([
  'http://example.com',
  'https://github.com/mathius?tab=repos',
  'https://www.youtube.com/channel/UC5eUSF2W_vAkYA6wdilJjOw',
])('accepts %s', (url) => {
  expect(isHttpUrl(url)).toBe(true);
});

it.each([
  '',
  'youtube.com/mathius',
  'ftp://example.com/file',
  'javascript:alert(1)',
  'https://localhost',
  'not a url',
])('rejects %p', (url) => {
  expect(isHttpUrl(url)).toBe(false);
});
