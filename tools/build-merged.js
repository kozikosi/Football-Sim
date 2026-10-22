// Rebuilds "Football-Sim-V21.html" from the two parent builds on this branch.
// usage: node tools/build-merged.js "_archive/builds/NFL Draft Simulator v20 Claude.html" "_archive/builds/NFL Draft Simulator.html" out.html
// expected output sha256: 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd (657,486 B)
const fs=require('fs');
const [,, vPath, dPath, outPath]=process.argv;
const V=fs.readFileSync(vPath,'utf8').split('\n'), D=fs.readFileSync(dPath,'utf8').split('\n');
// 1-indexed helpers
const L=(a,s,e)=>a.slice(s-1,e);
function endOf(a,start){ for(let i=start;i<=a.length;i++){ if(a[i-1]==='}') return i; } throw new Error('no end '+start); }
function startOf(a,name){ const i=a.findIndex(l=>l.startsWith('function '+name+'(')); if(i<0) throw new Error('nf '+name); let s=i+1; while(s>1 && /^\/\//.test(a[s-2])) s--; return {fn:i+1,s}; }
function span(a,name){ const {fn,s}=startOf(a,name); return {s, fn, e:endOf(a,fn)}; }
const donorTake=['render100','renderGuideHTML','renderPlayoffsView','matchupTagHTML','generateGameSummary','playByPlay','turnoverParagraph','dramaticEnding','buildDefenseDetail','fitNoteHTML','cpuPick'];
let out=V.slice();
// ---- A. tail: drop blank + stray </body></html> (6438-6439)
if(out[6436]!=='</html>'||out[6437]!==''||out[6438]!=='</body></html>') throw new Error('tail mismatch');
out.splice(6437,2); // remove lines 6438,6439 (0-idx 6437..6438)
// ---- B. phone block variant A (v20 6409..6432 <- donor 6458..6488 + nostack guard)
if(!/^\/\/ ---- phone layout/.test(out[6408])||out[6431]!=='})();'||!/^setActiveTab\('viewDraft'/.test(out[6432])) throw new Error('v20 phone block mismatch');
if(!/^\/\/ ---- phone layout/.test(D[6457])||D[6487]!=='})();') throw new Error('donor phone block mismatch');
let ph=L(D,6458,6488);
const gi=ph.findIndex(l=>l.includes("if(!mq.matches){ if(t.classList.contains('mstack'))"));
if(gi<0) throw new Error('mq line');
ph.splice(gi+1,0,"    if(t.dataset.nostack) return;");
out.splice(6408,24,...ph);
// ---- C. donor function takes + donor-only helpers (bottom to top by v20 start)
const jobs=donorTake.map(n=>({n,a:span(out,n),b:span(D,n)}));
// guard: v20 ranges must equal funcdiff output (sanity)
const exp={render100:[5934,6028],cpuPick:[1368,1395]}; for(const k in exp){const j=jobs.find(x=>x.n===k); if(j.a.fn!==exp[k][0]||j.a.e!==exp[k][1]) throw new Error('range '+k+JSON.stringify(j.a));}
jobs.sort((x,y)=>y.a.s-x.a.s);
const helpers={ meetingInfo:span(D,'meetingInfo'), meetingTagText:span(D,'meetingTagText') };
for(const j of jobs){
  let rep=L(D,j.b.s,j.b.e);
  if(j.n==='matchupTagHTML'){ // insert donor-only helpers directly above
    rep=[...L(D,helpers.meetingInfo.s,helpers.meetingInfo.e),...L(D,helpers.meetingTagText.s,helpers.meetingTagText.e),...rep];
  }
  out.splice(j.a.s-1,j.a.e-j.a.s+1,...rep);
}
// ---- D. setActiveTab: v20 + null guards on both loops; then donor seasonToast + goSeason right after it
let sa=span(out,'setActiveTab');
let sb=L(out,sa.s,sa.e);
const fixLoop=(arr,sel)=>arr.map(l=>l.replace(/^( \['(?:viewRankings|tabRankingsBtn)[^\n]*)$/,l0=>l0));
sb=sb.map(l=>{
  if(l.includes("['viewRankings','viewPlayers'")) return " ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{ const el=document.getElementById(v); if(el) el.classList.toggle('active', v===viewId); });";
  if(l.includes("['tabRankingsBtn','tabPlayersBtn'")) return " ['tabRankingsBtn','tabPlayersBtn','tabGroupsBtn','tabCompareBtn','tabDraftBtn','tabGuideBtn'].forEach(b=>{ const el=document.getElementById(b); if(el) el.classList.toggle('active', b===btnId); });";
  return l;});
if(sb.filter(l=>l.includes('if(el)')).length!==2) throw new Error('guards not applied');
const st=span(D,'seasonToast'), gs=span(D,'goSeason');
const helperBlock=L(D,st.s,gs.e);
out.splice(sa.s-1,sa.e-sa.s+1,...sb,...helperBlock);
// ---- E. wrapper: delete line 1 (compact wrapper incl. base style); insert donor base style after <head> (light dark)
if(!out[0].startsWith('<!doctype html><html><head><meta charset=utf8>')) throw new Error('line1');
if(out[1]!=='<!DOCTYPE html>'||out[3]!=='<head>') throw new Error('head shape');
const baseStyle=D[3]; if(!baseStyle.startsWith('<style>:root{color-scheme:light dark;')) throw new Error('donor base style');
// the v20 base style must equal donor's except the token
const v20style=out[0].match(/<style>.*?<\/style>/)[0];
if(v20style.replace('color-scheme:light;','color-scheme:light dark;')!==baseStyle) throw new Error('base style differs beyond token');
out.splice(0,1);           // drop line 1
out.splice(2,0,baseStyle); // after <head> (now index 2 -> after line "<head>")
if(out[2]!==baseStyle||out[1]!=='<html lang="en">') throw new Error('insertion position');
fs.writeFileSync(outPath,out.join('\n'));
console.log('lines',out.length,'bytes',fs.statSync(outPath).size);
