import fs from 'node:fs';
const P = JSON.parse(fs.readFileSync('/tmp/log-pools.json','utf8'));
const G = JSON.parse(fs.readFileSync('/tmp/log-glm.json','utf8'));
const yb = (y) => y <= 3 ? 0 : y <= 6 ? 1 : y <= 10 ? 2 : 3;
const zb = (z) => z > 50 ? 0 : 1;                      // 0 = own side, 1 = opponent side
const sb = (s) => s <= -7 ? 0 : s < 0 ? 1 : s === 0 ? 2 : s <= 7 ? 3 : 4;
const key = (r) => r.d*1000 + yb(r.ytg)*100 + zb(r.ydl)*10 + sb(r.sd);
const agg = (rows) => { const m = new Map();
  for (const r of rows) { const k = key(r); let e = m.get(k); if (!e) { e = {n:0,sack:0,comp:0,inc:0,int:0}; m.set(k,e); }
    e.n++; if (r.cls===2) e.sack++; else if (r.cls===0) e.comp++; else if (r.cls===1) e.inc++; else if (r.cls===3) e.int++; }
  return m; };
const mp = agg(P), mg = agg(G);
const keys = [...new Set([...mp.keys(), ...mg.keys()])].sort((a,b)=>a-b);
const rate = (e, f) => e && e.n ? e[f]/e.n : 0;
let tp=0, tg=0, sp=0, sg=0, rateEff=0, mixEff=0;
const rows = [];
for (const k of keys) {
  const a = mp.get(k) || {n:0,sack:0}, b = mg.get(k) || {n:0,sack:0};
  tp += a.n; tg += b.n; sp += a.sack; sg += b.sack;
  const rp = a.n ? a.sack/a.n : 0, rg = b.n ? b.sack/b.n : 0;
  const wp = a.n/tp || 0, wg = 0; // placeholder, recomputed below
  rows.push({k, np:a.n, ng:b.n, sp:a.sack, sg:b.sack, rp, rg});
}
// proper weights over the whole sample
const N = tp; // pools plays
for (const r of rows) { r.wp = r.np/N; r.wg = r.ng/tg; }
for (const r of rows) {
  const rp = r.np ? r.sp/r.np : 0, rg = r.ng ? r.sg/r.ng : 0;
  rateEff += ((r.wp + r.wg)/2) * (rg - rp);
  mixEff  += ((rp + rg)/2) * (r.wg - r.wp);
}
console.log('pass plays  pools', tp, ' glm', tg);
console.log('sacks       pools', sp, ' glm', sg);
console.log('sack rate   pools', (sp/tp*100).toFixed(4)+'%', ' glm', (sg/tg*100).toFixed(4)+'%');
console.log('difference  ', ((sg/tg - sp/tp)*100).toFixed(4), 'points');
console.log('rate effect ', (rateEff*100).toFixed(4), 'points   (GLM minus pool WITHIN the same state mix)');
console.log('mix  effect ', (mixEff*100).toFixed(4), 'points   (different state mix)');
console.log('sum         ', ((rateEff+mixEff)*100).toFixed(4), 'points');
// per-class rates
const cls = (m, f) => { let n=0, c=[0,0,0,0]; for (const e of m.values()) { n+=e.n; c[0]+=e.comp||0; c[1]+=e.inc||0; c[2]+=e.sack||0; c[3]+=e.int||0; } return c.map(x=>x/n); };
const cp = cls(mp), cg = cls(mg);
console.log('class mix pools comp/inc/sack/int', cp.map(x=>(x*100).toFixed(3)+'%').join(' / '));
console.log('class mix glm   comp/inc/sack/int', cg.map(x=>(x*100).toFixed(3)+'%').join(' / '));
// worst buckets by rate difference (with enough plays)
const bad = rows.filter(r=>r.np>2000&&r.ng>2000).map(r=>({...r, d:(r.sg/r.ng - r.sp/r.np)*100})).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d)).slice(0,6);
console.log('largest bucket rate gaps (down,ytgbin,zone,scorebin | pools n / glm n | pool% glm% diff):');
for (const r of bad) console.log('  ', r.k, '|', r.np, '/', r.ng, '|', (r.sp/r.np*100).toFixed(2), (r.sg/r.ng*100).toFixed(2), r.d.toFixed(2));
