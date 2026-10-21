// next/image remotePatterns: localhost on any port/protocol (what `domains: ['localhost']` allowed)
// plus the API host, because personal-website-api serves uploaded images from its root.

/** @param {string | undefined} apiUrl */
function getImageRemotePatterns(apiUrl) {
  const patterns = [{ hostname: 'localhost' }];
  if (apiUrl) {
    const url = new URL(apiUrl);
    patterns.push({
      protocol: url.protocol.replace(':', ''),
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: '/**',
    });
  }
  return patterns;
}

module.exports = { getImageRemotePatterns };
