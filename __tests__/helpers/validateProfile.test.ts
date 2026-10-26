import { PROFILE_DEFAULTS } from '../../constants';
import { validateProfile, validateSkills } from '../../helpers';

const valid = { ...PROFILE_DEFAULTS };

it('accepts the defaults', () => {
  expect(validateProfile(valid)).toEqual({});
});

it.each(['facebookUrl', 'twitterUrl', 'youtubeUrl'] as const)(
  'accepts an empty %s so its icon can be hidden',
  (field) => {
    expect(validateProfile({ ...valid, [field]: '  ' })).toEqual({});
  },
);

it.each([
  ['facebookUrl', 'Facebook'],
  ['twitterUrl', 'Twitter'],
  ['youtubeUrl', 'Youtube'],
] as const)('rejects a %s that is not a http(s) URL', (field, name) => {
  expect(validateProfile({ ...valid, [field]: 'javascript:alert(1)' })).toEqual(
    { [field]: `The ${name} link should be a http(s) URL` },
  );
});

it.each(['email', 'phone'] as const)(
  'accepts an empty %s so it can be hidden',
  (field) => {
    expect(validateProfile({ ...valid, [field]: '' })).toEqual({});
  },
);

it.each(['+819012345678', '+6591234567', '+12025550123'])(
  'accepts the real phone number %s',
  (phone) => {
    expect(validateProfile({ ...valid, phone })).toEqual({});
  },
);

it('accepts a name of 30 characters after trimming', () => {
  expect(validateProfile({ ...valid, name: ` ${'x'.repeat(30)} ` })).toEqual(
    {},
  );
});

it.each([
  ['name', '  ', "Your name can't be empty"],
  ['name', 'x'.repeat(31), 'Your name is too long (max 30)'],
  ['email', 'mathius@gmail', "The email doesn't look right"],
  [
    'email',
    `${'a'.repeat(60)}@${'b'.repeat(60)}.${'c'.repeat(60)}.${'d'.repeat(60)}.${'e'.repeat(20)}.com`,
    'The email is too long (max 255)',
  ],
  [
    'phone',
    '08111906204',
    'The phone number should start with + and the country code',
  ],
  ['phone', '+62123456', "The phone number doesn't look right"],
  ['phone', '+11234567890', "The phone number doesn't look right"],
] as const)('rejects %s = %p', (field, value, message) => {
  expect(validateProfile({ ...valid, [field]: value })).toEqual({
    [field]: message,
  });
});

it('rejects a link longer than 255 characters', () => {
  const youtubeUrl = `https://youtube.com/${'x'.repeat(236)}`;
  expect(validateProfile({ ...valid, youtubeUrl })).toEqual({
    youtubeUrl: 'The Youtube link is too long (max 255)',
  });
});

it.each([
  ['  ', "The description can't be empty"],
  ['x'.repeat(301), 'The description is too long (max 300)'],
])('rejects the description %p', (skillsDescription, message) => {
  expect(validateProfile({ ...valid, skillsDescription })).toEqual({
    skillsDescription: message,
  });
});

it('accepts a description of 300 characters after trimming', () => {
  expect(
    validateProfile({ ...valid, skillsDescription: ` ${'x'.repeat(300)} ` }),
  ).toEqual({});
});

it('reports the skills error through validateProfile', () => {
  expect(validateProfile({ ...valid, skills: [] })).toEqual({
    skills: 'Add at least one skill',
  });
});

describe('validateSkills', () => {
  it('accepts 24 unique skills of 30 characters', () => {
    const skills = Array.from({ length: 24 }, (_, i) => `${i}`.padEnd(30, 'x'));
    expect(validateSkills(skills)).toBeUndefined();
  });

  it.each([
    [[], 'Add at least one skill'],
    [
      Array.from({ length: 25 }, (_, i) => `Skill ${i}`),
      'You can add up to 24 skills',
    ],
    [['React', '  '], "A skill can't be empty"],
    [['x'.repeat(31)], 'A skill is too long (max 30)'],
    [['React', ' react '], 'Each skill can only be added once'],
  ])('rejects %p', (skills, message) => {
    expect(validateSkills(skills)).toBe(message);
  });
});
