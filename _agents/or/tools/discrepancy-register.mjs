#!/usr/bin/env node
// Discrepancy Register — engine-vs-NFL disagreements with suspected cause and status
// Run: node discrepancy-register.mjs add "WR1 EPA 18% high" "slotWins overweights WR1" "open"
//       node discrepancy-register.mjs list
//       node discrepancy-register.mjs close D-001 "resolved: slotWins recalibrated"
// Store: _agents/or/deliveries/discrepancy-register.json

import * as fs from 'node:fs';
import * as path from 'node:path';

const REG_PATH = path.join(new URL('.', import.meta.url).pathname, '../deliveries/discrepancy-register.json');

function load() {
  if (!fs.existsSync(REG_PATH)) return [];
  return JSON.parse(fs.readFileSync(REG_PATH, 'utf8'));
}

function save(d) {
  fs.writeFileSync(REG_PATH, JSON.stringify(d, null, 2));
}

function add(args) {
  const [claim, suspectedCause, status] = args;
  if (!claim || !suspectedCause) { console.error('usage: add <claim> <suspectedCause> [open|investigating|resolved|rejected]'); process.exit(2); }
  const d = load();
  const id = `D-${String(d.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();
  d.push({ id, claim, suspectedCause, status: (status || 'open'), createdAt: now, updatedAt: now });
  save(d);
  console.log(`Added ${id}: ${claim}`);
}

function list() {
  const d = load();
  if (d.length === 0) { console.log('(empty)'); return; }
  for (const x of d) {
    console.log(`${x.id} [${x.status}] ${x.claim}`);
    console.log(`  suspected: ${x.suspectedCause}`);
    if (x.resolution) console.log(`  resolution: ${x.resolution}`);
  }
}

function close(args) {
  const [id, resolution] = args;
  if (!id || !resolution) { console.error('usage: close <D-###> <resolution>'); process.exit(2); }
  const d = load();
  const idx = d.findIndex(x => x.id === id);
  if (idx === -1) { console.error(`not found: ${id}`); process.exit(1); }
  d[idx].status = 'resolved';
  d[idx].resolution = resolution;
  d[idx].updatedAt = new Date().toISOString();
  save(d);
  console.log(`Closed ${id}`);
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
switch (cmd) {
  case 'add': add(args); break;
  case 'list': list(); break;
  case 'close': close(args); break;
  default: console.error('usage: discrepancy-register.mjs add|list|close ...'); process.exit(2);
}
