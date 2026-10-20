import { getImageRemotePatterns } from '../../config/image-remote-patterns';

describe('getImageRemotePatterns', () => {
  it('allows localhost on any port and protocol (old images.domains behaviour)', () => {
    expect(getImageRemotePatterns(undefined)).toEqual([{ hostname: 'localhost' }]);
  });

  it('adds the API host with protocol and port', () => {
    expect(getImageRemotePatterns('http://192.168.8.6:9000')).toEqual([
      { hostname: 'localhost' },
      { protocol: 'http', hostname: '192.168.8.6', port: '9000', pathname: '/**' },
    ]);
  });

  it('omits the port when the API URL has none', () => {
    expect(getImageRemotePatterns('https://api.example.com/v1')[1]).toEqual(
      { protocol: 'https', hostname: 'api.example.com', pathname: '/**' },
    );
  });

  it('throws on a malformed API URL', () => {
    expect(() => getImageRemotePatterns('not a url')).toThrow();
  });
});
