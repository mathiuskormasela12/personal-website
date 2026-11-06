export const parseTechnologyNames = (text: string): string[] =>
  text
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
