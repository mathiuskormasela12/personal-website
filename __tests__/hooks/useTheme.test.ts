import { act, renderHook } from '@testing-library/react';
import { useTheme } from '../../hooks/useTheme';
import { THEME_STORAGE_KEY } from '../../themes';

let systemListener: ((event: { matches: boolean }) => void) | null = null;

const mockSystem = (prefersDark: boolean) => {
  systemListener = null;
  window.matchMedia = jest.fn().mockReturnValue({
    matches: prefersDark,
    addEventListener: (_: string, listener: typeof systemListener) => {
      systemListener = listener;
    },
    removeEventListener: jest.fn(() => {
      systemListener = null;
    }),
  });
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.dataset.theme = 'light';
  mockSystem(false);
});

it('starts with the theme the page already has', () => {
  document.documentElement.dataset.theme = 'dark';
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('dark');
});

it('switches the page theme and remembers the choice', () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggleTheme());
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

  act(() => result.current.toggleTheme());
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
});

it('follows a change of the device setting while nothing is saved', () => {
  const { result } = renderHook(() => useTheme());
  act(() => systemListener?.({ matches: true }));
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
});

it('keeps the saved choice when the device setting changes', () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggleTheme());
  act(() => systemListener?.({ matches: false }));
  expect(result.current.theme).toBe('dark');
});

it('still switches when storage is blocked', () => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggleTheme());
  expect(result.current.theme).toBe('dark');
  jest.restoreAllMocks();
});

it('stops listening to the device setting after unmount', () => {
  const { unmount } = renderHook(() => useTheme());
  unmount();
  expect(systemListener).toBeNull();
});
