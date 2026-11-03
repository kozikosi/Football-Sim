#!/usr/bin/env node
// Compatibility shim (2 Nov 2026): the protocol moved to tools/council.mjs (_agents/COUNCIL.md). `next.mjs [--board]` still works.
import { spawnSync } from 'node:child_process';
const a = process.argv.slice(2), board = a.includes('--board');
const rest = a.filter((x) => x !== '--board');
const r = spawnSync(process.execPath, [new URL('./council.mjs', import.meta.url).pathname, board ? 'board' : 'next', ...rest], { stdio: 'inherit' });
process.exit(r.status ?? 1);
