// w89-quirks — extract the w89 visual tokens WITH BYTE OFFSETS from the live gh-pages HTML.
// Output: scratch/wave/w89-quirks.md + a JSON token table the arms import (team palette for Phase D/F).
import fs from 'node:fs';
import zlib from 'node:zlib';

const RAW = '/home/z/my-project/scratch/wave/Football-Sim-Z-post-blue-w89.html';
const buf = fs.readFileSync(RAW);
const text = buf.toString('utf8');
const find = (needle, from = 0) => buf.indexOf(Buffer.from(needle, 'utf8'), from);
const all = (needle, limit = 6) => {
  const out = []; let i = find(needle);
  while (i !== -1 && out.length < limit) { out.push(i); i = find(needle, i + 1); }
  return out;
};

const quirks = { file: RAW, bytes: buf.length, tokens: {} };
function tok(name, needles, note) {
  const offsets = needles.flatMap((n) => all(n).map((o) => ({ needle: n, byte: o })));
  quirks.tokens[name] = { found: offsets.length > 0, offsets, note };
  return offsets.length > 0;
}
// 1. fonts
tok('fonts.googleapis', ['fonts.googleapis.com'], 'w89 fetches Google fonts at runtime (tent-test risk, confirmed by Phase C)');
tok('cinzel', ['Cinzel Decorative', 'Cinzel:'], 'display faces');
tok('bodoni', ['Bodoni Moda'], 'serif body face');
// 2. palette words from the brief
tok('espresso', ['espresso', '#1a1208', '#140d06'], 'espresso ground');
tok('champagne', ['champagne', '#d4af37', '#e6c877', '#c9a227'], 'champagne-gold body');
tok('no-white', ['#fff;', '#ffffff', 'white'], 'white usages (the law says NO white body) ');
// 3. the 20-0 jingle + header
tok('jingle', ['CAN YOU GO 20-0'], 'header jingle');
// 4. bubbles + shimmer
tok('bubble-classes', ['class="pb"', 'pos-bubble', '.pb{', '.pb {'], 'position bubbles');
tok('shimmer', ['@keyframes', 'shimmer'], '90+ shimmer animation');
tok('ovr-85-gold', ['85', '90'], 'OVR thresholds (85 vibrant / 90 shimmer)');
tok('round-labels', ['R0.', 'R1.', 'roundLabel'], 'R<round>.<pick> labels');
tok('ub-blue', ['.ub', 'class="ub"'], 'user-team blue');
// 5. the 32-team colour table: find "TEAMCOLORS" / team name with hex pairs
const teamColorIdx = all('TEAM_COLORS').concat(all('TEAMCOLORS')).concat(all('teamColors'));
quirks.tokens['team-colour-table'] = { found: teamColorIdx.length > 0, offsets: teamColorIdx.map((byte) => ({ needle: 'teamColor*', byte })) };
// dump the colour table region for extraction
let palette = null;
for (const key of ['TEAM_COLORS', 'TEAMCOLORS', 'teamColors']) {
  const i = find(key);
  if (i !== -1) { const chunk = text.slice(i, i + 4000); quirks.colourTableProbe = { key, byte: i, head: chunk.slice(0, 1200) }; palette = chunk; break; }
}
// fallback: scan for a team name with adjacent hex
if (!palette) {
  const gb = find('Green Bay');
  if (gb !== -1) { quirks.colourTableProbe = { key: 'Green Bay', byte: gb, head: text.slice(gb, gb + 1200) }; palette = text.slice(gb, gb + 6000); }
}
// extract the team palette: TEAM_COLORS is a JS object literal `{"Name": ["#hex","#hex","#hex"], ...}` —
// find its balanced braces from the key offset and JSON.parse it.
const extracted = {};
{
  const start = find('TEAM_COLORS');
  if (start !== -1) {
    const braceOpen = buf.indexOf(Buffer.from('{'), start);
    let depth = 0, end = -1;
    for (let i = braceOpen; i < buf.length; i++) {
      const c = buf[i];
      if (c === 0x7b) depth++;          // {
      else if (c === 0x7d) { depth--; if (depth === 0) { end = i; break; } } // }
    }
    if (end !== -1) {
      const objText = text.slice(braceOpen, end + 1);
      quirks.colourTableBytes = { from: braceOpen, to: end, size: end + 1 - braceOpen };
      try {
        const obj = JSON.parse(objText.replace(/([A-Za-z ']+):/g, '"$1":').replace(/'/g, '"'));
        for (const [k, v] of Object.entries(obj)) extracted[k] = v[0];
        quirks.colourTableParse = 'JSON.parse ok';
      } catch {
        const re = /"([A-Z][A-Za-z .']+)"\s*:\s*\[\s*"(#[0-9a-fA-F]{6})"/g;
        let m;
        while ((m = re.exec(objText))) extracted[m[1]] = m[2];
        quirks.colourTableParse = `regex, ${Object.keys(extracted).length} teams`;
      }
    }
  }
}
quirks.teamPalette = { count: Object.keys(extracted).length, sample: Object.fromEntries(Object.entries(extracted).slice(0, 8)) };
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync('/home/z/my-project/scratch/wave/team-palette.json', JSON.stringify(extracted, null, 2));
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync('/home/z/my-project/scratch/wave/w89-quirks.json', JSON.stringify(quirks, null, 2));

// human-readable quirks file with byte offsets
let md = '# w89-quirks — token extraction with byte offsets (Z.ai, 2026-11-14)\n\n';
md += `Source: \`Football-Sim-Z-post-blue-w89.html\` (origin/gh-pages tip 3e69567c) · ${buf.length.toLocaleString()} bytes · offsets are BYTE offsets into the file (Buffer.indexOf, first 6 occurrences each).\n\n`;
md += '| Token | Found | Byte offsets (first occurrences) | Note |\n|---|---|---|---|\n';
for (const [name, t] of Object.entries(quirks.tokens)) {
  md += `| ${name} | ${t.found ? 'YES' : 'no'} | ${(t.offsets || []).map((o) => o.byte).join(', ') || '—'} | ${t.note} |\n`;
}
if (quirks.colourTableProbe) md += `\nColour-table probe: key \`${quirks.colourTableProbe.key}\` at byte ${quirks.colourTableProbe.byte}; head:\n\n\`\`\`\n${quirks.colourTableProbe.head.slice(0, 600)}\n\`\`\`\n`;
md += `\nExtracted team palette entries: ${quirks.teamPalette.count} (sample: ${JSON.stringify(quirks.teamPalette.sample)})\n`;
fs.writeFileSync('/home/z/my-project/scratch/wave/w89-quirks.md', md);
console.log(md.slice(0, 2600));
