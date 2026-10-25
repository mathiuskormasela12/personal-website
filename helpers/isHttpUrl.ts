export const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol, hostname } = new URL(value);
    return ['http:', 'https:'].includes(protocol) && hostname.includes('.');
  } catch {
    return false;
  }
};
