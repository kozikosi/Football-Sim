#!/usr/bin/env node
// Hypothesis Ledger — pre-registered experiments with predictions, controls, success criteria
// Run: node hypothesis-ledger.mjs add H-001 "T1: L1 validation detects >5% EPA gap" "control=real nflverse EPA; treatment=engine EPA" "p<0.05 on slot-wise KS test"
//       node hypothesis-ledger.mjs list
//       node hypothesis-ledger.mjs update H-001 --status running
//       node hypothesis-ledger.mjs update H-001 --status done --result "PASS: max gap 3.2%"
// Store: _agents/or/deliveries/hypothesis-ledger.json

import * as fs from 'node:fs';
import * as path from 'node:path';

const LEDGER_PATH = path.join(new URL('.', import.meta.url).pathname, '../deliveries/hypothesis-ledger.json');

function load() {
  if (!fs.existsSync(LEDGER_PATH)) return [];
  return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
}

function save(hypotheses) {
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(hypotheses, null, 2));
}

function add(args) {
  const [id, title, prediction, control, successCriteria] = args;
  if (!id || !title || !prediction || !control || !successCriteria) {
    console.error('usage: add <H-###> <title> <prediction> <control> <successCriteria>');
    process.exit(2);
  }
  const h = load();
  if (h.find(x => x.id === id)) {
    console.error(`id ${id} already exists`);
    process.exit(1);
  }
  const now = new Date().toISOString();
  h.push({ id, title, prediction, control, successCriteria, status: 'pending', createdAt: now, updatedAt: now });
  save(h);
  console.log(`Added ${id}: ${title}`);
}

function list() {
  const h = load();
  if (h.length === 0) { console.log('(empty)'); return; }
  for (const x of h) {
    console.log(`${x.id} [${x.status}] ${x.title}`);
    console.log(`  prediction: ${x.prediction}`);
    console.log(`  control: ${x.control}`);
    console.log(`  success: ${x.successCriteria}`);
    if (x.result) console.log(`  result: ${x.result}`);
  }
}

function update(args) {
  const id = args[0];
  if (!id) { console.error('usage: update <H-###> --status <s> [--result <r>]'); process.exit(2); }
  const h = load();
  const idx = h.findIndex(x => x.id === id);
  if (idx === -1) { console.error(`not found: ${id}`); process.exit(1); }
  const statusArg = args.find(a => a === '--status');
  const resultArg = args.find(a => a === '--result');
  if (statusArg) {
    const s = args[args.indexOf('--status') + 1];
    if (!['pending','running','done','failed','superseded'].includes(s)) {
      console.error('invalid status'); process.exit(1);
    }
    h[idx].status = s;
  }
  if (resultArg) {
    h[idx].result = args[args.indexOf('--result') + 1];
  }
  h[idx].updatedAt = new Date().toISOString();
  save(h);
  console.log(`Updated ${id}`);
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
switch (cmd) {
  case 'add': add(args); break;
  case 'list': list(); break;
  case 'update': update(args); break;
  default: console.error('usage: hypothesis-ledger.mjs add|list|update ...'); process.exit(2);
}
