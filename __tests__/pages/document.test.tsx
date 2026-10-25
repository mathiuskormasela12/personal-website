import React from 'react';
import { render } from '@testing-library/react';
import Document from '../../pages/_document';
import { THEME_INIT_SCRIPT } from '../../themes';

jest.mock('next/document', () => ({
  Html: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Head: ({ children }: { children: React.ReactNode }) => (
    <section data-testid="head">{children}</section>
  ),
  Main: () => <main />,
  NextScript: () => null,
}));

it('picks the theme in the head, before the page is painted', () => {
  const { getByTestId } = render(<Document />);
  const script = getByTestId('head').querySelector('script');
  expect(script?.innerHTML).toBe(THEME_INIT_SCRIPT);
});
