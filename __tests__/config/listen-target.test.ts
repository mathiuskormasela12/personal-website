import { getListenTarget, DEFAULT_PORT } from '../../config/listen-target';

describe('getListenTarget', () => {
  it('binds 0.0.0.0:8081 when PORT is unset', () => {
    expect(DEFAULT_PORT).toBe(8081);
    expect(getListenTarget({})).toEqual({ host: '0.0.0.0', port: 8081 });
  });

  it('treats a blank PORT as unset', () => {
    expect(getListenTarget({ PORT: '  ' })).toEqual({
      host: '0.0.0.0',
      port: 8081,
    });
  });

  it('uses PORT when it is set', () => {
    expect(getListenTarget({ PORT: '3005' })).toEqual({
      host: '0.0.0.0',
      port: 3005,
    });
  });

  it.each(['abc', '0', '70000', '12.5', '-1'])(
    'rejects invalid PORT %p',
    (value) => {
      expect(() => getListenTarget({ PORT: value })).toThrow(/Invalid PORT/);
    },
  );
});
