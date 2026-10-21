import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../../components';
import { renderWithStore } from '../test-utils';

it('renders title, image, upper-cased badges and a 100-char description', async () => {
  const onClick = jest.fn();
  const description = 'x'.repeat(120);
  renderWithStore(
    <Card
      title="My Project"
      description={description}
      img="/images/wkw.jpg"
      technologies={[{ id: 1, name: 'react', variant: 'primary' }]}
      onClick={onClick}
    />,
  );
  expect(screen.getByText('My Project')).toBeInTheDocument();
  expect(screen.getByAltText('My Project')).toBeInTheDocument();
  expect(screen.getByText('REACT')).toBeInTheDocument();
  expect(screen.getByText(`${'x'.repeat(100)}...`)).toBeInTheDocument();
  await userEvent.click(screen.getByText('My Project'));
  expect(onClick).toHaveBeenCalled();
});
