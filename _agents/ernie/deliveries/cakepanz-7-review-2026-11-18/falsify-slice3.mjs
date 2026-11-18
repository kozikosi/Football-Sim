/* falsify-slice3.mjs — ERNIE (council/ernie), 2026-11-18.
   The cakepanz-7 delivery ships THREE new node-battery laws (N25/N26/N27) and a falsifier
   suite F0-F10 that stops at N24. This probe asks the only question that matters: CAN the new
   laws die? Same discipline as scripts/receipt-falsifier.mjs (fresh throwaway copy per
   mutation, clean baseline FIRST, a node-level error is COULD-NOT-RUN and never a "DIED").

   Usage: node falsify-slice3.mjs <tree-dir>
   Exit 0 = all three died. Exit 1 = a law survived its mutation (tautology) or would not run. */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const TREE = path.resolve(process.argv[2]);
if (!TREE) { console.error('usage: node falsify-slice3.mjs <tree-dir>'); process.exit(2); }
const NODE = 'node --import ./scripts/node-port-register.mjs';

const mkCopy = () => {
  const dir = fs.mkdtempSync('/tmp/cp-falsify3-');
  execSync(`cp -R ${TREE}/src ${dir}/src && cp -R ${TREE}/data ${dir}/data && cp -R ${TREE}/batteries ${dir}/batteries && cp -R ${TREE}/scripts ${dir}/scripts && cp ${TREE}/index.html ${dir}/index.html`);
  fs.rmSync(path.join(dir, 'src/engine-node'), { recursive: true, force: true });
  return dir;
};
const mustReplace = (p, anchor, replacement) => {
  const before = fs.readFileSync(p, 'utf8');
  if (!before.includes(anchor)) throw new Error(`FALSIFIER TARGET MOVED in ${p} — anchor not found:\n  ${anchor.slice(0, 120)}`);
  const after = before.split(anchor).join(replacement);
  if (after === before) throw new Error(`FALSIFIER MUTATION DID NOT APPLY in ${p}`);
  fs.writeFileSync(p, after);
};
const run = (dir) => {
  try {
    const out = execSync(`${NODE} batteries/node.battery.mjs`, { encoding: 'utf8', cwd: dir, stdio: ['ignore', 'pipe', 'pipe'] });
    return { kind: 'GREEN', out };
  } catch (e) { return { kind: 'FAIL', out: String((e.stdout || '') + (e.stderr || '')) }; }
};
const dead = (r, law) => r.out.split('\n').some((l) => l.includes('✖') && l.includes(law));

let taut = [];
let unrun = [];

// F0: clean baseline first — a red copy would make every "DIED" a false positive
{
  const dir = mkCopy();
  const r = run(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  const lawLines = r.out.split('\n').filter((l) => l.includes('✖'));
  if (r.kind === 'GREEN') console.log('F0 clean baseline · unmutated node battery exit 0 · baseline OK');
  else if (lawLines.length) { console.log('F0 CLEAN BASELINE RED —', lawLines.slice(0, 3).join(' | ')); process.exit(1); }
  else { console.log('F0 CLEAN BASELINE COULD-NOT-RUN —', r.out.split('\n').slice(-4).join(' | ')); process.exit(1); }
}

// F11 (N25): the boot stops calling the rehydration — the "refresh mid-draft lands back" law must die
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'), 'void hydrateBoot();', '/* mutated: no boot rehydration */');
  const r = run(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  const d = dead(r, 'N25');
  console.log(`F11 HYDRATE law           · mutation: the boot stops calling hydrateBoot · ${d ? 'DIED — ' + r.out.split('\n').find((l) => l.includes('✖') && l.includes('N25')).trim().slice(0, 90) : 'TAUTOLOGY (N25 stayed green)'}`);
  if (!d) taut.push('F11');
}

// F12 (N26): the gone cell stops rendering the VM value and hardcodes a number
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/components/BoardRow.svelte');
  mustReplace(p, '<span class="cp-num cp-gone">{r.gone}</span>', '<span class="cp-num cp-gone">50%</span>');
  const r = run(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  const d = dead(r, 'N26');
  console.log(`F12 gone-tooltip law      · mutation: the gone cell hardcodes 50% · ${d ? 'DIED — ' + r.out.split('\n').find((l) => l.includes('✖') && l.includes('N26')).trim().slice(0, 90) : 'TAUTOLOGY (N26 stayed green)'}`);
  if (!d) taut.push('F12');
}

// F13 (N27): the sticky row stops reading the engine's openSlots
{
  const dir = mkCopy();
  mustReplace(path.join(dir, 'src/App.svelte'), 'openNow.set(openSlots(st.draft.rosters[userTeam]))', 'openNow.set([])');
  const r = run(dir);
  fs.rmSync(dir, { recursive: true, force: true });
  const d = dead(r, 'N27');
  console.log(`F13 my-needs law          · mutation: the sticky row reads an empty set · ${d ? 'DIED — ' + r.out.split('\n').find((l) => l.includes('✖') && l.includes('N27')).trim().slice(0, 90) : 'TAUTOLOGY (N27 stayed green)'}`);
  if (!d) taut.push('F13');
}

// F14 (N26, second face): the tooltip loses its method — the law's "no hardcode" half must catch it
{
  const dir = mkCopy();
  const p = path.join(dir, 'src/lib/components/BoardRow.svelte');
  const before = fs.readFileSync(p, 'utf8');
  const m = before.match(/<span class="cp-gonetip" role="tooltip">\{method\(oddsMeta\)\}<\/span>/);
  if (!m) { console.log('F14 gone-tooltip method   · SKIPPED — the tooltip anchor is not in BoardRow.svelte'); }
  else {
    mustReplace(p, m[0], '<span class="cp-gonetip" role="tooltip">50% of the time</span>');
    const r = run(dir);
    fs.rmSync(dir, { recursive: true, force: true });
    const d = dead(r, 'N26');
    console.log(`F14 gone-tooltip method   · mutation: the tooltip hardcodes "50% of the time" · ${d ? 'DIED — ' + r.out.split('\n').find((l) => l.includes('✖') && l.includes('N26')).trim().slice(0, 90) : 'TAUTOLOGY (N26 stayed green)'}`);
    if (!d) taut.push('F14');
  }
}

console.log(taut.length ? `TAUTOLOGY: ${taut.join(', ')}` : 'all three new laws DIED — N25/N26/N27 are falsifiable');
process.exit(taut.length || unrun.length ? 1 : 0);