import { createCachedLoader } from '../../helpers';

const FALLBACK = { name: 'fallback' };

const makeLoader = (fetchValue: jest.Mock) =>
  createCachedLoader(fetchValue, FALLBACK);

it('has nothing cached before the first load', () => {
  const loader = makeLoader(jest.fn());
  expect(loader.getCached()).toBeNull();
});

it('loads the value and keeps it in memory', async () => {
  const fetchValue = jest.fn().mockResolvedValue({ name: 'saved' });
  const loader = makeLoader(fetchValue);
  await expect(loader.load()).resolves.toEqual({ name: 'saved' });
  expect(loader.getCached()).toEqual({ name: 'saved' });
  await expect(loader.load()).resolves.toEqual({ name: 'saved' });
  expect(fetchValue).toHaveBeenCalledTimes(1);
});

it('shares one request while it is still loading', async () => {
  const fetchValue = jest.fn().mockResolvedValue({ name: 'saved' });
  const loader = makeLoader(fetchValue);
  const [first, second] = await Promise.all([loader.load(), loader.load()]);
  expect(first).toBe(second);
  expect(fetchValue).toHaveBeenCalledTimes(1);
});

it('gives the fallback when loading fails, and tries again next time', async () => {
  const fetchValue = jest
    .fn()
    .mockRejectedValueOnce(new Error('Network Error'))
    .mockResolvedValueOnce({ name: 'saved' });
  const loader = makeLoader(fetchValue);
  await expect(loader.load()).resolves.toBe(FALLBACK);
  expect(loader.getCached()).toBeNull();
  await expect(loader.load()).resolves.toEqual({ name: 'saved' });
  expect(fetchValue).toHaveBeenCalledTimes(2);
});

it('gives the fallback when the fetch throws right away', async () => {
  const loader = makeLoader(
    jest.fn(() => {
      throw new Error('boom');
    }),
  );
  await expect(loader.load()).resolves.toBe(FALLBACK);
});

it('lets a saved value replace the cache without a new request', async () => {
  const fetchValue = jest.fn();
  const loader = makeLoader(fetchValue);
  loader.setCached({ name: 'edited' });
  expect(loader.getCached()).toEqual({ name: 'edited' });
  await expect(loader.load()).resolves.toEqual({ name: 'edited' });
  expect(fetchValue).not.toHaveBeenCalled();
});

it('forgets the value when the cache is cleared', async () => {
  const fetchValue = jest.fn().mockResolvedValue({ name: 'fresh' });
  const loader = makeLoader(fetchValue);
  loader.setCached({ name: 'old' });
  loader.setCached(null);
  expect(loader.getCached()).toBeNull();
  await expect(loader.load()).resolves.toEqual({ name: 'fresh' });
  expect(fetchValue).toHaveBeenCalledTimes(1);
});

it('keeps each loader separate', async () => {
  const first = makeLoader(jest.fn().mockResolvedValue({ name: 'one' }));
  const second = makeLoader(jest.fn().mockResolvedValue({ name: 'two' }));
  await first.load();
  expect(second.getCached()).toBeNull();
});
