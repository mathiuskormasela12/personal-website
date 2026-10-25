const fs = require('fs');
const path = require('path');

const source = path.join(
  path.dirname(require.resolve('country-flag-icons')),
  '3x2',
);
const target = path.join(__dirname, '..', 'public', 'flags');

fs.mkdirSync(target, { recursive: true });

fs.readdirSync(source)
  .filter((file) => file.endsWith('.svg'))
  .forEach((file) =>
    fs.copyFileSync(path.join(source, file), path.join(target, file)),
  );
