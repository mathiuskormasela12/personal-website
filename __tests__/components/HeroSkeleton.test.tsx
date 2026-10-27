import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { screen } from '@testing-library/react';
import { HeroSkeleton } from '../../components';
import { renderWithStore } from '../test-utils';

const bars = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[aria-hidden="true"]')).filter(
    (element) => element.children.length === 0,
  );

it('tells screen readers that the hero is loading', () => {
  renderWithStore(<HeroSkeleton />);
  expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
});

it('has no heading and no button, so nothing can be clicked or read by mistake', () => {
  renderWithStore(<HeroSkeleton />);
  expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

it('draws two title lines, two subtitle lines and a button', () => {
  const { container } = renderWithStore(<HeroSkeleton />);
  expect(bars(container)).toHaveLength(5);
});

it('also draws the link line in the Edit Hero preview', () => {
  const { container } = renderWithStore(<HeroSkeleton preview />);
  expect(bars(container)).toHaveLength(6);
  expect(container.querySelector('[data-skeleton-link]')).toHaveStyle({
    fontSize: '0.85rem',
    marginTop: '0.8rem',
  });
});

it('uses the hero title and subtitle sizes, so the page does not jump', () => {
  const { container } = renderWithStore(<HeroSkeleton />);
  const [title, subtitle] = Array.from(
    container.querySelectorAll('[data-skeleton-text]'),
  );
  expect(title).toHaveStyle({ fontSize: '2.35rem', lineHeight: '1.2' });
  expect(subtitle).toHaveStyle({ fontSize: '1.08rem', lineHeight: '1.6' });
});

it('uses the smaller preview title size in the Edit Hero preview', () => {
  const { container } = renderWithStore(<HeroSkeleton preview />);
  const title = container.querySelector('[data-skeleton-text]') as Element;
  expect(title.tagName).toBe('H2');
  expect(title).toHaveAttribute('aria-hidden', 'true');
});

describe('how many lines it draws', () => {
  const css = () => {
    const sheet = new ServerStyleSheet();
    try {
      renderToString(sheet.collectStyles(<HeroSkeleton />));
      return sheet.getStyleTags().replace(/\s/g, '');
    } finally {
      sheet.seal();
    }
  };

  it('measures the title box by its own width', () => {
    expect(css()).toContain('container-type:inline-size;');
  });

  it('draws one title line when the title box is wide enough for it', () => {
    expect(css()).toMatch(
      /@container\(min-width:13\.25em\)\{\.[\w-]+\{display:none;\}\}/,
    );
  });

  it('always draws two subtitle lines, because the subtitle never fits on one', () => {
    expect(css().match(/\{display:none;\}/g)).toHaveLength(1);
  });

  it('does not hide a line by the screen width', () => {
    expect(css()).not.toMatch(/@media[^{]*\{\.[\w-]+\{display:none;\}\}/);
  });
});
