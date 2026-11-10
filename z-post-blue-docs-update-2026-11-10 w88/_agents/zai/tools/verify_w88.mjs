// w88 headless verification (Node): pure-function checks on the patched product.
import fs from 'node:fs';

const html = fs.readFileSync('w88.html', 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const body = scripts.reduce((a, b) => (b.length > a.length ? b : a), ''); // the big app script
const w88 = scripts.find((s) => s.includes('ZPB_SLOTS_WINS'));            // the w88 block

const ABS = `globalThis.__absorb = new Proxy(function(){}, { get:(t,p)=> (p===Symbol.toPrimitive? ()=>'' : globalThis.__absorb), set:()=>true, apply:()=>globalThis.__absorb, construct:()=>globalThis.__absorb });
const document = new Proxy(function(){}, { get:(t,p)=> (p===Symbol.toPrimitive)? ()=>'' : globalThis.__absorb, set:()=>true, apply:()=>globalThis.__absorb, construct:()=>globalThis.__absorb });
const window = new Proxy(globalThis, { get:(t,p)=> (p in t) ? t[p] : (p==='addEventListener'||p==='removeEventListener'||p==='matchMedia' ? ()=>({matches:false,addEventListener:()=>{}}) : undefined), set:(t,p,v)=>{ t[p]=v; return true; } }); const localStorage = { getItem:()=>null, setItem:()=>{}, removeItem:()=>{} };
const matchMedia = ()=>({ matches:false, addEventListener:()=>{}, addListener:()=>{} });
const requestAnimationFrame = ()=>0;
class IntersectionObserver { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } }
class MutationObserver { constructor(){} observe(){} unobserve(){} disconnect(){} takeRecords(){ return []; } }
class ResizeObserver { constructor(){} observe(){} unobserve(){} disconnect(){} }
customElements = { define:()=>{}, get:()=>undefined, upgrade:()=>{} };`;

let fails = 0;
const check = (name, cond, detail = '') => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${name}${detail ? '  · ' + detail : ''}`); if (!cond) fails++; };

try {
  const run = new Function(ABS + '\n' + body + '\n' + w88 + '\nreturn { ZPB_SLOTS_WINS, zpbSlotWinsLocal, zpbSlotUIRank: window.zpbSlotUIRank, posRank: window.zpbPosRankHTML(), tiers: (typeof valueTiersHTML==="function")?valueTiersHTML():"(n/a)", roles: (typeof slotRoleTableHTML==="function")?slotRoleTableHTML():"(n/a)", btns: (typeof zpbBuildRankBtns==="function")?"(deferred DOM)":"(n/a)", slotWins: (typeof slotWins==="function")?slotWins:null, LABELS: (typeof LABELS!=="undefined")?LABELS:null };')();
  const R = run;

  check('ZPB_SLOTS_WINS present', !!R.ZPB_SLOTS_WINS);
  const order = R.zpbSlotUIRank();
  check('UI order is the w88 Wins order', JSON.stringify(order) === JSON.stringify(['QB','DE1','WR1','DT1','OT1','WR2','CB1','OG1','MIKE','DE2','DT2','FS','SS','OT2','CB2','OG2','TE1','RB1','WILL','DL5','C','TE2','CB3','WR3','CB4','SAM','K','P','WR4','RB2','TE3','FB']), order.slice(0, 8).join(','));

  // the guide ranked graphic
  const pr = R.posRank;
  check('posRank: QB rank 1 at 2.5 wins', /zpb-prank">1<\/span><span class="zpb-prname" data-zslot="QB">QB<\/span>.*?2\.5 wins/.test(pr));
  const rankOf = (id) => { const m = pr.indexOf(`data-zslot="${id}"`); const before = pr.slice(0, m); return (before.match(/zpb-prank">/g) || []).length; };
  check('posRank: WR2 is 6th', rankOf('WR2') === 6, 'rank ' + rankOf('WR2'));
  check('posRank: CB1 is 7th', rankOf('CB1') === 7, 'rank ' + rankOf('CB1'));
  check('posRank: NICKEL(CB3) is 23rd', rankOf('CB3') === 23, 'rank ' + rankOf('CB3'));
  check('posRank: DIME(CB4) is 25th', rankOf('CB4') === 25, 'rank ' + rankOf('CB4'));
  check('posRank: SAM is 26th', rankOf('SAM') === 26, 'rank ' + rankOf('SAM'));
  check('posRank: RB2 is 30th', rankOf('RB2') === 30, 'rank ' + rankOf('RB2'));
  check('posRank: FB is 32nd (last)', rankOf('FB') === 32, 'rank ' + rankOf('FB'));
  const vals = [...pr.matchAll(/zpb-prval"[^>]*>([\d.]+) wins</g)].map((m) => +m[1]);
  check('posRank: every value has a unit + one decimal', vals.length === 32 && vals.every((v) => Number.isFinite(v)), vals.slice(0, 5).join(', ') + ' …');
  const WANT = [2.5, 1.7, 1.6, 1.3, 1.2, 1.1, 1.1, 1.0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.7, 0.6, 0.6, 0.6, 0.4, 0.4, 0.4, 0.3, 0.3, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
  check('posRank: the 32 displayed values equal the §2 table in order', JSON.stringify(vals) === JSON.stringify(WANT), vals.join(','));
  check('posRank: no stray w87 weight integers (1000/675/630/520/495)', !/>1000</.test(pr) && !/>675</.test(pr) && !/>630</.test(pr) && !/>520</.test(pr) && !/>495</.test(pr));
  check('posRank: caption no longer says "anchored at 1000"', !pr.includes('anchored at 1000') && pr.includes('20-OVR upgrade at the local rate'));

  // the guide tier viz + role table
  check('tiers: no "70→90 upgrade" wording left', !R.tiers.includes('70\u219290 upgrade'), R.tiers.includes('wins per season, 20-OVR at the local rate') ? 'label updated' : '');
  check('tiers: QB opens the franchise tier at 2.5', R.tiers.includes('(2.5 wins per season'));
  check('roles: header reads "Wins per season"', R.roles.includes('>Wins per season</th>') && !R.roles.includes('70\u219290 upgrade</th>'));
  check('roles: one-decimal values', !R.roles.includes('.toFixed(2)') && /class="score">2\.5</.test(R.roles), (R.roles.match(/class="score">[+-]?[\d.]+</g) || []).slice(0, 4).join(' '));

  // the model is untouched: the engine's own slotWins stays calibrated to the weight table
  if (typeof R.slotWins === 'function') {
    const qb = R.slotWins('QB', 90) - R.slotWins('QB', 70);
    const de1 = R.slotWins('DE1', 90) - R.slotWins('DE1', 70);
    check('engine untouched: slotWins(QB 70→90) still 2.54 (1000×0.00254)', Math.abs(qb - 2.54) < 0.004, qb.toFixed(4));
    check('engine untouched: slotWins(DE1 70→90) still 1.71 (675×0.00254)', Math.abs(de1 - 675 * 0.00254) < 0.004, de1.toFixed(4));
  } else check('engine untouched: slotWins present', false, 'slotWins missing');
} catch (e) {
  check('harness ran', false, e.message);
}
console.log(fails ? `\n${fails} FAILURES` : '\nALL CHECKS PASSED');
