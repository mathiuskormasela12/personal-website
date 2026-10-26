import { LIGHT_TOKENS } from './ThemeTokens';

type ColorName = keyof typeof LIGHT_TOKENS;

const toVariable = (name: string) =>
  `var(--color-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)})`;

export const Colors = Object.fromEntries(
  Object.keys(LIGHT_TOKENS).map((name) => [name, toVariable(name)]),
) as Record<ColorName, string>;
