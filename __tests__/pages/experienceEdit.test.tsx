import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import Services from '../../services';
import ExperienceEdit from '../../pages/experience-edit';
import { PROTECTED_PATHS } from '../../constants/PROTECTED_PATHS';
import {
  loadExperiences,
  setCachedExperiences,
} from '../../hooks/useExperiences';
import { renderWithStore } from '../test-utils';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('sweetalert2', () => ({
  __esModule: true,
  default: { fire: jest.fn() },
}));
jest.mock('../../services', () => ({
  __esModule: true,
  default: {
    getExperiences: jest.fn(),
    createExperience: jest.fn(),
    updateExperience: jest.fn(),
    deleteExperience: jest.fn(),
    getProfile: jest.fn(),
  },
}));

const loggedIn = { accessToken: 'a', refreshToken: 'r' };
const push = jest.fn();

const nimbus = {
  id: 2,
  company: 'Nimbus Labs',
  role: 'Senior Mobile Developer',
  startDate: '2025-03',
  endDate: null,
  description: ['Lead the React Native app.'],
};

const kopi = {
  id: 1,
  company: 'Kopi Digital',
  role: 'Fullstack Developer',
  startDate: '2022-06',
  endDate: '2024-02',
  description: ['Built dashboards.'],
};

const renderPage = (auth = loggedIn) =>
  renderWithStore(<ExperienceEdit />, { auth });

const waitForForm = () => screen.findByLabelText('Company');
const preview = () => screen.getByRole('region', { name: 'Preview' });
const list = () => screen.getByRole('list', { name: 'Your experience' });
const field = (label: string) => screen.getByLabelText(label);

const fillForm = async () => {
  await userEvent.type(field('Company'), 'Bright Studio');
  await userEvent.type(field('Role'), 'Junior Web Developer');
  await userEvent.type(field('Start date'), '2021-08');
  await userEvent.type(field('End date'), '2022-05');
  await userEvent.type(field('Description'), 'Built React pages.');
  await userEvent.click(screen.getByRole('button', { name: 'Add point' }));
  await userEvent.type(
    screen.getByLabelText('Point 2'),
    '  Owned the design system.  ',
  );
};

beforeEach(() => {
  setCachedExperiences(null);
  push.mockClear();
  (Swal.fire as jest.Mock).mockReset();
  (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false });
  (Services.createExperience as jest.Mock).mockReset();
  (Services.updateExperience as jest.Mock).mockReset();
  (Services.deleteExperience as jest.Mock).mockReset();
  (Services.getProfile as jest.Mock).mockRejectedValue(new Error('offline'));
  (Services.getExperiences as jest.Mock).mockResolvedValue({
    data: { results: [nimbus, kopi] },
  });
  (useRouter as jest.Mock).mockReturnValue({
    push,
    pathname: '/experience-edit',
    asPath: '/experience-edit',
    query: {},
  });
});

it('is a protected page', () => {
  expect(PROTECTED_PATHS).toContain('/experience-edit');
});

it('sends visitors who are not logged in to the login page', async () => {
  renderPage({ accessToken: '', refreshToken: '' });
  await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
});

it('shows a loading message until the list arrives', async () => {
  renderPage();
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitForForm();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

it('lists every saved experience with edit and delete buttons', async () => {
  renderPage();
  await waitForForm();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Edit Experience',
  );
  expect(within(list()).getAllByRole('listitem')).toHaveLength(2);
  expect(
    within(list()).getByText('Nimbus Labs · Mar 2025 — Present'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: 'Edit Senior Mobile Developer at Nimbus Labs',
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: 'Delete Fullstack Developer at Kopi Digital',
    }),
  ).toBeInTheDocument();
});

it('says so when there is no experience yet, and the preview explains the hidden section', async () => {
  (Services.getExperiences as jest.Mock).mockResolvedValue({
    data: { results: [] },
  });
  renderPage();
  await waitForForm();
  expect(
    screen.getByText('No experience yet. Add your first one below.'),
  ).toBeInTheDocument();
  expect(
    within(preview()).getByText(/stays hidden on your home page/),
  ).toBeInTheDocument();
});

it('shows the errors only after trying to save, and does not call the API', async () => {
  renderPage();
  await waitForForm();
  expect(
    screen.queryByText("The company name can't be empty"),
  ).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(
    screen.getByText("The company name can't be empty"),
  ).toBeInTheDocument();
  expect(screen.getByText('Pick the start month')).toBeInTheDocument();
  expect(Services.createExperience).not.toHaveBeenCalled();
});

it('adds a new experience, shows it in the list, and empties the form', async () => {
  const created = {
    id: 3,
    company: 'Bright Studio',
    role: 'Junior Web Developer',
    startDate: '2021-08',
    endDate: '2022-05',
    description: ['Built React pages.', 'Owned the design system.'],
  };
  (Services.createExperience as jest.Mock).mockResolvedValue({
    data: { message: 'The experience has been added', results: created },
  });
  renderPage();
  await waitForForm();
  await fillForm();
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));

  await waitFor(() =>
    expect(Services.createExperience).toHaveBeenCalledWith({
      company: 'Bright Studio',
      role: 'Junior Web Developer',
      startDate: '2021-08',
      endDate: '2022-05',
      description: ['Built React pages.', 'Owned the design system.'],
    }),
  );
  await waitFor(() =>
    expect(within(list()).getAllByRole('listitem')).toHaveLength(3),
  );
  expect(field('Company')).toHaveValue('');
  expect(Swal.fire).toHaveBeenCalledWith(
    expect.objectContaining({
      icon: 'success',
      text: 'The experience has been added',
    }),
  );
  await expect(loadExperiences()).resolves.toHaveLength(3);
});

it('shows the new experience in the preview while typing', async () => {
  renderPage();
  await waitForForm();
  await fillForm();
  expect(
    within(preview()).getByRole('tab', { name: 'Bright Studio' }),
  ).toHaveAttribute('aria-selected', 'true');
  expect(
    within(preview()).getByRole('heading', { level: 3 }),
  ).toHaveTextContent('Junior Web Developer @ Bright Studio');
  expect(
    within(preview())
      .getAllByRole('listitem')
      .map((point) => point.textContent),
  ).toEqual(['Built React pages.', 'Owned the design system.']);
});

it('updates the total in the preview while typing', async () => {
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
  try {
    renderPage();
    await waitForForm();
    expect(within(preview()).getByText('3 years 5 months')).toBeInTheDocument();
    expect(
      within(preview()).getByText(/across 2 companies\./),
    ).toBeInTheDocument();
    await fillForm();
    expect(within(preview()).getByText('4 years 3 months')).toBeInTheDocument();
    expect(
      within(preview()).getByText(/across 3 companies\./),
    ).toBeInTheDocument();
  } finally {
    jest.useRealTimers();
  }
});

it('does not show empty points in the preview', async () => {
  renderPage();
  await waitForForm();
  await fillForm();
  await userEvent.click(screen.getByRole('button', { name: 'Add point' }));
  expect(within(preview()).getAllByRole('listitem')).toHaveLength(2);
});

it('shows an error under the empty point when saving', async () => {
  renderPage();
  await waitForForm();
  await fillForm();
  await userEvent.click(screen.getByRole('button', { name: 'Add point' }));
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(screen.getByText("A point can't be empty")).toBeInTheDocument();
  expect(screen.getByLabelText('Point 3')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  expect(Services.createExperience).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: 'Remove point 3' }));
  expect(screen.queryByText("A point can't be empty")).not.toBeInTheDocument();
});

it('fills the form to edit, marks the row, and saves the changes', async () => {
  (Services.updateExperience as jest.Mock).mockResolvedValue({
    data: {
      message: 'The experience has been updated',
      results: { ...kopi, role: 'Lead Developer' },
    },
  });
  renderPage();
  await waitForForm();
  await userEvent.click(
    screen.getByRole('button', {
      name: 'Edit Fullstack Developer at Kopi Digital',
    }),
  );
  expect(field('Company')).toHaveValue('Kopi Digital');
  expect(field('Start date')).toHaveValue('2022-06');
  expect(within(list()).getByText('Editing')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();

  await userEvent.clear(field('Role'));
  await userEvent.type(field('Role'), 'Lead Developer');
  expect(within(preview()).getByText('Lead Developer')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Save changes' }));

  await waitFor(() =>
    expect(Services.updateExperience).toHaveBeenCalledWith(1, {
      company: 'Kopi Digital',
      role: 'Lead Developer',
      startDate: '2022-06',
      endDate: '2024-02',
      description: ['Built dashboards.'],
    }),
  );
  await waitFor(() =>
    expect(within(list()).getByText('Lead Developer')).toBeInTheDocument(),
  );
  expect(within(list()).queryByText('Editing')).not.toBeInTheDocument();
});

it('cancel stops editing and empties the form', async () => {
  renderPage();
  await waitForForm();
  await userEvent.click(
    screen.getByRole('button', {
      name: 'Edit Fullstack Developer at Kopi Digital',
    }),
  );
  await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(field('Company')).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
});

it('"I currently work here" turns the end date into Present', async () => {
  renderPage();
  await waitForForm();
  await userEvent.click(screen.getByLabelText('I currently work here'));
  expect(field('End date')).toBeDisabled();
  expect(field('End date')).toHaveValue('Present');
  await userEvent.click(screen.getByLabelText('I currently work here'));
  expect(field('End date')).toBeEnabled();
  expect(field('End date')).toHaveValue('');
});

it('asks before deleting, and does nothing when cancelled', async () => {
  renderPage();
  await waitForForm();
  await userEvent.click(
    screen.getByRole('button', {
      name: 'Delete Fullstack Developer at Kopi Digital',
    }),
  );
  expect(Swal.fire).toHaveBeenCalledWith(
    expect.objectContaining({
      title: 'Delete this experience?',
      text: '"Fullstack Developer at Kopi Digital" will be removed from your website. This can\'t be undone.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }),
  );
  expect(Services.deleteExperience).not.toHaveBeenCalled();
  expect(within(list()).getAllByRole('listitem')).toHaveLength(2);
});

it('deletes after confirming and removes the row', async () => {
  (Swal.fire as jest.Mock).mockResolvedValueOnce({ isConfirmed: true });
  (Services.deleteExperience as jest.Mock).mockResolvedValue({
    data: { message: 'The experience has been deleted' },
  });
  renderPage();
  await waitForForm();
  await userEvent.click(
    screen.getByRole('button', {
      name: 'Delete Fullstack Developer at Kopi Digital',
    }),
  );
  await waitFor(() =>
    expect(Services.deleteExperience).toHaveBeenCalledWith(1),
  );
  await waitFor(() =>
    expect(within(list()).getAllByRole('listitem')).toHaveLength(1),
  );
});

it('shows the API error when saving fails', async () => {
  (Services.createExperience as jest.Mock).mockRejectedValue({
    message: "The end date can't be in the future",
  });
  renderPage();
  await waitForForm();
  await fillForm();
  await userEvent.click(screen.getByRole('button', { name: 'Add' }));
  await waitFor(() =>
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'error', title: 'Failed' }),
    ),
  );
  expect(field('Company')).toHaveValue('Bright Studio');
});
