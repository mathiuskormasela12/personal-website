import { screen, within } from '@testing-library/react';
import { SkillsSection } from '../../components';
import {
  COLUMN_OFFSET,
  TILE_GAP,
} from '../../components/skillssection/skillssection.styled';
import { getMediaRuleStyle, renderWithStore } from '../test-utils';

const skills = ['HTML', 'CSS', 'React', 'Node Js', 'Nest Js', 'Docker'];

it('shows the fixed heading and the editable description', () => {
  renderWithStore(
    <SkillsSection skills={skills} description="Mostly TypeScript." />,
  );
  const section = screen.getByRole('region', { name: 'What I build with' });
  expect(within(section).getByRole('heading', { level: 2 })).toHaveTextContent(
    'What I build with',
  );
  expect(within(section).getByText('Mostly TypeScript.')).toBeInTheDocument();
});

it('shows every skill once, in the order they were added', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const names = screen.getAllByRole('listitem').map((item) => item.textContent);
  expect([...names].sort()).toEqual([...skills].sort());
});

it('fills four columns from left to right', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const columns = screen.getAllByRole('list');
  expect(columns).toHaveLength(4);
  expect(
    columns.map((column) =>
      within(column)
        .queryAllByRole('listitem')
        .map((item) => item.textContent),
    ),
  ).toEqual([['HTML', 'Nest Js'], ['CSS', 'Docker'], ['React'], ['Node Js']]);
});

it('does not render empty columns when there are few skills', () => {
  renderWithStore(<SkillsSection skills={['React']} description="Hi" />);
  expect(screen.getAllByRole('list')).toHaveLength(1);
});

it('keeps line breaks in the description', () => {
  renderWithStore(
    <SkillsSection skills={skills} description={'Line one\nLine two'} />,
  );
  expect(screen.getByText(/Line one/)).toHaveStyle({ whiteSpace: 'pre-line' });
});

it('shows the columns without bullet points', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  screen
    .getAllByRole('list')
    .forEach((list) => expect(list).toHaveStyle({ listStyle: 'none' }));
});

it('keeps the same gap between tiles on every screen size', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const columns = screen.getAllByRole('list');
  expect(columns[0].parentElement).toHaveStyle({ gap: TILE_GAP });
  columns.forEach((column) => {
    expect(column).toHaveStyle({ gap: TILE_GAP });
    expect(
      getMediaRuleStyle(column, '(min-width: 1201px)')?.getPropertyValue(
        'gap',
      ) ?? '',
    ).toBe('');
  });
});

it('groups the columns in the middle instead of stretching them', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const grid = screen.getAllByRole('list')[0].parentElement as HTMLElement;
  expect(
    getComputedStyle(grid)
      .getPropertyValue('grid-template-columns')
      .replace(/\s/g, ''),
  ).toBe('repeat(4,max-content)');
  expect(grid).toHaveStyle({ justifyContent: 'center' });
});

it('pushes every second column down with real space instead of a transform', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const [first, second, third, fourth] = screen.getAllByRole('list');
  [second, fourth].forEach((column) =>
    expect(column).toHaveStyle({ paddingTop: COLUMN_OFFSET }),
  );
  [first, third].forEach((column) =>
    expect(column).not.toHaveStyle({ paddingTop: COLUMN_OFFSET }),
  );
  [first, second, third, fourth].forEach((column) =>
    expect(getComputedStyle(column).transform).toBe(''),
  );
});

it('uses the same padding at the top and bottom of the panel', () => {
  renderWithStore(<SkillsSection skills={skills} description="Hi" />);
  const panel = screen.getAllByRole('list')[0].parentElement?.parentElement;
  expect(panel).toHaveStyle({ padding: '2rem 0.75rem' });
  expect(
    getMediaRuleStyle(
      panel as HTMLElement,
      '(min-width: 1201px)',
    )?.getPropertyValue('padding'),
  ).toBe('2.6rem 2rem');
});
