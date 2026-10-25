import { SiNestjs, SiNodedotjs, SiReact } from 'react-icons/si';
import { getSkillInitials, getSkillLogo } from '../../helpers';

it('finds the logo and brand color of a known skill', () => {
  expect(getSkillLogo('React')).toEqual({
    Icon: SiReact,
    color: '#00A8D4',
    scale: 1,
  });
});

it.each(['Node Js', 'node.js', 'NodeJS', ' nodejs ', 'Node'])(
  'ignores case, spaces and dots in %p',
  (name) => {
    expect(getSkillLogo(name)?.Icon).toBe(SiNodedotjs);
  },
);

it('knows the skills the site shows today', () => {
  [
    'HTML',
    'CSS',
    'Javascript',
    'Typescript',
    'Node Js',
    'Express Js',
    'Nest Js',
    'MySQL',
    'Mongodb',
  ].forEach((name) => expect(getSkillLogo(name)).toBeDefined());
  expect(getSkillLogo('Nest Js')?.Icon).toBe(SiNestjs);
});

it('knows about 40 common skills', () => {
  [
    'Next.js',
    'Vue',
    'Angular',
    'Tailwind CSS',
    'Sass',
    'Redux',
    'PHP',
    'Laravel',
    'Python',
    'Django',
    'Go',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Kubernetes',
    'Git',
    'GitHub',
    'Firebase',
    'GraphQL',
    'Flutter',
    'Dart',
    'Kotlin',
    'Swift',
    'React Native',
    'Jest',
    'Figma',
  ].forEach((name) => expect(getSkillLogo(name)).toBeDefined());
});

it('draws wide wordmark logos bigger so they stay readable', () => {
  expect(getSkillLogo('MySQL')?.scale).toBe(1.4);
  expect(getSkillLogo('React')?.scale).toBe(1);
});

it('returns undefined for an unknown skill', () => {
  expect(getSkillLogo('Cobol')).toBeUndefined();
  expect(getSkillLogo('')).toBeUndefined();
});

it.each([
  ['GraphQL', 'Gr'],
  ['  cobol', 'co'],
  ['C', 'C'],
  ['C#', 'C#'],
])('uses the first two letters of %p as initials', (name, initials) => {
  expect(getSkillInitials(name)).toBe(initials);
});
