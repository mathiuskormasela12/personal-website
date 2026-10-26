import { execFileSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import path from 'path';
import { getCountries } from 'libphonenumber-js/min';

const root = path.join(__dirname, '..', '..');
const flagsDir = path.join(root, 'public', 'flags');
const runScript = () =>
  execFileSync('node', [path.join(root, 'scripts', 'copy-flags.js')], {
    cwd: root,
  });

it('copies a flag for every country the phone input offers', () => {
  rmSync(flagsDir, { recursive: true, force: true });
  runScript();
  const missing = getCountries().filter(
    (country) => !existsSync(path.join(flagsDir, `${country}.svg`)),
  );
  expect(missing).toEqual([]);
  expect(readFileSync(path.join(flagsDir, 'ID.svg'), 'utf8')).toContain('<svg');
});

it('can run again over an existing folder', () => {
  runScript();
  expect(() => runScript()).not.toThrow();
});

it('runs before dev and before build, and the copies stay out of git', () => {
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
  expect(pkg.scripts.predev).toBe('node scripts/copy-flags.js');
  expect(pkg.scripts.prebuild).toBe('node scripts/copy-flags.js');
  expect(readFileSync(path.join(root, '.gitignore'), 'utf8')).toMatch(
    /^\/public\/flags$/m,
  );
});
