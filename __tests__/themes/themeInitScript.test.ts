import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from '../../themes';

const runScript = ({
  saved,
  prefersDark,
  storageFails = false,
}: {
  saved: string | null;
  prefersDark: boolean;
  storageFails?: boolean;
}) => {
  delete document.documentElement.dataset.theme;
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (storageFails) {
      throw new Error('blocked');
    }
    return key === THEME_STORAGE_KEY ? saved : null;
  });
  window.matchMedia = jest.fn().mockReturnValue({ matches: prefersDark });
  new Function(THEME_INIT_SCRIPT)();
  return document.documentElement.dataset.theme;
};

afterEach(() => jest.restoreAllMocks());

it('follows the device setting on the first visit', () => {
  expect(runScript({ saved: null, prefersDark: true })).toBe('dark');
  expect(runScript({ saved: null, prefersDark: false })).toBe('light');
});

it('uses the choice the visitor saved before', () => {
  expect(runScript({ saved: 'light', prefersDark: true })).toBe('light');
  expect(runScript({ saved: 'dark', prefersDark: false })).toBe('dark');
});

it('ignores a broken saved value', () => {
  expect(runScript({ saved: 'purple', prefersDark: true })).toBe('dark');
});

it('still picks a theme when storage is blocked', () => {
  expect(
    runScript({ saved: null, prefersDark: false, storageFails: true }),
  ).toBe('light');
});

it('is small enough to inline in every page', () => {
  expect(THEME_INIT_SCRIPT.length).toBeLessThan(400);
});

it('reads the same storage key that the theme switch writes', () => {
  expect(THEME_STORAGE_KEY).toBe('theme');
  expect(THEME_INIT_SCRIPT).toContain(`'${THEME_STORAGE_KEY}'`);
});
