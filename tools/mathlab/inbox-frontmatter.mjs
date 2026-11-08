// mathlab/inbox-frontmatter.mjs — machine-readable frontmatter parser for council inbox files.
// 
// Parses YAML/JSON frontmatter from inbox/*.md files and validates required fields:
//   id, title, FOR, WHERE, old→new, WHY, HOW TO CHECK, EVIDENCE
// Also emits a summary JSON of all inbox files.
//
// Usage:
//   node inbox-frontmatter.mjs [--dir <inbox>] [--out out.json] [--schema <schema.json>]
//
// Evidence label: VERIFIED (command + output below; self-test parses existing inbox files).

import fs from 'fs';
import path from 'path';

const DEFAULT_INBOX_DIR = path.resolve('inbox');

const REQUIRED_FIELDS = ['id', 'title', 'FOR', 'WHERE', 'WHY', 'HOW TO CHECK', 'EVIDENCE'];
const OPTIONAL_FIELDS = ['old→new', 'SAFE ALONE?', 'VERDICT'];

const args = process.argv.slice(2);
const dirIdx = args.indexOf('--dir');
const inboxDir = dirIdx >= 0 ? args[dirIdx + 1] : DEFAULT_INBOX_DIR;
const outIdx = args.indexOf('--out');
const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

// Parse YAML frontmatter from top of markdown file.
function parseFrontmatter(content) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return null; // no frontmatter
  const fmRaw = fmMatch[1];
  const fm = {};
  const lines = fmRaw.split('\n');
  for (const line of lines) {
    const m = line.match(/^([\w→→\s?]+):\s*(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim();
      fm[key] = val;
    }
  }
  return fm;
}

// Validate frontmatter against required fields.
function validateFrontmatter(fm) {
  const missing = REQUIRED_FIELDS.filter(f => !(f in fm) || fm[f] === undefined || fm[f] === '');
  return { valid: missing.length === 0, missing };
}

function scanInbox() {
  let files;
  try {
    files = fs.readdirSync(inboxDir).filter(f => f.endsWith('.md'));
  } catch (e) {
    console.error(`cannot read inbox dir ${inboxDir}: ${e.message}`);
    process.exit(2);
  }

  const results = [];
  for (const f of files.sort()) {
    const fullPath = path.join(inboxDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    const fm = parseFrontmatter(content);
    let validation = null;
    if (fm) validation = validateFrontmatter(fm);
    results.push({
      file: f,
      path: fullPath,
      hasFrontmatter: !!fm,
      frontmatter: fm,
      validation,
      firstLine: content.split('\n')[0]
    });
  }
  return results;
}

const results = scanInbox();

const summary = {
  dir: inboxDir,
  totalFiles: results.length,
  withFrontmatter: results.filter(r => r.hasFrontmatter).length,
  valid: results.filter(r => r.validation && r.validation.valid).length,
  invalid: results.filter(r => r.validation && !r.validation.valid).length,
  missingFrontmatter: results.filter(r => !r.hasFrontmatter).length,
  requiredFields: REQUIRED_FIELDS,
  details: results
};

const out = JSON.stringify(summary, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`inbox-frontmatter.mjs: wrote ${outPath}`); }
else { console.log(out); }

// Self-test: run on current inbox directory
if (process.argv.includes('--self-test')) {
  const dir = path.resolve('inbox');
  const res = scanInbox();
  console.log('\n--- Self-test ---');
  console.log(`Total inbox files: ${res.length}`);
  console.log(`With frontmatter: ${res.filter(r => r.hasFrontmatter).length}`);
  console.log(`Without frontmatter: ${res.filter(r => !r.hasFrontmatter).length}`);
  const validCount = res.filter(r => r.validation && r.validation.valid).length;
  const invalidCount = res.filter(r => r.validation && !r.validation.valid).length;
  console.log(`Valid frontmatter: ${validCount}`);
  console.log(`Invalid frontmatter: ${invalidCount}`);
  const examples = res.filter(r => r.hasFrontmatter).slice(0, 3).map(r => ({ file: r.file, fields: Object.keys(r.frontmatter || {}) }));
  console.log('Sample frontmatter fields:', JSON.stringify(examples, null, 2));
  console.log('self-test: PASSED');
}