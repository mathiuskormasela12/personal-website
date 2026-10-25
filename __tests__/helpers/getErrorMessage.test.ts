import { getErrorMessage } from '../../helpers';

it('reads the message of an API error body', () => {
  expect(
    getErrorMessage({ status: 400, success: false, message: 'Bad link' }),
  ).toBe('Bad link');
});

it('reads the message of an Error', () => {
  expect(getErrorMessage(new Error('Network Error'))).toBe('Network Error');
});

it.each([undefined, null, 'oops', {}, { message: 42 }, { message: '' }])(
  'falls back to a generic message for %p',
  (error) => {
    expect(getErrorMessage(error)).toBe('Something went wrong');
  },
);
