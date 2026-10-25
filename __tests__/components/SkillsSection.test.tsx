import { screen, within } from '@testing-library/react';
import { SkillsSection } from '../../components';
import { renderWithStore } from '../test-utils';

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
