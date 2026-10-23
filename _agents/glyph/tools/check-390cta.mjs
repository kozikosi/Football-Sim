#!/usr/bin/env node
import fs from 'fs';
const html = fs.readFileSync(process.argv[2], 'utf8');
const idx = html.indexOf('id="startSeasonBtn"');
if (idx === -1) { console.log('NOT_FOUND'); process.exit(0); }
const start = Math.max(0, idx - 200);
const end = Math.min(html.length, idx + 200);
const ctx = html.slice(start, end);
console.log('FOUND at', idx);
console.log(ctx);
