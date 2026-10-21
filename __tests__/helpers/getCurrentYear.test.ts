import { getCurrentYear } from '../../helpers/getCurrentYear';

describe('getCurrentYear', () => {
  afterEach(() => jest.restoreAllMocks());

  it('formats an epoch timestamp as a four-digit year', () => {
    expect(getCurrentYear(new Date(2031, 5, 15).getTime())).toBe('2031');
  });

  it('defaults to Date.now()', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date(2027, 2, 1).getTime());
    expect(getCurrentYear()).toBe('2027');
    expect(Date.now).toHaveBeenCalled();
  });
});
