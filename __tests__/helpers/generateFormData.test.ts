import { generateFormData } from '../../helpers/generateFormData';

it('appends every property to a FormData', () => {
  const file = new File(['x'], 'shot.png', { type: 'image/png' });
  const form = generateFormData({ title: 'T', description: 'D', img: file });
  expect(form.get('title')).toBe('T');
  expect(form.get('description')).toBe('D');
  expect((form.get('img') as File).name).toBe('shot.png');
});
