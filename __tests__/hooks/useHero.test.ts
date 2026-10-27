import { renderHook, waitFor } from '@testing-library/react';
import Services from '../../services';
import { HERO_DEFAULTS } from '../../constants';
import { loadHero, setCachedHero, useHero } from '../../hooks/useHero';

jest.mock('../../services', () => ({
  __esModule: true,
  default: { getHero: jest.fn() },
}));

const saved = {
  titlePrefix: 'Hello,',
  titleHighlight: 'a Mobile Developer',
  titleSuffix: '!',
  subtitle: 'I build apps.',
  buttonText: 'GitHub',
  buttonUrl: 'https://github.com/mathius',
};

const getHero = Services.getHero as jest.Mock;

beforeEach(() => {
  setCachedHero(null);
  getHero.mockReset();
});

it('has no hero on the first visit, then the hero from the API', async () => {
  getHero.mockResolvedValue({ data: { results: saved } });
  const { result } = renderHook(() => useHero());
  expect(result.current).toBeNull();
  await waitFor(() => expect(result.current).toEqual(saved));
});

it('shows the hero at once on the next visit, without a new request', async () => {
  getHero.mockResolvedValue({ data: { results: saved } });
  await loadHero();
  const { result } = renderHook(() => useHero());
  expect(result.current).toEqual(saved);
  expect(getHero).toHaveBeenCalledTimes(1);
});

it('shares one request between every component that needs the hero', async () => {
  getHero.mockResolvedValue({ data: { results: saved } });
  const first = renderHook(() => useHero());
  const second = renderHook(() => useHero());
  await waitFor(() => expect(first.result.current).toEqual(saved));
  await waitFor(() => expect(second.result.current).toEqual(saved));
  expect(getHero).toHaveBeenCalledTimes(1);
});

it('uses the default texts when the API fails', async () => {
  getHero.mockRejectedValue(new Error('Network Error'));
  const { result } = renderHook(() => useHero());
  await waitFor(() => expect(result.current).toBe(HERO_DEFAULTS));
});

it('fills a missing text with its default', async () => {
  const { subtitle, ...withoutSubtitle } = saved;
  getHero.mockResolvedValue({ data: { results: withoutSubtitle } });
  await expect(loadHero()).resolves.toEqual({
    ...saved,
    subtitle: HERO_DEFAULTS.subtitle,
  });
  expect(subtitle).not.toBe(HERO_DEFAULTS.subtitle);
});

it('shows the saved hero right away after an edit', () => {
  setCachedHero(saved);
  const { result } = renderHook(() => useHero());
  expect(result.current).toEqual(saved);
  expect(getHero).not.toHaveBeenCalled();
});

it('does not update after the component is gone', async () => {
  let finish: (value: unknown) => void = () => {};
  getHero.mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    }),
  );
  const errors = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { unmount } = renderHook(() => useHero());
  unmount();
  finish({ data: { results: saved } });
  await loadHero();
  expect(errors).not.toHaveBeenCalled();
  errors.mockRestore();
});
