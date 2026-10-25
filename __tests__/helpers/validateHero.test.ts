import { HERO_DEFAULTS } from '../../constants';
import { validateHero } from '../../helpers';

const valid = { ...HERO_DEFAULTS };

it('accepts valid texts', () => {
  expect(validateHero(valid)).toEqual({});
});

it('accepts an empty ending', () => {
  expect(validateHero({ ...valid, titleSuffix: '' })).toEqual({});
});

it.each([
  ['titlePrefix', "The greeting can't be empty"],
  ['titleHighlight', "The highlighted text can't be empty"],
  ['subtitle', "The subtitle can't be empty"],
  ['buttonText', "The button text can't be empty"],
  ['buttonUrl', 'The button link should be a http(s) URL'],
] as const)('rejects an empty or blank %s', (field, message) => {
  expect(validateHero({ ...valid, [field]: '   ' })).toEqual({
    [field]: message,
  });
});

it.each([
  ['titlePrefix', 60, 'The greeting is too long (max 60)'],
  ['titleHighlight', 60, 'The highlighted text is too long (max 60)'],
  ['titleSuffix', 10, 'The ending is too long (max 10)'],
  ['subtitle', 300, 'The subtitle is too long (max 300)'],
  ['buttonText', 30, 'The button text is too long (max 30)'],
] as const)('rejects a %s longer than %i characters', (field, max, message) => {
  expect(validateHero({ ...valid, [field]: 'a'.repeat(max) })).toEqual({});
  expect(validateHero({ ...valid, [field]: 'a'.repeat(max + 1) })).toEqual({
    [field]: message,
  });
});

it('ignores surrounding spaces when it counts the length', () => {
  expect(
    validateHero({ ...valid, buttonText: `  ${'a'.repeat(30)}  ` }),
  ).toEqual({});
});

it('rejects a button link longer than 255 characters', () => {
  const url = `https://example.com/${'a'.repeat(236)}`;
  expect(validateHero({ ...valid, buttonUrl: url })).toEqual({
    buttonUrl: 'The button link is too long (max 255)',
  });
});

it.each([
  'youtube.com/mathius',
  'ftp://example.com/file',
  'javascript:alert(1)',
  'https://localhost',
  'not a url',
])('rejects the button link "%s"', (buttonUrl) => {
  expect(validateHero({ ...valid, buttonUrl })).toEqual({
    buttonUrl: 'The button link should be a http(s) URL',
  });
});

it.each(['http://example.com', 'https://github.com/mathius?tab=repos'])(
  'accepts the button link "%s"',
  (buttonUrl) => {
    expect(validateHero({ ...valid, buttonUrl })).toEqual({});
  },
);

it('reports every invalid field at once', () => {
  expect(
    Object.keys(
      validateHero({
        ...valid,
        titlePrefix: '',
        buttonText: '',
        buttonUrl: '',
      }),
    ),
  ).toEqual(['titlePrefix', 'buttonText', 'buttonUrl']);
});
