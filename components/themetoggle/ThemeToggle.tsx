import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { IThemeToggleProps } from '../../interfaces';
import * as Styled from './themetoggle.styled';

export const ThemeToggle: React.FC<IThemeToggleProps> = ({
  theme,
  onToggle,
}) => {
  const isDark = theme === 'dark';
  const Icon = isDark ? FiSun : FiMoon;

  return (
    <Styled.Button
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={onToggle}
    >
      <Icon size={18} aria-hidden />
    </Styled.Button>
  );
};
