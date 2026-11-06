import { screen, within } from '@testing-library/react';
import { ProjectContent } from '../../components/projectcontent/ProjectContent';
import { renderWithStore } from '../test-utils';

const props = {
  title: 'Kasir Warung',
  description: 'A point of sale app for small shops.',
  img: '/images/wkw.jpg',
  technologies: ['MySQL', 'Next Js'],
};

it('shows the title, the picture, the technology tags and the description in order', () => {
  const { container } = renderWithStore(<ProjectContent {...props} />);

  expect(
    screen.getByRole('heading', { level: 1, name: 'Kasir Warung' }),
  ).toBeInTheDocument();
  const tags = within(screen.getByRole('list')).getAllByRole('listitem');
  expect(tags.map((tag) => tag.textContent)).toEqual(['MySQL', 'Next Js']);

  const image = screen.getByAltText('Kasir Warung');
  const description = screen.getByText(props.description);
  const list = screen.getByRole('list');
  expect(
    image.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    list.compareDocumentPosition(description) &
      Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(container).toContainElement(description);
});

it('shows the picture whole, without cropping', () => {
  renderWithStore(<ProjectContent {...props} />);
  expect(screen.getByAltText('Kasir Warung')).toHaveStyle({
    objectFit: 'contain',
  });
});

it('shows an empty picture frame when there is no picture yet', () => {
  renderWithStore(<ProjectContent {...props} img={null} />);
  expect(screen.queryByAltText('Kasir Warung')).not.toBeInTheDocument();
  expect(screen.getByTestId('project-picture-empty')).toBeInTheDocument();
});

it('leaves out the tag list when there are no technologies', () => {
  renderWithStore(<ProjectContent {...props} technologies={[]} />);
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

it('uses a second-level heading in preview mode', () => {
  renderWithStore(<ProjectContent {...props} preview />);
  expect(
    screen.getByRole('heading', { level: 2, name: 'Kasir Warung' }),
  ).toBeInTheDocument();
});
