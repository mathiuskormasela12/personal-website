import React from 'react';
import { render } from '@testing-library/react';
import MyApp from '../../pages/_app';

jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const Page = () => <p>page</p>;

it('lets the page use the whole screen, notch area included', () => {
  render(<MyApp Component={Page} pageProps={{}} router={{} as never} />);
  const viewport = document.head.querySelector('meta[name="viewport"]');
  expect(viewport).toHaveAttribute(
    'content',
    'width=device-width, initial-scale=1, viewport-fit=cover',
  );
});
