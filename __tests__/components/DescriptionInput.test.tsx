import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DescriptionInput } from '../../components';
import { renderWithStore } from '../test-utils';

const Harness = ({
  start,
  pointErrors,
  invalidMessage,
  onChange = jest.fn(),
}: {
  start: string[];
  pointErrors?: (string | undefined)[];
  invalidMessage?: string;
  onChange?: jest.Mock;
}) => {
  const [points, setPoints] = useState(start);

  return (
    <>
      <label htmlFor="desc">Description</label>
      <DescriptionInput
        id="desc"
        points={points}
        pointErrors={pointErrors}
        invalidMessage={invalidMessage}
        onChange={(next) => {
          onChange(next);
          setPoints(next);
        }}
      />
    </>
  );
};

const boxes = () => screen.getAllByRole('textbox');

it('shows one box per point, and the label points to the first one', () => {
  renderWithStore(<Harness start={['First', 'Second']} />);
  expect(boxes().map((box) => (box as HTMLInputElement).value)).toEqual([
    'First',
    'Second',
  ]);
  expect(screen.getByLabelText('Description')).toHaveValue('First');
  expect(screen.getByLabelText('Point 2')).toHaveValue('Second');
  expect(screen.getByText('2 / 10')).toBeInTheDocument();
});

it('changes only the point that is typed in', async () => {
  const onChange = jest.fn();
  renderWithStore(<Harness start={['First', 'Second']} onChange={onChange} />);
  await userEvent.type(screen.getByLabelText('Point 2'), '!');
  expect(onChange).toHaveBeenLastCalledWith(['First', 'Second!']);
});

it('adds an empty point and puts the cursor in it', async () => {
  renderWithStore(<Harness start={['First']} />);
  await userEvent.click(screen.getByRole('button', { name: 'Add point' }));
  expect(boxes()).toHaveLength(2);
  expect(screen.getByLabelText('Point 2')).toHaveValue('');
  expect(screen.getByLabelText('Point 2')).toHaveFocus();
  expect(screen.getByText('2 / 10')).toBeInTheDocument();
});

it('removes the chosen point', async () => {
  renderWithStore(<Harness start={['First', 'Second', 'Third']} />);
  await userEvent.click(screen.getByRole('button', { name: 'Remove point 2' }));
  expect(boxes().map((box) => (box as HTMLInputElement).value)).toEqual([
    'First',
    'Third',
  ]);
});

it('does not allow removing the last point', () => {
  renderWithStore(<Harness start={['Only one']} />);
  expect(screen.getByRole('button', { name: 'Remove point 1' })).toBeDisabled();
});

it('does not allow more than 10 points', () => {
  renderWithStore(
    <Harness start={Array.from({ length: 10 }, (_, i) => `Point ${i}`)} />,
  );
  expect(screen.getByRole('button', { name: 'Add point' })).toBeDisabled();
  expect(screen.getByText('10 / 10')).toBeInTheDocument();
});

it('shows each error under its own box', () => {
  renderWithStore(
    <Harness
      start={['Fine', '']}
      pointErrors={[undefined, "A point can't be empty"]}
    />,
  );
  expect(screen.getByText("A point can't be empty")).toBeInTheDocument();
  expect(screen.getByLabelText('Point 2')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  expect(screen.getByLabelText('Description')).not.toHaveAttribute(
    'aria-invalid',
  );
});

it('shows a message about the whole list', () => {
  renderWithStore(
    <Harness start={['']} invalidMessage="Add at least one point" />,
  );
  expect(screen.getByText('Add at least one point')).toBeInTheDocument();
});

it('explains the limits', () => {
  renderWithStore(<Harness start={['']} />);
  expect(
    screen.getByText(
      'Each point shows with a check mark. Max 200 characters each.',
    ),
  ).toBeInTheDocument();
});
