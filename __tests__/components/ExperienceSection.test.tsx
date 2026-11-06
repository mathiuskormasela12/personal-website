import { useState } from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExperienceSection } from '../../components';
import { IExperience } from '../../interfaces';
import { renderWithStore } from '../test-utils';

const experiences: IExperience[] = [
  {
    id: 4,
    company: 'Nimbus Labs',
    role: 'Senior Mobile Developer',
    startDate: '2025-03',
    endDate: null,
    description: ['Lead the React Native app.', 'Rebuilt offline sync.'],
  },
  {
    id: 3,
    company: 'Nimbus Labs',
    role: 'Mobile Developer',
    startDate: '2024-03',
    endDate: '2025-02',
    description: ['Shipped the driver app.'],
  },
  {
    id: 2,
    company: 'Kopi Digital',
    role: 'Fullstack Developer',
    startDate: '2022-06',
    endDate: '2024-02',
    description: ['Built dashboards.'],
  },
  {
    id: 1,
    company: 'Bright Studio',
    role: 'Junior Web Developer',
    startDate: '2021-08',
    endDate: '2022-05',
    description: ['Turned designs into React pages.'],
  },
];

beforeEach(() => {
  jest.useFakeTimers({
    now: new Date('2026-10-15T12:00:00Z'),
    doNotFake: [
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
      'setImmediate',
      'clearImmediate',
      'queueMicrotask',
      'nextTick',
    ],
  });
});

afterEach(() => {
  jest.useRealTimers();
});

const Harness = ({ preview = false }: { preview?: boolean }) => {
  const [list, setList] = useState(experiences);
  const [editingId, setEditingId] = useState<number | null>(preview ? 2 : null);

  return (
    <>
      <button type="button" onClick={() => setEditingId(1)}>
        edit bright
      </button>
      <button type="button" onClick={() => setList(experiences.slice(0, 3))}>
        shrink
      </button>
      <ExperienceSection
        experiences={list}
        preview={preview}
        editingId={editingId}
      />
    </>
  );
};

const renderSection = (props = {}) =>
  renderWithStore(<ExperienceSection experiences={experiences} {...props} />);

const tabs = () => screen.getAllByRole('tab');
const panel = () => screen.getByRole('tabpanel');
const selectedTab = () =>
  tabs().find((tab) => tab.getAttribute('aria-selected') === 'true');

it('shows the bold "Experience." heading with a colored dot', () => {
  renderSection();
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Experience.');
  expect(screen.getByRole('region', { name: 'Experience' })).toBe(
    heading.closest('section'),
  );
  expect(within(heading).getByText('.')).toHaveAttribute('aria-hidden', 'true');
  expect(heading).toHaveStyle({ fontFamily: 'rubik-bold' });
});

it('shows the total time worked under the heading', () => {
  renderSection();
  const total = screen.getByText(
    (_, element) =>
      element?.tagName === 'P' &&
      element.textContent ===
        '5 years 3 months of building web & mobile apps, across 3 companies.',
  );
  expect(within(total).getByText('5 years 3 months').tagName).toBe('STRONG');
  expect(screen.getByRole('heading', { level: 2 }).nextElementSibling).toBe(
    total,
  );
});

it('says "company" when there is only one', () => {
  renderWithStore(<ExperienceSection experiences={experiences.slice(0, 2)} />);
  expect(
    screen.getByText(/of building web & mobile apps, across 1 company\./),
  ).toBeInTheDocument();
  expect(screen.getByText('2 years 8 months')).toBeInTheDocument();
});

it('updates the total when the list changes', async () => {
  renderWithStore(<Harness />);
  expect(screen.getByText('5 years 3 months')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'shrink' }));
  expect(screen.getByText('4 years 5 months')).toBeInTheDocument();
  expect(screen.getByText(/across 2 companies\./)).toBeInTheDocument();
});

it('shows one tab per company, with the first one open', () => {
  renderSection();
  expect(
    screen.getByRole('tablist', { name: 'Companies' }),
  ).toBeInTheDocument();
  expect(tabs().map((tab) => tab.textContent)).toEqual([
    'Nimbus Labs',
    'Kopi Digital',
    'Bright Studio',
  ]);
  expect(selectedTab()).toHaveTextContent('Nimbus Labs');
  expect(panel()).toHaveAttribute('aria-labelledby', tabs()[0].id);
  expect(tabs()[0]).toHaveAttribute('tabindex', '0');
  expect(tabs()[1]).toHaveAttribute('tabindex', '-1');
});

it('shows every role of the open company as "Role @ Company"', () => {
  renderSection();
  expect(
    within(panel())
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent),
  ).toEqual([
    'Senior Mobile Developer @ Nimbus Labs',
    'Mobile Developer @ Nimbus Labs',
  ]);
  expect(
    within(panel()).getByText('Mar 2025 – Present · 1 yr 8 mos'),
  ).toBeInTheDocument();
  expect(
    within(panel()).getByText('Mar 2024 – Feb 2025 · 1 yr'),
  ).toBeInTheDocument();
});

it('shows each point of the description with a check mark', () => {
  renderSection();
  const role = within(panel()).getAllByRole('article')[0];
  const points = within(role).getAllByRole('listitem');
  expect(points.map((point) => point.textContent)).toEqual([
    'Lead the React Native app.',
    'Rebuilt offline sync.',
  ]);
  points.forEach((point) =>
    expect(point.querySelector('svg')).toHaveAttribute('aria-hidden', 'true'),
  );
});

it('opens another company when its tab is clicked', async () => {
  renderSection();
  await userEvent.click(screen.getByRole('tab', { name: 'Kopi Digital' }));
  expect(selectedTab()).toHaveTextContent('Kopi Digital');
  expect(within(panel()).getByRole('heading', { level: 3 })).toHaveTextContent(
    'Fullstack Developer @ Kopi Digital',
  );
  expect(within(panel()).queryByText(/Nimbus Labs/)).not.toBeInTheDocument();
});

it('moves between tabs with the arrow, Home and End keys', async () => {
  renderSection();
  tabs()[0].focus();
  await userEvent.keyboard('{ArrowDown}');
  expect(selectedTab()).toHaveTextContent('Kopi Digital');
  expect(tabs()[1]).toHaveFocus();
  await userEvent.keyboard('{ArrowRight}');
  expect(selectedTab()).toHaveTextContent('Bright Studio');
  await userEvent.keyboard('{ArrowDown}');
  expect(selectedTab()).toHaveTextContent('Nimbus Labs');
  await userEvent.keyboard('{ArrowUp}');
  expect(selectedTab()).toHaveTextContent('Bright Studio');
  await userEvent.keyboard('{Home}');
  expect(selectedTab()).toHaveTextContent('Nimbus Labs');
  await userEvent.keyboard('{End}');
  expect(selectedTab()).toHaveTextContent('Bright Studio');
  expect(tabs()[2]).toHaveFocus();
});

it('opens the tab of the experience being edited in the preview', async () => {
  renderWithStore(<Harness preview />);
  expect(selectedTab()).toHaveTextContent('Kopi Digital');
  await userEvent.click(screen.getByRole('button', { name: 'edit bright' }));
  expect(selectedTab()).toHaveTextContent('Bright Studio');
});

it('keeps a valid tab open when the list gets shorter', async () => {
  renderWithStore(<Harness />);
  await userEvent.click(screen.getByRole('tab', { name: 'Bright Studio' }));
  await userEvent.click(screen.getByRole('button', { name: 'shrink' }));
  expect(tabs()).toHaveLength(2);
  expect(selectedTab()).toHaveTextContent('Kopi Digital');
});

it('shows only the heading when there is nothing to show', () => {
  renderWithStore(<ExperienceSection experiences={[]} />);
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  expect(screen.queryByText(/of building/)).not.toBeInTheDocument();
});

it('uses the smaller sizes in the preview', () => {
  renderSection({ preview: true });
  expect(screen.getByRole('heading', { level: 2 })).toHaveStyle({
    fontSize: '2rem',
  });
  expect(tabs()[0]).toHaveStyle({ fontSize: '0.95rem' });
  expect(screen.getByText(/of building/)).toHaveStyle({ fontSize: '0.92rem' });
});
