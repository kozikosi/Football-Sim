#!/usr/bin/env node
// tools/retire-seat.mjs — compress a retired council seat's lane to a tombstone.
//
//   node tools/retire-seat.mjs <lane-folder> --label "<Seat name>" [--reason "..."] \
//        [--base <sha>] [--keep rel/path,rel/path] [--apply]
//
// Dry-run by default: prints the inventory and what would be removed. With --apply it
//   1. writes <lane>/TOMBSTONE.md (identity, dates, inventory, how to recover everything),
//   2. `git rm`s every other file in the lane (except --keep paths).
// It never commits, tags or pushes. Full content stays in git at --base (default: HEAD);
// tag that commit once (git tag retired/<seat>-<date> <base>) so it cannot be garbage collected.
// Protocol: _agents/RETIREMENT.md.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const lane = args.find((a) => !a.startsWith('--'));
const opt = (name, d = '') => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d;
};
if (!lane) { console.error('usage: retire-seat.mjs <lane-folder> --label "<Seat>" [--apply]'); process.exit(2); }
const apply = args.includes('--apply');
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
const root = git('rev-parse', '--show-toplevel');
process.chdir(root);
const dir = lane.replace(/\/+$/, '');
if (!/^_agents\/[^/]+$/.test(dir) || !fs.existsSync(dir)) { console.error(`not a lane folder: ${dir}`); process.exit(2); }
const label = opt('label', path.basename(dir));
const reason = opt('reason', 'retired by the Owner');
const base = opt('base', git('rev-parse', 'HEAD'));
const keep = new Set(opt('keep').split(',').filter(Boolean).map((p) => `${dir}/${p}`));
keep.add(`${dir}/TOMBSTONE.md`);

const files = git('ls-files', '--', dir).split('\n').filter(Boolean);
const byTop = {};
let total = 0;
for (const f of files) {
  const rel = f.slice(dir.length + 1);
  const top = rel.includes('/') ? rel.split('/')[0] + '/' : '(root)';
  const size = fs.existsSync(f) ? fs.statSync(f).size : 0;
  byTop[top] ??= { n: 0, b: 0 };
  byTop[top].n++; byTop[top].b += size; total += size;
}
const drop = files.filter((f) => !keep.has(f));
console.log(`${dir}: ${files.length} tracked files, ${(total / 1024).toFixed(0)} KB; would remove ${drop.length}, keep ${files.length - drop.length}`);
for (const [k, v] of Object.entries(byTop)) console.log(`  ${k.padEnd(22)} ${String(v.n).padStart(4)} files ${(v.b / 1024).toFixed(0).padStart(6)} KB`);
if (!apply) { console.log('dry run — add --apply to write the tombstone and git rm the rest'); process.exit(0); }

const today = new Date().toISOString().slice(0, 10);
const inv = Object.entries(byTop).map(([k, v]) => `| \`${k}\` | ${v.n} | ${(v.b / 1024).toFixed(0)} KB |`).join('\n');
const slug = path.basename(dir);
const stone = `# ${label} — RETIRED (${today})

**Seat:** ${label} · **Lane:** \`${dir}/\` · **Status:** retired — ${reason}.
**Do not post, claim items or edit here.** To bring this seat back, follow \`_agents/RETIREMENT.md\` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
${inv}

## Lasting findings (the only things worth carrying forward)

_(The Architect fills this in at retirement: at most 5 bullets, each with the file or commit that proves it.)_

## Recover everything

Full lane at commit \`${base}\`. Tag it once so it cannot be collected: \`git tag retired/${slug}-${today} ${base}\`.

\`\`\`
git ls-tree -r --name-only ${base} -- ${dir}      # list
git show ${base}:${dir}/<path>                    # read one file
git restore --source=${base} --worktree -- ${dir}/<path>   # only in your own worktree, never the shared tree
\`\`\`

Entries this seat wrote in shared logs (\`COUNCIL-BULLETIN.md\`, \`CHRONICLE.md\`, \`SUBMISSIONS.md\`, \`V22-Suggestions.md\`) are not edited; they leave the live files by round rotation into \`_archive/\`.
`;
fs.writeFileSync(`${dir}/TOMBSTONE.md`, stone);
for (let i = 0; i < drop.length; i += 200) git('rm', '-q', '--', ...drop.slice(i, i + 200));
git('add', '--', `${dir}/TOMBSTONE.md`);
console.log(`wrote ${dir}/TOMBSTONE.md, removed ${drop.length} files. Review with: git status --short -- ${dir} | head`);
