#!/usr/bin/env node
// Ruling Log — every Owner ruling that overrides an anchor, with the data available at the time
// Run: node ruling-log.mjs add "Ruling 1" "QB=1000, 50 increments" "2026-11-07" '["DEFAULT_WEIGHTS", "modelWeights()"]'
//       node ruling-log.mjs list
// Store: _agents/or/deliveries/ruling-log.json

import * as fs from 'node:fs';
import * as path from 'node:path';

const RLOG_PATH = path.join(new URL('.', import.meta.url).pathname, '../deliveries/ruling-log.json');

function load() {
  if (!fs.existsSync(RLOG_PATH)) return [];
  return JSON.parse(fs.readFileSync(RLOG_PATH, 'utf8'));
}

function save(r) {
  fs.writeFileSync(RLOG_PATH, JSON.stringify(r, null, 2));
}

function add(args) {
  const [title, dataAvailableAt, overridesJson, status] = args;
  if (!title || !dataAvailableAt || !overridesJson) {
    console.error('usage: add <title> <dataAvailableAt> <overridesJson> [status]');
    process.exit(2);
  }
  const overrides = JSON.parse(overridesJson);
  const r = load();
  const id = `R-${String(r.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();
  r.push({ id, title, dataAvailableAt, overrides, status: status || 'proposed', createdAt: now, updatedAt: now });
  save(r);
  console.log(`Added ${id}: ${title}`);
}

function list() {
  const r = load();
  if (r.length === 0) { console.log('(empty)'); return; }
  for (const x of r) {
    console.log(`${x.id} [${x.status}] ${x.title}`);
    console.log(`  data available: ${x.dataAvailableAt}`);
    console.log(`  overrides: ${x.overrides.join(', ')}`);
  }
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
switch (cmd) {
  case 'add': add(args); break;
  case 'list': list(); break;
  default: console.error('usage: ruling-log.mjs add|list ...'); process.exit(2);
}
