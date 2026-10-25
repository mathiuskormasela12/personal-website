import { Theme } from '../hooks/useTheme';

export interface IThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}
