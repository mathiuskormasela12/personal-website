import { shouldForwardProp } from '../../styles/shouldForwardProp';

describe('shouldForwardProp', () => {
  it('drops styling props on HTML elements', () => {
    expect(shouldForwardProp('rounded', 'button')).toBe(false);
    expect(shouldForwardProp('invalidMessage', 'input')).toBe(false);
  });
  it('keeps real HTML attributes', () => {
    expect(shouldForwardProp('onClick', 'button')).toBe(true);
    expect(shouldForwardProp('href', 'a')).toBe(true);
  });
  it('forwards everything to components', () => {
    expect(shouldForwardProp('rounded', () => null)).toBe(true);
  });
});
