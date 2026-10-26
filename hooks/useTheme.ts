import { useCallback, useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '../themes';

export type Theme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const readPageTheme = (): Theme =>
  typeof document !== 'undefined' &&
  document.documentElement.dataset.theme === 'dark'
    ? 'dark'
    : 'light';

const readSavedTheme = (): string | null => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(readPageTheme);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const handleChange = (event: { matches: boolean }) => {
      if (readSavedTheme() === null) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    applyTheme(next);
  };

  return { theme, toggleTheme };
};
