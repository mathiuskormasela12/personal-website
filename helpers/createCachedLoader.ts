export const createCachedLoader = <T>(
  fetchValue: () => Promise<T>,
  fallback: T,
) => {
  let request: Promise<T> | null = null;
  let cached: T | null = null;

  const fetchOnce = async (): Promise<T> => {
    try {
      cached = await fetchValue();
      return cached;
    } catch {
      request = null;
      return fallback;
    }
  };

  return {
    load: (): Promise<T> => {
      request = request ?? fetchOnce();
      return request;
    },
    getCached: (): T | null => cached,
    setCached: (value: T | null) => {
      cached = value;
      request = value ? Promise.resolve(value) : null;
    },
  };
};
