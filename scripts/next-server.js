#!/usr/bin/env node
// `yarn dev` / `yarn start`: run Next on the host/port from config/listen-target.js.
const { spawn } = require('node:child_process');
const { getListenTarget } = require('../config/listen-target');

const mode = process.argv[2];
if (mode !== 'dev' && mode !== 'start') {
  console.error('Usage: node scripts/next-server.js <dev|start>');
  process.exit(1);
}

const { host, port } = getListenTarget();
const nextBin = require.resolve('next/dist/bin/next');
const child = spawn(process.execPath, [nextBin, mode, '--hostname', host, '--port', String(port)], { stdio: 'inherit' });

['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, () => child.kill(signal)));
child.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
