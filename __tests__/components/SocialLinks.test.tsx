import { screen } from '@testing-library/react';
import { SocialLinks } from '../../components';
import { renderWithStore } from '../test-utils';

const links = {
  facebookUrl: 'https://www.facebook.com/mathiuskormasela/',
  twitterUrl: 'https://twitter.com/Mathius87248424',
  youtubeUrl: 'https://www.youtube.com/@mathius',
};

it('links every social icon in a new tab', () => {
  renderWithStore(<SocialLinks links={links} />);
  [
    ['Facebook', links.facebookUrl],
    ['Twitter', links.twitterUrl],
    ['Youtube', links.youtubeUrl],
  ].forEach(([name, href]) => {
    const link = screen.getByRole('link', { name });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

it('hides an icon whose link is empty', () => {
  renderWithStore(<SocialLinks links={{ ...links, twitterUrl: '  ' }} />);
  expect(
    screen.queryByRole('link', { name: 'Twitter' }),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(2);
});

it('renders nothing when every link is empty', () => {
  const { container } = renderWithStore(
    <SocialLinks links={{ facebookUrl: '', twitterUrl: '', youtubeUrl: '' }} />,
  );
  expect(container).toBeEmptyDOMElement();
});

it('shows the icons without bullet points', () => {
  renderWithStore(<SocialLinks links={links} />);
  expect(screen.getByRole('list')).toHaveStyle({ listStyle: 'none' });
});
