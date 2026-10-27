const decodePayload = (token: string): Record<string, unknown> | null => {
  const parts = token.split('.');

  if (parts.length !== 3) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padding = (4 - (base64.length % 4)) % 4;
    return JSON.parse(atob(base64 + '='.repeat(padding)));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string, now = Date.now()): boolean => {
  const payload = token ? decodePayload(token) : null;

  if (!payload || typeof payload.exp !== 'number') {
    return true;
  }

  return payload.exp * 1000 <= now;
};

export const isSessionExpired = (
  accessToken: string,
  refreshToken: string,
  now = Date.now(),
): boolean =>
  (accessToken !== '' || refreshToken !== '') &&
  isTokenExpired(accessToken, now) &&
  isTokenExpired(refreshToken, now);
