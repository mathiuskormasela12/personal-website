// Where the Next.js server listens. Owner rule: read PORT, bind 0.0.0.0,
// fall back to 8081 only when PORT is not set.
const DEFAULT_PORT = 8081;
const HOST = '0.0.0.0';

/** @param {Record<string, string | undefined>} env */
function getListenTarget(env = process.env) {
  const raw = (env.PORT ?? '').trim();
  if (raw === '') return { host: HOST, port: DEFAULT_PORT };

  const port = Number(raw);
  if (!/^\d+$/.test(raw) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT "${env.PORT}": expected an integer between 1 and 65535`);
  }
  return { host: HOST, port };
}

module.exports = { getListenTarget, DEFAULT_PORT, HOST };
