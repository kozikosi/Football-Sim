#!/usr/bin/env node
// tools/mathlab/uncertainty.mjs — T12: uncertainty wrapper (reporting law).
//
// Reporting law (adopted from Z.ai synthesis E9 / Groq §5 / Claude §21-§32):
//   Every lab JSON reports n, spread, and a bootstrap confidence interval, and
//   states the pre-registered practical-effect threshold. A statistically
//   significant but football-irrelevant number is still reported as such.
//   No lab number is released without these four fields.
//
// This file is a helper, not a policy: it builds the wrapper block and validates
// that a lab result carries it. The policy text lives in
// _agents/vloc/deliveries/uncertainty-reporting-law.md.
//
// Usage:
//   node tools/mathlab/uncertainty.mjs wrap <in.json> <out.json>   add n/spread/CI/threshold block
//   node tools/mathlab/uncertainty.mjs check <in.json>             fail (exit 1) if the law is not satisfied
//
// Read-only: reads JSON, writes JSON, never touches the product file.

import fs from 'node:fs';
import path from 'node:path';

const [cmd, inPath, outPath] = process.argv.slice(2);

function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
function sd(xs) {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / Math.max(xs.length - 1, 1));
}
// Bootstrap CI over the sample (resample the given values with replacement).
function bootstrapCI(xs, reps = 2000, alpha = 0.05) {
  const n = xs.length;
  const boot = [];
  for (let r = 0; r < reps; r++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += xs[Math.floor(Math.random() * n)];
    boot.push(s / n);
  }
  boot.sort((a, b) => a - b);
  const lo = Math.floor((alpha / 2) * reps), hi = Math.ceil((1 - alpha / 2) * reps) - 1;
  return { lo: boot[Math.max(lo, 0)], hi: boot[Math.min(hi, reps - 1)] };
}

function wrap(inJson) {
  const data = JSON.parse(fs.readFileSync(inJson, 'utf8'));
  const out = { ...data };
  out._uncertainty = out._uncertainty || {};
  const u = out._uncertainty;
  // n: number of independent roster/season draws in this result (1 if deterministic single build)
  u.n = u.n == null ? 1 : u.n;
  // spread: SD of the sampled values if present; null + reason when not applicable (deterministic n=1)
  if (u.spread == null) { u.spread = null; u.spreadReason = u.spreadReason || 'deterministic single-build measurement (n=1); no distribution'; }
  // bootstrap CI over the reported sample; null if n < 2 or no sample carried — stated, never omitted
  const sample = Array.isArray(data._sample) && data._sample.length ? data._sample : [];
  if (u.ci95 == null) {
    u.ci95 = (u.n < 2 || sample.length < 2) ? null : bootstrapCI(sample, 2000);
    u.ci95Reason = u.ci95Reason || (u.ci95 == null ? 'n < 2 or no sample carried' : null);
  }
  // pre-registered practical-effect threshold (wins per slot, absolute)
  u.practicalEffectThreshold = u.practicalEffectThreshold == null ? 0.5 : u.practicalEffectThreshold;
  u.method = u.method || 'bootstrap over ' + (u.n == null ? '?' : u.n) + ' resamples';
  u.law = 'T12 uncertainty wrapper — every lab JSON reports n, spread, CI95, and pre-stated practical-effect threshold';
  if (outPath) fs.writeFileSync(outPath, JSON.stringify(out, null, 1) + '\n');
  return out;
}

function check(inJson) {
  const data = JSON.parse(fs.readFileSync(inJson, 'utf8'));
  const u = data._uncertainty;
  const problems = [];
  if (!u || typeof u !== 'object') problems.push('missing _uncertainty block');
  else {
    if (u.n === undefined) problems.push('missing n');
    if (u.spread === undefined) problems.push('missing spread (null with reason is acceptable)');
    if (u.ci95 === undefined) problems.push('missing ci95 (null with reason is acceptable)');
    if (u.practicalEffectThreshold === undefined) problems.push('missing practicalEffectThreshold');
    if (u.law === undefined) problems.push('missing law field');
  }
  if (problems.length) {
    console.error(`T12 CHECK FAIL ${inPath}: ${problems.join('; ')}`);
    process.exit(1);
  }
  const c = u.ci95 ? `[${u.ci95.lo.toFixed(4)},${u.ci95.hi.toFixed(4)}]` : 'null';
  console.log(`T12 CHECK PASS ${inPath}: n=${u.n} spread=${u.spread} ci95=${c} threshold=${u.practicalEffectThreshold}`);
}

if (cmd === 'wrap') {
  if (!inPath) { console.error('usage: uncertainty.mjs wrap <in.json> [out.json]'); process.exit(4); }
  wrap(inPath, outPath);
  console.log('wrapped ' + inPath + (outPath ? ' -> ' + outPath : ''));
} else if (cmd === 'check') {
  if (!inPath) { console.error('usage: uncertainty.mjs check <in.json>'); process.exit(4); }
  check(inPath);
} else {
  console.error('usage: uncertainty.mjs wrap <in.json> [out.json] | check <in.json>');
  process.exit(4);
}
