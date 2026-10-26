import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SkillsInput } from '../../components';
import { renderWithStore } from '../test-utils';

const Harness = ({
  initial,
  onSubmit = jest.fn(),
  invalidMessage,
}: {
  initial: string[];
  onSubmit?: () => void;
  invalidMessage?: string;
}) => {
  const [skills, setSkills] = useState(initial);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="skills">Skills</label>
      <SkillsInput
        id="skills"
        skills={skills}
        onChange={setSkills}
        invalidMessage={invalidMessage}
      />
      <output>{skills.join(',')}</output>
    </form>
  );
};

const input = () => screen.getByLabelText('Skills');
const value = () => screen.getByRole('status').textContent;

it('shows every skill as a pill with a remove button and a counter', () => {
  renderWithStore(<Harness initial={['React', 'Nest Js']} />);
  expect(
    screen.getByRole('button', { name: 'Remove React' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Remove Nest Js' }),
  ).toBeInTheDocument();
  expect(screen.getByText('2 / 24')).toBeInTheDocument();
});

it('adds a trimmed skill with the Add button and clears the box', async () => {
  renderWithStore(<Harness initial={['React']} />);
  await userEvent.type(input(), '  Docker ');
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(value()).toBe('React,Docker');
  expect(input()).toHaveValue('');
});

it('adds a skill with Enter without submitting the form', async () => {
  const onSubmit = jest.fn();
  renderWithStore(<Harness initial={['React']} onSubmit={onSubmit} />);
  await userEvent.type(input(), 'Docker{Enter}');
  expect(value()).toBe('React,Docker');
  expect(onSubmit).not.toHaveBeenCalled();
});

it('ignores an empty box', async () => {
  renderWithStore(<Harness initial={['React']} />);
  await userEvent.type(input(), '   {Enter}');
  expect(value()).toBe('React');
  expect(screen.queryByText(/can't be empty/)).not.toBeInTheDocument();
});

it('refuses a duplicate and explains why', async () => {
  renderWithStore(<Harness initial={['React']} />);
  await userEvent.type(input(), 'react{Enter}');
  expect(value()).toBe('React');
  expect(
    screen.getByText('Each skill can only be added once'),
  ).toBeInTheDocument();
  expect(input()).toHaveValue('react');
});

it('refuses a skill that is too long', async () => {
  renderWithStore(<Harness initial={['React']} />);
  fireEvent.change(input(), { target: { value: 'x'.repeat(31) } });
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(screen.getByText('A skill is too long (max 30)')).toBeInTheDocument();
});

it('refuses a 25th skill', async () => {
  const many = Array.from({ length: 24 }, (_, i) => `Skill ${i}`);
  renderWithStore(<Harness initial={many} />);
  await userEvent.type(input(), 'One more{Enter}');
  expect(screen.getByText('You can add up to 24 skills')).toBeInTheDocument();
});

it('clears the add error once the owner types again', async () => {
  renderWithStore(<Harness initial={['React']} />);
  await userEvent.type(input(), 'react{Enter}');
  await userEvent.type(input(), 'x');
  expect(
    screen.queryByText('Each skill can only be added once'),
  ).not.toBeInTheDocument();
});

it('removes a skill', async () => {
  renderWithStore(<Harness initial={['React', 'Nest Js', 'Docker']} />);
  await userEvent.click(screen.getByRole('button', { name: 'Remove Nest Js' }));
  expect(value()).toBe('React,Docker');
  expect(screen.getByText('2 / 24')).toBeInTheDocument();
});

it('shows a message from the form', () => {
  renderWithStore(
    <Harness initial={[]} invalidMessage="Add at least one skill" />,
  );
  expect(screen.getByText('Add at least one skill')).toBeInTheDocument();
});

it('shows the pills without bullet points', () => {
  renderWithStore(<Harness initial={['React']} />);
  expect(screen.getByRole('list')).toHaveStyle({ listStyle: 'none' });
});

it('brightens the pill logos a little in dark mode', () => {
  renderWithStore(<Harness initial={['MySQL']} />);
  const svg = screen
    .getByRole('button', { name: 'Remove MySQL' })
    .closest('li')
    ?.querySelector('svg');
  document.documentElement.dataset.theme = 'dark';
  expect(getComputedStyle(svg as Element).filter).toBe('brightness(1.35)');
  document.documentElement.dataset.theme = 'light';
});
