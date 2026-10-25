import { renderHook, waitFor } from '@testing-library/react';
import Services from '../../services';
import { PROFILE_DEFAULTS } from '../../constants';
import {
  loadProfile,
  setCachedProfile,
  useProfile,
} from '../../hooks/useProfile';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getProfile: jest.fn() },
}));

const saved = {
  skills: ['React', 'Docker'],
  skillsDescription: 'Mostly TypeScript.',
  facebookUrl: '',
  twitterUrl: '',
  youtubeUrl: 'https://www.youtube.com/@mathius',
};

const getProfile = Services.getProfile as jest.Mock;

beforeEach(() => {
  setCachedProfile(null);
  getProfile.mockReset();
});

it('shows the defaults first, then the profile from the API', async () => {
  getProfile.mockResolvedValue({ data: { results: saved } });
  const { result } = renderHook(() => useProfile());
  expect(result.current).toBe(PROFILE_DEFAULTS);
  await waitFor(() => expect(result.current).toEqual(saved));
});

it('shares one request between every component that needs the profile', async () => {
  getProfile.mockResolvedValue({ data: { results: saved } });
  const first = renderHook(() => useProfile());
  const second = renderHook(() => useProfile());
  await waitFor(() => expect(first.result.current).toEqual(saved));
  await waitFor(() => expect(second.result.current).toEqual(saved));
  expect(getProfile).toHaveBeenCalledTimes(1);
});

it('keeps the defaults when the API fails, and tries again next time', async () => {
  getProfile.mockRejectedValueOnce(new Error('Network Error'));
  await expect(loadProfile()).resolves.toBe(PROFILE_DEFAULTS);

  getProfile.mockResolvedValueOnce({ data: { results: saved } });
  await expect(loadProfile()).resolves.toEqual(saved);
  expect(getProfile).toHaveBeenCalledTimes(2);
});

it('keeps the defaults when the service throws right away', async () => {
  getProfile.mockImplementation(() => {
    throw new Error('boom');
  });
  await expect(loadProfile()).resolves.toBe(PROFILE_DEFAULTS);
});

it('shows a profile that is already loaded on the very first render', async () => {
  getProfile.mockResolvedValue({ data: { results: saved } });
  await loadProfile();
  const { result } = renderHook(() => useProfile());
  expect(result.current).toEqual(saved);
});

it('shows a saved profile on the very first render', () => {
  setCachedProfile(saved);
  const { result } = renderHook(() => useProfile());
  expect(result.current).toEqual(saved);
});

it('uses a saved profile without a new request', async () => {
  setCachedProfile(saved);
  const { result } = renderHook(() => useProfile());
  await waitFor(() => expect(result.current).toEqual(saved));
  expect(getProfile).not.toHaveBeenCalled();
});

it('does not update after the component is gone', async () => {
  let resolve: (value: unknown) => void = () => {};
  getProfile.mockReturnValue(new Promise((done) => (resolve = done)));
  const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { unmount } = renderHook(() => useProfile());
  unmount();
  resolve({ data: { results: saved } });
  await loadProfile();
  expect(errors).not.toHaveBeenCalled();
  errors.mockRestore();
});
