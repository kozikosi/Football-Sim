/* eslint-disable */
// The game engine: draft AI, season simulation, recaps, and every screen's rendering.
// Ported from the single-file game (Football-Sim-Z-post-blue-w24.html). The original code ran as
// classic <script>s sharing global variables; here it all lives inside startEngine(), so those
// variables are shared through one function scope instead. Typed entry point: ./index.ts.
import PLAYERS from "./data/players.json";
import TEAM_DATA from "./data/teams.json";
import ZPB_LOGOS from "./data/logos.json";

/** Runs the engine against the markup already in the page. Call once. Returns the save/restore bridge. */
export function startEngine() {

/* PLAYERS: imported from ./data */
/* TEAM_DATA: imported from ./data */
const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 80, "TE2": 20, "OT1": 295, "OT2": 295, "OG1": 295, "OG2": 295, "C": 295, "DE1": 350, "DE2": 350, "DT1": 320, "DT2": 300, "DL5": 5, "MIKE": 100, "WILL": 100, "SAM": 60, "LB4": 5, "CB1": 350, "CB2": 295, "CB3": 80, "CB4": 20, "SS": 80, "SS2": 5, "FS": 60, "FS2": 5, "K": 5, "P": 1, "FB": 1};
const LABELS = {"DE1": "DE1", "DE2": "DE2", "DT1": "DT1", "DT2": "DT2", "CB1": "CB1", "CB2": "CB2", "CB3": "Nickel", "CB4": "CB4 / Dime", "OG1": "OG1", "OG2": "OG2", "C": "C", "OT1": "OT1", "OT2": "OT2", "MIKE": "MIKE", "WILL": "WILL", "SAM": "SAM", "LB4": "LB4", "DL5": "DL5 / Elephant", "RB1": "RB1", "RB2": "RB2", "TE1": "TE1", "TE2": "TE2", "SS": "SS", "SS2": "SS2 / Big Nickel", "QB": "QB", "FS": "FS", "FS2": "FS2 / Quarter", "WR1": "WR1", "WR2": "WR2", "WR3": "WR3", "WR4": "WR4", "K": "K", "P": "P", "FB": "FB"};
const GROUPS = [["Quarterback & Skill Positions", ["QB", "RB1", "RB2", "WR1", "WR2", "WR3", "WR4", "TE1", "TE2"]], ["Offensive Line", ["OT1", "OT2", "OG1", "OG2", "C"]], ["Defensive Line", ["DE1", "DE2", "DT1", "DT2", "DL5"]], ["Linebackers", ["MIKE", "WILL", "SAM", "LB4"]], ["Secondary", ["CB1", "CB2", "CB3", "CB4", "SS", "SS2", "FS", "FS2"]], ["Specialists", ["K", "P", "FB"]]];
const GROUP_DEFS = [{"key":"QB","label":"Quarterback","pos":["QB"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"RB1","label":"RB1","pos":["HB"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"RB2","label":"RB2","pos":["HB"],"n":1,"rankIndex":1,"cat":"Offense — Positions"},{"key":"WR1","label":"WR1","pos":["WR"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"WR2","label":"WR2","pos":["WR"],"n":1,"rankIndex":1,"cat":"Offense — Positions"},{"key":"WR3","label":"WR3","pos":["WR"],"n":1,"rankIndex":2,"cat":"Offense — Positions"},{"key":"WR4","label":"WR4","pos":["WR"],"n":1,"rankIndex":3,"cat":"Offense — Positions"},{"key":"TE1","label":"TE1","pos":["TE"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"TE2","label":"TE2","pos":["TE"],"n":1,"rankIndex":1,"cat":"Offense — Positions"},{"key":"OT1","label":"OT1","pos":["LT","RT"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"OT2","label":"OT2","pos":["LT","RT"],"n":1,"rankIndex":1,"cat":"Offense — Positions"},{"key":"OG1","label":"OG1","pos":["LG","RG"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"OG2","label":"OG2","pos":["LG","RG"],"n":1,"rankIndex":1,"cat":"Offense — Positions"},{"key":"C","label":"Center","pos":["C"],"n":1,"rankIndex":0,"cat":"Offense — Positions"},{"key":"RB","label":"Running Backs","pos":["HB"],"n":2,"cat":"Offense — Team Units"},{"key":"WR","label":"Wide Receivers","pos":["WR"],"n":3,"cat":"Offense — Team Units"},{"key":"TE","label":"Tight Ends","pos":["TE"],"n":2,"cat":"Offense — Team Units"},{"key":"RECV","label":"Receiving Corps","pos":["WR","TE"],"n":4,"cat":"Offense — Team Units"},{"key":"OT","label":"Offensive Tackles","pos":["LT","RT"],"n":2,"cat":"Offense — Team Units"},{"key":"OGUARDS","label":"Offensive Guards","pos":["LG","RG"],"n":2,"cat":"Offense — Team Units"},{"key":"OG","label":"Interior OL","pos":["LG","RG","C"],"n":3,"cat":"Offense — Team Units"},{"key":"OL","label":"Offensive Line","pos":["LT","RT","LG","RG","C"],"n":5,"cat":"Offense — Team Units"},{"key":"RUN","label":"Run Game","pos":["LT","RT","LG","RG","C","HB"],"n":7,"cat":"Offense — Team Units"},{"key":"PASS","label":"Pass Game","pos":["LT","RT","LG","RG","C","QB","WR","TE"],"n":10,"cat":"Offense — Team Units"},{"key":"SKILL","label":"Skill Positions","pos":["HB","WR","TE"],"n":6,"cat":"Offense — Team Units"},{"key":"OFFENSE","label":"Offense","pos":["QB","HB","WR","TE","LT","RT","LG","RG","C"],"n":13,"cat":"Offense — Team Units"},{"key":"DE1","label":"DE1","pos":["REDG","LEDG"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"DE2","label":"DE2","pos":["REDG","LEDG"],"n":1,"rankIndex":1,"cat":"Defense — Positions"},{"key":"DL5","label":"DL5 / Elephant","pos":["DT","REDG","LEDG"],"n":1,"rankIndex":4,"cat":"Defense — Positions"},{"key":"DT1","label":"DT1","pos":["DT"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"DT2","label":"DT2","pos":["DT"],"n":1,"rankIndex":1,"cat":"Defense — Positions"},{"key":"MIKE","label":"MIKE","pos":["MIKE"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"WILL","label":"WILL","pos":["WILL"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"SAM","label":"SAM","pos":["SAM"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"LB4","label":"LB4","pos":["MIKE","WILL","SAM"],"n":1,"rankIndex":3,"cat":"Defense — Positions"},{"key":"CB1","label":"CB1","pos":["CB"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"CB2","label":"CB2","pos":["CB"],"n":1,"rankIndex":1,"cat":"Defense — Positions"},{"key":"CB3","label":"Nickel","pos":["CB"],"n":1,"rankIndex":2,"cat":"Defense — Positions"},{"key":"CB4","label":"CB4 / Dime","pos":["CB"],"n":1,"rankIndex":3,"cat":"Defense — Positions"},{"key":"SS","label":"SS","pos":["SS"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"SS2","label":"SS2 / Big Nickel","pos":["SS"],"n":1,"rankIndex":1,"cat":"Defense — Positions"},{"key":"FS","label":"FS","pos":["FS"],"n":1,"rankIndex":0,"cat":"Defense — Positions"},{"key":"FS2","label":"FS2 / Quarter","pos":["FS"],"n":1,"rankIndex":1,"cat":"Defense — Positions"},{"key":"EDGE","label":"Edge Rushers","pos":["REDG","LEDG"],"n":2,"cat":"Defense — Team Units"},{"key":"DT","label":"Defensive Tackles","pos":["DT"],"n":2,"cat":"Defense — Team Units"},{"key":"DL","label":"Defensive Line","pos":["DT","REDG","LEDG"],"n":4,"cat":"Defense — Team Units"},{"key":"LB","label":"Linebackers","pos":["MIKE","WILL","SAM"],"n":3,"cat":"Defense — Team Units"},{"key":"FRONT7","label":"Front Seven","pos":["DT","REDG","LEDG","MIKE","WILL","SAM"],"n":7,"cat":"Defense — Team Units"},{"key":"CB","label":"Cornerbacks","pos":["CB"],"n":4,"cat":"Defense — Team Units"},{"key":"S","label":"Safeties","pos":["FS","SS"],"n":2,"cat":"Defense — Team Units"},{"key":"SEC","label":"Secondary","pos":["CB","FS","SS"],"n":6,"cat":"Defense — Team Units"},{"key":"PRIMCOV","label":"Primary Coverage","pos":["DT","REDG","LEDG","CB"],"n":5,"parts":[{"pos":["CB"],"n":1},{"pos":["DT","REDG","LEDG"],"n":4}],"cat":"Defense — Team Units"},{"key":"DLCB","label":"DL + CBs","pos":["DT","REDG","LEDG","CB"],"n":8,"cat":"Defense — Team Units"},{"key":"RUND","label":"Run Defense","pos":["DT","REDG","LEDG","MIKE","WILL","SAM","SS","CB"],"n":9,"cat":"Defense — Team Units"},{"key":"PASSD","label":"Pass Defense","pos":["DT","REDG","LEDG","MIKE","WILL","SAM","CB","FS","SS"],"n":13,"cat":"Defense — Team Units"},{"key":"ZONE","label":"Zone Defense","pos":["CB","MIKE","WILL","SAM","FS","SS"],"n":8,"cat":"Defense — Team Units"},{"key":"DEFENSE","label":"Defense","pos":["DT","REDG","LEDG","MIKE","WILL","SAM","CB","FS","SS"],"n":13,"cat":"Defense — Team Units"},{"key":"TRENCHES","label":"Trenches","pos":["LT","RT","LG","RG","C","DT","REDG","LEDG"],"n":9,"cat":"Combined Units"},{"key":"TRENCHES_CB","label":"Trenches + CBs","pos":["LT","RT","LG","RG","C","DT","REDG","LEDG","CB"],"n":13,"cat":"Combined Units"},{"key":"K","label":"Kicker","pos":["K"],"n":1,"rankIndex":0,"cat":"Specialists"},{"key":"P","label":"Punter","pos":["P"],"n":1,"rankIndex":0,"cat":"Specialists"},{"key":"FB","label":"Fullback","pos":["FB"],"n":1,"rankIndex":0,"cat":"Specialists"}];
let weights = {...DEFAULT_WEIGHTS};
let personalWeights = null;
// Model weights: each roster spot's wins per rating point, scaled so the largest (QB) equals 700; extra depth spots stay tiny.
function modelWeights(){
 const w = slotWinsPerOvr(), mx = Math.max(...Object.values(w)), out = {...DEFAULT_WEIGHTS};
 Object.keys(out).forEach(k=>{ out[k] = w[k]!=null ? Math.max(5, Math.round(w[k]/mx*700/5)*5) : Math.min(out[k],5); });
 return out;
}

// ---- Synergy penalty system ----
const RUN_SLOTS = ['OT1','OT2','OG1','OG2','C','RB1'];      // "Can't Run" = OL + RB1
const DL_SLOTS = ['DE1','DE2','DT1','DT2'];                       // pass rush
const COVERAGE_SLOTS = ['CB1','CB2','CB3','CB4','SS','FS','MIKE','WILL','SAM']; // coverage incl. LBs
const PASSGAME_SLOTS = ['OT1','OT2','OG1','OG2','C','QB','WR1','WR2','WR3','TE1','TE2']; // "Can't Pass" = OL+QB+WR1-3+TE

let synergy = {
 runEnabled: false, runThreshold: 80, runSlope: 1, runMaxPenalty: 2,
 passEnabled: false, passThreshold: 81, passSlope: 1, passMaxPenalty: 3,
 passGameEnabled: false, passGameThreshold: 80, passGameSlope: 1, passGameMaxPenalty: 2
};

function unitAvg(team, slots){
 const slotmap = TEAM_DATA[team];
 let sum=0,count=0;
 slots.forEach(s=>{ if(slotmap[s]){ sum+=slotmap[s].ovr; count++; } });
 return count ? sum/count : 70;
}
function sigmoid(x, mid, slope){ return 1/(1+Math.exp((x-mid)/Math.max(slope,0.1))); }

function getSynergy(team){
 const runAvg = unitAvg(team, RUN_SLOTS);
 const dlAvg = unitAvg(team, DL_SLOTS);
 const covAvg = unitAvg(team, COVERAGE_SLOTS);
 const passGameAvg = unitAvg(team, PASSGAME_SLOTS);
 const runWeak = sigmoid(runAvg, synergy.runThreshold, synergy.runSlope);
 const dlWeak = sigmoid(dlAvg, synergy.passThreshold, synergy.passSlope);
 const covWeak = sigmoid(covAvg, synergy.passThreshold, synergy.passSlope);
 const passWeak = dlWeak * covWeak;
 const passGameWeak = sigmoid(passGameAvg, synergy.passGameThreshold, synergy.passGameSlope);
 return {
  runAvg, dlAvg, covAvg, passGameAvg,
  runPenalty: synergy.runEnabled ? runWeak * synergy.runMaxPenalty : 0,
  passPenalty: synergy.passEnabled ? passWeak * synergy.passMaxPenalty : 0,
  passGamePenalty: synergy.passGameEnabled ? passGameWeak * synergy.passGameMaxPenalty : 0,
  runBadge: synergy.runEnabled && runWeak > 0.5,
  passBadge: synergy.passEnabled && passWeak > 0.25,
  passGameBadge: synergy.passGameEnabled && passGameWeak > 0.5
 };
}

function buildControls(){
 const el = document.getElementById('controls');
 let h = '<p class="zpb-wadj">Adjust any weight and every team\'s score and rank recalculates instantly.</p>'; // w19 (Owner): moved down here, the word left is gone
 h += `<div class="synergy-box">
   <div class="shead"><span>Can't Run Penalty (OL+RB1)</span>
    <label class="switch"><input type="checkbox" id="runToggle" ${synergy.runEnabled?'checked':''}><span class="slider-tog"></span></label>
   </div>
   <div class="sparams">
    <label>Threshold<input type="number" id="runThreshold" value="${synergy.runThreshold}"></label>
    <label>Softness<input type="number" id="runSlope" value="${synergy.runSlope}"></label>
    <label>Max pts<input type="number" id="runMaxPenalty" value="${synergy.runMaxPenalty}"></label>
   </div>
  </div>
  <div class="synergy-box">
   <div class="shead"><span>Weak D Penalty</span>
    <label class="switch"><input type="checkbox" id="passToggle" ${synergy.passEnabled?'checked':''}><span class="slider-tog"></span></label>
   </div>
   <div class="sparams">
    <label>Threshold<input type="number" id="passThreshold" value="${synergy.passThreshold}"></label>
    <label>Softness<input type="number" id="passSlope" value="${synergy.passSlope}"></label>
    <label>Max pts<input type="number" id="passMaxPenalty" value="${synergy.passMaxPenalty}"></label>
   </div>
  </div>
  <div class="synergy-box">
   <div class="shead"><span>Can't Pass Penalty (Pass Game)</span>
    <label class="switch"><input type="checkbox" id="passGameToggle" ${synergy.passGameEnabled?'checked':''}><span class="slider-tog"></span></label>
   </div>
   <div class="sparams">
    <label>Threshold<input type="number" id="passGameThreshold" value="${synergy.passGameThreshold}"></label>
    <label>Softness<input type="number" id="passGameSlope" value="${synergy.passGameSlope}"></label>
    <label>Max pts<input type="number" id="passGameMaxPenalty" value="${synergy.passGameMaxPenalty}"></label>
   </div>
  </div>`;
 GROUPS.forEach(([gname, slots])=>{
  h += `<div class="group"><h3>${gname}</h3><div class="zpb-wbadges">`;
  slots.forEach(s=>{
   const w = Math.round(weights[s]||0);
   h += `<button type="button" class="zpb-wbadge${w<=0?' zpb-woff':''}" data-wslot="${s}" title="${LABELS[s]} — click for the next heavier weight, shift-click for the next lighter one">${LABELS[s]}<b>${w}</b></button>`; // w19 (Owner): weights wear badges
  });
  h += `</div></div>`;
 });
 h += (window.zpbSeriesSelectHTML ? zpbSeriesSelectHTML() : '');  h += `<div class="totalwt" id="totalwt"></div>`;
 h += ` <button class="resetbtn" id="modelWBtn" style="margin-right:6px;">MODEL WEIGHTS</button><button class="resetbtn" id="personalWBtn">SAVE MY WEIGHTS</button>`;
 el.innerHTML = h;
 el.querySelectorAll('input[type=number]').forEach(inp=>{
  inp.addEventListener('input', ()=>{
   if(synergy.hasOwnProperty(inp.id)){
    synergy[inp.id] = parseFloat(inp.value) || 0;
   }
   render();
  });
 });
 el.querySelectorAll('.zpb-wbadge').forEach(b=>{
  b.addEventListener('click', e=>{
   const s = b.dataset.wslot, cur = Math.round(weights[s]||0);
   // w19: weights live on the model's 0-700 scale — a click steps to the next heavier tier, shift-click to the next lighter one
   const TIERS = [0, 1, 5, 20, 40, 60, 80, 100, 150, 200, 250, 295, 320, 350, 525, 700];
   let i = TIERS.findIndex(t=>t>=cur); if(i<0) i = TIERS.length-1;
   weights[s] = e.shiftKey ? TIERS[Math.max(0, i-1)] : (cur>=TIERS[TIERS.length-1] ? 0 : TIERS[i+1]);
   b.querySelector('b').textContent = Math.round(weights[s]);
   b.classList.toggle('zpb-woff', weights[s]<=0);
   render();
  });
 });
 document.getElementById('runToggle').addEventListener('change', e=>{ synergy.runEnabled = e.target.checked; render(); });
 document.getElementById('passToggle').addEventListener('change', e=>{ synergy.passEnabled = e.target.checked; render(); });
 document.getElementById('passGameToggle').addEventListener('change', e=>{ synergy.passGameEnabled = e.target.checked; render(); });
 const refresh = ()=>{ el.querySelectorAll('.zpb-wbadge').forEach(b=>{ const s = b.dataset.wslot, w = Math.round(weights[s]||0); b.querySelector('b').textContent = w; b.classList.toggle('zpb-woff', w<=0); }); render(); };
 document.getElementById('modelWBtn').addEventListener('click', ()=>{ weights = modelWeights(); refresh(); if(typeof zpbWeights3State==='function') zpbWeights3State('model'); });
 document.getElementById('personalWBtn').addEventListener('click', ()=>{ if(!window.zpbWDirty) return; personalWeights = {...weights}; window.zpbWDirty = false; if(typeof zpbWeights3State==='function') zpbWeights3State('saved'); });
 if(typeof zpbWeights3State==='function') zpbWeights3State(personalWeights ? 'saved' : 'init');
}

function computeScore(team){
 const slotmap = TEAM_DATA[team];
 let sum = 0, wsum = 0;
 for(const s in weights){
  const w = weights[s] || 0;
  const ovr = (slotmap[s] ? slotmap[s].ovr : 70);
  sum += ovr * w;
  wsum += w;
 }
 const base = wsum > 0 ? sum / wsum : 0;
 const syn = getSynergy(team);
 return Math.max(0, base - syn.runPenalty - syn.passPenalty - syn.passGamePenalty);
}

const FIRST_STRING_SLOTS = ['QB','RB1','WR1','TE1','OT1','OG1','C','DE1','DT1','MIKE','WILL','SAM','CB1','SS','FS'];

function bestWorst(team){
 const slotmap = TEAM_DATA[team];
 let best=null,worst=null;
 for(const s in weights){
  if((weights[s]||0) <= 0) continue;
  const entry = slotmap[s];
  if(!entry || !entry.name) continue;
  if(!best || entry.ovr > best.ovr) best = {slot:LABELS[s], ...entry};
  if(FIRST_STRING_SLOTS.includes(s) && (!worst || entry.ovr < worst.ovr)) worst = {slot:LABELS[s], ...entry};
 }
 return {best, worst};
}

let currentScored = [];

function render(){
 const teams = Object.keys(TEAM_DATA);
 const scored = teams.map(t=>({team:t, score:computeScore(t)}));
 scored.sort((a,b)=>b.score-a.score);
 currentScored = scored;
 const maxScore = scored[0].score;
 let totalw = 0; for(const s in weights) totalw += (weights[s]||0);
 document.getElementById('totalwt').textContent = `Total weight in use: ${totalw}`;
 const body = document.getElementById('resultsBody');
 let h = '';
 scored.forEach((row, idx)=>{
  const {best, worst} = bestWorst(row.team);
  const syn = getSynergy(row.team);
  let narr = '';
  if(best && worst && best.name !== worst.name){
   // w19 (Owner): the roster's story is two chips — the ANCHOR that holds, and the LEAK that gives it back
   narr = `<span class="zpb-anch" title="The player this roster leans on"><i>⚓</i><b>ANCHOR</b> ${best.name} · ${best.slot} · ${best.ovr}</span>`
        + `<span class="zpb-leak" title="The spot that gives most of it back"><i>◍</i><b>LEAK</b> ${worst.slot} · ${worst.ovr}</span>`;
  } else if(best){
   narr = `<span class="zpb-anch" title="The player this roster leans on"><i>⚓</i><b>ANCHOR</b> ${best.name} · ${best.slot} · ${best.ovr}</span>`;
  }
  const totalPenalty = syn.runPenalty + syn.passPenalty + syn.passGamePenalty;
  let penaltyParts = [];
  if(syn.passPenalty > 0.05) penaltyParts.push(`Weak D (-${syn.passPenalty.toFixed(1)})`);
  if(syn.runPenalty > 0.05) penaltyParts.push(`Can't Run (-${syn.runPenalty.toFixed(1)})`);
  if(syn.passGamePenalty > 0.05) penaltyParts.push(`Can't Pass (-${syn.passGamePenalty.toFixed(1)})`);
  const penaltyNote = penaltyParts.length ? ` — ${penaltyParts.join(' + ')} = -${totalPenalty.toFixed(1)}` : '';
  let badges = '';
  if(syn.runBadge) badges += `<span class="badge badge-run" title="OL+RB1 avg ${syn.runAvg.toFixed(1)}">Can't Run</span>`;
  if(syn.passBadge) badges += `<span class="badge badge-pass" title="Pass rush avg ${syn.dlAvg.toFixed(1)}, coverage avg ${syn.covAvg.toFixed(1)}">Weak D</span>`;
  if(syn.passGameBadge) badges += `<span class="badge badge-passfail" title="Pass game avg ${syn.passGameAvg.toFixed(1)}">Can't Pass</span>`;
  const pct = maxScore ? (row.score/maxScore*100) : 0;
  h += `<tr class="teamrow" data-team="${row.team}">
   <td class="rank">${idx+1}</td>
   <td><div class="team">${row.team}${badges}</div><div class="narr">${narr}${penaltyNote}</div><div class="bar-bg"><div class="bar-fill" style="width:${pct.toFixed(1)}%"></div></div></td>
   <td class="score">${row.score.toFixed(2)}</td>
   <td></td>
  </tr>`;
 });
 body.innerHTML = h;
 body.querySelectorAll('tr.teamrow').forEach(tr=>{
  tr.addEventListener('click', ()=> showTeamDetail(tr.dataset.team));
 });
}

// ---- Team detail panel ----
const DETAIL_KEYS = ['OFFENSE','QB','RB','TE','OL','RUN','PASS','PASSD','RUND','DL','LB','SEC','DEFENSE'];

function groupAvgFromPool(pool, def){
 if(def.parts){
  const top = []; let sum = 0, cnt = 0;
  def.parts.forEach(pt=>{ const got = pool.filter(p=>pt.pos.includes(p[1])).sort((a,b)=>b[3]-a[3]).slice(0, pt.n); got.forEach(p=>top.push(p)); sum += got.reduce((t,p)=>t+p[3],0) + 70*(pt.n-got.length); cnt += pt.n; });
  return {avg: sum/cnt, top};
 }
 const filtered = pool.filter(p=>def.pos.includes(p[1]));
 const sorted = filtered.slice().sort((a,b)=>b[3]-a[3]);
 if(def.rankIndex !== undefined){
  const p = sorted[def.rankIndex];
  return { avg: p ? p[3] : 70, top: p ? [p] : [] };
 }
 const top = sorted.slice(0, def.n);
 const filled = top.length;
 const sum = top.reduce((s,p)=>s+p[3],0) + 70*(def.n - filled);
 return {avg: sum/def.n, top};
}

function groupAvgForTeam(team, def){
 return groupAvgFromPool(PLAYERS.filter(p=>p[2]===team), def);
}

function computeDetailMetrics(pool){
 const allTeams = Object.keys(TEAM_DATA);
 return DETAIL_KEYS.map(key=>{
  const def = GROUP_DEFS.find(g=>g.key===key);
  const teamVals = allTeams.map(t=>groupAvgForTeam(t, def).avg);
  const myVal = groupAvgFromPool(pool, def);
  const rank = Math.min(32, teamVals.filter(v=>v>myVal.avg).length + 1);
  const pct = ((32-rank)/31*100);
  return {key, label: def.label, avg: myVal.avg, top: myVal.top, rank, pct};
 });
}

function renderDetailHTML(title, metrics){
 const strengths = metrics.filter(m=>m.rank<=8).sort((a,b)=>a.rank-b.rank).slice(0,3);
 const weaknesses = metrics.filter(m=>m.rank>=25).sort((a,b)=>b.rank-a.rank).slice(0,3);

 let barsHtml = metrics.map(m=>`
  <div class="metricrow">
   <div>${m.label}</div>
   <div class="mbar-bg"><div class="mbar-fill" style="width:${m.pct.toFixed(0)}%"></div></div>
   <div>#${m.rank}</div>
  </div>`).join('');

 let strengthItems = strengths.length
  ? strengths.map(m=>`<p class="detail-item"><b>${m.label}</b> — ranked #${m.rank} in the league, led by ${m.top[0] ? m.top[0][0] : 'a thin room'}.</p>`).join('')
  : `<p class="detail-item">No unit cracks the league top 8.</p>`;
 let weaknessItems = weaknesses.length
  ? weaknesses.map(m=>`<p class="detail-item zpb-leadline"><b>#${m.rank}</b> ${m.label}</p>`).join('')
  : `<p class="detail-item">No glaring bottom-tier weakness.</p>`;

 return `
  <button class="closebtn" id="closeDetail" aria-label="Close">✕</button>
  <h2>${title}</h2>
  ${barsHtml}
  <div class="detail-text">
   <h4>Strengths</h4>
   ${strengthItems}
   <h4>Weaknesses</h4>
   ${weaknessItems}
  </div>
  <div class="zpb-70fade">Missing depth-chart slots are filled with a default of 70 OVR</div>
 `;
}

function showTeamDetail(team){
 const panel = document.getElementById('detailPanel');
 const metrics = computeDetailMetrics(PLAYERS.filter(p=>p[2]===team));
 panel.innerHTML = renderDetailHTML(team, metrics);
 panel.classList.add('open');
 document.getElementById('closeDetail').addEventListener('click', ()=> panel.classList.remove('open'));
 panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}


// ---- Player Browser ----
const PCOLS = ['name','pos','team','ovr','spd','str','agi','cod','inj','awr'];
let playerSort = {col:'ovr', dir:-1};
let playerFilters = {search:'', pos: new Set(), team:''};
let playerPage = 1; const PLAYER_PAGE_SIZE = 1000000; // every player in one scrollable panel

const QUICK_GROUPS = GROUP_DEFS.filter(g=> g.rankIndex === undefined);

function initPlayerBrowser(){
 const posSet = [...new Set(PLAYERS.map(p=>p[1]))].sort();
 const teamSet = [...new Set(PLAYERS.map(p=>p[2]))].sort();

 const posList = document.getElementById('posList');
 let ph = `<span class="clearbtn" id="posClear">Clear all</span><br>`;
 ph += `<div class="sechead">Individual Positions</div>`;
 posSet.forEach(pos=>{
  ph += `<label><input type="checkbox" value="${pos}" class="posChk"> ${pos}</label>`;
 });
 ph += `<div class="sechead">Quick Groups (click to select)</div><div>`;
 QUICK_GROUPS.forEach(g=>{
  ph += `<span class="qgbtn" data-posgroup='${JSON.stringify(g.pos)}'>${g.label}</span>`;
 });
 ph += `</div>`;
 posList.innerHTML = ph;

 const posBtn = document.getElementById('posBtn');
 posBtn.addEventListener('click', (e)=>{ e.stopPropagation(); posList.classList.toggle('open'); });
 document.addEventListener('click', (e)=>{
  if(!posList.contains(e.target) && e.target !== posBtn){ posList.classList.remove('open'); }
 });
 posList.querySelectorAll('.posChk').forEach(chk=>{
  chk.addEventListener('change', ()=>{
   if(chk.checked) playerFilters.pos.add(chk.value); else playerFilters.pos.delete(chk.value);
   updatePosBtnLabel(); renderPlayers();
  });
 });
 posList.querySelectorAll('.qgbtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
   const arr = JSON.parse(btn.dataset.posgroup);
   playerFilters.pos = new Set(arr);
   posList.querySelectorAll('.posChk').forEach(chk=>{ chk.checked = arr.includes(chk.value); });
   updatePosBtnLabel(); renderPlayers();
  });
 });
 document.getElementById('posClear').addEventListener('click', ()=>{
  playerFilters.pos.clear();
  posList.querySelectorAll('.posChk').forEach(chk=>chk.checked=false);
  updatePosBtnLabel(); renderPlayers();
 });

 const teamSel = document.getElementById('teamFilter');
 teamSet.forEach(t=>{ const o=document.createElement('option'); o.value=t; o.textContent=t; teamSel.appendChild(o); });

 document.getElementById('playerSearch').addEventListener('input', e=>{ playerFilters.search = e.target.value.toLowerCase(); renderPlayers(); });
 teamSel.addEventListener('change', e=>{ playerFilters.team = e.target.value; renderPlayers(); });
 document.querySelectorAll('#playerTable th').forEach(th=>{
  th.addEventListener('click', ()=>{
   const col = th.dataset.col;
   if(playerSort.col === col){ playerSort.dir *= -1; } else { playerSort = {col, dir: col==='name'||col==='pos'||col==='team' ? 1 : -1}; }
   renderPlayers();
  });
 });
 renderPlayers();
}

function updatePosBtnLabel(){
 const btn = document.getElementById('posBtn');
 if(playerFilters.pos.size === 0) btn.textContent = 'All Positions';
 else if(playerFilters.pos.size <= 3) btn.textContent = [...playerFilters.pos].join(', ');
 else btn.textContent = `${playerFilters.pos.size} positions selected`;
}

function renderPlayers(){
 let rows = PLAYERS.filter(p=>{
  if(playerFilters.pos.size > 0 && !playerFilters.pos.has(p[1])) return false;
  if(playerFilters.team && p[2] !== playerFilters.team) return false;
  if(playerFilters.search && !p[0].toLowerCase().includes(playerFilters.search)) return false;
  return true;
 });
 const ci = PCOLS.indexOf(playerSort.col);
 rows = rows.slice().sort((a,b)=>{
  const av=a[ci], bv=b[ci];
  if(typeof av === 'string') return av.localeCompare(bv) * playerSort.dir;
  return (av-bv) * playerSort.dir;
 });
 document.querySelectorAll('#playerTable th').forEach(th=>{
  th.classList.toggle('sorted', th.dataset.col === playerSort.col);
 });
 // Z-post-blue pagination: 15 rows per page (UI only; filter/sort data unchanged)
 const sig = JSON.stringify([ [...playerFilters.pos].sort().join('|'), playerFilters.team, playerFilters.search, playerSort.col, playerSort.dir ]);
 if(sig !== renderPlayers._sig){ renderPlayers._sig = sig; playerPage = 1; }
 const total = Math.max(1, Math.ceil(rows.length / PLAYER_PAGE_SIZE));
 if(playerPage > total) playerPage = total;
 if(playerPage < 1) playerPage = 1;
 const start = (playerPage - 1) * PLAYER_PAGE_SIZE;
 const pageRows = rows.slice(start, start + PLAYER_PAGE_SIZE);
 document.getElementById('playerCount').textContent = `${rows.length} player${rows.length===1?'':'s'}`;
 const body = document.getElementById('playerBody');
 let h = '';
 pageRows.forEach(p=>{
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
  h += `<tr><td>${name}${xf?'<span class="xf">XF</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
 });
 if(!pageRows.length) h = `<tr><td colspan="10" style="text-align:center;color:var(--sub);padding:18px 0;">No players match your filters.</td></tr>`;
 body.innerHTML = h;
 const pager = document.getElementById('playerPager');
 if(pager){
  pager.innerHTML = '';

 }
}

document.getElementById('tabRankingsBtn').addEventListener('click', ()=> setActiveTab('viewRankings','tabRankingsBtn'));
document.getElementById('tabPlayersBtn').addEventListener('click', ()=> setActiveTab('viewPlayers','tabPlayersBtn'));
document.getElementById('tabGroupsBtn').addEventListener('click', ()=>{ try{ zpbInitRankingsUI(); }catch(e){} setActiveTab('viewGroups','tabGroupsBtn'); });
document.getElementById('tabDraftBtn').addEventListener('click', ()=> setActiveTab('viewDraft','tabDraftBtn'));
document.getElementById('tabCompareBtn').addEventListener('click', ()=> setActiveTab('viewCompare','tabCompareBtn'));
document.getElementById('tabGuideBtn').addEventListener('click', ()=> setActiveTab('viewGuide','tabGuideBtn'));
const SUPP_TITLES = {tabRankingsBtn:['Madden Rankings','Every team graded by the weights below. Click any team row for a detailed breakdown.'], tabPlayersBtn:['Player Browser','Every Madden NFL 27 player rating, searchable by name, position and team.'], tabGroupsBtn:['Position Rankings','Toggle any spot from the season draft board on or off — the ranking, the scores and the players rebuild themselves.'], tabCompareBtn:['Team Comparison','Put any two real rosters side by side.'], tabGuideBtn:['Guide','How the simulator works, in plain language.']};
function updateStepper(){
 if(typeof zpbSyncHome==='function') zpbSyncHome();
 const el = document.getElementById('stepper'); if(!el) return;
 let step = 'draft'; const S = (typeof seasonState!=='undefined') ? seasonState : null;
 if(S){ step = S.phase==='complete' ? 'champ' : S.phase==='playoffs' ? 'playoffs' : 'season'; }
 else if(typeof draftSim!=='undefined' && draftSim && draftSim.pos>=draftSim.order.length) step = 'season';
 const order = ['draft','season','playoffs','champ'], at = order.indexOf(step);
 el.querySelectorAll('li').forEach((li,i)=>{ li.classList.toggle('on', i===at); li.classList.toggle('done', i<at); });
}
function setActiveTab(viewId, btnId){
 // resilience: a throw in any helper must never leave the user stuck on the wrong view (w23: failures are logged, never silent)
 try{ { const h = document.getElementById('suppHead'), t = SUPP_TITLES[btnId]; if(h){ if(t){ h.style.display=''; h.innerHTML = `<h2>${t[0]}</h2><p class="narr">${t[1]}</p>`;  } else { h.style.display='none'; h.innerHTML=''; } } const _zh=document.querySelector('.hero'); if(_zh) _zh.style.display = t ? 'none' : ''; window.scrollTo(0,0); } }catch(e){ zpbErr('tabHead', e); }
 try{ updateStepper(); }catch(e){ zpbErr('tabStepper', e); }
 try{
  ['viewRankings','viewPlayers','viewGroups','viewCompare','viewDraft','viewGuide'].forEach(v=>{ const el=document.getElementById(v); if(el) el.classList.toggle('active', v===viewId); });
  ['tabRankingsBtn','tabPlayersBtn','tabGroupsBtn','tabCompareBtn','tabDraftBtn','tabGuideBtn'].forEach(b=>{ const el=document.getElementById(b); if(el) el.classList.toggle('active', b===btnId); });
 }catch(e){ zpbErr('tabToggle', e); }
 try{ if(viewId==='viewRankings'){ const _rb=document.getElementById('resultsBody'); if(_rb && !_rb.children.length) render(); } }catch(e){ zpbErr('tabRankings', e); }
 try{ if(btnId==='tabCompareBtn') renderHomeComparison(); }catch(e){ zpbErr('tabCompare', e); }
 try{ if(btnId==='tabGuideBtn') document.getElementById('guideBody').innerHTML = guideHTMLCached(); }catch(e){ zpbErr('tabGuide', e); }
 try{ if(btnId==='tabDraftBtn') fillDraftGuide(); }catch(e){ zpbErr('tabDraftGuide', e); }
 try{ if(btnId==='tabGroupsBtn'){ zpbInitRankingsUI(); const _gb=document.getElementById('groupBody'); if(_gb && !_gb.childElementCount) zpbRenderRankings(); } }catch(e){ zpbErr('tabGroups', e); } // w23: position rankings rebuild on open if empty
 try{ if(typeof zpbSyncHome==='function') zpbSyncHome(); }catch(e){ zpbErr('tabSyncHome', e); }
 try{ if(typeof zpbFadeScan==='function') zpbFadeScan(); }catch(e){ zpbErr('tabFadeScan', e); }
 try{ const _av=document.getElementById(viewId); if(_av) _av.querySelectorAll('.zpb-fade').forEach(el=>el.classList.add('zpb-fade-in')); }catch(e){ zpbErr('tabReveal', e); } // w23: a view must never open blank
}
function seasonToast(msg){
 const t = document.createElement('div'); t.className = 'fxtoast'; t.textContent = msg;
 document.body.appendChild(t); setTimeout(()=>t.remove(), 3400);
}
// ---- the Season stage: draft, preseason, regular season, playoffs and the review are phases on one primary tab ----
function goSeason(){
 const host = document.getElementById('seasonHost'); if(!host) return;
 if(seasonState){ renderSeasonTab(host); return; }
 if(draftSim && draftSim.pos >= draftSim.order.length){ // w23: no hardcoded 32*26 — the board is 28 rounds
  host.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonHeroBtn">SEASON</button>
   <p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>
   <p class="narr" style="margin-top:6px;"><button class="tabbtn" id="backToResultsBtn" style="width:auto;padding:4px 10px;font-size:0.8rem;">Draft results</button></p>
  </div>`;
  document.getElementById('startSeasonHeroBtn').addEventListener('click', ()=>{ startSeason(); goSeason(); });
  document.getElementById('backToResultsBtn').addEventListener('click', ()=>{ setActiveTab('viewDraft','tabDraftBtn'); const p=document.getElementById('draftFinalResults'); if(p) p.scrollIntoView(); });
  return;
 }
 host.innerHTML = `<div class="panel hero-panel">
  <h2 style="margin-top:0;">Season</h2>
  <p style="font-size:1.18rem;line-height:1.55;">A season with your own team: draft 26 starters first, then 17 regular-season weeks, playoffs, and a Super Bowl.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
   <button class="resetbtn" id="goDraftHeroBtn" style="width:auto;padding:14px 30px;font-size:1.05rem;">Draft your team →</button>
   ${(draftSim && draftSim.pos < draftSim.order.length) ? '<button class="tabbtn" id="goDraftResumeBtn">Continue draft in progress</button>' : ''}
  </div>
  <p class="narr" style="margin-top:12px;">Supplementary: the power-ranking model, the player browser, position rankings and the side-by-side comparison live in the links at the bottom of the page.</p>
 </div>`;
 document.getElementById('goDraftHeroBtn').addEventListener('click', ()=> setActiveTab('viewDraft','tabDraftBtn'));
 const rs = document.getElementById('goDraftResumeBtn'); if(rs) rs.addEventListener('click', ()=>{ setActiveTab('viewDraft','tabDraftBtn'); const d=document.getElementById('draftLive'); if(d && d.style.display!=='none') d.scrollIntoView(); });
 if(typeof zpbFadeScan==='function') zpbFadeScan();
}

(function(){const n=document.querySelector('.footnav'),w=document.querySelector('.wrap');if(n&&w)w.appendChild(n);})();
initPlayerBrowser();
// ---- Z-post-blue: the bar's gold 20-0 is Home (click / Enter / Space) + light-dark theme toggle ----
(function(){
 const hb = document.querySelector('.zpb-home');
 if(hb){
  // one primary tab: viewDraft is home before a season, and the season once it has started
  const goHome = ()=> setActiveTab('viewDraft','tabDraftBtn');
  hb.addEventListener('click', e=>{ e.preventDefault(); goHome(); });
  hb.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goHome(); } });
 }
 const tbtn = document.getElementById('themeToggleBtn');
 if(tbtn){
  const root = document.documentElement;
  const apply = t=>{ if(t){ root.setAttribute('data-theme', t); } else { root.removeAttribute('data-theme'); } tbtn.textContent = (t==='dark') ? '\u2600 LIGHT' : '\u263E DARK'; };
  let saved = null; try{ saved = localStorage.getItem('zpb:theme'); }catch(err){}
  apply(saved);
  tbtn.addEventListener('click', ()=>{
   const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
   const isDark = root.getAttribute('data-theme') ? root.getAttribute('data-theme')==='dark' : sysDark;
   const next = isDark ? 'light' : 'dark';
   apply(next);
   try{ localStorage.setItem('zpb:theme', next); }catch(err){}
  });
 }
})();

// ---- Z-post-blue core: team-color takeover, draft-board franchise frames,
//      header marquee, guide fade-in. UI only - no sim math touched. ----
const ZPB_TEAM_COLORS = {"Arizona Cardinals": ["#97233F", "#000000", "#FFB612"], "Atlanta Falcons": ["#A71930", "#000000", "#A5ACAF"], "Baltimore Ravens": ["#241773", "#000000", "#9E7C0C"], "Buffalo Bills": ["#00338D", "#C60C30", "#FFFFFF"], "Carolina Panthers": ["#0085CA", "#101820", "#BFC0BF"], "Chicago Bears": ["#0B162A", "#000000", "#FFFFFF"], "Cincinnati Bengals": ["#FB4F14", "#000000", "#FFFFFF"], "Cleveland Browns": ["#311D00", "#FF3C00", "#FFFFFF"], "Dallas Cowboys": ["#003594", "#869397", "#FFFFFF"], "Denver Broncos": ["#FB4F14", "#002244", "#FFFFFF"], "Detroit Lions": ["#0076B6", "#B0B7BC", "#000000"], "Green Bay Packers": ["#203731", "#FFB612", "#FFFFFF"], "Houston Texans": ["#03202F", "#A71930", "#FFFFFF"], "Indianapolis Colts": ["#002C5F", "#FFFFFF", "#A2AAAD"], "Jacksonville Jaguars": ["#101820", "#006778", "#D7A22A"], "Kansas City Chiefs": ["#E31837", "#FFB81C", "#FFFFFF"], "Las Vegas Raiders": ["#000000", "#A5ACAF", "#FFFFFF"], "Los Angeles Chargers": ["#0080C6", "#FFC20E", "#FFFFFF"], "Los Angeles Rams": ["#003594", "#FFD100", "#FFFFFF"], "Miami Dolphins": ["#008E97", "#FC4C02", "#FFFFFF"], "Minnesota Vikings": ["#4F2683", "#FFC62F", "#FFFFFF"], "New England Patriots": ["#002244", "#C60C30", "#BFC0BF"], "New Orleans Saints": ["#D3BC8D", "#101820", "#FFFFFF"], "NY Giants": ["#0B2265", "#A71930", "#A5ACAF"], "NY Jets": ["#125740", "#FFFFFF", "#000000"], "Philadelphia Eagles": ["#004C54", "#A5ACAF", "#000000"], "Pittsburgh Steelers": ["#FFB612", "#101820", "#FFFFFF"], "San Francisco 49ers": ["#AA0000", "#B3995D", "#FFFFFF"], "Seattle Seahawks": ["#002244", "#69BE28", "#A5ACAF"], "Tampa Bay Buccaneers": ["#D50A0A", "#34302B", "#FF7900"], "Tennessee Titans": ["#4B92DB", "#0C2340", "#C8102E"], "Washington Commanders": ["#5A1414", "#FFB612", "#FFFFFF"]};
/* ZPB_LOGOS: imported from ./data */
let zpbState = {teamName:null, packs:{}};
// franchise crest (embedded data URI); falls back to '' when unknown
function zpbTeamLogo(name){ const u=ZPB_LOGOS[name]; if(!u) return '';
 const bright = (name==='NY Giants' || name==='Los Angeles Rams') ? ' zpb-logo-bright' : '';   // the two darkest crests, lifted
 return '<img class="zpb-logo'+bright+'" loading="lazy" src="'+u+'" alt="'+(TEAM_ABBR[name]||name)+'" title="'+name+'">'; }
// board TEAM cell: the crest instead of the abbreviation, abbr as the fallback
function zpbTeamCell(name){ const l=zpbTeamLogo(name); return l||TEAM_ABBR[name]||name; }
function zpbRgb(h){ h=String(h).replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join('');
 const n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
function zpbHex(r,g,b){ return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function zpbMix(a,b,t){ const A=zpbRgb(a),B=zpbRgb(b); return zpbHex(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); }
function zpbHsl(hex){ let [r,g,b]=zpbRgb(hex).map(v=>v/255);
 const mx=Math.max(r,g,b), mn=Math.min(r,g,b); let h=0,s=0; const l=(mx+mn)/2;
 if(mx!==mn){ const d=mx-mn; s = l>0.5 ? d/(2-mx-mn) : d/(mx+mn);
  h = mx===r ? (g-b)/d+(g<b?6:0) : mx===g ? (b-r)/d+2 : (r-g)/d+4; h/=6; }
 return {h:h*360, s, l}; }
function zpbFromHsl(H,S,L){ const c=(1-Math.abs(2*L-1))*S, X=c*(1-Math.abs((H/60)%2-1)), m=L-c/2;
 let r,g,b;
 if(H<60){r=c;g=X;b=0} else if(H<120){r=X;g=c;b=0} else if(H<180){r=0;g=c;b=X}
 else if(H<240){r=0;g=X;b=c} else if(H<300){r=X;g=0;b=c} else {r=c;g=0;b=X}
 return zpbHex((r+m)*255,(g+m)*255,(b+m)*255); }
function zpbLum(hex){ return zpbRgb(hex).map(v=>{ v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); })
 .reduce((acc,v,i)=>acc+v*[0.2126,0.7152,0.0722][i],0); }
function zpbContrast(a,b){ const l1=zpbLum(a), l2=zpbLum(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); }
function zpbRgba(hex,a){ const [r,g,b]=zpbRgb(hex); return 'rgba('+r+','+g+','+b+','+a+')'; }
// tone a brand color until it reads on the given background (keeps hue+saturation: darker/paler, never grey)
function zpbReadable(hex,bg,darkMode,target){
 const c=zpbHsl(hex); const s=Math.max(c.s,0.42); let l=c.l;
 for(let i=0;i<90;i++){
  const out=zpbFromHsl(c.h,s,l);
  if(zpbContrast(out,bg)>=target) break;
  if(!darkMode){ if(l<=0.15) break; l-=0.015; } else { if(l>=0.9) break; l+=0.015; }
 }
 return zpbFromHsl(c.h,s,l); }
function zpbShade(hex,t){ const c=zpbHsl(hex); return zpbFromHsl(c.h, Math.min(1,Math.max(c.s,0.42)), Math.max(0.16, c.l-t)); }
function zpbTint(hex,t){ const c=zpbHsl(hex); return zpbFromHsl(c.h, Math.min(1,Math.max(c.s,0.3)), Math.min(0.88, c.l+t)); }
// one display pack per franchise: brand chips stay the true 3 hexes; UI tones shift for accessibility
function zpbPackFor(name){
 if(zpbState.packs[name]) return zpbState.packs[name];
 const raw=ZPB_TEAM_COLORS[name]; if(!raw) return null;
 const [P,Q,R]=raw;
 let eng = raw[0];                                   // brand primary leads the identity
 if(zpbHsl(eng).s < 0.15) eng = raw.slice().sort((a,b)=>zpbHsl(b).s - zpbHsl(a).s)[0];   // non-chromatic primary (e.g. LV): most chromatic brand color
 if(zpbHsl(eng).s < 0.15) eng = zpbMix(eng,'#c9a24b',0.45);   // still no chroma (LV): warm it, chips stay true
 // w19 (Owner): a near-black navy reads too dark — when the badge carries a silver, blend it in so the text brightens without losing the team
 { const metals = raw.filter(h=>{ const c=zpbHsl(h); return c.s<0.14 && c.l>0.45; });
   if(zpbHsl(eng).l < 0.26 && metals.length){
     const metal = metals.find(h=>{ const c=zpbHsl(h); return c.l>=0.55 && c.l<=0.92; }) || metals[metals.length-1];
     eng = zpbMix(eng, metal, 0.45);
   }
 }
 const bgL='#fcf7f1', bgD='#181114';
 const accL=zpbReadable(eng,bgL,false,4.6), accD=zpbReadable(eng,bgD,true,4.6);
 const rest = raw.filter(h=>h!==eng);
 const flo = h=>{ const c=zpbHsl(h); if(c.l<0.18 || c.s<0.15){ const e=zpbHsl(eng); return zpbFromHsl(e.h, Math.max(0.12, Math.min(e.s, 0.34)), c.l<0.18 ? 0.22 : Math.min(Math.max(c.l,0.3),0.72)); } return zpbFromHsl(c.h, Math.max(c.s,0.42), Math.min(Math.max(c.l,0.3),0.55)); };
 // v7: bright secondary yellows are toned to the site's deep shimmering gold in light mode (no 'snot yellow')
 const goldTone = h=>{ const c=zpbHsl(h); return (c.h>=30&&c.h<=70&&c.l>0.42) ? zpbMix(zpbFromHsl(c.h,Math.min(1,Math.max(c.s,0.55)),0.5),'#c9a24b',0.45) : h; };
 const q=goldTone(flo(rest[0]!==undefined?rest[0]:eng)), r=goldTone(flo(rest[1]!==undefined?rest[1]:eng));
 const acc2L=zpbReadable(q,bgL,false,4.2), acc3L=zpbReadable(r,bgL,false,4.2);
 const acc2D=zpbReadable(q,bgD,true,4.2),  acc3D=zpbReadable(r,bgD,true,4.2);
 const txL=zpbReadable(eng,bgL,false,7.0);
 const txd=zpbMix('#f5e9dd',accD,0.14), sud=zpbMix('#c8a48f',accD,0.2);
 const hairL=zpbMix(accL,bgL,0.42), hairD=zpbMix(accD,bgD,0.4);
 const pk={ raw:[P,Q,R], accL,accD,acc2L,acc2D,acc3L,acc3D,
  txL, txd, sud, hairL, hairD,
  bgL:zpbMix(bgL,accL,0.045), bgD:zpbMix(bgD,accD,0.09),
  on:(function(){ const m=zpbMix(zpbMix(accL,acc2L,0.5),acc3L,0.25); return zpbContrast('#2c1e0c',m)>=zpbContrast('#fffaf2',m) ? '#2c1e0c' : '#fffaf2'; })(),
  onD:(function(){ const m=zpbMix(zpbMix(accD,acc2D,0.5),acc3D,0.25); return zpbContrast('#2c1e0c',m)>=zpbContrast('#fffaf2',m) ? '#2c1e0c' : '#fffaf2'; })(),
  g1:zpbShade(accL,0.12), g2:acc2L, g3:zpbTint(accL,0.34), g4:acc3L, g5:accL, g6:zpbTint(acc2L,0.3),
  g1d:accD, g2d:zpbTint(accD,0.22), g3d:zpbMix(accD,'#ffffff',0.68), g4d:acc2D, g5d:zpbTint(accD,0.1), g6d:zpbMix(acc2D,'#ffffff',0.5),
  b1:zpbShade(accL,0.1), b2:zpbMix(acc2L,'#ffffff',0.25), b3:zpbMix('#ffffff',acc2L,0.2), b4:acc3L, b5:accL, b6:zpbMix(acc2L,'#ffffff',0.3),
  b1d:zpbShade(accD,0.12), b2d:zpbTint(acc2D,0.15), b3d:zpbMix('#ffffff',acc2D,0.3), b4d:acc3D, b5d:accD, b6d:zpbTint(acc2D,0.3),
  o1:zpbMix('#ffffff',acc2L,0.55), o2:zpbTint(accL,0.28), o3:accL, o4:zpbShade(accL,0.2),
  o1d:zpbMix('#ffffff',acc2D,0.5), o2d:zpbTint(accD,0.25), o3d:accD, o4d:zpbShade(accD,0.2),
  d1:acc3L, d2:zpbTint(acc2L,0.35), d1d:acc3D, d2d:zpbTint(acc2D,0.3) };
 pk.vars = {
  '--tA':accL,'--tA2':acc2L,'--tA3':acc3L,'--tTx':txL,'--tSu':zpbSoft(eng,bgL),'--tHr':hairL,
  '--tGb':zpbRgba(accL,0.18),'--tGl':zpbRgba(accL,0.30),'--tGa':zpbRgba(accL,0.30),'--tGw':zpbRgba(acc2L,0.16),
  '--tBg':pk.bgL,'--tOn':pk.on,
  '--tBSs':zpbRgba(accL,0.38),'--tBSs2':zpbRgba(accL,0.5),'--tBSsb':zpbRgba(accL,0.42),
  '--tOGs':zpbRgba(acc2L,0.5),'--tOGhs':zpbRgba(acc2L,0.68),
  '--tTA':zpbRgba(accL,0.20),'--tTB':zpbRgba(acc3L,0.12),'--tTC':zpbRgba(accL,0.08),
  '--tTD':zpbRgba(acc3L,0.30),'--tTE':zpbRgba(acc3L,0.16),
  '--tG1':pk.g1,'--tG2':pk.g2,'--tG3':pk.g3,'--tG4':pk.g4,'--tG5':pk.g5,'--tG6':pk.g6,
  '--tB1':pk.b1,'--tB2':pk.b2,'--tB3':pk.b3,'--tB4':pk.b4,'--tB5':pk.b5,'--tB6':pk.b6,
  '--tO1':pk.o1,'--tO2':pk.o2,'--tO3':pk.o3,'--tO4':pk.o4,'--tD1':pk.d1,'--tD2':pk.d2,
  '--tAd':accD,'--tA2d':acc2D,'--tA3d':acc3D,'--tTxd':txd,'--tSud':sud,'--tHrd':hairD,
  '--tGbd':zpbRgba(accD,0.16),'--tGld':zpbRgba(accD,0.30),'--tGad':zpbRgba(accD,0.10),'--tGwd':zpbRgba(acc2D,0.08),
  '--tBgd':pk.bgD,'--tOnd':pk.onD,
  '--tBSsd':zpbRgba(accD,0.34),'--tBSs2d':zpbRgba(accD,0.5),'--tBSsbd':zpbRgba(accD,0.4),
  '--tOGsd':zpbRgba(acc2D,0.45),'--tOGhsd':zpbRgba(acc2D,0.62),
  '--tTAd':zpbRgba(accD,0.16),'--tTBd':zpbRgba(acc3D,0.10),'--tTCd':zpbRgba(accD,0.08),
  '--tTDd':zpbRgba(acc3D,0.30),'--tTEd':zpbRgba(acc3D,0.16),
  '--tG1d':pk.g1d,'--tG2d':pk.g2d,'--tG3d':pk.g3d,'--tG4d':pk.g4d,'--tG5d':pk.g5d,'--tG6d':pk.g6d,
  '--tB1d':pk.b1d,'--tB2d':pk.b2d,'--tB3d':pk.b3d,'--tB4d':pk.b4d,'--tB5d':pk.b5d,'--tB6d':pk.b6d,
  '--tO1d':pk.o1d,'--tO2d':pk.o2d,'--tO3d':pk.o3d,'--tO4d':pk.o4d,'--tD1d':pk.d1d,'--tD2d':pk.d2d };
 zpbState.packs[name]=pk; return pk;
}
function zpbSoft(hex,bg){
 const c=zpbHsl(hex); let l=Math.max(c.l,0.3); const s=Math.max(c.s,0.4);
 let out=zpbFromHsl(c.h,s,l);
 for(let i=0;i<60 && zpbContrast(out,bg)>4.9; i++){ l+=0.02; out=zpbFromHsl(c.h,s,l); }
 return out; }
const ZPB_TOKEN_KEYS = ['--tA','--tA2','--tA3','--tTx','--tSu','--tHr','--tGb','--tGl','--tGa','--tGw','--tBg','--tOn',
 '--tBSs','--tBSs2','--tBSsb','--tOGs','--tOGhs','--tTA','--tTB','--tTC','--tTD','--tTE',
 '--tG1','--tG2','--tG3','--tG4','--tG5','--tG6','--tB1','--tB2','--tB3','--tB4','--tB5','--tB6',
 '--tO1','--tO2','--tO3','--tO4','--tD1','--tD2',
 '--tAd','--tA2d','--tA3d','--tTxd','--tSud','--tHrd','--tGbd','--tGld','--tGad','--tGwd','--tBgd','--tOnd',
 '--tBSsd','--tBSs2d','--tBSsbd','--tOGsd','--tOGhsd','--tTAd','--tTBd','--tTCd','--tTDd','--tTEd',
 '--tG1d','--tG2d','--tG3d','--tG4d','--tG5d','--tG6d','--tB1d','--tB2d','--tB3d','--tB4d','--tB5d','--tB6d',
 '--tO1d','--tO2d','--tO3d','--tO4d','--tD1d','--tD2d'];
function zpbApplyTeamTheme(name){
 const root=document.documentElement, pk=zpbPackFor(name);
 if(!pk){ zpbClearTeamTheme(); return; }
 zpbState.teamName=name;
 for(const k in pk.vars) root.style.setProperty(k, pk.vars[k]);
 root.setAttribute('data-zpbteam','1');
}
function zpbClearTeamTheme(){
 const root=document.documentElement;
 ZPB_TOKEN_KEYS.forEach(k=>root.style.removeProperty(k));
 root.removeAttribute('data-zpbteam');
 zpbState.teamName=null;
}
// the true 3 brand hexes, always (chips/stripe identity)
function zpbTeamChips(name){
 const pk=zpbPackFor(name); if(!pk) return '';
 return '<span class="zpb-chip" aria-hidden="true" style="--c1:'+pk.raw[0]+';--c2:'+pk.raw[1]+';--c3:'+pk.raw[2]+'"><i></i><i></i><i></i></span>';
}
// inline custom props consumed by .zpb-trow (light + dark sets, swapped by CSS)
function zpbRowVars(name){
 const pk=zpbPackFor(name); if(!pk) return '';
 return '--zr1:'+zpbRgba((window.zpbLift?zpbLift(pk.accL,0.58):pk.accL),0.12)+';--zr2:'+zpbRgba((window.zpbLift?zpbLift(pk.accL,0.58):pk.accL),0.03)+';--zr3:'+zpbRgba((window.zpbLift?zpbLift(pk.raw[2],0.58):pk.raw[2]),0.10)+';--zrb:'+pk.accL+
  ';--zr1d:'+zpbRgba(pk.accD,0.15)+';--zr2d:'+zpbRgba(pk.accD,0.04)+';--zr3d:'+zpbRgba(pk.raw[2],0.12)+';--zrbd:'+pk.accD+';';
}
function zpbUserRowVars(){ return zpbState.teamName ? zpbRowVars(zpbState.teamName) : ''; }
// VL-style marquee: both tracks carry duplicated content for a seamless -50% loop
function zpbBuildMarquee(){
 ['zpbMqA','zpbMqB'].forEach(id=>{
  const el=document.getElementById(id); if(!el) return;
  let u=''; for(let i=0;i<18;i++) u+='<span>20<span class="zpb-hy">-</span>0</span><i>\u00b7</i>';
  el.innerHTML = u+u;
 });
}
function zpbWireGuideFade(){
 const h=document.getElementById('draftGuideHost'); if(!h || h.dataset.fadeWired) return;
 h.dataset.fadeWired='1';
 // bidirectional: fades in scrolling down, fades out at the same speed scrolling back up
 if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ h.classList.toggle('zpb-guide-in', e.isIntersecting); }); },
   {rootMargin:'0px 0px -8% 0px', threshold:0.05});
  io.observe(h); h._zpbIO=io;
 } else {
  const tick=()=>{ const r=h.getBoundingClientRect(); h.classList.toggle('zpb-guide-in', r.top < window.innerHeight*0.94 && r.bottom > 0); };
  window.addEventListener('scroll',tick,{passive:true}); window.addEventListener('resize',tick);
 }
}
function zpbRewireGuide(){
 const h=document.getElementById('draftGuideHost'); if(!h) return;
 h.classList.remove('zpb-guide-in');
 if(h._zpbIO){ try{ h._zpbIO.observe(h); }catch(e){} }
}
// home = draft setup in view; drives tagline/stepper trim + marquee visibility
function zpbSyncHome(){
 const vd=document.getElementById('viewDraft'), ds=document.getElementById('draftSetup');
 const home = !!(vd && vd.classList.contains('active') && ds && ds.style.display!=='none');
 document.body.setAttribute('data-home', home?'1':'0');
}
// ---- the homepage fade, applied across the site's text pages: one observer
//      toggles the class both ways, so leaving the viewport fades out too.
//      Scope: static text surfaces (guide sections, page headers, stage intros)
//      — live-sim chrome is deliberately excluded so week-by-week re-renders
//      never flicker.
var zpbFadeIO = null;
var zpbFadeIO = null;
function zpbFadeScan(){
 if(!('IntersectionObserver' in window)) return;
 if(!zpbFadeIO){
  zpbFadeIO = new IntersectionObserver(function(es){
   es.forEach(function(e){ e.target.classList.toggle('zpb-fade-in', e.isIntersecting); });
  },{rootMargin:'0px 0px -8% 0px', threshold:0.06});
 }
 document.querySelectorAll('#guideBody .panel, #suppHead h2, #suppHead p.narr, #homeCmpResult .panel, #seasonHost .hero-panel').forEach(function(el){
  if(el.dataset.zpbfade) return;
  el.dataset.zpbfade = '1';
  el.classList.add('zpb-fade');
  el.classList.add('zpb-fade-in'); // w23: content is born visible — the observer only fades per scroll from here on
  zpbFadeIO.observe(el);
 });
}
zpbBuildMarquee(); zpbWireGuideFade(); zpbSyncHome(); zpbFadeScan();

// ---- Z-post-blue v7: caution dialog, lineup name compression, preview strip,
//      the ESPN-style game replay. UI only - no sim math touched. ----
function zpbCaution(yesLabel, onYes){
 const ov = document.createElement('div'); ov.className = 'zpb-caution-ov';
 ov.innerHTML = '<div class="zpb-caution"><div class="zpb-warn">!</div>'
  + '<h3 style="margin:0 0 6px;">Caution: Your current season will be erased if you continue</h3>'
  + '<p class="narr" style="margin:0 0 16px;">Results, stats and awards in progress are thrown away.</p>'
  + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">'
  + '<button class="tabbtn" data-zc="no">Return to the season</button>'
  + '<button class="resetbtn" data-zc="yes" style="width:auto;margin:0;padding:9px 18px;background:var(--bad);color:#fff;">' + yesLabel + '</button>'
  + '</div></div>';
 document.body.appendChild(ov);
 ov.addEventListener('click', e=>{ const t = e.target.closest('[data-zc]'); if(!t && e.target!==ov) return; ov.remove(); if(t && t.dataset.zc==='yes') onYes(); });
}
// preseason: show the last name only when the window compresses
function zpbFitLineupNames(){
 const narrow = window.innerWidth < 700;
 document.querySelectorAll('select[data-lineup]').forEach(sel=>{
  Array.prototype.forEach.call(sel.options, o=>{
   if(!o.dataset.full) o.dataset.full = o.textContent;
   if(window.innerWidth < 700){
     const nm = o.dataset.full.split(' \u2014 ')[0].trim().split(' ');
     o.textContent = nm[nm.length-1];
    } else if(window.innerWidth < 1024){
     const pr = o.dataset.full.split(' \u2014 '); const nm = (pr[0]||'').trim().split(' ');
     const last = nm[nm.length-1]; const ini = nm.length>1 ? (nm[0].charAt(0)+'. ') : '';
     o.textContent = (ini + last) + (pr.length>1 ? ' \u2014 ' + pr.slice(1).join(' \u2014 ') : '');
    } else {
     o.textContent = o.dataset.full;
    }
  });
 });
}
window.addEventListener('resize', function(){ clearTimeout(window.__zpbFitT); window.__zpbFitT = setTimeout(zpbFitLineupNames, 160); });
function zpbAutoWhyHTML(isAuto){ return ''; }
function zpbPreviewStripHTML(g){
 try{
  const S = seasonState; if(!S || typeof topMatchupSwings!=='function') return '';
  const sw = topMatchupSwings(g.home, g.away, 2, g);
  const hp = sw.projHome, ap = sw.projAway, tot = Math.max(hp+ap, 0.1);
  const pw = Math.min(0.86, Math.max(0.14, hp/tot));
  const stH = (typeof zpbRowVars==='function') ? zpbRowVars(g.home) : '';
  const stA = (typeof zpbRowVars==='function') ? zpbRowVars(g.away) : '';
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const chips = ((sw.list||[]).slice(0,2)).map(e=>{
   const owner = e.ownerSide==='home' ? g.home : g.away;
   const st2 = (typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';
   const su = (typeof shortUnit==='function') ? shortUnit(e.unit) : e.unit;
   return '<span class="zpb-edge" style="'+st2+'">'+lg(owner)+su+' <b>+'+(e.pts>=0?'+':'\u2212')+Math.abs(e.pts).toFixed(1)+'</b></span>';
  }).join('');
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team" style="'+stA+'">'+lg(g.away)+'<div><span class="narr">model '+ap.toFixed(1)+'</span></div></div>'
   + '<div class="zpb-strip-bar"><i style="width:'+(pw*100).toFixed(1)+'%;"></i><span>'+Math.round((1-pw)*100)+'% \u2013 '+Math.round(pw*100)+'%</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h" style="'+stH+'"><div style="text-align:right;"><span class="narr">model '+hp.toFixed(1)+'</span></div>'+lg(g.home)+'</div>'
   + '</div>'
   + (chips ? '<div class="zpb-strip-edges">'+chips+'</div>' : '');
 }catch(err){ return ''; }
}
// the game replay: score appears by play and quarter, ESPN-style scoring log
function zpbGameReplay(g, focusTeam){
 try{
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.querySelector('.zpb-replay-ov')) return;
  const r = g.result; if(!r || !r.homeEvents) return;
  const evs = r.homeEvents.map(e=>Object.assign({}, e, {side:'home'}))
   .concat(r.awayEvents.map(e=>Object.assign({}, e, {side:'away'})))
   .sort((a,b)=> a.q-b.q || a.t-b.t);
  if(!evs.length) return;
  const info = {};
  ['home','away'].forEach(sd=>{
   const det = (g.detail && g.detail[sd]) || {};
   const ps = det.players || [];
   let qbName = '', kicker = '';
   const recs = [], rush = [];
   ps.forEach(p=>{
    const st = p.st || {};
    if(p.slot==='K') kicker = p.name;
    if(p.slot==='QB' && !qbName) qbName = p.name;
    const rt = st.rushTD || 0; for(let i=0;i<rt;i++) rush.push(p.name);
    const ct = st.recTD || 0; for(let i=0;i<ct;i++) recs.push(p.name);
   });
   const ovb = {}; ps.forEach(p=>{ if(p && p.name) ovb[p.name] = p.ovr || 0; }); // w21: OVR per name drives the 85+/90+ rules
   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush, ovb:ovb};
  });
  const describe = e=>{
   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:'', ovb:{}};
   const _sc = colOf(g[e.side]); // w21 (Owner): every box wears the color of the team the play helps
   const zpbChip = (t, cl)=>'<span class="zrl-badge zrl-chip" style="--zrb:' + (cl || _sc) + ';color:' + (cl || _sc) + ';">' + t + '</span>';
   const zpbYds = s=>{ const m = /(\d+)\s*yds/.exec(s||''); return m ? zpbChip(m[1]+'Y') : ''; };
   if(e.type==='FG') return nameSpan(inf.kicker || 'Kicker', e.side) + ' ' + zpbChip('FG') + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'fg')) : '');
   if(e.type==='SAF') return 'Safety';
   if(e.type==='TD'){
    const total = inf.recs.length + inf.rush.length;
    const isPass = total ? Math.random() < (inf.recs.length/total) : false;
    if(isPass && inf.recs.length) return nameSpan(inf.qbName || 'Quarterback', e.side) + ' to ' + nameSpan(inf.recs.shift(), e.side) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');
    if(inf.rush.length) return nameSpan(inf.rush.shift(), e.side) + ' rush ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'run')) : ''); // w19 (Owner): RUSH, yardage box beside it
    if(inf.recs.length) return nameSpan(inf.qbName || 'Quarterback', e.side) + ' to ' + nameSpan(inf.recs.shift(), e.side) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');
    return 'Touchdown';
   }
   return 'Score';
  };
  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return pk ? pk.accL : 'var(--accent)'; };
  const nameSpan = (nm, sd)=>{ if(!nm) return ''; const inf = info[sd] || {}; const o = (inf.ovb && inf.ovb[nm]) || 0; const c = colOf(g[sd]);
   if(o>=90) return '<span class="zrl-pl zpb-shm" style="--zrb:' + c + ';">' + nm + '</span>';  // w21 (Owner): 90+ shimmering in the team color
   if(o>=85) return '<span class="zrl-pl" style="color:' + c + ';">' + nm + '</span>';           // w21 (Owner): 85+ vibrant in the team color
   return '<span class="zrl-pl">' + nm + '</span>'; };
  const crest = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  ov.innerHTML = '<div class="zpb-replay">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b>' + (TEAM_ABBR[g.away]||g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b>' + (TEAM_ABBR[g.home]||g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div></div>'
   + '</div>';
  document.body.appendChild(ov);
  const log = ov.querySelector('#zrepLog'), qchip = ov.querySelector('#zrepQ'),
        sa = ov.querySelector('#zrepSa'), sh = ov.querySelector('#zrepSh'), prog = ov.querySelector('#zrepProg');
  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  let hs = 0, as = 0, timers = [];
  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); };
  ov.addEventListener('click', e=>{ if(e.target===ov || e.target.closest('#zrepSkip')) close(); });
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown', esc); } });
  const total = evs.length;
  const step = Math.min(2400, Math.max(1150, 13500/total));
  let t = 700;
  timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
  // w21 (Owner): the 1st Quarter always appears — every quarter gets its banner, even with no big events
  const seq = []; let evDone = 0;
  { let qSeen = 0;
    evs.forEach(e=>{ while(qSeen+1 < e.q){ qSeen++; seq.push({banner:qSeen}); }
    if(qSeen < e.q){ qSeen = e.q; seq.push({banner:qSeen}); } seq.push({ev:e}); });
    while(qSeen < 4){ qSeen++; seq.push({banner:qSeen}); } }
  seq.forEach(item=>{
   if(item.banner){ const qq = item.banner;
    timers.push(setTimeout(()=>{
     qchip.textContent = (QN[qq]||('Q'+qq)).split(' ')[0];
     const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);
     log.appendChild(d);
    }, t));
    t += 520;
    return;
   }
   const ev = item.ev;
   timers.push(setTimeout(()=>{
    if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
    sa.textContent = as; sh.textContent = hs;
    const line = document.createElement('div');
    line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
    const ab = TEAM_ABBR[g[ev.side]] || g[ev.side];
    line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
     + '<span class="zrl-team" style="color:' + colOf(g[ev.side]) + ';">' + ab + '</span><span class="zrl-play">' + describe(ev)
     + '</span><span class="zrl-pts">+' + (ev.pts||0) + '</span><span class="zrl-sc">' + as + '\u2013' + hs + '</span>';
    log.appendChild(line);
    requestAnimationFrame(()=>{ line.classList.add('in'); });
    log.scrollTop = log.scrollHeight;
    evDone++;
    prog.style.width = (8 + 88*(evDone/total)).toFixed(1) + '%';
   }, t));
   t += step;
  });
  timers.push(setTimeout(()=>{
   qchip.textContent = 'FINAL';
   const fin = document.createElement('div'); fin.className = 'zpb-rep-final';
   const winTxt = focusTeam ? ((g.home===focusTeam ? hs>as : as>hs) ? 'You win' : (hs===as ? 'Tie' : 'You lose')) : (hs>as ? g.home+' win' : g.away+' win');
   fin.innerHTML = '<b>FINAL \u00b7 ' + as + '\u2013' + hs + '</b><span>' + winTxt + '</span>';
   log.appendChild(fin);
   const btn = document.createElement('button'); btn.className = 'resetbtn';
   btn.style.width = 'auto'; btn.style.margin = '0'; btn.style.padding = '8px 22px'; btn.textContent = 'Continue';
   btn.addEventListener('click', close);
   ov.querySelector('.zpb-rep-ft').appendChild(btn);
   log.scrollTop = log.scrollHeight;
   prog.style.width = '100%';
   timers.push(setTimeout(close, 6000));
  }, t + 900));
 }catch(err){}
}

// ---- Z-post-blue v8: the active sort shows on the board headers (arrow +
//      accent), so every number column visibly sorts when clicked ----
(function(){
 const sync = ()=>{
  const sel = document.getElementById('draftSort2'); if(!sel) return;
  document.querySelectorAll('#viewDraft th.sortable').forEach(th=>{
   const on = th.dataset.sort===sel.value;
   th.classList.toggle('sort-sel', on);
   if(on) th.dataset.dir = (typeof draftUI!=='undefined' && draftUI.sortAsc) ? 'asc' : 'desc';
   else th.removeAttribute('data-dir');
  });
 };
 if(typeof renderDraftBoard2==='function'){
  const _rdb2 = renderDraftBoard2;
  renderDraftBoard2 = function(){ const r = _rdb2.apply(this, arguments); try{ sync(); }catch(e){} return r; };
 }
})();
// ---- end v8 ----// ---- Z-post-blue v9 (ninth wave) ---- Owner: 25 Oct, ~48 directives.
// Part 1: the game replay (30-60 s, turnovers, team colors, star, no timeout,
// clutch + playoff + Super Bowl cinematics), the rest-of-season summary, and
// the graphical 100-season report. UI only - no sim math touched.

function zpbGameReplay(g, focusTeam){
 try{
  if(window.__zpbSilent) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(document.querySelector('.zpb-replay-ov')) return;
  const r = g.result; if(!r || !r.homeEvents) return;
  const evs = r.homeEvents.map(e=>Object.assign({}, e, {side:'home'}))
   .concat(r.awayEvents.map(e=>Object.assign({}, e, {side:'away'})))
   .sort((a,b)=> a.q-b.q || a.t-b.t);
  if(!evs.length) return;
  const info = {};
  ['home','away'].forEach(sd=>{
   const det = (g.detail && g.detail[sd]) || {};
   const ps = det.players || [];
   let qbName = '', kicker = '';
   const recs = [], rush = [];
   ps.forEach(p=>{
    const st = p.st || {};
    if(p.slot==='K') kicker = p.name;
    if(p.slot==='QB' && !qbName) qbName = p.name;
    const rt = st.rushTD || 0; for(let i=0;i<rt;i++) rush.push(p.name);
    const ct = st.recTD || 0; for(let i=0;i<ct;i++) recs.push(p.name);
   });
   const dtq = ((g.detail && g.detail[sd] && g.detail[sd].defScores) || []).slice().sort((a,b)=>(a.q-b.q)).map(d=>({name:d.name, kind:d.type}));
   const ovb = {}; ps.forEach(p=>{ if(p && p.name) ovb[p.name] = p.ovr || 0; }); // w21: OVR per name drives the 85+/90+ rules
   info[sd] = {qbName:qbName, kicker:kicker, recs:recs, rush:rush, dtq:dtq, ovb:ovb};
  });
  const describe = e=>{
   const inf = info[e.side] || {recs:[], rush:[], qbName:'', kicker:'', dtq:[], ovb:{}};
   const _sc = colOf(g[e.side]); // w21 (Owner): every box wears the color of the team the play helps
   const zpbChip = (t, cl)=>'<span class="zrl-badge zrl-chip" style="--zrb:' + (cl || _sc) + ';color:' + (cl || _sc) + ';">' + t + '</span>';
   const zpbYds = s=>{ const m = /(\d+)\s*yds/.exec(s||''); return m ? zpbChip(m[1]+'Y') : ''; };
   if(e.type==='FG') return nameSpan(inf.kicker || 'Kicker', e.side) + ' ' + zpbChip('FG') + (window.zpbCineYds ? ' ' + zpbYds(zpbCineYds(e,'fg')) : '');
   if(e.type==='SAF') return 'Safety';
   if(e.type==='TD'){
    const total = inf.recs.length + inf.rush.length;
    const isPass = total ? Math.random() < (inf.recs.length/total) : false;
    if(isPass && inf.recs.length) return nameSpan(inf.qbName || 'Quarterback', e.side) + ' to ' + nameSpan(inf.recs.shift(), e.side) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');
    if(inf.rush.length) return nameSpan(inf.rush.shift(), e.side) + ' rush ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'run')) : ''); // w19 (Owner): RUSH, yardage box beside it
    if(inf.recs.length) return nameSpan(inf.qbName || 'Quarterback', e.side) + ' to ' + nameSpan(inf.recs.shift(), e.side) + ' ' + (window.zpbCineYds ? zpbYds(zpbCineYds(e,'pass')) : '');
    const d = (inf.dtq || []).shift();
    if(d) return nameSpan(d.name, e.side) + (d.kind==='INT' ? ' interception return' : ' fumble return');
    return '';
   }
   return 'Score';
  };
  const colOf = tm=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(tm) : null; return pk ? pk.accL : 'var(--accent)'; };
  const nameSpan = (nm, sd)=>{ if(!nm) return ''; const inf = info[sd] || {}; const o = (inf.ovb && inf.ovb[nm]) || 0; const c = colOf(g[sd]);
   if(o>=90) return '<span class="zrl-pl zpb-shm" style="--zrb:' + c + ';">' + nm + '</span>';  // w21 (Owner): 90+ shimmering in the team color
   if(o>=85) return '<span class="zrl-pl" style="color:' + c + ';">' + nm + '</span>';           // w21 (Owner): 85+ vibrant in the team color
   return '<span class="zrl-pl">' + nm + '</span>'; };
  const crest = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const isPO = !!(g.roundLabel || (seasonState && seasonState.playoffRounds && seasonState.playoffRounds[g.roundLabel ? seasonState.currentPlayoffRound : ''] === undefined && false));
  const roundLabel = g.roundLabel || ((seasonState && seasonState.phase === 'playoffs' && ROUND_LABELS && ROUND_LABELS[seasonState.currentPlayoffRound]) || '');
  const isSB = /super bowl/i.test(roundLabel || '');
  // turnovers: real totals from the box score, spaced across quarters for the log
  const toH = (r.homeStats && r.homeStats.turnovers) || 0, toA = (r.awayStats && r.awayStats.turnovers) || 0;
  const toEvents = [];
  const tkQ = {home:((g.detail && g.detail.home && g.detail.home.takeaways) || []).slice(), away:((g.detail && g.detail.away && g.detail.away.takeaways) || []).slice()};
  const gvQ = {home:((g.detail && g.detail.home && g.detail.home.giveaways) || []).slice(), away:((g.detail && g.detail.away && g.detail.away.giveaways) || []).slice()}; // w21: the giveaway queue names who lost the ball
  [['home',toH],['away',toA]].forEach(([sd,n])=>{
   for(let i=0;i<n;i++){
    const q = Math.min(4, 1+Math.floor((i+0.5)/Math.max(n,1)*4));
    toEvents.push({q:q, t:Math.max(0.08, 0.92 - ((i+0.5)/Math.max(n,1))*0.84), pts:0, type:'TO', side:sd});
   }
  });
  const all = evs.concat(toEvents).sort((a,b)=> a.q-b.q || a.t-b.t);
  const abbr = n=> TEAM_ABBR[n] || n;
  const finH = r.homeScore, finA = r.awayScore;
  let gwIdx = -1;
  { let li = -1, le = null; all.forEach((e,i)=>{ if((e.pts||0)>0){ li = i; le = e; } });
    if(le && le.type==='FG'){ const my = le.side==='home' ? finH : finA, op = le.side==='home' ? finA : finH;
      if(my>op && (my-3)<=op) gwIdx = li; } }
  const ov = document.createElement('div'); ov.className = 'zpb-replay-ov';
  ov.innerHTML = '<div class="zpb-replay' + (isSB ? ' zpb-sb' : (roundLabel ? ' zpb-po' : '')) + '">'
   + '<div class="zpb-rep-hd"><div class="zpb-rep-team">' + crest(g.away) + '<b style="color:' + colOf(g.away) + ';">' + abbr(g.away) + '</b><span class="zpb-rep-sc" id="zrepSa">0</span></div>'
   + '<span class="zpb-rep-qchip" id="zrepQ">1ST</span>'
   + '<div class="zpb-rep-team"><span class="zpb-rep-sc" id="zrepSh">0</span><b style="color:' + colOf(g.home) + ';">' + abbr(g.home) + '</b>' + crest(g.home) + '</div></div>'
   + '<div class="zpb-rep-log" id="zrepLog"></div>'
   + '<div class="zpb-rep-ft"><button class="tabbtn zrl-skip" id="zrepSkip">Skip</button><div class="zpb-rep-prog"><i id="zrepProg"></i></div><button class="resetbtn" id="zrepGo" style="display:none;width:auto;margin:0;padding:9px 26px;">Continue</button></div>'
   + '</div>';
  document.body.appendChild(ov);
  const box = ov.querySelector('.zpb-replay');
  const log = ov.querySelector('#zrepLog'), qchip = ov.querySelector('#zrepQ'),
        sa = ov.querySelector('#zrepSa'), sh = ov.querySelector('#zrepSh'), prog = ov.querySelector('#zrepProg'),
        skip = ov.querySelector('#zrepSkip'), go = ov.querySelector('#zrepGo');
  const QN = {1:'1ST QUARTER', 2:'2ND QUARTER', 3:'3RD QUARTER', 4:'4TH QUARTER'};
  const clockOf = e=>{ const m = Math.max(0, Math.min(15, 15*(1-(e.t||0)))); const mm = Math.floor(m), ss = Math.floor((m-mm)*60); return mm + ':' + String(ss).padStart(2,'0'); };
  let hs = 0, as = 0, timers = [], finished = false, clutch = false;
  const close = ()=>{ timers.forEach(t=>clearTimeout(t)); const x = document.querySelector('.zpb-replay-ov'); if(x) x.remove(); document.removeEventListener('keydown', esc); };
  const esc = e=>{ if(e.key==='Escape') close(); };
  document.addEventListener('keydown', esc);
  ov.addEventListener('click', e=>{ if(e.target===ov) close(); });
  if(skip) skip.addEventListener('click', ()=>{ if(finished){ return; } finish(true); });
  if(go) go.addEventListener('click', close);
  // ---- cinematic intro: 5 s for playoff games, 30 s for the Super Bowl ----
  const INTRO_MS = isSB ? 60000 : (roundLabel ? 30000 : 5000);
  let introDone = !INTRO_MS;
  const startTimeline = ()=>{
   if(introDone) return;
   introDone = true;
   const intro = box.querySelector('.zpb-rep-intro'); if(intro) intro.remove();
   runEvents();
  };
  if(INTRO_MS){
   const intro = document.createElement('div'); intro.className = 'zpb-rep-intro';
   intro.innerHTML = '<div class="zpb-intro-flash"></div>'
    + '<div class="zpb-intro-title">' + roundLabel.toUpperCase() + '</div>'
    + '<div class="zpb-intro-logos"><span class="zpb-intro-l">' + crest(g.away) + '</span><span class="zpb-intro-vs">VS</span><span class="zpb-intro-r">' + crest(g.home) + '</span></div>'
    + '<div class="zpb-intro-sub">' + (isSB ? 'the everything game' : abbr(g.away) + ' @ ' + abbr(g.home)) + '</div>'
    + '<button class="tabbtn zpb-intro-skip" id="zrepIntroSkip">Skip intro</button>';
   box.appendChild(intro);
   const flash = ()=>{ const f = intro.querySelector('.zpb-intro-flash'); if(f){ f.style.opacity = '.95'; setTimeout(()=>{ f.style.transition = 'opacity .7s ease'; f.style.opacity = '0'; }, 240); } };
   if(isSB){ [3400,12000,22000,34000,46000].forEach(ms=>timers.push(setTimeout(flash, ms))); }
   else { timers.push(setTimeout(flash, 3400)); }
   const iSkip = intro.querySelector('#zrepIntroSkip'); if(iSkip) iSkip.addEventListener('click', startTimeline);
   timers.push(setTimeout(startTimeline, INTRO_MS));
  }
  const finish = (skipRest)=>{
   if(finished) return;
   finished = true;
   qchip.textContent = 'FINAL';
   const fin = document.createElement('div'); fin.className = 'zpb-rep-final';
   const uWon = focusTeam && ((g.home===focusTeam && hs>as) || (g.away===focusTeam && as>hs));
   const _cA = colOf(g.away), _cH = colOf(g.home), _abA = abbr(g.away), _abH = abbr(g.home);
   const scoreLine = '<div class="zpb-rep-fscore"><b style="color:' + _cA + ';">' + _abA + '</b> <span style="color:' + _cA + ';">' + as + '</span> <i>-</i> <span style="color:' + _cH + ';">' + hs + '</span> <b style="color:' + _cH + ';">' + _abH + '</b></div>';
   const resLine = focusTeam
    ? '<div class="zpb-rep-fres">' + (uWon
       ? '<span class="zpb-rep-star zpb-shm" style="--zrb:' + colOf(focusTeam) + '">★</span><span class="zpb-rep-you zpb-shm" style="--zrb:' + colOf(focusTeam) + '">YOU WON</span>'
       : '<span class="zpb-rep-you zpb-rep-lost">YOU LOST</span>') + '</div>'
    : '';
   fin.innerHTML = scoreLine + resLine;
   log.appendChild(fin);
   log.scrollTop = log.scrollHeight;
   prog.style.width = '100%';
   box.classList.add('done');
   if(skip) skip.style.display = 'none';
   if(go) go.style.display = '';
  };
  const runEvents = ()=>{
   const total = all.length;
   // 30-60 s of play-by-play: slower cadence, quarter banners get room to breathe
   const step = Math.min(3400, Math.max(1500, 34000/total));
   let t = 500;
   timers.push(setTimeout(()=>{ prog.style.width = '4%'; }, 60));
   // w21 (Owner): the 1st Quarter always appears — every quarter gets its banner,
   // even when nothing big happened in it (the log used to open on the 2nd quarter)
   const seq = []; let evDone = 0;
   { let qSeen = 0;
     all.forEach(e=>{ while(qSeen+1 < e.q){ qSeen++; seq.push({banner:qSeen}); }
   if(qSeen < e.q){ qSeen = e.q; seq.push({banner:qSeen}); } seq.push({ev:e}); });
     while(qSeen < 4){ qSeen++; seq.push({banner:qSeen}); } }
   const gwEv = gwIdx >= 0 ? all[gwIdx] : null;
   seq.forEach(item=>{
    if(item.banner){ const qq = item.banner;
     timers.push(setTimeout(()=>{
      qchip.textContent = (QN[qq] || ('Q' + qq)).split(' ')[0];
      const d = document.createElement('div'); d.className = 'zpb-rep-q'; d.textContent = QN[qq] || ('QUARTER ' + qq);
      log.appendChild(d);
     }, t));
     t += 900;
     return;
    }
    const ev = item.ev;
    timers.push(setTimeout(()=>{
     if(ev.type==='TO'){
      const line = document.createElement('div');
      line.className = 'zpb-rep-line zrl-to';
      const wnr = ev.side==='home' ? 'away' : 'home'; // the side that won the ball
      const tk = (tkQ[wnr] || []).shift(); // w21 fix: takeaways belong to the team that TOOK the ball
      const gv = (gvQ[ev.side] || []).shift(); // the giveaway names who lost it
      const loserName = (tk && tk.from) || (gv && gv.name) || '';
      const _wc = colOf(g[wnr]); // w21 (Owner): takeaway boxes wear the color of the team the play helps
      const zpbTc = t2=>'<span class="zrl-badge zrl-chip" style="--zrb:' + _wc + ';color:' + _wc + ';">' + t2 + '</span>';
      let toTxt;
      if(tk && tk.type==='INT'){
       toTxt = (nameSpan(loserName, ev.side) + ' ' + zpbTc('INT') + ' ' + nameSpan(tk.name, wnr)).trim();
      } else if(tk){
       toTxt = loserName
        ? (nameSpan(loserName, ev.side) + ' ' + zpbTc('FF') + (tk.recoveredBy && tk.recoveredBy!==tk.name
           ? ' ' + nameSpan(tk.name, wnr) + ' ' + zpbTc('FR') + ' ' + nameSpan(tk.recoveredBy, wnr)
           : ' & ' + zpbTc('FR') + ' ' + nameSpan(tk.name, wnr)))
        : (nameSpan(tk.name, wnr) + ' ' + zpbTc('FR'));
      } else {
       toTxt = (loserName ? nameSpan(loserName, ev.side) + ' gives it up' : abbr(g[ev.side]) + ' gives it up');
      }
      const zpbWinner = g[wnr]; // the team that won the ball
      line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
       + '<span class="zrl-team" style="color:' + colOf(g[ev.side]) + ';">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + toTxt + '</span>'
       + '<span class="zrl-badge" style="--zrb:' + colOf(zpbWinner) + ';color:' + colOf(zpbWinner) + ';">\u2022 ' + abbr(zpbWinner) + '</span>'; // w19 (Owner): TO is a dot; the box names who takes over
      log.appendChild(line);
      requestAnimationFrame(()=>{ line.classList.add('in'); });
      log.scrollTop = log.scrollHeight;
      return;
     }
     if(ev.side==='home') hs += (ev.pts||0); else as += (ev.pts||0);
     sa.textContent = as; sh.textContent = hs;
     const line = document.createElement('div');
     line.className = 'zpb-rep-line' + (((ev.side==='home'&&focusTeam===g.home)||(ev.side==='away'&&focusTeam===g.away)) ? ' zrl-me' : '');
     const _cl = colOf(g[ev.side]);
     const _badge = ev.type==='TD' ? '<span class="zrl-badge zrl-td zpb-shm" style="--zrb:' + _cl + '">TD</span>'
      : ev.type==='FG' ? '<span class="zrl-badge' + (ev===gwEv ? ' zpb-shm' : '') + '" style="--zrb:' + _cl + ';color:' + _cl + ';">FG</span>'
      : '<span class="zrl-badge" style="color:' + _cl + ';">' + (ev.type==='SAF' ? 'SAF' : '+') + '</span>';
     line.innerHTML = '<span class="zrl-t">' + ev.q + 'Q ' + clockOf(ev) + '</span>' + crest(g[ev.side])
      + '<span class="zrl-team" style="color:' + colOf(g[ev.side]) + ';">' + abbr(g[ev.side]) + '</span><span class="zrl-play">' + describe(ev)
      + '</span>' + _badge
      + '<span class="zrl-sc"><b style="color:' + colOf(g.away) + ';">' + as + '</b> - <b style="color:' + colOf(g.home) + ';">' + hs + '</b></span>';
     log.appendChild(line);
     requestAnimationFrame(()=>{ line.classList.add('in'); });
     log.scrollTop = log.scrollHeight;
     evDone++;
     prog.style.width = (8 + 88*(evDone/total)).toFixed(1) + '%';
     if(ev.q===4 && Math.abs(hs-as) <= 7 && !clutch){
      clutch = true;
      box.classList.add('zpb-clutch');
      if(roundLabel) box.classList.add('zpb-clutch2');
     }
    }, t));
    t += step;
   });
   timers.push(setTimeout(()=>{ finish(false); }, t + 700));
  };
  if(!INTRO_MS){ runEvents(); }
 }catch(err){}
}
// ---- end replay ----

// ---- rest-of-season: no per-game animation; a summary panel instead ----
function zpbRestSummary(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const st = computeStandings(S.schedule, teamNames())[user];
  const conf = conferenceOfTeam(user);
  const seeds = S.seeds || null;
  let seed = null, made = false;
  if(seeds && seeds[conf]){ const e = seeds[conf].find(x=>x.team===user); if(e){ seed = e.seed; made = true; } }
  const one = seed===1;
  const ov = document.createElement('div'); ov.className = 'zpb-restov';
  const confetti = made ? '<div class="zpb-restconf">' + Array.from({length:26}, (_,i)=>'<i style="left:' + (i*3.8+2) + '%;animation-delay:' + (i%9)*0.28 + 's;background:' + (i%3===0 ? '#d9a94c' : (i%3===1 ? 'var(--accent)' : 'var(--accent2,var(--rose)')) + '"></i>').join('') + '</div>' : '';
  // w19 (Owner): the award-winning players take the stage first — celebrated one by one —
  // then they drift slowly down and the season's verdict rises to the center, waiting for Continue.
  const honors = [];
  try{
    const A = S.awardsRS || null;
    if(A){
      A.individual.forEach(a=>{
        if(a.c && a.c.team===user) honors.push({t:a.title, n:a.c.name, pos:a.c.pos, sub:a.why});
        else if(!a.c && a.team===user) honors.push({t:a.title, n:(a.coach?a.coach+' \u00b7 ':'')+a.team, sub:a.why});
      });
      ['first','second'].forEach((k,i)=>{ Object.keys(A.allPro[k]||{}).forEach(pos=>{ (A.allPro[k][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:(i===0?'FIRST-TEAM':'SECOND-TEAM')+' ALL-PRO', n:c.name, pos:pos}); }); }); });
      Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honors.push({t:'PRO BOWL', n:c.name, pos:pos}); }); }); });
    }
  }catch(e){}
  const honorHTML = honors.map((c,i)=>'<div class="zpb-scard zpb-shonor" style="--beat:'+i+'">'
    + '<div class="zpb-scard-hd"><b class="zpb-shm">' + c.n + '</b>' + (c.pos?'<span class="zpb-poschip">'+c.pos+'</span>':'') + '</div>'
    + '<div class="zpb-shonor-t">' + c.t + '</div>' + (c.sub?'<div class="zpb-shonor-w">'+c.sub+'</div>':'') + '</div>').join('');
  const honorStage = honors.length ? '<div class="zpb-resthonors"><div class="zpb-resthonors-k zpb-shm">HONORS EARNED</div>' + honorHTML + '</div>' : '';
  ov.innerHTML = honorStage
   + '<div class="zpb-restbox' + (made ? ' zpb-restpo' : '') + (one ? ' zpb-restone' : '') + '">'
   + confetti
   + '<div class="narr" style="letter-spacing:.14em;text-transform:uppercase;font-size:.68rem;">The regular season is in the books</div>'
   + '<div class="zpb-restbig">' + st.wins + '–' + st.losses + (st.ties ? '–' + st.ties : '') + '</div>'

   + (made ? '<div class="zpb-restseed">' + (one ? '★ #1 SEED — THE BYE IS YOURS' : 'PLAYOFFS CLINCHED — #' + seed + ' SEED') + '</div>'

      : '<div class="zpb-restseed">OFFSEASON COMES EARLY</div><p style="margin:6px 0 0;text-align:center;">THE PLAYOFFS WILL PLAY OUT WITHOUT YOU</p><p style="margin:6px 0 0;text-align:center;">DRAFT AGAIN TO GO <b class="zpb-shine">20-0</b>?</p>')
   + '<div style="margin-top:16px;"><button class="resetbtn zpb-startbtn" id="zpbRestGo" style="font-size:.95rem;padding:12px 30px !important;">Continue</button></div>'
   + '</div>';
  document.body.appendChild(ov);
  if(honors.length){
    ov.classList.add('zpb-rest-honorsfirst');
    setTimeout(()=> ov.classList.add('zpb-rest-ready'), Math.min(honors.length*900 + 1600, 20000));
  } else ov.classList.add('zpb-rest-ready');
  ov.querySelector('#zpbRestGo').addEventListener('click', ()=> ov.remove());
 }catch(err){}
}
(function(){
 if(typeof simRestOfSeason !== 'function') return;
 const orig = simRestOfSeason;
 simRestOfSeason = function(){
  window.__zpbSilent = true;
  try{ orig(); } finally { window.__zpbSilent = false; }
  try{ zpbRestSummary(); }catch(err){}
 };
})();

// ---- 100-season report: graphical, sentence-light, and the back button works ----
render100 = function(container){
 const D = league100, A = D.agg, N = A.seasons, user = D.user, names = D.L.names, R = D.L.unitRatings;
 const avgW = {}, T = A.teams; names.forEach(n=>{ avgW[n] = mean_(T[n].w); });
 const sorted = names.slice().sort((a,b)=>avgW[b]-avgW[a]);
 const mine = T[user], myW = mine.w, myAvg = avgW[user], myRank = sorted.indexOf(user)+1;
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const pctS = (v,d)=> (v*100).toFixed(d===undefined?0:(d||0)) + '%';
 const hist = {}; myW.forEach(w=>{ const k = Math.round(w); hist[k] = (hist[k]||0)+1; });
 const maxH = Math.max(...Object.values(hist));
 const histRows = Array.from({length:18}, (_,k)=>k).map(k=>'<div class="zpb-100bar"><span class="narr">' + k + '-' + (17-k) + '</span><span class="tr"><i style="width:' + Math.max(hist[k] ? 2 : 0, (hist[k]||0)/maxH*100).toFixed(1) + '%;"></i></span><span class="narr">' + (hist[k]||0) + '</span></div>').join('');
 // what drives winning (same math as before, now drawn instead of tabulated)
 const units = ['qb','rb','rec','olPass','olRun','passRush','frontRun','coverage','kicker'];
 const xsW = names.map(n=>avgW[n]), unitCorr = units.map(u=>({u, r:corr(names.map(n=>R[n][u]), xsW)}));
 const z = arr=>{ const m = mean_(arr), s = sd_(arr)||1; return arr.map(v=>(v-m)/s); };
 const zU = {}; units.forEach(u=>{ zU[u] = z(names.map(n=>R[n][u])); });
 const ym = mean_(xsW), yC = xsW.map(v=>v-ym), Zm = names.map((n,i)=>units.map(u=>zU[u][i]));
 const beta = ridgeSolve(Zm, yC, 3), lgR = D.L.league;
 unitCorr.forEach(x=>{ x.beta = beta[units.indexOf(x.u)]; });
 const drvRows = unitCorr.slice().sort((a,b)=>Math.abs(b.beta)-Math.abs(a.beta)).slice(0,6).map(x=>{
  const mx = Math.max(...unitCorr.map(y=>Math.abs(y.beta)));
  const w = Math.max(4, Math.abs(x.beta)/mx*100);
  return '<div class="zpb-100bar"><span>' + (UNIT_INFO[x.u] ? UNIT_INFO[x.u].label : x.u) + '</span><span class="tr"><i style="width:' + w.toFixed(0) + '%;"></i></span><span class="score">+' + x.beta.toFixed(2) + '</span></div>';
 }).join('');
 const zlog = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const leagueRows = sorted.map(n=>{
  const t = T[n];
  return '<div class="zpb-100bar' + (n===user ? ' zpb-100merow' : '') + '" style="' + (n===user ? uvars : '') + '">'
   + '<span class="zpb-100name">' + zlog(n) + nick(n) + '</span><span class="tr"><i style="width:' + (avgW[n]/Math.max(...sorted.map(x=>avgW[x]))*100).toFixed(1) + '%;"></i></span>'
   + '<span class="score">' + avgW[n].toFixed(1) + '</span></div>';
 }).join('');
 const PN = Object.keys(A.plan), totalPlans = PN.reduce((a,k)=>a+A.plan[k].n, 0);
 const planChips = ['11','12','13'].map(p=>{
  const cells = ['run','neutral','pass'].map(s=>{ const e = A.plan[p+'|'+s]; if(!e || e.n < 30) return ''; return '<span>' + (s==='run' ? 'RUN+' : s==='pass' ? 'PASS+' : 'EVEN') + ' ' + Math.round(e.w/e.n*100) + '</span>'; }).join('');
  return cells ? '<div class="zpb-adcard"><span>' + (PERS[p] ? PERS[p].label : p) + '</span><i>' + cells + '</i></div>' : '';
 }).join('');
 const tt = A.totals;
 const ppg = tt.pts/tt.g/2, ypg = tt.yds/tt.g/2;
 const champPct = pctS(mine.champ/N, 1), poPct = pctS(mine.po/N), divPct = pctS(mine.div/N), sbPct = pctS(mine.sbApp/N, 1);
 const back = ()=>{
  try{ setActiveTab('viewDraft', 'tabDraftBtn'); }catch(err){}
  try{
   if(seasonState) renderSeasonTab(document.getElementById('seasonHost') || container);
   else if(typeof renderDraftResults === 'function') renderDraftResults();
  }catch(err){}
  window.scrollTo(0, 0);
 };
 container.innerHTML = '<div class="panel zpb-glowpanel" style="margin-bottom:14px;">'
  + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">100 SEASONS: ' + user + '</h2>'
  + '<div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="tabbtn" id="rerun100Btn">Re-run</button><button class="resetbtn" id="back100Btn" style="width:auto;padding:10px 24px;">Back to season</button></div></div>'
  + '<div class="zpb-100hero">'
  + '<div class="zpb-100me" style="' + uvars + '"><b>' + Math.round(myAvg) + '</b><span>avg wins · #' + myRank + ' of 32</span></div>'
  + '<div><b>' + poPct + '</b><span>playoff seasons</span></div>'
  + '<div><b>' + divPct + '</b><span>division titles</span></div>'
  + '<div><b>' + sbPct + '</b><span>Super Bowl trips</span></div>'
  + '<div><b>' + champPct + '</b><span>championships</span></div>'
  + '</div>'
  + '<div class="zpb-100sec">Your ' + N + ' seasons by record</div><div class="zpb-100bars">' + histRows + '</div>'
  + '<div class="zpb-100sec">The league, by average wins</div><div class="zpb-100bars">' + leagueRows + '</div>'
  + '<div class="zpb-100sec">What drives winning in this model</div><div class="zpb-100bars">' + drvRows + '</div>'
  + (planChips ? '<div class="zpb-100sec">Plans across the league</div><div class="zpb-advgrid">' + planChips + '</div>' : '')
  + '<div class="zpb-100sec">Stats</div><div class="zpb-advgrid">'
  + '<div class="zpb-adcard"><span>Points / game / team</span><b>' + Math.round(ppg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Yards / game / team</span><b>' + Math.round(ypg) + '</b></div>'
  + '<div class="zpb-adcard"><span>Seasons simulated</span><b>' + N + '</b></div>'
  + '<div class="zpb-adcard"><span>One-score games</span><b>' + Math.round(tt.close/Math.max(tt.g,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Blowouts (21+)</span><b>' + Math.round(tt.blow/Math.max(tt.g,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Home wins</span><b>' + Math.round(tt.homeW/Math.max(tt.g-tt.ties,1)*100) + '%</b></div>'
  + '<div class="zpb-adcard"><span>Sacks in the sim</span><b>' + Math.round(tt.sacks).toLocaleString('en-US') + '</b></div>'
  + '<div class="zpb-adcard"><span>Turnovers in the sim</span><b>' + Math.round(tt.to).toLocaleString('en-US') + '</b></div>'
  + '<div class="zpb-adcard"><span>Ties</span><b>' + Math.round(tt.ties) + '</b></div>'
  + '<div class="zpb-adcard"><span>5000-yard passers</span><b>' + (A.thresholds ? A.thresholds.p5000 : 0) + '</b></div>'
  + '<div class="zpb-adcard"><span>2000-yard rushers</span><b>' + (A.thresholds ? A.thresholds.r2000 : 0) + '</b></div>'
  + '<div class="zpb-adcard"><span>20-TD scorers</span><b>' + (A.thresholds ? A.thresholds.td20 : 0) + '</b></div>'
  + '</div>'
  + '</div>';
 const b = document.getElementById('back100Btn'); if(b) b.addEventListener('click', back);
 const rr = document.getElementById('rerun100Btn'); if(rr) rr.addEventListener('click', ()=>{ league100 = null; runLeague100(100, container); });
};
add100Button = function(container){
 if(!draftSim) return;
 const prev = document.getElementById('sim100Btn'); if(prev) prev.remove();
 const tabs = (document.getElementById('draftFinalResults') && document.getElementById('draftFinalResults').querySelector('.tabs'))
  || (container.querySelector ? container.querySelector('.tabs') : null);
 const b = document.createElement('button');
 b.className = 'tabbtn'; b.id = 'sim100Btn'; b.textContent = '100 SEASONS';
 b.addEventListener('click', ()=>{ if(league100) render100(container); else runLeague100(100, container); });
 const ops = document.getElementById('zpbDraftOps'); if(ops){ ops.appendChild(b); } else if(tabs){ tabs.appendChild(b); }
 else{
  const d = document.createElement('div'); d.style.cssText = 'margin:0 0 12px;text-align:right;';
  d.appendChild(b); container.insertBefore(d, container.firstChild);
 }
};

// ---- v9 part 2: schedule tiles, lineups, preview strip, stats cards, merged
//      advanced stats, pick analysis visual, season-in-words graphics, flows.

// team dropdowns: every team listed in its own colors, logo beside the name;
// the pick-order box joins the same custom treatment, tinted by the selected team
(function(){
 const TEAMS = Object.keys(TEAM_DATA).sort((a,b)=>a.localeCompare(b)); // w23 (Owner): the dropdown reads in city order
 const pack = n=> (typeof zpbPackFor==='function') ? zpbPackFor(n) : null;
 const logo = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const slotSel = document.getElementById('draftSlotSelect');
 const pickSel = document.getElementById('draftPickNumberSelect');
 const tintTeam = sel=> (sel && sel.id==='draftPickNumberSelect' && slotSel && slotSel.value && slotSel.value!=='__random') ? slotSel.value : null;
 const enhance = sel=>{
  if(!sel || sel.dataset.zpbsel) return;
  sel.dataset.zpbsel = '1';
  const wrap = document.createElement('span'); wrap.className = 'zpb-selwrap';
  if(sel.id==='draftSlotSelect') wrap.classList.add('zpb-teamwrap'); // w19
  sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel);
  sel.classList.add('zpb-sel-native');
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'zpb-selbtn'; btn.setAttribute('aria-haspopup', 'listbox');
  const pop = document.createElement('span'); pop.className = 'zpb-selpop'; pop.setAttribute('role', 'listbox');
  wrap.appendChild(btn); wrap.appendChild(pop);
  const isPick = sel.id==='draftPickNumberSelect';
  const abbrOf = n=>{ try{ if(typeof TEAM_ABBR!=='undefined' && TEAM_ABBR[n]) return TEAM_ABBR[n]; }catch(e){} return n ? n.split(' ').slice(-1)[0].slice(0,3).toUpperCase() : ''; }; // w19
  const label = ()=>{
   const v = sel.value;
   const tt = tintTeam(sel);
   const st = pack(tt || v);
   const vars = st ? '--zaL:' + (window.zpbLift?zpbLift(st.txL,0.62):st.txL) + ';--zaD:' + st.txd + ';' : '';
   const face = isPick ? (v==='random' ? 'Random' : 'Pick ' + v) : (v==='__random' ? 'Random team' : (v || '\u2014'));
   // w19 (Owner): the pick box never wears a logo; the team box wears the popup's lighter color —
   // full name when the window allows it, logo + abbreviation when the bar is compressed.
   if(isPick) btn.innerHTML = '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
   else if(sel.id==='draftSlotSelect') btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '"><span class="zpb-face-full">' + face + '</span><span class="zpb-face-abbr">' + (v==='__random' ? 'RND' : abbrOf(v)) + '</span></span>';
   else btn.innerHTML = logo(v) + '<span class="zpb-face" style="' + vars + '">' + face + '</span>';
  };
  const build = ()=>{
   const tst = pack(tintTeam(sel));
   const optVars = st=> st
    ? '--zaL:' + (window.zpbLift?zpbLift(st.txL,0.62):st.txL) + ';--zaD:' + st.txd + ';--zw:color-mix(in srgb,' + st.accL + ' 13%, transparent)'
    : '--zw:rgba(120,120,120,.12)';
   const items = isPick
    ? ['random'].concat(Array.from({length:32}, (_,k)=>String(k+1)))
    : TEAMS;
   pop.innerHTML = items.map(t=>{
    const st = isPick ? tst : pack(t);
    const txt = isPick ? (t==='random' ? 'Random' : 'Pick ' + t) : t;
    return '<button type="button" class="zpb-selopt" data-v="' + t + '" style="' + optVars(st) + '">'
     + (isPick ? '' : logo(t)) + '<span>' + txt + '</span></button>';
   }).join('');
  };
  const close = ()=> wrap.classList.remove('open');
  btn.addEventListener('click', e=>{
   e.stopPropagation();
   const was = wrap.classList.contains('open');
   document.querySelectorAll('.zpb-selwrap.open').forEach(w=>w.classList.remove('open'));
   if(!was){ build(); wrap.classList.add('open'); }
  });
  pop.addEventListener('click', e=>{
   const o = e.target.closest('.zpb-selopt'); if(!o) return;
   sel.value = o.dataset.v;
   sel.dispatchEvent(new Event('change', {bubbles:true}));
   label(); close();
  });
  sel.addEventListener('change', label);
  document.addEventListener('click', e=>{ if(!wrap.contains(e.target)) close(); });
  setTimeout(label, 0); // w19: first paint waits a tick so team abbreviations exist
  new MutationObserver(label).observe(sel, {childList:true});
 };
 ['draftSlotSelect', 'draftPickNumberSelect', 'teamFilter', 'homeCmpA', 'homeCmpB', 'cmpTeamA', 'cmpTeamB'].forEach(id=>{
  const s = document.getElementById(id); if(s) enhance(s);
 });
 if(slotSel && pickSel) slotSel.addEventListener('change', ()=>{
  try{ pickSel.dispatchEvent(new Event('change', {bubbles:true})); }catch(e){}
  // w19 (Owner): the homepage and every footer page wear the highlighted team's colors immediately — season or not
  try{
    if(typeof zpbApplyTeamTheme==='function'){
      const tv = slotSel.value;
      if(tv && tv!=='__random') zpbApplyTeamTheme(tv); else zpbClearTeamTheme();
    }
  }catch(e){}
 });
})();

// schedule tiles: no team names, @/vs under the logo, current matchup shimmering, W/L fills
renderUserScheduleHTML = function(){
 const user = seasonUserTeam();
 const mine = seasonState.schedule.filter(g=>g.home===user || g.away===user).sort((a,b)=>a.week-b.week);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const cw = seasonState.currentWeek;
 const tiles = mine.map(g=>{
  const home = g.home===user, opp = home ? g.away : g.home;
  const isNow = (g.week===cw && !g.played && seasonState.phase==='regular');
  let res = '', cls = 'zst-tile';
  if(g.played){
   const fs = home ? g.result.homeScore : g.result.awayScore, os = home ? g.result.awayScore : g.result.homeScore;
   const o = fs>os ? 'W' : fs<os ? 'L' : 'T';
   cls += ' zst-played zst-' + o.toLowerCase();
   res = '<span class="zst-res"><b class="zst-mine">' + fs + '</b><span>–</span><span>' + os + '</span><em class="zst-o">' + o + '</em></span>';
  } else if(isNow){ cls += ' zst-now'; }
  return '<div class="' + cls + '" data-wk="' + g.week + '" style="' + uvars + '" title="Week ' + g.week + (g.divisional ? ' · division game' : '') + '">'
   + '<span class="zst-wk">' + g.week + '</span><span class="zst-logo">' + lg(opp) + '</span>'
   + '<span class="zst-at">' + (home ? 'vs' : '@') + '</span>' + res + '</div>';
 }).join('');
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">SCHEDULE</h4><div class="zst-grid">${tiles}</div><div class="zst-details">${mine.filter(g=>g.played && g.summary).map(g=>`<div class="zst-detail" id="sg-detail-${g.week}" style="display:none;"><div class="detailwrap">${renderGameResultHTML(g, user)}</div></div>`).join('')}</div></div>`;
};

// lineups: crest header above each side, no parenthetical; winner wears the
// team color; everyone above 85 wears the 20-0 shimmer
renderLineupTableHTML = function(slotmapLeft, slotmapRight, ownerLeft, ownerRight, showNote){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 const fillOf = (slotmap, owner)=>{
  const pool = (owner && typeof seasonState!=='undefined' && seasonState && seasonState.teams[owner] && seasonState.teams[owner].pool) || [];
  const used = new Set(Object.values(slotmap).filter(Boolean).map(x=>{ const e = normalizeSlotEntry(x); return e ? e.name : ''; }));
  const map = {};
  Object.keys(slotmap).length && DEPTH_CHART_GROUPS.forEach(([, , slots])=>slots.forEach(s=>{
   if(slotmap[s]) return;
   let best = null, bv = -1;
   pool.forEach(p=>{
    const e = normalizeSlotEntry(p);
    if(!e || !e.name || used.has(e.name) || map[e.name]) return;
    const pen = flexPenaltyFor(e.pos, s); if(pen>=8) return;
    const eff = (e.ovr||70) - pen; if(eff>bv){ bv = eff; best = e; }
   });
   if(best) map[s] = {name:best.name, val:bv};
  }));
  return s=> map[s] || null;
 };
 const fL = fillOf(slotmapLeft, ownerLeft), fR = fillOf(slotmapRight, ownerRight);
 const cellOf = (slotmap, s, fb)=>{ let c = lineupCell(slotmap, s); if(c.text==='—') c = zpbDimeCell(slotmap, c, s); if(c.text!=='—') return c; const f = fb(s); return f ? {text:`${f.name} ${f.val}`, val:f.val} : c; };
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<div class="zpb-lu-grp">${gname}</div>`;
  slots.forEach(s=>{
   const l = cellOf(slotmapLeft, s, fL), r = cellOf(slotmapRight, s, fR);
   const shmL = (l.val>=85 && zL) ? ' zpb-shm' : '', shmR = (r.val>=85 && zR) ? ' zpb-shm' : '';
   const zpbLuA = (ll, rr, lab)=>{ const sl2 = (ll.val>=85 && zL) ? ' zpb-shm' : '', sr2 = (rr.val>=85 && zR) ? ' zpb-shm' : '';
    return `<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>rr.val?'zpb-lu-win zpb-shm':sl2}" style="${ll.text!=='—'&&zL?zL:''}">${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>ll.val?'zpb-lu-win zpb-shm':sr2}" style="${rr.text!=='—'&&zR?zR:''}">${rr.text}</span>
   </div>`; };
   rows += zpbLuA(l, r, LABELS[s]||s);
   if(s==='CB3'){ rows += zpbLuA(cellOf(slotmapLeft,'CB4',fL), cellOf(slotmapRight,'CB4',fR), 'Dime'); }
  });
 });
 return `<div class="zpb-lu">${rows}</div>${showNote===false?'':'<p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>'}`;
};
renderLineupComparisonHTML = function(homeTeam, awayTeam){
 const homeSlotmap = seasonState.teams[homeTeam].slotmap, awaySlotmap = seasonState.teams[awayTeam].slotmap;
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const stA = (typeof zpbRowVars==='function') ? zpbRowVars(awayTeam) : '';
 const stH = (typeof zpbRowVars==='function') ? zpbRowVars(homeTeam) : '';
 const hd = '<div class="zpb-lu-row zpb-lu-hd"><span class="zpb-lu-cell zpb-lu-l" style="' + stA + '">' + lg(awayTeam) + ' <b>' + nick(awayTeam) + '</b></span><span class="zpb-lu-c"></span><span class="zpb-lu-cell zpb-lu-r" style="' + stH + '"><b>' + nick(homeTeam) + '</b> ' + lg(homeTeam) + '</span></div>';
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Lineups</h4>${hd}${renderLineupTableHTML(awaySlotmap, homeSlotmap, awayTeam, homeTeam)}</div>`;
};

// preview strip: no "model" text, no logos in the edge chips, edges aligned by
// side, parallelogram bar with the numbers on either side and no % sign
function zpbPreviewStripHTML(g){
 try{
  const S = seasonState; if(!S || typeof topMatchupSwings !== 'function') return '';
  const sw = topMatchupSwings(g.home, g.away, 2, g);
  const hp = sw.projHome, ap = sw.projAway, tot = Math.max(hp+ap, 0.1);
  const pw = Math.min(0.86, Math.max(0.14, hp/tot));
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  return '<div class="zpb-strip">'
   + '<div class="zpb-strip-team">' + lg(g.away) + '<b>' + nick(g.away) + '</b></div>'
   + '<div class="zpb-strip-mid"><span class="zpb-strip-pct">' + Math.round((1-pw)*100) + '</span>'
   + '<div class="zpb-strip-bar"><i style="width:' + (pw*100).toFixed(1) + '%;"></i></div>'
   + '<span class="zpb-strip-pct">' + Math.round(pw*100) + '</span></div>'
   + '<div class="zpb-strip-team zpb-strip-h"><b>' + nick(g.home) + '</b>' + lg(g.home) + '</div>'
   + '</div>';   // edge chips retired (Owner round 7): the model numbers already sit on the bar
 }catch(err){ return ''; }
}

// season stats: player cards instead of a lateral stat list
userStatsInner = function(){
 const user = seasonUserTeam();
 const rows = teamPlayerStats(user).sort((a,b)=> GROUP_ORDER.indexOf(a.group)-GROUP_ORDER.indexOf(b.group) || ((b.ovr||0)-(a.ovr||0)) || b.impact-a.impact);
 if(!rows.length) return `<p class="narr">${STATS_KIND==='po' ? (playoffMissed() ? 'Your team missed the playoffs.' : 'Your team has not played a playoff game yet, so there are no playoff totals.') : 'No games played yet — your players\' season totals will build here as you go.'}</p>`;
 const uvars = (typeof zpbRowVars==='function') ? zpbRowVars(user) : '';
 const cards = rows.map(r=>{
  const chips = seasonStatLine(r.group, r.st).split(', ').filter(Boolean).slice(0, 6);
  const rtg = r._rating!=null ? r._rating.toFixed(1) : '—';
  return '<div class="zpb-pcard" style="' + uvars + '">'
   + '<div class="zpb-pcard-hd"><b class="' + (r.ovr > 85 ? 'zpb-shm' : '') + '">' + r.name + '</b><span class="zpb-poschip">' + r.group + '</span></div>'
   + '<div class="zpb-pcard-rt">' + rtg + '<i>#' + (r._rank || '–') + ' ' + r.group + '</i></div>'
   + '<div class="zpb-pcard-stats">' + chips.map(c=>'<span>' + c + '</span>').join('') + '</div>'
   + '</div>';
 }).join('');
 return '<div class="zpb-pcards">' + cards + '</div>';
};

// the two advanced menus become one panel: metric cards + sack-cause bars
teamAdvancedHTML = function(){
 const S = seasonState, user = seasonUserTeam(), T = {};
 teamNames().forEach(t=>{ T[t] = {g:0, to:0, tk:0, top:0, run:0, plays:0, td:0, fg:0, tpa:0, tpm:0, close:0, closeW:0, ret:0}; });
 S.schedule.forEach(g=>{
  if(!g.played || !g.result || !g.detail) return;
  ['home','away'].forEach(sd=>{
   const t = g[sd], x = T[t], r = g.result, st = sd==='home' ? r.homeStats : r.awayStats, ost = sd==='home' ? r.awayStats : r.homeStats;
   const my = sd==='home' ? r.homeScore : r.awayScore, op = sd==='home' ? r.awayScore : r.homeScore;
   x.g++; x.to += st.turnovers; x.tk += ost.turnovers; x.top += st.top; x.run += st.rushYards; x.plays += st.rushYards + st.passYards;
   (r[sd+'Events']||[]).forEach(e=>{ if(e.type==='TD'){ x.td++; if(e.pts===8 || (e.pts===6 && e.tpTry)){ x.tpa++; if(e.pts===8) x.tpm++; } } else if(e.type==='FG'){ x.fg++; } });
   if(Math.abs(my-op) <= 7){ x.close++; if(my > op) x.closeW++; }
   const rt = g.detail[sd].returner; if(rt) x.ret += (rt.kry||0) + (rt.pry||0);
  });
 });
 const names = teamNames().filter(t=>T[t].g > 0); if(!names.length) return '';
 const me = T[user]; if(!me || !me.g) return '';
 const leagueAvg = f=> mean_(names.map(n=>f(T[n])));
 const fmtTop = s=> Math.floor(s/60) + ':' + String(Math.round(s%60)).padStart(2, '0');
 const toM = (me.tk-me.to)/me.g, toLg = leagueAvg(x=>(x.tk-x.to)/x.g);
 const rushSh = me.run/Math.max(me.plays, 1)*100, rushLg = leagueAvg(x=>x.run/Math.max(x.plays, 1))*100;
 const twoPt = me.tpa ? me.tpm + ' of ' + me.tpa : '—';
 const close = me.close ? me.closeW + '–' + (me.close-me.closeW) : '—';
 const cards = [
  ['Turnover margin', String(me.tk - me.to), 'takeaways ' + me.tk + ' · giveaways ' + me.to, me.tk > me.to],
  ['Time of possession', fmtTop(me.top/me.g), 'per game', null],
  ['Rushing share', rushSh.toFixed(0) + '%', 'league ' + rushLg.toFixed(0) + '%', null],
  ['Touchdowns / g', (me.td/me.g).toFixed(2), 'all touchdowns', me.td/me.g > leagueAvg(x=>x.td/x.g)],
  ['Field goals / g', (me.fg/me.g).toFixed(2), 'made', null],
  ['2-Pt Conversions', twoPt, 'conversions', null],
  ['IN DA CLUTCH', close, 'within 7 points', me.close ? me.closeW*2 > me.close : null],
  ['Return yards / g', Math.round(me.ret/me.g), 'kick + punt', null]
 ].map(c=>'<div class="zpb-adcard' + (c[3]===true ? ' zpb-adgood' : c[3]===false ? ' zpb-adbad' : '') + '"><span>' + c[0] + '</span><b>' + c[1] + '</b><i>' + c[2] + '</i></div>').join('');
 // sack causes, drawn as bars
 const tally = (team, key)=>{ const c = {rush:0, ol:0, cov:0}; S.schedule.forEach(g=>{ if(!g.played || !g.detail) return; ['home','away'].forEach(sd=>{ if(g[sd]===team && g.detail[sd].sackCauses) g.detail[sd].sackCauses[key].forEach(x=>{ c[x] = (c[x]||0)+1; }); }); }); return c; };
 const made = tally(user, 'made'), taken = tally(user, 'taken');
 const nm = made.rush + made.ol + made.cov, nt = taken.rush + taken.ol + taken.cov;
 const barRow = (lab, v, n)=> n ? '<div class="zpb-sackbar"><span>' + lab + '</span><span class="zsb-tr"><i style="width:' + Math.max(2, v/n*100).toFixed(0) + '%;"></i></span><span class="score">' + Math.round(v/n*100) + '%</span></div>' : '';
 let sackHTML = '';
 if(nm || nt){
  sackHTML = '<div class="zpb-100sec">Sacks made — why they fell</div>'
   + (nm ? barRow('INDIVIDUAL SKILL', made.rush, nm) + barRow('SUBPAR BLOCKING', made.ol, nm) + barRow('EXCELLENT COVERAGE', made.cov, nm) : '<p class="narr" style="margin:4px 0;">No sacks recorded yet.</p>')
   + '<div class="zpb-100sec">Sacks taken — why they happened</div>'
   + (nt ? barRow('Rusher won', taken.rush, nt) + barRow('SUBPAR BLOCKING', taken.ol, nt) + barRow('EXCELLENT COVERAGE', taken.cov, nt) : '<p class="narr" style="margin:4px 0;">No sacks allowed yet.</p>');
 }
 return '<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Advanced stats</h4>'
  + '<div class="zpb-advgrid">' + cards + '</div>' + sackHTML + '</div>';
};
advancedStatsHTML = function(){ return ''; };

// draft pick analysis: floating tinted rows + summary chips, no prose, no table lines
pickCritiqueHTML = function(inner){
 if(typeof draftSim === 'undefined' || !draftSim || !draftSim.log) return '';
 const rows = pickCritique(); if(!rows.length) return '';
 const verdict = r=> r.regret <= 0.05 ? ['Best available', 'zpb-pv-best'] : r.regret < 0.10 ? ['OK', 'zpb-pv-fine'] : r.regret < 0.50 ? ['Costly Miss', 'zpb-pv-bad'] : ['Giveaway', 'zpb-pv-give'];
 const body = rows.map(r=>{
  const vt = verdict(r);
  return '<div class="zpb-pvrow ' + vt[1] + '">'
   + '<span class="zpb-pv-rd narr">R' + r.round + '.' + String(r.pickInRound).padStart(2, '0') + '</span>'
   + '<span class="zpb-pv-p"><b>' + r.player[0] + '</b><i>' + (POS_DISPLAY[r.player[1]] || r.player[1]) + ' · ' + slotName(r.slot) + '</i></span>'
   + '<span class="zpb-pv-val score">' + fmtWar(r.v) + '</span>'
   + '<span class="zpb-pv-alt">' + (r.best && !r.wasBest ? '<b>' + r.best.p[0] + '</b><i>' + (POS_DISPLAY[r.best.p[1]] || r.best.p[1]) + ' · ' + fmtWar(r.best.v) + '</i>' : '<i>your pick</i>') + '</span>'
   + '<span class="zpb-pv-verdict">' + vt[0] + '</span>'
   + '</div>';
 }).join('');
 const misses = rows.slice().sort((a,b)=>b.regret-a.regret).filter(r=>r.regret >= 0.10).slice(0, 2);
 const good = rows.filter(r=>r.wasBest && r.v >= 0.5).slice(0, 3);
 const chips = [];
 if(good.length) chips.push('<div class="zpb-pvchip zpb-pv-good"><b>Best calls</b><span>' + good.map(r=>r.player[0]).join(' · ') + '</span></div>');
 if(misses.length) chips.push('<div class="zpb-pvchip zpb-pv-miss"><b>Costliest</b><span>' + misses.map(r=>r.player[0]).join(' · ') + '</span></div>');
 return '<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Draft pick analysis</h4>'
  + (chips.length ? '<div class="zpb-pvchips">' + chips.join('') + '</div>' : '')
  + '<div class="zpb-pvhd"><span>Pick</span><span>Player</span><span>Value</span><span>Best on the board</span><span>Verdict</span></div>'
  + body + '</div>';
};

// game review key players: floating rows, star beside the game ball, shimmer rules
renderKeyPlayersHTML = function(g){
 const mvp = g.detail.mvp;
 const r = g.result || {};
 const winnerSide = r.homeScore > r.awayScore ? 'home' : (r.awayScore > r.homeScore ? 'away' : '');
 function card(team, sd){
  const rows = notablePlayers(sd).map(p=>{
   const star = p.name===mvp.name && p.team===mvp.team;
   const shine = star || (winnerSide && sd===winnerSide);
   const st = (typeof zpbRowVars==='function' && p.team) ? zpbRowVars(p.team) : '';
   return '<div class="zpb-kprow' + (star ? ' kp-mvp' : '') + '" style="' + st + '">'
    + '<span class="pos">' + p.group + '</span>'
    + '<span class="zpb-kpmain"><b class="' + (shine ? 'zpb-shm' : '') + '">' + p.name + '</b>' + (star ? '<span class="zpb-kpstar">★</span>' : '')
    + '<i>' + p.line.replace(/, /g, ' · ') + '</i></span></div>';
  }).join('');
  return '<div class="kp-card"><div class="kp-title">' + team + '</div>' + rows + '</div>';
 }
 return '<h4 style="margin:14px 0 8px;">Key Players</h4><div class="kp-grid">' + card(g.away, g.detail.away) + card(g.home, g.detail.home) + '</div>';
};

// "why better or worse than the ratings" — graphic tiles, not prose paragraphs
whyBoxHTML = function(F){
 let parts = [];
 try{
  const dw = (defenseWhy(F)||'').trim();
  parts = [offenseWhy(F), (dw && !/^<b>Why/.test(dw) ? '<b>Defense:</b> ' + dw : dw).replace(/^\s*<b>Why (worse|better) than the ratings\?<\/b>/, m=>'<b>Defense, ' + (/worse/.test(m) ? 'worse' : 'better') + ' than the ratings:</b>'), recordWhy(F), passRushWhy(F)].filter(Boolean);
 }catch(e){ parts = []; }
 if(!parts.length) return '';
 const tile = p=>{
  const m = /^<b>([^<]+)<\/b>\s*([\s\S]*)$/.exec(p.trim());
  if(!m) return '<div class="zpb-whytile"><p class="detail-item">' + p + '</p></div>';
  return '<div class="zpb-whytile"><b>' + m[1] + '</b><p class="detail-item">' + m[2] + '</p></div>';
 };
 return '<div class="zpb-whygrid">' + parts.map(tile).join('') + '</div>';
};

// season-in-words: glance tiles on top, paragraphs fade in and out on scroll
function zpbGlanceHTML(){
 const user = seasonUserTeam(), S = seasonState;
 const st = computeStandings(S.schedule, teamNames())[user];
 const gp = Math.max(st.wins + st.losses + st.ties, 1);
 const conf = conferenceOfTeam(user);
 let seed = null, made = null;
 if(S.seeds && S.seeds[conf]){ const e = S.seeds[conf].find(x=>x.team===user); if(e){ seed = e.seed; made = true; } }
 const tile = (k, v, cls)=>'<div class="zpb-gltile ' + (cls||'') + '"><b>' + v + '</b><span>' + k + '</span></div>';
 return '<div class="zpb-glance">'
  + tile('Record', st.wins + '-' + st.losses + (st.ties ? '-' + st.ties : ''))
  + (seed ? tile('Seed', '#' + seed, 'zpb-gl-gold') : '')
  + tile('Points for / g', (st.pf/gp).toFixed(1))
  + tile('Points allowed / g', (st.pa/gp).toFixed(1))
  + tile('Diff', ((st.pf - st.pa)>=0 ? '+' : '') + (st.pf - st.pa), (st.pf - st.pa) > 0 ? 'zpb-gl-good' : '') // w19 fix: st.diff never existed on the standings map — "undefinedDIFF" is gone
  + (made!==null ? tile('Playoffs', made ? 'Clinched' : 'Out', made ? 'zpb-gl-good' : '') : '')
  + '</div>';
}
(function(){
 if(typeof generateRegularSeasonRecap !== 'function') return;
 const orig = generateRegularSeasonRecap;
 generateRegularSeasonRecap = function(){
  try{ return zpbGlanceHTML() + orig(); }catch(err){ return orig(); }
 };
})();
document.addEventListener('toggle', function(e){
 const d = e.target;
 if(!(d instanceof HTMLDetailsElement) || !d.open || !d.classList || !d.classList.contains('zpb-dd')) return;
 requestAnimationFrame(()=>{
  try{
   d.querySelectorAll('p, .detail-item, .zpb-gltile, .zpb-whytile').forEach(el=>{
    if('IntersectionObserver' in window && typeof zpbFadeIO !== 'undefined' && zpbFadeIO){
     if(!el.classList.contains('zpb-fade')) el.classList.add('zpb-fade');
     zpbFadeIO.observe(el);            // observed = fades in when seen, back when scrolled away
    } else { el.style.opacity = 1; }
   });
  }catch(err){}
 });
}, true);

// season review: strengths & weaknesses tiles, no weaknesses when you won it all,
// and a "Try again to 20-0?" panel that starts a new draft
function zpbStrengthsHTML(){
 const user = seasonUserTeam(), S = seasonState;
 const R = S.unitRatings[user], lg = S.league, rk = S.unitRanks[user];
 const units = Object.keys(UNIT_INFO).filter(u=>u !== 'kicker');
 const rows = units.map(u=>({u, d:R[u]-lg[u], r:rk[u]})).sort((a,b)=>b.d-a.d);
 const tile = (x, good)=>'<div class="zpb-sttile ' + (good ? 'zpb-stgood' : 'zpb-stbad') + '"><b>' + shortUnit(x.u) + '</b><span>#' + x.r + ' in the league</span><i>' + (x.d>=0 ? '+' : '−') + Math.abs(x.d).toFixed(1) + ' vs league</i></div>';
 const champ = S.champion === user;
 return '<div class="zpb-strengths"><div class="zpb-strow"><h5>Strengths</h5>' + rows.slice(0, 3).map(x=>tile(x, true)).join('') + '</div>'
  + (champ ? '' : '<div class="zpb-strow"><h5>Weaknesses</h5>' + rows.slice(-2).reverse().map(x=>tile(x, false)).join('') + '</div>')
  + '</div>';
}
(function(){
 if(typeof generateSeasonReviewRaw !== 'function') return;
 generateSeasonReviewRaw = function(){
  return (typeof zpbMetricsHTML === 'function') ? zpbMetricsHTML() : '';
 };
})();
document.addEventListener('click', function(e){
 if(e.target && e.target.id === 'zpbTryAgainBtn'){
  confirmDialog('This discards your drafted roster and any season in progress and takes you back to the draft setup.', 'Yes, run it back', startNewDraftFlow);
 }
});

// "Start A New Draft" at the bottom of the live draft
(function(){
 if(typeof renderDraftLive !== 'function') return;
 const orig = renderDraftLive;
 renderDraftLive = function(){
  const out = orig.apply(this, arguments);
  try{
   const host = document.getElementById('draftLive');
   if(host && !host.querySelector('#zpbNewDraftBtn')){
    const w = document.createElement('div'); w.className = 'zpb-newdraft';
    w.innerHTML = '<button class="tabbtn" id="zpbNewDraftBtn">Start A New Draft</button>';
    host.appendChild(w);
    w.querySelector('#zpbNewDraftBtn').addEventListener('click', ()=>{
     confirmDialog('This discards your drafted roster and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow);
    });
   }
  }catch(err){}
  return out;
 };
})();

// losing in the playoffs goes straight to the season-complete page
(function(){
 if(typeof advancePlayoffRound !== 'function') return;
 const orig = advancePlayoffRound;
 advancePlayoffRound = function(){
  orig();
  try{
   if(!seasonState || seasonState.phase !== 'playoffs') return;
   const u = seasonUserTeam();
   if(typeof userPlayoffStatus !== 'function') return;
   if(userPlayoffStatus(u).status === 'eliminated'){
    window.__zpbSilent = true;
    try{
     let guard = 0;
     while(seasonState.phase === 'playoffs' && guard++ < 8){
      simulatePlayoffRound();
      if(seasonState.phase !== 'playoffs') break;
      orig();
     }
    } finally { window.__zpbSilent = false; }
   }
  }catch(err){}
 };
})();

// awards and report-card tables become floating cards after each season render
function zpbCardify(){
 try{
  document.querySelectorAll('.panel').forEach(p=>{
   const t = (p.querySelector('h3, h4, summary') || {}).textContent || '';
   if(/award|mvp|report card|honors/i.test(t)) p.classList.add('zpb-cardify');
  });
 }catch(err){}
}
(function(){
 if(typeof renderSeasonTab !== 'function') return;
 const orig = renderSeasonTab;
 renderSeasonTab = function(){
  const out = orig.apply(this, arguments);
  try{ zpbCardify(); }catch(err){}
  return out;
 };
})();

// helpers used by the style tables (sort by personnel) and pick analysis
function persOrd(t){
 const m = /(\d+)\s*personnel/.exec(t || '');
 const order = ['1', '11', '12', '13'];
 const i = order.indexOf(m ? m[1] : '');
 return i < 0 ? 9 : i;
}
// ================= Z-POST-BLUE WAVE 10 JS =================
// Owner tenth wave: full-bleed bar, graphical guide, draft-board upgrades,
// 100 Season Sim naming/gating, draft-finish cinematic, hovers, 3-4 toggle,
// FB/Punter draft slots, philosophy unlocked all season.
(function(){
'use strict';

// ---- full position names for hover titles (Owner directive) ----
const ZPB_FULL = {QB:'Quarterback',RB1:'Running Back 1',RB2:'Running Back 2',FB:'Fullback',DIME:'Dime Cornerback (CB4)',
 WR1:'Wide Receiver 1',WR2:'Wide Receiver 2',WR3:'Wide Receiver 3',TE1:'Tight End 1',TE2:'Tight End 2',
 OT1:'Offensive Tackle 1',OT2:'Offensive Tackle 2',OG1:'Guard 1',OG2:'Guard 2',C:'Center',
 DE1:'Defensive End 1',DE2:'Defensive End 2',DT1:'Defensive Tackle 1',DT2:'Defensive Tackle 2',
 NT:'Nose Tackle',MIKE:'Middle Linebacker',ILB1:'Interior Linebacker 1',ILB2:'Interior Linebacker 2',
 OLB1:'Outside Linebacker 1',OLB2:'Outside Linebacker 2',
 WILL:'Weak Side Linebacker',SAM:'Strong Side Linebacker',
 CB1:'Cornerback 1',CB2:'Cornerback 2',CB3:'CB3',NICKEL:'CB3',
 SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter'};
document.addEventListener('mouseover', e=>{
 const el = e.target.closest ? e.target.closest('.slotname,[data-zslot],.zpb-lu-c,.zpb-pip') : null;
 if(!el) return;
 let k = el.dataset.zslot || (el.textContent||'').trim().toUpperCase();
 const t = ZPB_FULL[k]; if(t) el.title = t;
});

// ---- slow Star-Wars fading explainer system ----
let _swIO = null;
function zpbScanSW(){
 if(_swIO) _swIO.disconnect();
 _swIO = new IntersectionObserver(es=>{
  es.forEach(x=>{ if(x.isIntersecting) x.target.classList.add('zpb-sw-in');
                   else x.target.classList.remove('zpb-sw-in'); });
 },{threshold:0.15});
 document.querySelectorAll('.zpb-sw,.zpb-swmini').forEach(el=>_swIO.observe(el));
}
// a MutationObserver re-scans on every render (tab switches, week renders,
// draft ticks) — no monkey-patching of site functions needed
let _swPending = false;
const _swMO = ('MutationObserver' in window) ? new MutationObserver(()=>{
 if(_swPending) return; _swPending = true;
 requestAnimationFrame(()=>{ _swPending = false; zpbScanSW(); zpbWireReturners(); zpbFlexFoot(); zpbFillToggles(); });
}) : null;
if(_swMO) _swMO.observe(document.documentElement, {childList:true, subtree:true});

// wrap every <p> of an html blob in centered slow-fading blocks
window.zpbSwWrap = function(html){
 return String(html).split(/(?=<p)/).map(seg=>{
  const m = seg.match(/^<p[^>]*>([\s\S]*?)<\/p>$/);
  return m ? `<div class="zpb-sw">${m[1]}</div>` : seg;
 }).join('');
};
window.zpbSw = function(text, small){
 return `<div class="zpb-sw">${text}${small?`<small>${small}</small>`:''}</div>`;
};

// ---- guide graphics: positions ranked (engine-derived, auto-updates) ----
window.zpbPosRankHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 const mx = rows.length ? rows[0].w : 1;
 let h = '<div class="zpb-posrank">';
 rows.forEach((r,i)=>{
  h += `<div class="zpb-prrow${i===0?' zpb-prtop':''}"><span class="zpb-prank">${i+1}</span>`
     + `<span class="zpb-prname"${i>=0?' data-zslot="'+r.s+'"':''}>${(typeof LABELS!=='undefined'&&LABELS[r.s])||r.s}</span>`
     + `<span class="zpb-prbar" style="width:${Math.max(2.5, r.w/mx*100).toFixed(1)}%"></span>`
     + `<span class="zpb-prval" title="Wins added per season by upgrading this spot from a 70 to a 90">${r.w.toFixed(1)} wins</span></div>`;
 });
 h += '</div>';
 return h;
};
// cumulative series: 1 QB · 2 QB + CB1 · 3 QB + CB1 + DE1 … down to the last spot
window.zpbSeriesHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 let acc = [];
 const chips = rows.map((r,i)=>{
  acc.push((typeof LABELS!=='undefined'&&LABELS[r.s])||r.s);
  return `<span class="zpb-ser"><b>${i+1}</b>${acc.join(' + ')}</span>`;
 });
 return `<div class="zpb-series">${chips.join('')}</div>`;
};
// draft guide: graphic + series + the two fading explainers
window.zpbDraftGuideHTML = function(){
 return zpbPosRankHTML()
  + zpbSw('WHERE THEY LINE UP')
  + (window.zpbFieldMapHTML ? zpbFieldMapHTML() : '')
  + zpbSw('YOU CAN FLEX')
  + '<div class="zpb-swgroup">'
  + zpbSwWrap(window.zpbFlexExplainHTML ? zpbFlexExplainHTML() : '')
  + zpbSw('Who decides? You do.', 'The math suggests the arrangement that wins the most games.<br>Accept it, change any spot yourself, or play your own way.<br>The computer teams always use the math\u2019s best arrangement.')
  + '</div>';
};
// values section: per-spot cards, engine-derived, with a short fading note
window.zpbValuesHTML = function(){
 if(typeof slotWins !== 'function') return '';
 const rows = (typeof ROSTER_SLOTS!=='undefined'?ROSTER_SLOTS:[]).map(s=>({s, w:((slotWins(s,90)-slotWins(s,70)))})).sort((a,b)=>b.w-a.w);
 let h = '<div class="zpb-posrank">';
 rows.forEach((r,i)=>{
  h += `<div class="zpb-prrow"><span class="zpb-prank">${i+1}</span><span class="zpb-prname" data-zslot="${r.s}">${(typeof LABELS!=='undefined'&&LABELS[r.s])||r.s}</span>`
     + `<span class="zpb-prbar" style="width:${Math.max(1.5, r.w/rows[0].w*100).toFixed(1)}%"></span>`
     + `<span class="zpb-prval">${r.w.toFixed(2)}</span></div>`;
 });
 h += '</div>'
  ;
 return h;
};
// personnel: vertical schedule-style boxes (no meaning column)
window.zpbPersBoxesHTML = function(){
 if(typeof PERS === 'undefined') return '';
 let h = '<div class="zpb-persboxes">';
 Object.keys(PERS).forEach(k=>{
  const rb = +k[0], te = +k[1], wr = 5-rb-te;
  h += `<div class="zpb-persbox" title="${PERS[k].long}"><b>${k}</b><span>RB ${rb}</span><span>TE ${te}</span><span>WR ${wr}</span></div>`;
 });
 h += '</div>';
 return h;
};
// package movement viz + emphasis badges (symbols, no words)
window.zpbPkgVizHTML = function(){
 const dot = n => Array.from({length:n}, ()=>'<i></i>').join('');
 const badge = kind => kind==='pass'
    ? '<span class="zpb-emph zpb-emph-b" title="Pass emphasis"><b>P+</b></span>'
    : kind==='run'
    ? '<span class="zpb-emph zpb-emph-b" title="Run emphasis"><b>R+</b></span>'
    : '<span class="zpb-emph zpb-emph-b" title="Balanced"><span class="zpb-bars"><i></i><i></i><i></i></span></span>';
 return '<div class="zpb-pkg">'
  + '<div class="zpb-pkgcard"><h5>4-3</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i>'+dot(3)+'</div><p>Four down linemen, three linebackers. Stronger against the run, a little thinner in coverage.</p></div>'
  + '<div class="zpb-pkgcard"><h5>3-4</h5><div class="zpb-pkgdots">'+dot(3)+'<i class="db"></i><i class="ldiff"></i>'+dot(3)+'<i class="ldiff"></i></div><p>The nose tackle holds the middle and a defensive tackle slides out — a linebacker family of two inside, two outside.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Nickel</h5><div class="zpb-pkgdots">'+dot(4)+'<i class="db"></i><i class="ldiff"></i>'+dot(2)+'<i class="ldiff"></i><i></i></div><p>Nickel takes a linebacker off and puts an extra defensive back on. The modern default.</p></div>'
  + '<div class="zpb-pkgcard"><h5>Focus</h5><div class="zpb-pkgdots">'+badge('pass')+' '+badge('run')+' '+badge('bal')+'</div><p>The same personnel can lean pass, lean run, or stay even — the badge shows the lean at a glance.</p></div>'
  + '</div>';
};
// coach guide: drop the Auto/Custom list, keep philosophy as a fading line,
// personnel boxes instead of the table, package viz added, style lists removed
window.zpbCoachGuideHTML = function(coach){
 let h = String(coach||'');
 h = h.replace(/<li><b>Auto \(recommended\)<\/b>[\s\S]*?<\/li>/, '')
      .replace(/<li><b>Custom<\/b>[\s\S]*?<\/li>/, '')
      .replace(/<h5 class="narr" style="margin:14px 0 6px;">What each style means<\/h5>[\s\S]*$/, '')
      .replace(/<h5 class="narr" style="margin:6px 0;">Offensive styles<\/h5>[\s\S]*$/, '');
 h += zpbPkgVizHTML()
   + '<div class="zpb-swgroup">'
   + zpbSw('COACHING PHILOSOPHY', 'Your default style, set on the Preseason page. If you leave it on Auto, the math picks the style that does best for your roster against an average team. Opponents scout it, and the recaps point out when you stray from it.')
   + '</div>'
   + '<div class="zpb-swgroup zpb-autocust">'
   + zpbSw('AUTO', 'The math predicts the best personnel.')
   + zpbSw('CUSTOM', 'You choose how you want to play.')
   + '</div>';
 return h;
};
// glossary: softened ink + new entries a first-time viewer needs
// W18: the glossary opens with every starting spot, in depth chart order, one small line each.
window.zpbGlossPositionsHTML = function(){
 const TIPS = {QB:'Touches the ball on every offensive snap — throws it, hands it off, or runs it.',RB:'Carries the ball and catches short passes out of the backfield.',FB:'Leads the block for the runner and catches the occasional short pass.',WR:'Runs the routes and catches the ball downfield.',TE:'Blocks like a lineman and catches like a receiver.',OT:"Protects the quarterback's blind side and blocks the edge on runs.",OG:'Blocks the interior — pass protection first, run blocking a close second.',C:'Anchors the line, makes the protection calls, and snaps the ball.',DE:'Rushes the passer off the edge and sets the edge against the run.',DT:'Takes on blockers inside — stops runs first, pressures the quarterback second.',MIKE:'The middle linebacker — makes the calls, stops the run, covers the middle.',OLB:'The outside linebackers — chase runs, cover backs and tight ends, sometimes rush.',CB:'Covers receivers man-to-man on the outside.',SS:'The box safety — supports against the run and covers tight ends and backs.',FS:'The deep safety — reads the quarterback and takes away the deep pass.',K:'Kicks the field goals and extra points.',P:'Punts — and pins teams back with hidden yards.'};
 const FAM = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',FB:'FB',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'OLB',SAM:'OLB',CB1:'CB',CB2:'CB',CB3:'NK',FS:'FS',SS:'SS',K:'K',P:'P'};
 const FAMNAME = {QB:'Quarterback',RB:'Running Back',FB:'Fullback',WR:'Wide Receiver',TE:'Tight End',OT:'Offensive Tackle',OG:'Offensive Guard',C:'Center',DE:'Defensive Edge',DT:'Defensive Tackle',MIKE:'Middle Linebacker',OLB:'Outside Linebacker',CB:'Cornerback',SS:'Strong Safety',FS:'Free Safety',K:'Kicker',P:'Punter',NK:'Nickel Cornerback'};
 const NK = 'the extra defensive back in five-defensive-back packages.';
 const DM = 'plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.';
 const slots = (typeof ROSTER_SLOTS!=='undefined') ? ROSTER_SLOTS : [];
 let out = '<p class="narr" style="margin:4px 0;"><b>Every starting spot, in depth chart order:</b></p><ul class="gl">';
 slots.forEach(s=>{
  const f = FAM[s]; const lb = (typeof LABELS!=='undefined'&&LABELS[s])||s;
  if(s==='CB3'){ out += `<li><b>CB3 — Nickel Cornerback</b> — ${NK}</li><li><b>Dime</b> — ${DM}</li>`; return; }
  if(!f || !TIPS[f]) return;
  out += `<li><b>${lb} · ${FAMNAME[f]}</b> — ${TIPS[f]}</li>`;
 });
 out += '</ul>';
 return out;
};
window.zpbGlossHTML = function(){
 let h = ((typeof window.zpbGlossPositionsHTML==='function') ? window.zpbGlossPositionsHTML() : '') + ((typeof termsHTML==='function') ? termsHTML() : '');
 h = h.replace('the 26 starting spots on this site', 'the 28 starting spots on this site');
 h = h.replace('<ul class="gl">', '<ul class="gl zpb-gloss">');
 const extra = [
  ['2-Pt Conversion','One play from the 2-yard line worth two points instead of the one-point kick.'],
  ['Extra point (XP)','The one-point kick after a touchdown.'],
  ['Field goal (FG)','Three points, kicked usually on 4th down.'],
  ['4th & short','Fourth down with one to two yards to go — the chance to keep the drive alive.'],
  ['Punt','Kicking the ball away on 4th down to give the opponent worse field position.'],
  ['Punter','The specialist who punts. His leg flips field position — the hidden-yards term in the model — which is why a great one is worth real wins.'],
  ['Fullback (FB)','A blocking back who leads the runner; rare in modern lineups. On this site he carries a real share of the run-blocking math.'],
  ['Nickel','A defense with five defensive backs — CB3 comes on, a linebacker comes off.'],
  ['3-4 / 4-3','The front seven\u2019s shape: three linemen and four linebackers, or four and three.'],
  ['Turnover','Losing the ball to the other team: interception or fumble.'],
  ['Sack','The quarterback tackled behind the line before he can throw.'],
  ['Red zone','The 20 yards before the end zone, where drives are expected to score.'],
  ['Clutch','The late part of a close game (4th quarter, small margin).'],
  ['Rookie of the Year','The best first-year player of the season. Not awarded on this site: the database carries no age or draft-class data.'],
  ['Comeback Player of the Year','The player who came back from injury or a lost season to play at a high level. Not awarded here for the same missing-data reason.'],
  ['Coach of the Year','Goes to the team that most outperformed its own projection — the widest gap between actual and expected wins.']
 ];
 const lis = extra.map(([t,d])=>`<li><b>${t}</b> — ${d}</li>`).join('');
 h = h.replace(/<\/ul>\s*$/, lis + '</ul>');
 return h;
};
// flex explainer rebuilt in the draft-roster order
window.zpbFlexExplainHTML = function(){
 if(typeof flexExplainHTML === 'function'){
  let h = flexExplainHTML();
  // rows already list player families; keep, but the section now fades in blocks
  return h;
 }
 return '';
};

// ---- 3-4 / 4-3 base toggle (Owner: pick your base; math follows) ----
window.zpb34Labels = function(on){
 if(typeof LABELS === 'undefined') return;
 if(on){
  LABELS.DT1='NT'; LABELS.DT2='OLB1'; LABELS.MIKE='ILB1'; LABELS.WILL='ILB2'; LABELS.SAM='OLB2';
 } else {
  LABELS.DT1='DT1'; LABELS.DT2='DT2'; LABELS.MIKE='MIKE'; LABELS.WILL='WILL'; LABELS.SAM='SAM';
 }
 document.body.toggleAttribute('data-zbase34', !!on);
};
window.zpbToggleBase34 = function(on){
 window._zpbAdjCache = {};
 window.ZPB34 = !!on;
 zpb34Labels(on);
 try{ localStorage.setItem('zpb:base34', on ? '1' : ''); }catch(err){}
 document.querySelectorAll('.zpb-basetoggle button').forEach(b=>{
  b.classList.toggle('zpb-base-on', (b.dataset.zbase === '34') === !!on);
 });
 const note = document.getElementById('zpb34note');
 if(note) note.textContent = '';
 if(typeof rerenderDraft === 'function') { try{ rerenderDraft(); }catch(err){} }
 if(typeof renderPreseasonView === 'function'){ try{ renderPreseasonView(); }catch(err){} }
};
window.zpbBaseToggleHTML = function(){
 const on = !!window.ZPB34;
 return '<span class="zpb-basetoggle" role="group" aria-label="Base defense">'
  + `<button type="button" data-zbase="43" title="4 Defensive Linemen · 3 Linebackers" class="${on?'':'zpb-base-on'}">4-3</button>`
  + `<button type="button" data-zbase="34" title="3 Defensive Linemen · 4 Linebackers" class="${on?'zpb-base-on':''}">3-4</button></span>`
  + '<span class="narr" id="zpb34note" style="font-size:0.72rem;max-width:420px;"></span>';
};
document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('.zpb-basetoggle button') : null;
 if(b) zpbToggleBase34(b.dataset.zbase === '34');
});
try{ if(localStorage.getItem('zpb:base34')==='1'){ window.ZPB34 = true; zpb34Labels(true); } }catch(err){}

// 3-4 spec adjustment: OLB treated as WILL, ILB as MIKE (Owner rule)
window.zpbAdjSpec = function(name, spec){
 if(!window.ZPB34 || !spec) return spec;
 const key = name + ':' + (window.ZPB34?'34':'43') + ':' + JSON.stringify(spec);
 if(window._zpbAdjCache[key]) return window._zpbAdjCache[key];
 const adj = Object.assign({}, spec);
 const set = (o,v)=>{ if(adj[o]!=null || name==='frontRun' || name==='passRush' || name==='coverage' || name==='frontBase' || name==='frontNick' || name==='covBase' || name==='covNick') adj[o]=v; };
 if(name==='frontRun' || name==='frontBase' || name==='frontNick'){ set('DT2',1.0); set('SAM',1.0); }
 if(name==='passRush'){ set('DT2',0.3); }
 if(name==='coverage' || name==='covNick'){ set('DT2',0.4); if(name==='covNick') set('SAM',0.4); }
 window._zpbAdjCache[key] = adj;
 return adj;
};

// ---- draft board helpers ----
window.zpbSlotOrderOf = function(pos){
 if(typeof NATURAL_SLOT_MAP === 'undefined' || typeof ROSTER_SLOTS === 'undefined') return 99;
 const nat = NATURAL_SLOT_MAP[pos] || [];
 let best = 99;
 nat.forEach(s=>{ const i = ROSTER_SLOTS.indexOf(s); if(i>=0 && i<best) best = i; });
 return best;
};
// segmented Table / Cards control
document.addEventListener('click', e=>{
 const b = e.target.closest ? e.target.closest('#draftViewSeg button') : null;
 if(!b) return;
 const sel = document.getElementById('draftView2');
 if(!sel) return;
 sel.value = b.dataset.zview;
 sel.dispatchEvent(new Event('change', {bubbles:true}));
 document.querySelectorAll('#draftViewSeg button').forEach(x=>x.classList.toggle('zpb-seg-on', x===b));
});
// position pips: rebuild the position-count chips as filled/hollow dots
window.zpbPipsHTML = function(){
 if(typeof POS_SLOT_MAP==='undefined' || typeof ROSTER_SLOTS==='undefined') return '';
 let roster = null;
 try{ roster = draftSim && draftSim.rosters && draftSim.rosters[draftSim.userIndex]; }catch(err){}
 const per = {};
 ROSTER_SLOTS.forEach(s=>{
  const g = (typeof WV_SLOT_GROUP!=='undefined' && WV_SLOT_GROUP[s]) || s;
  per[g] = per[g] || {need:0, have:0};
  per[g].need++;
  if(roster && roster.slots[s]) per[g].have++;
 });
 const order = ['QB','RB','FB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','SS','FS','K','P'];
 let h = '<span class="zpb-pips">';
 Object.keys(per).sort((a,b)=>{
  const ia = order.indexOf(a), ib = order.indexOf(b);
  return (ia<0?99:ia)-(ib<0?99:ib);
 }).forEach(g=>{
  const full = per[g].have >= per[g].need;
  h += `<span class="zpb-pip${full?' zpb-pip-on':''}" title="${ZPB_FULL[g.toUpperCase()]||g}: ${per[g].have} of ${per[g].need} filled"><i></i>${g} ${per[g].have}/${per[g].need}</span>`;
 });
 return h + '</span>';
};

// ---- draft-finish cinematic: three sentences, one at a time, super slow ----
window.zpbMaybeFinishCine = function(){
 if(window._zpbFinDone) return;
 window._zpbFinDone = true;
 const lines = ['SEASON', 'PLAYOFFS', 'SUPER BOWL', 'CAN YOU GO <b>20-0</b>?'];
 const ov = document.createElement('div');
 ov.className = 'zpb-fin zpb-fin-row';
 lines.forEach((t,li)=>{ const p = document.createElement('p'); p.innerHTML = t; if(li===lines.length-1) p.classList.add('zpb-fin-q'); ov.appendChild(p); });
 document.body.appendChild(ov);
 ov.addEventListener('pointerdown', ()=>{ if(ov.dataset.fading) return; ov.dataset.fading='1'; ov.style.transition='opacity .45s ease'; ov.style.opacity='0'; setTimeout(()=>ov.remove(), 480); });
 const ps = [...ov.querySelectorAll('p')];
 let i = 0;
 const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hold = [1500, 1500, 2900, 3400];
  const step = ()=>{   if(i>=ps.length){    setTimeout(()=>{ ov.style.transition='opacity 1.6s ease'; ov.style.opacity='0';     setTimeout(()=>ov.remove(), 1700); }, reduce ? 400 : 3600);    return;   }   ps[i].classList.add('zpb-fin-in');   i++;   setTimeout(step, reduce ? 900 : (hold[Math.min(i-1,3)] || 3000));  };
 step();
};

// ---- preseason: KR / PR returner rows (PR defaults to the second best) ----
window.zpbWireReturners = function(){
 const kr = document.querySelector('select[data-returner="1"]');
 if(!kr || kr.dataset.zwired) return;
 kr.dataset.zwired = '1';
 const host = kr.closest('.zpb-retrow') || kr.parentElement;
 if(!host || document.querySelector('select[data-returner-pr="1"]')) return;
 if(typeof returnerCandidates !== 'function' || typeof returnerRating !== 'function') return;
 let cands;
 try{ cands = returnerCandidates((typeof seasonState!=='undefined' && seasonState && seasonState.teams) ? seasonState.teams[seasonUserTeam()].slotmap : {}); }catch(err){ return; }
 if(!cands || cands.length < 2) return;
 cands = cands.slice().sort((a,b)=>returnerRating(b.p)-returnerRating(a.p));
 const second = cands[1];
 const row = document.createElement('div');
 row.className = 'depth-row lgrid';
 row.innerHTML = `<span class="slotname" title="Punt Returner">PR</span>`
   + `<select data-returner-pr="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">`
   + cands.map(c=>`<option value="${c.p[0].replace(/"/g,'&quot;')}" ${c.p[0]===second.p[0]?'selected':''}>${c.p[0]} (${returnerRating(c.p).toFixed(0)})</option>`).join('')
   + `</select>`;
 host.parentElement.insertBefore(row, host.nextSibling);
 const sel = row.querySelector('select');
 sel.addEventListener('change', ()=>{
  try{
   if(typeof seasonState!=='undefined' && seasonState){
    seasonState.prReturners = seasonState.prReturners || {};
    seasonState.prReturners[seasonUserTeam()] = sel.value;
   }
  }catch(err){}
 });
};

// ---- preseason: the group-scores legend joins the bottom flexing row ----
window.zpbFlexFoot = function(){
 const foot = document.querySelector('.zpb-flexfoot');
 if(!foot || foot.dataset.zgsdone) return;
 const panel = foot.closest('.panel');
 if(!panel) return;
 const gs = [...panel.querySelectorAll('b')].find(b=>/Group scores/.test(b.textContent));
 if(gs){
  const gsWrap = gs.closest('div.narr') || gs.parentElement;
  foot.appendChild(gsWrap);
  foot.dataset.zgsdone = '1';
 }
};
// base-toggle hosts (draft sidebar + preseason philosophy panel)
window.zpbFillToggles = function(){
 if(typeof zpbBaseToggleHTML !== 'function') return;
 ['#zpbBaseToggleHost','#zpbBaseToggleHost2'].forEach(sel=>{
  const h = document.querySelector(sel);
  if(h && !h.dataset.zdone){ h.dataset.zdone = '1'; h.innerHTML = zpbBaseToggleHTML();
   const note = h.querySelector('#zpb34note'); if(note) note.textContent = ''; }
 });
};

// boot rescan
const _boot = ()=>{ zpbScanSW(); zpbWireReturners(); zpbFlexFoot(); zpbFillToggles(); };
if(document.readyState === 'complete') setTimeout(_boot, 400);
else window.addEventListener('load', ()=>setTimeout(_boot, 400));

})();
// ---- Z-post-blue v11 (eleventh wave): duel blocks, team-icon filter,
//      ranks fade-in, SEASON op button, replay helpers. UI only. ----

// the two-team duel that replaces the game-plan wall of text
function zpbDuelHTML(g){
 try{
  const S = seasonState; if(!S || typeof ensureGamePlans !== 'function') return '';
  const plans = ensureGamePlans(g);
  const lean = po=> PERS[po.pers].label + (po.strat==='neutral' ? '' : ' \u00b7 ' + STRAT[po.strat].label);
  const cap = s=> s.split(' ').map(w=> w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  const chipRow = team=>{
   const rk = S.unitRanks[team]; if(!rk) return '';
   const us = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
   const best = us.slice().sort((a,b)=>rk[a]-rk[b]).slice(0,2);
   const worst = us.slice().sort((a,b)=>rk[b]-rk[a])[0];
   const one = (u, weak)=> '<span class="zpb-duelchip ' + (weak ? 'zpb-dweak' : 'zpb-dstrong') + '">' + (weak ? 'Weak ' : 'Strong ') + cap(UNIT_INFO[u].label) + '</span>';
   return '<div class="zpb-duelchips">' + best.map(u=>one(u,false)).join('') + one(worst,true) + '</div>';
  };
  const card = (team, side)=>{
   const p = plans[side];
   const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
   const lg = (typeof zpbTeamLogo==='function') ? zpbTeamLogo(team) : '';
   return '<div class="zpb-duelcard" style="' + st + '">'
    + '<div class="zpb-duelhd">' + lg + '<b>' + team + '</b></div>'
    + '<div class="zpb-duelrow"><span class="narr">Offense</span><b>' + lean(p.off) + '</b></div>'
    + '<div class="zpb-duelrow"><span class="narr">Defense</span><b>' + defPlanText(p.def) + '</b></div>'
    + chipRow(team)
    + '</div>';
  };
  return '<div class="zpb-duel">' + card(g.away,'away') + card(g.home,'home') + '</div>';
 }catch(err){ return ''; }
}

// click a team's logo on the board: that team only; click again: back to everyone
(function(){
 document.addEventListener('click', e=>{
  const tf = e.target.closest('.zpb-tfilter'); if(!tf) return;
  e.preventDefault();
  if(typeof draftUI === 'undefined' || typeof renderDraftBoard2 !== 'function') return;
  const t = tf.getAttribute('data-ztf');
  draftUI.teamFilter = (draftUI.teamFilter === t) ? null : t;
  renderDraftBoard2();
 });
 if(typeof renderDraftBoard2 === 'function'){
  const _rdb = renderDraftBoard2;
  renderDraftBoard2 = function(){
   const r = _rdb.apply(this, arguments);
   try{
    const f = document.getElementById('draftFitSummary');
    if(f && typeof draftUI !== 'undefined' && draftUI.teamFilter && typeof zpbTeamLogo === 'function'){
     f.innerHTML = '<span class="zpb-tfpill zpb-tfilter" data-ztf="' + draftUI.teamFilter.replace(/"/g,'&quot;') + '" role="button" tabindex="0" title="Click to clear the team filter">' + zpbTeamLogo(draftUI.teamFilter) + draftUI.teamFilter + ' only \u00b7 click to clear</span>';
    }
   }catch(e2){}
   return r;
  };
 }
})();

// the draft-ranks block fades in as you scroll down to it
(function(){
 const wire = ()=>{
  if(!('IntersectionObserver' in window)){
   document.querySelectorAll('.zpb-ranks-fade').forEach(el=>el.classList.add('zpb-fadein'));
   return;
  }
  const io = new IntersectionObserver(es=>{
   es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('zpb-fadein'); io.unobserve(en.target); } });
  }, {threshold:0.06});
  document.querySelectorAll('.zpb-ranks-fade:not([data-rw])').forEach(el=>{ el.dataset.rw = '1'; io.observe(el); });
 };
 if(typeof renderDraftResults === 'function'){
  const _rdr = renderDraftResults;
  renderDraftResults = function(){ const r = _rdr.apply(this, arguments); try{ wire(); }catch(e){} return r; };
 } else {
  document.addEventListener('DOMContentLoaded', wire);
 }
})();

// SEASON sits beside NEW DRAFT on the draft-review page
(function(){
 if(typeof renderDraftResults !== 'function') return;
 const _r = renderDraftResults;
 renderDraftResults = function(){
  const r = _r.apply(this, arguments);
  try{
   const b = document.getElementById('seasonOpsBtn');
   if(b && !b.dataset.w){
    b.dataset.w = '1';
    b.addEventListener('click', ()=>{
     try{
      resultsView = 'season';
      if(typeof seasonState === 'undefined' || !seasonState){ startSeason(); }
      renderDraftResults();
     }catch(e2){}
    });
   }
  }catch(e){}
  return r;
 };
})();

// ---- w20 (Owner): Position Rankings — every spot on the season draft board is a toggle ----
// The center panel — ranking, scores and players — rebuilds itself from the active spots.
// THE SERIES lives on as preset buttons 1..26 (27 SAM and 28 FB are gone, Owner) and the default
// selection is Series #19. Blank spots show nothing at all: the 70 replacement level stays in the
// math, away from the user. Every player wears the badge of his primary position, his name stays
// neutral unless he is 85+ (vibrant team color) or 90+ (shimmering team color), and his OVR number
// is always in the color of the team he is on. Cinzel Decorative everywhere; dots between players.
function zpbSeriesData(){
 const rows = ROSTER_SLOTS.map(s=>({s, w:(slotWins(s,90)-slotWins(s,70))}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 return rows.map(r=>r.s);
}
const ZPB_POS_BADGE = {QB:'QB',HB:'RB',FB:'FB',WR:'WR',TE:'TE',LT:'OT',RT:'OT',LG:'OG',RG:'OG',C:'C',DT:'DT',REDG:'EDGE',LEDG:'EDGE',MIKE:'LB',WILL:'LB',SAM:'LB',CB:'CB',SS:'SS',FS:'FS',K:'K',P:'P',LS:'LS'};
function zpbPosByNameInit(){
 if(window.zpbPosByName) return window.zpbPosByName;
 const m = {};
 try{ PLAYERS.forEach(p=>{ if(p && p[0] && !m[p[0]]) m[p[0]] = p[1]; }); }catch(e){}
 window.zpbPosByName = m; return m;
}
function zpbPosBadgeHTML(name){
 const raw = zpbPosByNameInit()[name]; if(!raw) return '';
 const tag = ZPB_POS_BADGE[raw] || raw;
 return '<span class="zpb-poschip">'+tag+'</span>';
}
// one player: primary-position badge · name (neutral / 85+ vibrant / 90+ shimmering — the team's color) · OVR (the team's color)
function zpbGroupPlayerHTML(p){
 if(!p || !p[0]) return '';
 const pk = (typeof zpbPackFor==='function') ? zpbPackFor(p[2]) : null;
 const vars = pk ? '--nu:'+pk.accL+';--nud:'+pk.accD+';--zrb:'+pk.accL+';--zrbd:'+pk.accD+';' : '';
 const ovr = p[1] || 0;
 const cls = ovr>=90 ? 'zpb-shm' : (ovr>=85 ? 'zpb-vib' : '');
 return '<span class="zpb-gplayer" style="'+vars+'">'+zpbPosBadgeHTML(p[0])+'<span class="zpb-gname '+cls+'">'+p[0]+'</span><span class="zpb-gnum">'+ovr+'</span></span>';
}
function zpbActiveSlots(){ return window.zpbRankSlots || (window.zpbRankSlots = new Set()); }
function zpbRenderRankings(){
 const active = zpbActiveSlots(), order = window.zpbSeriesOrder || [];
 const teams = [...new Set(PLAYERS.map(p=>p[2]))];
 const results = teams.map(team=>{
  const tm = TEAM_DATA[team];
  let sum = 0; const players = [];
  order.forEach(s=>{                       // players appear in the Series (slot-wins) order
   if(!active.has(s)) return;
   const e = tm ? tm[s] : null;
   sum += (e && e.ovr) ? e.ovr : 70;       // the 70 replacement level, in the background (Owner)
   if(e && e.name) players.push([e.name, e.ovr, team]);   // blank spots show nothing (Owner)
  });
  return {team, avg: active.size ? sum/active.size : 0, players};
 });
 results.sort((a,b)=>b.avg-a.avg);
 document.getElementById('groupCount').textContent = active.size
  ? ('Ranking by these ' + active.size + ' spots' + (order.length && active.size===Math.min(19,order.length) ? ' — Series #19' : '') + '.')
  : 'Toggle spots on to rank the 32 rosters.';
 const body = document.getElementById('groupBody');
 let rows = '';
 results.forEach((r, idx)=>{
  const cells = r.players.map(p=>zpbGroupPlayerHTML(p)).join('<span class="zpb-gsep">·</span>') || '<span class="zpb-gempty">—</span>';
  rows += '<tr class="zpb-grow"><td class="rank">'+(idx+1)+'</td><td class="team">'+r.team+'</td><td class="score">'+Math.round(r.avg)+'</td><td class="narr">'+cells+'</td></tr>';
 });
 body.innerHTML = rows;
 const panel = body.closest('.panel');
 if(panel){ const old = panel.querySelector('.zpb-70note'); if(old) old.remove();
  const note = document.createElement('div'); note.className = 'zpb-70note'; note.textContent = 'Missing spots filled at 70 OVR in the math';
  panel.appendChild(note); }
}
function zpbBuildSlotRow(){
 const row = document.getElementById('zpbSlotTogs'); if(!row) return;
 let h = '';
 ROSTER_SLOTS.forEach(s=>{ h += '<span class="chip zpb-pip" data-togslot="'+s+'" role="switch" aria-checked="false" tabindex="0" title="Toggle '+s+' on or off — the ranking rebuilds itself"><i></i>'+s+'</span>'; });
 h += '<span class="zpb-allnone"><span class="chip" data-allslots="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">ALL</span></span><span class="chip" data-noslots="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">CLEAR</span></span></span>';
 row.innerHTML = h;
}
function zpbBuildSeriesRow(){
 const row = document.getElementById('zpbSeriesRow'); if(!row) return;
 const order = window.zpbSeriesOrder || [];
 let h = '<span class="zpb-serlabel">THE SERIES</span>';
 order.slice(0,26).forEach((s,i)=>{        // 1..26 — items 27 and 28 removed (Owner)
  h += '<button type="button" class="zpb-srbtn" data-ser="'+(i+1)+'" title="Series '+(i+1)+': '+order.slice(0,i+1).join(' + ')+'"><b>'+(i+1)+'</b><i>'+s+'</i></button>';
 });
 row.innerHTML = h;
}
function zpbSyncRankingsUI(){
 const active = zpbActiveSlots(), order = window.zpbSeriesOrder || [];
 document.querySelectorAll('#zpbSlotTogs [data-togslot]').forEach(el=>{
  const on = active.has(el.dataset.togslot);
  el.classList.toggle('on', on); el.setAttribute('aria-checked', on?'true':'false');
 });
 document.querySelectorAll('#zpbSeriesRow [data-ser]').forEach(el=>{
  const n = parseInt(el.dataset.ser,10) || 0;
  const match = n>0 && n<=26 && active.size===n && order.slice(0,n).every(s=>active.has(s));
  el.classList.toggle('on', match);
 });
}
function zpbInitRankingsUI(){
 const row = document.getElementById('zpbSlotTogs');
 if(!row || row.childElementCount) return;
 try{
  window.zpbSeriesOrder = zpbSeriesData();
  zpbBuildSlotRow();
  zpbBuildSeriesRow();
  window.zpbRankSlots = new Set(window.zpbSeriesOrder.slice(0, Math.min(19, window.zpbSeriesOrder.length)));   // default: Series #19 (Owner)
  zpbSyncRankingsUI();
  zpbRenderRankings();
 }catch(e){ zpbErr('initRankingsUI', e); } // w23: a failed rankings init is reported, never silently blank
}
{ const togRow = document.getElementById('zpbSlotTogs');
  if(togRow) togRow.addEventListener('click', e=>{
   const t = e.target.closest('[data-togslot],[data-allslots],[data-noslots]'); if(!t) return;
   const active = zpbActiveSlots();
   if(t.dataset.togslot){ const s = t.dataset.togslot; if(active.has(s)) active.delete(s); else active.add(s); }
   else if(t.dataset.allslots){ ROSTER_SLOTS.forEach(s=>active.add(s)); }
   else if(t.dataset.noslots){ active.clear(); }
   zpbSyncRankingsUI(); zpbRenderRankings();
  });
  togRow && togRow.addEventListener('keydown', e=>{
   if(e.key!=='Enter' && e.key!==' ') return;
   const t = e.target.closest('[data-togslot]'); if(!t) return;
   e.preventDefault(); t.click();
  });
}
{ const serRow = document.getElementById('zpbSeriesRow');
  serRow && serRow.addEventListener('click', e=>{
   const b = e.target.closest('[data-ser]'); if(!b) return;
   const n = parseInt(b.dataset.ser,10) || 1, order = window.zpbSeriesOrder || [];
   window.zpbRankSlots = new Set(order.slice(0, Math.min(n, order.length)));
   zpbSyncRankingsUI(); zpbRenderRankings();
  });
}
setTimeout(zpbInitRankingsUI, 0); // ROSTER_SLOTS and slotWins are consts/functions declared later in this script

// ---- Draft Simulator (32-team snake draft) ----
const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K','P'];
const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/CB4/SS2/FS2/WR4/P/FB
// ---- FLEX RULES ----------------------------------------------------------------------------------------------
// A player may start at a spot that is not his natural position. The penalty is the number of rating points he loses there.
// FLEX[tag] lists the other spots he may play: by exact slot (CB3) or by slot family (OT, OG, C, DE, DT, CB, WR, TE, RB, SS, FS, MIKE, WILL, SAM).
// Anything not listed is not allowed (except in the "last spot" emergency, see userEmergency).
const SLOT_FAMILY = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',DE1:'DE',DE2:'DE',DT1:'DT',DT2:'DT',MIKE:'MIKE',WILL:'WILL',SAM:'SAM',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',K:'K',P:'P',FB:'FB'}; // w23: FB/P complete the family map
const NATURAL_SLOT_MAP = {
 QB:['QB'], HB:['RB1','RB2','FB'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'],
 LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
 DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'],
 MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'],
 CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'],
 K:['K'], P:['P'], FB:['FB']
};
const LB_FLEX = {DE:6, DT:4, CB3:4, SS:2, FS:4, TE:6, RB:6}; // MIKE: DT -4, SS -2 (Owner)
const OLB_FLEX = {DE:2, DT:4, CB3:2, SS:4, FS:6, TE:6, RB:6}; // Owner: OLB/WILL/SAM -> edge -2, DT/SS -4, FS -6, Nickel -2
const FLEX = {
 LT:{OG:0, C:0, DT:4, RB:6}, RT:{OG:0, C:0, DT:4, RB:6},   // a tackle plays any line spot free; OL->RB -6 (Owner)
 LG:{C:0, OT:4, DT:4, RB:6}, RG:{C:0, OT:4, DT:4, RB:6}, C:{OG:0, OT:4, DT:4, RB:6},
 DT:{DE:4, MIKE:4, WILL:4, SAM:4, OG:4, C:4, OT:6, RB:6},
 REDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, LEDG:{DT:2, MIKE:4, WILL:0, SAM:0, TE:6, RB:6}, // edges play OLB free (Owner)
 MIKE:LB_FLEX, WILL:OLB_FLEX, SAM:OLB_FLEX,
 CB:{SS:2, FS:0, MIKE:6, WILL:4, SAM:4, WR:4, TE:6, RB:6},  // CB->MIKE -6 (Owner)
 SS:{FS:2, CB:4, CB3:0, MIKE:4, WILL:2, SAM:2, WR:4, TE:6, RB:6}, // SS -> Nickel free (Owner)
 FS:{SS:2, CB:4, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6},
 WR:{TE:4, SS:4, FS:4, CB:4, RB:6},
 TE:{WR:2, RB:4, MIKE:6, WILL:6, SAM:6, SS:6, FS:6}, // TE -> WR -2, RB -4 (Owner)
 HB:{TE:6}, FB:{}, QB:{RB:6, WR:6}, K:{P:0}, P:{K:0}  // QB/OL -> RB -6, QB -> WR -6, K<->P free (Owner)
};
const EMERGENCY_PENALTY = 8;       // only when no remaining player can legally fill a spot you still need
function isNaturalSlot(pos, slot){ if(typeof window!=='undefined' && window.ZPB34 && (pos==='MIKE'||pos==='WILL'||pos==='SAM') && slot==='DT2') return true; const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }
function flexRule(pos, slot){        // penalty if the move is allowed, else null
 if(isNaturalSlot(pos, slot)) return 0;
 const t = FLEX[pos]; if(!t) return null;
 if(t[slot]!=null) return t[slot];
 const fam = SLOT_FAMILY[slot];
 return (fam && t[fam]!=null) ? t[fam] : null;
}
const POS_SLOT_MAP = (()=>{
 const m = {};
 Object.keys(NATURAL_SLOT_MAP).forEach(pos=>{
  const arr = [];
  ROSTER_SLOTS.forEach(sl=>{ const p = flexRule(pos, sl); if(p!=null) arr.push([sl,p]); });
  arr.sort((x,y)=>x[1]-y[1]);          // natural spots first, then the cheapest flexes (stable by depth-chart order)
  m[pos] = arr.map(x=>x[0]);
 });
 return m;
})();
function isOutOfPosition(pos, slot){ return !isNaturalSlot(pos, slot) && flexPenaltyFor(pos, slot) > 0; }
function flexPenaltyFor(pos, slot){
 const p = flexRule(pos, slot);
 return p==null ? EMERGENCY_PENALTY : p;
}
// Effective rating used everywhere a drafted player's OVR feeds the grading math.
function effOvr(player, slot){
 if(!player) return 70;
 return player[3] - flexPenaltyFor(player[1], slot);
}
// GM tiers: 1 QB; 2 EDGE/OT/WR/CB; 3 IDL/IOL/LB/S; 4 TE/RB; 5 ST
const POSITION_TIER = {QB:1, REDG:2,LEDG:2,LT:2,RT:2,WR:2,CB:2, DT:3,LG:3,RG:3,C:3,MIKE:3,WILL:3,SAM:3,SS:3,FS:3, TE:4,HB:4, K:5,P:5,FB:5};
const TIER_BONUS = {1:14, 2:8, 3:0, 4:-6, 5:-30};
const POS_DISPLAY = {HB:'RB', REDG:'EDGE', LEDG:'EDGE', LT:'OT', RT:'OT', LG:'OG', RG:'OG'};
const TEAM_ABBR = {
 'Arizona Cardinals':'ARI','Atlanta Falcons':'ATL','Baltimore Ravens':'BAL','Buffalo Bills':'BUF',
 'Carolina Panthers':'CAR','Chicago Bears':'CHI','Cincinnati Bengals':'CIN','Cleveland Browns':'CLE',
 'Dallas Cowboys':'DAL','Denver Broncos':'DEN','Detroit Lions':'DET','Green Bay Packers':'GB',
 'Houston Texans':'HOU','Indianapolis Colts':'IND','Jacksonville Jaguars':'JAX','Kansas City Chiefs':'KC',
 'Las Vegas Raiders':'LV','Los Angeles Chargers':'LAC','Los Angeles Rams':'LAR','Miami Dolphins':'MIA',
 'Minnesota Vikings':'MIN','New England Patriots':'NE','New Orleans Saints':'NO','NY Giants':'NYG',
 'NY Jets':'NYJ','Philadelphia Eagles':'PHI','Pittsburgh Steelers':'PIT','San Francisco 49ers':'SF',
 'Seattle Seahawks':'SEA','Tampa Bay Buccaneers':'TB','Tennessee Titans':'TEN','Washington Commanders':'WAS'
};
const NFL_DIVISIONS = {
 'AFC East': ['Buffalo Bills','Miami Dolphins','New England Patriots','NY Jets'],
 'AFC North': ['Baltimore Ravens','Cincinnati Bengals','Cleveland Browns','Pittsburgh Steelers'],
 'AFC South': ['Houston Texans','Indianapolis Colts','Jacksonville Jaguars','Tennessee Titans'],
 'AFC West': ['Denver Broncos','Kansas City Chiefs','Las Vegas Raiders','Los Angeles Chargers'],
 'NFC East': ['Dallas Cowboys','NY Giants','Philadelphia Eagles','Washington Commanders'],
 'NFC North': ['Chicago Bears','Detroit Lions','Green Bay Packers','Minnesota Vikings'],
 'NFC South': ['Atlanta Falcons','Carolina Panthers','New Orleans Saints','Tampa Bay Buccaneers'],
 'NFC West': ['Arizona Cardinals','Los Angeles Rams','San Francisco 49ers','Seattle Seahawks']
};
const CONFERENCES = {
 AFC: ['AFC East','AFC North','AFC South','AFC West'],
 NFC: ['NFC East','NFC North','NFC South','NFC West']
};
function divisionOfTeam(team){ return Object.keys(NFL_DIVISIONS).find(d=>NFL_DIVISIONS[d].includes(team)); }
function conferenceOfTeam(team){ const d = divisionOfTeam(team); return CONFERENCES.AFC.includes(d) ? 'AFC' : 'NFC'; }
function divisionRivals(team){ const d = divisionOfTeam(team); return NFL_DIVISIONS[d].filter(t=>t!==team); }

function pairKey(a,b){ return a<b ? a+'|'+b : b+'|'+a; }
function shuffleArr(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function generateDivisionWeeks(){
 const weeks = [[],[],[],[],[],[]];
 Object.values(NFL_DIVISIONS).forEach(([a,b,c,d])=>{
  weeks[0].push([a,b]); weeks[0].push([c,d]);
  weeks[1].push([a,c]); weeks[1].push([b,d]);
  weeks[2].push([a,d]); weeks[2].push([b,c]);
  weeks[3].push([b,a]); weeks[3].push([d,c]);
  weeks[4].push([c,a]); weeks[4].push([d,b]);
  weeks[5].push([d,a]); weeks[5].push([c,b]);
 });
 return weeks;
}

function tryGenerateNonDivisionWeeks(teams, playedPairsInit, numWeeks){
 const playedPairs = new Set(playedPairsInit);
 const weeks = [];
 for(let w=0; w<numWeeks; w++){
  const avail = shuffleArr(teams);
  const used = new Set();
  const weekGames = [];
  let ok = true;
  for(let i=0;i<avail.length;i++){
   const t = avail[i];
   if(used.has(t)) continue;
   let partner = null;
   for(let j=i+1;j<avail.length;j++){
    const cand = avail[j];
    if(used.has(cand)) continue;
    if(playedPairs.has(pairKey(t,cand))) continue;
    partner = cand; break;
   }
   if(!partner){ ok=false; break; }
   used.add(t); used.add(partner);
   weekGames.push([t,partner]);
   playedPairs.add(pairKey(t,partner));
  }
  if(!ok) return null;
  weeks.push(weekGames);
 }
 return weeks;
}

function buildFullSchedule(allTeamNames){
 const divWeeks = generateDivisionWeeks();
 const divisionPairs = new Set();
 allTeamNames.forEach(t=> divisionRivals(t).forEach(r=> divisionPairs.add(pairKey(t,r))));
 let nonDivWeeks = null, attempts=0;
 while(!nonDivWeeks && attempts<3000){ nonDivWeeks = tryGenerateNonDivisionWeeks(allTeamNames, divisionPairs, 11); attempts++; }
 if(!nonDivWeeks) throw new Error('Could not generate a valid schedule — please try again.');
 // Every round is a full matching of all teams, so rounds can be dropped into any calendar week.
 // Division rounds are spread evenly; the home/away rematch with each rival lands ~9 weeks after the first meeting.
 const DIV_WEEK_NUMBERS = [2,5,8,11,14,17];
 const NONDIV_WEEK_NUMBERS = [];
 for(let w=1; w<=17; w++) if(!DIV_WEEK_NUMBERS.includes(w)) NONDIV_WEEK_NUMBERS.push(w);
 const games = [];
 divWeeks.forEach((weekPairs, i)=>{
  weekPairs.forEach(([h,a])=> games.push({week: DIV_WEEK_NUMBERS[i], home:h, away:a, divisional:true, played:false}));
 });
 nonDivWeeks.forEach((weekPairs, i)=>{
  weekPairs.forEach(([t1,t2])=>{
   const flip = Math.random()<0.5;
   games.push({week: NONDIV_WEEK_NUMBERS[i], home: flip?t1:t2, away: flip?t2:t1, divisional:false, played:false});
  });
 });
 return games;
}

// Combined position-filter groups for the draft board dropdown (OT/OG/EDGE merged across their raw tags)

let draftSim = null;
let draftSpeed = 'slow'; // 'instant' | 'slow' — slow is the default experience
let slowTimer = null;
let resultsView = 'all'; // 'all' | 'nfl'

const DEPTH_CHART_GROUPS = [
 ['Offense', 'off', ['QB','RB1','RB2','FB','WR1','WR2','WR3','TE1','TE2','OT1','OG1','C','OG2','OT2']],
 ['Defense', 'def', ['DE1','DT1','DT2','DE2','MIKE','WILL','SAM','CB1','CB2','CB3','FS','SS']],
 ['Special Teams', 'st', ['K','P']]
];

function initDraftSetup(){
 const sel = document.getElementById('draftSlotSelect');
 const teamNames = Object.keys(TEAM_DATA).sort();
 teamNames.forEach(t=>{ const o=document.createElement('option'); o.value=t; o.textContent=t; sel.appendChild(o); });
 { const ro=document.createElement('option'); ro.value='__random'; ro.textContent='Random team'; sel.insertBefore(ro, sel.firstChild); }
 sel.value = teamNames.includes('Kansas City Chiefs') ? 'Kansas City Chiefs' : teamNames[0];
 const pickSel = document.getElementById('draftPickNumberSelect');
 for(let i=1;i<=32;i++){ const o=document.createElement('option'); o.value=i; o.textContent='Pick '+i; pickSel.appendChild(o); }
 pickSel.value = 'random';
 document.getElementById('startDraftBtn').addEventListener('click', startDraft2);
 document.getElementById('speedInstantBtn').addEventListener('click', ()=>{
  draftSpeed='instant'; setSpeedButtons();
  if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
  if(draftSim && !draftSim.awaitingUser) processUntilUserTurn();
 });
 document.getElementById('speedSlowBtn').addEventListener('click', ()=>{
  draftSpeed='slow'; setSpeedButtons();
  if(draftSim && !draftSim.awaitingUser && !slowTimer) stepSlow();
 });
 document.getElementById('simToEndBtn').addEventListener('click', simToEnd);
 document.getElementById('undoPickBtn').addEventListener('click', undoUserPick);
 const rer = ()=>{ if(draftSim) renderDraftBoard2(); };
 { let _dst = null;
   document.getElementById('draftSearch2').addEventListener('input', ()=>{
    if(_dst) clearTimeout(_dst);
    _dst = setTimeout(()=>{ _dst = null; rer(); }, 180);
   });
 }
 document.getElementById('draftSort2').addEventListener('change', ()=>{ draftUI.sortAsc = ['name','pos','team'].includes(document.getElementById('draftSort2').value); rer(); });
 document.querySelectorAll('#viewDraft th.sortable').forEach(th=>th.addEventListener('click', ()=>{
  const sel = document.getElementById('draftSort2'), k = th.dataset.sort;
  if(sel.value===k) draftUI.sortAsc = !draftUI.sortAsc; else { sel.value = k; draftUI.sortAsc = ['name','pos','team'].includes(k); }
  rer();
 }));
 document.getElementById('draftPosFilter2').addEventListener('change', rer);
 { const pf = document.getElementById('draftPosFilter2'); WV_GROUPS.forEach(g=>{ const o = document.createElement('option'); o.value = g; o.textContent = WV_NAMES[g]; pf.appendChild(o); }); }
 document.getElementById('draftChips').addEventListener('click', e=>{
  const t = e.target.closest('[data-tog],[data-all],[data-none]'); if(!t || !draftSim) return;
  if(t.dataset.tog){ const g = t.dataset.tog; if(draftUI.groups.has(g)) draftUI.groups.delete(g); else draftUI.groups.add(g); }
  else if(t.dataset.all){ WV_GROUPS.forEach(g=>draftUI.groups.add(g)); draftUI.teamFilter = null; }
  else if(t.dataset.none){ draftUI.groups.clear(); }
  renderDraftBoard2();
 });
 const pickClick = e=>{
  if(e.target.closest('[data-showall]')){ draftUI.showAll = true; renderDraftBoard2(); return; }
  const b = e.target.closest('button[data-pick]'); if(b){ makeUserPick2(b.dataset.pick, b.dataset.slot); return; }
  const c = e.target.closest('[data-chg]');
  if(c){ e.preventDefault(); const name = c.dataset.chg, p = draftSim.pool.find(x=>x[0]===name); if(!p) return;
   const roster = draftSim.rosters[draftSim.userIndex], cur = draftUI.slotPick[name];
   const sl = document.createElement('select'); sl.className = 'slotsel';
   openSlotsFor(roster, p).forEach(s=>{ const o = document.createElement('option'); o.value = s; const pen = flexPenaltyFor(p[1], s); o.textContent = (LABELS[s]||s) + (pen ? ' (-'+pen+')' : ''); if(s===cur) o.selected = true; sl.appendChild(o); });
   sl.addEventListener('change', ()=>{ draftUI.slotPick[name] = sl.value; renderDraftBoard2(); });
   c.replaceWith(sl); sl.focus(); }
 };
 document.getElementById('draftBody2').addEventListener('click', pickClick);
 document.getElementById('draftCards').addEventListener('click', pickClick);
 document.getElementById('draftView2').addEventListener('change', rer);
 document.getElementById('rosterPickBtn').addEventListener('click', ()=>{ draftUI.rosterView='pick'; if(draftSim) renderDraftRoster2(); });
 document.getElementById('rosterDepthBtn').addEventListener('click', ()=>{ draftUI.rosterView='depth'; if(draftSim) renderDraftRoster2(); });
 setSpeedButtons();
}

function setSpeedButtons(){
 document.getElementById('speedInstantBtn').classList.toggle('active', draftSpeed==='instant');
 document.getElementById('speedSlowBtn').classList.toggle('active', draftSpeed==='slow');
}

function buildSnakeOrder(){
 const order = [];
 for(let r=0;r<TOTAL_ROUNDS;r++){
  const teams = [...Array(32).keys()];
  if(r%2===1) teams.reverse();
  order.push(...teams);
 }
 return order;
}

function findAssignableSlot(roster, pos){
 const c = POS_SLOT_MAP[pos];
 if(!c) return null;
 for(const s of c){ if(!roster.slots[s]) return s; }
 return null;
}
function slotForUser(roster, p){
 const s = findAssignableSlot(roster, p[1]);
 if(s) return s;
 if(!draftSim.pool.some(x=>findAssignableSlot(roster,x[1]))) return firstOpenSlotAny(roster);
 return null;
}
function firstOpenSlotAny(roster){
 for(const s of ROSTER_SLOTS){ if(!roster.slots[s]) return s; }
 return null;
}

// ================= LINEUP / FLEX ENGINE =================
// Players may play any slot their position is allowed to flex into (POS_SLOT_MAP); a flex costs rating points. Both the user and the CPU
// choose their own lineup: the CPU takes the math's best assignment, the user can accept the math's advice or be "less efficient" on purpose.
function hungarian(a){
 const n=a.length, m=a[0].length, INF=1e12, u=Array(n+1).fill(0), v=Array(m+1).fill(0), pp=Array(m+1).fill(0), way=Array(m+1).fill(0);
 for(let i=1;i<=n;i++){
  pp[0]=i; let j0=0; const minv=Array(m+1).fill(INF), used=Array(m+1).fill(false);
  do{
   used[j0]=true; const i0=pp[j0]; let delta=INF, j1=0;
   for(let j=1;j<=m;j++) if(!used[j]){ const cur=a[i0-1][j-1]-u[i0]-v[j]; if(cur<minv[j]){ minv[j]=cur; way[j]=j0; } if(minv[j]<delta){ delta=minv[j]; j1=j; } }
   for(let j=0;j<=m;j++){ if(used[j]){ u[pp[j]]+=delta; v[j]-=delta; } else minv[j]-=delta; }
   j0=j1;
  } while(pp[j0]!==0);
  do{ const j1=way[j0]; pp[j0]=pp[j1]; j0=j1; } while(j0);
 }
 const res=Array(n).fill(-1); for(let j=1;j<=m;j++) if(pp[j]) res[pp[j]-1]=j-1; return res;
}
function eligibleSlotsFor(p){ return POS_SLOT_MAP[p[1]] || []; }
function lineupWins(slotmap){ let t = 0; ROSTER_SLOTS.forEach(sl=>{ const p = slotmap[sl]; t += slotWins(sl, p ? effOvr(p, sl) : 70); }); return t; }
// The assignment of this roster's players to slots that maximizes wins (flex penalties included).
function optimalLineup(slotmap){
 const players = Object.values(slotmap).filter(Boolean), BIG = 1e6;
 if(!players.length) return Object.assign({}, slotmap);
 const cost = players.map(p=> ROSTER_SLOTS.map(sl=> eligibleSlotsFor(p).includes(sl) ? -slotWins(sl, effOvr(p, sl)) : BIG));
 const asg = hungarian(cost), out = {};
 for(let i=0;i<players.length;i++){ const j = asg[i]; if(j<0 || cost[i][j]>=BIG/2) return Object.assign({}, slotmap); out[ROSTER_SLOTS[j]] = players[i]; }
 return out;
}
function applyLineup(roster, lineup){
 const old = roster.slots, pr = roster.pickRounds || {}, byName = {};
 Object.keys(old).forEach(sl=>{ if(old[sl]) byName[old[sl][0]] = pr[sl]; });
 Object.keys(old).forEach(sl=>{ delete old[sl]; });
 const newPr = {};
 Object.keys(lineup).forEach(sl=>{ old[sl] = lineup[sl]; if(byName[lineup[sl][0]]!=null) newPr[sl] = byName[lineup[sl][0]]; });
 roster.pickRounds = newPr;
}
function optimizeCpuLineups(){ draftSim.rosters.forEach(r=>{ if(!r.isUser) applyLineup(r, optimalLineup(r.slots)); }); }
// Move a player into a slot; whoever was there swaps into the vacated slot when allowed (otherwise the move is refused).
function movePlayerToSlot(roster, name, slot){
 const sm = roster.slots, from = Object.keys(sm).find(k=>sm[k] && sm[k][0]===name); if(!from || from===slot) return true;
 const a = sm[from], b = sm[slot];
 if(!eligibleSlotsFor(a).includes(slot)) return false;
 if(b && !eligibleSlotsFor(b).includes(from)) return false;
 const pr = roster.pickRounds = roster.pickRounds || {};
 const pa = pr[from], pb = pr[slot];
 sm[slot] = a; if(b) sm[from] = b; else delete sm[from];
 pr[slot] = pa; if(b) pr[from] = pb; else delete pr[from];
 return true;
}
function lineupAdvice(roster){
 const cur = roster.slots, best = optimalLineup(cur), moves = [];
 ROSTER_SLOTS.forEach(sl=>{ const a = cur[sl], b = best[sl]; if(a && b && a[0]!==b[0]) moves.push({slot:sl, from:a, to:b}); });
 const gain = lineupWins(best) - lineupWins(cur);
 return {best, moves, gain, curWins:lineupWins(cur), bestWins:lineupWins(best)};
}
// A readable explanation of one recommended move set, from the slot values (wins per +1 OVR) and flex penalties.
function lineupAdviceHTML(roster, hostId){
 const adv = lineupAdvice(roster);
 const nOff = ROSTER_SLOTS.filter(sl=>roster.slots[sl] && isOutOfPosition(roster.slots[sl][1], sl)).length;
 const base70 = ROSTER_SLOTS.reduce((t,sl)=>t+slotWins(sl,70),0);
 let h = '';
 if(adv.gain<0.02){ return ''; } // W15: the "0 wins" badge is gone (Owner)
 const rows = adv.moves.map(m=>{
  const effA = effOvr(m.to, m.slot), effB = effOvr(m.from, m.slot);
  return `<tr><td>${LABELS[m.slot]||m.slot}</td><td>${m.from[0]} <span class="narr">${effB}</span></td><td>→ ${m.to[0]} <span class="narr">${effA}${isOutOfPosition(m.to[1], m.slot)?`, flex −${flexPenaltyFor(m.to[1], m.slot)}`:''}</span></td></tr>`; // w19 (Owner): just the OVR — no wins math in this menu
 }).join('');
 h += `<p style="margin:4px 0;"><b>The math recommends a different lineup, worth about +${(adv.gain*POINTS_PER_WIN/17).toFixed(1)} points a game</b>. It is a suggestion — you can keep your lineup and play less efficiently.</p>
  <table><thead><tr><th>Slot</th><th>Now</th><th>Recommended (why it is worth it)</th></tr></thead><tbody>${rows}</tbody></table>
  <button class="resetbtn" style="width:auto;padding:6px 14px;margin-top:8px;" id="${hostId}Apply">Apply the recommended lineup</button>`;
 return h;
}
// Slot-by-slot lineup editor: pick who plays where; flexed players show their penalty.
// Group scores for the lineup editor: weighted average of effective ratings (flex penalties included) using the model's own position weights.
const LINEUP_GROUPS = [['Offense',['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C']],['Rushing',['RB1','RB2','FB']],['Receiving',['WR1','WR2','WR3','TE1','TE2']],['Offensive line',['OT1','OT2','OG1','OG2','C']],['Defense',['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS']],['Defensive line',['DE1','DE2','DT1','DT2']],['Linebackers',['MIKE','WILL','SAM']],['Secondary',['CB1','CB2','CB3','SS','FS']]]; // w19 (Owner): Rushing joins the row
const _lineupPrev = {};
function lineupScoresHTML(roster, hostId){
 const mw = modelWeights(), cells = LINEUP_GROUPS.map(([name, slots])=>{
  let sum = 0, wt = 0; slots.forEach(sl=>{ const p = roster.slots[sl]; const w = mw[sl]||0; sum += (p ? effOvr(p, sl) : 70)*w; wt += w; });
  const v = wt ? sum/wt : 0, prev = _lineupPrev[hostId+name], d = prev==null ? 0 : v-prev;
  _lineupPrev[hostId+name] = v;
  const flexed = slots.some(sl=>{ const q = roster.slots[sl]; return q && isOutOfPosition(q[1], sl); }); // W15: tint when flexes drag the score down
  const delta = Math.abs(d)>=0.5 ? `<i class="${d>0?'up':'dn'}">${d>0?'▲':'▼'}${Math.round(Math.abs(d))}</i>` : '';
  return `<div class="zpb-luscore${flexed?' zpb-luflex':''}"><b>${Math.round(v)}</b>${delta}<span>${name}</span></div>`; // w19 (Owner): integers only, badges in one row
 }).join('');
 return `<div class="zpb-luscores">${cells}</div>`; // W15: caption removed (Owner)
}
function returnerRowHTML(hostId){
 const S = (typeof seasonState!=='undefined') ? seasonState : null; if(!S || !S.teams) return '';
 const user = seasonUserTeam(); if(!user) return '';
 const cands = returnerCandidates(S.teams[user].slotmap).sort((a,b)=>returnerRating(b.p)-returnerRating(a.p)), cur = (S.returners||{})[user] || autoReturner(S.teams[user].slotmap);
 return `<div class="depth-row lgrid"><span class="slotname" title="Kick Returner">KR</span><select data-returner="1" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${cands.map(c=>`<option value="${c.p[0].replace(/"/g,'&quot;')}" ${c.p[0]===cur?'selected':''}>${c.p[0]} — ${POS_DISPLAY[c.p[1]]||c.p[1]} ${c.p[3]}, score ${returnerRating(c.p).toFixed(1)}</option>`).join('')}</select><span class="dwar"></span></div>`;
}
function lineupEditorHTML(roster, hostId){
 const players = Object.values(roster.slots).filter(Boolean).sort((a,b)=>cmpPlayers(a,b));
 const groups = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = slots.map(sl=>{
   const cur = roster.slots[sl];
   const opts = players.filter(p=>eligibleSlotsFor(p).includes(sl) || (cur && p[0]===cur[0])).map(p=>{
    const fp = flexPenaltyFor(p[1], sl);
    return `<option value="${p[0].replace(/"/g,'&quot;')}" ${cur&&cur[0]===p[0]?'selected':''}>${p[0]}</option>`; // w19 (Owner): the box carries the name, nothing else
   }).join('');
   const war = cur ? `<span class="narr" style="margin-left:6px;">${fmtWar(winsAt(cur, sl))}</span>` : '';
   return `<div class="depth-row lgrid"><span class="slotname">${LABELS[sl]||sl}</span><select data-lineup="${sl}" style="width:100%;min-width:0;background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:3px 6px;font-size:0.78rem;">${opts}</select><span class="dwar">${cur?effOvr(cur, sl):''}</span></div>`;
  }).join('');
  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}${gcls==='st'?returnerRowHTML(hostId):''}</div>`;
 }).join('');
 return `<div id="${hostId}">${lineupScoresHTML(roster, hostId)}<div id="${hostId}Advice">${lineupAdviceHTML(roster, hostId)}</div><div class="draft-columns zpb-lu-cols" style="grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:8px;">${groups}</div></div>`;
}
function wireLineupEditor(roster, hostId, onChange){
 const host = document.getElementById(hostId); if(!host) return;
 host.querySelectorAll('select[data-returner]').forEach(sel=> sel.addEventListener('change', ()=>{ const S = seasonState, user = seasonUserTeam(); S.returners = S.returners||{}; S.returners[user] = sel.value; RET_PICK.set(S.teams[user].slotmap, sel.value); refreshUserAfterLineup(); }));
 host.querySelectorAll('select[data-lineup]').forEach(sel=> sel.addEventListener('change', ()=>{
  const ok = movePlayerToSlot(roster, sel.value, sel.dataset.lineup);
  if(!ok) FX.toast('That swap is not allowed: the player cannot flex there, or it would leave someone out of position.');
  onChange();
 }));
 const ap = document.getElementById(hostId+'Apply'); if(ap) ap.addEventListener('click', ()=>{ applyLineup(roster, lineupAdvice(roster).best); onChange(); });
 if(typeof zpbFitLineupNames==='function') zpbFitLineupNames();
}
function refreshUserAfterLineup(){
 const S = seasonState; if(!S) return;
 const user = seasonUserTeam();
 S.unitRatings[user] = teamRatings(S.teams[user].slotmap);
 S.unitRanks = computeUnitRanks(S.unitRatings);
 const cur = S.identity[user];
 applyUserScript(cur.offChoice||'auto', cur.defChoice||'auto'); // re-resolves the chosen style (or the math's pick) for the new lineup
 S.ratingsDirty = true;
}

// ================= WINS VALUE (how much each player is worth to winning, from the neutral sim math) =================
// Slot groups and player-tag groups: replacement level is measured within a position group.
const WV_SLOT_GROUP = {DE1:'EDGE',DE2:'EDGE',DT1:'DT',DT2:'DT',OT1:'OT',OT2:'OT',OG1:'OG',OG2:'OG',C:'C',MIKE:'LB',WILL:'LB',SAM:'LB',CB1:'CB',CB2:'CB',CB3:'CB',SS:'SS',FS:'FS',QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',K:'K',FB:'RB',P:'K'};
const WV_TAG_GROUP = {QB:'QB',HB:'RB',WR:'WR',TE:'TE',LT:'OT',RT:'OT',LG:'OG',RG:'OG',C:'C',DT:'DT',REDG:'EDGE',LEDG:'EDGE',MIKE:'LB',WILL:'LB',SAM:'LB',CB:'CB',SS:'SS',FS:'FS',K:'K'};
const WV_OFF_SLOTS = new Set(['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','FB','OT1','OT2','OG1','OG2','C','K']);   // FB is an offensive slot (wave 11: lead-blocker wins)
let _wpoCache = null, _wTable = null;
// Points per game the best game plan earns for a lineup (offense) or holds the league-average offense to (defense).
// Using the BEST plan matters: a strong second tight end is worth nothing in 11 personnel but a lot once the plan can switch to 12.
function bestUnitPts(R, lg, isOff){
 if(isOff) return OFF_OPTS.reduce((m,o)=>Math.max(m, matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}).structPts), -1e9);
 return -DEF_OPTS.reduce((m,d)=>Math.min(m, matchupModel(lg, R, lg, {off:NEUTRAL_OFF, def:d}).structPts), 1e9);
}
// Wins per season as a function of a slot's OVR (all other slots at a league-typical 80), measured on the matchup model itself.
function slotWinsTable(){
 if(_wTable) return _wTable;
 const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; });
 const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, lg, false)};
 const T = {};
 ROSTER_SLOTS.forEach(s=>{
  const isOff = WV_OFF_SLOTS.has(s), arr = [];
  for(let o=50;o<=100;o++){
   const sm = Object.assign({}, base); sm[s] = {ovr:o};
   arr.push((bestUnitPts(teamRatings(sm), lg, isOff) - (isOff?b0.on:b0.off))*k);
  }
  T[s] = arr;
 });
 return (_wTable = T);
}
function slotWins(slot, ovr){
 const t = slotWinsTable()[slot], x = clampNum(ovr, 50, 99.999)-50, i = Math.floor(x), f = x-i;
 return t[i]*(1-f) + t[i+1]*f;
}
// Approximate linear slope near a typical starter (wins per +1 OVR), kept for display and for fast estimates.
function slotWinsPerOvr(){
 if(_wpoCache) return _wpoCache;
 const out = {}; ROSTER_SLOTS.forEach(s=>{ out[s] = (slotWins(s, 90) - slotWins(s, 70))/20; });
 return (_wpoCache = out);
}
// Replacement level per group: the OVR of the Nth-best available player, N = starting spots still open league-wide.
function replacementLevels(pool, rosters){
 const dem = {}, byG = {}, out = {};
 rosters.forEach(r=> ROSTER_SLOTS.forEach(s=>{ if(!r.slots[s]){ const g = WV_SLOT_GROUP[s]; dem[g] = (dem[g]||0)+1; } }));
 pool.forEach(p=>{ const g = WV_TAG_GROUP[p[1]]; if(g) (byG[g] = byG[g]||[]).push(p[3]); });
 Object.keys(byG).forEach(g=>{
  const arr = byG[g].sort((a,b)=>b-a), n = dem[g]||0;
  out[g] = n>0 ? arr[Math.min(n, arr.length)-1] : arr[0];
 });
 return out;
}
let _replStatic = null;
function staticReplacement(){
 if(_replStatic) return _replStatic;
 const rosters = []; for(let i=0;i<32;i++) rosters.push({slots:{}});
 return (_replStatic = replacementLevels(PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]), rosters));
}
// Static wins: how many extra wins per season a player at this rating adds over a 70-rated player at his position.
// It depends only on the player and the sim math — never on any roster, draft board or flex.
const WINS_BASE = 70;
const STATIC_SLOTS = {QB:['QB'], HB:['RB1'], WR:['WR1','WR2','WR3'], TE:['TE1'], LT:['OT1','OT2'], RT:['OT1','OT2'], LG:['OG1','OG2'], RG:['OG1','OG2'], C:['C'],
 DT:['DT1','DT2'], REDG:['DE1','DE2'], LEDG:['DE1','DE2'], MIKE:['MIKE','WILL'], WILL:['MIKE','WILL'], SAM:['MIKE','WILL'], CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'], K:['K'], P:['P'], FB:['FB']}; // w23: FB and P are real roster spots — their wins were always 0.00 by omission
// Wins of a player at a specific slot (includes the flex penalty if he is out of position there).
function winsAt(p, slot, base){ return slotWins(slot, effOvr(p, slot)) - slotWins(slot, base==null?WINS_BASE:base); }
const _warCache = new Map();
function playerWar(p){
 if(_warCache.has(p[0])) return _warCache.get(p[0]);
 const slots = STATIC_SLOTS[p[1]] || [];
 let tot = 0; slots.forEach(s=>{ tot += slotWins(s, p[3]) - slotWins(s, WINS_BASE); });
 const v = {war: slots.length ? tot/slots.length : 0, slot: slots[0]||null};
 _warCache.set(p[0], v);
 return v;
}

function fmtWar(w){ return (w>=0?'+':'\u2212') + Math.abs(w).toFixed(2); }

// CPU front offices value players the way the sim does: wins above the replacement-level player at the slot they would fill,
// with each team's own (slightly different) read on each position group and some pick-to-pick noise.
// W23: each helper takes the draft state it acts on. Live picks create preferences on the live draft;
// hypothetical forecasts read the live franchise preferences (pre-rolled at startDraft2) and, if one is
// missing, keep the temporary value on the simulated state instead of writing to the live draft.
function cpuBias(teamIndex, group, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.bias && live.bias[teamIndex] && live.bias[teamIndex][group]!=null) return live.bias[teamIndex][group]; // forecasts read, never write (w23)
 host.bias = host.bias || {};
 const b = host.bias[teamIndex] = host.bias[teamIndex] || {};
 if(b[group]==null) b[group] = Math.random()<0.33 ? 0.003+Math.random()*0.03 : Math.random()<0.35 ? 5+Math.random()*8 : Math.exp(0.5*randNormal());   // each front office hyper-values some groups and nearly ignores others
 return b[group];
}
// every front office has its own judgment: some draft close to the board, some reach and miss, which spreads the 32 rosters
function cpuNoise(teamIndex, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.noiseSd && live.noiseSd[teamIndex]!=null) return live.noiseSd[teamIndex];
 host.noiseSd = host.noiseSd || {};
 if(host.noiseSd[teamIndex]==null) host.noiseSd[teamIndex] = 0.1 + Math.pow(Math.random(),1.0)*4.0;
 return host.noiseSd[teamIndex];
}
function cpuMiss(teamIndex, st){
 const live = (typeof draftSim !== 'undefined') ? draftSim : null;
 const host = (st && st !== live) ? st : live;
 if(host !== live && live && live.missP && live.missP[teamIndex]!=null) return live.missP[teamIndex];
 host.missP = host.missP || {};
 if(host.missP[teamIndex]==null) host.missP[teamIndex] = Math.pow(Math.random(),0.9)*0.95;
 return host.missP[teamIndex];
}
const _fpc = {};
function flexPen(pos, slot){ const k = pos+'|'+slot; return _fpc[k]!=null ? _fpc[k] : (_fpc[k] = flexPenaltyFor(pos, slot)); }
function cpuPick(teamIndex, st){
 st = st || draftSim;
 const roster = st.rosters[teamIndex], T = slotWinsTable();
 if(!st.repl || st.replPool - st.pool.length >= 6){ st.repl = replacementLevels(st.pool, st.rosters); st.replPool = st.pool.length; }
 const repl = st.repl, rlow = {}, seen = {};
 let best=null, bestVal=-Infinity, bestSlot=null; const cands = [];
 const curRound = Math.floor((st.pos||0)/32)+1;
 const topAvail = st.pool.length ? st.pool[0][3] : 0;   // pool is sorted by OVR, so pool[0] is the board's best remaining player
 // Round-order floors (CPU GMs stay credible): round 1 everyone is at least 90 (a QB can go at 88+ during a run on
 // quarterbacks); rounds 2–3 a pick must be within 8 of the best available overall, and a reach at a low-priority spot
 // (kicker, punter, fullback) must at least be the best remaining player AT THAT POSITION. Later rounds are free.
 const ovrFloor = curRound===1 ? Math.max(90, topAvail-5) : curRound<=3 ? Math.max(85, topAvail-8) : -Infinity;
 for(const p of st.pool){ // pool is sorted by overall, so only the top few at each position can matter
  const pos = p[1], c = POS_SLOT_MAP[pos]; if(!c) continue;
  const posBest = (seen[pos]=(seen[pos]||0)+1) === 1;   // first sight in the sorted pool = best remaining at that position
  if(curRound<=3 && !posBest) continue;
  if(p[3] < (pos==='QB' && topAvail>0 && (topAvail - p[3]) <= 4 ? Math.min(88, ovrFloor) : ovrFloor)) continue;
  if((seen[pos]||0) > 16) continue;
  const nz = Math.max(0.02, 1 + cpuNoise(teamIndex, st)*randNormal());
  for(const s of c){
   if(roster.slots[s]) continue;
   const g = WV_SLOT_GROUP[s], rl = rlow[s]!=null ? rlow[s] : (rlow[s] = Math.max(repl[g]==null?70:repl[g], 76));
   const t = T[s], x = clampNum(p[3]-flexPen(pos,s), 50, 99.999)-50, i = x|0, f = x-i;
   const w = t[i]*(1-f)+t[i+1]*f - slotWins(s, rl);
   const v = w*cpuBias(teamIndex, g, st)*nz + 0.002*p[3];
   cands.push({p, s, v});
   if(v>bestVal){ bestVal=v; best=p; bestSlot=s; }
  }
 }
 // some front offices simply miss: they take a good-looking player a few spots down their own board (a realistic
 // miss is a reach of a few spots, never thirty picks deep)
 if(cands.length>8 && Math.random() < cpuMiss(teamIndex, st)){
  cands.sort((a,b)=>b.v-a.v);
  const reach = 3 + Math.min(9, Math.floor(Math.abs(randNormal())*4));
  const c = cands[Math.min(reach, cands.length-1)];
  if(c.p[3] >= (curRound===1 ? 88 : curRound<=3 ? topAvail-9 : 0)){ best = c.p; bestSlot = c.s; }
 }
 if(!best){ // nobody fits a natural or flex spot: take the best player left for any open spot
  const s = firstOpenSlotAny(roster); if(!s || !st.pool.length) return null;
  best = st.pool[0]; bestSlot = s;
 }
 return {player:best, slot:bestSlot};
}

// W23 (audit GPT-T2): fully validated before any mutation — a rejected pick leaves every bit of
// state untouched. Player identity is the pool object itself, never the name string.
function executePick(teamIndex, player, slot){
 const S = draftSim;
 if(!S || !S.order) throw new Error('no active draft');
 if(S.pos >= S.order.length) throw new Error('draft is complete');
 if(S.order[S.pos] !== teamIndex) throw new Error('team ' + teamIndex + ' is out of turn at pick ' + (S.pos+1));
 if(!player) throw new Error('no player given');
 if(S.pool.indexOf(player) === -1) throw new Error((player[0]||'?') + ' is not in the pool');
 if(!slot || ROSTER_SLOTS.indexOf(slot) === -1) throw new Error('unknown slot ' + slot);
 const roster = S.rosters[teamIndex];
 if(!roster) throw new Error('no roster for team ' + teamIndex);
 if(roster.slots[slot]) throw new Error(slot + ' is already filled');
 const fits = (POS_SLOT_MAP[player[1]] || []).indexOf(slot) > -1 ||
  !S.pool.some(p=>(POS_SLOT_MAP[p[1]]||[]).some(sl=>!roster.slots[sl])); // emergency: nothing legal left anywhere
 if(!fits) throw new Error((player[1]||'?') + ' cannot legally fill ' + slot);
 const idx = S.pool.indexOf(player);
 if(idx>-1) S.pool.splice(idx,1);
 const round = Math.floor(S.pos/32)+1;
 roster.slots[slot] = player;
 roster.pickRounds = roster.pickRounds || {};
 roster.pickRounds[slot] = round;
 S.log.push({round, pickInRound:(S.pos%32)+1, overall:S.pos+1, teamIndex, isUser:teamIndex===S.userIndex, player, slot});
 S.pos++;
}

function startDraft2(){
 window._zpbWelDone = false; window._zpbKickStarted = false; // W15: kickoff wiring lives at the end of startDraft2
 draftUI = newDraftUI();
 { const d=(id,v)=>{ const e=document.getElementById(id); if(e) e.value=v; }; d('draftSort2','ovr'); d('draftView2','table'); d('draftPosFilter2','all'); d('draftSearch2',''); }
 league100 = null; window._zpbFinDone = false;
 seasonState = null; league100 = null; // a new draft invalidates any in-progress/completed season
 let userTeamName = document.getElementById('draftSlotSelect').value;
 if(userTeamName==='__random'){ const all = Object.keys(TEAM_DATA); userTeamName = all[Math.floor(Math.random()*all.length)]; }
 const pickChoice = document.getElementById('draftPickNumberSelect').value;
 const teamNames = Object.keys(TEAM_DATA);
 let shuffled, userIndex;
 if(pickChoice === 'random'){
  shuffled = teamNames.slice();
  for(let i=shuffled.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]; }
  userIndex = shuffled.indexOf(userTeamName);
 } else {
  userIndex = parseInt(pickChoice,10)-1;
  const others = teamNames.filter(t=>t!==userTeamName);
  for(let i=others.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [others[i],others[j]]=[others[j],others[i]]; }
  shuffled = new Array(32);
  shuffled[userIndex] = userTeamName;
  let oi=0;
  for(let i=0;i<32;i++){ if(i!==userIndex) shuffled[i]=others[oi++]; }
 }
 const rosters = [];
 for(let i=0;i<32;i++) rosters.push({slots:{}, isUser:i===userIndex, teamName: shuffled[i]});
 draftSim = {
  userIndex, rosters, teamNames: shuffled,
  pool: PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).sort((a,b)=>(b[3]-a[3])||(a[0]<b[0]?-1:1)),
  order: buildSnakeOrder(), pos:0, log:[], awaitingUser:false
 };
 // W23: pre-roll every front office's judgment at draft start. Hypothetical forecasts (Priority / Gone)
 // now READ these preferences without ever writing to the live draft, so a forecast can no longer
 // shape real CPU behavior (audit GPT-T5).
 draftSim.bias = {}; draftSim.noiseSd = {}; draftSim.missP = {};
 for(let pi=0;pi<32;pi++){
  draftSim.bias[pi] = {};
  WV_GROUPS.forEach(g=>{ draftSim.bias[pi][g] = Math.random()<0.33 ? 0.003+Math.random()*0.03 : Math.random()<0.35 ? 5+Math.random()*8 : Math.exp(0.5*randNormal()); });
  draftSim.noiseSd[pi] = 0.1 + Math.pow(Math.random(),1.0)*4.0;
  draftSim.missP[pi] = Math.pow(Math.random(),0.9)*0.95;
 }
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
 setSpeedButtons();
 const abbr = TEAM_ABBR[userTeamName] || userTeamName.slice(0,3).toUpperCase();
 if(typeof zpbApplyTeamTheme==='function') zpbApplyTeamTheme(userTeamName);
 document.getElementById('draftingAsBanner').innerHTML =
  `<div class="zpb-das-logo">${typeof zpbTeamLogo==='function'&&zpbTeamLogo(userTeamName)?zpbTeamLogo(userTeamName):abbr}</div><b class="zpb-shine zpb-das-name">${userTeamName}</b><span class="zpb-nextpick" id="zpbNextPick" title="Your next pick: (round.pick)"></span>`;
 document.getElementById('draftSetup').style.display='none'; { const gh = document.getElementById('draftGuideHost'); if(gh) gh.style.display='none'; }
 document.getElementById('draftFinalResults').style.display='none';
 document.getElementById('draftLive').style.display='block';
 if(typeof zpbSyncHome==='function') zpbSyncHome();
 // W15: the first board render is guarded — a throwing render can never leave a dead draft
 try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} }
 // W23: the draft engine starts on its own engine-owned timer, never behind the welcome cinematic —
 // a hidden tab, a throttled animation or a slow machine can no longer delay or stall the CPU draft.
 // The cinematic is decoration only; the watchdog stays as the belt-and-braces backstop.
 const zpbKick = ()=>{ if(window._zpbKickStarted) return; window._zpbKickStarted = true; zpbStopDraftWatchdog(); try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); } };
 window._zpbWelFade = zpbKick;
 setTimeout(zpbKick, 350);
 try{ if(typeof zpbWelcomeCine==='function') zpbWelcomeCine(()=>{}); }catch(err){}
 zpbStartDraftWatchdog();
}
// W15: the draft can never go dead — watchdog + surfaced recovery + minimal fallback board
function zpbStartDraftWatchdog(){
 zpbStopDraftWatchdog();
 const t0 = Date.now(); let ticks = 0;
 window._zpbDW = setInterval(()=>{
  ticks++;
  try{
   if(typeof draftSim==='undefined' || !draftSim){ zpbStopDraftWatchdog(); return; }
   const cine = document.querySelector('.zpb-fin-welcome');
   if(cine){ if(Date.now()-t0 > 6000){ try{ cine.remove(); }catch(e){} } else if(ticks < 6) return; } // a stuck cinematic is force-closed after 6 s (w23, was 25 s)
   if(ticks < 5) return; // give the engine-owned kick a beat before stepping in (w23)
   if(draftSim.pos===0 && !draftSim.log.length && !draftSim.awaitingUser){
    zpbStopDraftWatchdog();
    try{ processUntilUserTurn(); }catch(err){ zpbDraftRecover(err); }
   } else zpbStopDraftWatchdog();
  }catch(e){ zpbStopDraftWatchdog(); }
 }, 1500);
}
function zpbStopDraftWatchdog(){ if(window._zpbDW){ clearInterval(window._zpbDW); window._zpbDW = null; } }
function zpbDraftRecover(err){
 try{ console.warn('Z-post-blue draft auto-recover:', err); }catch(e){}
 try{ const feed = document.getElementById('draftRecentPicks'); if(feed && !feed.children.length) feed.innerHTML = '<div class="narr">The draft engine hiccuped once and recovered — the board below is live.</div>'; }catch(e){}
 try{ processUntilUserTurn(); }catch(e2){ try{ renderDraftLive(); }catch(e3){ try{ zpbFallbackBoard(e2); }catch(e4){} } }
}
// w23: minimal error reporter — details in the console, never a silent empty section (audit GPT-T8)
function zpbErr(scope, err){ try{ console.warn('[zpb:' + scope + ']', err && err.message || err); }catch(e){} }
function zpbFallbackBoard(err){
 try{ console.warn('draft board fallback:', err && err.message || err); }catch(e){}
 try{
  const S = draftSim; if(!S) return;
  const roster = S.rosters[S.userIndex];
  const rows = S.pool.slice(0,60).map(p=>{
   const slot = findAssignableSlot(roster, p[1]);
   const btn = slot ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${p[0].replace(/"/g,'&quot;')}" data-slot="${slot}">Draft</button>` : '';
   return `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(p[2]):''}"><td class="dc-name">${p[0]}</td><td data-label="Pos">${POS_DISPLAY[p[1]]||p[1]}</td><td data-label="Team">${TEAM_ABBR[p[2]]||p[2]}</td><td class="score dc-ovr" data-label="OVR">${p[3]}</td><td class="score dc-wins" data-label="Wins">${fmtWar(playerWar(p).war)}</td><td class="narr" colspan="3">${slot?('Fills '+(LABELS[slot]||slot)):''}</td><td class="dc-btn">${btn}</td></tr>`;
  }).join('');
  document.getElementById('draftBody2').innerHTML = rows || '<tr><td colspan="10" class="narr">No players match.</td></tr>';
 }catch(e){ zpbErr('fallbackBoard', e); }
}
function userIsStuck(){
 const roster = draftSim.rosters[draftSim.userIndex];
 if(firstOpenSlotAny(roster)===null) return false;
 return !draftSim.pool.some(p=>slotForUser(roster,p));
}

// W23 (audit GPT-T3): a failed pick never advances the board. The loop stops, reports the team,
// round and reason, and one controlled retry runs only because executePick is transactional
// (a rejected pick leaves the state exactly as it was, so a retry cannot double-pick).
function zpbDraftFault(sub, teamIndex, err){
 const S = draftSim; if(!S) return;
 S._fault = {sub, teamIndex, pos:S.pos, msg:String(err && err.message || err)};
 try{ console.error('Z-post-blue draft paused [' + sub + '] ' + (S.teamNames ? S.teamNames[teamIndex] : ('team ' + teamIndex)) + ' at pick ' + (S.pos+1) + ': ' + S._fault.msg); }catch(e){}
 try{
  const feed = document.getElementById('draftRecentPicks');
  if(feed && !String(feed.innerHTML).includes('draft engine paused'))
   feed.innerHTML = '<div class="narr">The draft engine paused at pick ' + (S.pos+1) + ' (' + S._fault.msg + ') — resuming…</div>' + feed.innerHTML;
 }catch(e){}
 if(!S._faultRetry){ S._faultRetry = setTimeout(()=>{ S._faultRetry = null; try{ processUntilUserTurn(); }catch(e){} }, 1200); }
}
// One CPU pick, fully guarded. Returns true when the board advanced (or legitimately skipped), false when the loop must stop.
function executeCpuPickSafely(teamIndex){
 const S = draftSim;
 let pk = null;
 try{ pk = cpuPick(teamIndex); }
 catch(err){ zpbDraftFault('cpuPick', teamIndex, err); return false; }
 if(pk && pk.slot){
  try{ executePick(teamIndex, pk.player, pk.slot); S._fault = null; return true; }
  catch(err){
   // the suggested pick was rejected (transactional): take the best legal fill instead, else stop cleanly
   try{
    const roster = S.rosters[teamIndex];
    const alt = S.pool.find(p=>(eligibleOpen(roster, p)||[]).length);
    if(alt){ const s = eligibleOpen(roster, alt)[0]; executePick(teamIndex, alt, s); S._fault = null; return true; }
   }catch(e2){}
   zpbDraftFault('executePick', teamIndex, err); return false;
  }
 }
 const roster = S.rosters[teamIndex];
 if(!S.pool.length || firstOpenSlotAny(roster)===null){ S.pos++; return true; } // nothing left to fill: a legitimate skip
 zpbDraftFault('cpuPick', teamIndex, new Error('no pick chosen with open slots remaining')); return false;
}
function processUntilUserTurn(){
 if(draftSpeed==='slow'){ stepSlow(); return; }
 if(!draftSim || !draftSim.order || !draftSim.order.length) return;
 let guard = 0; const maxIter = draftSim.order.length + 8; // hard stop against any hypothetical loop
 while(draftSim.pos < draftSim.order.length && guard < maxIter){
  guard++;
  const t = draftSim.order[draftSim.pos];
  if(t === draftSim.userIndex){
   const roster = draftSim.rosters[t];
   if(firstOpenSlotAny(roster)===null){ draftSim.pos++; continue; }
   if(userIsStuck()){ finishDraft2(); return; }
   draftSim.awaitingUser = true;
   try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} }
   return;
  }
  if(!executeCpuPickSafely(t)) return;
 }
 if(draftSim.pos >= draftSim.order.length){ draftSim.awaitingUser = false; finishDraft2(); }
}

function stepSlow(){
 try{
  if(draftSim.pos >= draftSim.order.length){ draftSim.awaitingUser=false; finishDraft2(); return; }
  const t = draftSim.order[draftSim.pos];
  if(t === draftSim.userIndex){
   const roster = draftSim.rosters[t];
   if(firstOpenSlotAny(roster)===null){ draftSim.pos++; slowTimer = setTimeout(stepSlow, 750); return; }
   if(userIsStuck()){ finishDraft2(); return; }
   draftSim.awaitingUser = true;
   renderDraftLive();
   return;
  }
  draftSim.awaitingUser = false;
  if(!executeCpuPickSafely(t)){ slowTimer = setTimeout(stepSlow, 2000); return; } // w23: fault — report, wait, retry; never skip a team
 }catch(err){
  zpbDraftFault('stepSlow', draftSim && draftSim.order ? draftSim.order[draftSim.pos] : -1, err);
 }
 try{ renderDraftLive(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 slowTimer = setTimeout(stepSlow, 750);
}

function simToEnd(){
 if(slowTimer){ clearTimeout(slowTimer); slowTimer=null; }
 let guard = 0; const maxIter = draftSim.order.length + 8;
 while(draftSim.pos < draftSim.order.length && guard < maxIter){
  guard++;
  const t = draftSim.order[draftSim.pos];
  if(!executeCpuPickSafely(t)) return; // w23: stop and report; never skip a team to recover
 }
 draftSim.awaitingUser = false;
 finishDraft2();
}

function teamLabel(i){
 const name = draftSim.teamNames[i];
 return i===draftSim.userIndex ? `You (${name})` : name;
}

function renderDraftLive(){
 { const ub = document.getElementById('undoPickBtn'); if(ub) ub.style.display = (draftSim.undoStack && draftSim.undoStack.length && draftSim.awaitingUser) ? '' : 'none'; }
 const round = Math.floor(draftSim.pos/32)+1;
 const pickInRound = (draftSim.pos%32)+1;
 document.getElementById('draftStatusText').textContent = '';  // on-the-clock text retired (Owner)
 { const npEl=document.getElementById('zpbNextPick'); if(npEl){ const nx=draftSim.order.indexOf(draftSim.userIndex,draftSim.pos); npEl.textContent = nx>=0 ? (Math.floor(nx/32)+1)+'.'+((nx%32)+1) : ''; } }
 const all = draftSim.log.slice().reverse();
 document.getElementById('draftRecentPicks').innerHTML = all.length
  ? all.map(p=>{ const _zs=(typeof zpbRowVars==='function')?zpbRowVars(draftSim.teamNames[p.teamIndex]):''; const _zc=(p.isUser?'color:var(--accent);font-weight:700;':''); return `<div class="zpb-trow" style="${_zs}${_zc}">R${p.round}.${String(p.pickInRound).padStart(2,'0')} · ${typeof zpbTeamLogo==='function'&&draftSim.teamNames[p.teamIndex]?zpbTeamLogo(draftSim.teamNames[p.teamIndex]):''}${teamLabel(p.teamIndex)} — ${p.player[0]} (${POS_DISPLAY[p.player[1]]||p.player[1]}, ${p.player[3]} OVR)</div>`; }).join('')
  : '';
 try{ renderDraftBoard2(); }catch(err){ try{ zpbFallbackBoard(err); }catch(e2){} }
 try{ renderDraftRoster2(); }catch(err){ zpbErr('renderRoster2', err); } // w23: logged, and the board still stands
}

// ---- Draft board: position cards/table, priorities, wins value, pick-priority chart ----
const WV_GROUPS = ['QB','EDGE','OT','CB','WR','DT','OG','C','LB','SS','FS','TE','RB','K'];
const WV_NAMES = {QB:'Quarterback',EDGE:'Edge rusher',OT:'Offensive tackle',CB:'Cornerback',WR:'Wide receiver',DT:'Defensive tackle',OG:'Guard',C:'Center',LB:'Linebacker',SS:'Strong safety',FS:'Free safety',TE:'Tight end',RB:'Running back',K:'Kicker'};
const PRIO_MULT = {2:1.5, 1:1, 0:0.5};
function newDraftUI(){ return {groups:new Set(WV_GROUPS), prio:{}, rosterView:'depth', sim:null, slotPick:{}, teamFilter:null, showAll:false}; }
let draftUI = newDraftUI();
function posRank(p){ const i = WV_GROUPS.indexOf(WV_TAG_GROUP[p[1]]); return i<0?99:i; }
function cmpPlayers(a,b){ return (b[3]-a[3]) || (posRank(a)-posRank(b)) || (a[0]<b[0]?-1:1); }
function prioOf(g){ return 1; } // Z-post-blue: the star system is gone - priority always uses the default weight
const SLOT_TOTALS = (()=>{ const t = {}; ROSTER_SLOTS.forEach(s=>{ const g = WV_SLOT_GROUP[s]; t[g] = (t[g]||0)+1; }); return t; })();

// The ways a player could fill your open starting spots: one entry per position group, at the open slot where he is worth the most.
// v = wins at that slot over a 70-rated player there, AFTER the flex penalty (so a flexed player is worth less than the same rating at home).
function userFits(roster, p){
 const c = POS_SLOT_MAP[p[1]]; if(!c) return [];
 let open = eligibleOpen(roster, p).filter(s=>!roster.slots[s]);
 if(!open.length) return [];
 // w19 (Owner): while a slot at his natural position is open, the board only sells him there;
 // a flex fill appears only after every natural spot at his position is already full.
 const nat = open.filter(s=>isNaturalSlot(p[1], s));
 if(nat.length) open = nat;
 const byG = {};
 for(const s of open){
  const g = WV_SLOT_GROUP[s], v = slotWins(s, effOvr(p,s)) - slotWins(s, WINS_BASE);
  if(!byG[g] || v>byG[g].v+1e-9) byG[g] = {slot:s, g, v, flex:isOutOfPosition(p[1],s), pen:flexPenaltyFor(p[1],s)};
 }
 return Object.values(byG);
}
const vKey = (g,v)=> g+'|'+Math.round(v*1e4);

// What is likely to be left at your next pick? Replay the CPU logic forward several times and, per position group, record the best value still
// on the board and how many players of each exact value remain. Equal players are counted by value, not identity, so equal players always get equal priority.
function simRecs(){
 const S = draftSim;
 const sig = S.pool.length+'|'+S.log.length+'|'+Object.keys(S.rosters[S.userIndex].slots).length; // w23 (audit GPT-T6): invalidate on any state change, not just the pick index
 if(draftUI.sim && draftUI.sim.pos===S.pos && draftUI.sim.sig===sig) return draftUI.sim;
 const me = S.userIndex, roster = S.rosters[me];
 const fm = new Map(); S.pool.forEach(p=> fm.set(p[0], userFits(roster, p)));
 const c0 = {}; fm.forEach(fs=> fs.forEach(e=>{ const k = vKey(e.g,e.v); c0[k] = (c0[k]||0)+1; }));
 let nextIdx = -1, open = 0; ROSTER_SLOTS.forEach(s=>{ if(!roster.slots[s]) open++; });
 if(open>=2){ for(let i=S.pos+1;i<S.order.length;i++){ if(S.order[i]===me){ nextIdx = i; break; } } }
 const trials = [], N = 12;
 if(nextIdx>0){
  for(let t=0;t<N;t++){
   const sim = {pool:S.pool.slice(), rosters:S.rosters.map(r=>({slots:Object.assign({},r.slots)})), repl:null, pos:S.pos};
   for(let i=S.pos+1;i<nextIdx;i++){
    const ti = S.order[i]; sim.pos = i; const pk = cpuPick(ti, sim); // w23 (audit GPT-T4): every hypothetical pick sits at its real board position, so round-order floors apply
    if(pk && pk.slot){ const ix = sim.pool.indexOf(pk.player); if(ix>-1) sim.pool.splice(ix,1); sim.rosters[ti].slots[pk.slot] = pk.player; }
   }
   const best = {}, cnt = {};
   for(const p of sim.pool){ const fs = fm.get(p[0]); if(!fs) continue; for(const e of fs){ if(best[e.g]==null || e.v>best[e.g]) best[e.g] = e.v; const k = vKey(e.g,e.v); cnt[k] = (cnt[k]||0)+1; } }
   trials.push({best, cnt});
  }
 }
 const later = {};
 WV_GROUPS.forEach(g=>{ later[g] = trials.length ? trials.reduce((a,t)=>a+Math.max(0, t.best[g]==null?0:t.best[g]),0)/trials.length : 0; });
 return (draftUI.sim = {pos:S.pos, sig, trials, c0, fm, later, gap: nextIdx>0 ? nextIdx-S.pos-1 : 0});
}
function goneFrac(sim, e){
 if(!sim.trials.length) return null;
 const k = vKey(e.g,e.v), c0 = sim.c0[k]||1;
 return Math.max(0, 1 - sim.trials.reduce((a,t)=>a+Math.min(1,(t.cnt[k]||0)/c0),0)/sim.trials.length);
}

function boardEntries(){
 const S = draftSim, roster = S.rosters[S.userIndex];
 let sim = null; // w23: a failed forecast degrades to Wins-only — the board itself must never die
 try{ sim = simRecs(); }catch(err){ zpbErr('simRecs', err); }
 const out = [];
 S.pool.forEach(p=>{
  const w = playerWar(p).war, fits = sim ? sim.fm.get(p[0]) : userFits(roster, p);
  (fits||[]).forEach(e=> out.push(mkEntry(p, w, e, sim)));
 });
 return {sim, entries: out};
}
function mkEntry(p, w, e, sim){
 const later = sim ? (sim.later[e.g]||0) : null;
 const pri = sim ? e.v - later : e.v, m = PRIO_MULT[prioOf(e.g)];
 return {p, w, slot:e.slot, g:e.g, flex:e.flex, pen:e.pen, v:e.v, later, pri, gone: sim ? goneFrac(sim, e) : null, score: pri>0 ? pri*m : pri/m};
}
function retarget(r, slot, sim){ // user picked a different open slot for this player in the dropdown
 const p = r.p, v = slotWins(slot, effOvr(p,slot)) - slotWins(slot, WINS_BASE);
 return mkEntry(p, r.w, {slot, g:WV_SLOT_GROUP[slot], v, flex:isOutOfPosition(p[1],slot), pen:flexPenaltyFor(p[1],slot)}, sim);
}
function wavg(x){ return x==null ? '—' : fmtWar(x); }
function pctTxt(x){ return x==null ? '—' : Math.round(x*100)+'%'; }
// If NO remaining player can legally fill any spot you still need (e.g. the last open spot is TE2 and every tight end and legal flex is gone),
// you may take anyone left for that spot at the emergency penalty, exactly like the computer teams do.
function userEmergency(roster){
 const S = draftSim, key = S.pos+'|'+Object.keys(roster.slots).length;
 if(S._emKey===key) return S._em;
 const open = ROSTER_SLOTS.filter(s=>!roster.slots[s]);
 S._emKey = key; S._em = open.length>0 && !S.pool.some(p=>(POS_SLOT_MAP[p[1]]||[]).some(s=>!roster.slots[s]));
 return S._em;
}
function eligibleOpen(roster, p){
 const o = (POS_SLOT_MAP[p[1]]||[]).filter(s=>!roster.slots[s]);
 return (!o.length && p[1]!=='QB' && userEmergency(roster)) ? ROSTER_SLOTS.filter(s=>!roster.slots[s]) : o;
}
function openSlotsFor(roster, p){ return eligibleOpen(roster, p); }

function fitNoteHTML(list, g){
 return '';   // removed from the user experience: the flex-vs-natural comparison read like a footnote to nobody
}

function renderDraftBoard2(){
 const S = draftSim, roster = S.rosters[S.userIndex];
 const search = document.getElementById('draftSearch2').value.toLowerCase();
 const posF0 = document.getElementById('draftPosFilter2').value; const needsOnly = posF0==='all'; // all positions: only spots you still need; a chosen position shows everyone at it
 const sortBy = document.getElementById('draftSort2').value, view = document.getElementById('draftView2').value;
 const posF = document.getElementById('draftPosFilter2').value;
 const {sim, entries} = boardEntries();
 if(draftUI.teamFilter && !entries.some(r => r.p[2] === draftUI.teamFilter)){
  const dropped = draftUI.teamFilter; draftUI.teamFilter = null;
  try{ FX.toast('No ' + dropped + ' players fit your open spots \u2014 team filter cleared'); }catch(e){}
 }
 const canPick = S.awaitingUser;
 const sortKey = (!sim && ['priority','value','gone'].includes(sortBy)) ? 'wins' : sortBy;
 const textKey = ['name','pos','team'].includes(sortKey);
 const keyOf = r=> sortKey==='priority' ? r.score : sortKey==='wins' ? r.w : sortKey==='value' ? (r.v==null?-99:r.v) : sortKey==='gone' ? (r.gone==null?-1:r.gone)
   : sortKey==='name' ? r.p[0] : sortKey==='pos' ? zpbSlotOrderOf(r.p[1]) : sortKey==='team' ? r.p[2] : r.p[3];
 const dir = draftUI.sortAsc ? -1 : 1;
 const cmp = textKey ? (a,b)=> (keyOf(a)<keyOf(b)?-1:keyOf(a)>keyOf(b)?1:0)*(draftUI.sortAsc===false?-1:1) || cmpPlayers(a.p,b.p)
   : (a,b)=>{ const d = (Math.round(keyOf(b)*100)-Math.round(keyOf(a)*100))*(draftUI.sortAsc?-1:1); if(d!==0) return d;
      if(!!a.flex!==!!b.flex) return a.flex?1:-1;       // ties (shown values equal): a natural fit beats a player who would have to flex
      return (b.p[3]-a.p[3]) || cmpPlayers(a.p,b.p); };
 const filled = {}; ROSTER_SLOTS.forEach(s=>{ if(roster.slots[s]){ const g = WV_SLOT_GROUP[s]; filled[g] = (filled[g]||0)+1; } });
 const openG = WV_GROUPS.filter(g=>(SLOT_TOTALS[g]||0) - (filled[g]||0) > 0);
 const sel = draftUI.groups;
 // ---- pick-priority chart: the best option (by priority) in each position you still need ----
 const bestBy = {}; entries.forEach(r=>{ if(!bestBy[r.g] || r.score>bestBy[r.g].score) bestBy[r.g] = r; });
 const pri = openG.filter(g=>bestBy[g]).map(g=>bestBy[g]).sort((a,b)=>b.score-a.score).slice(0,7);
 const maxW = Math.max(0.5, ...pri.map(r=>Math.max(r.v,0)));
 let ph = '';
 if(!sim){ ph = ''; }
 else {
  ph = ``;
  pri.forEach(r=>{
   const w = Math.max(r.v,0), gp = Math.max(0, Math.min(w, r.pri)), grey = w-gp;
   ph += `<div class="pr-row"><div><b>${WV_NAMES[r.g]}</b></div><div><div class="pr-bar" title="${r.p[0]}"><i style="width:${gp/maxW*100}%;background:var(--accent);"></i><i style="width:${grey/maxW*100}%;background:var(--sub);opacity:.55;"></i></div><div class="narr" style="margin-top:2px;">${r.p[0]} (${r.p[3]}) · ${fmtWar(r.v)} wins · ${pctTxt(r.gone)} gone<span class="zpb-nxpick"> by your next pick</span></div></div></div>`;
  });
 }
 // pick-priority panel retired (Owner, wave 11)
 // ---- chips: filled/total starters, star = how much you care ----
 let ch = `<div class="chipbar">`;
 WV_GROUPS.forEach(g=>{
  const f = filled[g]||0, t = SLOT_TOTALS[g]||0, on = sel.has(g);
  ch += `<span class="chip zpb-pip${on?' on':''}" data-tog="${g}" title="Show or hide ${WV_NAMES[g].toLowerCase()}s — ${f} of ${t} filled"><i></i>${g} <b>${f}/${t}</b></span>`;
 });
 ch += `<span class="zpb-allnone"><span class="chip" data-all="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">ALL</span></span><span class="chip" data-none="1" style="font-size:.62rem;letter-spacing:.08em;padding:3px 8px 3px 6px;gap:0;"><span style="text-align:left;">NONE</span></span></span></div>
  `;
 document.getElementById('draftChips').innerHTML = ch;
 // ---- filter into rows ----
 const matchesSearch = p=> !search || p[0].toLowerCase().includes(search);
 const cards = document.getElementById('draftCards'), wrap = document.getElementById('draftTableWrap');
 const bestNat = {}; entries.forEach(r=>{ if(!r.flex && r.v!=null && (bestNat[r.g]==null || r.v>bestNat[r.g])) bestNat[r.g] = r.v; });
 const flexTxt = r=> r.flex ? ` <span class="narr">Flex ${LABELS[r.slot]||r.slot} (-${r.pen})</span>` : '';
 const btn = r=> (canPick && r.slot) ? `<button class="resetbtn" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${r.p[0].replace(/"/g,'&quot;')}" data-slot="${r.slot}">Draft</button>` : '';
 const top3 = new Set(pri.slice(0,3).map(r=>r.p[0]));
 const topTag = r=> top3.has(r.p[0]) ? '<span class="toptag" title="One of your top three priorities right now">TOP</span> ' : '';
 if(view==='cards'){
  wrap.style.display = 'none'; cards.style.display = '';
  const DG_ORDER = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','SS','FS','K']; // the depth chart reads top to bottom (w19, Owner)
  const gs = openG.filter(g=>sel.has(g)).sort((a,b)=>{ const x = DG_ORDER.indexOf(a), y = DG_ORDER.indexOf(b); return (x<0?99:x)-(y<0?99:y) || WV_GROUPS.indexOf(a)-WV_GROUPS.indexOf(b); });
  let h = '<div class="cardgrid">';
  gs.forEach(g=>{
   let list = entries.filter(r=>r.g===g && matchesSearch(r.p) && (posF==='all' || WV_TAG_GROUP[r.p[1]]===posF) && (!draftUI.teamFilter || r.p[2]===draftUI.teamFilter));
   list = list.map(r=> draftUI.slotPick[r.p[0]] && WV_SLOT_GROUP[draftUI.slotPick[r.p[0]]]===g && !roster.slots[draftUI.slotPick[r.p[0]]] ? retarget(r, draftUI.slotPick[r.p[0]], sim) : r).sort(cmp);
   { let nf = 0; list = list.filter(r=> !r.flex || (++nf<=25)); }  // natural players all show; only the 25 best flexed options per card
   const mx = Math.max(0.3, ...list.map(r=>Math.max(r.v||0, 0)));
   h += `<div class="pcard"><h4><span>${WV_NAMES[g]}</span><span class="narr">${filled[g]||0}/${SLOT_TOTALS[g]}</span></h4>${fitNoteHTML(entries.filter(r=>r.g===g), g)}<div class="plist">`;
   if(!list.length) h += '<div class="narr">No players match.</div>';
   list.forEach(r=>{
    const w = Math.max(r.v,0), gp = sim ? Math.max(0,Math.min(w,r.pri)) : 0;
    const _cc = (r.p[3]>=85 && typeof zpbTeamChips==='function') ? zpbTeamChips(r.p[2])+' ' : '';
    h += `<div class="prow zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><div>${topTag(r)}<b class="${r.p[3]>=90?'zpb-shm':(r.p[3]>=85?'zpb-vib':'')}">${r.p[0]}</b> <span class="narr">${r.p[3]} OVR ${_cc}· ${typeof zpbTeamCell==='function'?zpbTeamCell(r.p[2]):(TEAM_ABBR[r.p[2]]||r.p[2])}${r.gone!=null?' · '+pctTxt(r.gone)+' gone':''}</span><div class="mbar"><i style="width:${gp/mx*100}%;background:var(--accent);"></i><i style="width:${(w-gp)/mx*100}%;background:var(--sub);opacity:.55;"></i></div></div><div class="zpb-pickcol"><div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div>${btn(r)}</div></div>`;
   });
   h += '</div></div>';
  });
  h += '</div>';
  cards.innerHTML = gs.length ? h : '<div class="narr">Turn on one or more position chips above (cards only show positions you still need).</div>';
 } else {
  cards.style.display = 'none'; wrap.style.display = '';
  // one row per player: his best fit among the selected groups
  const byP = new Map(), flexAlt = {};
  entries.forEach(r=>{
   if(!matchesSearch(r.p)) return;
   if(draftUI.teamFilter && r.p[2]!==draftUI.teamFilter) return;
   if(posF!=='all' ? WV_TAG_GROUP[r.p[1]]!==posF : !sel.has(r.g)) return;
   const cur = byP.get(r.p[0]);
   // show the player where he is worth the most to you right now (flexes included); on a tie the natural spot wins
   const rk = x=> Math.round(((x.pri!=null?x.pri:x.v))*100);
   if(!cur || rk(r)>rk(cur) || (rk(r)===rk(cur) && cur.flex && !r.flex) || (rk(r)===rk(cur) && cur.flex===r.flex && r.v>cur.v+1e-9)) byP.set(r.p[0], r);
   (flexAlt[r.p[0]] = flexAlt[r.p[0]] || []).push(r);
  });
  let list = [...byP.values()].map(r=>{ const sp = draftUI.slotPick[r.p[0]]; return sp && !roster.slots[sp] && openSlotsFor(roster, r.p).includes(sp) ? retarget(r, sp, sim) : r; });
  if(!needsOnly || list.length===0){
   S.pool.forEach(p=>{
    if(byP.has(p[0]) || !matchesSearch(p)) return;
    if(draftUI.teamFilter && p[2]!==draftUI.teamFilter) return;
    const tg = WV_TAG_GROUP[p[1]];
    if(posF!=='all' ? tg!==posF : !sel.has(tg)) return;
    list.push({p, w:playerWar(p).war, slot:null, g:tg, flex:false, pen:0, v:null, later:null, pri:null, gone:null, score:-99});
   });
  }
  list.sort(cmp);
  // phones choke on a 1,200-row table: paint the top of the current sort, load the rest on demand
  const CAP = 150, totalRows = list.length, held = (totalRows > CAP && !draftUI.showAll) ? totalRows - CAP : 0;
  if(held) list = list.slice(0, CAP);
  let h = '';
  list.forEach(r=>{
   const opts = canPick && r.slot ? openSlotsFor(roster, r.p) : [];
   const fills = r.slot ? (opts.length>1 ? `<a href="#" class="slotchg zpb-fillab" data-chg="${r.p[0].replace(/"/g,'&quot;')}" title="Choose which open spot he fills — click to change it">${LABELS[r.slot]||r.slot}</a>${flexTxt(r)}` : `${LABELS[r.slot]||r.slot}${flexTxt(r)}`) : 'Full';
   const _tc = (typeof zpbTeamCell==='function') ? zpbTeamCell(r.p[2]) : (TEAM_ABBR[r.p[2]]||r.p[2]);
   const _oc = (r.p[3]>=85 && typeof zpbTeamChips==='function') ? '<span class="zpb-ovrchips">'+zpbTeamChips(r.p[2])+'</span>' : '';
   h += `<tr class="zpb-trow" style="${typeof zpbRowVars==='function'?zpbRowVars(r.p[2]):''}"><td class="dc-name">${topTag(r)}${r.p[0]}</td><td data-label="Pos">${POS_DISPLAY[r.p[1]]||r.p[1]}</td><td data-label="Team"><span class="zpb-teamcol zpb-tfilter" data-ztf="${r.p[2]}" title="Show only ${r.p[2]} players — click again to clear">${_tc}</span></td><td class="score dc-ovr" data-label="OVR"><span class="zpb-ovrstack">${r.p[3]}${_oc}</span></td><td class="score dc-wins" data-label="Wins">${wavg(r.w)}</td><td class="score dc-pri" data-label="Priority">${r.pri!=null&&sim?fmtWar(r.pri):'—'}</td><td class="score dc-gone" data-label="Gone">${pctTxt(r.gone)}</td><td class="narr dc-fills" data-label="Fills">${fills}</td><td class="dc-btn">${btn(r)}</td></tr>`;
  });
  if(held) h += `<tr><td colspan="10" style="text-align:center;padding:10px 4px;"><button class="tabbtn" style="width:auto;padding:6px 18px;" data-showall="1">SHOW ALL ${totalRows} PLAYERS</button><span class="narr" style="margin-left:8px;">${CAP} shown for speed \u00b7 search or filter to narrow</span></td></tr>`;
  document.getElementById('draftBody2').innerHTML = h || `<tr><td colspan="10" class="narr">No players match.</td></tr>`;
  document.getElementById('draftFitSummary').innerHTML = '';
 }
 if(view==='cards') document.getElementById('draftFitSummary').innerHTML = '';
}

function renderDraftRoster2(){
 const roster = draftSim.rosters[draftSim.userIndex];
 let tot = 0, n = 0;
 ROSTER_SLOTS.forEach(sl=>{ const p = roster.slots[sl]; if(p){ tot += winsAt(p, sl); n++; } });
 document.getElementById('draftRosterTotal').innerHTML = n ? `${n} of ${ROSTER_SLOTS.length} starters \u00b7 <b>${fmtWar(tot)} wins</b> above a replacement-level lineup` : '';
 document.getElementById('rosterPickBtn').classList.toggle('zpb-view-on', draftUI.rosterView==='pick');
 document.getElementById('rosterDepthBtn').classList.toggle('zpb-view-on', draftUI.rosterView==='depth');
 const row = (sl, p, rnd, extra)=>{
  const oop = p && isOutOfPosition(p[1], sl);
  const war = p ? `<span class="narr" style="margin-left:6px;" title="Wins above a replacement-level player at this slot">${fmtWar(winsAt(p, sl))}</span>` : '';
  return `<div class="depth-row dgrid zpb-trow" style="${p&&typeof zpbUserRowVars==='function'?zpbUserRowVars():''}"><span class="slotname${p?' zpb-shm':''}">${extra||''}${LABELS[sl]||sl}</span><span class="${p?'playername':'empty'} ${p&&p[3]>=90?'zpb-shm':(p&&p[3]>=85?'zpb-vib':'')}">${p?p[0]:''}</span><span class="dovr">${p?p[3]:''}</span><span class="narr dwar">${p?fmtWar(winsAt(p, sl)):''}</span></div>`; // w19 (Owner): a filled position shimmers; 90+ names shimmer, 85+ burn brighter
 };
 if(draftUI.rosterView==='pick'){
  const mine = draftSim.log.filter(l=>l.isUser);
  document.getElementById('draftRosterList').innerHTML = mine.length ? mine.map(l=>row(l.slot, l.player, l.round, `<span class="narr" style="margin-right:6px;">R${l.round}.${String(l.pickInRound).padStart(2,'0')}</span>`)).join('') : '<div class="narr">Your picks will list here in the order you make them.</div>';
  return;
 }
 document.getElementById('draftRosterList').innerHTML = DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>`<div class="depth-group ${gcls}"><h4>${gname}</h4>${slots.map(sl=>row(sl, roster.slots[sl], roster.pickRounds&&roster.pickRounds[sl])).join('')}${gcls==='def'?zpbDimeDrafRow(roster):''}</div>`).join('');
}

// take back your last pick: the board returns to the moment you were on the clock (the CPU picks in between are replayed fresh)
function undoUserPick(){
 const u = draftSim && draftSim.undoStack && draftSim.undoStack.pop(); if(!u) return;
 if(slowTimer){ clearTimeout(slowTimer); slowTimer = null; }
 draftSim.pos = u.pos; draftSim.pool = u.pool.slice();
 draftSim.rosters.forEach((r,i)=>{ r.slots = {...u.slots[i]}; r.pickRounds = {...u.rounds[i]}; });
 draftSim.log.length = u.logLen; draftSim.repl = null; draftSim.awaitingUser = true;
 draftUI.sim = null; // w23 (audit GPT-T6): recommendations recompute against the restored state
 if(draftSpeed==='slow') draftSim.awaitingUser = true;
 renderDraftLive(); if(typeof renderDraftBoard2==='function') renderDraftBoard2();
}
function makeUserPick2(name, slotWanted){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.order) return;
 // w23 (audit GPT-T1): a selection is only accepted when the board is actually waiting on the user
 if(!draftSim.awaitingUser || draftSim.order[draftSim.pos] !== draftSim.userIndex){
  try{ if(typeof FX!=='undefined' && FX.toast && !draftSim._turnToast){ draftSim._turnToast = true; FX.toast('The CPU is picking — your board lights up when it is your turn'); setTimeout(()=>{ if(draftSim) draftSim._turnToast = false; }, 1500); } }catch(e){}
  return;
 }
 const roster = draftSim.rosters[draftSim.userIndex];
 const p = draftSim.pool.find(x=>x[0]===name);
 if(!p) return;
 let slot = slotWanted && !roster.slots[slotWanted] && eligibleOpen(roster, p).includes(slotWanted) ? slotWanted : null;
 if(!slot){ const f = userFits(roster,p).sort((a,b)=>b.v-a.v)[0]; slot = f ? f.slot : slotForUser(roster,p); }
 if(!slot) return;
 draftSim.undoStack = draftSim.undoStack || [];
 draftSim.undoStack.push({pos:draftSim.pos, pool:draftSim.pool.slice(), slots:draftSim.rosters.map(r=>({...r.slots})), rounds:draftSim.rosters.map(r=>({...(r.pickRounds||{})})), logLen:draftSim.log.length});
 try{ executePick(draftSim.userIndex, p, slot); }
 catch(err){ // transactional rejection: state untouched — drop the undo snapshot, tell the user, redraw
  draftSim.undoStack.pop();
  try{ if(typeof FX!=='undefined' && FX.toast) FX.toast('That pick is no longer legal — the board was refreshed'); }catch(e){}
  zpbErr('userPick', err);
  try{ renderDraftLive(); }catch(e2){ try{ zpbFallbackBoard(err); }catch(e3){} }
  return;
 }
 draftSim.awaitingUser = false;
 try{ renderDraftLive(); }catch(e){ try{ zpbFallbackBoard(e); }catch(e2){} } // w23: the depth chart and board always refresh, even if the CPU resume hiccups
 try{ processUntilUserTurn(); }catch(err){ zpbDraftFault('resume', draftSim.userIndex, err); }
}

function scoreRoster(roster){
 let sum=0, wsum=0;
 for(const s in weights){
  const w = weights[s]||0; const p = roster.slots[s];
  sum += effOvr(p, s)*w; wsum += w;
 }
 const base = wsum>0 ? sum/wsum : 0;
 const avg = slots=>{ let s=0,c=0; slots.forEach(k=>{const p=roster.slots[k]; if(p){s+=effOvr(p,k);c++;}}); return c? s/c : 70; };
 const runWeak = sigmoid(avg(RUN_SLOTS), synergy.runThreshold, synergy.runSlope);
 const passWeak = sigmoid(avg(DL_SLOTS), synergy.passThreshold, synergy.passSlope) * sigmoid(avg(COVERAGE_SLOTS), synergy.passThreshold, synergy.passSlope);
 const pgWeak = sigmoid(avg(PASSGAME_SLOTS), synergy.passGameThreshold, synergy.passGameSlope);
 const pen = (synergy.runEnabled?runWeak*synergy.runMaxPenalty:0) + (synergy.passEnabled?passWeak*synergy.passMaxPenalty:0) + (synergy.passGameEnabled?pgWeak*synergy.passGameMaxPenalty:0);
 return Math.max(0, base-pen);
}

// ---- Procedural "draft recap" writeup (rule-based, not a live model call — published pages can't reach the API) ----
// ---- Shared phrase-bank helpers for varied, natural-sounding generated prose ----
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function ordinalNum(n){ const s=['th','st','nd','rd'], v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]); }
function unitPhrase(m){
 const special = {QB:'quarterback play', RB:'the running back room', WR:'the receiver group', TE:'the tight end room'};
 if(special[m.key]) return special[m.key];
 return 'the ' + m.label.replace(/\s*\([^)]*\)/g,'').toLowerCase();
}
function categoryRating(pool, key){
 const def = GROUP_DEFS.find(g=>g.key===key);
 return groupAvgFromPool(pool, def).avg;
}
function clampNum(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }
function randNormal(){ let u=0,v=0; while(u===0) u=Math.random(); while(v===0) v=Math.random(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); }
function gaussNoise(sd){ return randNormal()*sd; }
function poisson(lambda){ if(lambda<=0) return 0; const L=Math.exp(-lambda); let k=0,p=1; do{ k++; p*=Math.random(); }while(p>L); return k-1; }
function ovrFactor(ovr, scale){ return Math.exp(((ovr||70)-80)/(scale||10)); }
function weightedPick(items){
 const total = items.reduce((s,x)=>s+x.w,0);
 let r = Math.random()*total;
 for(const x of items){ r -= x.w; if(r<=0) return x.item; }
 return items[items.length-1].item;
}
function nick(team){ return team.split(' ').slice(-1)[0]; }
function fmtTOP(seconds){ const m = Math.floor(seconds/60), s = seconds%60; return `${m}:${String(s).padStart(2,'0')}`; }
function ordinalQ(q){ return ['first','second','third','fourth','overtime'][q-1]; }
function joinList(arr){ if(arr.length<=1) return arr.join(''); if(arr.length===2) return arr.join(' and '); return arr.slice(0,-1).join(', ')+', and '+arr[arr.length-1]; }
function numWord(n){ return ['zero','one','two','three','four','five','six','seven','eight'][n] || String(n); }

// ---- ratings built from the actual lineup (slot-based, honors the flex penalty) ----
// Each unit is graded separately so the math (and the recap) can say WHICH group mattered.
const RATING_SPECS = {
 olRun:    {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6, FB:0.30},   // FB: lead-blocker share (wave 11)
 olPass:   {OT1:1.4, OT2:1.4, OG1:1.0, OG2:1.0, C:1.0},
 rb:       {RB1:2.0, RB2:0.5},
 qb:       {QB:1},
 rec:      {WR1:1.5, WR2:1.0, WR3:0.7, TE1:0.9, RB1:0.2},
 passRush: {DE1:2.0, DE2:1.6, DT1:1.0, DT2:0.8, MIKE:0.3, WILL:0.3},
 frontRun: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:0.7, SS:0.4, CB1:0.7, CB2:0.55, CB3:0.2, FS:0.5},
 coverage: {CB1:1.4, CB2:1.15, CB3:0.9, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.3},
 kicker:   {K:1}
};
const UNIT_INFO = {
 olRun:    {label:'Run blocking', short:'run blocking'},
 olPass:   {label:'Pass protection', short:'pass protection'},
 rb:       {label:'Running backs', short:'running backs'},
 qb:       {label:'Quarterback', short:'quarterback play'},
 rec:      {label:'Receiving corps', short:'receiving corps'},
 passRush: {label:'Pass rush', short:'pass rush'},
 frontRun: {label:'Run defense', short:'run defense'},
 coverage: {label:'Pass coverage', short:'secondary'},
 kicker:   {label:'Kicker', short:'kicker'}
};
function slotOvr(slotmap, s){ const raw = slotmap[s]; if(!raw) return 70; return Array.isArray(raw) ? effOvr(raw, s) : raw.ovr; }
function effEntry(sm, s){
 const raw = sm[s]; if(!raw) return null;
 const e = normalizeSlotEntry(raw);
 if(Array.isArray(raw)){ e.rawOvr = raw[3]; e.ovr = effOvr(raw, s); e.flex = flexPenaltyFor(raw[1], s); }
 return e;
}
function wavgSlots(slotmap, spec){ let sum=0, w=0; for(const [s,wt] of Object.entries(spec)){ sum += slotOvr(slotmap,s)*wt; w += wt; } return sum/w; }
const RET_PICK = new WeakMap();      // slotmap -> chosen returner's name (a team's pick; otherwise the best returner score)
const RET_PTS = 2.36;                // points per game for a returner whose yardage is 100%
const PUNT_PTS = 1.6;                // punter: net hidden yards -> opponent expected points (wave 11) above league average: 59 return yards a game x 0.04 points per yard of field position
// ---- game-day aggressiveness: how a team treats 2-Pt Conversions and 4th downs. It changes HOW a team scores (more tries, more touchdowns instead of field goals), not how many points it is worth. ----
const AGGR_INFO = {
 cautious:  {label:'Cautious',  two:0.45, td:0.96, fg:1.08, desc:'Kicks the extra point almost every time and takes the field goal on most 4th downs inside the 35. Fewer 2-Pt Conversions, a few more field goals, fewer touchdowns.'},
 balanced:  {label:'Balanced',  two:1.00, td:1.00, fg:1.00, desc:'Balanced Approach: kicks the extra point most of the time, goes for 2 in situations where the numbers say to, and goes for it on 4th & short when in opponent territory.'},
 aggressive:{label:'Aggressive',two:1.90, td:1.05, fg:0.86, desc:'More 2-Pt Conversions, more touchdowns, fewer field goals, and a few more failed 4th downs. Almost always goes for 2 unless you need an XP to win, and almost always goes for it on 4th down unless behind your own 30 or holding a big 4th-quarter lead.'}
};
function aggrOf(sm){
 const S = (typeof seasonState!=='undefined') ? seasonState : null; if(!S || !S.teams) return 'balanced';
 S.aggr = S.aggr || {};
 const t = Object.keys(S.teams).find(k=>S.teams[k].slotmap===sm); if(!t) return 'balanced';
 if(!S.aggr[t]){ const u = Math.random(); S.aggr[t] = S.teams[t].isUser ? 'balanced' : (u<0.22?'cautious':u>0.78?'aggressive':'balanced'); }
 return S.aggr[t];
}
// ---- w21 (Owner): the defense gets the same three-way dial, next to the offense one.
// UI only for now - Claude wires the math. Aggressive = blitz heavy: more sacks and
// takeaways, but more big plays given up. Cautious is the opposite. defAggrOf(slotmap)
// is the engine hook (same shape as aggrOf). ----
const DEF_AGGR_INFO = {
 cautious:  {label:'Cautious',  desc:'Drops back and protects the deep ball: fewer sacks and takeaways, but far fewer big plays allowed.'},
 balanced:  {label:'Balanced',  desc:'Blitzes when the situation calls for it: a steady mix of pressure and coverage.'},
 aggressive:{label:'Aggressive',desc:'Blitz heavy: more sacks and takeaways, but more big plays given up.'}
};
function defAggrOf(sm){
 const S = (typeof seasonState!=='undefined') ? seasonState : null; if(!S || !S.teams) return 'balanced';
 S.defAggr = S.defAggr || {};
 const t = Object.keys(S.teams).find(k=>S.teams[k].slotmap===sm); if(!t) return 'balanced';
 if(!S.defAggr[t]){ const u = Math.random(); S.defAggr[t] = S.teams[t].isUser ? 'balanced' : (u<0.22?'cautious':u>0.78?'aggressive':'balanced'); }
 return S.defAggr[t];
}
function retScore(sm){
 const cands = returnerCandidates(sm); if(!cands.length) return 82;
 const name = RET_PICK.get(sm), c = cands.find(x=>x.p[0]===name) || cands.slice().sort((a,b)=>returnerRating(b.p)-returnerRating(a.p))[0];
 return returnerRating(c.p);
}
function teamRatings(slotmap){
 const r = {};
 r.ret = retScore(slotmap); r.p = slotOvr(slotmap,'P');   // punter: feeds the hidden-yards term (wave 11)
 for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, zpbAdjSpec(k, RATING_SPECS[k]));
 for(const p in PERS_REC) r['rec'+p] = wavgSlots(slotmap, PERS_REC[p]);
 r.rec11 = r.rec;
 for(const k in DEF_SPECS) r[k] = wavgSlots(slotmap, DEF_SPECS[k]);
 r.te1 = slotOvr(slotmap,'TE1'); r.te2 = slotOvr(slotmap,'TE2');
 r.rbHeavy = wavgSlots(slotmap, {RB1:2.0, RB2:1.2});
 r.passOff = 0.45*r.qb + 0.30*r.rec + 0.25*r.olPass;
 r.runOff  = 0.35*r.rb + 0.65*r.olRun;
 r.off = 0.6*r.passOff + 0.4*r.runOff;
 r.def = 0.55*(0.5*r.passRush + 0.5*r.coverage) + 0.45*r.frontRun;
 return r;
}
function leagueBaseline(slotmapList){
 const sums = {}; let keys = null;
 slotmapList.forEach(sm=>{
  const r = teamRatings(sm);
  if(!keys){ keys = Object.keys(r); keys.forEach(k=>sums[k]=0); }
  keys.forEach(k=> sums[k]+=r[k]);
 });
 const lg = {}; keys.forEach(k=> lg[k] = sums[k]/slotmapList.length);
 return lg;
}
function computeUnitRanks(ratingsByTeam){
 const ranks = {};
 Object.keys(ratingsByTeam).forEach(t=> ranks[t] = {});
 Object.keys(UNIT_INFO).concat(['passOff','runOff']).forEach(u=>{
  const order = Object.keys(ratingsByTeam).sort((a,b)=> ratingsByTeam[b][u]-ratingsByTeam[a][u]);
  order.forEach((t,i)=>{ ranks[t][u] = i+1; });
 });
 return ranks;
}

// ================= GAME PLANS: personnel, strategy, defensive package, focus =================
// OFFENSE: personnel (RB-TE-WR counts) crossed with a strategy (run-heavy / balanced / pass-heavy).
// DEFENSE: base (3 LBs) or nickel (5 DBs) crossed with a focus (run defense / balanced / pass defense).
// Neutral, NFL-style logic: pass plays are worth more per snap, run-heavy trades expected points for ball security,
// lower variance and a bigger payoff for a dominant interior line; heavy sets lean on tight ends who must exist on the roster.
const PERS = {
 '11': {label:'11 personnel', long:'one back, one tight end, three receivers', run:0.00, runB:0.000, passB:0.000, heavy:0.0, tbw:0.00, pc:0.0},
 '12': {label:'12 personnel', long:'one back, two tight ends, two receivers',  run:0.03, runB:0.030, passB:-0.015, heavy:0.5, tbw:0.08, pc:0.22},
 '13': {label:'13 personnel', long:'one back, three tight ends, one receiver', run:0.06, runB:0.055, passB:-0.035, heavy:1.0, tbw:0.14, pc:0.42},
 '21': {label:'21 personnel', long:'two backs, one tight end, two receivers',  run:0.05, runB:0.040, passB:-0.030, heavy:0.6, tbw:0.03, pc:0.38},
 '22': {label:'22 personnel', long:'two backs, two tight ends, one receiver',  run:0.08, runB:0.070, passB:-0.045, heavy:1.0, tbw:0.10, pc:0.48}
};
const STRAT = { run:{label:'run-heavy', s:0.08}, neutral:{label:'balanced', s:0}, pass:{label:'pass-heavy', s:-0.08} };
const DEF_PKG = { base:{label:'Base'}, nickel:{label:'Nickel'} };
const DEF_FOCUS = { run:{label:'run-defense', f:1}, neutral:{label:'balanced', f:0}, pass:{label:'pass-defense', f:-1} };
const PERS_REC = {
 '12': {WR1:1.5, WR2:1.0, TE1:0.9, TE2:0.6, RB1:0.2},
 '13': {WR1:1.5, TE1:0.9, TE2:0.6, TE3:0.5, RB1:0.2},      // TE3 is not drafted: always a generic 70
 '21': {WR1:1.5, WR2:1.0, TE1:0.9, RB1:0.2, RB2:0.5},
 '22': {WR1:1.5, TE1:0.9, TE2:0.6, RB1:0.2, RB2:0.5}
};
const DEF_SPECS = {
 frontBase: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:1.0, SS:0.4, CB1:0.7, CB2:0.55, CB3:0.1, FS:0.5},
 frontNick: {DT1:1.5, DT2:1.2, DE1:1.0, DE2:1.0, MIKE:1.2, WILL:1.0, SAM:0.1, SS:0.6, CB1:0.7, CB2:0.55, CB3:0.2, FS:0.5},
 covBase:   {CB1:1.4, CB2:1.15, CB3:0.25, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.4},
 covNick:   {CB1:1.4, CB2:1.15, CB3:1.0, SS:0.8, FS:0.8, MIKE:0.4, WILL:0.4, SAM:0.05}
};
const PLAN_K = { kRun:1.4, kPass:0.85, kTo:1.0, kSack:0.9, rAmp:3.0, pAmp:2.5, vm:1.3, kBlock:1, predict:0.38, defPredict:0.40, baseRunPct:0.39,
                 nickRun:0.05, baseRunVsHeavy:-0.025, basePass:0.03, defFront:2.0, defCov:1.5, defRush:0.6, pkgFront:0.8, pkgCov:0.8 };
const DEFAULT_PLAN_PAIR = {home:{off:{pers:'11',strat:'neutral'}, def:{pkg:'nickel',focus:'neutral'}}, away:{off:{pers:'11',strat:'neutral'}, def:{pkg:'nickel',focus:'neutral'}}};
const NEUTRAL_OFF = {pers:'11', strat:'neutral'}, DEFAULT_DEF = {pkg:'nickel', focus:'neutral'};
const DEFAULT_PLAN = {off:NEUTRAL_OFF, def:DEFAULT_DEF};
const OFF_OPTS = [], DEF_OPTS = [];
['11','12','13','21','22'].forEach(p=>['run','neutral','pass'].forEach(s=>OFF_OPTS.push({pers:p, strat:s})));
['base','nickel'].forEach(k=>['run','neutral','pass'].forEach(f=>DEF_OPTS.push({pkg:k, focus:f})));
function offShift(po){ return PERS[po.pers].run + STRAT[po.strat].s; }
function normCdf(z){ const t=1/(1+0.2316419*Math.abs(z)), d=0.3989423*Math.exp(-z*z/2); const p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return z>0?1-p:p; }

function applyOffPlan(O, po){
 const p = po.pers, out = Object.assign({}, O);
 if(PERS_REC[p]) out.rec = O['rec'+p];
 if(p==='21' || p==='22') out.rb = O.rbHeavy;
 const blk = p==='13' ? (O.te2+70)/2 : (p==='12'||p==='22') ? (O.te1+O.te2)/2 : O.te1;
 out.olRun = O.olRun + PERS[p].tbw*(blk-75)*PLAN_K.kBlock;
 return out;
}
function applyDefPlan(D, pd, isLeague){
 const f = DEF_FOCUS[pd.focus].f, nick = pd.pkg==='nickel', out = Object.assign({}, D);
 out.frontRun = (nick?D.frontNick:D.frontBase) + (isLeague?0:((nick?-PLAN_K.pkgFront:PLAN_K.pkgFront) + PLAN_K.defFront*f));
 out.coverage = (nick?D.covNick:D.covBase)     + (isLeague?0:((nick?PLAN_K.pkgCov:-PLAN_K.pkgCov) - PLAN_K.defCov*f));
 out.passRush = D.passRush - (isLeague?0:PLAN_K.defRush*f);
 return out;
}

// ---- the matchup model: every unit feeds yards, sacks, or turnovers; those feed points ----
// NEUTRAL, CONVENTIONAL FOOTBALL LOGIC — deliberately NOT built from the user's draft weights.
//  * A passing yard is worth more points than a rushing yard (≈ 1.75x), so the passing game carries the most weight.
//  * QB is the single most important unit; pass rush and pass protection come next; run blocking moves rushing
//    yards a lot but converts to points less efficiently; backs and receivers matter, but less than the lines.
//  * Coefficients are set from each unit's real spread across teams so expected points per standard deviation are roughly:
//    QB 1.7 | pass rush 1.5 | pass protection 1.4 | coverage 1.4 | receivers 1.0 | run defense 1.0 | run blocking 0.9 | backs 0.6 | kicker 0.3
// Position values (wins per +1 SD of a unit across a typical 32-roster league, with ~32.5 points per win), set from judgment informed by
// PFF/SIS WAR research rather than fit to a dataset:  QB 1.0 | coverage 0.7 | pass rush 0.6 | pass protection 0.6 | receivers 0.6 |
// run defense 0.4 | run blocking 0.3 | backs 0.15 | kicker 0.15.  The report's "model-implied" column re-measures this after any change.
const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.0283, lean:0.013,
             toQb:0.0172, toCov:0.0204, toRush:0.0105, skRush:0.0268, skOl:0.0336, skCov:0.0120, kick:0.069 };
const RUSH_BASE = 105, PASS_BASE = 220;
const PT_RUSH = 0.040, PT_PASS = 0.070, PT_TO = 3.0, PT_SACK = 0.8, LAM_TO = 1.2, LAM_SACK = 2.2;
const BASE_PTS = 21.5, HOME_FIELD = 1.7, PTS_NOISE = 6.0;

// Soft guardrail: identical to the input inside 60% of the cap, then flattens smoothly (never a hard wall), so a better unit is always worth more.
function softCap(x, lo, hi){
 const cap = x>=0 ? hi : -lo, k = 0.6*cap, a = Math.abs(x);
 if(a<=k) return x;
 const v = k + (cap-k)*Math.tanh((a-k)/(cap-k));
 return x>=0 ? v : -v;
}
function matchupModel(O0, D0, lg, plan){
 plan = plan || DEFAULT_PLAN;
 const po = plan.off, pd = plan.def;
 const O = applyOffPlan(O0, po), LO = applyOffPlan(lg, po);
 const D = applyDefPlan(D0, pd, false), LD = applyDefPlan(lg, pd, true);
 const sT = offShift(po), rAmp = 1+PLAN_K.rAmp*sT, pAmp = 1-PLAN_K.pAmp*sT;
 const dRB=O.rb-LO.rb, dOLr=O.olRun-LO.olRun, dQB=O.qb-lg.qb, dRec=O.rec-LO.rec, dOLp=O.olPass-lg.olPass, dK=O.kicker-lg.kicker;
 const dFront=D.frontRun-LD.frontRun, dRush=D.passRush-LD.passRush, dCov=D.coverage-LD.coverage;
 // identity: a team whose strength is the offensive line and the running backs leans run; a QB/receiver team leans pass
 const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp));
 // scheme terms: volume (how many snaps go to each side of the ball), formation edges and inherent package trade-offs
 const heavy = PERS[po.pers].heavy, nick = pd.pkg==='nickel';
 const schemeRun  = PERS[po.pers].runB + PLAN_K.kRun*sT + (nick ? PLAN_K.nickRun*heavy : PLAN_K.baseRunVsHeavy*heavy);
 const schemePass = PERS[po.pers].passB - PLAN_K.kPass*sT + (nick ? 0 : PLAN_K.basePass*(1-heavy));
 const runParts  = [['rb','off',MC.rb*dRB*rAmp], ['olRun','off',MC.olRun*dOLr*rAmp], ['frontRun','def',-MC.front*dFront*rAmp], ['lean','off',lean], ['scheme','off',schemeRun]];
 const passParts = [['qb','off',MC.qb*dQB*pAmp], ['rec','off',MC.rec*dRec*pAmp], ['olPass','off',MC.olPass*dOLp*pAmp], ['passRush','def',-MC.rush*dRush*pAmp], ['coverage','def',-MC.cov*dCov*pAmp], ['lean','off',-lean], ['scheme','off',schemePass]];
 const toParts   = [['qb','off',-MC.toQb*dQB], ['coverage','def',MC.toCov*dCov], ['passRush','def',MC.toRush*dRush], ['scheme','off',-PLAN_K.kTo*sT]];
 const skParts   = [['passRush','def',MC.skRush*dRush], ['olPass','off',-MC.skOl*dOLp], ['coverage','def',MC.skCov*dCov], ['scheme','off',-PLAN_K.kSack*sT]];
 const sum = ps => ps.reduce((s,p)=>s+p[2],0);
 // guardrails: no lineup, however stacked, can push a single channel into absurd territory
 // unit strength saturates FIRST (a line cannot add yards forever), THEN the game plan amplifies what is left, so leaning on a strength always pays
 const rU = softCap(MC.rb*dRB + MC.olRun*dOLr - MC.front*dFront, -1.1, 0.40), pU = softCap(MC.qb*dQB + MC.rec*dRec + MC.olPass*dOLp - MC.rush*dRush - MC.cov*dCov, -0.8, 0.27);
 const rushLog = softCap(rU*rAmp + lean + schemeRun, -1.3, 0.42), passLog = softCap(pU*pAmp - lean + schemePass, -1.0, 0.29), toLog=softCap(sum(toParts),-0.7,0.7), skLog=softCap(sum(skParts),-0.8,0.40);
 const expRush = RUSH_BASE*Math.exp(rushLog), expPass = PASS_BASE*Math.exp(passLog);
 const lamTO = LAM_TO*Math.exp(toLog), lamSack = LAM_SACK*Math.exp(skLog);
 const kickPts = MC.kick*dK;
 const retPts = RET_PTS*(Math.exp(((O0.ret||82)-82)/45) - Math.exp(((lg.ret||82)-82)/45));   // field position from kick and punt returns
 const puntPts = -PUNT_PTS*(Math.exp(((D0.p!=null?D0.p:80)-80)/45) - Math.exp(((lg.p!=null?lg.p:80)-80)/45));   // the defense's punter flips field position
 // points swing attributed to each unit (positive = good for the team that owns the unit)
 const raw = {};
 function add(parts, effOf, kind){
  parts.forEach(([unit, owner, lv])=>{
   if(unit==='lean' || unit==='scheme') return;
   const eff = effOf(lv);                               // effect on the OFFENSE's expected points
   const key = unit+'|'+owner;
   raw[key] = raw[key] || {unit, owner, pts:0, kinds:{}};
   const swing = owner==='off' ? eff : -eff;
   raw[key].pts += swing; raw[key].kinds[kind] = (raw[key].kinds[kind]||0)+swing;
  });
 }
 add(runParts,  lv=> PT_RUSH*RUSH_BASE*(Math.exp(lv)-1), 'ground game');
 add(passParts, lv=> PT_PASS*PASS_BASE*(Math.exp(lv)-1), 'passing game');
 add(toParts,   lv=> -PT_TO*LAM_TO*(Math.exp(lv)-1), 'turnovers');
 add(skParts,   lv=> -PT_SACK*LAM_SACK*(Math.exp(lv)-1), 'sacks');
 if(Math.abs(kickPts)>0.01) raw['kicker|off'] = {unit:'kicker', owner:'off', pts:kickPts, kinds:{'field goals':kickPts}};
 // leaning hard in either direction makes a team predictable: a small efficiency cost that grows with the lean
 const planCost = PLAN_K.predict*Math.pow(STRAT[po.strat].s/0.08, 2) - PLAN_K.defPredict*Math.abs(DEF_FOCUS[pd.focus].f) + PERS[po.pers].pc;  // pc: a non-11 set takes a receiver off the field, a real cost unless the extra tight end or back is a better player
 const structPts = BASE_PTS + PT_RUSH*(expRush-RUSH_BASE) + PT_PASS*(expPass-PASS_BASE) - PT_TO*(lamTO-LAM_TO) - PT_SACK*(lamSack-LAM_SACK) + kickPts + retPts + puntPts - planCost;
 const channels = {run:PT_RUSH*(expRush-RUSH_BASE), pass:PT_PASS*(expPass-PASS_BASE), to:-PT_TO*(lamTO-LAM_TO), sack:-PT_SACK*(lamSack-LAM_SACK), kick:kickPts, plan:-planCost};
 // run-heavy shortens the game and shrinks the spread of outcomes; pass-heavy does the opposite
 const vm = clampNum(1 - PLAN_K.vm*sT, 0.7, 1.2);
 return {expRush, expPass, lamTO, lamSack, structPts, channels, swings:Object.values(raw), sd:8.0*vm, vm, sT, planCost, plan:{off:po, def:pd}, skC:{rush:MC.skRush*dRush, ol:-MC.skOl*dOLp, cov:MC.skCov*dCov}};
}

// ---- scoring: break a final score into TD / FG events spread over four quarters ----
function quarterTotals(events){ const q=[0,0,0,0]; events.forEach(e=>{ if(e.q>=5) q[4] = (q[4]||0)+e.pts; else q[e.q-1]+=e.pts; }); return q; }
function gameFlow(result){
 const evs = result.homeEvents.map(e=>({...e, side:'home'})).concat(result.awayEvents.map(e=>({...e, side:'away'}))).sort((a,b)=> a.q-b.q || a.t-b.t);
 let h=0, a=0, leader=null, changes=0; const after={};
 for(let q=1;q<=4;q++){
  evs.filter(e=>e.q===q).forEach(e=>{
   if(e.side==='home') h+=e.pts; else a+=e.pts;
   const l = h>a ? 'home' : a>h ? 'away' : null;
   if(l && leader && l!==leader) changes++;
   if(l) leader = l;
  });
  after[q] = {h, a};
 }
 return {after, changes};
}

function realisticScore(s){
 if(s===1) return Math.random()<0.5 ? 0 : 3;
 if(s===2) return 3;
 if(s===4) return Math.random()<0.5 ? 3 : 6;
 if(s===5) return Math.random()<0.5 ? 6 : 3;
 return s;
}
// ---- automatic game plans: every team has a style (identity); each game both coaches best-respond to each other ----
// ---- coaching philosophy (identity): what a coach does against an average opponent, from the model's own math ----
// A coach's choice is scored as win probability against what he EXPECTS the opponent to do (the opponent's scouted coaching philosophy).
// Offense and defense are chosen independently, so changing one never moves the other, and nobody reacts to a plan they cannot see.
function wpFrom(mX, mY, hf){ return normCdf((mX.structPts - mY.structPts + hf)/Math.sqrt(mX.sd*mX.sd + mY.sd*mY.sd)); }
function offUtil(X, Y, lg, o, expY, ownDef, hf){
 return wpFrom(matchupModel(X, Y, lg, {off:o, def:expY.def}), matchupModel(Y, X, lg, {off:expY.off, def:ownDef}), hf);
}
function defUtil(X, Y, lg, d, expY, ownOff, hf){
 return wpFrom(matchupModel(X, Y, lg, {off:ownOff, def:expY.def}), matchupModel(Y, X, lg, {off:expY.off, def:d}), hf);
}
function argBest(opts, f){ let best=null, bv=-1e9; opts.forEach(o=>{ const v=f(o); if(v>bv){ bv=v; best=o; } }); return {o:best, v:bv}; }
function teamIdentity(R, lg){
 let exp = {off:NEUTRAL_OFF, def:DEFAULT_DEF}, off = NEUTRAL_OFF, def = DEFAULT_DEF;
 for(let it=0; it<2; it++){
  off = argBest(OFF_OPTS, o=>offUtil(R, lg, lg, o, exp, def, 0)).o;
  def = argBest(DEF_OPTS, d=>defUtil(R, lg, lg, d, exp, off, 0)).o;
 }
 const dRB=R.rb-lg.rb, dOL=R.olRun-lg.olRun, dQB=R.qb-lg.qb, dRec=R.rec-lg.rec, dOLp=R.olPass-lg.olPass;
 const tilt = (0.35*dRB+0.65*dOL) - (0.45*dQB+0.30*dRec+0.25*dOLp);
 const front = R.frontRun-lg.frontRun, back = 0.5*(R.coverage-lg.coverage)+0.5*(R.passRush-lg.passRush);
 return {off, def, tilt, tiltD:front-back, source:'math'};
}
// Literal names: personnel = backs-tight ends (11 = 1 RB, 1 TE, 3 WR; 12 = 1 RB, 2 TE; 13 = 1 RB, 3 TE; 21 = 2 RB, 1 TE; 22 = 2 RB, 2 TE).
const PERS_WITH = {'11':'', '12':' with two tight ends', '13':' with three tight ends', '21':' with two backs', '22':' with two backs and two tight ends'};
const PERS_WITH_TXT = {'11':'one back, one tight end and three receivers', '12':'one back, two tight ends and two receivers', '13':'one back, three tight ends and one receiver', '21':'two backs, one tight end and two receivers', '22':'two backs, two tight ends and one receiver'};
const STRAT_ADJ = {run:'run-heavy', neutral:'balanced', pass:'pass-heavy'};
function offStyleName(po){ return `${STRAT_ADJ[po.strat]} offense${PERS_WITH[po.pers]}`; }
function defStyleName(pd){
 if(pd.pkg==='base') return pd.focus==='run' ? 'base defense focused on the run' : pd.focus==='pass' ? 'base defense focused on the pass' : 'base defense';
 return pd.focus==='pass' ? 'nickel defense focused on the pass' : pd.focus==='run' ? 'nickel defense focused on the run' : 'nickel defense';
}
// What each style means, in plain football terms (shown on the Guide and the Preseason page).
const OFF_STYLE_INFO = (()=>{
 const out = {}, STRAT_DESC = {
  neutral:'with about 4 runs in every 10 plays',
  run:'and you hand the ball off far more often: fewer turnovers, a narrower range of outcomes, the biggest payoff from a strong line and backs',
  pass:'and you throw much more: it pays off when the quarterback, receivers and protection beat the defense, at the price of more sacks and turnovers'};
 ['11','12','13','21','22'].forEach(p=>['neutral','run','pass'].forEach(st=>{
  out[offStyleName({pers:p, strat:st})] = {cands:[[p,st]], desc:`${capFirst(PERS_WITH_TXT[p])} on the field ${STRAT_DESC[st]}.`};
 }));
 return out;
})();
const DEF_STYLE_INFO = {
 'base defense':{pkg:'base', focus:'neutral', desc:'Four down linemen and three linebackers. Stronger against the run, a little thinner in pass coverage.'},
 'base defense focused on the run':{pkg:'base', focus:'run', desc:'Base personnel with the safeties and linebackers committed to stopping the run. The most predictable look, so offenses adjust to it.'},
 'base defense focused on the pass':{pkg:'base', focus:'pass', desc:'Base personnel that plays more pass coverage and rushes four. Rarely the right call.'},
 'nickel defense':{pkg:'nickel', focus:'neutral', desc:'Five defensive backs: an extra defensive back replaces a linebacker. Better in coverage, a little softer against the run. The modern default.'},
 'nickel defense focused on the run':{pkg:'nickel', focus:'run', desc:'Nickel personnel, but the safeties and linebackers play downhill to stop the run and attack ball carriers behind the line.'},
 'nickel defense focused on the pass':{pkg:'nickel', focus:'pass', desc:'Nickel personnel that gives up some run defense to take away the pass. Predictable, so it pays a small penalty.'}
};
function aStyle(n){ return (/^[aeiou]/i.test(n)?'an ':'a ')+n; }
function planText(po){ const pl = PERS[po.pers].label; return po.strat==='neutral' ? pl : pl + ' \u00b7 ' + STRAT[po.strat].label; }
function defPlanText(pd){ return `${DEF_PKG[pd.pkg].label}${pd.focus==='neutral'?'':' · '+DEF_FOCUS[pd.focus].label}`; }
function planFits(c, o){ return !c || Object.keys(c).every(k=> !(k in o) || !c[k] || c[k]==='auto' || o[k]===c[k]); }
function choosePlans(H, A, lg, usualH, usualA, expH, expA, cH, cA){
 // expH / expA: what each side's opponent EXPECTS of it (scouted coaching philosophy). Decisions are independent of the opponent's actual choice.
 const oO = c=>OFF_OPTS.filter(o=>planFits(c,o)), dO = c=>DEF_OPTS.filter(o=>planFits(c,o));
 const tables = {
  hO: oO(cH).map(o=>({o, u:offUtil(H, A, lg, o, expA, usualH.def, +HOME_FIELD)})),
  aO: oO(cA).map(o=>({o, u:offUtil(A, H, lg, o, expH, usualA.def, -HOME_FIELD)})),
  hD: dO(cH).map(o=>({o, u:defUtil(H, A, lg, o, expA, usualH.off, +HOME_FIELD)})),
  aD: dO(cA).map(o=>({o, u:defUtil(A, H, lg, o, expH, usualA.off, -HOME_FIELD)}))
 };
 return {tables};
}
function samplePlans(tables, noise){
 const pk = tbl => tbl.reduce((best,x)=>{ const v = x.u + gaussNoise(noise); return (!best || v>best.v) ? {o:x.o, v} : best; }, null).o;
 return {home:{off:pk(tables.hO), def:pk(tables.hD)}, away:{off:pk(tables.aO), def:pk(tables.aD)}};
}
function autoPlans(H, A, lg){
 const uH = teamIdentity(H, lg), uA = teamIdentity(A, lg);
 return samplePlans(choosePlans(H, A, lg, uH, uA, uH, uA, null, null).tables, 0.004);
}
// Opponents scout the user from the coaching philosophy — until the user has clearly changed how he plays (3 of the last 4 games the same new look).
function scoutedPlan(team){
 const S = seasonState, u = S.identity[team], base = {off:u.off, def:u.def, adapted:false};
 if(team!==seasonUserTeam()) return base;
 const gs = teamPlayedGames(team).filter(g=>g.plans && g.played).slice(-4);
 if(gs.length<3) return base;
 const mine = gs.map(g=>g.plans[g.home===team?'home':'away']);
 const modeOf = arr=>{ const c={}; arr.forEach(x=>{ const k=JSON.stringify(x); c[k]=(c[k]||0)+1; }); const e=Object.entries(c).sort((a,b)=>b[1]-a[1])[0]; return e[1]>=3 ? JSON.parse(e[0]) : null; };
 const o = modeOf(mine.map(p=>p.off)), d = modeOf(mine.map(p=>p.def));
 const diff = (x,y)=>JSON.stringify(x)!==JSON.stringify(y);
 return {off:o||base.off, def:d||base.def, adapted:!!((o&&diff(o,base.off))||(d&&diff(d,base.def)))};
}
function userPlanConstraint(){
 const S = (typeof seasonState!=='undefined') ? seasonState : null; const u = S && S.userPlan; if(!u) return null;
 if(u.mode==='manual') return {pers:u.pers, strat:u.strat, pkg:u.pkg, focus:u.focus};
 if(u.mode==='script'){ const id = S.identity[seasonUserTeam()]; return {pers:id.off.pers, strat:id.off.strat, pkg:id.def.pkg, focus:id.def.focus}; }
 return null;
}
function ensureGamePlans(g){
 const S = seasonState;
 if(g.plans) return g.plans;
 const uc = userPlanConstraint(), user = seasonUserTeam();
 const cH = (uc && g.home===user) ? uc : null, cA = (uc && g.away===user) ? uc : null;
 const eH = scoutedPlan(g.home), eA = scoutedPlan(g.away);
 const key = g.home+'|'+g.away+'|'+(cH?JSON.stringify(cH):'')+'|'+(cA?JSON.stringify(cA):'')+'|'+JSON.stringify([eH.off,eH.def,eA.off,eA.def,S.identity[g.home].off,S.identity[g.home].def,S.identity[g.away].off,S.identity[g.away].def]);
 S.planCache = S.planCache || {};
 let ent = S.planCache[key];
 if(!ent) ent = S.planCache[key] = choosePlans(S.unitRatings[g.home], S.unitRatings[g.away], S.league, S.identity[g.home], S.identity[g.away], eH, eA, cH, cA);
 g.plans = samplePlans(ent.tables, 0.004);
 g.plansAuto = !(cH||cA);
 g.scouted = {home:eH.adapted, away:eA.adapted};
 return g.plans;
}
function resetUnplayedPlans(){ seasonState.planCache = {}; seasonState.schedule.forEach(g=>{ if(!g.played){ g.plans = null; g.preview = null; } }); ['wildcard','divisional','champ','superbowl'].forEach(rk=>((seasonState.playoffRounds&&seasonState.playoffRounds[rk])||[]).forEach(g=>{ if(!g.played){ g.plans=null; g.preview=null; } })); }

function simulateGame(homeSM, awaySM, isPlayoff, lg, plans){
 const H = teamRatings(homeSM), A = teamRatings(awaySM);
 if(!plans) plans = autoPlans(H, A, lg);
 const pH = plans.home, pA = plans.away;
 const mh = matchupModel(H, A, lg, {off:pH.off, def:pA.def}), ma = matchupModel(A, H, lg, {off:pA.off, def:pH.def});
 function realize(m){
  return {
   rush: clampNum(Math.round(m.expRush*Math.exp(gaussNoise(0.30)-0.045)), 15, 345),
   pass: clampNum(Math.round(m.expPass*Math.exp(gaussNoise(0.26*m.vm)-0.0338*m.vm*m.vm)), 45, 520),
   to: clampNum(poisson(m.lamTO), 0, 6),
   sacks: clampNum(poisson(m.lamSack), 0, 9)
  };
 }
 const rh = realize(mh), ra = realize(ma);
 // realized points come from the realized yards, giveaways, and sacks (so the box score and the score tell one story)
 function pts(m, r, hf){
  return BASE_PTS + hf + PT_RUSH*(r.rush-RUSH_BASE) + PT_PASS*(r.pass-PASS_BASE) - PT_TO*(r.to-LAM_TO) - PT_SACK*(r.sacks-LAM_SACK) + m.channels.kick - m.planCost + gaussNoise(PTS_NOISE*m.vm);
 }
 let hF = clampNum(pts(mh, rh, HOME_FIELD), 0, 58), aF = clampNum(pts(ma, ra, 0), 0, 58);
 // late-game script: the trailing side opens it up (so a run-heavy plan never costs comeback ability); the leader leans on the run
 let script = null;
 const mg0 = hF - aF;
 if(Math.abs(mg0)>=2.5 && Math.abs(mg0)<=18){
  const trailHome = mg0<0;
  const Tm = trailHome?mh:ma, Lm = trailHome?ma:mh, TR = trailHome?H:A, LR = trailHome?A:H, Tp = trailHome?pH:pA, Lp = trailHome?pA:pH;
  let dT = 0, dL = 0; script = {trail: trailHome?'home':'away', deficit: Math.abs(mg0), trailFrom:null, leadFrom:null};
  if(offShift(Tp.off) > -0.03){ dT = 0.3*(matchupModel(TR, LR, lg, {off:{pers:'11',strat:'pass'}, def:Lp.def}).structPts - Tm.structPts) + Math.abs(gaussNoise(1.0)); script.trailFrom = Tp.off; }
  if(offShift(Lp.off) < 0.10){ dL = 0.2*(matchupModel(LR, TR, lg, {off:{pers:'12',strat:'run'}, def:Tp.def}).structPts - Lm.structPts); script.leadFrom = Lp.off; }
  script.swing = dT - dL;
  if(trailHome){ hF += dT; aF += dL; } else { aF += dT; hF += dL; }
  hF = Math.max(0,hF); aF = Math.max(0,aF);
 }
 let homeScore = realisticScore(Math.round(hF)), awayScore = realisticScore(Math.round(aF));
 const homeProj = mh.structPts + HOME_FIELD, awayProj = ma.structPts;
 let ot = false, otAdd = null;
 if(homeScore===awayScore && (isPlayoff || Math.random()>0.08)){
  ot = true; const homeWinsOT = Math.random() < normCdf((homeProj-awayProj)/9), add = Math.random()<0.35 ? 7 : 3;
  otAdd = {side: homeWinsOT?'home':'away', add};
  if(homeWinsOT) homeScore += add; else awayScore += add;
 }
 // regulation scoring is built from the tied score; overtime is its own scoring event (a walk-off score, quarter 5)
 const homeAg = aggrOf(homeSM), awayAg = aggrOf(awaySM);
 const homeEvents = makeScoringEvents(homeScore - (otAdd&&otAdd.side==='home'?otAdd.add:0), homeAg), awayEvents = makeScoringEvents(awayScore - (otAdd&&otAdd.side==='away'?otAdd.add:0), awayAg);
 lateTwoPt(homeEvents, awayEvents);
 if(otAdd) (otAdd.side==='home'?homeEvents:awayEvents).push({pts:otAdd.add, type:otAdd.add===7?'TD':'FG', q:5, t:0.5+Math.random()*0.3});
 const margin = homeScore - awayScore;
 // game script: the team in front leans on the run, the team behind throws
 const adj = (r, mg)=>({
  rushYards: clampNum(Math.round(r.rush*Math.exp(mg*0.006)), 15, 345),
  passYards: clampNum(Math.round(r.pass*Math.exp(-mg*0.005)), 45, 520)
 });
 const hy = adj(rh, margin), ay = adj(ra, -margin);
 const runPctOf = (po, mg)=> clampNum(PLAN_K.baseRunPct + offShift(po) + clampNum(mg*0.004,-0.10,0.10), 0.26, 0.62);
 const homeStats = {rushYards:hy.rushYards, passYards:hy.passYards, totalYards:hy.rushYards+hy.passYards, turnovers:rh.to, sacks:rh.sacks, top:0, runPct:runPctOf(pH.off, margin), sT:offShift(pH.off), pers:pH.off.pers};
 const awayStats = {rushYards:ay.rushYards, passYards:ay.passYards, totalYards:ay.rushYards+ay.passYards, turnovers:ra.to, sacks:ra.sacks, top:0, runPct:runPctOf(pA.off, -margin), sT:offShift(pA.off), pers:pA.off.pers};
 const homeTop = clampNum(Math.round(1800 + (homeStats.rushYards-awayStats.rushYards)*1.0 + margin*6 + gaussNoise(130)), 1260, 2340);
 homeStats.top = homeTop; awayStats.top = 3600 - homeTop;
 // what each plan was worth against a plain 11-personnel, balanced approach into the same defense
 const nh = matchupModel(H, A, lg, {off:NEUTRAL_OFF, def:pA.def}), na = matchupModel(A, H, lg, {off:NEUTRAL_OFF, def:pH.def});
 const fx = (m,n)=>({pts:m.structPts-n.structPts, to:m.lamTO/n.lamTO-1, sack:m.lamSack/n.lamSack-1, rush:m.expRush-n.expRush, pass:m.expPass-n.expPass, sd:m.vm-1});
 return {
  homeScore, awayScore, homeStats, awayStats, homeEvents, awayEvents,
  homeQ: quarterTotals(homeEvents), awayQ: quarterTotals(awayEvents),
  ratings: {H, A}, exp: {home:mh, away:ma}, proj: {home:homeProj, away:awayProj},
  plans, planFx:{home:fx(mh,nh), away:fx(ma,na)}, script, ot
 };
}

// ---- player-level detail for a game: who scored, who turned it over, who forced it, who sacked ----
const SLOT_GROUP = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',K:'K',OT1:'OL',OT2:'OL',OG1:'OL',OG2:'OL',C:'OL',
 DE1:'DL',DE2:'DL',DT1:'DL',DT2:'DL',MIKE:'LB',WILL:'LB',SAM:'LB',CB1:'DB',CB2:'DB',CB3:'DB',SS:'DB',FS:'DB'};

function statImpact(s){
 return (s.passYds||0)*0.04 + (s.passTD||0)*4 - (s.int||0)*2 + (s.rushYds||0)*0.1 + (s.rushTD||0)*6
  + (s.recYds||0)*0.1 + (s.recTD||0)*6 - (s.fumLost||0)*2 + (s.sack||0)*4 + (s.dint||0)*5 + (s.ff||0)*3
  + (s.tkl||0)*0.6 + (s.fg||0)*1.5
  + (s.fr||0)*3 + (s.dtd||0)*4 + (s.blk||0)*3 + (s.saf||0)*3 + (s.tpc||0)*2 - Math.max(0,(s.fum||0)-(s.fumLost||0))*0.5 - (s.sackd||0)*0.8;
}
// Typical production (mean, sd of statImpact) for each lineup slot, measured from simulated seasons.
// The game ball goes to whoever most exceeds what is normal FOR THEIR ROLE, so a star RB1 no longer wins by default.
const SLOT_BASE = {"RB1":[14.08,7.39],"RB2":[3.64,3.13],"QB":[12.79,6.70],"WR1":[7.73,4.75],"WR2":[5.13,3.78],"WR3":[4.02,3.41],"TE1":[5.46,3.93],"TE2":[1.12,1.64],"K":[2.37,2.02],
 "MIKE":[5.96,3.27],"WILL":[4.93,2.92],"SAM":[2.73,1.89],"SS":[4.11,2.73],"FS":[3.12,2.19],"CB1":[3.97,3.02],"CB2":[2.66,2.27],"CB3":[1.72,1.62],
 "DE1":[5.03,3.59],"DE2":[3.69,3.05],"DT1":[3.57,3.02],"DT2":[2.26,2.16]};
// Fitted so game balls land roughly QB 24% / RB 15% / WR 16% / TE 6% / defense 36% / K 3% across the league.
const GAME_BALL_BIAS = {QB:1.82, RB:-0.50, WR:0.03, TE:-0.30, DL:-0.36, LB:-0.55, DB:-0.45, K:0.10};
function gameZ(slot, raw){ const b = SLOT_BASE[slot]; return b ? (raw-b[0])/Math.sqrt(b[1]) : 0; }
function passerRating(cmp, att, yds, td, int){
 if(!att) return 0;
 const c = v=>Math.max(0,Math.min(2.375,v));
 return Math.round(((c((cmp/att-0.3)*5)+c((yds/att-3)*0.25)+c(td/att*20)+c(2.375-int/att*25))/6*100)*10)/10;
}
// extra tracked stats, worded for a box-score line
function extraStats(group, s){
 const p = [];
 if(group==='QB' && s.sackd) p.push(`sacked ${s.sackd}x`);
 if(s.fum) p.push(`${s.fum} fumble${s.fum===1?'':'s'}${s.fumLost?` (${s.fumLost} lost)`:''}`);
 if(s.tpc) p.push(`${s.tpc} 2-Pt Conv${s.tpc===1?'':'s'}`);
 if(s.fr) p.push(`${s.fr} fumble recover${s.fr===1?'y':'ies'}`);
 if(s.dtd) p.push(`${s.dtd} defensive TD${s.dtd===1?'':'s'}`);
 if(s.saf) p.push(`${s.saf} safety`);
 if(s.blk) p.push(`${s.blk} blocked kick${s.blk===1?'':'s'}`);
 if(s.krN) p.push(`${s.krN} KR for ${s.krYds} yds`);
 if(s.prN) p.push(`${s.prN} PR for ${s.prYds} yds`);
 return p;
}
function gameStatLine(group, s){
 const parts = [];
 if(group==='QB'){ parts.push(`${s.cmp||0}/${s.att||0}, ${s.passYds||0} yds, ${s.passTD||0} TD`); if(s.int) parts.push(`${s.int} INT`); if(s.rushYds) parts.push(`${s.rushYds} rush yds`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`); }
 else if(group==='RB'){ parts.push(`${s.car||0} car, ${s.rushYds||0} rush yds`); if(s.rushTD) parts.push(`${s.rushTD} TD`); if(s.recYds) parts.push(`${s.recYds} rec yds`); if(s.recTD) parts.push(`${s.recTD} rec TD`);  }
 else if(group==='WR' || group==='TE'){ parts.push(`${s.rec||0}/${s.tgt||0} rec, ${s.recYds||0} yds`); if(s.recTD) parts.push(`${s.recTD} TD`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`);  }
 else if(group==='K'){ parts.push(`${s.fg||0} FG`); }
 else if(group==='OL'){ parts.push(`${s.rbk||0} rush yds behind`, `${s.pk||0} pancakes`); if(s.sa) parts.push(`${s.sa} sack${s.sa===1?'':'s'} allowed`); if(s.pa) parts.push(`${s.pa} pressure${s.pa===1?'':'s'} allowed`); }
 else { if(s.sack) parts.push(`${s.sack} sack${s.sack===1?'':'s'}`); if(s.dint) parts.push(`${s.dint} INT`); if(s.ff) parts.push(`${s.ff} FF`); if(s.pd) parts.push(`${s.pd} PD`); if(s.tfl) parts.push(`${s.tfl} TFL`); parts.push(`${s.tkl||0} tkl`); }
 return parts.concat(extraStats(group, s)).join(', ');
}
function splitAmong(total, items){
 // items: [{w}] -> integer yardage shares proportional to weight with game-to-game jitter
 const jw = items.map(it=> it.w*Math.exp(gaussNoise(0.35)));
 const sum = jw.reduce((a,b)=>a+b,0)||1;
 return jw.map(x=> Math.round(total*x/sum));
}

function buildOffenseDetail(sm, teamName, stats, events, defTD){
 const get = s => effEntry(sm, s);
 const qb=get('QB'), rb1=get('RB1'), rb2=get('RB2'), wr1=get('WR1'), wr2=get('WR2'), wr3=get('WR3'), te=get('TE1'), te2=get('TE2'), k=get('K');
 const players = {};
 function P(e, slot){ if(!e) return null; if(!players[e.name]) players[e.name] = {name:e.name, slot, group:SLOT_GROUP[slot], team:teamName, ovr:e.ovr, st:{}}; return players[e.name]; }
 function add(e, slot, key, v){ const p=P(e,slot); if(p) p.st[key] = (p.st[key]||0)+v; }

 // Who is on the field: the game's personnel package for most snaps, 11 personnel for the rest. A rotation player (TE2, WR3, RB2) also
 // plays more when he is simply better than the starter he sits behind, so the best players always get the ball.
 const pers = stats.pers || '11', mixW = pers==='11' ? {'11':1} : {[pers]:0.6, '11':0.4};
 const ON = {'11':{WR1:1,WR2:1,WR3:1,TE1:1,TE2:0,RB1:1,RB2:0}, '12':{WR1:1,WR2:1,WR3:0,TE1:1,TE2:1,RB1:1,RB2:0}, '13':{WR1:1,WR2:0,WR3:0,TE1:1,TE2:1,RB1:1,RB2:0},
             '21':{WR1:1,WR2:1,WR3:0,TE1:1,TE2:0,RB1:1,RB2:1}, '22':{WR1:1,WR2:0,WR3:0,TE1:1,TE2:1,RB1:1,RB2:1}};
 const FLOOR = {WR1:1,WR2:0.55,WR3:0.30,TE1:0.70,TE2:0.22,RB1:1,RB2:0.18};
 const share = slot => { let v = 0; Object.keys(mixW).forEach(k=>{ v += mixW[k]*(ON[k][slot]||0); }); return Math.max(v, FLOOR[slot]||0); };
 const ovrOf = e => e ? e.ovr : 70;
 const rotShare = (slot, e, ref) => Math.min(1, share(slot) + (e && ref ? clampNum((e.ovr-ref.ovr)/25, 0, 0.4) : 0));

 // quarterback scrambles: a function of how fast he is (starters average about 240 yards a season, from under 50 to over 800)
 const rawQB = sm['QB'], qbSpd = Array.isArray(rawQB) ? rawQB[4] : 82;
 const qbRushYds = qb ? clampNum(Math.round(205*Math.exp((qbSpd-85)/8)/17*Math.sqrt(Math.max(stats.rushYards,20)/105)*Math.exp(gaussNoise(0.45)-0.1)), 0, Math.round(stats.rushYards*0.40)) : 0;
 if(qbRushYds>0){ add(qb, 'QB', 'rushYds', qbRushYds); add(qb, 'QB', 'car', Math.max(1, Math.round(qbRushYds/clampNum(5.6+gaussNoise(0.8),3.5,8)))); }
 // backs: the BEST back leads (whichever slot he occupies); the other gets a share that grows with his rating and with 21/22 personnel
 const backs = [rb1, rb2].filter(Boolean).map((e,i)=>({e, slot:i?'RB2':'RB1'})).sort((a,b)=>ovrOf(b.e)-ovrOf(a.e));
 const rushers = backs.map((b,i)=>({e:b.e, slot:b.slot, w:(i===0 ? 1.0 : 0.25+0.5*share('RB2')) * Math.exp((b.e.ovr-80)/30)}));
 const rushYds = splitAmong(Math.max(0, Math.round(stats.rushYards*0.85) - qbRushYds), rushers);   // ~15% goes to depth backs, FB, WR sweeps
 rushers.forEach((r,i)=> add(r.e, r.slot, 'rushYds', rushYds[i]));

 // receiving split: quality-driven (target the best players), scaled by how much each one is actually on the field
 const posMult = {WR:1.0, TE:0.85, RB:0.42};
 const mk = (e, slot, sh)=> e ? {e, slot, w:(posMult[SLOT_GROUP[slot]]||1)*sh*Math.exp((e.ovr-80)/26)} : null;
 const catchers = [
  mk(wr1,'WR1',share('WR1')), mk(wr2,'WR2',rotShare('WR2',wr2,null)), mk(wr3,'WR3',rotShare('WR3',wr3,null)),
  mk(te,'TE1',share('TE1')), mk(te2,'TE2',rotShare('TE2',te2,wr3)),
  mk(rb1,'RB1',1.0), mk(rb2,'RB2',rotShare('RB2',rb2,rb1))
 ].filter(Boolean);
 const recYds = splitAmong(Math.round(stats.passYards*0.93), catchers);
 catchers.forEach((c,i)=> add(c.e, c.slot, 'recYds', recYds[i]));
 // receptions / targets: yards per catch by role, catch rate by hands (and a little by the QB), targets = catches + misses
 let teamRec=0, teamTgt=0;
 catchers.forEach((c,i)=>{
  const ypr = (c.slot.startsWith('WR')?10.8: c.slot.startsWith('TE')?9.5:6.6) * Math.exp(gaussNoise(0.10));
  const rec = Math.max(recYds[i]>0?1:0, Math.round(recYds[i]/ypr));
  const base = c.slot.startsWith('WR')?0.645: c.slot.startsWith('TE')?0.68:0.78;
  const cp = clampNum(base + ((c.e.ovr||80)-80)*0.0045 + (qb?((qb.ovr||80)-80)*0.0015:0), 0.50, 0.86);
  const tgt = Math.max(rec, Math.round(rec/cp + gaussNoise(0.7)));
  if(rec) add(c.e, c.slot, 'rec', rec); if(tgt) add(c.e, c.slot, 'tgt', tgt);
  teamRec+=rec; teamTgt+=tgt;
 });
 const qbAtt = teamTgt+Math.round(teamTgt*0.08);
 if(qb){ add(qb, 'QB', 'passYds', stats.passYards); add(qb,'QB','cmp',teamRec); add(qb,'QB','att',qbAtt); }
 const dropbacks = qbAtt + (stats.sacks||0);
 // carries follow the yards: more volume brings diminishing returns per carry, and a run-heavy plan runs into more crowded boxes
 const ypc = clampNum(4.35*Math.exp(0.30*Math.log(Math.max(stats.rushYards,20)/105) - 0.8*(stats.sT||0) + gaussNoise(0.08)), 3.0, 6.2);
 const rushAtt = Math.max(8, Math.round(stats.rushYards/ypc));
 const rushSum = rushYds.reduce((a,b)=>a+b,0)||1;
 rushers.forEach((r,i)=>{ const c = Math.max(rushYds[i]>0?1:0, Math.round(rushAtt*0.92*rushYds[i]/rushSum)); if(c) add(r.e, r.slot, 'car', c); });
 const plays = {rush:rushAtt, pass:dropbacks, runPct:rushAtt/(rushAtt+dropbacks)};

 // ---- offensive line: which way the runs went, whose gap it was, and how many pancakes ----
 const OLS = ['OT1','OG1','C','OG2','OT2'], olE = {}; OLS.forEach(sl=>{ olE[sl] = get(sl); });
 const oo = sl => olE[sl] ? olE[sl].ovr : 70;
 const sideR = {L:(oo('OT1')+oo('OG1'))/2, M:(oo('OG1')+oo('C')+oo('OG2'))/3, R:(oo('OG2')+oo('OT2'))/2};
 const sideMean = (sideR.L+sideR.M+sideR.R)/3;
 const starB = {L: Math.max(oo('OT1'),oo('OG1'))>=90?1.18:1, M: Math.max(oo('C'),oo('OG1'),oo('OG2'))>=92?1.10:1, R: Math.max(oo('OG2'),oo('OT2'))>=90?1.18:1};
 const dShare = {}, yF = {}; let sw = 0, yw = 0;
 ['L','M','R'].forEach(d=>{ dShare[d] = (d==='M'?0.30:0.35)*Math.exp((sideR[d]-sideMean)/14)*starB[d]*Math.exp(gaussNoise(0.12)); sw += dShare[d]; });
 ['L','M','R'].forEach(d=>{ dShare[d] /= sw; yF[d] = dShare[d]*Math.exp((sideR[d]-sideMean)/70); yw += yF[d]; });
 const runDir = {}; ['L','M','R'].forEach(d=>{ runDir[d] = {car:Math.round(rushAtt*dShare[d]), yds:Math.round(stats.rushYards*yF[d]/yw)}; });
 const GAP = {L:{OT1:.5,OG1:.5}, M:{C:.4,OG1:.3,OG2:.3}, R:{OG2:.5,OT2:.5}};
 OLS.forEach(sl=>{
  const e = olE[sl]; if(!e) return;
  let yds = 0, car = 0; ['L','M','R'].forEach(d=>{ const g = GAP[d][sl]||0; yds += runDir[d].yds*g; car += runDir[d].car*g; });
  add(e, sl, 'rbk', Math.round(yds)); add(e, sl, 'rcar', Math.round(car));
  add(e, sl, 'pk', poisson(2.4*ovrFactor(e.ovr,26)));
 });
 plays.runDir = runDir;

 // touchdowns: each TD event is a pass or a rush; scorers drawn by the same quality-weighted shares
 const tdAll = events.filter(e=>e.type==='TD');
 // some of a team's touchdowns were scored by its own DEFENSE (an interception or fumble returned): mark those first so the offense is not credited for them
 tdAll.forEach(e=>{ delete e.defensive; });
 shuffleArr(tdAll).slice(0, Math.min(defTD||0, tdAll.length)).forEach(e=>{ e.defensive = true; });
 const tdEvents = tdAll.filter(e=>!e.defensive);
 const passShare = stats.passYards/(stats.passYards+stats.rushYards);
 const passTDprob = clampNum(passShare*0.95, 0.35, 0.80);
 const tdScorers = [];
 tdEvents.forEach(ev=>{
  if(Math.random()<passTDprob && catchers.length){
   const rec = weightedPick(catchers.map(c=>({item:c, w:c.w})));
   add(rec.e, rec.slot, 'recTD', 1);
   if(qb) add(qb, 'QB', 'passTD', 1);
   tdScorers.push({name:rec.e.name, group:SLOT_GROUP[rec.slot], kind:'pass', q:ev.q, qb: qb?qb.name:null});
  } else if(rushers.length){
   const tdRushers = rushers.concat(qb ? [{e:qb, slot:'QB', w:Math.max(0.06, qbRushYds/Math.max(stats.rushYards,1)*1.2)*rushers.reduce((a,b)=>a+b.w,0)}] : []);
   const rs = weightedPick(tdRushers.map(c=>({item:c, w:c.w})));
   add(rs.e, rs.slot, 'rushTD', 1);
   tdScorers.push({name:rs.e.name, group:SLOT_GROUP[rs.slot], kind:'rush', q:ev.q});
  }
 });
 if(k) add(k, 'K', 'fg', events.filter(e=>e.type==='FG').length);
 // two-point tries: a TD worth 8 converted one; a TD worth 6 is either a missed kick or a failed try (decided once per event)
 tdAll.forEach(ev=>{
  const made = ev.pts===8;
  if(!made){ if(ev.pts!==6) return; if(ev.tpTry===undefined) ev.tpTry = ev.forced ? true : Math.random()<Math.min(0.9, 0.38*(AGGR_INFO[ev.ag||'balanced'].two)); if(!ev.tpTry) return; }
  if(Math.random()<0.55 && catchers.length && qb){
   const rc = weightedPick(catchers.map(c=>({item:c, w:c.w})));
   add(rc.e, rc.slot, 'tpa', 1); add(qb, 'QB', 'tpa', 1); if(made){ add(rc.e, rc.slot, 'tpc', 1); add(qb, 'QB', 'tpc', 1); }
  } else if(rushers.length){
   const rs = weightedPick(rushers.map(c=>({item:c, w:c.w})));
   add(rs.e, rs.slot, 'tpa', 1); if(made) add(rs.e, rs.slot, 'tpc', 1);
  }
 });
 if(qb && stats.sacks) add(qb, 'QB', 'sackd', stats.sacks);   // sacks the quarterback took

 // giveaways: interceptions land on the QB, fumbles on whoever carries the ball
 const pickCarrier = ()=>{ const carriers = [ {e:rb1,slot:'RB1',w:.45}, {e:qb,slot:'QB',w:.2}, {e:wr1,slot:'WR1',w:.15}, {e:te,slot:'TE1',w:.08}, {e:te2,slot:'TE2',w:.02}, {e:wr2,slot:'WR2',w:.1} ].filter(x=>x.e); return weightedPick(carriers.map(x=>({item:x, w:x.w}))); };
 const giveaways = [];
 for(let i=0;i<stats.turnovers;i++){
  const q = weightedPick([{item:1,w:1},{item:2,w:1},{item:3,w:1},{item:4,w:1.25}]);
  if(Math.random()<0.52 && qb){
   add(qb,'QB','int',1);
   giveaways.push({type:'INT', q, name:qb.name, group:'QB', team:teamName});
  } else {
   const c = pickCarrier();
   add(c.e, c.slot, 'fumLost', 1); add(c.e, c.slot, 'fum', 1);
   giveaways.push({type:'FUM', q, name:c.e.name, group:SLOT_GROUP[c.slot], team:teamName});
  }
 }
 // fumbles the offense got back itself (they count as fumbles but are not turnovers)
 const ownRecFum = [];
 for(let i=0, n=poisson(0.5); i<n; i++){ const c = pickCarrier(); add(c.e, c.slot, 'fum', 1); ownRecFum.push({name:c.e.name, group:SLOT_GROUP[c.slot], team:teamName}); }
 return {players:Object.values(players), tdScorers, giveaways, plays, ownRecFum};
}

function buildDefenseDetail(sm, teamName, oppGiveaways, sacksForced, sk, extra){
 extra = extra || {};
 const get = s => effEntry(sm, s);
 const players = {};
 function P(e, slot){ if(!e) return null; if(!players[e.name]) players[e.name] = {name:e.name, slot, group:SLOT_GROUP[slot], team:teamName, ovr:e.ovr, st:{}}; return players[e.name]; }
 const tackleBase = {MIKE:6.5,WILL:5.8,SAM:4,SS:5.2,FS:4.4,CB1:3.6,CB2:3.2,CB3:2.4,DE1:3.2,DE2:2.8,DT1:2.6,DT2:2.2};
 Object.keys(tackleBase).forEach(slot=>{
  const e = get(slot); const p = P(e, slot);
  if(p) p.st.tkl = poisson(tackleBase[slot]*ovrFactor(e.ovr,45));
 });
 // disruption stats: tackles for loss, QB pressures, passes defensed
 const tflBase = {DE1:0.63,DE2:0.5,DT1:0.47,DT2:0.34,MIKE:0.6,WILL:0.47,SAM:0.3,SS:0.21,FS:0.09,CB1:0.09,CB2:0.09,CB3:0.04};
 const hurBase = {DE1:2.4,DE2:2.0,DT1:1.4,DT2:1.0,MIKE:0.7,WILL:0.8,SAM:0.5};
 const pdBase  = {CB1:0.66,CB2:0.62,CB3:0.39,SS:0.39,FS:0.39,MIKE:0.09,WILL:0.08,SAM:0.065};
 Object.keys(tflBase).forEach(slot=>{ const e = get(slot); const p = P(e, slot); if(p){ const f = ovrFactor(e.ovr,55); p.st.tfl = poisson(tflBase[slot]*f); if(hurBase[slot]) p.st.hur = poisson(hurBase[slot]*f*(1+0.12*(sacksForced-2.2))); if(pdBase[slot]) p.st.pd = poisson(pdBase[slot]*f); } });
 const bySlot = {}; Object.keys(tackleBase).forEach(s=>{ const e=get(s); if(e) bySlot[s]={e, slot:s}; });
 ['DL5','LB4'].forEach(s=>{ const e=get(s); if(e && !bySlot[s]) bySlot[s]={e, slot:s}; });
 const sackers = ['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','DL5','LB4'].filter(s=>bySlot[s]);
 const sackW = {DE1:1.3,DE2:1.2,DT1:.9,DT2:.7,MIKE:.6,WILL:.6,SAM:.45,DL5:.42,LB4:.36};
 const sackCredits = [];
 for(let i=0;i<sacksForced;i++){
  const cause = (sk && sk.causes[i]) || 'rush';
  // a sack won by pure rush skill goes to the better rusher; one created by a broken line or locked-down coverage is closer to a coin flip
  const qw = cause==='rush' ? 1 : cause==='ol' ? 0.35 : 0.5;
  const s = weightedPick(sackers.map(x=>({item:x, w:sackW[x]*Math.pow(ovrFactor(bySlot[x].e.ovr,45), qw)})));
  const pl = P(bySlot[s].e, s);
  pl.st.sack = (pl.st.sack||0)+1;
  const ck = cause==='rush' ? 'skE' : cause==='ol' ? 'skO' : 'skC';
  pl.st[ck] = (pl.st[ck]||0)+1;
  sackCredits.push(bySlot[s].e.name);
 }
 const intW = {CB1:1,CB2:.9,CB3:.5,SS:.8,FS:.9,MIKE:.35,WILL:.3};
 const ffW  = {DE1:.8,DE2:.7,MIKE:1,WILL:.9,SS:.6,CB1:.4,DT1:.5};
 const takeaways = [];
 oppGiveaways.forEach(gv=>{
  const W = gv.type==='INT' ? intW : ffW;
  const cands = Object.keys(W).filter(s=>bySlot[s]);
  const s = weightedPick(cands.map(x=>({item:x, w:W[x]*ovrFactor(bySlot[x].e.ovr,30)})));
  const p = P(bySlot[s].e, s);
  if(gv.type==='INT') p.st.dint = (p.st.dint||0)+1; else p.st.ff = (p.st.ff||0)+1;
  gv.takenBy = bySlot[s].e.name; gv.takenByGroup = SLOT_GROUP[s];
  const tk = {type:gv.type, q:gv.q, name:bySlot[s].e.name, group:SLOT_GROUP[s], from:gv.name};
  if(gv.type==='FUM'){   // the forcer often falls on it himself; otherwise a teammate near the ball does
   const recW = {MIKE:1,WILL:.9,SAM:.6,DE1:.7,DE2:.6,DT1:.6,DT2:.5,SS:.7,FS:.6,CB1:.4,CB2:.35,CB3:.2};
   const rs = Math.random()<0.5 ? s : weightedPick(Object.keys(recW).filter(x=>bySlot[x]).map(x=>({item:x, w:recW[x]})));
   const rp = P(bySlot[rs].e, rs); rp.st.fr = (rp.st.fr||0)+1;
   tk.recoveredBy = bySlot[rs].e.name; tk.recGroup = SLOT_GROUP[rs]; gv.recoveredBy = tk.recoveredBy;
  }
  takeaways.push(tk);
 });
 // fumbles the offense recovered itself: a defender may still have forced one
 (extra.oppOwnFum||[]).forEach(()=>{ if(Math.random()<0.5){ const cands = Object.keys(ffW).filter(x=>bySlot[x]); if(!cands.length) return; const s = weightedPick(cands.map(x=>({item:x, w:ffW[x]}))); const p = P(bySlot[s].e, s); p.st.ff = (p.st.ff||0)+1; } });
 // defensive touchdowns: an interception or a fumble taken the distance
 const defScores = [];
 shuffleArr(takeaways.map((_,i)=>i)).slice(0, Math.min(extra.defTD||0, takeaways.length)).forEach(i=>{
  const tk = takeaways[i]; tk.td = true; if(oppGiveaways[i]) oppGiveaways[i].td = true;
  const nm = tk.type==='INT' ? tk.name : (tk.recoveredBy||tk.name);
  const pl = players[nm]; if(pl) pl.st.dtd = (pl.st.dtd||0)+1;
  defScores.push({type:tk.type, name:nm, q:tk.q, from:tk.from});
 });
 // safeties (2 points the defense scored by tackling a ball carrier in his own end zone, or sacking him there)
 const safeties = [];
 for(let i=0;i<(extra.saf||0);i++){
  const s = weightedPick(sackers.map(x=>({item:x, w:sackW[x]*ovrFactor(bySlot[x].e.ovr,45)})));
  const pl = P(bySlot[s].e, s); pl.st.saf = (pl.st.saf||0)+1; safeties.push(bySlot[s].e.name);
 }
 // blocked kicks (field goal, punt or extra point): rare, and mostly a big interior lineman getting a hand up
 const blocks = [], blkW = {DT1:1,DT2:.7,DE1:.4,DE2:.3,SAM:.5,MIKE:.3,CB3:.3,SS:.2};
 for(let i=0, n=poisson(0.07); i<n; i++){
  const cands = Object.keys(blkW).filter(x=>bySlot[x]); if(!cands.length) break;
  const s = weightedPick(cands.map(x=>({item:x, w:blkW[x]}))), kind = weightedPick([{item:'field goal',w:.45},{item:'punt',w:.35},{item:'extra point',w:.20}]);
  const pl = P(bySlot[s].e, s); pl.st.blk = (pl.st.blk||0)+1; blocks.push({kind, name:bySlot[s].e.name});
 }
 return {players:Object.values(players), takeaways, sackCredits, defScores, safeties, blocks};
}

// ---- returners: one non-lineman per team returns kicks and punts. It is a preference, not part of the math; only the yards are tracked. ----
const RETURN_SLOTS = ['RB1','RB2','WR1','WR2','WR3','TE1','TE2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS'];
function returnerCandidates(sm){ return RETURN_SLOTS.filter(sl=>Array.isArray(sm[sl])).map(sl=>({slot:sl, p:sm[sl]})); }
// Returner rating: pure speed is not enough. Acceleration/agility and change of direction help a returner make the first man miss, and awareness picks the hole.
function returnerRating(p){ return 0.50*(p[4]||70) + 0.20*(p[6]||70) + 0.20*(p[7]||70) + 0.10*(p[9]||70); }
function autoReturner(sm){   // the fastest eligible starter, with a small preference for players who are not a team's main weapons
 const c = returnerCandidates(sm).sort((a,b)=> returnerRating(b.p)-returnerRating(a.p))[0];
 return c ? c.p[0] : null;
}
function addReturns(side, team, sm){
 const S = (typeof seasonState!=='undefined') ? seasonState : null;
 let name = S && S.returners && S.returners[team];
 const cands = returnerCandidates(sm);
 let c = cands.find(x=>x.p[0]===name) || cands.find(x=>x.p[0]===autoReturner(sm));
 if(!c) return;
 let pl = side.players.find(p=>p.name===c.p[0]);
 if(!pl){ const e = effEntry(sm, c.slot); pl = {name:c.p[0], slot:c.slot, group:SLOT_GROUP[c.slot], team, ovr:e.ovr, st:{}}; side.players.push(pl); }
 const f = Math.exp((returnerRating(c.p)-82)/45);
 const krN = poisson(1.9), prN = poisson(2.3); let kry = 0, pry = 0;
 for(let i=0;i<krN;i++) kry += clampNum(Math.round(19.5*f*Math.exp(gaussNoise(0.32)) + (Math.random()<0.012?55:0)), 6, 104);
 for(let i=0;i<prN;i++) pry += clampNum(Math.round(7.4*f*Math.exp(gaussNoise(0.55)-0.1) + (Math.random()<0.01?45:0)), -3, 90);
 pl.st.krN = krN; pl.st.krYds = kry; pl.st.prN = prN; pl.st.prYds = pry; pl.st.retYds = kry+pry;
 side.returner = {name:pl.name, krN, kry, prN, pry};
}
function buildGameDetail(g, homeSM, awaySM){
 const r = g.result;
 // how many of each team's touchdowns came from its defense: each turnover the other side gives away has a small chance of being returned for six
 const defTDn = (evs, oppTO)=>{ const tds = evs.filter(e=>e.type==='TD').length; let n=0; for(let i=0;i<oppTO;i++) if(Math.random()<0.085) n++; return Math.min(n, tds); };
 const hDT = defTDn(r.homeEvents, r.awayStats.turnovers), aDT = defTDn(r.awayEvents, r.homeStats.turnovers);
 const hOff = buildOffenseDetail(homeSM, g.home, r.homeStats, r.homeEvents, hDT);
 const aOff = buildOffenseDetail(awaySM, g.away, r.awayStats, r.awayEvents, aDT);
 // why each sack happened: a rush win, a protection breakdown, or coverage holding the ball (from the model's own sack drivers)
 const causesFor = (n, skC)=>{
  const out = [], w = {rush:0.50*Math.exp(6*skC.rush), ol:0.28*Math.exp(6*skC.ol), cov:0.22*Math.exp(6*skC.cov)};
  for(let i=0;i<n;i++) out.push(weightedPick(Object.keys(w).map(k=>({item:k, w:w[k]}))));
  return out;
 };
 const hCauses = causesFor(r.awayStats.sacks, r.exp.away.skC), aCauses = causesFor(r.homeStats.sacks, r.exp.home.skC);
 const hDef = buildDefenseDetail(homeSM, g.home, aOff.giveaways, r.awayStats.sacks, {causes:hCauses}, {defTD:hDT, saf:r.homeEvents.filter(e=>e.type==='SAF').length, oppOwnFum:aOff.ownRecFum});
 const aDef = buildDefenseDetail(awaySM, g.away, hOff.giveaways, r.homeStats.sacks, {causes:aCauses}, {defTD:aDT, saf:r.awayEvents.filter(e=>e.type==='SAF').length, oppOwnFum:hOff.ownRecFum});
 // blame the offensive line: weaker linemen take more of the sacks and pressures
 const blameOL = (offDet, causes, defDet)=>{
  const ol = offDet.players.filter(p=>p.group==='OL'); if(!ol.length) return;
  const pickOL = ()=> weightedPick(ol.map(x=>({item:x, w:Math.exp(-((x.ovr||80)-80)/18)})));
  const share = {ol:1, rush:0.55, cov:0.25};
  causes.forEach(c=>{ if(Math.random()<share[c]){ const x = pickOL(); x.st.sa = (x.st.sa||0)+1; x.st.pa = (x.st.pa||0)+1; } });
  const press = defDet.players.reduce((a,p)=>a+(p.st.hur||0),0);
  for(let i=0;i<press;i++){ if(Math.random()<0.85){ const x = pickOL(); x.st.pa = (x.st.pa||0)+1; } }
 };
 blameOL(aOff, hCauses, hDef); blameOL(hOff, aCauses, aDef);
 // strength of the protection each pass rusher faced (so a sack total can be read against the line he was facing)
 hDef.players.forEach(p=>{ if(p.group==='DL') p.st.opOL = Math.round(r.ratings.A.olPass*10)/10; });
 aDef.players.forEach(p=>{ if(p.group==='DL') p.st.opOL = Math.round(r.ratings.H.olPass*10)/10; });
 const home = {players:hOff.players.concat(hDef.players), tdScorers:hOff.tdScorers, giveaways:hOff.giveaways, takeaways:hDef.takeaways, sackCredits:hDef.sackCredits, plays:hOff.plays, sackCauses:{made:hCauses, taken:aCauses}, defScores:hDef.defScores, safeties:hDef.safeties, blocks:hDef.blocks, ownRecFum:hOff.ownRecFum};
 const away = {players:aOff.players.concat(aDef.players), tdScorers:aOff.tdScorers, giveaways:aOff.giveaways, takeaways:aDef.takeaways, sackCredits:aDef.sackCredits, plays:aOff.plays, sackCauses:{made:aCauses, taken:hCauses}, defScores:aDef.defScores, safeties:aDef.safeties, blocks:aDef.blocks, ownRecFum:aOff.ownRecFum};
 addReturns(home, g.home, homeSM); addReturns(away, g.away, awaySM);
 [home, away].forEach(side=> side.players.forEach(p=>{ p.line = gameStatLine(p.group, p.st); p.raw = statImpact(p.st); p.impact = gameZ(p.slot, p.raw); }));
 const all = home.players.concat(away.players);
 const ballScore = p => p.impact + (GAME_BALL_BIAS[p.group]||0);
 // The game ball (and the Super Bowl MVP) belongs to the winning team, unless a player on the losing team put up a 90+ performance grade.
 const winTeam = r.homeScore>r.awayScore ? g.home : r.awayScore>r.homeScore ? g.away : null;
 const perfGrade = p => 60 + 5.5*p.impact;
 let pool = winTeam ? all.filter(p=> p.team===winTeam || perfGrade(p)>=90) : all;
 if(!pool.length) pool = all;
 const mvp = pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0]);
 mvp.perfGrade = Math.round(perfGrade(mvp));
 return {home, away, mvp};
}

function notablePlayers(side){
 const off = side.players.filter(p=>['QB','RB','WR','TE'].includes(p.group));
 const qb = off.find(p=>p.group==='QB');
 const rb = off.filter(p=>p.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0];
 const recs = off.filter(p=>p.group==='WR'||p.group==='TE').sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0)).slice(0,2);
 const def = side.players.filter(p=>['DL','LB','DB'].includes(p.group)).sort((a,b)=>b.impact-a.impact).slice(0,3);
 return [qb, rb].concat(recs).concat(def).filter(Boolean);
}

// ---- scoring: choose a realistic mix of TDs/FGs for a final score, spread over four quarters ----
const _decompCache = {};
function scoreDecompositions(S, ag){
 ag = ag||'balanced'; const AG = AGGR_INFO[ag]; const key = S+'|'+ag;
 if(_decompCache[key]) return _decompCache[key];
 const LAMBDA = {td:2.6*AG.td, fg:1.05*AG.fg, six:0.07*AG.two, eight:0.022*AG.two, saf:0.012};
 const fact = n => { let f=1; for(let i=2;i<=n;i++) f*=i; return f; };
 const combos = [];
 for(let n8=0;n8*8<=S && n8<=3;n8++) for(let n6=0;n8*8+n6*6<=S && n6<=3;n6++) for(let n2=0;n2<=2 && n8*8+n6*6+n2*2<=S;n2++)
  for(let n7=0;n8*8+n6*6+n2*2+n7*7<=S;n7++){
   const rem = S - (n8*8+n6*6+n2*2+n7*7);
   if(rem%3!==0) continue;
   const n3 = rem/3;
   const w = Math.pow(LAMBDA.td,n7)/fact(n7) * Math.pow(LAMBDA.fg,n3)/fact(n3) * Math.pow(LAMBDA.six,n6)/fact(n6) * Math.pow(LAMBDA.eight,n8)/fact(n8) * Math.pow(LAMBDA.saf,n2)/fact(n2);
   combos.push({n7,n3,n6,n8,n2,w});
  }
 _decompCache[key] = combos;
 return combos;
}
// A team that trails by 8 or 11 late in the game goes for 2 after its touchdown (a 2-Pt Conv ties it, or leaves it a field goal from tying). Teams swap their own scoring times, so the final score never changes.
function lateTwoPt(hEv, aEv){
 const all = hEv.map(e=>({e,side:'h'})).concat(aEv.map(e=>({e,side:'a'}))).sort((x,y)=>x.e.q-y.e.q||x.e.t-y.e.t);
 let h=0, a=0;
 all.forEach(x=>{
  const mine = x.side==='h'?h:a, theirs = x.side==='h'?a:h, trail = theirs-mine, evs = x.side==='h'?hEv:aEv;
  if(x.e.type==='TD' && x.e.q===4 && (trail===8 || trail===11) && x.e.pts===7){
   const other = evs.find(o=>o!==x.e && o.type==='TD' && (o.pts===8 || o.pts===6) && o.q<4 || (o!==x.e && o.type==='TD' && (o.pts===8||o.pts===6) && !o.forced));
   if(other){ const q=other.q, t=other.t; other.q=x.e.q; other.t=x.e.t; x.e.q=q; x.e.t=t; other.forced = true; }
  }
  if(x.side==='h') h += x.e.pts; else a += x.e.pts;
 });
 hEv.sort((x,y)=>x.q-y.q||x.t-y.t); aEv.sort((x,y)=>x.q-y.q||x.t-y.t);
}
function makeScoringEvents(score, ag){
 const events = [];
 if(score>0){
  const combos = scoreDecompositions(score, ag);
  if(combos.length){
   const c = weightedPick(combos.map(x=>({item:x, w:x.w})));
   for(let i=0;i<c.n7;i++) events.push({pts:7,type:'TD'});
   for(let i=0;i<c.n6;i++) events.push({pts:6,type:'TD'});
   for(let i=0;i<c.n8;i++) events.push({pts:8,type:'TD'});
   for(let i=0;i<c.n3;i++) events.push({pts:3,type:'FG'});
   for(let i=0;i<c.n2;i++) events.push({pts:2,type:'SAF'});
  } else { events.push({pts:score, type:'OTH'}); }   // e.g. a 1-point game: no clean TD/FG mix exists
 }
 events.forEach(e=>{ e.ag = ag||'balanced'; e.q = weightedPick([{item:1,w:1},{item:2,w:1.05},{item:3,w:1},{item:4,w:1.15}]); e.t = Math.random(); });
 events.sort((a,b)=> a.q-b.q || a.t-b.t);
 return events;
}

// ---- "how it was decided": which units actually moved the result, told from what happened in the game ----
function factorParagraph(g){
 const r = g.result, d = g.detail, ex = r.exp, rt = r.ratings;
 if(!ex || !rt) return '';
 const S = (typeof seasonState!=='undefined' && seasonState) ? seasonState : null;
 const other = s => s==='home' ? 'away' : 'home';
 const teamOf = s => s==='home' ? g.home : g.away;
 const T = s => 'the '+nick(teamOf(s));
 const statsOf = s => s==='home' ? r.homeStats : r.awayStats;
 const grade = (s, unit) => {
  const rating = (s==='home' ? rt.H : rt.A)[unit];
  const rank = S && S.unitRanks && S.unitRanks[teamOf(s)] ? S.unitRanks[teamOf(s)][unit] : null;
  return `${rating.toFixed(1)}${rank ? `, #${rank} of 32` : ''}`;
 };
 // gather each unit's total point swing (owner's perspective) across run / pass / turnover / sack channels
 const agg = {};
 ['home','away'].forEach(offSide=>{
  ex[offSide].swings.forEach(sw=>{
   const ownerSide = sw.owner==='off' ? offSide : other(offSide);
   const key = ownerSide+'|'+sw.unit;
   agg[key] = agg[key] || {ownerSide, unit:sw.unit, pts:0};
   agg[key].pts += sw.pts;
  });
 });
 const sortedAll = Object.values(agg).filter(e=>Math.abs(e.pts)>=0.6).sort((a,b)=>Math.abs(b.pts)-Math.abs(a.pts));
 const seenUnits = new Set(), ranked = [];
 sortedAll.forEach(e=>{ if(ranked.length<3 && !seenUnits.has(e.unit)){ seenUnits.add(e.unit); ranked.push(e); } });
 const sumK = (side,k,grp)=> side.players.filter(p=>!grp||p.group===grp).reduce((a,p)=>a+(p.st[k]||0),0);
 const topBy = (arr,f)=> arr.slice().sort((a,b)=>f(b)-f(a))[0];
 const pl1 = (n,w)=> `${n} ${w}${n===1?'':'s'}`;

 // what actually happened for one unit, with its share of the final margin
 function outcome(e){
  const N = T(e.ownerSide), opp = other(e.ownerSide), O = T(opp), good = e.pts>=0, pts = Math.abs(e.pts).toFixed(1);
  const desc = UNIT_INFO[e.unit].short, gr = grade(e.ownerSide, e.unit);
  const mine = d[e.ownerSide], theirs = d[opp], my = statsOf(e.ownerSide), op = statsOf(opp);
  const swing = good ? pick([`, worth about +${pts} points to ${N}`, `, a swing of roughly +${pts} points for ${N}`, `, about +${pts} points on the scoreboard`])
                     : pick([`, a cost of about ${pts} points`, `, which took roughly ${pts} points off ${poss(N)} total`, `, about −${pts} points on the scoreboard`]);
  const car = mine.plays ? mine.plays.rush : null, ypc = car ? (my.rushYards/Math.max(car,1)).toFixed(1) : null;
  switch(e.unit){
   case 'olRun': case 'rb': {
    const rb = topBy(mine.players.filter(p=>p.group==='RB'), p=>p.st.rushYds||0), ol = topBy(mine.players.filter(p=>p.group==='OL'), p=>p.st.pk||0);
    if(good) return `${capFirst(poss(N))} ${desc} (${gr}) carried its weight: ${my.rushYards} rushing yards${car?` on ${car} carries (${ypc} a carry)`:''}${rb&&rb.st.rushYds?`, ${rb.name} getting ${rb.st.rushYds} of them`:''}${ol&&ol.st.pk>=4?` and ${ol.name} piling up ${ol.st.pk} pancakes`:''}${swing}`;
    return `${capFirst(poss(N))} ${desc} (${gr}) never found a rhythm: ${my.rushYards} rushing yards${car?` on ${car} carries (${ypc} a carry)`:''}${swing}`;
   }
   case 'olPass': {
    const ol = mine.players.filter(p=>p.group==='OL'), worst = topBy(ol, p=>(p.st.sa||0)*2+(p.st.pa||0)), press = sumK(mine,'pa','OL');
    if(good) return `${capFirst(poss(N))} pass protection (${gr}) kept the pocket clean: ${pl1(my.sacks,'sack')} and ${pl1(press,'pressure')} allowed${swing}`;
    return `${capFirst(poss(N))} pass protection (${gr}) broke down: ${pl1(my.sacks,'sack')} and ${pl1(press,'pressure')} allowed${worst&&((worst.st.sa||0)+(worst.st.pa||0))>=2?`, with ${worst.name} taking the worst of it`:''}${swing}`;
   }
   case 'passRush': {
    const dl = mine.players.filter(p=>p.group==='DL'||p.group==='LB'), lead = topBy(dl, p=>p.st.sack||0), press = sumK(mine,'hur'), made = (mine.sackCauses&&mine.sackCauses.made)||[];
    const byOl = made.filter(c=>c==='ol').length, byCov = made.filter(c=>c==='cov').length;
    const oqb = topBy(theirs.players.filter(p=>p.group==='QB'), p=>p.st.att||p.st.passAtt||0), qn = oqb?oqb.name:'the opposing quarterback';
    const homeTxt = op.sacks===0 ? `never got home to ${qn}` : op.sacks===1 ? `only got home to ${qn} once` : `got home to ${qn} ${op.sacks} times`;
    if(good) return `${capFirst(poss(N))} pass rush (${gr}) ${homeTxt} and hurried ${pl1(press,'more dropback')}${lead&&lead.st.sack>=2?`, ${lead.name} getting ${lead.st.sack} of the sacks`:''}${swing}`;
    return `${capFirst(poss(N))} pass rush (${gr}) was held in check: it ${homeTxt} and made ${pl1(press,'pressure')}${byOl>0&&op.sacks>0?`, and ${numWord(byOl)} of the sacks came only because the protection broke down`:''}${swing}`;
   }
   case 'frontRun': {
    const dl = mine.players.filter(p=>p.group==='DL'||p.group==='LB'), lead = topBy(dl, p=>(p.st.tfl||0)), car2 = theirs.plays ? theirs.plays.rush : null, y2 = car2 ? (op.rushYards/Math.max(car2,1)).toFixed(1) : null;
    if(good) return `${capFirst(poss(N))} run defense (${gr}) shut the lanes: ${O} managed ${op.rushYards} rushing yards${car2?` (${y2} a carry)`:''}${lead&&lead.st.tfl>=2?` and ${lead.name} had ${lead.st.tfl} tackles for loss`:''}${swing}`;
    return `${capFirst(poss(N))} run defense (${gr}) gave ground: ${O} ran for ${op.rushYards} yards${car2?` (${y2} a carry)`:''}${swing}`;
   }
   case 'coverage': {
    const picks = theirs.giveaways.filter(x=>x.type==='INT').length, pd = sumK(mine,'pd');
    if(good) return `${capFirst(poss(N))} coverage (${gr}) ${op.passYards<=195?'smothered':'kept in check'} the passing game: ${O} threw for ${op.passYards} yards with ${pl1(picks,'interception')} and ${pd} pass${pd===1?'':'es'} broken up${swing}`;
    return `${capFirst(poss(N))} coverage (${gr}) let receivers run free: ${O} threw for ${op.passYards} yards${picks?` despite ${pl1(picks,'interception')}`:''}${swing}`;
   }
   case 'qb': {
    const qb = mine.players.find(p=>p.group==='QB'); if(!qb) return `${capFirst(poss(N))} quarterback play (${gr}) mattered${swing}`;
    const s = qb.st, rate = passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0), td = s.passTD||0, it = s.int||0, line = `${s.passYds||0} yards, ${pl1(td,'touchdown')}${it?` and ${pl1(it,'interception')}`:' and no turnovers'}`;
    if(good && (td>=2 || rate>=90)) return `${qb.name} backed up a ${gr} quarterback grade with ${line}${swing}`;
    if(good) return `${qb.name} played clean football (${line}), but the drives stalled before they reached the end zone`;
    if(rate>=85) return `${qb.name} rose above a ${gr} quarterback grade with ${line}`;
    if((qb.ovr||0)<85) return `${capFirst(poss(N))} quarterback play (${gr}) never got going: ${line}${s.sackd?`, sacked ${s.sackd} time${s.sackd===1?'':'s'}`:''}${swing}`;
    return `${qb.name} had little help from a ${gr} quarterback grade: ${line}${s.sackd?`, sacked ${s.sackd} time${s.sackd===1?'':'s'}`:''}${swing}`;
   }
   case 'rec': {
    const rcv = mine.players.filter(p=>p.group==='WR'||p.group==='TE'), rec = rcv.reduce((a,p)=>a+(p.st.rec||0),0), tgt = rcv.reduce((a,p)=>a+(p.st.tgt||0),0), top = topBy(rcv, p=>p.st.recYds||0), pct = Math.round(100*rec/Math.max(tgt,1));
    if(good) return `${capFirst(poss(N))} receivers (${gr}) won their routes: ${rec} catches on ${tgt} targets for ${my.passYards} yards${top&&top.st.recYds?`, led by ${top.name} (${top.st.recYds})`:''}${swing}`;
    return `${capFirst(poss(N))} receivers (${gr}) struggled to separate: ${rec} catches on ${tgt} targets (${pct}%)${top&&top.st.recYds?` and nobody topped ${top.st.recYds} yards`:''}${swing}`;
   }
   default: {
    const k = mine.players.find(p=>p.group==='K');
    return k ? `${k.name} made ${pl1(k.st.fg||0,'field goal')}${swing}` : `${capFirst(N)} ${desc} (${gr}) mattered${swing}`;
   }
  }
 }
 const hp = r.proj.home, ap = r.proj.away, gap = Math.abs(hp-ap), fav = hp>=ap ? 'home' : 'away';
 const winnerSide = r.homeScore>r.awayScore ? 'home' : r.awayScore>r.homeScore ? 'away' : null, margin = Math.abs(r.homeScore-r.awayScore);
 let lead;
 if(!winnerSide) lead = `The ratings had this as ${gap<1?'a toss-up':'a '+gap.toFixed(1)+'-point edge for '+T(fav)}, and it ended level.`;
 else if(gap<1) lead = `The ratings had this as a toss-up, and ${T(winnerSide)} took it by ${margin}.`;
 else if(winnerSide===fav) lead = `The ratings gave ${T(fav)} an edge of about ${gap.toFixed(1)} points, and they won by ${margin}.`;
 else lead = `The ratings gave ${T(fav)} an edge of about ${gap.toFixed(1)} points, but ${T(winnerSide)} flipped it and won by ${margin}.`;
 const parts = [lead];
 if(ranked.length) parts.push(ranked.map(outcome).join('. ') + '.');
 // swing the unit grades cannot know about
 const toH = r.homeStats.turnovers, toA = r.awayStats.turnovers;
 if(Math.abs(toH-toA)>=2){
  const loser = toH>toA ? 'home' : 'away', winnerS = other(loser);
  const many = toH>toA ? toH : toA, few = toH>toA ? toA : toH;
  parts.push(`The turnover battle swung it further: ${T(loser)} turned it over ${many} times while ${T(winnerS)} ${few===0 ? "never gave it away" : `gave it away only ${few===1?'once':few+' times'}`}, a swing worth roughly ${(3.0*Math.abs(toH-toA)).toFixed(0)} points.`);
 }
 return `<b>How it was decided:</b> ` + parts.join(' ');
}

// ---- narrative recap: a story of the game, not a stat dump ----
function longestRun(result){
 const evs = result.homeEvents.map(e=>({...e,side:'home'})).concat(result.awayEvents.map(e=>({...e,side:'away'}))).sort((a,b)=>a.q-b.q||a.t-b.t);
 let best=null, cur=null;
 evs.forEach(e=>{
  if(cur && cur.side===e.side){ cur.pts+=e.pts; cur.endQ=e.q; } else cur={side:e.side, pts:e.pts, startQ:e.q, endQ:e.q};
  if(!best || cur.pts>best.pts) best={...cur};
 });
 return best;
}
function capFirst(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
function poss(t){ return /s$/.test(t) ? t+"'" : t+"'s"; }

// ---- the finish: walk-off scores and last-gasp stops, told with some drama ----
function hashPick(g, salt, arr){ let h = 0; const k = g.home+'|'+g.away+'|'+(g.week||g.roundLabel||'')+'|'+g.result.homeScore+'-'+g.result.awayScore+'|'+salt; for(let i=0;i<k.length;i++) h = (h*31 + k.charCodeAt(i))>>>0; return arr[h%arr.length]; }
function hashInt(g, salt, lo, hi){ let h = 0; const k = g.home+g.away+g.result.homeScore+salt; for(let i=0;i<k.length;i++) h = (h*131 + k.charCodeAt(i))>>>0; return lo + h%(hi-lo+1); }
function clockLeft(e){ const secs = Math.max(0, Math.round((1-e.t)*(e.q>=5?600:900))); return `${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`; }
const qTxt = q => q>=5 ? 'overtime' : `the ${ordinalQ(q)} quarter`;
function clockSecs(e){ return Math.max(0, Math.round((1-e.t)*(e.q>=5?600:900))); }
function clockStr(sec){ return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`; }
// ---- the end of a close game, told completely: the decisive play AND what the other side did with its last chance ----
function dramaticEnding(g, ctx){
 const r = g.result, d = g.detail; if(!r || !d) return '';
 const hs = r.homeScore, as = r.awayScore; if(hs===as) return '';
 const evs = r.homeEvents.map(e=>({...e, side:'home'})).concat(r.awayEvents.map(e=>({...e, side:'away'}))).sort((a,b)=> a.q-b.q || a.t-b.t);
 if(!evs.length) return '';
 const W = hs>as ? 'home' : 'away', L = W==='home' ? 'away' : 'home', margin = Math.abs(hs-as);
 const wn = 'the '+nick(g[W]), ln = 'the '+nick(g[L]), WN = capFirst(wn), LN = capFirst(ln);
 const last = evs[evs.length-1];
 const before = {home:hs, away:as}; before[last.side] -= last.pts;
 const sb = !!(ctx && ctx.champion), po = !!g.roundLabel;
 const late = last.q>=5 || (last.q===4 && last.t>=0.5);
 const wPl = d[W].players, lPl = d[L].players;
 const top = (arr, f)=> arr.slice().sort((a,b)=>f(b)-f(a))[0];
 const kicker = wPl.find(p=>p.group==='K'), lk = lPl.find(p=>p.group==='K'), lqb = lPl.find(p=>p.group==='QB');
 const lrec = top(lPl.filter(p=>p.group==='WR'||p.group==='TE'), p=>p.st.recYds||0);
 const dl = top(wPl.filter(p=>p.group==='DL'||p.group==='LB'), p=>(p.st.sack||0)*2+(p.ovr||70)/100), db = top(wPl.filter(p=>p.group==='DB'), p=>(p.st.dint||0)*3+(p.st.pd||0)+(p.ovr||70)/100);
 const fin = `${Math.max(hs,as)}–${Math.min(hs,as)}`, B = n=>`<b>${n}</b>`;
 const yl = hashInt(g,'yl',21,48), gain = hashInt(g,'gain',9,27), ex = sb||po;
 // what the trailing team did with its last possession (needs: a field goal, or a touchdown)
 const lastDrive = (secs, start, m)=>{
  const needFG = m<=3, qbn = lqb?B(lqb.name):'the quarterback', recn = lrec?lrec.name:'his top target', dist = hashInt(g,'fgd',46,62);
  const opts = [];
  if(dl && (dl.st.sack||0)>0) opts.push(`${qbn} drove ${ln} into ${wn} territory with a ${gain}-yard completion to ${recn}, but ${B(dl.name)} flew in untouched for a sack that knocked them back, and a fourth-down throw landed in the dirt. The ${nick(g[W])} take over and kneel it out.`);
  if(db && ((db.st.dint||0)>0)) opts.push(`${qbn} pushed ${ln} across midfield, then forced one into coverage and ${B(db.name)} cut in front of it for the interception. That was the ballgame.`);
  if(db && ((db.st.pd||0)>0)) opts.push(`${qbn} got ${ln} to the ${wn.replace('the ','')} ${yl}, but ${B(db.name)} got a hand on the pass in the end zone, and the fourth-down try to ${recn} never had a chance.`);
  if(needFG && lk) opts.push(`${LN} ran the clock down to ${Math.max(3,Math.min(secs-5,12))} seconds and sent out ${B(lk.name)} for a ${dist}-yard try that drifted wide right.`);
  opts.push(`${qbn} had ${ln} moving, but the clock beat them: a completion short of the sideline kept it in bounds, and time expired before ${needFG?'the field-goal unit could get set':'they could get another snap off'}.`);
  opts.push(`On the last snap ${qbn} heaved it toward the end zone and ${db?B(db.name):'a defender'} batted it down as time expired.`);
  return `${LN} got the ball back on their own ${start} with ${clockStr(secs)} left, needing ${m<=2?'a field goal to win':m===3?'a field goal to tie':m<=8?'a touchdown':'a miracle'}. ${hashPick(g,'ld',opts)}`;
 };
 const out = [];
 // 1. a walk-off: the winner's last score took the lead (or tied it and won) late
 if(last.side===W && late && before[W] <= before[L]){
  const trailing = before[L]-before[W], secs = clockSecs(last), ot = last.q>=5 || r.ot;
  let head;
  if(last.type==='FG'){
   const dist = hashInt(g,'fg',29,57);
   head = `<b>${ot?'WALK-OFF FIELD GOAL IN OVERTIME!':'A GAME-WINNING FIELD GOAL!'}</b> ${kicker?B(kicker.name):`The ${nick(g[W])} kicker`} drilled it from ${dist} yards${ot?'':` with ${clockStr(secs)} left`}, and ${wn} ${trailing>0?`erased a ${trailing}-point deficit`:'broke a tie'} to win ${fin}!`;
  } else {
   const wTD = (r[W+'Events']||[]).filter(e=>e.type==='TD' && !e.defensive), li = wTD.findIndex(e=>e.t===last.t && e.q===last.q), sc = (li>=0 && (d[W].tdScorers||[])[li]) || ((d[W].tdScorers||[]).length ? hashPick(g,'td',d[W].tdScorers) : null), nm = sc ? (sc.name||sc) : 'the ball carrier';
   head = `<b>${ot?'WALK-OFF TOUCHDOWN!':'A GAME-WINNING TOUCHDOWN!'}</b> ${B(nm)} found the end zone ${ot?'in overtime':`with ${clockStr(secs)} left`} and ${wn} ${trailing>0?`came back from ${trailing} down`:'took the lead for good'}, ${fin}!`;
  }
  out.push(head);
  if(!ot){
   if(secs<=8) out.push(`There was no time for a real answer: ${LN} got one last snap and the pass fell incomplete as the clock hit zero.`);
   else out.push(lastDrive(secs, hashInt(g,'st',20,31), margin));
  } else out.push(`${last.type==='TD' ? `${LN} never touch the ball again: under current NFL overtime rules a touchdown on the opening possession ends the game.` : `${LN} got their offensive possession, ${wn} answered, and that ended the extra period under the overtime rules (both teams possess unless a touchdown ends it first).`}`);
 }
 // 2. the last-gasp stop: the loser still had a chance (one score behind) and the defense closed the door
 if(!out.length && margin <= (po?8:6)){
  const secs = hashInt(g,'sec',48,132);
  out.push(`<b>THE FINAL STOP!</b> ${lastDrive(secs, hashInt(g,'st',18,30), margin)} ${WN} hold on, ${fin}${ex?'!':'.'}`);
 }
 if(!out.length) return '';
 let txt = out.join(' ');
 if(sb) txt += ` <b>${WN.toUpperCase()} ARE SUPER BOWL CHAMPIONS!</b>`;
 else if(po && margin<=8) txt = `<b>PLAYOFF DRAMA!</b> ` + txt;
 return txt;
}
// ---- paragraph 2: turnovers and the plays that swing games ----
function turnoverParagraph(g, collapse, raw){
 const r = g.result, d = g.detail, T = s => 'the '+nick(s==='home'?g.home:g.away), other = s => s==='home'?'away':'home';
 const info = ['home','away'].map(s=>({s, n:(s==='home'?r.homeStats:r.awayStats).turnovers, ints:d[s].giveaways.filter(x=>x.type==='INT'), fums:d[s].giveaways.filter(x=>x.type==='FUM')}));
 const total = info[0].n+info[1].n, items = [], bits = { push:(txt,q)=>items.push({q:q||1, i:items.length, t:txt}) };
 const tdTag = gv => gv.td ? ' — and he took it the distance for a touchdown!' : '';
 info.sort((a,b)=>b.n-a.n).forEach((inf,idx)=>{
  const s = inf.s, turning = collapse===s;
  if(inf.ints.length>=2){
   const picks = inf.ints.map(x=>`${x.takenBy||'a defender'} (${x.q>=5?'OT':'Q'+x.q})`), qb = inf.ints[0].name, n = inf.ints.length;
   const td = inf.ints.find(x=>x.td);
   bits.push(hashPick(g,'i2'+s,[
    `${qb} threw ${numWord(n)} interceptions, to ${joinList(picks)}${td?`, and ${td.takenBy} took one back for six`:''}.`,
    `It was a rough day for ${qb}: ${numWord(n)} passes went to the other team (${joinList(picks)})${td?`, one of them returned for a touchdown by ${td.takenBy}`:''}.`,
    `${joinList(picks)} each came away with a ${qb} throw.${td?` ${td.takenBy}'s went for a touchdown.`:''}`
   ]), inf.ints[0].q);
  } else if(inf.ints.length===1){
   const x = inf.ints[0], q = qTxt(x.q);
   bits.push(turning && x.q===4 ? `The turning point came when ${x.name} was intercepted by ${x.takenBy||'the defense'} in the fourth quarter${tdTag(x)||'.'}` : hashPick(g,'i1'+s,[
    `${x.takenBy||'The defense'} jumped a ${x.name} throw in ${q} for the interception${tdTag(x)||'.'}`,
    `${x.name} was picked off by ${x.takenBy||'the defense'} in ${q}${tdTag(x)||'.'}`,
    `${x.name} tried to squeeze one in during ${q} and ${x.takenBy||'the defense'} made him pay${tdTag(x)||'.'}`
   ]), x.q);
  }
  inf.fums.forEach((f,j)=>{
   const q = qTxt(f.q), forcer = f.takenBy, rec = f.recoveredBy || f.takenBy, same = rec===forcer;
   const td = tdTag(f);
   const v = same ? [
    `${forcer} punched the ball out of ${f.name}'s grasp in ${q} and pounced on it himself${td||'.'}`,
    `${forcer} ripped it loose from ${f.name} in ${q} and fell on the loose ball himself${td||'.'}`,
    `${f.name} was stripped by ${forcer} in ${q}, and the same defender recovered${td||'.'}`
   ] : [
    `${forcer} punched the ball out of ${f.name}'s grasp in ${q}, and ${rec} fell on it${td||'.'}`,
    `${forcer} ripped it loose from ${f.name} in ${q} and ${rec} came up with the football${td?' — and he took it the distance for a touchdown':'.'}`,
    `${f.name} was stripped by ${forcer} in ${q}, and ${rec} scooped it up${td||'.'}`
   ];
   if(f.group==='QB') v.push(`${f.name} held the ball too loosely in ${q}; ${forcer} knocked it free and ${same?'recovered it himself':rec+' recovered'}${td||'.'}`);
   bits.push(turning && f.q===4 ? `The turning point came when ${forcer} stripped ${f.name} in the fourth quarter and ${same?'recovered it himself':rec+' recovered'}${td||'.'}` : hashPick(g,'f'+s+j,v), f.q);
  });
 });
 // the detail pass can be thinner than the stat line (game script trims); name each giveaway from the box score if so
 const statsNotes = [];
 info.forEach(inf=>{
  if(inf.ints.length || inf.fums.length || inf.n<=0) return;
  const opp = d[other(inf.s)].players;
  const defs = opp.filter(p=>(p.st.dint||0)>0).concat(opp.filter(p=>(p.st.ff||0)>0));
  const givers = d[inf.s].players.filter(p=>(p.st.int||0)>0).concat(d[inf.s].players.filter(p=>(p.st.ff||0)>0)).slice(0, inf.n + 2);
  let k = 0;
  givers.forEach(qb=>{
   const df = defs[k++] || null, kind = (qb.st.int||0) ? 'an interception' : 'a fumble';
   statsNotes.push(`${qb.name} lost the ball (${kind})${df ? `, ${df.name} came away with it` : ''}.`);
  });
 });
 const a = info.find(x=>x.s==='home'), b = info.find(x=>x.s==='away'), diff = Math.abs(a.n-b.n);
 // every turnover names the players involved: the head is the only turnover text most readers read
 const gvName = x => {
  const when = x.q>=5 ? 'in overtime' : `in the ${ordinalQ(x.q)} quarter`;
  if(x.type==='INT') return `${x.name} was intercepted by ${x.takenBy||'a defender'} ${when}`;
  return `${x.name} lost a fumble${x.takenBy?`, forced by ${x.takenBy}`:''}${x.recoveredBy?`, recovered by ${x.recoveredBy}`:''} ${when}`;
 };
 const gvList = (s, max) => {
  const gv = ((d[s] && d[s].giveaways) || []).filter(x=>x.type==='INT'||x.type==='FUM');
  if(!gv.length) return '';
  const parts = gv.slice(0, max).map(gvName);
  if(gv.length>max) parts.push(`${gv.length-max} more`);
  return parts.join('; ');
 };
 let head;
 if(total===0) head = hashPick(g,'t0',['Neither team gave the ball away, so the game came down to execution.','Not a single turnover: both teams protected the football.']);
 else if(diff>=2){
  const win = a.n<b.n?'home':'away', lose = other(win), list = gvList(lose, 3);
  head = `${capFirst(T(win))} won the turnover battle ${Math.max(a.n,b.n)}–${Math.min(a.n,b.n)}, a swing worth roughly ${3*diff} points${list?`: ${list}`:''}.`;
 }
 else if(diff===0){
  const hl = gvList('home',2), al = gvList('away',2);
  head = `The takeaways evened out at ${a.n} apiece${(hl||al)?`: ${hl}${(hl&&al)?'; ':''}${al}`:''}.`;
 }
 else {
  const win = a.n<b.n?'home':'away', lose = other(win), list = gvList(lose, 3);
  head = list ? `${capFirst(T(win))} came out one turnover ahead: ${list}.`
              : `${capFirst(T(win))} came out one turnover ahead, and how it happened is in the play-by-play above.`;
 }
 // swing plays that are not turnovers: safeties, blocked kicks, defensive scores not already told above
 ['home','away'].forEach(s=>{
  const safQs = (r[s+'Events']||[]).filter(e=>e.type==='SAF').map(e=>e.q);
  (d[s].safeties||[]).forEach((nm,i)=> bits.push(`${nm} dropped a ball carrier in the end zone for a safety, two points for ${T(s)}.`, safQs[i]||4));
  (d[s].blocks||[]).forEach((bk,i)=> bits.push(`${bk.name} got a hand on ${bk.kind==='extra point'?'an':'a'} ${bk.kind} and blocked it for ${T(s)}.`, hashPick(g,'bq'+s+i,[1,2,3,4])));
 });

 if(raw) return {head, items:items.slice(), statsNotes};
 return `<b>Turnovers and swing plays:</b> ${head} ${items.sort((x,y)=>x.q-y.q||x.i-y.i).map(x=>x.t).join(' ')}`.trim();
}
// ---- paragraph 3: the stars ----
function starsParagraph(g, blow){
 const d = g.detail, T = s => 'the '+nick(s==='home'?g.home:g.away), r = g.result;
 const cand = [];
 ['home','away'].forEach(s=>{
  d[s].players.filter(p=>p.impact>=1.0 && !p.slot.startsWith('OT') && !p.slot.startsWith('OG') && p.slot!=='C').sort((a,b)=>b.impact-a.impact).slice(0,2).forEach(p=>cand.push({p, s}));
 });
 cand.sort((a,b)=>b.p.impact-a.p.impact);
 const pick4 = cand.slice(0,4), ex = blow ? '!' : '.';
 const strong = blow ? ['was unstoppable','put on a show','dominated','was a one-man wrecking crew'] : ['was the difference','played a big role','delivered','had a strong day'];
 const lines = pick4.map((c,i)=>{
  const p = c.p, s = p.st, who = `${p.name} (${nick(c.s==='home'?g.home:g.away)})`;
  const v = hashPick(g,'sv'+i, strong);
  const extra = [];
  if(s.tpc) extra.push(`and converted a 2-Pt Conv`);
  if(p.group==='QB') return `${who} ${v}: ${s.cmp||0}/${s.att||0} for ${s.passYds||0} yards, ${s.passTD||0} touchdown${(s.passTD||0)===1?'':'s'}${s.int?` and ${s.int} interception${s.int===1?'':'s'}`:''}${s.rushYds>=20?`, plus ${s.rushYds} on the ground`:''}${extra.length?', '+extra[0]:''}${ex}`;
  if(p.group==='RB') return `${who} ${v}, rushing for ${s.rushYds||0} yards on ${s.car||0} carries${s.rushTD?` with ${s.rushTD} touchdown${s.rushTD===1?'':'s'}`:''}${s.recYds>=30?` and adding ${s.recYds} through the air`:''}${extra.length?', '+extra[0]:''}${ex}`;
  if(p.group==='WR'||p.group==='TE') return `${who} ${v}, hauling in ${s.rec||0} of ${s.tgt||0} targets for ${s.recYds||0} yards${s.recTD?` and ${s.recTD} touchdown${s.recTD===1?'':'s'}`:''}${extra.length?', '+extra[0]:''}${ex}`;
  if(p.group==='K') return `${who} stayed perfect on ${s.fg||0} field goal${(s.fg||0)===1?'':'s'}${ex}`;
  const bits = [];
  if(s.sack) bits.push(`${s.sack} sack${s.sack===1?'':'s'}`); if(s.dint) bits.push(`${s.dint} interception${s.dint===1?'':'s'}`); if(s.dtd) bits.push(`${s.dtd===1?'a':s.dtd} defensive touchdown${s.dtd===1?'':'s'}`);
  if(s.ff) bits.push(`${s.ff} forced fumble${s.ff===1?'':'s'}`); if(s.fr) bits.push(`${s.fr} fumble recover${s.fr===1?'y':'ies'}`); if(s.tfl) bits.push(`${s.tfl} tackle${s.tfl===1?'':'s'} for loss`); if(s.pd) bits.push(`${s.pd} pass${s.pd===1?'':'es'} defensed`); if(s.blk) bits.push(`a blocked kick`); if(s.saf) bits.push(`a safety`);
  bits.push(`${s.tkl||0} tackles`);
  return `${who} ${v}: ${bits.join(', ')}${ex}`;
 });
 const ret = ['home','away'].map(s=>d[s].returner).filter(x=>x && (x.kry+x.pry)>=105).sort((a,b)=>(b.kry+b.pry)-(a.kry+a.pry))[0];
 if(ret) lines.push(`${ret.name} gave his team field position all day with ${ret.kry+ret.pry} return yards${ex}`);
 return lines.length ? `<b>Stars of the game:</b> ${lines.join(' ')}` : '';
}
// ---- every score and turnover, in the order it happened, with who did it ----
function playByPlay(g, pEnd, halfTxt, collapse){
 const r = g.result, d = g.detail, nameOf = s=>s==='home'?g.home:g.away, other = s=>s==='home'?'away':'home';
 const items = [];
 ['home','away'].forEach(sd=>{
  const evs = (r[sd+'Events']||[]), sc = (d[sd].tdScorers||[]).slice(), kick = d[sd].players.find(p=>p.group==='K');
  evs.forEach((e,ix)=>{
   items.push({side:sd, q:e.q, t:e.t, e, ix, sc: (e.type==='TD' && !e.defensive) ? sc.shift() : null, kick});
  });
 });
 const tur = turnoverParagraph(g, collapse, true);
 const mixed = items.map(x=>({kind:'score', q:x.q, t:x.t, x}));
 tur.items.forEach((it,k)=> mixed.push({kind:'turn', q:Math.min(it.q||1,5), t:hashInt(g,'tt'+k,50,950)/1000, txt:it.t}));
 const defEv = mixed.filter(m=>m.kind==='score' && m.x.e.defensive).sort((a,b)=>a.q-b.q||a.t-b.t);
 const mixed2 = mixed.filter(m=>!(m.kind==='score' && m.x.e.defensive));
 mixed2.forEach(m=>{ if(m.kind==='turn' && /touchdown|for six/.test(m.txt) && defEv.length){ m.def = defEv.shift(); } });
 mixed.length = 0; mixed2.forEach(m=>mixed.push(m));
 mixed.sort((a,b)=>a.q-b.q||a.t-b.t);
 let h=0, a=0; const Q = {1:'First quarter', 2:'Second quarter', 3:'Third quarter', 4:'Fourth quarter', 5:'Overtime'};
 const out = {}; const add = (q,t)=>{ (out[q]=out[q]||[]).push(t); };
 const tag = ()=> h===a ? `tied ${h}–${a}` : h>a ? `${nick(g.home)} ${h}–${a}` : `${nick(g.away)} ${a}–${h}`;
 mixed.forEach(m=>{
  if(m.kind==='turn'){ if(m.def){ const dd = m.def.x; if(dd.side==='home') h += dd.e.pts; else a += dd.e.pts; add(m.q, m.txt.replace(/([.!])$/, ` (${tag()}).`).replace(/\)\.\.$/,').')); } else add(m.q, m.txt); return; }
  const {side:sd, e, sc, kick} = m.x, tm = 'the '+nick(nameOf(sd));
  if(sd==='home') h += e.pts; else a += e.pts;
  if(e.defensive){ add(m.q, `That put ${tm} on the board (${tag()}).`); return; }
  let t;
  if(e.type==='TD'){
   const who = sc ? sc.name : 'the offense';
   const how = !sc ? 'scored a touchdown' : sc.kind==='pass' ? `caught a touchdown pass${sc.qb?` from ${sc.qb}`:''}` : 'ran it in for a touchdown';
   let tail;
   if(e.pts===8) tail = `, and ${tm} converted the 2-Pt Conv`;
   else if(e.pts===6) tail = e.tpTry ? `, but the 2-Pt Conv failed` : `, but the extra point was missed`;
   else tail = '';
   if(e.pts===8 || (e.pts===6 && e.tpTry)) tail += e.forced ? ' (trailing late, they went for 2)' : e.ag==='aggressive' ? ' (an aggressive coach going for 2)' : '';
   t = `${who} ${how}${tail} (${tag()}).`;
  } else if(e.type==='FG'){
   t = `${kick?kick.name:'The kicker'} hit a field goal for ${tm} (${tag()}).`;
  } else if(e.type==='SAF'){
   t = `${tm} picked up a safety (${tag()}).`;
  } else t = `${capFirst(tm)} scored (${tag()}).`;
  add(m.q, t);
 });
 const parts = [];
 [1,2,3,4,5].forEach(q=>{
  if(!out[q]) { if(q<5) parts.push(`<b>${Q[q]}:</b> no scoring.`); return; }
  let txt = out[q].join(' ');
  if(q===2 && halfTxt) txt += ' '+halfTxt;
  if(q===4 && pEnd && !r.ot) txt += ' '+pEnd;
  if(q===5 && pEnd) txt += ' '+pEnd;
  parts.push(`<b>${Q[q]}:</b> ${txt}`);
 });
 return {html:parts.join('</p><p class="detail-item pbp">'), head:tur.head};
}
function generateGameSummary(g, ctx){
 ctx = ctx || {};
 const r = g.result, d = g.detail, flow = g.flow;
 const hs = r.homeScore, as = r.awayScore;
 const side = hs>as ? 'home' : as>hs ? 'away' : null;
 const other = s => s==='home' ? 'away' : 'home';
 const nameOf = s => s==='home' ? g.home : g.away;
 const T = s => 'the '+nick(nameOf(s));            // "the Ravens"
 const scoreOf = s => s==='home' ? hs : as;
 const margin = Math.abs(hs-as), total = hs+as;
 const A = flow.after;
 const lead = (s,q) => s==='home' ? A[q].h-A[q].a : A[q].a-A[q].h;
 const ptsAfter = (s,q) => s==='home' ? A[q].h : A[q].a;
 const prefix = g.roundLabel ? `In the ${g.roundLabel}, ` : '';
 let collapse = null, collapse2 = '';   // collapse: side that led/was tied late and still lost

 // ----- paragraph 1: how the game unfolded -----
 let p1;
 if(!side){
  p1 = `${prefix}${T('home')} and ${T('away')} played to a ${hs}–${as} tie.`;
 } else {
  const W = side, L = other(side), wn = T(W), ln = T(L), wS = scoreOf(W), lS = scoreOf(L);
  const wA3 = ptsAfter(W,3), lA3 = ptsAfter(L,3), q4W = wS-wA3, q4L = lS-lA3;
  const wH = ptsAfter(W,2), lH = ptsAfter(L,2);
  const evsAll = r.homeEvents.map(e=>({...e,side:'home'})).concat(r.awayEvents.map(e=>({...e,side:'away'}))).sort((a,b)=>a.q-b.q||a.t-b.t);
  const sc = (q,s)=> ptsAfter(s,q);
  const leaderAt = q => A[q].h>A[q].a ? 'home' : A[q].a>A[q].h ? 'away' : null;
  const hiLo = q => `${Math.max(A[q].h,A[q].a)}–${Math.min(A[q].h,A[q].a)}`;
  // 1) the opening score
  let open = '';
  if(evsAll.length){
   const f0 = evsAll[0], what = f0.type==='TD' ? (f0.defensive?'a defensive touchdown':'a touchdown') : f0.type==='FG' ? 'a field goal' : f0.type==='SAF' ? 'a safety' : 'the first points';
   open = `${prefix}${T(f0.side)} struck first with ${what} in ${qTxt(f0.q)}.`;
  } else open = `${prefix}neither offense could score early.`;
  // 2) the half
  const lh = leaderAt(2);
  const half = lh ? pick([`${capFirst(T(lh))} led ${hiLo(2)} at the half.`, `At the break it was ${nick(nameOf(lh))} ${hiLo(2)}.`]) : `It was tied ${A[2].h}–${A[2].a} at the half.`;
  // 3) the third quarter
  const d3h = A[3].h-A[2].h, d3a = A[3].a-A[2].a, l3 = leaderAt(3);
  let third;
  const big3 = Math.abs(d3h-d3a)>=7 ? (d3h>d3a?'home':'away') : null;
  if(big3) third = `${capFirst(T(big3))} outscored ${T(other(big3))} ${Math.max(d3h,d3a)}–${Math.min(d3h,d3a)} in the third quarter ${l3===big3?'to go up':'to '+(l3?'close within':'tie it at')} ${l3?hiLo(3):A[3].h+'–'+A[3].a}.`;
  else if(d3h+d3a===0) third = 'Neither offense scored in the third quarter.';
  else third = l3 ? `${capFirst(T(l3))} still led ${hiLo(3)} after three quarters.` : `It was tied ${A[3].h}–${A[3].a} after three quarters.`;
  // 4) the finish
  let fin;
  if(r.ot){
   fin = `Regulation ended tied ${A[4].h}–${A[4].a}, and ${wn} won it in overtime, ${wS}–${lS}.`;
   third = '';
  } else if(lead(W,3)<0){
   collapse = L;
   fin = pick([`Then ${wn} closed on a ${q4W}–${q4L} run to steal a ${wS}–${lS} win.`, `${capFirst(wn)} outscored ${ln} ${q4W}–${q4L} down the stretch and won ${wS}–${lS}.`]);
  } else if(lead(W,3)===0){
   fin = margin<=3 ? `${capFirst(wn)} edged it ${wS}–${lS} in a game that came down to the final possession.` : `${capFirst(wn)} pulled away in the fourth quarter, ${wS}–${lS}.`;
  } else if(margin<=4){
   fin = pick([`${capFirst(wn)} held on for a ${wS}–${lS} win.`, `${capFirst(wn)} survived a tense finish, ${wS}–${lS}.`]);
  } else if(margin>=17){
   fin = (wS-wA3) > (lS-lA3) ? `${capFirst(wn)} kept pouring it on and won going away, ${wS}–${lS}.` : `${capFirst(wn)} coasted home, ${wS}–${lS}.`;
  } else if(flow.changes>=3){
   fin = `The lead changed hands ${flow.changes} times before ${wn} finally pulled away, ${wS}–${lS}.`;
  } else if(total>=58){
   fin = `Both offenses moved the ball at will, but ${wn} had the last answer in a ${wS}–${lS} shootout.`;
  } else if(total<=33){
   fin = `Points were hard to come by, and ${wn} did just enough to win ${wS}–${lS}.`;
  } else fin = `${capFirst(wn)} finished it off, ${wS}–${lS}.`;
  const ri = longestRun(r);
  const runTxt = (ri && ri.pts>=14 && ri.startQ>=2 && ri.endQ<=3) ? ` ${capFirst(T(ri.side))} had ripped off ${ri.pts} unanswered points ${ri.startQ===ri.endQ?`in ${qTxt(ri.startQ)}`:`between the ${ordinalQ(ri.startQ)} and ${ordinalQ(ri.endQ)} quarters`} along the way.` : '';
  const pEnd = dramaticEnding(g, ctx);
  const fin2 = capFirst(fin.replace(/^Then /,'')); p1 = ((prefix ? prefix+fin2.charAt(0).toLowerCase()+fin2.slice(1) : fin2) + runTxt).trim();
  const pbp = playByPlay(g, pEnd, half, collapse);
  p1 += `</p><p class="detail-item pbp">` + pbp.html; collapse2 = pbp.head;
  if(g.divisional) p1 += ` It was a divisional game, so it counts a little extra.`;
 }
 p1 = capFirst(p1);

 // ----- paragraph 2: turnovers and swing plays; paragraph 3: the stars, then the game ball -----
 const blow = margin>=17;
 const turnStats = turnoverParagraph(g, collapse, true).statsNotes || [];
 const p2full = collapse2 ? `<b>Turnovers:</b> ${collapse2}${turnStats.length ? ' '+turnStats.join(' ') : ''}` : '';
 const mvp = d.mvp;
 const ball = pick([
  `${mvp.name} (${nick(mvp.team)} ${mvp.group}) earned the game ball: ${mvp.line}.`,
  `The game ball goes to ${mvp.name} of the ${nick(mvp.team)} (${mvp.line}).`
 ]);
 const loserBall = ((g.result.homeScore>g.result.awayScore) ? g.home : g.away)!==mvp.team && g.result.homeScore!==g.result.awayScore;
 const starsTxt = starsParagraph(g, blow);
 const p2stars = (starsTxt ? starsTxt : '') + `</p><p class="detail-item indent">` + ball.replace(/\.$/,'!') + (loserBall ? ` It is rare for the game ball to go to the losing side; ${mvp.name}'s performance was so dominant (a ${mvp.perfGrade||90} grade) that it could not be ignored.` : '');

 // ----- paragraph 3: the real factors in the math, then what it means -----
 let impl = '';
 if(side){
  const W = side, L = other(side), wn = T(W), ln = T(L);
  if(ctx.champion) impl = `${capFirst(wn)} are Super Bowl champions.`;
  else if(ctx.nextRound) impl = `${capFirst(wn)} advance to the ${ctx.nextRound}, while ${poss(ln)} season is over.`;
  else if(ctx.recHome){
   const recW = W==='home' ? ctx.recHome : ctx.recAway, recL = W==='home' ? ctx.recAway : ctx.recHome;
   const alive = rec => { const m = String(rec).split('-').map(Number); const w=m[0], l=m[1]; return w>=3 && w/(w+l) >= 0.35; };
   const dv = (g.divisional && alive(ctx.recHome) && alive(ctx.recAway)) ? ' in a division race that just tightened' : (g.divisional ? ', a division result that adds to the standings pressure' : '');
   impl = pick([
    `${capFirst(wn)} move to ${recW}; ${ln} slip to ${recL}${dv}.`,
    `The result lifts ${wn} to ${recW} and leaves ${ln} at ${recL}${dv}.`,
    `${capFirst(wn)} improve to ${recW}, while ${ln} fall to ${recL}${dv}.`
   ]);
   const sW = W==='home' ? ctx.streakHome : ctx.streakAway, sL = W==='home' ? ctx.streakAway : ctx.streakHome;
   if(sW && sW.kind==='W' && sW.n>=3) impl += ` That is ${numWord(sW.n)} straight wins for ${wn}.`;
   if(sL && sL.kind==='L' && sL.n>=3) impl += ` ${capFirst(ln)} have now lost ${numWord(sL.n)} in a row.`;
  }
 } else if(ctx.recHome){
  impl = `Both clubs leave with a tie in the books (${nick(g.home)} ${ctx.recHome}, ${nick(g.away)} ${ctx.recAway}).`;
 }
 const p3 = (factorParagraph(g) + ' ' + impl).trim() + (planParagraph(g) ? `</p><p class="detail-item"><b>Game plans:</b></p><p class="detail-item indent">${planParagraph(g, true)}` : '');
 return [p1, p2full, p2stars, p3].filter(Boolean).map(t=>`<p class="detail-item">${t}</p>`).join('');
}

// ---- Standings, seeding, and playoff bracket logic ----
function freshStandings(teamNames){
 const s = {};
 teamNames.forEach(t=> s[t] = {wins:0, losses:0, ties:0, pf:0, pa:0});
 return s;
}
function applyGameToStandings(standings, g){
 const hs = g.result.homeScore, as = g.result.awayScore;
 standings[g.home].pf += hs; standings[g.home].pa += as;
 standings[g.away].pf += as; standings[g.away].pa += hs;
 if(hs>as){ standings[g.home].wins++; standings[g.away].losses++; }
 else if(as>hs){ standings[g.away].wins++; standings[g.home].losses++; }
 else { standings[g.home].ties++; standings[g.away].ties++; }
}
function computeStandings(schedule, teamNames){
 const standings = freshStandings(teamNames);
 schedule.forEach(g=>{ if(g.played) applyGameToStandings(standings, g); });
 return standings;
}
function standingsRows(standings, teamNames){
 return teamNames.map(t=>{
  const s = standings[t]; const g = s.wins+s.losses+s.ties;
  return {team:t, ...s, pct: g? (s.wins+s.ties*0.5)/g : 0, diff: s.pf-s.pa};
 });
}
function headToHeadEdge(a, b, schedule){
 const h2h = schedule.filter(g=>g.played && ((g.home===a&&g.away===b)||(g.home===b&&g.away===a)));
 if(!h2h.length) return 0;
 let aw=0, bw=0;
 h2h.forEach(g=>{ const hs=g.result.homeScore, as=g.result.awayScore; if(hs===as) return;
  const aIsHome = g.home===a; const aWon = (aIsHome&&hs>as)||(!aIsHome&&as>hs);
  if(aWon) aw++; else bw++;
 });
 return aw-bw;
}
function sortStandings(rows, schedule){
 return rows.slice().sort((r1,r2)=>{
  if(r2.pct!==r1.pct) return r2.pct-r1.pct;
  const h2h = headToHeadEdge(r1.team, r2.team, schedule);
  if(h2h!==0) return -h2h;
  return r2.diff-r1.diff;
 });
}
function divisionStandings(division, standings, schedule){
 return sortStandings(standingsRows(standings, NFL_DIVISIONS[division]), schedule);
}
function computeSeeding(standings, schedule){
 const seeds = {};
 Object.keys(CONFERENCES).forEach(conf=>{
  const divWinners = [], others = [];
  CONFERENCES[conf].forEach(div=>{
   const rows = divisionStandings(div, standings, schedule);
   divWinners.push(rows[0]); others.push(...rows.slice(1));
  });
  const sortedDivWinners = sortStandings(divWinners, schedule);
  const sortedWildcards = sortStandings(others, schedule).slice(0,3);
  seeds[conf] = [...sortedDivWinners, ...sortedWildcards].map((r,i)=>({...r, seed:i+1}));
 });
 return seeds;
}

// ---- Playoff bracket (NFL 7-team format): wild card -> divisional -> conference champ -> Super Bowl ----
function buildWildCardRound(seeds){
 const games = [];
 ['AFC','NFC'].forEach(conf=>{
  const s = seeds[conf];
  const bySeed = n => s.find(x=>x.seed===n);
  games.push({conf, round:'Wild Card', home: bySeed(2).team, away: bySeed(7).team, homeSeed:2, awaySeed:7});
  games.push({conf, round:'Wild Card', home: bySeed(3).team, away: bySeed(6).team, homeSeed:3, awaySeed:6});
  games.push({conf, round:'Wild Card', home: bySeed(4).team, away: bySeed(5).team, homeSeed:4, awaySeed:5});
 });
 return games;
}
function buildDivisionalRound(seeds, wcResults){
 const games = [];
 ['AFC','NFC'].forEach(conf=>{
  const s = seeds[conf];
  const one = s.find(x=>x.seed===1);
  const wcWinnersThisConf = wcResults.filter(g=>g.conf===conf).map(g=>({
   team: g.result.homeScore>g.result.awayScore ? g.home : g.away,
   seed: g.result.homeScore>g.result.awayScore ? g.homeSeed : g.awaySeed
  })).sort((a,b)=>a.seed-b.seed); // lowest seed number = best
  const lowest = wcWinnersThisConf[wcWinnersThisConf.length-1]; // worst remaining seed plays #1
  const middleTwo = wcWinnersThisConf.slice(0, wcWinnersThisConf.length-1);
  games.push({conf, round:'Divisional', home:one.team, away:lowest.team, homeSeed:1, awaySeed:lowest.seed});
  if(middleTwo.length===2){
   const [a,b] = middleTwo.sort((x,y)=>x.seed-y.seed);
   games.push({conf, round:'Divisional', home:a.team, away:b.team, homeSeed:a.seed, awaySeed:b.seed});
  }
 });
 return games;
}
function buildConfChampRound(divResults){
 const games = [];
 ['AFC','NFC'].forEach(conf=>{
  const winners = divResults.filter(g=>g.conf===conf).map(g=>({
   team: g.result.homeScore>g.result.awayScore?g.home:g.away,
   seed: g.result.homeScore>g.result.awayScore?g.homeSeed:g.awaySeed
  })).sort((a,b)=>a.seed-b.seed);
  games.push({conf, round:'Conference Championship', home:winners[0].team, away:winners[1].team, homeSeed:winners[0].seed, awaySeed:winners[1].seed});
 });
 return games;
}
function buildSuperBowl(champResults){
 const afc = champResults.find(g=>g.conf==='AFC');
 const nfc = champResults.find(g=>g.conf==='NFC');
 const win = g => g.result.homeScore>g.result.awayScore ? {team:g.home, seed:g.homeSeed} : {team:g.away, seed:g.awaySeed};
 const a = win(afc), n = win(nfc);
 return [{conf:'NFL', round:'Super Bowl', home:a.team, away:n.team, homeSeed:a.seed, awaySeed:n.seed, homeConf:'AFC', awayConf:'NFC', neutral:true}];
}

function normalizeSlotEntry(raw){
 if(!raw) return null;
 if(Array.isArray(raw)) return {name: raw[0], pos: raw[1], ovr: raw[3]};
 return {name: raw.name, pos: null, ovr: raw.ovr};
}

// ---- Shared lineup table: conventional depth-chart order (QB first), grouped by phase ----
function lineupCell(slotmap, s){
 const raw = slotmap[s];
 if(!raw) return {text:'—', val:70};
 const e = normalizeSlotEntry(raw);
 if(Array.isArray(raw)){
   const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
   return (e && e.name!=null) ? {text:`${e.name} ${eff}`, val:eff} : {text:'—', val:70};
  }
 return {text: e.name ? `${e.name} ${e.ovr}` : '—', val: e.ovr};
}
function renderLineupTableHTML(slotmapLeft, slotmapRight, ownerLeft, ownerRight, showNote){
 const zL = (ownerLeft && typeof zpbRowVars==='function') ? zpbRowVars(ownerLeft) : '';
 const zR = (ownerRight && typeof zpbRowVars==='function') ? zpbRowVars(ownerRight) : '';
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<div class="zpb-lu-grp">${gname}</div>`;
  slots.forEach(s=>{
   const zpbLuB = (ll, rr, lab)=>`<div class="zpb-lu-row">
    <span class="zpb-lu-cell zpb-lu-l ${ll.text!=='—'&&zL?'zpb-trow':''} ${ll.val>=90?'zpb-shm':(ll.val>=85?'zpb-vib':'')} ${ll.val>rr.val?'zpb-lu-win':''}" style="${ll.text!=='—'&&zL?zL:''}"${ll.val>=85?` title="${ll.val} OVR"`:''}>${ll.text}</span>
    <span class="zpb-lu-c">${lab}</span>
    <span class="zpb-lu-cell zpb-lu-r ${rr.text!=='—'&&zR?'zpb-trow':''} ${rr.val>=90?'zpb-shm':(rr.val>=85?'zpb-vib':'')} ${rr.val>ll.val?'zpb-lu-win':''}" style="${rr.text!=='—'&&zR?zR:''}"${rr.val>=85?` title="${rr.val} OVR"`:''}>${rr.text}</span>
   </div>`; // w19: each side wears its own team palette so 90+ shimmer is never invisible
   rows += zpbLuB(lineupCell(slotmapLeft, s), lineupCell(slotmapRight, s), LABELS[s]||s);
   if(s==='CB3'){ rows += zpbLuB(zpbDimeCell(slotmapLeft, lineupCell(slotmapLeft,'CB4'), 'CB4'), zpbDimeCell(slotmapRight, lineupCell(slotmapRight,'CB4'), 'CB4'), 'Dime'); }
  });
 });
 return `<div class="zpb-lu">${rows}</div>${showNote===false?'':'<p class="zpb-fadenote">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>'}`;
}
function countLineupEdges(slotmapA, slotmapB){
 let a=0,b=0;
 ROSTER_SLOTS.forEach(s=>{
  const va = slotOvr(slotmapA, s), vb = slotOvr(slotmapB, s);
  if(va>vb) a++; else if(vb>va) b++;
 });
 return {a,b};
}
function unitComparisonHTML(poolA, poolB){
 const mA = computeDetailMetrics(poolA), mB = computeDetailMetrics(poolB);
 let rows='', aUnits=0, bUnits=0;
 mA.forEach((ma,i)=>{
  const mb = mB[i];
  if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;
  rows += `<tr><td style="${ma.avg>mb.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}">${Math.round(ma.avg)}</td><td class="narr" style="text-align:center;">${ma.label}</td><td style="${mb.avg>ma.avg?'font-weight:700;color:var(--tA2,var(--accent));':''}text-align:right;">${Math.round(mb.avg)}</td></tr>`;
 });
 return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length};
}

// ---- Home-page Team Comparison tab: actual NFL rosters only ----
let homeCmpInit = false;
function renderHomeComparison(){
 const selA = document.getElementById('homeCmpA'), selB = document.getElementById('homeCmpB');
 const teams = Object.keys(TEAM_DATA).sort();
 if(!homeCmpInit){
  teams.forEach(t=>{ [selA,selB].forEach(sel=>{ const o=document.createElement('option'); o.value=t; o.textContent=t; sel.appendChild(o); }); });
  selA.value = 'Kansas City Chiefs'; selB.value = 'Las Vegas Raiders';
  selA.addEventListener('change', renderHomeComparison);
  selB.addEventListener('change', renderHomeComparison);
  homeCmpInit = true;
 }
 const a = selA.value, b = selB.value;
 const scoreA = computeScore(a), scoreB = computeScore(b);
 const rankOf = t => currentScored.findIndex(r=>r.team===t)+1;
 const edges = countLineupEdges(TEAM_DATA[a], TEAM_DATA[b]);
 const units = unitComparisonHTML(PLAYERS.filter(p=>p[2]===a), PLAYERS.filter(p=>p[2]===b));
 let verdict;
 if(a===b) verdict = 'Pick two different teams to compare.';
 else {
  const leader = scoreA>=scoreB ? a : b, trailer = scoreA>=scoreB ? b : a;
  const gap = Math.abs(scoreA-scoreB);
  verdict = '';
 }
 const pkA = (typeof zpbPackFor==='function') ? zpbPackFor(a) : null, pkB = (typeof zpbPackFor==='function') ? zpbPackFor(b) : null;
 document.getElementById('homeCmpResult').innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <div class="zpb-cmphead">
    <span class="zpb-cmpside" id="zpbCmpSlotA"></span>
    <span class="zpb-cmpscore"><span class="zpb-cmpnum"${pkA?` style="--pkc:${pkA.accL};--pkcd:${pkA.accD}"`:''}>${Math.round(scoreA)}</span> <span class="zpb-cmpsub">vs</span> <span class="zpb-cmpnum"${pkB?` style="--pkc:${pkB.accL};--pkcd:${pkB.accD}"`:''}>${Math.round(scoreB)}</span></span>
    <span class="zpb-cmpside" id="zpbCmpSlotB"></span>
   </div>
   <h4 style="margin:12px 0 4px;text-align:center;">Starter-by-Starter</h4>
   ${renderLineupTableHTML(TEAM_DATA[a], TEAM_DATA[b], a, b, false)}
  </div>
  <div class="panel"><h4 style="margin-top:0;">Unit Comparison</h4>${units.html}</div>`;
 const zpbHold = document.getElementById('zpbCmpSelHold');
 if(zpbHold){ zpbHold.appendChild(selA); zpbHold.appendChild(selB); }
 const zpbSlotA = document.getElementById('zpbCmpSlotA'); if(zpbSlotA) zpbSlotA.appendChild(selA);
 const zpbSlotB = document.getElementById('zpbCmpSlotB'); if(zpbSlotB) zpbSlotB.appendChild(selB);
}

// w19 (Owner): the Full Depth Chart reads as three zones — OFFENSE · DEFENSE · SPECIAL TEAMS —
// titles centered over the names, filled slots shimmering, 90+ names shimmering and 85+ burning brighter,
// the Dime riding inside the defense with no box and no dash.
function zpbDepthZonesHTML(slotmap, pickRounds, owner){
 const zst = (owner && typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';
 const row = s=>{
  const e = normalizeSlotEntry(slotmap[s]);
  const rnd = pickRounds && pickRounds[s];
  const nm = e && e.name ? e.name : '';
  const ovr = e && e.name ? e.ovr : '';
  const cls = e && e.name ? (e.ovr>=90 ? 'zpb-shm' : (e.ovr>=85 ? 'zpb-vib' : '')) : '';
  return `<div class="zpb-dz-row${e&&e.name&&zst?' zpb-trow':''}"${e&&e.name&&zst?` style="${zst}"`:''}><span class="slotname${e&&e.name?' zpb-shm':''}">${LABELS[s]||s}</span><span class="zpb-dz-name ${cls}">${nm}${rnd?` <span class="narr">R${rnd}</span>`:''}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };
 const zone = (title, cls, slots, extra)=>`<div class="zpb-dz-zone ${cls}"><h4>${title}</h4>${slots.map(row).join('')}${extra||''}</div>`;
 const dimeRow = ()=>{ // the Dime rides in the defense zone — same row shape, no box, no dash (w19, Owner)
  const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
  const e = d ? normalizeSlotEntry(d) : null;
  const nm = e && e.name!=null ? e.name : '';
  const ovr = e && e.name!=null ? e.ovr : '';
  const cls = e && e.name!=null ? (e.ovr>=90?'zpb-shm':(e.ovr>=85?'zpb-vib':'')) : '';
  return `<div class="zpb-dz-row"><span class="slotname${nm?' zpb-shm':''}">Dime</span><span class="zpb-dz-name ${cls}">${nm}</span><span class="zpb-dz-ovr">${ovr}</span></div>`;
 };
 return `<div class="zpb-dz">
  ${zone('Offense','zpb-dz-off', DEPTH_CHART_GROUPS[0][2])}
  ${zone('Defense','zpb-dz-def', DEPTH_CHART_GROUPS[1][2], dimeRow())}
  ${zone('Special Teams','zpb-dz-st', DEPTH_CHART_GROUPS[2][2])}
 </div>`;
}

function renderDepthChartHTML(slotmap, pickRounds, owner){
 const zst = (owner && typeof zpbRowVars==='function') ? zpbRowVars(owner) : '';
 return DEPTH_CHART_GROUPS.map(([gname, gcls, slots])=>{
  const rows = slots.map(s=>{
   const e = normalizeSlotEntry(slotmap[s]);
   const rnd = pickRounds && pickRounds[s];
   const oop = e && e.pos && isOutOfPosition(e.pos, s);
   const rndTag = rnd ? `<span class="narr" style="margin-left:6px;">R${rnd}</span>` : '';
   return `<div class="depth-row${e&&e.name&&zst?' zpb-trow':''}"${e&&e.name&&zst?` style="${zst}"`:''}><span class="slotname">${LABELS[s]||s}</span><span class="${e&&e.name?'playername':'empty'}">${e&&e.name?`${e.name} (${e.ovr})`:'—'}${rndTag}</span></div>`;
  }).join('');
  const dime = gcls==='def' ? zpbDimeRow(slotmap) : '';
  return `<div class="depth-group ${gcls}"><h4>${gname}</h4>${rows}${dime}</div>`;
 }).join('');
}

function letterGrade(pct){
 if(pct>=97) return 'A+'; if(pct>=90) return 'A'; if(pct>=80) return 'A-';
 if(pct>=70) return 'B+'; if(pct>=60) return 'B'; if(pct>=50) return 'B-';
 if(pct>=40) return 'C+'; if(pct>=30) return 'C'; if(pct>=20) return 'C-';
 if(pct>=10) return 'D'; return 'F';
}

// ================= SEASON STATE & UI =================
let seasonState = null;
const ROUND_LABELS = {wildcard:'Wild Card Round', divisional:'Divisional Round', champ:'Conference Championship', superbowl:'Super Bowl'};
const NEXT_ROUND_LABEL = {wildcard:'Divisional Round', divisional:'Conference Championship', champ:'Super Bowl'};
const GROUP_ORDER = ['QB','RB','WR','TE','OL','DL','LB','DB','K'];

function startSeason(){
 const {draftEntries} = buildResultEntries();
 const teams = {};
 draftEntries.forEach(e=>{ teams[e.teamName] = {pool: e.pool, slotmap: e.slotmap, isUser: e.isUser}; });
 const names = Object.keys(teams);
 const league = leagueBaseline(names.map(n=>teams[n].slotmap));
 const unitRatings = {}; names.forEach(n=>{ unitRatings[n] = teamRatings(teams[n].slotmap); });
 seasonState = { teams, schedule: buildFullSchedule(names), currentWeek: 1, weekSimulated: false, phase: 'regular', playerStats: {}, playerStatsPO: {}, league, unitRatings, unitRanks: computeUnitRanks(unitRatings), identity: {}, planCache: {}, userPlan: {mode:'auto', pers:'auto', strat:'auto', pkg:'auto', focus:'auto'}, scriptLocked:false, preseason:true };
 names.forEach(n=>{ seasonState.identity[n] = teamIdentity(unitRatings[n], league); });
 seasonState.returners = {}; names.forEach(n=>{ seasonState.returners[n] = autoReturner(teams[n].slotmap); });
}
function seasonUserTeam(){ return Object.keys(seasonState.teams).find(t=>seasonState.teams[t].isUser); }
function teamNames(){ return Object.keys(seasonState.teams); }

function accumulatePlayerStats(teamName, players){
 const book = (seasonState.phase==='playoffs' || seasonState.phase==='complete') ? seasonState.playerStatsPO : seasonState.playerStats;
 players.forEach(p=>{
  const key = teamName+'|'+p.name;
  const rec = book[key] || (book[key] = {team:teamName, name:p.name, group:p.group, slot:p.slot, ovr:p.ovr, st:{}, gp:0});
  rec.gp++; rec.zSum = (rec.zSum||0) + p.impact;
  const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });
  Object.entries(p.st).forEach(([k,v])=>{ const c = PER_GAME_CAP[k]; rec.st[k] = (rec.st[k]||0)+(c && v>c ? c : v); });
  // single-season NFL records are a ceiling the sim does not break: a record-pace year stalls just under the record, and a total never goes down
  if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAPS[k]) rec.st[k] = Math.max(before[k], SEASON_RECORD_CAPS[k] - Math.floor(Math.random()*35)); });
 });
}
// no single game goes past what has ever been seen in the NFL
const PER_GAME_CAP = {passYds:527, rushYds:296, recYds:336, sack:7, dint:4, rec:23, passTD:7, rushTD:6, recTD:5};
const SEASON_RECORD_CAPS = {passYds:5400, rushYds:2060, recYds:1930, sack:21, dint:10, rec:140};
function playGame(g, isPlayoff){
 const hs = seasonState.teams[g.home].slotmap, as = seasonState.teams[g.away].slotmap;
 g.result = simulateGame(hs, as, isPlayoff, seasonState.league, ensureGamePlans(g));
 g.flow = gameFlow(g.result);
 g.detail = buildGameDetail(g, hs, as);
 accumulatePlayerStats(g.home, g.detail.home.players);
 accumulatePlayerStats(g.away, g.detail.away.players);
 if(!isPlayoff){ const RD = seasonState.runDir = seasonState.runDir || {}; ['home','away'].forEach(sd=>{ const t = g[sd], rd = g.detail[sd].plays && g.detail[sd].plays.runDir; if(!rd) return; const T = RD[t] = RD[t] || {L:{car:0,yds:0},M:{car:0,yds:0},R:{car:0,yds:0}}; ['L','M','R'].forEach(d=>{ T[d].car += rd[d].car; T[d].yds += rd[d].yds; }); }); }
 g.played = true; seasonState.ratingsDirty = true;
}
function recStr(st, t){ const s=st[t]; return `${s.wins}-${s.losses}${s.ties?'-'+s.ties:''}`; }
function ordinalN(n){ const v = n%100; return n+((v>=11&&v<=13)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th')); }
// rank within a group of teams by win percentage, then point differential
function rankAmong(st, team, group){
 const key = t=>{ const s=st[t], g = s.wins+s.losses+s.ties; return [(s.wins+0.5*s.ties)/Math.max(g,1), s.pf-s.pa]; };
 const me = key(team); return 1 + group.filter(t=>{ const k = key(t); return k[0]>me[0]+1e-9 || (Math.abs(k[0]-me[0])<1e-9 && k[1]>me[1]); }).length;
}
// record plus conference and division standing, e.g. "5-1 · 2nd in the AFC · 1st in the AFC West"
function recFull(st, t){
 const s = st[t], gp = s.wins+s.losses+s.ties, base = recStr(st, t);
 if(!gp) return base;
 const div = divisionOfTeam(t), conf = conferenceOfTeam(t);
 const confTeams = Object.keys(NFL_DIVISIONS).filter(d=>conferenceOfTeam(NFL_DIVISIONS[d][0])===conf).reduce((a,d)=>a.concat(NFL_DIVISIONS[d]),[]);
 const cRank = rankAmong(st,t,confTeams);
 if(cRank===1) return `${base} · <span class="zpb-shm zpb-conf1">#1 ${conf}</span>`;
 return `${base} · #${rankAmong(st,t,NFL_DIVISIONS[div])} ${div}`;
}
const RIVALRIES = [['Cowboys','49ers','a playoff rivalry that goes back decades'],['Cowboys','Packers','two of the league\'s most storied franchises'],['Colts','Patriots','the Manning-Brady rivalry'],['Bills','Chiefs','the best recent playoff rivalry in the AFC'],['Steelers','Patriots','a rivalry built on January meetings'],['Giants','Patriots','two Super Bowl meetings in four years'],['Packers','49ers','a postseason rivalry that keeps resurfacing'],['Eagles','Packers','a long history of playoff-weight games'],['Ravens','Steelers','the hardest-hitting rivalry in the league'],['Cowboys','Eagles','the loudest rivalry in the NFC East'],['Bears','Packers','the oldest rivalry in football'],['Chiefs','Raiders','a bitter AFC West feud'],['Broncos','Raiders','a bitter AFC West feud']];
function rivalryOf(g){ const a = nick(g.home), b = nick(g.away); const r = RIVALRIES.find(x=>(x[0]===a&&x[1]===b)||(x[0]===b&&x[1]===a)); return r ? r[2] : null; }
function meetingInfo(g){
 // how many times these two meet this season (schedule + playoffs), and what happened last time
 try{
  const S = seasonState; if(!S || !S.schedule) return null;
  const pair = q => (q.home===g.home && q.away===g.away) || (q.home===g.away && q.away===g.home);
  const reg = S.schedule.filter(x=>x!==g && pair(x));
  const po = [];
  if(S.playoffRounds) ['wildcard','divisional','champ','superbowl'].forEach(rk=>(S.playoffRounds[rk]||[]).forEach(x=>{ if(x!==g && pair(x)) po.push(x); }));
  // order every meeting on one clock: weeks 1-18, then the four playoff rounds
  const RKS = ['wildcard','divisional','champ','superbowl'];
  const ord = new Map();
  reg.forEach(x=>ord.set(x, x.week||0));
  po.forEach(x=>{ const ri = RKS.findIndex(rk=>((S.playoffRounds||{})[rk]||[]).some(y=>y===x)); ord.set(x, 19+Math.max(0,ri)); });
  let gOrd = g.week || 0;
  if(!gOrd) gOrd = 19 + Math.max(0, RKS.findIndex(rk=>((S.playoffRounds||{})[rk]||[]).some(y=>y===g)));
  const others = reg.concat(po).sort((a,b)=>(ord.get(a)||0)-(ord.get(b)||0));
  const prior = others.filter(x=>x.played && x.result && (ord.get(x)||0) < gOrd);
  return {n: others.length + 1, prior: prior.length ? prior[prior.length-1] : null};
 }catch(e){ return null; }
}
function meetingTagText(g){ return ''; }
function matchupTagHTML(g){
 const riv = rivalryOf(g);
 if(g.divisional) return `<div class="mtag mtag-div"><span class="mtag-big">DIVISION SHOWDOWN</span><span class="mtag-sub">${riv?riv+'. ':''}${meetingTagText(g)}</span></div>`;
 if(riv) return `<div class="mtag mtag-riv"><span class="mtag-big">RIVALRY GAME</span><span class="mtag-sub">${riv}.</span></div>`;
 return '';
}

function simulateCurrentWeek(){
 seasonState.scriptLocked = false;
 const week = seasonState.currentWeek;
 const games = seasonState.schedule.filter(g=>g.week===week);
 games.forEach(g=>{ if(!g.played) playGame(g,false); });
 const st = computeStandings(seasonState.schedule, teamNames());
 const user = seasonUserTeam();
 games.forEach(g=>{
  if(g.home===user || g.away===user) g.summary = generateGameSummary(g, {recHome:recStr(st,g.home), recAway:recStr(st,g.away), streakHome:teamStreakThrough(g.home, week), streakAway:teamStreakThrough(g.away, week)});
 });
 seasonState.weekSimulated = true;
 if(typeof zpbGameReplay==='function'){ const ug = games.find(x=>x.home===user||x.away===user); if(ug && ug.result && ug.result.homeEvents && ug.result.homeEvents.length) zpbGameReplay(ug, user); }
}
function simRestOfSeason(){
 seasonState.scriptLocked = false;
 while(seasonState.phase==='regular'){
  if(!seasonState.weekSimulated) simulateCurrentWeek();
  advanceWeek();
 }
}
function advanceWeek(){
 if(seasonState.currentWeek >= 17){
  const st = computeStandings(seasonState.schedule, teamNames());
  seasonState.seeds = computeSeeding(st, seasonState.schedule);
  seasonState.phase = 'regularReview';
  seasonState.awardsRS = computeRegularSeasonAwards();
  return;
 }
 seasonState.currentWeek++;
 seasonState.weekSimulated = false;
}
function startPlayoffs(){
 seasonState.phase = 'playoffs';
 seasonState.playoffRounds = { wildcard: buildWildCardRound(seasonState.seeds) };
 seasonState.currentPlayoffRound = 'wildcard';
 seasonState.playoffRoundSimulated = false;
}
function simulatePlayoffRound(){
 const rk = seasonState.currentPlayoffRound;
 const games = seasonState.playoffRounds[rk];
 games.forEach(g=>{
  g.roundLabel = ROUND_LABELS[rk];
  playGame(g, true);
  const winnerHome = g.result.homeScore>g.result.awayScore;
  g.summary = generateGameSummary(g, rk==='superbowl' ? {champion:true} : {nextRound: NEXT_ROUND_LABEL[rk]});
 });
 if(typeof zpbGameReplay==='function'){ const _u = seasonUserTeam(); const _ug = games.find(x=>x.home===_u||x.away===_u); if(_ug && _ug.result && _ug.result.homeEvents && _ug.result.homeEvents.length) zpbGameReplay(_ug, _u); }
 if(rk==='wildcard') seasonState.playoffRounds.divisional = buildDivisionalRound(seasonState.seeds, games);
 else if(rk==='divisional') seasonState.playoffRounds.champ = buildConfChampRound(games);
 else if(rk==='champ') seasonState.playoffRounds.superbowl = buildSuperBowl(games);
 else if(rk==='superbowl'){
  const sb = games[0];
  seasonState.champion = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away;
  seasonState.phase = 'complete';
  seasonState.awardsPO = computePlayoffAwards();
  return;
 }
 seasonState.playoffRoundSimulated = true;
}
function advancePlayoffRound(){
 const order = ['wildcard','divisional','champ','superbowl'];
 seasonState.currentPlayoffRound = order[order.indexOf(seasonState.currentPlayoffRound)+1];
 seasonState.playoffRoundSimulated = false;
}

function userPlayoffStatus(userTeam){
 const allSeeded = seasonState.seeds.AFC.concat(seasonState.seeds.NFC);
 const seedEntry = allSeeded.find(s=>s.team===userTeam);
 if(!seedEntry) return {status:'missed'};
 for(const rk of ['wildcard','divisional','champ','superbowl']){
  const games = seasonState.playoffRounds[rk];
  if(!games) return {status:'advancing', seed: seedEntry.seed};
  const g = games.find(x=>x.home===userTeam||x.away===userTeam);
  if(!g) continue;
  if(!g.result) return {status:'playing', round:rk, game:g};
  const won = g.home===userTeam ? g.result.homeScore>g.result.awayScore : g.result.awayScore>g.result.homeScore;
  if(!won) return {status:'eliminated', round:rk};
 }
 return {status:'champion'};
}
function userPlayoffResultText(userTeam){
 const s = userPlayoffStatus(userTeam);
 if(s.status==='missed') return 'missed the playoffs';
 if(s.status==='champion') return 'won the Super Bowl';
 if(s.status==='eliminated') return s.round==='superbowl' ? 'lost in the Super Bowl' : `was eliminated in the ${ROUND_LABELS[s.round]}`;
 return 'is still alive in the playoffs';
}

// ---------- season stats ----------
function seasonImpact(st){ return statImpact(st); }
function fmtN(n){ return (n||0).toLocaleString('en-US'); }
function seasonStatLine(group, s){
 const parts = [];
 if(group==='QB'){ parts.push(`${fmtN(s.cmp)}/${fmtN(s.att)} cmp`, `${fmtN(s.passYds)} pass yds`, `${s.passTD||0} TD`, `${s.int||0} INT`, `${passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0).toFixed(1)} rate`); if(s.rushYds) parts.push(`${fmtN(s.rushYds)} rush yds`); }
 else if(group==='RB'){ parts.push(`${fmtN(s.car)} car`, `${fmtN(s.rushYds)} rush yds`, `${s.rushTD||0} TD`); if(s.recYds) parts.push(`${fmtN(s.recYds)} rec yds`); if(s.recTD) parts.push(`${s.recTD} rec TD`); }
 else if(group==='WR'||group==='TE'){ parts.push(`${fmtN(s.rec)}/${fmtN(s.tgt)} rec`, `${fmtN(s.recYds)} yds`, `${s.recTD||0} TD`); if(s.rushTD) parts.push(`${s.rushTD} rush TD`); }
 else if(group==='K'){ parts.push(`${s.fg||0} FG`); }
 else if(group==='OL'){ parts.push(`${fmtN(s.rbk)} rush yds behind`, `${s.pk||0} pancakes`, `${s.sa||0} sacks allowed`, `${s.pa||0} pressures allowed`); }
 else if(group==='DL'){ parts.push(`${s.sack||0} sacks`, `${s.tfl||0} TFL`, `${s.hur||0} pressures`, `${s.tkl||0} tkl`); if(s.ff) parts.push(`${s.ff} FF`); }
 else if(group==='LB'){ parts.push(`${s.tkl||0} tkl`, `${s.tfl||0} TFL`, `${s.sack||0} sacks`); if(s.dint) parts.push(`${s.dint} INT`); if(s.pd) parts.push(`${s.pd} PD`); if(s.ff) parts.push(`${s.ff} FF`); }
 else { parts.push(`${s.dint||0} INT`, `${s.pd||0} PD`, `${s.tkl||0} tkl`); if(s.ff) parts.push(`${s.ff} FF`); }
 return parts.concat(extraStats(group, s)).join(', ');
}
let STATS_KIND = 'rs';
const curBook = ()=> STATS_KIND==='po' ? seasonState.playerStatsPO : seasonState.playerStats;
function teamPlayerStats(team){
 ensureRatings();
 return Object.values(curBook()).filter(r=>r.team===team)
  .map(r=>({...r, impact: r.zSum||0}));
}
function userStatsInner(){
 const user = seasonUserTeam();
 const rows = teamPlayerStats(user).sort((a,b)=> GROUP_ORDER.indexOf(a.group)-GROUP_ORDER.indexOf(b.group) || ((b.ovr||0)-(a.ovr||0)) || b.impact-a.impact);
 if(!rows.length) return `<p class="narr">${STATS_KIND==='po'?(playoffMissed()?'Your team missed the playoffs.':'Your team has not played a playoff game yet, so there are no playoff totals.'):'No games played yet — your players\' season totals will build here as you go.'}</p>`;
 const body = rows.map(r=>`<tr><td>${r.name}</td><td class="narr">${r.group}</td><td class="narr">${r.ovr||''}</td><td class="narr">${r.gp}</td><td class="score">${r._rating!=null?r._rating.toFixed(1):'—'} <span class="narr">#${r._rank||'–'}</span></td><td>${seasonStatLine(r.group, r.st)}</td></tr>`).join('');
 return `<table><thead><tr><th>Player</th><th>Pos</th><th>OVR</th><th>GP</th><th>Rating (rank at pos.)</th><th>${STATS_KIND==='po'?'Playoff':'Season'} Stats (${user})</th></tr></thead><tbody>${body}</tbody></table>`;
}
function renderStatsTabsHTML(kind){
 kind = kind || 'rs'; const prev = STATS_KIND; STATS_KIND = kind; const sfx = kind==='po' ? 'PO' : '';
 try{
  return `<div class="panel" style="margin-bottom:14px;">
  <h3 style="margin:0 0 8px;">${kind==='po'?'Playoff stats':'Season stats'}</h3>
  <div class="tabs" style="margin-bottom:10px;"><button class="tabbtn active" id="statsTabYou${sfx}">Your Players</button><button class="tabbtn" id="statsTabLeaders${sfx}">League Leaders</button></div>
  <div id="statsPaneYou${sfx}">${userStatsInner()}</div>
  <div id="statsPaneLeaders${sfx}" style="display:none;">${leadersInner(sfx)}</div></div>`;
 } finally { STATS_KIND = prev; }
}
function wireStatsTabs(){
 ['', 'PO'].forEach(sfx=>{
  const a=document.getElementById('statsTabYou'+sfx), b=document.getElementById('statsTabLeaders'+sfx);
  if(!a||!b) return;
  const pa=document.getElementById('statsPaneYou'+sfx), pb=document.getElementById('statsPaneLeaders'+sfx);
  a.addEventListener('click', ()=>{ a.classList.add('active'); b.classList.remove('active'); pa.style.display='block'; pb.style.display='none'; });
  b.addEventListener('click', ()=>{ b.classList.add('active'); a.classList.remove('active'); pb.style.display='block'; pa.style.display='none'; });
  const r1=document.getElementById('ldrBtnRtg'+sfx), r2=document.getElementById('ldrBtnStat'+sfx);
  if(r1&&r2){
   const p1=document.getElementById('ldrRtg'+sfx), p2=document.getElementById('ldrStat'+sfx);
   r1.addEventListener('click', ()=>{ r1.classList.add('active'); r2.classList.remove('active'); p1.style.display='block'; p2.style.display='none'; });
   r2.addEventListener('click', ()=>{ r2.classList.add('active'); r1.classList.remove('active'); p2.style.display='block'; p1.style.display='none'; });
  }
 });
}
function leaderBoards(mode){
 ensureRatings();
 const rows = Object.values(curBook());
 const f1 = v => (v==null?'—':v.toFixed(1));
 const boards = [
  {title:'Quarterbacks', group:'QB', key:'passYds', cols:[['Cmp/Att',r=>`${fmtN(r.st.cmp)}/${fmtN(r.st.att)}`],['Yds',r=>fmtN(r.st.passYds)],['TD',r=>r.st.passTD||0],['INT',r=>r.st.int||0],['Rate',r=>passerRating(r.st.cmp,r.st.att,r.st.passYds,r.st.passTD||0,r.st.int||0).toFixed(1)],['TD:INT',r=>f1((r.st.passTD||0)/Math.max(r.st.int||0,1))],['Sacked',r=>r.st.sackd||0],['FUM',r=>r.st.fum||0],['2PT',r=>r.st.tpc||0]]},
  {title:'Running Backs', group:'RB', key:'rushYds', cols:[['Car',r=>fmtN(r.st.car)],['Rush',r=>fmtN(r.st.rushYds)],['YPC',r=>f1((r.st.rushYds||0)/Math.max(r.st.car||0,1))],['TD',r=>r.st.rushTD||0],['Rec',r=>fmtN(r.st.recYds)],['FUM',r=>r.st.fum||0],['Lost',r=>r.st.fumLost||0],['2PT',r=>r.st.tpc||0]]},
  {title:'Wide Receivers', group:'WR', key:'recYds', cols:[['Rec/Tgt',r=>`${fmtN(r.st.rec)}/${fmtN(r.st.tgt)}`],['Yds',r=>fmtN(r.st.recYds)],['TD',r=>r.st.recTD||0],['FUM',r=>r.st.fum||0],['2PT',r=>r.st.tpc||0]]},
  {title:'Tight Ends', group:'TE', key:'recYds', cols:[['Rec/Tgt',r=>`${fmtN(r.st.rec)}/${fmtN(r.st.tgt)}`],['Yds',r=>fmtN(r.st.recYds)],['TD',r=>r.st.recTD||0],['FUM',r=>r.st.fum||0],['2PT',r=>r.st.tpc||0]]},
  {title:'Offensive Line', group:'OL', key:'pk', cols:[['Yds behind',r=>fmtN(r.st.rbk)],['Pancakes',r=>r.st.pk||0],['Sacks alwd',r=>r.st.sa||0],['Press. alwd',r=>r.st.pa||0]]},
  {title:'Defensive Line', group:'DL', key:'sack', cols:[['Sacks',r=>r.st.sack||0],['TFL',r=>r.st.tfl||0],['Press.',r=>r.st.hur||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]},
  {title:'Linebackers', group:'LB', key:'tkl', cols:[['Tkl',r=>r.st.tkl||0],['TFL',r=>r.st.tfl||0],['Sacks',r=>r.st.sack||0],['INT',r=>r.st.dint||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]},
  {title:'Defensive Backs', group:'DB', key:'dint', cols:[['INT',r=>r.st.dint||0],['PD',r=>r.st.pd||0],['Tkl',r=>r.st.tkl||0],['FF',r=>r.st.ff||0],['FR',r=>r.st.fr||0],['Def TD',r=>r.st.dtd||0],['Blk',r=>r.st.blk||0],['Saf',r=>r.st.saf||0]]},
  {title:'Kickers', group:'K', key:'fg', cols:[['FG',r=>r.st.fg||0]]},
  {title:'Returners', group:'RET', key:'retYds', pred:r=>(r.st.krN||0)+(r.st.prN||0)>0, cols:[['KR',r=>`${r.st.krN||0} for ${fmtN(r.st.krYds)}`],['KR avg',r=>f1((r.st.krYds||0)/Math.max(r.st.krN||0,1))],['PR',r=>`${r.st.prN||0} for ${fmtN(r.st.prYds)}`],['PR avg',r=>f1((r.st.prYds||0)/Math.max(r.st.prN||0,1))],['Total yds',r=>fmtN(r.st.retYds)]]}
 ];
 return boards.map(b=>({...b, rows: rows.filter(b.pred || (r=>r.group===b.group))
  .sort((mode==='stat' || b.pred) ? (x,y)=>(y.st[b.key]||0)-(x.st[b.key]||0) || (y.st.tkl||0)-(x.st.tkl||0) : (x,y)=>(y._rating||0)-(x._rating||0)).slice(0,10)}));
}
function leadersPane(mode){
 const user = seasonUserTeam();
 const cards = leaderBoards(mode).map(b=>{
  const head = ['Rtg'].concat(b.cols.map(c=>c[0])).map(h=>`<th>${h}</th>`).join('');
  const body = b.rows.map((r,i)=>`<tr class="${r.team===user?'user-row':''}"><td class="narr">${i+1}</td><td>${r.name} <span class="narr">${nick(r.team)}</span></td><td class="score" style="font-weight:700;">${r._rating!=null?r._rating.toFixed(1):'—'}</td>${b.cols.map(c=>`<td class="score">${c[1](r)}</td>`).join('')}</tr>`).join('');
  return `<div class="divtable"><h5>${b.title}</h5><table><thead><tr><th></th><th>Player</th>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
 }).join('');
 return `<div class="draft-columns" style="grid-template-columns:1fr 1fr;">${cards}</div>`;
}
function leadersInner(sfx){
 sfx = sfx || '';
 const blurbs = Object.keys(RATING_BLURB).filter(g=>g!=='TE').map(g=>`<b>${g}</b>: ${RATING_BLURB[g]}`).join(' · ');
 return `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px;">
   <span class="narr">Sorted by:</span><button class="tabbtn active" id="ldrBtnRtg${sfx}">Performance rating</button><button class="tabbtn" id="ldrBtnStat${sfx}">Raw stat</button></div>
  <p class="narr" style="margin:0 0 10px;">Each position has its own rating (50 = average starter) that blends volume with efficiency, so a player can rank high without leading the league in yards. ${blurbs}.</p>
  <div id="ldrRtg${sfx}">${leadersPane('rating')}</div><div id="ldrStat${sfx}" style="display:none;">${leadersPane('stat')}</div>`;
}
// ---------- rendering helpers ----------
function renderLineScoreHTML(g){
 const r = g.result;
 const row = (name, q, tot)=>`<tr><td>${name}</td>${q.slice(0, r.ot?5:4).map(x=>`<td class="score">${x||0}</td>`).join('')}<td class="score" style="font-weight:800;">${tot}</td></tr>`;
 const hasOT = !!r.ot;
 return `<table class="linescore"><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th>${hasOT?'<th>OT</th>':''}<th>T</th></tr></thead><tbody>${row(g.away, r.awayQ, r.awayScore)}${row(g.home, r.homeQ, r.homeScore)}</tbody></table>`;
}
function renderTeamStatsHTML(g){
 const r = g.result, h = r.homeStats, a = r.awayStats;
 const rows = [
  ['Total Yards', a.totalYards, h.totalYards], ['Passing Yards', a.passYards, h.passYards], ['Rushing Yards', a.rushYards, h.rushYards],
  ['Turnovers', a.turnovers, h.turnovers], ['Sacks Taken', a.sacks, h.sacks], ['Defensive TDs', g.detail?(g.detail.away.defScores||[]).length:'—', g.detail?(g.detail.home.defScores||[]).length:'—'], ['Rush att / dropbacks', g.detail?`${g.detail.away.plays.rush}/${g.detail.away.plays.pass}`:'—', g.detail?`${g.detail.home.plays.rush}/${g.detail.home.plays.pass}`:'—'], ['Time of Possession', fmtTOP(a.top), fmtTOP(h.top)]
 ].map(x=>`<tr><td>${x[1]}</td><td class="narr" style="text-align:center;">${x[0]}</td><td style="text-align:right;">${x[2]}</td></tr>`).join('');
 return `<table style="margin-top:10px;"><tbody>${rows}</tbody></table>`;
}
function renderKeyPlayersHTML(g){
 const mvp = g.detail.mvp;
 function card(team, sd){
  const rows = notablePlayers(sd).map(p=>{
   const star = p.name===mvp.name && p.team===mvp.team;
   return `<tr class="${star?'kp-mvp':''}"><td class="pos">${p.group}</td><td><div class="nm">${p.name}${star?' ⭐':''}</div><div class="st">${p.line.replace(/, /g,' · ')}</div></td></tr>`;
  }).join('');
  return `<div class="kp-card"><div class="kp-title">${team}</div><table class="kp"><tbody>${rows}</tbody></table></div>`;
 }
 return `<h4 style="margin:14px 0 8px;">Key Players <span class="narr" style="font-weight:400;">(⭐ game ball)</span></h4><div class="kp-grid">${card(g.away, g.detail.away)}${card(g.home, g.detail.home)}</div>`;
}

// ---- the model's own view of a matchup: unit grades + where each side's expected points come from ----
function matchupMathInner(homeTeam, awayTeam, g){
 const S = seasonState, lg = S.league;
 const H = S.unitRatings[homeTeam], A = S.unitRatings[awayTeam];
 const pl = g ? ensureGamePlans(g) : DEFAULT_PLAN_PAIR;
 const mh = matchupModel(H, A, lg, {off:pl.home.off, def:pl.away.def}), ma = matchupModel(A, H, lg, {off:pl.away.off, def:pl.home.def});
 const projH = mh.structPts + HOME_FIELD, projA = ma.structPts;
 const stA = (typeof zpbRowVars==='function') ? zpbRowVars(awayTeam) : '';
 const stH = (typeof zpbRowVars==='function') ? zpbRowVars(homeTeam) : '';
 const units = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
 const mx = Math.max(...units.map(u=>Math.max(H[u]||0, A[u]||0)), 1);
 const row = u=>{
  const hv = H[u]||0, av = A[u]||0;
  return `<div class="zpb-mrow"><div class="zpb-mcell" style="${stA}"><b>${Math.round(av)}</b><span class="zpb-mbar"><i style="width:${(av/mx*100).toFixed(0)}%;"></i></span></div><span class="zpb-mlab">${UNIT_INFO[u].label}</span><div class="zpb-mcell zpb-mc-h" style="${stH}"><span class="zpb-mbar"><i style="width:${(hv/mx*100).toFixed(0)}%;"></i></span><b class="zpb-mnum">${Math.round(hv)}</b></div></div>`;
 };
 return `<div class="zpb-mhead"><span>${nick(awayTeam)} ${Math.round(projA)}</span><span>${Math.round(projH)} ${nick(homeTeam)}</span></div>
  <div class="zpb-mgrid">${units.map(row).join('')}</div>`;
}
function renderMatchupMathHTML(homeTeam, awayTeam, g){
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Matchup math <span class="narr" style="font-weight:400;">(how the model sees this game)</span></h4>${matchupMathInner(homeTeam, awayTeam, g)}</div>`;
}

// ---- your team's identity: which units define it, using the same grades the sim runs on ----
function flexReport(team){
 const sm = seasonState.teams[team].slotmap, out = []; let total = 0;
 ROSTER_SLOTS.forEach(s=>{ const raw = sm[s]; if(Array.isArray(raw)){ const pen = flexPenaltyFor(raw[1], s); if(pen){ out.push(`${raw[0]} (${POS_DISPLAY[raw[1]]||raw[1]}) at ${LABELS[s]||s}, −${pen}`); total += pen; } } });
 return {list:out, total};
}
function renderGameResultHTML(game, focusTeam){
 const r = game.result;
 const focusIsHome = game.home===focusTeam;
 const fs = focusIsHome ? r.homeScore : r.awayScore, os = focusIsHome ? r.awayScore : r.homeScore;
 const outcome = fs>os ? 'WIN' : fs<os ? 'LOSS' : 'TIE';
 const color = outcome==='WIN' ? 'var(--good)' : outcome==='LOSS' ? 'var(--bad)' : 'var(--sub)';
 const title = game.roundLabel ? game.roundLabel : `Week ${game.week}`;
 return `<div class="panel" style="margin-bottom:14px;">
  <h4 style="margin-top:0;">${title}${game.divisional?' · Division Game':''} <span style="color:${color};font-weight:800;margin-left:8px;">${focusTeam?outcome:''}</span></h4>
  <div class="score-line">
   <div class="sl-team" style="text-align:right;">${game.away}</div>
   <div class="sl-score"><span class="${game.away===focusTeam?'zpb-usscore':''}">${r.awayScore}</span> – <span class="${game.home===focusTeam?'zpb-usscore':''}">${r.homeScore}</span>${r.ot?' <span class="narr" style="font-size:0.7rem;">OT</span>':''}</div>
   <div class="sl-team">${game.home}</div>
  </div>
  ${renderLineScoreHTML(game)}
  ${renderKeyPlayersHTML(game)}
  <details style="margin-top:10px;"><summary class="narr" style="cursor:pointer;">Team stats</summary>${renderTeamStatsHTML(game)}</details>
 </div>`;
}
function renderLineupComparisonHTML(homeTeam, awayTeam){
 const homeSlotmap = seasonState.teams[homeTeam].slotmap, awaySlotmap = seasonState.teams[awayTeam].slotmap;
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Lineups <span class="narr" style="font-weight:400;">(${awayTeam} left · ${homeTeam} right)</span></h4>${renderLineupTableHTML(awaySlotmap, homeSlotmap, awayTeam, homeTeam)}</div>`;
}
function renderStandingsHTML(){
 const standings = computeStandings(seasonState.schedule, teamNames());
 const user = seasonUserTeam();
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const divTable = (div, minor)=>{
  const rows = divisionStandings(div, standings, seasonState.schedule);
  if(minor){
   return `<div class="zpb-smdiv"><h6>${div}</h6>${rows.map(r=>`<div class="zpb-smrow ${r.team===user?'zpb-smrow-me':''}"><span class="narr">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</span><span>${lg(r.team)}${nick(r.team)}</span></div>`).join('')}</div>`;
  }
  return `<div class="divtable zpb-divmain"><h5>${div}</h5><table><thead><tr><th>W-L</th><th></th><th>PF</th><th>PA</th><th>Diff</th></tr></thead><tbody>${rows.map(r=>{
    const gp = r.wins+r.losses+r.ties;
    return `<tr class="${r.team===user?'user-row':''} zpb-standrow" style="${(typeof zpbRowVars==='function')?zpbRowVars(r.team):''}"><td class="score">${r.wins}-${r.losses}${r.ties?'-'+r.ties:''}</td><td>${lg(r.team)}${nick(r.team)}</td><td class="score">${r.pf}</td><td class="score">${r.pa}</td><td class="narr">${r.diff>=0?'+':''}${r.diff}</td></tr>`;
   }).join('')}</tbody></table></div>`;
 };
 const myDiv = divisionOfTeam(user);
 const conf = conferenceOfTeam(user);
 const otherDivs = [];
 Object.keys(CONFERENCES).forEach(c=> CONFERENCES[c].forEach(d=>{ if(d!==myDiv) otherDivs.push(d); }));
 const ordered = otherDivs.filter(d=>d.indexOf(conf)===0).concat(otherDivs.filter(d=>d.indexOf(conf)!==0));
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">STANDINGS</h4>
  <div class="zpb-stand-grid">${divTable(myDiv, false)}${ordered.map(d=>divTable(d, true)).join('')}</div>
 </div>`; // w19 (Owner): your division sits twice as wide as every other box
}
function seedLabel(g, sideKey){
 const seed = g[sideKey+'Seed'], conf = g[sideKey+'Conf'];
 if(!seed) return '';
 return conf ? `${conf} champion · #${seed} seed` : `Seed #${seed}`;
}
function renderBracketHTML(){
 const order = ['wildcard','divisional','champ','superbowl'];
 let html = '';
 order.forEach(rk=>{
  const games = seasonState.playoffRounds && seasonState.playoffRounds[rk];
  if(!games) return;
  html += `<div class="bracket-round"><h4>${ROUND_LABELS[rk]}</h4>`;
  games.forEach(g=>{
   const tag = (s,k)=> g[k+'Seed'] ? ` <span class="narr">(${g[k+'Conf']?g[k+'Conf']+' ':''}#${g[k+'Seed']})</span>` : '';
   if(g.result){
    const homeWon = g.result.homeScore>g.result.awayScore;
    html += `<div class="bracket-game bg3"><span class="${!homeWon?'bg-winner':''}">${g.away}${tag(g,'away')} ${g.result.awayScore}</span><span class="narr">final</span><span class="${homeWon?'bg-winner':''}">${g.result.homeScore} ${g.home}${tag(g,'home')}</span></div>`;
   } else {
    html += `<div class="bracket-game bg3"><span>${g.away}${tag(g,'away')}</span><span class="narr">${g.neutral?'neutral site':'@'}</span><span>${g.home}${tag(g,'home')}</span></div>`;
   }
  });
  html += `</div>`;
 });
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Playoff Bracket</h4>${html}</div>`;
}
function matchupCardHTML(g, sub){
 const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 const rv = n=> (typeof zpbRowVars==='function') ? zpbRowVars(n) : '';
 return `<div class="zpb-mu">
  <div class="zpb-mu-team" style="${rv(g.away)}"><div class="zpb-mu-logo">${lg(g.away)}</div><div class="zpb-mu-name">${g.away}</div><div class="zpb-mu-rec">${sub(g,'away')}</div></div>
  <div class="zpb-mu-at"><span>${g.neutral?'VS':'@'}</span></div>
  <div class="zpb-mu-team" style="${rv(g.home)}"><div class="zpb-mu-logo">${lg(g.home)}</div><div class="zpb-mu-name">${g.home}</div><div class="zpb-mu-rec">${sub(g,'home')}</div></div>
 </div>`;
}
function renderUserScheduleHTML(){
 const user = seasonUserTeam();
 const mine = seasonState.schedule.filter(g=>g.home===user||g.away===user).sort((a,b)=>a.week-b.week);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const tiles = mine.map(g=>{
  const home = g.home===user, opp = home ? g.away : g.home;
  let res = '<span class="zst-res zst-t">·</span>', cls = 'zst-tile';
  if(g.played){
   const fs = home?g.result.homeScore:g.result.awayScore, os = home?g.result.awayScore:g.result.homeScore;
   const o = fs>os?'W':fs<os?'L':'T';
   res = `<span class="zst-res zst-${o.toLowerCase()}">${o}</span><span class="zst-score">${fs}–${os}</span>`;
   cls += ' zst-played';
  }
  return `<div class="${cls}" data-wk="${g.week}" title="Week ${g.week}${g.divisional?' · division game':''}"><span class="zst-wk">${g.week}</span><span class="zst-at">${home?'vs':'@'}</span><span class="zst-logo">${lg(opp)}</span><span class="zst-opp">${opp}</span>${res}</div>`;
 }).join('');
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><h4 style="margin-top:0;">SCHEDULE</h4><div class="zst-grid">${tiles}</div><div class="zst-details">${mine.filter(g=>g.played&&g.summary).map(g=>`<div class="zst-detail" id="sg-detail-${g.week}" style="display:none;"><div class="detailwrap">${renderGameResultHTML(g, user)}</div></div>`).join('')}</div></div>`;
}
function wireScheduleClicks(container){
 container.querySelectorAll('.zst-played').forEach(el=>{
  el.addEventListener('click', ()=>{
   const row = document.getElementById('sg-detail-'+el.dataset.wk);
   if(!row) return;
   row.style.display = row.style.display==='none' ? 'block' : 'none';
   if(row.style.display==='block') row.scrollIntoView({block:'nearest', behavior:'smooth'});
  });
 });
}

// ---------- phase views ----------
function renderRegularSeasonView(container){
 const user = seasonUserTeam();
 const week = seasonState.currentWeek;
 const myGame = seasonState.schedule.find(g=>g.week===week && (g.home===user||g.away===user));
 let html = '';
 if(!seasonState.weekSimulated){
  html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h3 style="margin:0;">Week ${week} of 17</h3><div style="display:flex;gap:10px;flex-wrap:wrap;">${myGame?'':'<button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Simulate Week '+week+'</button>'}<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button></div></div>`;
  if(myGame){
   const st = computeStandings(seasonState.schedule, teamNames());
   html += matchupCardHTML(myGame, (g,k)=>recFull(st, g[k])) + matchupTagHTML(myGame);
  }
  html += `</div>`;
  if(myGame){
   const opp = myGame.home===user ? myGame.away : myGame.home;
    html += '<div class="zpb-playrow"><button class="resetbtn zpb-ctabig" id="simWeekBtn" style="width:auto;margin:0;padding:12px 30px;">Play the ' + nick(myGame.home===user?myGame.away:myGame.home) + '</button></div>';
   html += renderPreviewPanel(myGame, 'regular') + renderLineupComparisonHTML(myGame.home, myGame.away) + renderGamePlanPanel(myGame) + renderMatchupMathHTML(myGame.home, myGame.away, myGame); // w19 (Owner): the scouting report repeated the matchup math — gone
  }
 } else {
  const last = week>=17;
  html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
    <h3 style="margin:0;">Week ${week} Results</h3>
    <div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="resetbtn" id="nextWeekBtn" style="width:auto;margin:0;padding:10px 24px;">${last?'Continue to Regular Season Review':`Continue to Week ${week+1}`}</button>${last?'':'<button class="tabbtn zpb-ctasmall zpb-simseason" id="simSeasonBtn">SIM SEASON</button>'}</div></div></div>`;
  if(myGame) html += renderGameResultHTML(myGame, user);
  const weekGames = seasonState.schedule.filter(g=>g.week===week);
  const scoreRows = weekGames.map(g=>{
   const hw = g.result.homeScore>g.result.awayScore, aw = g.result.awayScore>g.result.homeScore;
   const mineRow = g.home===user||g.away===user;
   return `<div class="bracket-game bg3" style="${mineRow?'border-color:var(--accent);':''}"><span class="${aw?'bg-winner':''}">${g.away} ${g.result.awayScore}</span><span class="narr">${g.divisional?'div':'final'}</span><span class="${hw?'bg-winner':''}">${g.result.homeScore} ${g.home}</span></div>`;
  }).join('');
  html += `<details class="panel" style="margin-bottom:14px;"><summary style="cursor:pointer;font-weight:700;">Around the league — Week ${week} scores</summary><div style="margin-top:8px;">${scoreRows}</div></details>`;
 }
 html += lineupPanelHTML() + renderUserScheduleHTML() + renderStandingsHTML() + renderStatsTabsHTML() + seasonOptionsHTML(); // w19 (Owner): Your Team's Identity repeated the math — gone
 container.innerHTML = html;
 wireScheduleClicks(container); wireStatsTabs(); wireGamePlanPanel(container); wireSeasonOptions(container); wireLineupPanel(container);
 const sim = document.getElementById('simWeekBtn');
 if(sim) sim.addEventListener('click', ()=>{ simulateCurrentWeek(); renderSeasonTab(container); });
 const nxt = document.getElementById('nextWeekBtn');
 if(nxt) nxt.addEventListener('click', ()=>{ advanceWeek(); renderSeasonTab(container); });
 const simAll = document.getElementById('simSeasonBtn');
 if(simAll) simAll.addEventListener('click', ()=>{ simRestOfSeason(); renderSeasonTab(container); });
}
// Destructive actions live at the bottom of the page, away from the simulate buttons, and always ask first.
function seasonOptionsHTML(){
 return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;"><button class="tabbtn" id="restartSeasonBtn">Start a new season (same roster)…</button><button class="tabbtn" id="newDraftFromSeasonBtn">Start a new draft…</button></div>`;
}
function startNewDraftFlow(){
 if(typeof zpbClearTeamTheme==='function') zpbClearTeamTheme();
 if(typeof zpbRewireGuide==='function') zpbRewireGuide();
 seasonState = null; league100 = null;
 const panel = document.getElementById('draftFinalResults'); if(panel) panel.style.display = 'none';
 document.getElementById('draftLive').style.display = 'none';
 document.getElementById('draftSetup').style.display = 'block'; { const gh = document.getElementById('draftGuideHost'); if(gh) gh.style.display=''; }
 setActiveTab('viewDraft','tabDraftBtn');
}
function wireSeasonOptions(container){
 const a = document.getElementById('restartSeasonBtn'), b = document.getElementById('newDraftFromSeasonBtn');
 if(a) a.addEventListener('click', ()=> zpbCaution('Yes, start a new season', ()=>{ startSeason(); renderSeasonTab(container); }));
 if(b) b.addEventListener('click', ()=> zpbCaution('Yes, start a new draft', startNewDraftFlow));
}

// ================= w19 · THE SEASON IN BADGES =================
// The Owner's order: offense badges, a cinematic of the three offensive stars, defense badges,
// the three defenders, the honors your players earned, then the playoff verdict — one beat per badge.
function zpbSeasonStoryHTML(){
 const F = factsBase(), S = F.S, user = F.user, me = F.me, log = F.log, T = F.T, gp = F.gp, t = T[user];
 const U = S.unitRanks[user] || {};
 const conf = conferenceOfTeam(user);
 const seedEntry = S.seeds ? S.seeds[conf].find(x=>x.team===user) : null;
 const made = !!seedEntry;
 const rankOf = (key, asc)=> rankIn(T, key, user, asc);
 const sk = winLossStreaks(log);
 const wins = log.filter(g=>g.margin>0), losses = log.filter(g=>g.margin<0);
 const big = wins.slice().sort((a,b)=>b.margin-a.margin)[0];
 const marquee = wins.slice().sort((a,b)=>F.st[b.opp].wins-F.st[a.opp].wins)[0];
 const worst = losses.slice().sort((a,b)=>a.margin-b.margin)[0];
 const bad = losses.slice().sort((a,b)=>F.st[a.opp].wins-F.st[b.opp].wins)[0];
 const close = log.filter(g=>Math.abs(g.margin)<=8), cw = close.filter(g=>g.margin>0).length;
 const dv = log.filter(g=>g.divisional), dw = dv.filter(g=>g.margin>0).length;
 const home = log.filter(g=>g.home), hw = home.filter(g=>g.margin>0).length;
 const road = log.filter(g=>!g.home), rw = road.filter(g=>g.margin>0).length;
 const poSet = new Set(S.seeds ? S.seeds.AFC.concat(S.seeds.NFC).map(x=>x.team) : []);
 const vs = log.filter(g=>poSet.has(g.opp)), vw = vs.filter(g=>g.margin>0).length;
 const ppg = t.pf/gp, ppgDiff = (t.pf-t.pa)/gp;
 const rec = F.me.wins+'-'+F.me.losses+(F.me.ties?'-'+F.me.ties:'');
 const expW = F.gp * Math.pow(F.me.pf,2.37)/(Math.pow(F.me.pf,2.37)+Math.pow(F.me.pa,2.37));
 const badge = (k, v, cls)=>({k, v, cls: cls||''});
 const OFF = [
  badge('RECORD', rec, 'zpb-sb-hero' + (F.me.losses===0&&F.me.ties===0 ? ' zpb-sb-perfect' : '')),
  seedEntry ? badge(conf.toUpperCase()+' SEED', '#'+seedEntry.seed, 'zpb-sb-gold') : null,
  sk.best.W.n>=3 ? badge('WIN STREAK', sk.best.W.n+' · W'+sk.best.W.s+'–'+sk.best.W.e, 'zpb-sb-good') : (sk.best.L.n>=3 ? badge('LOSING STREAK', sk.best.L.n+' · W'+sk.best.L.s+'–'+sk.best.L.e, 'zpb-sb-bad') : null),
  badge('PPG MARGIN', (ppgDiff>=0?'+':'−')+Math.abs(ppgDiff).toFixed(1), ppgDiff>=0?'zpb-sb-good':'zpb-sb-bad'),
  badge('WINS PREDICTED', expW.toFixed(1)),
  big ? badge('BLOWOUT WIN', big.fs+'–'+big.os+' '+(big.home?'VS':'@')+' '+nick(big.opp)+' · W'+big.week, 'zpb-sb-good') : null,
  (marquee && (!big || marquee.week!==big.week)) ? badge('BEST WIN', marquee.fs+'–'+marquee.os+' VS '+nick(marquee.opp)+' ('+F.st[marquee.opp].wins+'-'+F.st[marquee.opp].losses+') · W'+marquee.week, 'zpb-sb-good') : null,
  worst ? badge('WORST LOSS', worst.fs+'–'+worst.os+' '+(worst.home?'VS':'@')+' '+nick(worst.opp)+' · W'+worst.week, 'zpb-sb-bad') : null,
  (bad && (!worst || bad.week!==worst.week) && F.st[bad.opp].wins<=7) ? badge('PAIN', 'W'+bad.week+' VS '+nick(bad.opp)+' ('+F.st[bad.opp].wins+'-'+F.st[bad.opp].losses+')', 'zpb-sb-bad') : null,
  close.length>=3 ? badge('ONE SCORE', cw+'–'+(close.length-cw)) : null,
  dv.length ? badge('VS DIVISION', dw+'–'+(dv.length-dw)) : null,
  badge('AT HOME', hw+'–'+(home.length-hw)),
  badge('ON THE ROAD', rw+'–'+(road.length-rw)),
  vs.length>=3 ? badge('VS PLAYOFF TEAMS', vw+'–'+(vs.length-vw)) : null,
  badge('PTS SCORED PER GAME', ppg.toFixed(1)+' · #'+rankOf('pf', false)),
  badge('RUSH YARDS PER GAME', Math.round(t.rush/gp)+' · #'+rankOf('rush', false)),
  badge('PASS YARDS PER GAME', Math.round(t.pass/gp)+' · #'+rankOf('pass', false)),
  badge('RUN BLOCKING', '#'+(U.olRun||32)),
  badge('PASS PROTECTION', '#'+(U.olPass||32)),
  badge('SACKS ALLOWED', t.skTaken+' · #'+rankOf('skTaken', true)),
 ].filter(Boolean);
 const DEF = [
  badge('PTS ALLOWED PER GAME', (t.pa/gp).toFixed(1)+' · #'+rankOf('pa', true)),
  badge('RUSH YARDS ALLOWED', Math.round(t.rushA/gp)+' · #'+rankOf('rushA', true)),
  badge('PASS YARDS ALLOWED', Math.round(t.passA/gp)+' · #'+rankOf('passA', true)),
  badge('SACKS', t.skForced+' · #'+rankOf('skForced', false)),
  badge('PASS RUSH', '#'+(U.passRush||32)),
  badge('RUN DEFENSE', '#'+(U.frontRun||32)),
  badge('SECONDARY', '#'+(U.coverage||32)),
  badge('TAKEAWAYS', t.take+' · #'+rankOf('take', false)),
 ];
 const mine = teamPlayerStats(user);
 const top3 = groups=> mine.filter(r=>groups.includes(r.group)).sort((a,b)=>(b._rating||0)-(a._rating||0)).slice(0,3);
 const offStars = top3(['QB','RB','WR','TE']), defStars = top3(['DL','LB','DB']);
 const qbRec = mine.find(r=>r.group==='QB');
 const factors = [
  ['RUN BLOCKING', U.olRun], ['PASS PROTECTION', U.olPass], ['PASS RUSH', U.passRush], ['RUN DEFENSE', U.frontRun], ['SECONDARY', U.coverage],
  ['QUARTERBACK', qbRec && qbRec._rank ? qbRec._rank : null],
 ].filter(f=>f[1]!=null).map(f=>({k:f[0], r:f[1]}));
 const worstTwo = factors.slice().sort((a,b)=>b.r-a.r).slice(0,2);
 const bestTwo = factors.slice().sort((a,b)=>a.r-b.r).slice(0,2);
 const KEYF = worstTwo.map(f=>({k:f.k, v:'#'+f.r, cls:'zpb-sb-bad'})).concat(bestTwo.map(f=>({k:f.k, v:'#'+f.r, cls:'zpb-sb-good'})));
 // the honors your players earned
 const A = S.awardsRS || null;
 const honorCards = [];
 if(A){
  A.individual.forEach(a=>{
   if(a.c && a.c.team===user) honorCards.push({t:a.title, n:a.c.name, pos:a.c.pos, sub:a.why, gold:true});
   else if(!a.c && a.team===user) honorCards.push({t:a.title, n:(a.coach?a.coach+' · ':'')+a.team, sub:a.why, gold:true});
  });
  ['first','second'].forEach((k,i)=>{
   Object.keys(A.allPro[k]||{}).forEach(pos=>{ (A.allPro[k][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:(i===0?'FIRST-TEAM':'SECOND-TEAM')+' ALL-PRO', n:c.name, pos:pos, gold:i===0}); }); });
  });
  Object.keys(A.proBowl||{}).forEach(cf=>{ Object.keys(A.proBowl[cf]).forEach(pos=>{ (A.proBowl[cf][pos]||[]).forEach(c=>{ if(c.team===user) honorCards.push({t:'PRO BOWL', n:c.name, pos:pos}); }); }); });
 }
 const starCard = (r, i, sideCls)=>`<div class="zpb-scard ${sideCls||''}" style="${(typeof zpbRowVars==='function')?zpbRowVars(user):''}--beat:${i}" data-beat="${i}"><div class="zpb-scard-hd"><b class="${(r.ovr||0)>=90?'zpb-shm':(r.ovr||0)>=85?'zpb-vib':''}">${r.name}</b><span class="zpb-poschip">${r.pos||r.group}</span></div><div class="zpb-schiprow">${zpbStatChipsHTML(r)}</div></div>`;
 const badgeHTML = (b, i)=>`<span class="zpb-sbadge ${b.cls}" style="--beat:${i}" data-beat="${i}"><b>${b.v}</b><i>${b.k}</i></span>`;
 let beat = 0, oHTML = '', dHTML = '', kHTML = '', hHTML = '';
 OFF.forEach(b=>{ oHTML += badgeHTML(b, beat++); });
 oHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 offStars.forEach(r=>{ oHTML += starCard(r, beat++); });
 DEF.forEach(b=>{ dHTML += badgeHTML(b, beat++); });
 dHTML += `<span class="zpb-sbreak" data-beat="${beat++}"></span>`;
 defStars.forEach(r=>{ dHTML += starCard(r, beat++); });
 KEYF.forEach(b=>{ kHTML += badgeHTML(b, beat++); });
 honorCards.forEach(c=>{ hHTML += `<div class="zpb-scard zpb-shonor" style="--beat:${beat}" data-beat="${beat++}"><div class="zpb-scard-hd"><b class="zpb-shm">${c.n}</b><span class="zpb-poschip">${c.pos||''}</span></div><div class="zpb-shonor-t">${c.t}</div>${c.sub?`<div class="zpb-shonor-w">${c.sub}</div>`:''}</div>`; });
 const beats = beat;
 const perfect = F.me.losses===0 && F.me.ties===0;
 return `<div class="panel zpb-storypanel${perfect?' zpb-story-perfect':''}" style="margin-bottom:14px;" id="zpbStoryPanel">
  <div class="zpb-story-kicker zpb-shm">THE SEASON IN BADGES</div>
  <div class="zpb-story-rail" data-total="${beats}">
   <div class="zpb-story-zone">${oHTML}</div>
   <div class="zpb-story-zone">${dHTML}</div>
   ${honorCards.length?`<div class="zpb-story-zone zpb-story-honors">${hHTML}</div>`:''}
   <div class="zpb-story-zone"><span class="zpb-szonehead" style="--beat:${beat++}">KEY FACTORS</span>${kHTML}</div>
  </div>
 </div>`;
}
// the veil rises once the last badge lands; CONTINUE releases the page
window.zpbWireStory = function(){
 const panel = document.getElementById('zpbStoryPanel'); if(!panel || panel.dataset.zwired) return;
 panel.dataset.zwired = '1';
 const rail = panel.querySelector('.zpb-story-rail');
 const total = rail ? (+rail.dataset.total||0) : 0;
 const veil = panel.querySelector('.zpb-story-veil');
 const show = ()=>{ if(!veil) return; veil.classList.add('zpb-veil-on'); const b = document.getElementById('zpbStoryGo'); if(b) b.focus(); };
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) show();
 else setTimeout(show, Math.min(total*1000 + 1200, 90000));
 const go = document.getElementById('zpbStoryGo');
 if(go) go.addEventListener('click', ()=>{ veil.classList.remove('zpb-veil-on'); veil.classList.add('zpb-veil-off'); try{ FX.play('small','On to the playoffs'); }catch(e){} });
};

function renderRegularReviewView(container){
 const user = seasonUserTeam(), conf = conferenceOfTeam(user);
 const st = computeStandings(seasonState.schedule, teamNames());
 const s = st[user];
 const seedCards = ['AFC','NFC'].map(c=>`<div><h5 style="margin:0 0 6px;" class="narr">${c} playoff field</h5>${seasonState.seeds[c].map(x=>`<div class="bracket-game" style="${x.team===user?'border-color:var(--accent);':''}"><span>#${x.seed} ${x.team}</span><span class="narr">${x.wins}-${x.losses}${x.ties?'-'+x.ties:''}</span></div>`).join('')}</div>`).join('');
 const made = seasonState.seeds[conf].some(x=>x.team===user);
 let html = `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
   <h3 style="margin:0;">Regular Season Review</h3>
   <div style="display:flex;gap:8px;flex-wrap:wrap;">${made?'<button class="resetbtn" id="beginPlayoffsBtn" style="width:auto;padding:10px 24px;">Begin Playoffs</button>':''}<button class="tabbtn" id="simPlayoffsBtn">Sim Playoffs</button></div></div>
   <p class="dsub" style="margin-top:8px;">${user}: ${s.wins}-${s.losses}${s.ties?'-'+s.ties:''} · ${s.pf} PF · ${s.pa} PA</p>
  </div>`;
 html = zpbSeasonStoryHTML() + html; // w19 (Owner): the season in badges IS the first panel — the dropdown is gone
 html += `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Playoff Picture ${made?'':'<span class="narr">(your team is out)</span>'}</h4><div class="draft-columns" style="grid-template-columns:1fr 1fr;">${seedCards}</div></div>`;
 html += renderRegularAwardsHTML(seasonState.awardsRS, true) + renderReportCardHTML() + pickCritiqueHTML() + renderFieldTableHTML() + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderUserScheduleHTML() + renderStandingsHTML();
 container.innerHTML = html;
 try{ zpbWireStory(); }catch(e){}
 wireScheduleClicks(container); wireStatsTabs();
 { const bp = document.getElementById('beginPlayoffsBtn'); if(bp) bp.addEventListener('click', ()=>{ startPlayoffs(); renderSeasonTab(container); }); }
 document.getElementById('simPlayoffsBtn').addEventListener('click', ()=>{ startPlayoffs(); for(const rk of ['wildcard','divisional','champ','superbowl']){ simulatePlayoffRound(); if(rk!=='superbowl') advancePlayoffRound(); } renderSeasonTab(container); });
}

function renderPlayoffsView(container){
 const user = seasonUserTeam();
 const rk = seasonState.currentPlayoffRound;
 const games = seasonState.playoffRounds[rk];
 let html = '';
 if(!seasonState.playoffRoundSimulated){
  const status = userPlayoffStatus(user);
  html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${ROUND_LABELS[rk]}</h3>`;
  if(status.status==='missed') html += `<p class="dsub">${user} didn't make the playoffs this year. Simulate to watch the bracket play out.</p>`;
  else if(status.status==='eliminated') html += `<p class="dsub">${user} was eliminated in the ${ROUND_LABELS[status.round]}. Simulate to watch the rest of the bracket.</p>`;
  else if(status.status==='playing' && status.round===rk) html += matchupCardHTML(status.game, (g,k)=>seedLabel(g,k));
  else html += `<p class="dsub">${user} has a bye this round. Simulate to see who they'll face.</p>`;
  const iPlay = status.status==='playing' && status.round===rk;
  const myOpp = iPlay ? (status.game.home===user ? status.game.away : status.game.home) : null;
  const roundBtnLbl = iPlay && myOpp ? 'Play the ' + nick(myOpp) : 'Simulate ' + ROUND_LABELS[rk];
  html += `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="simRoundBtn" style="width:auto;padding:10px 24px;">${roundBtnLbl}</button><button class="tabbtn" id="simRestBtn">Sim Playoffs</button></div></div>`;
  if(status.status==='advancing' || (status.status==='playing' && status.round!==rk)) html += lineupPanelHTML();
  if(status.status==='playing' && status.round===rk){
   const pg = status.game, opp = pg.home===user ? pg.away : pg.home;
   html += lineupPanelHTML() + renderPreviewPanel(pg, 'playoff') + renderGamePlanPanel(pg) + renderMatchupMathHTML(pg.home, pg.away, pg) + renderLineupComparisonHTML(pg.home, pg.away); // w19 (Owner): scouting report gone here too
  } else if(games && games.length){
   const feat = games.slice().sort((a,b)=>{ const sc=g=>{ const H=seasonState.unitRatings[g.home], A=seasonState.unitRatings[g.away]; return H.off+H.def+A.off+A.def; }; return sc(b)-sc(a); })[0];
   html += `<div class="narr" style="margin:0 0 6px;">${user} isn't in the featured game of the round — here is the one everyone is talking about.</div>` + renderPreviewPanel(feat, 'playoff');
  }
 } else {
  const mine = games.find(g=>g.home===user||g.away===user);
  const myLost = !!(mine && mine.result && ((mine.home===user && mine.result.awayScore>mine.result.homeScore) || (mine.away===user && mine.result.homeScore>mine.result.awayScore)));
  html += `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
    <h3 style="margin:0;">${ROUND_LABELS[rk]} Results</h3>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="nextRoundBtn" style="width:auto;padding:10px 24px;">${myLost?'SIM PLAYOFFS':'Continue to '+NEXT_ROUND_LABEL[rk]}</button>${rk!=='superbowl'?'<button class="tabbtn" id="simRestBtn">Sim Playoffs</button>':''}</div></div></div>`;
  if(mine) html += renderGameResultHTML(mine, user);
  else html += `<div class="panel" style="margin-bottom:14px;"><p class="dsub" style="margin:0;">${user} weren't in this round.</p></div>`;
  html += games.filter(g=>g!==mine).map(g=>renderGameResultHTML(g, null)).join('');
 }
 html += renderBracketHTML() + renderStatsTabsHTML('po') + renderStatsTabsHTML() + (seasonState.awardsRS ? renderRegularAwardsHTML(seasonState.awardsRS, false) : '');
 container.innerHTML = html; wireStatsTabs(); wireGamePlanPanel(container);
 if(document.getElementById('lineupSeason')) wireLineupPanel(container);
 const sim = document.getElementById('simRoundBtn');
 if(sim) sim.addEventListener('click', ()=>{ simulatePlayoffRound(); renderSeasonTab(container); });
 const rest = document.getElementById('simRestBtn');
 if(rest) rest.addEventListener('click', ()=>{ const order = ['wildcard','divisional','champ','superbowl']; for(let i=order.indexOf(seasonState.currentPlayoffRound); i<4; i++){ if(!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if(order[i]!=='superbowl'){ advancePlayoffRound(); } } renderSeasonTab(container); });
 const nxt = document.getElementById('nextRoundBtn');
 if(nxt) nxt.addEventListener('click', ()=>{
  const myG = (seasonState.playoffRounds[seasonState.currentPlayoffRound]||[]).find(g=>g.home===user||g.away===user);
  const lost = myG && myG.result && ((myG.home===user && myG.result.awayScore>myG.result.homeScore) || (myG.away===user && myG.result.homeScore>myG.result.awayScore));
  if(lost){ const order = ['wildcard','divisional','champ','superbowl']; for(let i=order.indexOf(seasonState.currentPlayoffRound); i<4; i++){ if(!seasonState.playoffRoundSimulated) simulatePlayoffRound(); if(order[i]!=='superbowl'){ advancePlayoffRound(); } } }
  else { advancePlayoffRound(); }
  renderSeasonTab(container); });
}

// ================= SEASON FACTS & REVIEW WRITERS =================
const PRIMARY_STAT = {QB:'passYds', RB:'rushYds', WR:'recYds', TE:'recYds', OL:'rbk', DL:'sack', LB:'tkl', DB:'dint', K:'fg'};
const GROUP_PLURAL = {QB:'quarterbacks', RB:'running backs', WR:'wide receivers', TE:'tight ends', OL:'offensive linemen', DL:'defensive linemen', LB:'linebackers', DB:'defensive backs', K:'kickers'};
const TRENCH_SLOTS = ['OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2'];
const SKILL_SLOTS  = ['QB','RB1','WR1','WR2','WR3','TE1','TE2'];
const BACK7_SLOTS  = ['MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS'];
function mean_(a){ return a.reduce((x,y)=>x+y,0)/a.length; }
function sd_(a){ const m=mean_(a); return Math.sqrt(mean_(a.map(x=>(x-m)**2))); }
function pearson(xs, ys){
 const mx=mean_(xs), my=mean_(ys); let num=0, dx=0, dy=0;
 xs.forEach((x,i)=>{ num+=(x-mx)*(ys[i]-my); dx+=(x-mx)**2; dy+=(ys[i]-my)**2; });
 return dx && dy ? num/Math.sqrt(dx*dy) : 0;
}
function aOrAn(s){ return /^(8|11|18)/.test(String(s)) ? 'an' : 'a'; }
const PRIMARY_SLOTS = new Set(['QB','RB1','WR1','WR2','TE1','DE1','DE2','DT1','DT2','MIKE','WILL','CB1','CB2','SS','FS']);
function ordWord(n){ return ['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'][n] || ordinalNum(n); }

// Position-specific performance ratings: QBR-style in spirit (volume AND efficiency), not a literal copy.
// Each component is compared with the league's players at the same position, so a QB with a huge TD rate and TD:INT
// ratio can outrank a pure yardage leader. Scale ~0-100, 50 = average starter.
const RATING_WEIGHTS = {
 QB:{ypg:0.20, tdpg:0.30, tdint:0.24, intpg:-0.16, rushpg:0.10, sackdpg:-0.04, fumtpg:-0.04, tpcpg:0.02},
 RB:{rushpg:0.32, rushtdpg:0.22, recpg:0.16, rectdpg:0.10, fumpg:-0.20, fumtpg:-0.04, tpcpg:0.03},
 WR:{recpg:0.38, rectdpg:0.40, ctch:0.14, fumpg:-0.08, fumtpg:-0.02, tpcpg:0.03},
 TE:{recpg:0.38, rectdpg:0.40, ctch:0.14, fumpg:-0.08, fumtpg:-0.02, tpcpg:0.03},
 DL:{sackpg:0.40, hurpg:0.14, tflpg:0.10, tklpg:0.12, ffpg:0.22, dintpg:0.02, frpg:0.08, dtdpg:0.06, blkpg:0.04, safpg:0.05},
 LB:{tklpg:0.28, tflpg:0.12, sackpg:0.20, dintpg:0.14, pdpg:0.06, ffpg:0.20, frpg:0.10, dtdpg:0.06, blkpg:0.03, safpg:0.04},
 DB:{dintpg:0.24, pdpg:0.26, tklpg:0.20, ffpg:0.12, sackpg:0.06, frpg:0.08, dtdpg:0.08, blkpg:0.02},
 OL:{pkpg:0.30, rbkpg:0.30, sapg:-0.28, papg:-0.12},
 K:{fgpg:1.0}
};
const RATING_BLURB = {
 QB:'TD rate, TD:INT ratio and interception rate carry more weight than raw yards; sacks taken and fumbles count against him',
 RB:'rushing and receiving production, touchdown rate, 2-Pt Conversions, minus fumbles',
 WR:'receiving yards, touchdown rate and catch rate (receptions per target), minus fumbles',
 TE:'receiving yards, touchdown rate and catch rate (receptions per target), minus fumbles',
 DL:'sack rate first, then forced fumbles, recoveries and tackles; defensive touchdowns, safeties and blocked kicks add to it', LB:'tackles, sacks, takeaways (forced fumbles, recoveries), defensive touchdowns',
 DB:'interceptions first, then tackles, forced fumbles, recoveries and defensive touchdowns', OL:'pancakes and rushing yards gained behind him, minus sacks and pressures allowed', K:'field goals per game'
};
function ratingMetrics(rec){
 const gp = Math.max(rec.gp,1), s = rec.st;
 return {
  ypg:(s.passYds||0)/gp, tdpg:(s.passTD||0)/gp, tdint:((s.passTD||0)+2)/((s.int||0)+2), intpg:(s.int||0)/gp,
  rushpg:(s.rushYds||0)/gp, rushtdpg:(s.rushTD||0)/gp, recpg:(s.recYds||0)/gp, rectdpg:(s.recTD||0)/gp,
  fumpg:(s.fumLost||0)/gp, ctch:((s.rec||0)+3)/((s.tgt||0)+4.5), sackpg:(s.sack||0)/gp, tklpg:(s.tkl||0)/gp,
  ffpg:(s.ff||0)/gp, sackdpg:(s.sackd||0)/gp, fumtpg:(s.fum||0)/gp, tpcpg:(s.tpc||0)/gp, frpg:(s.fr||0)/gp, dtdpg:(s.dtd||0)/gp, blkpg:(s.blk||0)/gp, safpg:(s.saf||0)/gp, dintpg:(s.dint||0)/gp, fgpg:(s.fg||0)/gp, tflpg:(s.tfl||0)/gp, hurpg:(s.hur||0)/gp, pdpg:(s.pd||0)/gp, pkpg:(s.pk||0)/gp, rbkpg:(s.rbk||0)/gp, sapg:(s.sa||0)/gp, papg:(s.pa||0)/gp
 };
}
// Defenders are credited for how valuable the spot they play is (cornerbacks and edge rushers carry more wins than safeties and linebackers),
// so a lockdown corner is not out-rated by a safety who simply collects interceptions and tackles.
function roleBonus(r){
 if(r.group!=='DL' && r.group!=='LB' && r.group!=='DB') return 0;
 const w = slotWinsPerOvr()[r.slot]; if(w==null) return 0;
 return clampNum(0.45*((r.ovr||80)-80)*(w/0.06), -7, 9) + (w/0.06-0.7)*4;
}
function ensureRatings(){
 const S = seasonState;
 if(!S.ratingsDirty && S._ratingsReady) return;
 [S.playerStats, S.playerStatsPO||{}].forEach(book=>{
 const rows = Object.values(book);
 Object.keys(RATING_WEIGHTS).forEach(g=>{
  const peers = rows.filter(r=>r.group===g); if(!peers.length) return;
  const W = RATING_WEIGHTS[g], keys = Object.keys(W), mets = peers.map(ratingMetrics), stats = {};
  keys.forEach(k=>{ const vals = mets.map(m=>m[k]); stats[k] = {m:mean_(vals), s:sd_(vals)}; });
  peers.forEach((r,i)=>{ let z=0; keys.forEach(k=>{ const st=stats[k]; z += W[k]*(st.s>1e-9 ? (mets[i][k]-st.m)/st.s : 0); }); r._rating = clampNum(50+17*z + roleBonus(r), 0, 99.9); });
  peers.slice().sort((a,b)=>b._rating-a._rating).forEach((r,i)=>{ r._rank = i+1; });
 });
 });
 S.ratingsDirty = false; S._ratingsReady = true;
}
const GROUP_SINGULAR = {QB:'quarterback', RB:'running back', WR:'wide receiver', TE:'tight end', OL:'offensive lineman', DL:'defensive lineman', LB:'linebacker', DB:'defensive back', K:'kicker'};
function playerLeagueRank(rec){ ensureRatings(); return rec._rank || 0; }
function rankTag(rec){
 ensureRatings();
 const n = rec._rank, r = rec._rating;
 if(!n) return '';
 if(n===1) return `the league's top-rated ${GROUP_SINGULAR[rec.group]}, ${r.toFixed(1)}`;
 if(n<=5) return `rated #${n} among ${GROUP_PLURAL[rec.group]} (${r.toFixed(1)})`;
 return '';
}
// w19 (Owner): the player-panel format — the stat, then its little boxed label (PassY, TD, INT, 20-0, RushY, SK, QBR, W…)
function zpbStatChipsHTML(rec){
 if(!rec) return '';
 const s = rec.st || {}, g = rec.group, out = [];
 const chip = (v, k)=>'<span class="zpb-schip"><b>' + v + '</b><i>' + k + '</i></span>';
 if(g==='QB'){
  out.push('<span class="zpb-schip zpb-splain"><b>' + fmtN(s.cmp) + '/' + fmtN(s.att) + '</b></span>');
  out.push(chip(fmtN(s.passYds||0), 'PassY'));
  out.push(chip(s.passTD||0, 'TD'));
  out.push(chip(s.int||0, 'INT'));
  out.push(chip(passerRating(s.cmp,s.att,s.passYds,s.passTD||0,s.int||0).toFixed(1), '20-0'));
  if(s.rushYds) out.push(chip(fmtN(s.rushYds), 'RushY'));
  if(s.sackd) out.push(chip(s.sackd, 'SK'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='RB'){
  out.push(chip(fmtN(s.rushYds||0), 'RushY'), chip(s.rushTD||0, 'TD'));
  if(s.recYds) out.push(chip(fmtN(s.recYds), 'RecY'));
  if(s.recTD) out.push(chip(s.recTD, 'RecTD'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='WR'||g==='TE'){
  out.push(chip(fmtN(s.recYds||0), 'RecY'), chip(s.recTD||0, 'TD'));
  if(s.rec) out.push('<span class="zpb-schip zpb-splain"><b>' + fmtN(s.rec) + '/' + fmtN(s.tgt) + '</b></span>');
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='OL'){
  out.push(chip(fmtN(s.rbk||0), 'RbkY'), chip(s.pk||0, 'PK'), chip(s.sa||0, 'SK'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else if(g==='K'){
  out.push(chip((s.fg||0) + '/' + (s.fga||s.fg||0), 'FG'), chip(s.pat||0, 'XP'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 } else {
  if(s.sack) out.push(chip(s.sack, 'SK'));
  if(s.tkl) out.push(chip(s.tkl, 'TKL'));
  if(s.tfl) out.push(chip(s.tfl, 'TFL'));
  if(s.dint) out.push(chip(s.dint, 'INT'));
  if(s.pd) out.push(chip(s.pd, 'PD'));
  if(s.ff) out.push(chip(s.ff, 'FF'));
  if(rec._rating!=null) out.push(chip(rec._rating.toFixed(1), 'QBR'));
 }
 return out.join('<span class="zpb-sdot">·</span>');
}

function playerBlurb(rec){
 if(!rec) return '';
 const tag = rankTag(rec);
 return `<b>${rec.name}</b> (${rec.group}: ${seasonStatLine(rec.group, rec.st)}${tag?` — ${tag}`:''})`;
}

function teamSeasonTotals(){
 const S = seasonState, T = {};
 teamNames().forEach(n=>{ T[n] = {g:0,pf:0,pa:0,rush:0,rushA:0,pass:0,passA:0,skTaken:0,skForced:0,give:0,take:0,rec:0,tgt:0}; });
 S.schedule.forEach(g=>{
  if(!g.played) return;
  const r = g.result, h = T[g.home], a = T[g.away];
  h.g++; a.g++;
  h.pf+=r.homeScore; h.pa+=r.awayScore; a.pf+=r.awayScore; a.pa+=r.homeScore;
  h.rush+=r.homeStats.rushYards; h.rushA+=r.awayStats.rushYards; a.rush+=r.awayStats.rushYards; a.rushA+=r.homeStats.rushYards;
  h.pass+=r.homeStats.passYards; h.passA+=r.awayStats.passYards; a.pass+=r.awayStats.passYards; a.passA+=r.homeStats.passYards;
  h.skTaken+=r.homeStats.sacks; h.skForced+=r.awayStats.sacks; a.skTaken+=r.awayStats.sacks; a.skForced+=r.homeStats.sacks;
  h.give+=r.homeStats.turnovers; h.take+=r.awayStats.turnovers; a.give+=r.awayStats.turnovers; a.take+=r.homeStats.turnovers;
  if(g.detail){ g.detail.home.players.forEach(p=>{ h.rec+=p.st.rec||0; h.tgt+=p.st.tgt||0; }); g.detail.away.players.forEach(p=>{ a.rec+=p.st.rec||0; a.tgt+=p.st.tgt||0; }); }
 });
 return T;
}
function rankIn(T, key, team, ascending){
 const names = Object.keys(T);
 return names.slice().sort((a,b)=> ascending ? T[a][key]-T[b][key] : T[b][key]-T[a][key]).indexOf(team)+1;
}
function userGameLog(){
 const S = seasonState, user = seasonUserTeam();
 return S.schedule.filter(g=>g.played && (g.home===user||g.away===user)).sort((a,b)=>a.week-b.week).map(g=>{
  const home = g.home===user;
  const fs = home ? g.result.homeScore : g.result.awayScore, os = home ? g.result.awayScore : g.result.homeScore;
  return {week:g.week, opp: home?g.away:g.home, home, fs, os, margin: fs-os, divisional:g.divisional, game:g};
 });
}
function userPlayoffLog(){
 const S = seasonState, user = seasonUserTeam(), out = [];
 if(!S.playoffRounds) return out;
 ['wildcard','divisional','champ','superbowl'].forEach(rk=>{
  const g = (S.playoffRounds[rk]||[]).find(x=>x.result && (x.home===user||x.away===user));
  if(!g) return;
  const home = g.home===user;
  const fs = home ? g.result.homeScore : g.result.awayScore, os = home ? g.result.awayScore : g.result.homeScore;
  out.push({round:ROUND_LABELS[rk], opp: home?g.away:g.home, fs, os, won: fs>os, game:g});
 });
 return out;
}
function winLossStreaks(log){
 const best = {W:{n:0,s:0,e:0}, L:{n:0,s:0,e:0}}; let cur = null;
 log.forEach(g=>{
  const k = g.margin>0?'W':g.margin<0?'L':'T';
  if(cur && cur.k===k){ cur.n++; cur.e = g.week; } else cur = {k, n:1, s:g.week, e:g.week};
  if(k!=='T' && cur.n>best[k].n) best[k] = {n:cur.n, s:cur.s, e:cur.e};
 });
 return {best, end:cur};
}
function teamStreakThrough(team, week){
 const games = seasonState.schedule.filter(g=>g.played && g.week<=week && (g.home===team||g.away===team)).sort((a,b)=>a.week-b.week);
 let kind=null, n=0;
 games.forEach(g=>{
  const home = g.home===team, fs = home?g.result.homeScore:g.result.awayScore, os = home?g.result.awayScore:g.result.homeScore;
  const k = fs>os?'W':fs<os?'L':'T';
  if(k===kind) n++; else { kind=k; n=1; }
 });
 return {kind, n};
}
function factsBase(){
 const S = seasonState, user = seasonUserTeam(), names = teamNames();
 const st = computeStandings(S.schedule, names), me = st[user];
 return {S, user, names, st, me, T: teamSeasonTotals(), log: userGameLog(), N: nick(user), gp: me.wins+me.losses+me.ties};
}

// ---- neutral build analysis: how was each roster constructed, and how did those builds fare? ----
function buildGrades(){
 const S = seasonState, names = teamNames(), out = {};
 names.forEach(t=>{
  const sm = S.teams[t].slotmap, avg = sl => sl.reduce((s,k)=>s+slotOvr(sm,k),0)/sl.length;
  out[t] = {trench: avg(TRENCH_SLOTS), skill: avg(SKILL_SLOTS), back7: avg(BACK7_SLOTS)};
 });
 ['trench','skill','back7'].forEach(k=>{
  const vals = names.map(t=>out[t][k]), m = mean_(vals), s = sd_(vals) || 1;
  names.forEach(t=>{ out[t][k+'Z'] = (out[t][k]-m)/s; });
  names.slice().sort((a,b)=>out[b][k]-out[a][k]).forEach((t,i)=>{ out[t][k+'Rank'] = i+1; });
 });
 names.forEach(t=>{ const d = out[t].trenchZ - out[t].skillZ; out[t].type = d>=0.6 ? 'trench-heavy' : d<=-0.6 ? 'skill-heavy' : 'balanced'; });
 return out;
}
function buildSnapshot(F){
 const B = buildGrades(), names = F.names, wins = names.map(n=>F.st[n].wins);
 const r = {
  trench: pearson(names.map(n=>B[n].trench), wins),
  skill: pearson(names.map(n=>B[n].skill), wins),
  back7: pearson(names.map(n=>B[n].back7), wins)
 };
 const byType = {};
 names.forEach(n=>{ (byType[B[n].type]=byType[B[n].type]||[]).push(F.st[n].wins); });
 const po = F.S.seeds ? F.S.seeds.AFC.concat(F.S.seeds.NFC).map(x=>x.team) : [];
 return {B, r, byType, po,
  poTrench: po.filter(t=>B[t].trenchRank<=10).length,
  poSkill: po.filter(t=>B[t].skillRank<=10).length,
  poBack: po.filter(t=>B[t].back7Rank<=10).length};
}

// ---- paragraph fragments (shared by the regular-season review and the final season review) ----
function fragArc(F, final){
 const {user, N, me, log, S} = F, conf = conferenceOfTeam(user), div = divisionOfTeam(user);
 const rec = `${me.wins}-${me.losses}${me.ties?'-'+me.ties:''}`, A = aOrAn(rec);
 const divRows = divisionStandings(div, F.st, S.schedule), divPlace = divRows.findIndex(r=>r.team===user)+1;
 const seedEntry = S.seeds ? S.seeds[conf].find(x=>x.team===user) : null;
 const ppgDiff = ((me.pf-me.pa)/F.gp);
 let tier;
 if(me.wins>=14) tier = pick([`a dominant ${rec} campaign`, `one of the best regular seasons the league has seen at ${rec}`]);
 else if(me.wins>=11) tier = pick([`a strong ${rec} season`, `${A} ${rec} season that put them squarely in the contender conversation`]);
 else if(me.wins>=8) tier = pick([`a middling ${rec} season`, `an up-and-down ${rec} year`]);
 else if(me.wins>=5) tier = pick([`a disappointing ${rec} season`, `${A} ${rec} year that never found its footing`]);
 else tier = pick([`a brutal ${rec} season`, `${A} ${rec} year to forget`]);
 tier = tier.replace(/^a (8|11|18)/,'an $1');
 const place = divPlace===1 ? `won the ${div}` : `finished ${ordWord(divPlace)} in the ${div}`;
 const seed = seedEntry ? `, earning the ${conf}'s #${seedEntry.seed} seed` : ' and missed the postseason';
 const sk = winLossStreaks(log);
 let streak;
 if(sk.best.W.n>=4) streak = `The backbone of the year was ${aOrAn(sk.best.W.n)} ${sk.best.W.n}-game winning streak from Week ${sk.best.W.s} through Week ${sk.best.W.e}.`;
 else if(sk.best.L.n>=4) streak = `The year was defined by ${aOrAn(sk.best.L.n)} ${sk.best.L.n}-game losing streak from Week ${sk.best.L.s} through Week ${sk.best.L.e}.`;
 else streak = `They never won or lost more than three in a row — a season of steady, week-to-week football.`;
 const last5 = log.slice(-5), l5w = last5.filter(g=>g.margin>0).length;
 const finish = l5w>=4 ? `They finished hot, winning ${l5w} of their last 5.` : l5w<=1 ? `They limped to the finish, going just ${l5w}-${5-l5w} down the stretch.` : `They went ${l5w}-${5-l5w} over their last five.`;
 const margin = ppgDiff>=0 ? `They outscored opponents by ${ppgDiff.toFixed(1)} points per game.` : `They were outscored by ${Math.abs(ppgDiff).toFixed(1)} points per game.`;
 // pythagorean check: did the record match the scoring margin?
 const e = 2.37, expW = F.gp * Math.pow(me.pf,e)/(Math.pow(me.pf,e)+Math.pow(me.pa,e)), actW = me.wins + me.ties*0.5, gap = actW-expW;
 let luck = '';
 if(gap>=1.5) luck = ` Their scoring margin was that of ${aOrAn(expW.toFixed(1))} ${expW.toFixed(1)}-win team, so the record leaned on close-game fortune.`;
 else if(gap<=-1.5) luck = ` Their scoring margin was that of ${aOrAn(expW.toFixed(1))} ${expW.toFixed(1)}-win team, so the record undersold how well they actually played.`;
 else luck = ` Their record matched their scoring margin, which suggests it was an honest reflection of the team.`;
 return `The ${N} put together ${tier} and ${place}${seed}. ${streak} ${finish} ${margin}${luck}`;
}
function fragMoments(F){
 const {log, N, st, S} = F;
 const wins = log.filter(g=>g.margin>0), losses = log.filter(g=>g.margin<0);
 const parts = [];
 if(wins.length){
  const big = wins.slice().sort((a,b)=>b.margin-a.margin)[0];
  const marquee = wins.slice().sort((a,b)=>st[b.opp].wins-st[a.opp].wins)[0];
  parts.push(pick([
   `The signature blowout came in Week ${big.week}, a ${big.fs}–${big.os} rout of the ${nick(big.opp)}.`,
   `Nothing was more convincing than the ${big.fs}–${big.os} demolition of the ${nick(big.opp)} in Week ${big.week}.`
  ]));
  if(marquee.week!==big.week) parts.push(`The best win on paper was the ${marquee.fs}–${marquee.os} victory over the ${nick(marquee.opp)} (${st[marquee.opp].wins}-${st[marquee.opp].losses}) in Week ${marquee.week}.`);
 }
 if(losses.length){
  const worst = losses.slice().sort((a,b)=>a.margin-b.margin)[0];
  const bad = losses.slice().sort((a,b)=>st[a.opp].wins-st[b.opp].wins)[0];
  parts.push(pick([
   `The low point was a ${worst.fs}–${worst.os} loss to the ${nick(worst.opp)} in Week ${worst.week}.`,
   `The ugliest result came in Week ${worst.week}, a ${worst.os}–${worst.fs} beating at the hands of the ${nick(worst.opp)}.`
  ]));
  if(bad.week!==worst.week && st[bad.opp].wins<=7) parts.push(`The most frustrating loss was Week ${bad.week} against the ${nick(bad.opp)}, a ${st[bad.opp].wins}-${st[bad.opp].losses} team.`);
 }
 const close = log.filter(g=>Math.abs(g.margin)<=8), cw = close.filter(g=>g.margin>0).length;
 if(close.length>=3) parts.push(`In one-score games they went ${cw}-${close.length-cw}, ${cw>close.length-cw?'a sign of a team that finds a way':cw<close.length-cw?'the kind of luck-sensitive record that can swing the other way next year':'right down the middle'}.`);
 const dv = log.filter(g=>g.divisional), dw = dv.filter(g=>g.margin>0).length;
 if(dv.length) parts.push(`Inside the division they went ${dw}-${dv.length-dw}.`);
 const home = log.filter(g=>g.home), hw = home.filter(g=>g.margin>0).length, road = log.filter(g=>!g.home), rw = road.filter(g=>g.margin>0).length;
 parts.push(`They were ${hw}-${home.length-hw} at home and ${rw}-${road.length-rw} on the road.`);
 if(S.seeds){
  const po = new Set(S.seeds.AFC.concat(S.seeds.NFC).map(x=>x.team)), vs = log.filter(g=>po.has(g.opp)), vw = vs.filter(g=>g.margin>0).length;
  if(vs.length>=3) parts.push(`Against eventual playoff teams, the ${N} went ${vw}-${vs.length-vw}.`);
 }
 return parts.join(' ');
}

// The offensive line as characters: who anchored it, who leaked, and whether the running back's year was his own doing or his blockers'.
const SIDE_OF = {OT1:'L',OG1:'L',C:'M',OG2:'R',OT2:'R'}, SIDE_NAME = {L:'left side',M:'middle',R:'right side'};
function olStory(F){
 const {S, user} = F; ensureRatings();
 const mine = teamPlayerStats(user), ol = mine.filter(r=>r.group==='OL').sort((a,b)=>(b.ovr||0)-(a.ovr||0));
 if(ol.length<3) return '';
 const slotTxt = r=> ({OT1:'left tackle',OT2:'right tackle',OG1:'left guard',OG2:'right guard',C:'center'})[r.slot] || 'lineman';
 const star = ol[0], pancake = ol.slice().sort((a,b)=>(b.st.pk||0)-(a.st.pk||0))[0], leaky = ol.slice().sort((a,b)=>(b.st.sa||0)-(a.st.sa||0))[0];
 const out = [];
 out.push(`Up front, ${playerBlurb(star)} — the ${slotTxt(star)} — was the best lineman on the roster (${star.ovr} OVR)${pancake.name!==star.name?`, while ${pancake.name} led the unit with ${pancake.st.pk||0} pancakes`:`, and he also led the unit with ${star.st.pk||0} pancakes`}.`);
 const avgSa = mean_(ol.map(r=>r.st.sa||0));
 if((leaky.st.sa||0) >= avgSa+3 && (leaky.st.sa||0)>=8) out.push(`${leaky.name} (${slotTxt(leaky)}) was the leak: ${leaky.st.sa} sacks and ${leaky.st.pa||0} pressures allowed, well above the rest of the line.`);
 const rb = mine.filter(r=>r.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0], rd = S.runDir && S.runDir[user];
 if(rb && rd){
  const tot = ['L','M','R'].reduce((a,d)=>a+rd[d].car,0)||1, ypc = d=> rd[d].car? rd[d].yds/rd[d].car : 0, all = ['L','M','R'].reduce((a,d)=>a+rd[d].yds,0)/tot;
  const side = SIDE_OF[star.slot] || 'M', share = rd[side].car/tot, sideYpc = ypc(side);
  const others = ['L','M','R'].filter(d=>d!==side), othYpc = others.reduce((a,d)=>a+rd[d].yds,0)/Math.max(others.reduce((a,d)=>a+rd[d].car,0),1);
  const spread = Math.max(...['L','M','R'].map(ypc)) - Math.min(...['L','M','R'].map(ypc));
  if(share>=0.38 && sideYpc>=othYpc+0.25) out.push(`The running game leaned on that star: ${(share*100).toFixed(0)}% of the carries went behind the ${SIDE_NAME[side]}, averaging ${sideYpc.toFixed(1)} yards a carry against ${othYpc.toFixed(1)} everywhere else. So ${rb.name}'s ${fmtN(rb.st.rushYds)} yards owed a lot to the blocking on that side, not only to his own talent.`);
  else if(spread<0.5 && rb._rank && rb._rank<=6) out.push(`${rb.name}'s production did not depend on one gap: his carries averaged ${ypc('L').toFixed(1)} yards on the left, ${ypc('M').toFixed(1)} up the middle and ${ypc('R').toFixed(1)} on the right. When a back produces that evenly, it is his own ability (he finished #${rb._rank} among backs), not a single star blocker.`);
  else out.push(`The carries split ${(rd.L.car/tot*100).toFixed(0)}% left, ${(rd.M.car/tot*100).toFixed(0)}% middle and ${(rd.R.car/tot*100).toFixed(0)}% right, at ${ypc('L').toFixed(1)}, ${ypc('M').toFixed(1)} and ${ypc('R').toFixed(1)} yards a carry. ${rb.name}'s ${fmtN(rb.st.rushYds)} yards came from ${rb.ovr>=85?'real talent plus ':''}the lanes his line opened.`);
 }
 return out.join(' ');
}

// ---- advanced stats: what actually produced sacks and big runs ----
// team-level advanced stats for the Season Review: how teams scored, who protected the ball, close games, 2-Pt Conversions, returns
function teamAdvancedHTML(){
 const S = seasonState, user = seasonUserTeam(), T = {};
 teamNames().forEach(t=>{ T[t] = {g:0, to:0, tk:0, top:0, run:0, plays:0, td:0, fg:0, tdPts:0, fgPts:0, tpa:0, tpm:0, close:0, closeW:0, ret:0}; });
 S.schedule.forEach(g=>{ if(!g.played||!g.result||!g.detail) return;
  ['home','away'].forEach(sd=>{
   const t = g[sd], x = T[t], r = g.result, st = sd==='home'?r.homeStats:r.awayStats, ost = sd==='home'?r.awayStats:r.homeStats;
   const my = sd==='home'?r.homeScore:r.awayScore, op = sd==='home'?r.awayScore:r.homeScore;
   x.g++; x.to += st.turnovers; x.tk += ost.turnovers; x.top += st.top; x.run += st.rushYards; x.plays += st.rushYards+st.passYards;
   (r[sd+'Events']||[]).forEach(e=>{ if(e.type==='TD'){ x.td++; x.tdPts += e.pts; if(e.pts===8||(e.pts===6&&e.tpTry)){ x.tpa++; if(e.pts===8) x.tpm++; } } else if(e.type==='FG'){ x.fg++; x.fgPts += 3; } });
   if(Math.abs(my-op)<=7){ x.close++; if(my>op) x.closeW++; }
   const rt = g.detail[sd].returner; if(rt) x.ret += (rt.kry||0)+(rt.pry||0);
  });
 });
 const names = teamNames().filter(t=>T[t].g>0); if(!names.length) return '';
 const metrics = [
  ['Turnover margin per game', x=>(x.tk-x.to)/x.g, v=>(v>=0?'+':'')+v.toFixed(2), 'takeaways minus giveaways'],
  ['Time of possession', x=>x.top/x.g, v=>Math.floor(v/60)+':'+String(Math.round(v%60)).padStart(2,'0'), 'minutes per game'],
  ['Rushing share of yardage', x=>x.run/Math.max(x.plays,1)*100, v=>v.toFixed(0)+'%', 'how run-heavy the offense was'],
  ['Touchdowns per game', x=>x.td/x.g, v=>v.toFixed(2), 'all touchdowns, offense and defense'],
  ['Field goals per game', x=>x.fg/x.g, v=>v.toFixed(2), 'made field goals'],
  ['Share of points from touchdowns', x=>x.tdPts/Math.max(x.tdPts+x.fgPts,1)*100, v=>v.toFixed(0)+'%', 'the rest came from field goals'],
  ['2-Pt Conv tries', x=>x.tpa, v=>String(v), 'all season'],
  ['2-Pt Conv success', x=>x.tpa? x.tpm/x.tpa*100 : -1, v=>v<0?'—':v.toFixed(0)+'%', 'made out of tried'],
  ['Win rate in one-score games', x=>x.close? x.closeW/x.close*100 : -1, v=>v<0?'—':v.toFixed(0)+'%', 'games decided by 7 or fewer'],
  ['Return yards per game', x=>x.ret/x.g, v=>v.toFixed(0), 'kick and punt returns']
 ];
 const rows = metrics.map(([label,f,fmt,note])=>{
  const vals = names.map(t=>({t, v:f(T[t])})).sort((a,b)=>b.v-a.v);
  const mine = vals.findIndex(x=>x.t===user)+1, lg = vals.reduce((a,x)=>a+x.v,0)/vals.length, best = vals[0], um = vals.find(x=>x.t===user).v;
  return `<tr><td>${label}<div class="narr">${note}</div></td><td class="score ub">${fmt(um)}</td><td class="score">${mine?('#'+mine):'—'}</td><td class="score">${fmt(lg)}</td><td>${nick(best.t)} <span class="narr">${fmt(best.v)}</span></td></tr>`;
 }).join('');
 const lgTry = names.reduce((a,t)=>a+T[t].tpa,0), lgMade = names.reduce((a,t)=>a+T[t].tpm,0);
 return `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">More advanced stats: how your team scored and protected the ball</summary>
  <table><thead><tr><th>Stat</th><th>${nick(user)}</th><th>Rank</th><th>League avg</th><th>League best</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="narr" style="margin:8px 0 0;">League-wide there were ${lgTry} 2-Pt Conv tries and ${lgMade} were made (${lgTry?Math.round(lgMade/lgTry*100):0}%). Your game-day aggressiveness setting was <b>${AGGR_INFO[(S.aggr||{})[user]||'balanced'].label}</b>.</p></details>`;
}
function advancedStatsHTML(){
 const S = seasonState, user = seasonUserTeam(), cn = {rush:'individual pass rush', ol:'a weak offensive line', cov:'coverage (the quarterback held the ball)'};
 const tally = (team, key)=>{ const c = {rush:0, ol:0, cov:0}; S.schedule.forEach(g=>{ if(!g.played||!g.detail) return; ['home','away'].forEach(sd=>{ if(g[sd]===team && g.detail[sd].sackCauses) g.detail[sd].sackCauses[key].forEach(x=>{ c[x] = (c[x]||0)+1; }); }); }); return c; };
 const leagueShare = key=>{ const c = {rush:0, ol:0, cov:0}; teamNames().forEach(t=>{ const x = tally(t,key); ['rush','ol','cov'].forEach(k=>{ c[k] += x[k]; }); }); const n = c.rush+c.ol+c.cov||1; return {rush:c.rush/n, ol:c.ol/n, cov:c.cov/n, n}; };
 const made = tally(user,'made'), taken = tally(user,'taken'), lgm = leagueShare('made');
 const nm = made.rush+made.ol+made.cov, nt = taken.rush+taken.ol+taken.cov;
 if(!nm && !nt) return '';
 const pct = (v,n)=> n? Math.round(v/n*100)+'%' : '\u2014';
 const mine = teamPlayerStats(user);
 const dl = mine.filter(r=>r.group==='DL').sort((a,b)=>(b.st.sack||0)-(a.st.sack||0));
 const dlRows = dl.map(r=>{ const gp = Math.max(r.gp,1), e = r.st.skE||0, o = r.st.skO||0, c = r.st.skC||0, tot = e+o+c||1;
  const opp = (r.st.opOL||0)/gp, lgOL = S.league.olPass;
  return `<tr><td>${r.name} <span class="narr">${r.ovr||''} OVR</span></td><td class="score">${r.st.sack||0}</td><td class="score">${e}</td><td class="score">${o}</td><td class="score">${c}</td><td class="score">${opp?opp.toFixed(1):'\u2014'}<span class="narr"> (lg ${lgOL.toFixed(1)})</span></td><td class="narr">${verdictSack(e/tot, o/tot, opp-lgOL)}</td></tr>`; }).join('');
 const ol = mine.filter(r=>r.group==='OL').sort((a,b)=>(b.st.sa||0)-(a.st.sa||0));
 const olRows = ol.map(r=>`<tr><td>${r.name} <span class="narr">${LABELS[r.slot]||r.slot} \u00b7 ${r.ovr||''} OVR</span></td><td class="score">${r.st.sa||0}</td><td class="score">${r.st.pa||0}</td><td class="score">${r.st.pk||0}</td><td class="score">${fmtN(r.st.rbk)}</td></tr>`).join('');
 const lead = nm ? `Of the ${nm} sacks your defense recorded, ${pct(made.rush,nm)} came from individual pass-rush wins, ${pct(made.ol,nm)} because the opposing line broke down, and ${pct(made.cov,nm)} because coverage made the quarterback hold the ball (league average: ${Math.round(lgm.rush*100)}% / ${Math.round(lgm.ol*100)}% / ${Math.round(lgm.cov*100)}%).` : '';
 const lead2 = nt ? `Of the ${nt} sacks your offense took, ${pct(taken.rush,nt)} were beaten pass rushers, ${pct(taken.ol,nt)} were on your line, and ${pct(taken.cov,nt)} were coverage sacks (the receivers did not get open).` : '';
 return `<details class="panel" style="margin-bottom:14px;"><summary style="cursor:pointer;font-weight:700;">Advanced stats: what really produced sacks and runs</summary>
  <p class="narr" style="margin:8px 0;">A sack has three possible causes: a rusher beats his blocker, the offensive line breaks down, or coverage holds the receivers so the quarterback has nowhere to go. The simulation assigns each sack a cause based on the two teams' ratings, so these numbers separate a rusher who is genuinely good from one who is feasting on a bad line or on great coverage behind him.</p>
  <p class="detail-item">${lead} ${lead2}</p>
  ${dlRows?`<h5 class="narr" style="margin:10px 0 4px;">Your pass rushers</h5><table><thead><tr><th>Player</th><th>Sacks</th><th title="Sacks credited to winning his own matchup">Own win</th><th title="Sacks helped by a weak opposing line">Weak line</th><th title="Sacks helped by coverage">Coverage</th><th title="Average pass-protection rating of the lines he faced">Lines faced</th><th>Read</th></tr></thead><tbody>${dlRows}</tbody></table>`:''}
  ${olRows?`<h5 class="narr" style="margin:10px 0 4px;">Your offensive line</h5><table><thead><tr><th>Player</th><th>Sacks allowed</th><th>Pressures allowed</th><th>Pancakes</th><th>Rush yds behind</th></tr></thead><tbody>${olRows}</tbody></table>`:''}
  <p class="narr" style="margin:8px 0 0;">Rush yards behind a lineman count the carries that went through his gap. If most of a back's yards came behind one star lineman, part of the credit belongs to the line (see the season recap).</p></details>`;
}
function verdictSack(own, weakLine, lineDelta){
 if(lineDelta>=2) return 'Faced weaker-than-average protection, which flatters the total.';
 if(lineDelta<=-2 && own>=0.4) return 'Faced strong protection and still produced: impressive.';
 if(own>=0.6) return 'Mostly his own wins.';
 if(weakLine>=0.4) return 'Many of these came when the opposing line broke down.';
 if(own<0.3) return 'More coverage than rush: the secondary created many of these.';
 return 'A mix of his own wins and help from teammates.';
}
function fragOffense(F){
 const {T, user, N, gp, S} = F, t = T[user], U = S.unitRanks[user];
 const ppg = t.pf/gp, ppgRank = rankIn(T,'pf',user,false);
 const rushG = t.rush/gp, rushRank = rankIn(T,'rush',user,false), passG = t.pass/gp, passRank = rankIn(T,'pass',user,false);
 const skRank = rankIn(T,'skTaken',user,true);
 const mine = teamPlayerStats(user);
 const qb = mine.find(r=>r.group==='QB');
 const rb = mine.filter(r=>r.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0];
 const rec = mine.filter(r=>r.group==='WR'||r.group==='TE').sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0))[0];
 const lean = rushRank+6 < passRank ? 'a run-leaning attack' : passRank+6 < rushRank ? 'a pass-first attack' : 'a balanced attack';
 const s1 = pick([
  `Offensively, the ${N} averaged ${ppg.toFixed(1)} points a game (#${ppgRank} in the league) with ${lean}: ${rushG.toFixed(0)} rushing yards per game (#${rushRank}) and ${passG.toFixed(0)} passing (#${passRank}).`,
  `The offense scored ${ppg.toFixed(1)} per game, #${ppgRank} in the league, behind ${rushG.toFixed(0)} rushing yards (#${rushRank}) and ${passG.toFixed(0)} passing yards (#${passRank}) a night — ${lean}.`
 ]);
 let s2;
 const lineStrong = U.olRun<=10 && U.olPass<=10, lineWeak = U.olRun>=23 && U.olPass>=23;
 if(lineStrong) s2 = `The offensive line was a legitimate strength — #${U.olRun} in run blocking and #${U.olPass} in pass protection — and it showed up in the numbers: just ${t.skTaken} sacks allowed (#${skRank} fewest)${rb?`, and ${rb.name} turned that blocking into ${fmtN(rb.st.rushYds)} rushing yards`:''}.`;
 else if(lineWeak) s2 = `The offensive line was a real problem — #${U.olRun} in run blocking and #${U.olPass} in pass protection — and it cost them: ${t.skTaken} sacks allowed (#${skRank} fewest)${rb?` and only ${fmtN(rb.st.rushYds)} yards from ${rb.name}`:''}.`;
 else s2 = `The offensive line graded #${U.olRun} in run blocking and #${U.olPass} in pass protection, good for ${t.skTaken} sacks allowed (#${skRank} fewest)${rb?` and ${fmtN(rb.st.rushYds)} rushing yards for ${rb.name}`:''}.`;
 const bits = [];
 if(qb) bits.push(`${playerBlurb(qb)} ran the show`);
 if(rb) bits.push(`${playerBlurb(rb)} carried the ground game`);
 if(rec) bits.push(`${playerBlurb(rec)} was the top target`);
 return `${s1} ${s2} ${bits.length ? bits.join('; ') + '.' : ''}`;
}

// Why did the scoreboard disagree with the ratings? Split points allowed into ratings, schedule, game plans and luck.
function defenseWhy(F){
 const {S, user, gp, N, T} = F, lg = S.league, names = teamNames(), R = S.unitRatings[user];
 const games = teamPlayedGames(user).filter(g=>g.played && g.result);
 if(!games.length) return '';
 const neut = t=> matchupModel(lg, S.unitRatings[t], lg, {off:NEUTRAL_OFF, def:DEFAULT_DEF}).structPts;
 const nv = names.map(t=>neut(t)), avgN = mean_(nv), myNraw = neut(user), rankN = nv.filter(v=>v<myNraw-1e-9).length + 1;
 const lgAct = mean_(names.map(t=>T[t].pa/Math.max(gp,1)));
 const myN = lgAct + (myNraw - avgN); // ratings-only projection, centred on what the league actually allowed
 let withSched = 0, withPlans = 0, actual = 0, homeAdj = 0;
 games.forEach(g=>{
  const side = g.home===user ? 'home' : 'away', opp = side==='home' ? 'away' : 'home', ot = g[opp], hf = opp==='home' ? HOME_FIELD : 0;
  withSched += matchupModel(S.unitRatings[ot], R, lg, {off:NEUTRAL_OFF, def:DEFAULT_DEF}).structPts + hf;
  withPlans += g.result.exp[opp].structPts + hf;
  actual += side==='home' ? g.result.awayScore : g.result.homeScore;
  homeAdj += g.home===user ? 0 : HOME_FIELD;
 });
 const n = games.length; withSched /= n; withPlans /= n; actual /= n; homeAdj /= n;
 const schedFx = withSched - homeAdj - myNraw, planFx = withPlans - withSched;
 const paRank = rankIn(T,'pa',user,true), sg = v=>Math.abs(v)<0.05 ? '0.0' : (v>=0?'+':'\u2212')+Math.abs(v).toFixed(1);
 const avgOppOff = mean_(games.map(g=>(function(r){ return 0.6*r.passOff+0.4*r.runOff; })(S.unitRanks[g.home===user?g.away:g.home])));
 const gap = actual - myN, luck = gap - schedFx - planFx;
 if(Math.abs(paRank-rankN)<5 && Math.abs(gap)<1.5) return ` The scoreboard matched the ratings: the units projected to about ${myN.toFixed(1)} points allowed per game (#${rankN} in the league) and they allowed ${actual.toFixed(1)} (#${paRank}).`;
 const parts = [];
 parts.push(`${Math.abs(schedFx)<0.3?'the schedule was about average':schedFx>0?'the schedule was tougher than average':'the schedule was softer than average'} (${sg(schedFx)} points a game; opposing offenses averaged #${avgOppOff.toFixed(0)})`);
 parts.push(`${Math.abs(planFx)<0.25?'game plans were neutral':planFx>0?'matchup game plans cost them':'matchup game plans helped'} (${sg(planFx)})`);
 parts.push(`${Math.abs(luck)<0.5?'luck was neutral':luck>0?'the rest was bad luck':'the rest was good luck'} (${sg(luck)})`);
 const worse = gap>0;
 const coach = Math.abs(planFx)>=Math.abs(luck) && Math.abs(planFx)>=0.4 ? 'Coaching (the plans picked) explains the largest piece.' : Math.abs(luck)>=Math.abs(schedFx) ? 'Mostly it was variance, not coaching: the same defense would usually land much closer to its rating.' : 'Mostly it was the schedule, not coaching.';
 return ` <b>Why ${worse?'worse':'better'} than the ratings?</b> From the units alone this defense projected to about ${myN.toFixed(1)} points allowed per game (#${rankN} in the league), yet it allowed ${actual.toFixed(1)} (#${paRank}), a gap of ${sg(gap)}. Breaking that down: ${joinList(parts)}. ${coach}`;
}
// Offense mirror of defenseWhy: ratings-only projection vs what happened, split into schedule, game plans and luck.
function offenseWhy(F){
 const {S, user, gp, T} = F, lg = S.league, names = teamNames(), R = S.unitRatings[user];
 const games = teamPlayedGames(user).filter(g=>g.played && g.result);
 if(!games.length) return '';
 const neut = t=> matchupModel(S.unitRatings[t], lg, lg, {off:NEUTRAL_OFF, def:DEFAULT_DEF}).structPts;
 const nv = names.map(t=>neut(t)), avgN = mean_(nv), myNraw = neut(user), rankN = nv.filter(v=>v>myNraw+1e-9).length + 1;
 const lgAct = mean_(names.map(t=>T[t].pf/Math.max(gp,1))), myN = lgAct + (myNraw - avgN);
 let withSched = 0, withPlans = 0, actual = 0, homeAdj = 0;
 games.forEach(g=>{
  const side = g.home===user ? 'home' : 'away', ot = side==='home' ? g.away : g.home, hf = side==='home' ? HOME_FIELD : 0;
  withSched += matchupModel(R, S.unitRatings[ot], lg, {off:NEUTRAL_OFF, def:DEFAULT_DEF}).structPts + hf;
  withPlans += g.result.exp[side].structPts + hf;
  actual += side==='home' ? g.result.homeScore : g.result.awayScore; homeAdj += hf;
 });
 const n = games.length; withSched/=n; withPlans/=n; actual/=n; homeAdj/=n;
 const schedFx = withSched - homeAdj - myNraw, planFx = withPlans - withSched, gap = actual - myN, luck = gap - schedFx - planFx;
 const pfRank = rankIn(T,'pf',user,false), sg = v=>Math.abs(v)<0.05 ? '0.0' : (v>=0?'+':'\u2212')+Math.abs(v).toFixed(1);
 if(Math.abs(pfRank-rankN)<5 && Math.abs(gap)<1.5) return `<b>Offense:</b> the scoreboard matched the ratings. The units projected to about ${myN.toFixed(1)} points a game (#${rankN} in the league) and the offense scored ${actual.toFixed(1)} (#${pfRank}).`;
 const parts = [
  `${Math.abs(schedFx)<0.3?'the schedule of opposing defenses was about average':schedFx>0?'the opposing defenses were softer than average':'the opposing defenses were tougher than average'} (${sg(schedFx)})`,
  `${Math.abs(planFx)<0.25?'game plans were neutral':planFx>0?'matchup game plans helped':'matchup game plans cost points'} (${sg(planFx)})`,
  `${Math.abs(luck)<0.5?'luck was neutral':luck>0?'the rest was good luck':'the rest was bad luck'} (${sg(luck)})`];
 return `<b>Offense, ${gap>=0?'better':'worse'} than the ratings:</b> from the units alone the offense projected to about ${myN.toFixed(1)} points a game (#${rankN}), and it scored ${actual.toFixed(1)} (#${pfRank}), a gap of ${sg(gap)}. Breaking that down: ${joinList(parts)}.`;
}
function recordWhy(F){
 const me = F.me || (F.st && F.st[F.user]); if(!me || !F.gp) return '';
 const e = 2.37, expW = F.gp*Math.pow(me.pf,e)/(Math.pow(me.pf,e)+Math.pow(me.pa,e)), actW = me.wins + me.ties*0.5, gap = actW-expW;
 if(Math.abs(gap)<1) return `<b>Record:</b> ${actW} wins is about what the ${me.pf}\u2013${me.pa} scoring margin predicts (${expW.toFixed(1)}), so the record is an honest picture of the team.`;
 return `<b>Record, ${gap>0?'better':'worse'} than the scoring margin says:</b> the ${me.pf}\u2013${me.pa} scoring margin is what a ${expW.toFixed(1)}-win team usually produces, but they won ${actW}. ${gap>0?'Close games broke their way.':'Close games went against them: the margin was good enough for more wins.'}`;
}
function passRushWhy(F){
 const {S, user, gp, T} = F, U = S.unitRanks[user], t = T[user];
 const skRank = rankIn(T,'skForced',user,false);
 if(!(U.passRush<=10 && skRank>=16) && !(U.passRush>=23 && skRank<=12)) return '';
 const games = teamPlayedGames(user).filter(g=>g.played && g.result);
 const oppOL = games.length ? mean_(games.map(g=>S.unitRanks[g.home===user?g.away:g.home].olPass)) : 16;
 const mine = teamPlayerStats(user), made = mine.reduce((a,r)=>{ a.rush+=r.st.skE||0; a.ol+=r.st.skO||0; a.cov+=r.st.skC||0; return a; }, {rush:0,ol:0,cov:0}), tot = made.rush+made.ol+made.cov||1;
 const dl = mine.filter(r=>r.group==='DL').sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];
 if(U.passRush<=10) return `<b>Pass rush, strong grade but only ${t.skForced} sacks (#${skRank}):</b> the grade measures how well the front beats blockers, but sacks also depend on who they faced and how long quarterbacks held the ball. Opposing pass protection averaged #${oppOL.toFixed(0)} of 32 (${oppOL<=14?'well above average, which suppresses sacks':oppOL>=19?'below average, which should have helped':'about average'}), the secondary graded #${U.coverage} (${U.coverage>=20?'quarterbacks got the ball out quickly because receivers were open':'good coverage lets rushers get home'}), and only ${Math.round(made.rush/tot*100)}% of the sacks they did get came from individual rush wins. ${dl?`${dl.name} (${dl.ovr} OVR) had ${dl.st.sack||0} sacks and ${dl.st.hur||0} pressures; pressures that did not become sacks still forced throws and show up in the opponent's completion numbers.`:''}`;
 return `<b>Pass rush, weak grade but ${t.skForced} sacks (#${skRank}):</b> opposing pass protection averaged #${oppOL.toFixed(0)} (${oppOL>=19?'a soft slate of lines':'about average'}), and ${Math.round((made.ol+made.cov)/tot*100)}% of the sacks came from broken protection or coverage rather than individual wins, so the total flatters the front.`;
}
function whyBoxHTML(F){
 let parts = [];
 try{ const dw = (defenseWhy(F)||'').trim(); parts = [offenseWhy(F), (dw && !/^<b>Why/.test(dw) ? '<b>Defense:</b> '+dw : dw).replace(/^\s*<b>Why (worse|better) than the ratings\?<\/b>/, m=>`<b>Defense, ${/worse/.test(m)?'worse':'better'} than the ratings:</b>`), recordWhy(F), passRushWhy(F)].filter(Boolean); }catch(e){ parts = []; }
 if(!parts.length) return '';
 return `<details class="panel" style="margin:10px 0;"><summary style="cursor:pointer;font-weight:700;">Why better or worse than the ratings?</summary><div style="margin-top:8px;">${parts.map(p=>`<p class="detail-item">${p}</p>`).join('')}</div></details>`;
}
function fragDefense(F){
 const {T, user, N, gp, S} = F, t = T[user], U = S.unitRanks[user];
 const papg = t.pa/gp, paRank = rankIn(T,'pa',user,true);
 const rushA = t.rushA/gp, rushARank = rankIn(T,'rushA',user,true), passA = t.passA/gp, passARank = rankIn(T,'passA',user,true);
 const sackRank = rankIn(T,'skForced',user,false), takeRank = rankIn(T,'take',user,false);
 const mine = teamPlayerStats(user);
 ensureRatings();
 const topBy = g=> mine.filter(r=>r.group===g).sort((a,b)=>(b._rating||0)-(a._rating||0))[0];
 const dl = topBy('DL'), lb = topBy('LB'), db = topBy('DB');
 const s1 = pick([
  `Defensively, they allowed ${papg.toFixed(1)} points per game (#${paRank} fewest), giving up ${rushA.toFixed(0)} rushing yards (#${rushARank} fewest) and ${passA.toFixed(0)} passing yards (#${passARank} fewest) a night.`,
  `The defense surrendered ${papg.toFixed(1)} points a game, #${paRank} in the league, including ${rushA.toFixed(0)} yards on the ground (#${rushARank}) and ${passA.toFixed(0)} through the air (#${passARank}).`
 ]);
 const frontStrong = U.passRush<=10 || U.frontRun<=10;
 const s2 = `The pass rush graded #${U.passRush} and produced ${t.skForced} sacks (#${sackRank}); the run-stopping front graded #${U.frontRun}; the secondary graded #${U.coverage} and helped generate ${t.take} takeaways (#${takeRank}).${frontStrong && paRank<=10 ? ' That front-led formula is exactly why the scoreboard looked the way it did.' : ''}`;
 const wv = r=> r ? (slotWinsPerOvr()[r.slot]||0)*((r.ovr||80)-70) : -9;
 const cand = [[dl,'led the rush'],[lb,'led the middle of the defense'],[db,db&&/^CB/.test(db.slot||'')?'locked down the outside':'anchored the back end']].filter(x=>x[0]).sort((a,b)=>wv(b[0])-wv(a[0]));
 const bits = cand.map(([r,t])=>`${playerBlurb(r)} ${t}`);
 return `${s1} ${s2} ${bits.length ? bits.join('; ') + '.' : ''}`;
}
function fragPlayoffRun(F){
 const plog = userPlayoffLog(), {N, user, S} = F;
 const sb = S.playoffRounds && S.playoffRounds.superbowl && S.playoffRounds.superbowl[0];
 const champ = S.champion===user;
 let sbLine = '';
 if(sb && sb.result && !champ){
  const w = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away, l = w===sb.home ? sb.away : sb.home;
  const ws = Math.max(sb.result.homeScore, sb.result.awayScore), ls = Math.min(sb.result.homeScore, sb.result.awayScore);
  sbLine = ` The ${nick(w)} went on to win the Super Bowl, beating the ${nick(l)} ${ws}–${ls}.`;
 }
 if(!plog.length){
  const inField = S.seeds.AFC.concat(S.seeds.NFC).some(x=>x.team===user);
  return (inField ? `The ${N} earned a first-round bye but never reached a game the bracket recorded for them.` : `The ${N} finished outside the playoff field, so their season ended after Week 17.`) + sbLine;
 }
 const games = plog.map(g=>`${g.won?'beat':'fell to'} the ${nick(g.opp)} ${g.won?g.fs:g.os}–${g.won?g.os:g.fs} in the ${g.round}`);
 const last = plog[plog.length-1];
 const verdict = champ ? `That run through the bracket ended with a Super Bowl title.`
  : last.round==='Super Bowl' ? `They got all the way to the Super Bowl before falling short.`
  : plog.length===1 ? `It was a one-and-done postseason.` : `Their season ended there.`;
 return `In the playoffs, the ${N} ${joinList(games)}. ${verdict}${sbLine}`;
}
function fragAwards(F){
 const user = F.user, counts = {};
 const all = F.S.schedule.filter(g=>g.played && (g.home===user||g.away===user)).map(g=>g.detail.mvp);
 ['wildcard','divisional','champ','superbowl'].forEach(rk=>{ (F.S.playoffRounds&&F.S.playoffRounds[rk]||[]).forEach(g=>{ if(g.result && (g.home===user||g.away===user)) all.push(g.detail.mvp); }); });
 all.filter(m=>m.team===user).forEach(m=>{ counts[m.name]=(counts[m.name]||{n:0,group:m.group}); counts[m.name].n++; });
 const top = Object.entries(counts).sort((a,b)=>b[1].n-a[1].n).slice(0,3);
 const total = top.reduce((s,x)=>s+x[1].n,0);
 if(!top.length) return '';
 const named = top.map(([name,c])=>`${name} (${c.group}, ${c.n})`);
 return `Game balls went to ${joinList(named)}.`;
}
function fragOutlook(F, final){
 const {user, N, S} = F, U = S.unitRanks[user];
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const best = units.slice().sort((a,b)=>U[a]-U[b]).slice(0,2), worst = units.slice().sort((a,b)=>U[b]-U[a]).slice(0,2);
 const flex = flexReport(user);
 const s1 = `The foundation is the ${UNIT_INFO[best[0]].short} (#${U[best[0]]}) and the ${UNIT_INFO[best[1]].short} (#${U[best[1]]}); the clearest upgrades would come at ${UNIT_INFO[worst[0]].short} (#${U[worst[0]]}) and ${UNIT_INFO[worst[1]].short} (#${U[worst[1]]}).`;
 const s2 = flex.list.length ? ` The roster also asked ${flex.list.length} starter${flex.list.length===1?'':'s'} to play out of position, costing ${flex.total} rating points across the lineup — filling those spots naturally is the cheapest improvement available.` : ` Every starter played at his natural position, so there's no hidden flex penalty to clean up.`;
 const s3 = final ? ' Start a new draft to run it back.' : '';
 return s1 + s2 + s3;
}

// ================= STORY DATA LAYER: form, history, swings, unit values =================
const OPPOSING = {olRun:'frontRun', rb:'frontRun', frontRun:'olRun', olPass:'passRush', passRush:'olPass', rec:'coverage', coverage:'rec', qb:'coverage', kicker:'kicker'};
const SLOT_UNIT = {QB:'qb', RB1:'rb', RB2:'rb', WR1:'rec', WR2:'rec', WR3:'rec', TE1:'rec', TE2:'rec', OT1:'olPass', OT2:'olPass', OG1:'olPass', OG2:'olPass', C:'olPass',
 DE1:'passRush', DE2:'passRush', DT1:'frontRun', DT2:'frontRun', MIKE:'frontRun', WILL:'frontRun', SAM:'frontRun', CB1:'coverage', CB2:'coverage', CB3:'coverage', SS:'coverage', FS:'coverage', K:'kicker'};
function teamOfSide(g, side){ return side==='home' ? g.home : g.away; }
function scoreFor(g, team){ const home = g.home===team; return {fs: home?g.result.homeScore:g.result.awayScore, os: home?g.result.awayScore:g.result.homeScore, opp: home?g.away:g.home, home}; }
function teamPlayedGames(team){
 const S = seasonState;
 const out = S.schedule.filter(g=>g.played && (g.home===team||g.away===team)).sort((a,b)=>a.week-b.week);
 ['wildcard','divisional','champ','superbowl'].forEach(rk=>{
  ((S.playoffRounds && S.playoffRounds[rk]) || []).forEach(g=>{ if(g.result && g.detail && (g.home===team||g.away===team)) out.push(g); });
 });
 return out;
}
function playoffGamesOf(team){ return teamPlayedGames(team).filter(g=>g.roundLabel); }
function h2hGames(a, b){ return seasonState.schedule.filter(g=>g.played && ((g.home===a&&g.away===b)||(g.home===b&&g.away===a))); }
function h2hGame(a,b){ return h2hGames(a,b)[0]||null; }

function recentForm(team, n){
 const games = teamPlayedGames(team).slice(-n), agg = {};
 games.forEach(g=>{
  const side = g.home===team ? 'home' : 'away';
  g.detail[side].players.forEach(p=>{
   const a = agg[p.name] || (agg[p.name] = {name:p.name, group:p.group, slot:p.slot, team, ovr:p.ovr, st:{}, z:0, n:0});
   a.n++; a.z += p.impact;
   Object.entries(p.st).forEach(([k,v])=>{ a.st[k] = (a.st[k]||0)+v; });
  });
 });
 return {
  games: games.length,
  players: Object.values(agg).filter(a=>PRIMARY_SLOTS.has(a.slot)).map(a=>({...a, avgZ:a.z/a.n})),
  results: games.map(g=>{ const s = scoreFor(g, team); return {won:s.fs>s.os, fs:s.fs, os:s.os, opp:s.opp}; })
 };
}
function formLine(a){
 const s = a.st, n = a.n, pl = (v,w)=>`${v} ${w}${v===1?'':'s'}`, G = a.group;
 if(G==='QB') return `${fmtN(s.passYds||0)} yards, ${pl(s.passTD||0,'touchdown')} and ${pl(s.int||0,'interception')} ${n===1?'in the last game':'over the last '+n+' games'}`;
 if(G==='RB') return `${fmtN(s.rushYds||0)} rushing yards and ${pl(s.rushTD||0,'touchdown')} ${n===1?'in the last game':'over the last '+n+' games'}`;
 if(G==='WR'||G==='TE') return `${fmtN(s.recYds||0)} receiving yards and ${pl(s.recTD||0,'touchdown')}${s.tgt?` on ${s.rec||0} catches from ${s.tgt} targets`:''} ${n===1?'in the last game':'over the last '+n+' games'}`;
 if(G==='DL') return `${pl(s.sack||0,'sack')} and ${pl(s.tkl||0,'tackle')} ${n===1?'in the last game':'over the last '+n+' games'}`;
 if(G==='LB') return `${pl(s.tkl||0,'tackle')} and ${pl(s.sack||0,'sack')} ${n===1?'in the last game':'over the last '+n+' games'}`;
 if(G==='DB') return `${pl(s.dint||0,'interception')} and ${pl(s.tkl||0,'tackle')} ${n===1?'in the last game':'over the last '+n+' games'}`;
 return `${pl(s.fg||0,'field goal')} ${n===1?'in the last game':'over the last '+n+' games'}`;
}
function hotCold(team, n){
 const f = recentForm(team, n||3);
 if(!f.games) return {hot:null, cold:null, f};
 const ps = f.players.filter(p=>p.group!=='K');
 const hot = ps.slice().sort((a,b)=>b.avgZ-a.avgZ)[0], cold = ps.filter(p=>(p.ovr||0)>=85).sort((a,b)=>a.avgZ-b.avgZ)[0];   // only stars (85+) get criticised
 return {hot: hot && hot.avgZ>=1.7 ? hot : null, cold: cold && cold.avgZ<=-1.3 ? cold : null, f};
}
function bestUnit(team){ const rk = seasonState.unitRanks[team]; return Object.keys(UNIT_INFO).filter(u=>u!=='kicker').sort((a,b)=>rk[a]-rk[b])[0]; }
function topStarters(team, k){
 const sm = seasonState.teams[team].slotmap;
 return ROSTER_SLOTS.filter(s=>s!=='K').map(s=>{ const e = effEntry(sm, s); return e ? {slot:s, name:e.name, ovr:e.ovr} : null; })
  .filter(Boolean).sort((a,b)=>b.ovr-a.ovr).slice(0,k);
}

// all unit-level point swings for one game, from the model's own pregame view (positive = good for the unit's owner)
function gameSwingList(g){
 const ex = g.result.exp, agg = {};
 ['home','away'].forEach(offSide=>{
  ex[offSide].swings.forEach(sw=>{
   const owner = sw.owner==='off' ? offSide : (offSide==='home'?'away':'home');
   const key = owner+'|'+sw.unit;
   (agg[key] = agg[key] || {ownerSide:owner, unit:sw.unit, pts:0}).pts += sw.pts;
  });
 });
 return Object.values(agg);
}
// ================= GAME-PLAN NARRATIVE + UI =================
function teTwo(team){ const sm = seasonState.teams[team].slotmap; return [effEntry(sm,'TE1'), effEntry(sm,'TE2')]; }
function planFxLive(g, side){
 const S = seasonState, lg = S.league, plans = ensureGamePlans(g);
 const home = side==='home', O = S.unitRatings[home?g.home:g.away], D = S.unitRatings[home?g.away:g.home];
 const own = home?plans.home:plans.away, opp = home?plans.away:plans.home;
 const m = matchupModel(O, D, lg, {off:own.off, def:opp.def}), n = matchupModel(O, D, lg, {off:NEUTRAL_OFF, def:opp.def});
 return {pts:m.structPts-n.structPts, to:m.lamTO/n.lamTO-1, sack:m.lamSack/n.lamSack-1, m};
}
function pctAbs(v){ return Math.abs(v*100).toFixed(0)+'%'; }
// "your defense" when the opponent is the user's team, otherwise "the Falcons' defense"
function defOf(t){ return t===seasonUserTeam() ? 'your defense' : poss('the '+nick(t))+' defense'; }
function playoffMissed(){ try{ return !!seasonState && !!seasonState.seeds && userPlayoffStatus(seasonUserTeam()).status==='missed'; }catch(e){ return false; } }
function planWhy(g, side){
 const S = seasonState, home = side==='home', team = home?g.home:g.away, oppT = home?g.away:g.home;
 const plans = ensureGamePlans(g), po = (home?plans.home:plans.away).off, rk = S.unitRanks[team], rkO = S.unitRanks[oppT];
 const sw = topMatchupSwings(g.home, g.away, 1, g), favored = (home ? sw.projHome-sw.projAway : sw.projAway-sw.projHome) > 1.5;
 const dog = (home ? sw.projHome-sw.projAway : sw.projAway-sw.projHome) < -1.5;
 const [t1,t2] = teTwo(team), why = [];
 if(po.strat==='run'){
  if(rk.olRun<=8) why.push(`an interior line that grades #${rk.olRun} in run blocking is exactly what a run-heavy plan is built to exploit`);
  if(rkO.frontRun>=22) why.push(`the opposing run defense ranks only #${rkO.frontRun}`);
  if(favored) why.push(`as the favorite they would rather shorten the game and protect the football`);
  if(!why.length) why.push(`the ground game is the best path through ${defOf(oppT)} and it keeps the ball out of harm's way`);
 } else if(po.strat==='pass'){
  if(rkO.coverage>=22) why.push(`the opposing secondary ranks #${rkO.coverage}`);
  if(rkO.passRush>=22 || rk.olPass<=8) why.push(rk.olPass<=8 ? `their pass protection (#${rk.olPass}) can hold up` : `the opposing pass rush (#${rkO.passRush}) should not get home`);
  if(dog) why.push(`as the underdog they want more variance, not less`);
  if(!why.length) why.push(`the passing game has the better numbers against ${defOf(oppT)}`);
 } else why.push(`neither the run nor the pass has a clear edge in this matchup, so a balanced mix is the safest call`);
 if(po.pers!=='11'){
  const te = PERS[po.pers].long;
  if(po.pers==='12'||po.pers==='22') why.push(`the pair of tight ends (${t1?t1.name+' '+t1.ovr:'—'} and ${t2?t2.name+' '+t2.ovr:'a replacement-level TE2'}) can do the job`);
  if(po.pers==='13') why.push(`the roster has no third tight end, so the model plugs in a generic 70 for 13 personnel`);
  if(po.pers==='21'||po.pers==='22') why.push(`the second back adds a lead blocker and a change of pace`);
 }
 return why;
}
// What a change of personnel actually changes: who leaves the field, who comes on, and what that does to run blocking and receiving.
function persSwapWhy(team, oppT, from, to){
 const S = seasonState, sm = S.teams[team].slotmap, R = S.unitRatings[team], rk = S.unitRanks[oppT];
 const dg = p=>({r:+p[0], t:+p[1], w:5-p[0]-p[1]})[0], cnt = p=>({rb:+p[0], te:+p[1], wr:5-p[0]-p[1]});
 const a = cnt(from), b = cnt(to), nm = (sl)=>{ const e = effEntry(sm, sl); return e ? `${e.name} (${e.ovr})` : 'a replacement-level player'; };
 const out = [], inn = [];
 if(b.wr<a.wr){ const k = a.wr-b.wr; out.push(k===1 ? `the third receiver ${nm('WR3')}` : `two receivers (${nm('WR2')} and ${nm('WR3')})`); }
 if(b.te>a.te) inn.push(b.te-a.te===1 ? `a second tight end, ${nm('TE2')}` : `two extra tight ends`);
 if(b.rb>a.rb) inn.push(`a second back, ${nm('RB2')}`);
 if(b.wr>a.wr){ inn.push(`an extra receiver, ${nm('WR3')}`); if(b.te<a.te) out.push('a tight end'); if(b.rb<a.rb) out.push('a second back'); }
 const A1 = applyOffPlan(R, {pers:to, strat:'neutral'}), B1 = applyOffPlan(R, {pers:from, strat:'neutral'});
 const dRec = A1.rec-B1.rec, dBlk = A1.olRun-B1.olRun, f = v=>(v>=0?'+':'\u2212')+Math.abs(v).toFixed(1);
 const mv = out.length&&inn.length ? `${joinList(inn)} comes on for ${joinList(out)}` : inn.length ? `${joinList(inn)} comes on` : `${joinList(out)} comes off`;
 let why = `${mv}. That moves the receiving group ${f(dRec)} rating points and run blocking ${f(dBlk)}`;
 if(b.wr<a.wr) why += `, a trade that is worth it against a run defense ranked #${rk.frontRun} when the player coming on blocks or runs as well as the one coming off`;
 else why += ` against a pass defense ranked #${rk.coverage}`;
 return why;
}
// Why a coach strayed from his coaching philosophy this week, from the model's own numbers.
function deviationWhy(g, side){
 const S = seasonState, home = side==='home', team = home?g.home:g.away, oppT = home?g.away:g.home, lg = S.league;
 const R = S.unitRatings[team], O = S.unitRatings[oppT], id = S.identity[team];
 const pl = (g.result && g.result.plans) || g.plans, own = pl[side].off, od = pl[home?'away':'home'].def, oppOff = pl[home?'away':'home'].off;
 const a = matchupModel(R, O, lg, {off:own, def:od}), u = matchupModel(R, O, lg, {off:id.off, def:od});
 const dPts = a.structPts-u.structPts, rk = S.unitRanks[oppT], rm = S.unitRanks[team];
 const N = 'the '+nick(oppT), bits = [];
 if(own.strat!==id.off.strat){
  if(own.strat==='run'){
   if(rk.frontRun>=18) bits.push(`${N} run defense ranks only #${rk.frontRun}`);
   if(rk.coverage<=8) bits.push(`${N} secondary (#${rk.coverage}) makes every throw expensive`);
   if(rm.olRun<=10) bits.push(`their own run blocking is #${rm.olRun}`);
   if(!bits.length) bits.push(`running was the cleaner route through ${defOf(oppT)}`);
  } else if(own.strat==='pass'){
   if(rk.coverage>=18) bits.push(`${N} secondary ranks #${rk.coverage}`);
   if(rk.passRush>=18) bits.push(`${N} pass rush (#${rk.passRush}) is unlikely to get home`);
   if(rk.frontRun<=8) bits.push(`${N} run defense (#${rk.frontRun}) shuts the ground game down`);
   if(!bits.length) bits.push(`the passing numbers were stronger than the running numbers in this matchup`);
  } else bits.push(`neither the run nor the pass had a clear edge, so they went back to a balanced mix`);
 }
 if(own.pers!==id.off.pers){
  const [t1,t2] = teTwo(team), sm = S.teams[team].slotmap, w3 = effEntry(sm,'WR3');
  bits.push(persSwapWhy(team, oppT, id.off.pers, own.pers));
 }
 const size = Math.abs(dPts)<0.15 ? 'a near coin-flip on paper, with the model leaning very slightly to the change' : `about ${Math.abs(dPts).toFixed(1)} points a game ${dPts>=0?'better':'worse'} than the coaching philosophy on paper (${(a.expRush-u.expRush>=0?'+':'−')+Math.abs(a.expRush-u.expRush).toFixed(0)} rushing and ${(a.expPass-u.expPass>=0?'+':'−')+Math.abs(a.expPass-u.expPass).toFixed(0)} passing yards)`;
 return `Why: ${joinList(bits)}. The model rated it ${size}.`;
}
function defDeviationWhy(g, side){
 const S = seasonState, home = side==='home', team = home?g.home:g.away, oppT = home?g.away:g.home, id = S.identity[team];
 const pl = (g.result && g.result.plans) || g.plans, own = pl[side].def, oppOff = pl[home?'away':'home'].off, rk = S.unitRanks[oppT];
 const bits = [];
 if(own.pkg!==id.def.pkg) bits.push(own.pkg==='base' ? `${nick(oppT)} lean on the run (${planText(oppOff)})` : `${nick(oppT)} want to throw (${planText(oppOff)}, receivers ranked #${rk.rec})`);
 if(own.focus!==id.def.focus) bits.push(own.focus==='pass' ? `their passing game is the bigger threat (receivers #${rk.rec})` : own.focus==='run' ? `their ground game is the bigger threat (run blocking #${rk.olRun})` : `neither side of their offense stood out, so they played it straight`);
 return bits.length ? `On defense they went ${defPlanText(own)}: ${joinList(bits)}.` : '';
}
// How the user's actual coaching has compared with the script he set before the season.
function scriptTrack(team){
 const S = seasonState, id = S.identity[team], gs = teamPlayedGames(team).filter(g=>g.plans && g.played);
 if(!gs.length) return null;
 let offDev = 0, defDev = 0; const cnt = {};
 gs.forEach(g=>{ const side = g.home===team?'home':'away', p = g.plans[side]; if(JSON.stringify(p.off)!==JSON.stringify(id.off)) offDev++; if(JSON.stringify(p.def)!==JSON.stringify(id.def)) defDev++; const k = planText(p.off); cnt[k] = (cnt[k]||0)+1; });
 const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
 return {n:gs.length, offDev, defDev, topOff:top[0], topN:top[1]};
}
function scriptTrackLine(team){
 const t = scriptTrack(team); if(!t || t.n<3) return '';
 const id = seasonState.identity[team];
 if(t.offDev/t.n>=0.5) return `Since setting ${aStyle(offStyleName(id.off))} script (${planText(id.off)}) before the season, you have strayed from it on offense in ${t.offDev} of ${t.n} games and most often played ${t.topOff}.`;
 if(t.offDev===0 && t.defDev===0) return `You have stuck to your preseason script in all ${t.n} games.`;
 return `You have kept to your preseason offensive script in ${t.n-t.offDev} of ${t.n} games.`;
}
function planParagraph(g, paras){
 const r = g.result; if(!r.plans || !g.detail) return '';
 const S = seasonState, out = [], user = seasonUserTeam();
 ['home','away'].forEach(side=>{
  const team = side==='home'?g.home:g.away, N = 'the '+nick(team), pl = r.plans[side], fx = r.planFx[side], id = S.identity[team], plays = g.detail[side].plays;
  const usual = JSON.stringify(pl.off)===JSON.stringify(id.off);
  const mix = plays ? ` (${plays.rush} runs to ${plays.pass} dropbacks, ${(plays.runPct*100).toFixed(0)}% rushing)` : '';
  let s = usual
   ? `${capFirst(N)} ${pick(['stayed true to form','played their usual game','leaned on their identity'])} with ${planText(pl.off)}${mix}.`
   : `${capFirst(N)} ${pick(['changed their approach','deviated from their coaching philosophy','went away from their normal plan'])} this week with ${planText(pl.off)}${mix}, rather than the ${planText(id.off)} that defines them. ${deviationWhy(g, side)}`;
  if(pl.off.strat==='run') s += ` The model valued the run-heavy approach at ${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} points against a plain balanced approach, with giveaways down about ${pctAbs(fx.to)} and a narrower range of outcomes.`;
  else if(pl.off.strat==='pass') s += ` It carried the usual risk: ${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} points against a balanced plan, but giveaways up about ${pctAbs(fx.to)} and sacks up about ${pctAbs(fx.sack)}.`;
  else if(pl.off.pers!=='11') s += ` The formation alone was worth ${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} points against a plain 11-personnel look.`;
  if(g.scouted && g.scouted[side]) s += ` The ${nick(side==='home'?g.away:g.home)} had seen this new look on film and planned for it.`;
  out.push(s);
 });
 const dsides = ['home','away'].map(side=>{ const team = side==='home'?g.home:g.away, pd = r.plans[side].def; return `the ${nick(team)} (${defPlanText(pd)})`; });
 out.push(`On defense, ${dsides[0]} lined up against ${dsides[1]}.`);
 ['home','away'].forEach(side=>{ const team = side==='home'?g.home:g.away; if(JSON.stringify(r.plans[side].def)!==JSON.stringify(S.identity[team].def)){ const t = defDeviationWhy(g, side); if(t) out.push(`${capFirst('the '+nick(team))}: ${t}`); } });
 if(r.script && r.script.trailFrom){
  const sc = r.script, team = sc.trail==='home'?g.home:g.away, N = 'the '+nick(team), won = (sc.trail==='home') ? r.homeScore>r.awayScore : r.awayScore>r.homeScore;
  const wasRun = offShift(sc.trailFrom) > 0.03;
  out.push(won
   ? `${capFirst(N)} fell behind and opened up late${wasRun?', abandoning a run-heavy script':''}, throwing their way to the comeback — the game script never boxed them in.`
   : `${capFirst(N)} trailed late and ${wasRun?'abandoned the run-heavy plan for a pass-first hurry-up':'went into hurry-up mode'}, but the comeback fell short.`);
 }
 const tl = (g.home===user||g.away===user) ? scriptTrackLine(user) : '';
 if(tl) out.push(tl);
 return out.join(paras ? '</p><p class="detail-item indent">' : ' ');
}
function styleParagraph(team){
 const S = seasonState, id = S.identity[team], games = teamPlayedGames(team).filter(g=>g.plans);
 let t = `Style: ${capFirst(offStyleName(id.off))} on offense (${planText(id.off)}) and ${aStyle(defStyleName(id.def))} on defense (${defPlanText(id.def)}).`;
 if(games.length>=2){
  const cnt = {}, sc = {run:0,pass:0,neutral:0}; let nick_ = 0, fx = 0, fxn = 0;
  games.forEach(g=>{ const side = g.home===team?'home':'away', po = g.plans[side].off, pd = g.plans[side].def; cnt[po.pers] = (cnt[po.pers]||0)+1; sc[po.strat]++; if(pd.pkg==='nickel') nick_++; if(g.result && g.result.planFx){ fx += g.result.planFx[side].pts; fxn++; } });
  const top = Object.entries(cnt).sort((a,b)=>b[1]-a[1]);
  t += ` Through ${games.length} games they have used ${joinList(top.map(([p,n])=>`${p} personnel ${n} time${n===1?'':'s'}`))}; ${sc.run} run-heavy, ${sc.pass} pass-heavy and ${sc.neutral} balanced game plans, with nickel on defense ${nick_} times.`;
  if(fxn) t += ` Cumulatively the game plans were worth ${fx>=0?'+':'−'}${Math.abs(fx).toFixed(1)} points against a plain 11-personnel, balanced approach.`;
 }
 return t;
}
function planPreviewParagraph(g){
 const S = seasonState, plans = ensureGamePlans(g), parts = [];
 const A = g.away, H = g.home;
 const sideTxt = (side)=>{
  const team = side==='home'?H:A, N = 'the '+nick(team), po = plans[side].off, id = S.identity[team];
  const why = planWhy(g, side);
  return `${capFirst(N)} are ${aStyle(offStyleName(id.off))} team by nature, and the model expects ${planText(po)} this week — ${joinList(why)}.`;
 };
 parts.push(sideTxt('away'), sideTxt('home'));
 const dA = plans.away.def, dH = plans.home.def;
 parts.push(`Defensively, expect the ${nick(A)} in ${defPlanText(dA)} (${aStyle(defStyleName(S.identity[A].def))}) and the ${nick(H)} in ${defPlanText(dH)} (${aStyle(defStyleName(S.identity[H].def))}).`);
 return `<b>Game plans:</b> ${parts.join(' ')}`;
}
function planCardsHTML(g){
 const S = seasonState, user = seasonUserTeam(), plans = ensureGamePlans(g);
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 const card = (team, side)=>{
  const p = plans[side], id = S.identity[team], fx = planFxLive(g, side), mine = team===user;
  const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
  return `<div class="zpb-plan" style="${st}${mine?'border-color:var(--accent);':''}">
   <div class="zpb-plan-hd">${lg(team)}<div><b>${mine?'You · ':''}${team}</b><span class="narr">${capFirst(offStyleName(id.off))} · ${capFirst(defStyleName(id.def))}</span></div></div>
   <div class="zpb-plan-row"><span class="narr">Offense</span><b>${planText(p.off)}</b></div>
   <div class="zpb-plan-row"><span class="narr">Defense</span><b>${defPlanText(p.def)}</b></div>
   <div class="zpb-plan-fx">${fx.pts>=0?'+':'−'}${Math.abs(fx.pts).toFixed(1)} pts vs. auto</div>
  </div>`;
 };
 return `<div class="zpb-plans">${card(g.away,'away')}${card(g.home,'home')}</div>`;
}
function confirmDialog(msg, yesLabel, onYes){
 const ov = document.createElement('div'); ov.className = 'confirm-ov';
 ov.innerHTML = `<div class="confirm-box"><p style="margin-top:0;"><b>Are you sure?</b></p><p>${msg}</p><div style="display:flex;gap:10px;justify-content:flex-end;"><button class="tabbtn" data-cf="no">Cancel</button><button class="resetbtn" data-cf="yes" style="width:auto;margin:0;padding:8px 16px;background:var(--bad);">${yesLabel}</button></div></div>`;
 document.body.appendChild(ov);
 ov.addEventListener('click', e=>{ const t = e.target.closest('[data-cf]'); if(!t && e.target!==ov) return; ov.remove(); if(t && t.dataset.cf==='yes') onYes(); });
}
// Resolve a chosen style name to a concrete personnel/strategy for THIS roster (best by the math among the style's variants).
function resolveOffStyle(team, style){
 const S = seasonState, R = S.unitRatings[team], lg = S.league, id = S.identity[team];
 const info = OFF_STYLE_INFO[style]; if(!info) return null;
 const exp = {off:NEUTRAL_OFF, def:DEFAULT_DEF};
 return argBest(info.cands.map(([pers,strat])=>({pers,strat})), o=>offUtil(R, lg, lg, o, exp, id.def, 0)).o;
}
function applyUserScript(offStyle, defStyle){
 const S = seasonState, user = seasonUserTeam(), R = S.unitRatings[user], lg = S.league;
 const auto = teamIdentity(R, lg), cur = S.identity[user];
 const off = offStyle==='auto' ? auto.off : resolveOffStyle(user, offStyle);
 const dInfo = DEF_STYLE_INFO[defStyle];
 const def = defStyle==='auto' ? auto.def : {pkg:dInfo.pkg, focus:dInfo.focus};
 S.identity[user] = Object.assign({}, cur, {off, def, tilt:auto.tilt, tiltD:auto.tiltD, source:(offStyle==='auto'&&defStyle==='auto')?'math':'user', offChoice:offStyle, defChoice:defStyle});
 resetUnplayedPlans();
}
// Why the model landed on this coaching philosophy for this roster (or how your choice compares with the math's pick).
function scriptWhyHTML(team){
 const S = seasonState, R = S.unitRatings[team], lg = S.league, rk = S.unitRanks[team], id = S.identity[team], auto = teamIdentity(R, lg);
 const exp = {off:NEUTRAL_OFF, def:DEFAULT_DEF};
 const rows = OFF_OPTS.map(o=>({o, m:matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}), u:offUtil(R, lg, lg, o, exp, id.def, 0)})).sort((a,b)=>b.u-a.u);
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const best = units.slice().sort((a,b)=>rk[a]-rk[b]).slice(0,2), worst = units.slice().sort((a,b)=>rk[b]-rk[a])[0];
 const top3 = rows.slice(0,3);
 const mx = Math.max(...top3.map(r=>r.u), 0.5);
 const bar = r=>`<div class="zpb-whychip${r.u===top3[0].u?' zpb-whybest':''}"><span>${planText(r.o)}</span><b>${(r.u*100).toFixed(0)}%</b><i>${r.u===top3[0].u?'the math\u2019s pick':'\u2212'+((top3[0].u-r.u)*100).toFixed(1)+' pts vs. best'}</i></div>`;
 const override = (id.source==='user' && JSON.stringify(auto.off)!==JSON.stringify(id.off))
  ? `<p class="narr" style="margin:8px 0 0;">You picked your own way to play — the computer's pick was a little safer on paper.</p>` : '';
 return `<details class="zpb-dd"><summary>Why this style? (the simple math)</summary>
  <div style="margin-top:8px;">
   <p class="narr" style="margin:0 0 8px;">The model tries all 15 ways to play and keeps the one that wins the most with your team.</p>
   <div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 8px;"><div class="zpb-optcard"><b>Strongest</b><i>${shortUnit(best[0])}</i><span>#${rk[best[0]]} in the league</span></div><div class="zpb-optcard"><b>Shakiest</b><i>${shortUnit(worst)}</i><span>#${rk[worst]} in the league</span></div></div>
   <div class="zpb-whychips">${top3.map(bar).join('')}</div>
   ${override}
  </div></details>`;
}
function renderGamePlanPanel(g){
 const S = seasonState, u = S.userPlan, user = seasonUserTeam(), id = S.identity[user], mode = u.mode, manual = mode==='manual';
 const sel = (idn, label, opts, cur)=>`<label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;">${label}<select id="${idn}"><option value="auto">Auto</option>${opts.map(([v,l])=>`<option value="${v}" ${cur===v?'selected':''}>${l}</option>`).join('')}</select></label>`;
 const radio = (v, label, hint)=>`<label style="display:flex;gap:6px;align-items:flex-start;cursor:pointer;flex:1 1 200px;"><input type="radio" name="planMode" value="${v}" ${mode===v?'checked':''} style="margin-top:3px;"><span><b>${label}</b><span class="narr" style="display:block;margin:0;">${hint}</span></span></label>`;
 const phil = `${capFirst(offStyleName(id.off))} + ${defStyleName(id.def)}`;
 return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Game plan</h3>
  ${planCardsHTML(g)}
  <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:10px;">
   ${radio('auto','Auto (recommended)','The math picks the best plan for this matchup.')}
   ${radio('script','My coaching philosophy',phil+'.')}
   ${radio('manual','Custom','Choose each piece yourself.')}
  </div>
  ${manual?`<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px;">
   ${sel('planPers','Personnel',Object.keys(PERS).map(k=>[k,PERS[k].label+' — '+PERS[k].long]),u.pers)}
   ${sel('planStrat','Run/pass lean',[['run','Run-heavy'],['neutral','Balanced'],['pass','Pass-heavy']],u.strat)}
   ${sel('planPkg','Defensive package',[['base','Base'],['nickel','Nickel']],u.pkg)}
   ${sel('planFocus','Defensive focus',[['run','Run defense'],['neutral','Balanced'],['pass','Pass defense']],u.focus)}</div>`:''}
  <details style="margin-top:10px;"><summary style="cursor:pointer;font-weight:700;">Why these plans?</summary>
   ${zpbDuelHTML(g)}
   <p class="narr" style="margin:6px 0 0;">Coaches are scored against what the opponent is <i>expected</i> to do — nobody reacts to a plan they cannot see — and a trailing team opens it up late. ${S.scriptLocked?'':'Your coaching philosophy is still open on the <a href="#" id="backToPreseason" class="zpb-teamlink">Preseason page</a>.'} The Guide tab has the math of each choice.</p></details></div>`;
}
function wireGamePlanPanel(container){
 const S = seasonState, u = S.userPlan;
 const apply = ()=>{ resetUnplayedPlans(); renderSeasonTab(container); };
 container.querySelectorAll('input[name="planMode"]').forEach(r=> r.addEventListener('change', ()=>{ u.mode = r.value; apply(); }));
 [['planPers','pers'],['planStrat','strat'],['planPkg','pkg'],['planFocus','focus']].forEach(([id,k])=>{
  const el = document.getElementById(id); if(el) el.addEventListener('change', ()=>{ u[k] = el.value; apply(); });
 });
 const bp = document.getElementById('backToPreseason');
 if(bp) bp.addEventListener('click', e=>{ e.preventDefault(); S.preseason = true; renderSeasonTab(container); });
}

function topMatchupSwings(homeTeam, awayTeam, k, g){
 const S = seasonState, lg = S.league, H = S.unitRatings[homeTeam], A = S.unitRatings[awayTeam];
 const pl = g ? ensureGamePlans(g) : DEFAULT_PLAN_PAIR;
 const mh = matchupModel(H, A, lg, {off:pl.home.off, def:pl.away.def}), ma = matchupModel(A, H, lg, {off:pl.away.off, def:pl.home.def}), agg = {};
 [['home',mh],['away',ma]].forEach(([offSide,m])=>{
  m.swings.forEach(sw=>{
   const owner = sw.owner==='off' ? offSide : (offSide==='home'?'away':'home');
   const key = owner+'|'+sw.unit;
   (agg[key] = agg[key] || {ownerSide:owner, unit:sw.unit, pts:0}).pts += sw.pts;
  });
 });
 const sorted = Object.values(agg).filter(e=>Math.abs(e.pts)>=0.5).sort((a,b)=>Math.abs(b.pts)-Math.abs(a.pts));
 const seen = new Set(), list = [];
 sorted.forEach(e=>{ if(list.length<k && !seen.has(e.unit)){ seen.add(e.unit); list.push(e); } });
 return {list, projHome: mh.structPts+HOME_FIELD, projAway: ma.structPts};
}
// season-long points each of a team's units was worth over its games (positive = helped, negative = cost)
function unitSwingsForTeam(team, games){
 const tot = {};
 games.forEach(g=>{
  const side = g.home===team ? 'home' : 'away', opp = side==='home' ? 'away' : 'home';
  g.result.exp[side].swings.forEach(sw=>{ if(sw.owner==='off') tot[sw.unit] = (tot[sw.unit]||0)+sw.pts; });
  g.result.exp[opp].swings.forEach(sw=>{ if(sw.owner==='def') tot[sw.unit] = (tot[sw.unit]||0)+sw.pts; });
 });
 return tot;
}
// points per game gained by one extra rating point at a unit, measured on the model itself
function unitValuePerPoint(u, lgIn){
 const lg = lgIn || seasonState.league, base = matchupModel(lg, lg, lg).structPts;
 if(['olRun','olPass','rb','qb','rec','kicker'].includes(u)){ const O = {...lg}; O[u] += 1; if(u==='rec'){ ['rec12','rec13','rec21','rec22'].forEach(k=>{ O[k] += 1; }); } return matchupModel(O, lg, lg).structPts - base; }
 const D = {...lg};
 if(u==='frontRun'){ D.frontBase += 1; D.frontNick += 1; } else if(u==='coverage'){ D.covBase += 1; D.covNick += 1; } else D[u] += 1;
 return base - matchupModel(lg, D, lg).structPts;
}
// Head coaches entering the 2026 season (after the 2025-26 coaching carousel). Used for Coach of the Year.
const HEAD_COACHES = {'Arizona Cardinals':'Mike LaFleur','Atlanta Falcons':'Kevin Stefanski','Baltimore Ravens':'Jesse Minter','Buffalo Bills':'Joe Brady','Carolina Panthers':'Dave Canales','Chicago Bears':'Ben Johnson','Cincinnati Bengals':'Zac Taylor','Cleveland Browns':'Todd Monken','Dallas Cowboys':'Brian Schottenheimer','Denver Broncos':'Sean Payton','Detroit Lions':'Dan Campbell','Green Bay Packers':'Matt LaFleur','Houston Texans':'DeMeco Ryans','Indianapolis Colts':'Shane Steichen','Jacksonville Jaguars':'Liam Coen','Kansas City Chiefs':'Andy Reid','Las Vegas Raiders':'Klint Kubiak','Los Angeles Chargers':'Jim Harbaugh','Los Angeles Rams':'Sean McVay','Miami Dolphins':'Jeff Hafley','Minnesota Vikings':"Kevin O'Connell",'New England Patriots':'Mike Vrabel','New Orleans Saints':'Kellen Moore','NY Giants':'John Harbaugh','NY Jets':'Aaron Glenn','Philadelphia Eagles':'Nick Sirianni','Pittsburgh Steelers':'Mike McCarthy','San Francisco 49ers':'Kyle Shanahan','Seattle Seahawks':'Mike Macdonald','Tampa Bay Buccaneers':'Todd Bowles','Tennessee Titans':'Robert Saleh','Washington Commanders':'Dan Quinn'};
const headCoach = t => HEAD_COACHES[t] || 'the head coach';
const POINTS_PER_WIN = 32.5;   // Sports Info Solutions' Pythagenpat-based conversion: roughly 32-33 points per win in recent seasons


// ================= GUIDE, GLOSSARY AND LIVE MATH TABLES =================
function neutralLeague(){ const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; }); return teamRatings(base); }
const UNIT_RUN_KEYS = ['rb','olRun','rbHeavy','te1','te2'], UNIT_PASS_KEYS = ['qb','rec','olPass','rec12','rec13','rec21','rec22'];
const DEF_RUN_KEYS = ['frontRun','frontBase','frontNick'], DEF_PASS_KEYS = ['passRush','coverage','covBase','covNick'];
// Per-slot role table: wins per +1 OVR, how much of that comes from the pass game vs. the run game, and which unit ratings the slot feeds.
function slotRoleRows(){
 const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; });
 const lg = teamRatings(base), b0 = matchupModel(lg, lg, lg).structPts, STEP = 4, wpo = slotWinsPerOvr(), rows = [];
 ROSTER_SLOTS.forEach(s=>{
  const sm = Object.assign({}, base); sm[s] = {ovr:80+STEP};
  const R = teamRatings(sm), isOff = WV_OFF_SLOTS.has(s);
  let runPts = 0, passPts = 0, kick = 0;
  if(s==='K'){ kick = (matchupModel(R, lg, lg).structPts - b0); }
  else if(isOff){
   const Rr = Object.assign({}, lg), Rp = Object.assign({}, lg);
   UNIT_RUN_KEYS.forEach(k=>{ Rr[k] = R[k]; }); UNIT_PASS_KEYS.forEach(k=>{ Rp[k] = R[k]; });
   runPts = matchupModel(Rr, lg, lg).structPts - b0; passPts = matchupModel(Rp, lg, lg).structPts - b0;
  } else {
   const Dr = Object.assign({}, lg), Dp = Object.assign({}, lg);
   DEF_RUN_KEYS.forEach(k=>{ Dr[k] = R[k]; }); DEF_PASS_KEYS.forEach(k=>{ Dp[k] = R[k]; });
   runPts = b0 - matchupModel(lg, Dr, lg).structPts; passPts = b0 - matchupModel(lg, Dp, lg).structPts;
  }
  const tot = Math.max(1e-9, Math.abs(runPts)+Math.abs(passPts)+Math.abs(kick));
  const roles = [];
  Object.keys(RATING_SPECS).forEach(u=>{ const sp = RATING_SPECS[u]; if(sp[s]!=null){ const sum = Object.values(sp).reduce((a,b)=>a+b,0); roles.push(`${UNIT_INFO[u].short} ${(sp[s]/sum*100).toFixed(0)}%`); } });
  rows.push({slot:s, wpo:wpo[s], runShare:Math.abs(runPts)/tot, passShare:Math.abs(passPts)/tot, kick:Math.abs(kick)/tot, roles});
 });
 return rows;
}
const SLOT_FRIENDLY = {QB:'Quarterback', RB1:'Running back 1', RB2:'Running back 2', WR1:'Wide receiver 1', WR2:'Wide receiver 2', WR3:'Wide receiver 3', TE1:'Tight end 1', TE2:'Tight end 2',
 OT1:'Offensive tackle 1', OT2:'Offensive tackle 2', OG1:'Guard 1', OG2:'Guard 2', C:'Center', DE1:'Edge rusher 1', DE2:'Edge rusher 2', DT1:'Defensive tackle 1', DT2:'Defensive tackle 2',
 MIKE:'Middle linebacker (MIKE)', WILL:'Weakside linebacker (WILL)', SAM:'Strongside linebacker (SAM)', CB1:'Cornerback 1', CB2:'Cornerback 2', CB3:'Cornerback 3 (nickel)', SS:'Strong safety', FS:'Free safety', K:'Kicker'};
const slotName = s=> SLOT_FRIENDLY[s] || LABELS[s] || s;
// One row per starting spot, sorted by what a 70 → 90 upgrade is worth.
function slotRoleTableHTML(){
 const rows = slotRoleRows().map(r=>Object.assign({up:slotWins(r.slot,90)-slotWins(r.slot,70)}, r)).sort((a,b)=>b.up-a.up);
 const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class="score">${r.up.toFixed(2)}</td><td class="score">${r.wpo>=0.0005?'+'+r.wpo.toFixed(3):'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class="narr">${r.roles.join(' · ')}</td></tr>`).join('');
 return `<div class="tablewrap"><table><thead><tr><th>Starting spot</th><th title="Extra wins per season if this spot goes from a 70 to a 90">Wins from a 70→90 upgrade</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table></div>`;
}
// What every game-plan choice does to a league-average team, measured on the model itself.
function planMathHTML(){
 const lg = neutralLeague(), n = matchupModel(lg, lg, lg, {off:NEUTRAL_OFF, def:DEFAULT_DEF});
 const sg = v=>(v>=0?'+':'−')+Math.abs(v).toFixed(2);
 const fit = {
  '11|neutral':'The default. No lean, no cost.',
  '11|run':'Strong run blockers and backs, or a quarterback that is a liability. Cuts giveaways and variance.',
  '11|pass':'Elite quarterback, receivers and pass protection; or an underdog that needs variance.',
  '12|neutral':'Tight ends clearly better than the third receiver. Adds blocking and a second receiving threat.',
  '12|run':'A good line plus tight ends who block. Heavier box, fewer giveaways.',
  '12|pass':'Two tight ends who catch, with play-action off the run threat.',
  '13|neutral':'Three tight ends on the field. Only two are drafted; the third is a generic 70.',
  '13|run':'Maximum blocking. Almost no receivers; a short-yardage and clock-killing set.',
  '13|pass':'Rarely right: one receiver on the field.',
  '21|neutral':'A real second back or fullback. Mostly a changeup.',
  '21|run':'An I-formation team with two good backs and a strong line.',
  '21|pass':'Rarely right.',
  '22|neutral':'Two backs and two tight ends, one receiver. A power look.',
  '22|run':'Goal-line and four-minute offense; the most run-heavy look.',
  '22|pass':'Rarely right.'
 };
 let off = '';
 OFF_OPTS.forEach(o=>{
  const m = matchupModel(lg, lg, lg, {off:o, def:DEFAULT_DEF});
  off += `<tr><td>${PERS[o.pers].label}</td><td>${STRAT[o.strat].label}</td><td class="score">${sg(m.structPts-n.structPts)}</td><td class="score">${m.expRush.toFixed(0)} / ${m.expPass.toFixed(0)}</td><td class="score">${m.lamTO.toFixed(2)}</td><td class="score">${m.lamSack.toFixed(2)}</td><td class="score">±${m.sd.toFixed(1)}</td><td class="narr">${fit[o.pers+'|'+o.strat]||''}</td></tr>`;
 });
 const dfit = {'base|neutral':'Better against the run, worse in coverage. Right against run-first offenses.','base|run':'The most run-focused look. Predictable, so it pays a small penalty.','base|pass':'Base personnel that plays coverage; rarely right.','nickel|neutral':'The modern default: an extra defensive back on the field.','nickel|run':'Nickel personnel with the focus on the run. Uncommon.','nickel|pass':'Gives up some run defense to take away the pass. Predictable, so it pays a small penalty.'};
 let def = '';
 DEF_OPTS.forEach(d=>{
  const m = matchupModel(lg, lg, lg, {off:NEUTRAL_OFF, def:d});
  def += `<tr><td>${DEF_PKG[d.pkg].label}</td><td>${DEF_FOCUS[d.focus].label}</td><td class="score">${sg(m.structPts-n.structPts)}</td><td class="score">${m.expRush.toFixed(0)} / ${m.expPass.toFixed(0)}</td><td class="score">${m.lamTO.toFixed(2)}</td><td class="score">${m.lamSack.toFixed(2)}</td><td class="narr">${dfit[d.pkg+'|'+d.focus]||''}</td></tr>`;
 });
 return `<h5 class="narr" style="margin:6px 0;">Offense: what each choice does to a league-average team against a league-average defense</h5>
  <div class="tablewrap"><table><thead><tr><th>Personnel</th><th>Strategy</th><th>Points vs. 11 balanced</th><th>Rush / pass yds</th><th>Giveaways</th><th>Sacks taken</th><th>Spread</th><th>When it is the right call</th></tr></thead><tbody>${off}</tbody></table></div>
  <p class="narr">Points are per game, the model's expected scoring against the same defense. "Spread" is the standard deviation of a game's scoring margin: run-heavy narrows it, pass-heavy widens it, which is why an underdog may choose to throw even when throwing costs expected points. Every non-11 set also takes a receiver off the field (−0.2 to −0.5 points a game) that only a better tight end or second back can repay.</p>
  <h5 class="narr" style="margin:14px 0 6px;">Defense: what each choice does to the offense it faces</h5>
  <div class="tablewrap"><table><thead><tr><th>Package</th><th>Focus</th><th>Points allowed vs. nickel balanced</th><th>Rush / pass yds allowed</th><th>Giveaways forced</th><th>Sacks</th><th>When it is the right call</th></tr></thead><tbody>${def}</tbody></table></div>
  <p class="narr" style="margin:8px 0 0;">Home field is worth +1.7 points a game in the model.</p>`;
}
const STYLE_COUNTS = ()=>{ const c = {}; if(!seasonState) return c; Object.values(seasonState.identity).forEach(id=>{ const n = offStyleName(id.off); c[n] = (c[n]||0)+1; }); return c; };

// ---- shared explainers (each concept is defined once and reused on the Guide and Preseason pages) ----
function persTableHTML(){
 return `<p class="narr" style="margin:4px 0;">Offenses describe their lineup with a two-digit code: the <b>first digit is the number of running backs</b> and the <b>second is the number of tight ends</b>. Every offense also has a quarterback and five offensive linemen, so the wide receivers fill whatever is left of the 11.</p>
  ${zpbPersBoxesHTML()}`;
}
function styleListsHTML(){
 const offLis = Object.keys(OFF_STYLE_INFO).map(k=>`<li><b>${capFirst(k)}</b> — ${OFF_STYLE_INFO[k].desc}</li>`).join('');
 const defLis = Object.keys(DEF_STYLE_INFO).map(k=>`<li><b>${capFirst(k)}</b> — ${DEF_STYLE_INFO[k].desc}</li>`).join('');
 return `<h5 class="narr" style="margin:6px 0;">Offensive styles</h5><ul class="gl">${offLis}</ul>
  <h5 class="narr" style="margin:10px 0 6px;">Defensive styles</h5><ul class="gl">${defLis}</ul>`;
}
function flexExplainHTML(){
 return `<div class="zpb-flexfade"><p style="margin:4px 0;"><b>What is a flex?</b> Every starting spot has a natural position: a left tackle plays offensive tackle, a strong safety plays strong safety. A <b>flex</b> means starting a player at a spot that is not his natural position — for example, your best guard playing offensive tackle.</p>
  
  <p style="margin:4px 0;"><b>What does it cost?</b> The player's rating is reduced while he plays out of position. The full chart, position by position:</p>
  ${window.zpbFlexTree ? zpbFlexTree() : ''}
  
  </div>`;
}
function valueTiersHTML(){
 const rows = ROSTER_SLOTS.map(s=>({s, w:slotWins(s,90)-slotWins(s,70)})).sort((a,b)=>b.w-a.w);
 const tiers = [['Franchise-changing', r=>r.w>=2],['High value', r=>r.w>=1&&r.w<2],['Solid value', r=>r.w>=0.7&&r.w<1],['Role players', r=>r.w>=0.3&&r.w<0.7],['Depth spots', r=>r.w<0.3]];
 return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b> (${l[0].w.toFixed(1)}${l.length>1?'–'+l[l.length-1].w.toFixed(1):''} wins from a 70→90 upgrade): ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;
}
function boardMathHTML(){
 return `<p style="margin:4px 0;"><b>OVR</b> is the Madden NFL 27 overall rating. The board adds four more columns:</p>
 <ul class="gl">
  <li><b>Wins</b> — how many more games per season a player adds than a 70-rated player at his position, according to the same matchup math that plays the games. It is <i>static</i>: the same number for everyone with that position and rating, on every team and at every point in the draft. If a position has several starting spots (two tackles, three receivers), Wins averages across them. Running back 2, tight end 2 and the strongside linebacker are depth roles and are left out. (Guards and centers are valued the same, which is why a 76 center and a 76 guard have identical Wins.)</li>
  <li><b>Priority</b> — what picking him now adds over the best you could expect to still find at that spot at your next pick. To estimate it, the site replays the computer teams' picks twelve times between now and your next turn and averages what is left. A big priority means waiting costs you; a priority near zero or negative means someone about as good will probably still be there. Priority changes as your roster fills and as the board thins.</li>
  <li><b>Gone</b> — the chance that a player of this type (same position group and same value) has been picked before your next turn, across those twelve replays.</li>
 </ul>
 <p style="margin:4px 0;"><b>Why can a linebacker show high priority?</b> Because priority is about scarcity, not just size. If the best edge rushers will still be there at your next pick but the elite linebackers will not, the linebacker's priority can be higher even though his Wins number is smaller. The Wins column is the clean “how good is he” number; Priority is the “do I need to take him now” number.</p>
 <p style="margin:4px 0;"><b>How the computer teams pick.</b> Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness.</p>`;
}
function termsHTML(){
 return `<ul class="gl">
  <li><b>OVR</b> — a player's overall rating from Madden NFL 27, from about 50 to 99.</li>
  <li><b>Starter / depth chart</b> — the 26 starting spots on this site (11 on offense, 11 on defense with an extra defensive back, plus a kicker, a second back, a second tight end and a third linebacker). The depth chart lists who starts where.</li>
  <li><b>Unit rating</b> — the site grades nine groups of your roster: quarterback, receivers, running backs, run blocking, pass protection, pass rush, run defense, pass coverage and kicker. Each is a weighted average of the starters who feed it, and every game is simulated from these nine ratings.</li>
  <li><b>League rank (#1 of 32)</b> — where a number sits among the 32 teams. #1 is best (for a defense, #1 means fewest points or yards allowed).</li>
  <li><b>Expected vs. actual</b> — the model computes how many points a team <i>should</i> score or allow from its ratings and schedule. The scoreboard adds luck (bounces, turnovers, close games), so a team can finish well above or below its expectation without anything being wrong.</li>
  <li><b>Pass rush / edge rusher / interior line</b> — edge rushers (DE) line up on the outside and chase the quarterback; defensive tackles (DT) play in the middle and also stop runs.</li>
  <li><b>Secondary</b> — the defensive backs: cornerbacks (CB) cover receivers on the outside and safeties (SS, FS) play deeper and help against both pass and run. <b>Backfield</b> means only the area behind the offensive line where the quarterback and running backs line up.</li>
  <li><b>Nickel</b> — a defense with five defensive backs instead of four; an extra defensive back comes in for a linebacker.</li>
  <li><b>Dime</b> — plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.</li>
  <li><b>Pressure, sack, TFL</b> — a pressure is a hurry or hit on the quarterback, a sack is a tackle of the quarterback, and a TFL is a tackle for loss (behind the line of scrimmage).</li>
  <li><b>Replacement level</b> — the rating of the player you could still pick up late at a position. CPU teams value players above it.</li>
  <li><b>Coaching philosophy / Auto / Custom</b> — your philosophy is the style you default to; <b>Auto</b> lets the math choose the best plan every week; <b>Custom</b> locks in your own choices. See the Preseason page for details.</li>
 </ul>`;
}
// Terms used on the 100-season report (moved here from the Guide).
function readingStatsHTML(){
 return `<p><b>r</b> (correlation) answers: “do teams with a better unit win more?” It runs from −1 to +1 across the 32 teams in each of 100 seasons. 0 means no relationship, +0.5 means a clear but loose link, +1 means the best unit always had the most wins. Raw r understates units that teams trade away in the draft (a team with an elite line often has a thinner secondary).</p>
  <p><b>SD</b> (standard deviation) is the typical gap between an average team and a good one at a unit: roughly the difference between a middle-of-the-league unit and a top-five one.</p>
  <p><b>Wins per SD, others equal</b> asks: if a team's unit were one SD better and everything else stayed the same, how many extra wins would it get per season? It comes from a regression that holds the other units constant.</p>
  <p><b>Model-implied wins per SD</b> measures the same thing directly from the matchup formulas. When the two agree, the simulation is playing the game the formulas describe; a gap means the draft's trade-offs are hiding something.</p>
  <p><b>Grouped rows</b> (trenches, offensive line, secondary, and so on) add several units together so you can see whether the lines or the skill positions matter more.</p>
  <p><b>Personnel × strategy table</b>: Share is how often teams ran that setup; Pts/gm is points scored per game with it; Giveaways are turnovers per game; Win% is the win rate of teams in that setup. The setups are chosen by the math for each matchup, not randomly, so a high Win% partly reflects <i>who</i> chose it.</p>
  <p><b>Realism audit</b> compares the best seasons the sim produced with real NFL single-season records. The sim is built to stay under them.</p>
  <p><b>Award patterns</b>: how often each kind of player wins each award over 100 seasons, and how often your team's players or coach won.</p>
  <p><b>Grade</b> (your players): where the player's rating ranks among every starter-caliber player at his position: A = top 10%, C = middle, F = bottom 10%.</p>`;
}
// W18: DEFENSE panel — the four packages drawn as fronts (Owner: creative viz, like the line-of-scrimmage map).
window.zpbDefGuideHTML = function(){
 const dots = (lab, n, extra)=> '<div class="zpb-defdots"><span class="zpb-deflab">'+lab+'</span>' + Array.from({length:n},(_,i)=>'<i'+((extra&&extra[i])?' class="'+extra[i]+'"':'')+'></i>').join('') + '</div>';
 const str = (run, pass)=> '<div class="zpb-defstr"><span class="zpb-emph zpb-emph-b" title="Leans against the run"><b>'+(run?'R+':'\u00b7')+'</b></span><span class="zpb-emph zpb-emph-b" title="Leans against the pass"><b>'+(pass?'P+':'\u00b7')+'</b></span></div>';
 const card = (t, body, p, run, pass, tip)=>'<div class="zpb-defcard" title="'+tip.replace(/"/g,'&quot;')+'"><h5>'+t+'</h5>'+body+'<p>'+p+'</p>'+str(run,pass)+'</div>';
 const c43 = dots('DL',4)+dots('LB',3)+dots('DB',4,['zpb-dcb','zpb-dcb','','']);
 const c34 = dots('DL',3)+dots('LB',4)+dots('DB',4,['zpb-dcb','zpb-dcb','','']);
 const cNK = dots('DL',4)+dots('LB',2)+dots('DB',5,['zpb-dcb','zpb-dcb','zpb-dcb','','']);
 const cDM = dots('DL',4)+dots('LB',1)+dots('DB',6,['zpb-dcb','zpb-dcb','zpb-dcb','zpb-dim','','']);
 return '<div class="zpb-defgrid">'
  + card('4-3', c43, 'Four down linemen and three linebackers — the classic front. The SAM walks out over the tight end and the front four does the rushing.', 1, 0, '4-3 front: four defensive linemen, three linebackers, four defensive backs. Stronger against the run; a little thinner in coverage.')
  + card('3-4', c34, 'Three down linemen and four linebackers. The nose tackle holds the middle while two outside linebackers stand up — they rush on one call and drop on the next.', 1, 1, '3-4 front: an end slides out to linebacker, so the two outside linebackers become the pass rush. The same personnel, a different shape.')
  + card('NICKEL', cNK, 'A linebacker comes off and an extra defensive back — the nickel — comes in: five defensive backs. The modern default when the offense throws.', 0, 1, 'Nickel: the extra defensive back replaces a linebacker. Better in coverage, a little softer against the run.')
  + card('DIME', cDM, 'A sixth defensive back comes in — built for 3rd and long, 4th and long, and the end of the game when only a Hail Mary can beat you.', 0, 1, 'Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys.')
  + '</div>'
  + '<p class="narr" style="margin:10px 0 0;text-align:center;">4-3 and 3-4 shape the front seven; Nickel and Dime swap linebackers for defensive backs. The dots are the players — gold dots are cornerbacks, the dashed dot is the dime.</p>';
};
// w19 (Owner): every boxed chip on the site, explained — as beautiful as the badges themselves
function zpbBadgesGuideHTML(){
 const chip = (t, d, cls)=>'<div class="zpb-bdg"><span class="zrl-badge '+(cls||'')+'">'+t+'</span><div><b>'+t+'</b><div class="narr">'+d+'</div></div></div>';
 const schip = (v, k, d)=>'<div class="zpb-bdg"><span class="zpb-schip"><b>'+v+'</b><i>'+k+'</i></span><div><b>'+k+'</b><div class="narr">'+d+'</div></div></div>';
 return '<div class="zpb-bdggrid">'
  + '<h5 class="narr" style="flex-basis:100%;margin:4px 0;">On the field, during the game</h5>'
  + chip('TD', 'Touchdown \u2014 six points, boxed and shimmering beside the play.')
  + chip('FG', 'Field goal made \u2014 the kick, boxed where the word used to be.')
  + chip('12Y', 'Yardage \u2014 the number of yards the play gained, Y for yards.')
  + chip('INT', 'Interception \u2014 the pass was caught by the defense.')
  + chip('FF', 'Forced fumble \u2014 the defender knocked the ball out.')
  + chip('FR', 'Fumble recovery \u2014 the ball was picked up by the defense.')
  + chip('\u2022 KC', 'Turnover \u2014 the dot marks the giveaway; the box names the team that takes over.')
  + '<h5 class="narr" style="flex-basis:100%;margin:12px 0 4px;">On the player panels</h5>'
  + schip('4,373', 'PassY', 'Passing yards across the season.')
  + schip('37', 'TD', 'Touchdowns scored or thrown.')
  + schip('7', 'INT', 'Interceptions thrown (or caught, on defense).')
  + schip('99.3', '20-0', 'The passer rating, carrying the site\'s perfect-season mark.')
  + schip('71', 'RushY', 'Rushing yards.')
  + schip('43', 'SK', 'Sacks \u2014 allowed by a quarterback, or forced by a defender.')
  + schip('74.4', 'QBR', 'The season performance grade the math computes for this player against his peers.')
  + schip('12', 'W', 'Wins.')
  + '<h5 class="narr" style="flex-basis:100%;margin:12px 0 4px;">The season in badges</h5>'
  + '<p class="narr" style="margin:4px 0;">The Regular Season Review opens with the whole year told in badges \u2014 record, seed, streaks, margins, the best and worst moments, the unit rankings, the three stars of the offense and the three of the defense, the honors your players earned, and the key factors \u2014 one badge a second, offense first, then defense, then what decided it. A perfect season wears gold.</p>'
  + '</div>';
}

let _guideHtml = null;
function guideHTMLCached(){ return _guideHtml || (_guideHtml = renderGuideHTML()); }
function fillDraftGuide(){ /* the hint is retired (Owner) */ }
function renderGuideHTML(){
 const sec = (t, inner, open)=>`<details class="panel" style="margin-bottom:12px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;font-size:1.02rem;">${t}</summary><div style="margin-top:10px;">${inner}</div></details>`;
 const how = `<ol class="gl">
  <li><b>Draft.</b> Choose your team and where you pick. When you are on the clock, pick from the board. One Undo per draft takes your pick back. Every player shows a Wins number and a Priority number (explained below), and the computer teams draft with the same math.</li>
  <li><b>Preseason.</b> Choose your coaching philosophy (how you like to play) and decide where each of your players lines up, including any flexes.</li>
  <li><b>Play the season.</b> Season, Playoffs, Super Bowl. Can you go <b class="zpb-shine">20-0</b>? Seventeen games, a 14-team playoff — leave your game plan on Auto or set it yourself each week.</li>
  <li><b>Review.</b> Game recaps, awards, advanced stats (what caused sacks and big runs), a critique of your picks, and 100 SEASONS, which shows how much of your result was skill and how much was luck.</li>
 </ol>`;
 const draft = `<p style="margin:4px 0;"><b>The goal</b> is to build the roster that wins the most games. Every starting spot is worth a different amount, so the first job is knowing which spots matter. This is how our math ranks them, from most to least valuable (the number in brackets is the extra wins per season from upgrading that spot from a 70 to a 90):</p>
  ${valueTiersHTML()}
  <p style="margin:4px 0;">In short: <b>quarterback is in a class by itself</b>. After that, the <b>edge rushers and cornerbacks are the most valuable defenders</b>, and the <b>offensive tackles and top wide receiver</b> are the most valuable non-quarterbacks on offense. Safeties and interior linemen are solid; running backs, tight ends and linebackers matter less than most fans expect.</p>
  <div class="zpb-bigfade"><span class="zpb-shine">YOU CAN FLEX</span></div>
  `;
 const board = `<h5 class="narr" style="margin:6px 0;">Reading the draft board</h5>${boardMathHTML()}<p style="margin:8px 0 0;"><b>One Undo per draft.</b> The ↶ Undo button takes back your most recent pick — once per draft, and only while you are on the clock.</p>`;
 const flex = flexExplainHTML();
 const values = `<p class="narr" style="margin:4px 0;">One row per starting spot, sorted from the most valuable to the least. Fullbacks and punters carry real modeled value here: the fullback owns a lead-blocker share of run blocking, and the punter drives hidden-yards field position. The integer weight scale behind these numbers lives in the weights guide (REWEIGHT-BRIEF), with the quarterback anchored at 1000.</p>
  <ul class="gl"><li><b>Where the wins come from</b> splits the spot's total wins between its two jobs. For an offensive tackle, “77% pass · 23% run” means about three-quarters of his value comes from protecting the quarterback and a quarter from blocking for the run. Pass protection is worth more than run blocking per rating point, which is why the split leans pass.</li>
  <li><b>Share of each team rating it feeds</b> shows how big a slice of each team-wide rating this one spot is. “Pass protection 21% · run blocking 18%” means the offensive tackle makes up about a fifth of the pass-protection rating and a bit less of the run-blocking rating, because five linemen (and for run blocking, a tight end) share each rating. This number is about <i>composition</i> (how the ratings are built); the other is about <i>importance</i> (how much the rating matters for winning). That is why the two sets of percentages do not match.</li></ul>
  <p class="narr" style="margin:4px 0;">Tight ends help block for the run, running backs add value as pass catchers, and cornerbacks and free safeties each contribute roughly 10% of their value stopping the run.</p>${slotRoleTableHTML()}`;
 const coach = `<p style="margin:4px 0;"><b>Personnel codes.</b></p>${persTableHTML()}`;
 return '<div class="zpb-swgroup zpb-4words">' + zpbSw('DRAFT') + zpbSw('SEASON') + zpbSw('PLAYOFFS') + zpbSw('SUPER BOWL') + '</div>'
  + sec('DRAFTING: WHICH POSITIONS MATTER', zpbDraftGuideHTML(), true)
  + sec('READING THE DRAFT BOARD (WINS, PRIORITY, GONE)', zpbSwWrap(board), false)
  + sec('POSITION VALUES: ALL 28 STARTING SPOTS', zpbValuesHTML(), false)
  + sec('COACHING: PERSONNEL, STYLES AND GAME PLANS', zpbCoachGuideHTML(coach), false)
  + sec('DEFENSE: 4-3, 3-4, NICKEL, DIME', zpbDefGuideHTML(), true)
  + sec('THE MATH OF EVERY GAME-PLAN CHOICE', planMathHTML(), false)
  + sec('THE BADGES: READING EVERY BOX', zpbBadgesGuideHTML(), true)
  + sec('GLOSSARY', zpbGlossHTML(), false);
}

// ================= PRESEASON PAGE =================
// Win chance of every style against an average team, for this roster, with the model's recommendation marked.
function styleTablesHTML(team){
 const S = seasonState, R = S.unitRatings[team], lg = S.league, id = S.identity[team], exp = {off:NEUTRAL_OFF, def:DEFAULT_DEF};
 const auto = teamIdentity(R, lg);
 const offRows = Object.keys(OFF_STYLE_INFO).map(k=>{ const o = resolveOffStyle(team, k); return {k, o, u:offUtil(R, lg, lg, o, exp, id.def, 0)}; }).sort((a,b)=>persOrd(planText(a.o))-persOrd(planText(b.o)) || b.u-a.u);
 const defRows = Object.keys(DEF_STYLE_INFO).map(k=>{ const d = {pkg:DEF_STYLE_INFO[k].pkg, focus:DEF_STYLE_INFO[k].focus}; return {k, d, u:defUtil(R, lg, lg, d, exp, id.off, 0)}; }).sort((a,b)=>defPlanText(a.d).localeCompare(defPlanText(b.d)) || b.u-a.u);
 const bo = offRows[0].u, bd = defRows[0].u;
 const row = (name, setup, u, best, chosen, desc)=>`<tr style="${chosen?'background:var(--panel2);':''}"><td><b>${capFirst(name)}</b>${best===u?' <span class="badge badge-passfail" style="margin-left:4px;">math\'s pick</span>':''}${chosen?' <span class="narr">(your choice)</span>':''}<div class="narr">${desc}</div></td><td class="narr">${setup}</td><td class="score">${(u*100).toFixed(1)}%</td><td class="score">${u===best?'—':'−'+((best-u)*100).toFixed(1)+' pts'}</td></tr>`;
 const o = offRows.map(r=>row(r.k, planText(r.o), r.u, bo, id.offChoice===r.k, OFF_STYLE_INFO[r.k].desc)).join('');
 const d = defRows.map(r=>row(r.k, defPlanText(r.d), r.u, bd, id.defChoice===r.k, DEF_STYLE_INFO[r.k].desc)).join('');
 const head = '<thead><tr><th>Style</th><th>Personnel</th><th title="Chance of beating an average team at a neutral site with this style">Win chance vs. an average team</th><th>Cost vs. the best</th></tr></thead>';
 return {off:`<table class="zpb-styletb">${head}<tbody>${o}</tbody></table>`, def:`<table class="zpb-styletb">${head}<tbody>${d}</tbody></table>`, auto};
}
function aggrControlHTML(user){
 const S = seasonState; S.aggr = S.aggr||{}; S.defAggr = S.defAggr||{};
 const cur = S.aggr[user]||'balanced', dcur = S.defAggr[user]||'balanced';
 const sel = (id, info, val)=>`<select id="${id}" >${Object.keys(info).map(k=>`<option value="${k}" ${k===val?'selected':''}>${info[k].label}</option>`).join('')}</select>`;
 return `<div style="display:flex;gap:26px;flex-wrap:wrap;align-items:flex-start;">
  <div style="flex:1 1 250px;min-width:235px;">
   <p style="margin:4px 0;"><b>Offense</b> — how bold are you on <b>2-Pt Conversions</b> and <b>4th downs</b>?</p>
   <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style${sel('aggrSel', AGGR_INFO, cur)}</label>
   <p style="margin:6px 0;" id="aggrDesc">${AGGR_INFO[cur].desc}</p>
  </div>
  <div style="flex:1 1 250px;min-width:235px;">
   <p style="margin:4px 0;"><b>Defense</b> — how hard do you hunt the <b>quarterback</b> and the ball?</p>
   <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;max-width:300px;margin:8px 0;">Style${sel('defAggrSel', DEF_AGGR_INFO, dcur)}</label>
   <p style="margin:6px 0;" id="defAggrDesc">${DEF_AGGR_INFO[dcur].desc}</p>
  </div>
 </div>
  <details class="zpb-dd" style="font-size:0.86rem;"><summary>How a 2-Pt Conversion works</summary>
   <div style="margin-top:8px;">
    <div class="zpb-twop">
     <div><b>Kick</b><span>1 point · makes it about 94% of the time</span></div>
     <div><b>Go for 2</b><span>2 points from the 2-yard line · makes it about 48% of the time</span></div>
    </div>
    <p class="narr" style="margin:8px 0 0;">Both choices are worth about the same over many tries, so the call is about the game situation. One rule above all: <b>losing by 8 or 11 late, every team goes for 2</b> — that is the try that ties the game or leaves a field goal to tie. Every other team has its own style too, and the recap says when a team went for 2.</p>
   </div></details>`;
}
function wireAggr(){
 const el = document.getElementById('aggrSel'); if(!el) return;
 el.addEventListener('change', ()=>{ seasonState.aggr[seasonUserTeam()] = el.value; const d = document.getElementById('aggrDesc'); if(d) d.textContent = AGGR_INFO[el.value].desc; });
 const de = document.getElementById('defAggrSel'); // w21 (Owner): the defense dial lives next to the offense dial
 if(de) de.addEventListener('change', ()=>{ seasonState.defAggr = seasonState.defAggr||{}; seasonState.defAggr[seasonUserTeam()] = de.value; const d = document.getElementById('defAggrDesc'); if(d) d.textContent = DEF_AGGR_INFO[de.value].desc; });
}
function renderPreseasonView(container){
 const S = seasonState, user = seasonUserTeam(), roster = draftSim.rosters.find(r=>r.isUser), id = S.identity[user];
 const tabs = styleTablesHTML(user), auto = tabs.auto, cnt = STYLE_COUNTS();
 const offOpts = Object.keys(OFF_STYLE_INFO).map(k=>`<option value="${k}" ${id.offChoice===k?'selected':''}>${capFirst(k)} (${cnt[k]||0} team${(cnt[k]||0)===1?'':'s'} run it)</option>`).join('');
 const defOpts = Object.keys(DEF_STYLE_INFO).map(k=>`<option value="${k}" ${id.defChoice===k?'selected':''}>${capFirst(k)}</option>`).join('');
 const isAuto = id.source==='math';
 const hdr = `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><div><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">Preseason</div><h3 style="margin:2px 0;">Set up the ${user} before Week 1</h3></div><button class="resetbtn" id="beginSeasonBtn" style="width:auto;margin:0;padding:10px 24px;">Begin the season →</button></div></div>`;
 const lineup = `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">1. Lineup, flexes and returner</h3>
  ${lineupEditorHTML(roster, 'lineupPre')}
  <div class="zpb-flexfoot"><details><summary style="cursor:pointer;font-weight:700;">New to flexing? Read this first</summary><div style="margin-top:8px;">${flexExplainHTML()}</div></details></div></div>`;
 const phil = `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">2. Coaching philosophy</h3>
  <div id="zpbBaseToggleHost2" style="margin:6px 0 2px;"></div>
  <p style="margin:4px 0;">Your <b>coaching philosophy</b> is how your team likes to play by default. Opponents scout it. In any single game the plan can still change when a matchup calls for it, and the recaps say when it does and why.</p>
  <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin:10px 0;">
   <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;">Offense<select id="scriptOff" ><option value="auto" ${id.offChoice&&id.offChoice!=='auto'?'':'selected'}>Auto (recommended): ${capFirst(offStyleName(auto.off))}</option>${offOpts}</select></label>
   <label class="narr" style="display:flex;flex-direction:column;gap:2px;font-size:0.72rem;">Defense<select id="scriptDef" ><option value="auto" ${id.defChoice&&id.defChoice!=='auto'?'':'selected'}>Auto (recommended): ${capFirst(defStyleName(auto.def))}</option>${defOpts}</select></label>
   <div class="zpb-selrow"><div class="zpb-selbubble"><em>Offense</em><b>${capFirst(offStyleName(id.off))}</b><span>${planText(id.off)}</span></div><div class="zpb-selbubble"><em>Defense</em><b>${capFirst(defStyleName(id.def))}</b><span>${defPlanText(id.def)}</span></div></div><div id="zpbBaseToggleHost2" style="margin-top:10px;"></div></div>
  ${scriptWhyHTML(user)}
  ${zpbAutoWhyHTML(isAuto)}
  <details class="zpb-dd"><summary>Offense: every style with your roster</summary><div style="margin-top:8px;">${tabs.off}</div></details>
  <details class="zpb-dd"><summary>Defense: every style with your roster</summary><div style="margin-top:8px;">${tabs.def}</div></details>
  <details style="margin-top:12px;"><summary style="cursor:pointer;font-weight:700;">What do these terms mean? (personnel, packages)</summary><div style="margin-top:8px;">${persTableHTML()}${zpbPkgVizHTML()}</div></details></div>`;
 const agg = `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">3. Game-day aggressiveness</h3>${aggrControlHTML(user)}</div>`;
 const foot = `<div class="panel" style="margin-bottom:14px;text-align:center;"><button class="resetbtn" id="beginSeasonBtn2" style="width:auto;margin:0;padding:12px 28px;">Begin the season →</button></div>`;
 container.innerHTML = hdr + lineup + phil + agg + foot + seasonOptionsHTML();
 wireAggr();
 wireLineupEditor(roster, 'lineupPre', ()=>{ refreshUserAfterLineup(); renderSeasonTab(container); });
 const so = document.getElementById('scriptOff'), sd = document.getElementById('scriptDef');
 const ch = ()=>{ applyUserScript(so.value, sd.value); renderSeasonTab(container); };
 if(so) so.addEventListener('change', ch); if(sd) sd.addEventListener('change', ch);
 const go = ()=>{ S.preseason = false; renderSeasonTab(container); window.scrollTo(0,0); };
 document.getElementById('beginSeasonBtn').addEventListener('click', go); document.getElementById('beginSeasonBtn2').addEventListener('click', go);
 wireSeasonOptions(container);
}
// During the season: a collapsible lineup editor so flexes can change at any stage.
function lineupPanelHTML(){
 const roster = draftSim.rosters.find(r=>r.isUser);
 return `<details class="panel" id="lineupSeasonPanel" style="margin-bottom:14px;"><summary style="cursor:pointer;font-weight:700;">Lineup and flexes <span class="narr" style="font-weight:400;">(change who plays where at any time)</span></summary><div style="margin-top:8px;"><details style="margin-bottom:8px;"><summary style="cursor:pointer;">What is a flex?</summary><div style="margin-top:6px;">${flexExplainHTML()}</div></details>${lineupEditorHTML(roster, 'lineupSeason')}</div></details>`;
}
function wireLineupPanel(container){
 const roster = draftSim.rosters.find(r=>r.isUser); if(!roster || !document.getElementById('lineupSeason')) return;
 wireLineupEditor(roster, 'lineupSeason', ()=>{ refreshUserAfterLineup(); renderSeasonTab(container); const p = document.getElementById('lineupSeasonPanel'); if(p) p.open = true; });
}

// ================= IDENTITY, SCOUTING, PREVIEWS, AND DEEPER REVIEWS =================
const STRENGTH_NOTE = {
 olRun:'a line that can impose its will on the ground', olPass:'protection that keeps the quarterback clean', rb:'running backs who create on their own',
 qb:'a quarterback who can win the game himself', rec:'receivers who consistently beat coverage', passRush:'a front that wrecks the pocket',
 frontRun:'a front seven that makes teams one-dimensional', coverage:'a secondary that erases passing lanes', kicker:'a kicker who turns drives into points'
};
const WEAK_NOTE = {
 olRun:'a line that struggles to open running lanes', olPass:'protection that lets pressure through', rb:'running backs short on explosiveness',
 qb:'quarterback play that can cap the ceiling', rec:'a receiving group that struggles to separate and holds onto the ball poorly', passRush:'a pass rush that cannot get home',
 frontRun:'a run defense that bleeds yardage', coverage:'a secondary that good quarterbacks can pick apart', kicker:'a kicker who is not reliable'
};
function slotLine(team, slot){ const e = effEntry(seasonState.teams[team].slotmap, slot); return e ? `${e.name} (${e.ovr})` : 'a replacement-level placeholder'; }
function shortUnit(u){ return UNIT_INFO[u].short; }

function identityParagraphs(team, isUser){
 const S = seasonState, rk = S.unitRanks[team], The = 'the '+nick(team);
 const names = teamNames(), st = computeStandings(S.schedule, names), s = st[team], gp = s.wins+s.losses+s.ties, T = teamSeasonTotals();
 const rec = `${s.wins}-${s.losses}${s.ties?'-'+s.ties:''}`;
 const lean = rk.passOff - rk.runOff, style = lean>=7 ? 'run' : lean<=-7 ? 'pass' : 'balanced';
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const byRank = units.slice().sort((a,b)=>rk[a]-rk[b]), best = byRank.slice(0,2), worst = byRank.slice(-2).reverse();
 const styleText = {
  run:[`a run-first team: the line and running backs grade out better than the passing game (#${rk.runOff} vs. #${rk.passOff})`, `an offense that wants to lean on the ground — the running game ranks #${rk.runOff} while the passing game sits at #${rk.passOff}`],
  pass:[`a pass-first team: quarterback, receivers and protection rank #${rk.passOff} against a running game at #${rk.runOff}`, `an offense that will live and die through the air — #${rk.passOff} as a passing attack versus #${rk.runOff} on the ground`],
  balanced:[`a balanced offense with no glaring tilt (#${rk.runOff} running, #${rk.passOff} passing)`, `a team that can hurt you either way — #${rk.runOff} on the ground and #${rk.passOff} through the air`]
 }[style];
 const recText = gp
  ? ` At ${rec} they are scoring ${(T[team].pf/gp).toFixed(1)} a game (#${rankIn(T,'pf',team,false)}) and allowing ${(T[team].pa/gp).toFixed(1)} (#${rankIn(T,'pa',team,true)}).`
  : ` Nobody knows yet how those numbers will translate to the scoreboard.`;
 const p1 = `${capFirst(The)} profile as ${pick(styleText)}.${recText} The calling cards are the ${shortUnit(best[0])} (#${rk[best[0]]}) and the ${shortUnit(best[1])} (#${rk[best[1]]}); the soft spots are the ${shortUnit(worst[0])} (#${rk[worst[0]]}) and the ${shortUnit(worst[1])} (#${rk[worst[1]]}).`;

 const olNote = rk.olPass<=8 ? pick([' — the quarterback should have all day', ' — the pocket should stay clean']) : rk.olPass>=25 ? pick([' — pressure will find the quarterback', ' — expect the quarterback to be hurried']) : '';
 let dropNote = '';
 if(gp>=3){
  T[team].cr = T[team].rec/Math.max(T[team].tgt,1); Object.values(T).forEach(x=>{ x.cr = x.rec/Math.max(x.tgt,1); });
  const crRank = rankIn(T,'cr',team,false), pct = (T[team].cr*100).toFixed(1);
  if(crRank>=27) dropNote = ` The receivers have hauled in only ${T[team].rec} of ${T[team].tgt} targets (${pct}%, #${crRank} in the league), a genuine problem.`;
  else if(crRank<=6) dropNote = ` The receivers have caught ${T[team].rec} of ${T[team].tgt} targets (${pct}%), among the most reliable hands in the league.`;
 }
 const p2 = `Under center is ${slotLine(team,'QB')}, the #${rk.qb} quarterback situation in the league. The ground game runs through ${slotLine(team,'RB1')}, and the targets are ${slotLine(team,'WR1')}, ${slotLine(team,'WR2')} and ${slotLine(team,'TE1')}. Up front, the line grades #${rk.olRun} in run blocking and #${rk.olPass} in pass protection${olNote}.${dropNote}`;

 const defNote = gp ? ` The unit has ${T[team].skForced} sacks (#${rankIn(T,'skForced',team,false)}) and ${T[team].take} takeaways (#${rankIn(T,'take',team,false)}).` : '';
 const p3 = `The pass rush is led by ${slotLine(team,'DE1')} and ${slotLine(team,'DE2')} and grades #${rk.passRush}; ${slotLine(team,'DT1')} anchors a run defense that grades #${rk.frontRun}. Behind them, ${slotLine(team,'CB1')}, ${slotLine(team,'CB2')}, ${slotLine(team,'SS')} and ${slotLine(team,'FS')} form a secondary graded #${rk.coverage}.${defNote}`;

 const kickNote = rk.kicker<=6 ? ' The kicker is a legitimate weapon in tight games.' : rk.kicker>=27 ? ' The kicker is a question mark in close games.' : '';
 const p4 = `${capFirst(The)} win through ${STRENGTH_NOTE[best[0]]} and ${STRENGTH_NOTE[best[1]]}. They are vulnerable to teams that can attack ${WEAK_NOTE[worst[0]]} or ${WEAK_NOTE[worst[1]]}.${kickNote}`;

 const stars = topStarters(team, 3).map(x=>`${x.name} (${LABELS[x.slot]||x.slot}, ${x.ovr})`);
 const p5 = `${pick(['Players to watch:','The names that bend a game plan:','Star power:'])} ${joinList(stars)}.`;
 const out = [p1,styleParagraph(team),p2,p3,p4,p5];
 return out;
}
function renderIdentityPanel(team, title, open, isUser){
 const S = seasonState, rt = S.unitRatings[team], rk = S.unitRanks[team];
 const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
 const rows = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'].map(u=>{
  const r = rk[u] || 32;
  const w = Math.max(5, Math.round((33-r)/32*100));
  const tone = r<=8 ? 'var(--good)' : r>=25 ? 'var(--bad)' : 'var(--text)';
  const rc = r<=6 ? ' zpb-rktop' : (r>=24 ? ' zpb-rkbot' : '');
  return `<div class="zpb-rkrow${rc}" style="${st}"><span class="zpb-rkname">${UNIT_INFO[u].label}</span><span class="zpb-rkbar"><i style="width:${w}%;"></i></span><b class="zpb-rkval" style="color:${tone};">#${r}</b><span class="zpb-rkgrade">${rt[u].toFixed(1)}</span></div>`;
 }).join('');
 return `<details class="panel zpb-glowpanel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">${title} <span class="narr" style="font-weight:400;">(${team})</span></summary>
  <div style="margin-top:10px;" class="zpb-rkgrid">${rows}</div></details>`;
}
function renderTeamIdentityHTML(open){ return renderIdentityPanel(seasonUserTeam(), "Your Team's Identity", open, true); }
function renderScoutingHTML(opp){ return renderIdentityPanel(opp, 'Opponent Scouting Report', true, false); }

// ---------- journalist-style previews ----------
function previewCtx(team){
 const S = seasonState, names = teamNames(), st = computeStandings(S.schedule, names), s = st[team];
 const gp = s.wins+s.losses+s.ties, hc = hotCold(team, 3);
 const seeds = S.seeds || computeSeeding(st, S.schedule);
 let seedInfo = null; ['AFC','NFC'].forEach(c=>{ const e = seeds[c].find(x=>x.team===team); if(e) seedInfo = {conf:c, seed:e.seed}; });
 const qbE = effEntry(S.teams[team].slotmap, 'QB');
 return {team, N:nick(team), s, gp, rec:`${s.wins}-${s.losses}${s.ties?'-'+s.ties:''}`, pct: gp ? (s.wins+s.ties*0.5)/gp : 0,
  streak: teamStreakThrough(team, 99), hot:hc.hot, cold:hc.cold, form:hc.f, seedInfo, qbE, qbRec: qbE ? S.playerStats[team+'|'+qbE.name] : null, st};
}
function previewHeadline(g, mode){
 const A = nick(g.away), H = nick(g.home);
 if(mode==='playoff'){
  const rl = ROUND_LABELS[seasonState.currentPlayoffRound];
  return pick([`${rl}: ${A} at ${H} — nobody gets a second chance`, `${rl}: ${A} and ${H} meet with a season on the line`, `${rl} showdown: ${A} vs. ${H}`]);
 }
 const ca = previewCtx(g.away), ch = previewCtx(g.home);
 const hotStreak = c => c.streak.kind==='W' && c.streak.n>=3, coldStreak = c => c.streak.kind==='L' && c.streak.n>=3;
 if(g.week>1 && hotStreak(ca) && coldStreak(ch)) return `${poss(A)} hot streak meets ${poss(H)} skid`;
 if(g.week>1 && hotStreak(ch) && coldStreak(ca)) return `${H} look to extend a win streak against a reeling ${A} team`;
 if(g.divisional) return pick([`Division showdown: ${A} at ${H}`, `${A} and ${H} settle some division business`]);
 if(g.week===1) return pick([`Opening day: ${A} at ${H}`, `Season opener: ${A} visit ${H}`]);
 return `${A} at ${H}: ${pick(['a game with more riding on it than it looks','the kind of game that bends a season','who blinks first?'])}`;
}
const HOT_T = [
 c=>`${c.hot.name} has been the story for the ${c.N}: ${formLine(c.hot)}.`,
 c=>`Nobody is playing better for the ${c.N} than ${c.hot.name}, who has ${formLine(c.hot)}.`,
 c=>`${c.hot.name} arrives playing the best football of his year: ${formLine(c.hot)}.`,
 c=>`Few players anywhere are playing like ${c.hot.name} right now — ${formLine(c.hot)}.`
];
const COLD_T = [
 c=>`The ${c.N} need more from ${c.cold.name}, who has managed ${formLine(c.cold)}.`,
 c=>`${c.cold.name} has hit a rough patch for the ${c.N}: ${formLine(c.cold)}.`,
 c=>`Questions are following ${c.cold.name} into this one after ${formLine(c.cold)}.`,
 c=>`${c.cold.name} has struggled to find his rhythm — ${formLine(c.cold)}.`
];
function formBits(A, H, bits){
 let hi = Math.floor(Math.random()*HOT_T.length), ci = Math.floor(Math.random()*COLD_T.length);
 [A,H].forEach(c=>{
  if(c.hot){ bits.push(HOT_T[hi % HOT_T.length](c)); hi++; }
  if(c.cold){ bits.push(COLD_T[ci % COLD_T.length](c)); ci++; }
 });
}
function qbBeat(c){
 if(!c.qbRec || c.gp<4) return null;
 const td = c.qbRec.st.passTD||0, it = c.qbRec.st.int||0, tdP = td/c.gp*17, inP = it/c.gp*17;
 if(tdP>=40) return pick([`${c.qbE.name} is on pace for ${Math.round(tdP)} touchdown passes, and defenses have run out of answers.`, `Nobody has solved ${c.qbE.name}: ${td} touchdowns and ${it} interceptions, a ${Math.round(tdP)}-touchdown pace.`]);
 if((c.qbE.ovr||0)>=85 && it>=4 && td<=it*1.6) return pick([`${c.qbE.name} has become a turnover machine, ${it} interceptions against just ${td} touchdowns, and the pressure on him is building.`, `Every week the question about ${c.qbE.name} gets louder: ${it} picks, ${td} touchdowns, and a fan base running out of patience.`]);
 if((c.qbE.ovr||0)>=85 && inP>=18) return `${c.qbE.name} is on pace for ${Math.round(inP)} interceptions, a number that gets quarterbacks benched.`;
 if(td>=it*6 && td>=8) return `${c.qbE.name} has ${td} touchdowns against ${it} interception${it===1?'':'s'}, and it is fair to ask whether anyone in the league is playing quarterback better.`;
 return null;
}
function regularPreview(g){
 const S = seasonState, H = previewCtx(g.home), A = previewCtx(g.away);
 const parts = [];
 // paragraph 1: stakes and storylines
 let p1;
 if(g.week===1 || (H.gp===0 && A.gp===0)){
  p1 = `${pick(['Opening day has a way of making everyone feel like a contender.','Week 1 is all promise and no evidence — which is exactly why nobody can look away.','Nothing is decided yet, and for one Sunday every roster looks like a champion on paper.'])} The ${A.N} visit the ${H.N} to open the season, one team built around its ${shortUnit(bestUnit(g.away))}, the other around its ${shortUnit(bestUnit(g.home))}.`;
 } else {
  const strong = c => c.pct>=0.6, weak = c => c.pct<=0.4;
  const kind = strong(H)&&strong(A) ? 'heavy' : (strong(H)&&weak(A))||(strong(A)&&weak(H)) ? 'mismatch' : weak(H)&&weak(A) ? 'desperate' : 'normal';
  const opener = {
   heavy:['Circle this one on the calendar.','This is the kind of game people remember in January.','Nobody in the conference will be looking away from this one.'],
   mismatch:['On paper this is the kind of game the favorite is supposed to win going away — which is exactly why underdogs get dangerous.','The standings say mismatch; football has a long history of humbling the standings.'],
   desperate:['Two seasons are hanging by a thread, and something has to give.','Both teams are running out of runway, and this one will feel like a referendum.'],
   normal:['Every game matters in a league this tight.','There is more riding on this one than the standings alone suggest.']
  }[kind];
  const streakPhrase = c => c.streak.kind==='W'&&c.streak.n>=3 ? `riding a ${c.streak.n}-game winning streak` : c.streak.kind==='L'&&c.streak.n>=3 ? `reeling from ${c.streak.n} straight losses` : null;
  const seedPhrase = c => c.seedInfo && c.gp>=5 ? (c.seedInfo.seed<=7 ? `holding the ${c.seedInfo.conf}'s #${c.seedInfo.seed} seed` : `on the outside of the ${c.seedInfo.conf} playoff picture`) : null;
  const story = c => { const bits = [streakPhrase(c), seedPhrase(c)].filter(Boolean); return bits.length ? `The ${c.N} arrive ${joinList(bits)}.` : `The ${c.N} come in at ${c.rec}.`; };
  const prior = h2hGames(g.home, g.away).filter(m=>m!==g && m.played)[0];
  let h2h = '';
  if(prior){ const w = prior.result.homeScore>prior.result.awayScore ? prior.home : prior.away, sc = scoreFor(prior, w); h2h = ` They have already met once: the ${nick(w)} won ${sc.fs}–${sc.os} in Week ${prior.week}${g.divisional?', and the division race remembers it':''}.`; }
  const closer = pick(['For one of these teams, Sunday will feel like a turning point.','One result, two very different weeks ahead.','Somebody leaves this game with real momentum.']);
  p1 = `${pick(opener)} The ${A.N} (${A.rec}) travel to face the ${H.N} (${H.rec})${g.divisional?' in a divisional game that carries extra weight':''}. ${story(A)} ${story(H)}${h2h} ${closer}`;
 }
 parts.push(p1);

 // paragraph 2: the players
 const bits = [];
 if(A.qbE && H.qbE){
  const sl = c => c.qbRec && c.gp>=2 ? `, ${c.qbRec.st.passTD||0} TD against ${c.qbRec.st.int||0} INT` : '';
  bits.push(`Under center it is ${A.qbE.name} (${A.qbE.ovr}${sl(A)}) against ${H.qbE.name} (${H.qbE.ovr}${sl(H)}).`);
 }
 [A,H].forEach(c=>{ const b = qbBeat(c); if(b) bits.push(b); });
 formBits(A, H, bits);
 if(!A.hot && !A.cold && !H.hot && !H.cold){
  const sa = topStarters(g.away,1)[0], sh = topStarters(g.home,1)[0];
  bits.push(`All eyes will be on ${sa.name} (${LABELS[sa.slot]||sa.slot}, ${sa.ovr}) and ${sh.name} (${LABELS[sh.slot]||sh.slot}, ${sh.ovr}), the players each defense has to game-plan around.`);
 }
 parts.push(`${(A.hot||A.cold||H.hot||H.cold) ? pick(['Then there is the matter of who has the hot hand.','Form matters too.']) : pick(['The individual stories may matter as much as the team ones.','Look closer and the game is a collection of personal duels.'])} ${bits.join(' ')}`);

 // paragraph 3: the matchup that decides it
 const sw = topMatchupSwings(g.home, g.away, 2, g);
 const lines = matchupLines(g, sw, false);
 const hp = sw.projHome, ap = sw.projAway, gap = Math.abs(hp-ap), fav = hp>=ap ? g.home : g.away;
 const verdict = gap<1 ? `The ratings call it a coin flip (${hp.toFixed(1)}–${ap.toFixed(1)}), and games like that tend to come down to one bounce.`
  : `The ratings lean ${Tn(fav)} by about ${gap.toFixed(1)}, but ${pick(['favorites have been getting found out all year','that margin is thinner than any coach wants to admit','the film will say whether it holds'])}.`;
 parts.push(`${lines.join(' ')} ${verdict}`);
 parts.push(planPreviewParagraph(g));
 return parts.map(t=>`<p class="detail-item">${t}</p>`).join('');
}
function Tn(team){ return 'the '+nick(team); }
function matchupLines(g, sw, detailed){
 const S = seasonState, used = new Set(), lines = [];
 sw.list.forEach(e=>{
  const owner = teamOfSide(g, e.ownerSide), opp = teamOfSide(g, e.ownerSide==='home'?'away':'home'), ou = OPPOSING[e.unit];
  const key = [owner+'|'+e.unit, opp+'|'+ou].sort().join('~'); if(used.has(key)) return; used.add(key);
  const ur = S.unitRanks[owner][e.unit], or = S.unitRanks[opp][ou], pts = Math.abs(e.pts).toFixed(1);
  const rate = (t,u) => detailed ? `${S.unitRatings[t][u].toFixed(1)}, #${S.unitRanks[t][u]}` : `#${S.unitRanks[t][u]}`;
  if(e.pts>0){
   if(ur<=8 && or<=8) lines.push(`${pick(['An irresistible force meets an immovable object:','The collision to watch:','Here is where it could be decided:'])} ${poss(Tn(owner))} ${shortUnit(e.unit)} (${rate(owner,e.unit)}) against ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}). Against an average team the first is worth roughly +${pts} points a game, so whichever side flinches loses ground.`);
   else if(or>=17) lines.push(['olRun','olPass','rb','qb','rec','kicker'].includes(e.unit)
    ? `${capFirst(poss(Tn(owner)))} ${shortUnit(e.unit)} (${rate(owner,e.unit)}) is a real weapon here — roughly +${pts} points a game compared with an average team — and ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}) is not the kind of unit that slows it down.`
    : `${capFirst(poss(Tn(owner)))} ${shortUnit(e.unit)} (${rate(owner,e.unit)}) is a real weapon here — roughly +${pts} points a game compared with an average team — and ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}) is poorly equipped to beat it.`);
   else lines.push(`${capFirst(poss(Tn(owner)))} ${shortUnit(e.unit)} (${rate(owner,e.unit)}) is a genuine strength, worth roughly +${pts} points a game compared with an average team, and it meets ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}).`);
  } else {
   lines.push(or<=12
    ? `For ${Tn(owner)}, the ${shortUnit(e.unit)} (${rate(owner,e.unit)}) is the soft spot — about ${pts} points a game below an average team — and ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}) is exactly the sort of unit that exploits it.`
    : `For ${Tn(owner)}, the ${shortUnit(e.unit)} (${rate(owner,e.unit)}) is the soft spot — about ${pts} points a game below an average team — though ${poss(Tn(opp))} ${shortUnit(ou)} (${rate(opp,ou)}) is hardly built to punish it.`);
  }
 });
 return lines;
}
function playoffPreview(g){
 const S = seasonState, H = previewCtx(g.home), A = previewCtx(g.away), rk = S.currentPlayoffRound, T = teamSeasonTotals();
 const parts = [];
 const stakes = {
  wildcard:['Wild Card weekend does not care about your regular season: one game, no do-overs, and a lot of good teams are about to find out what that means.','In January the standings stop mattering and the film starts.'],
  divisional:['The divisional round is where byes pay off and wild-card momentum gets tested.','Eight teams are left, and every one of them believes it is the exception.'],
  champ:['Four teams remain. Two games stand between this group and the Super Bowl.','One win from the biggest stage in the sport, and the margin for error is gone.'],
  superbowl:['Everything this season has been leads here: one game, two conference champions, one trophy.','The Super Bowl asks a single question of two very different teams, and only one gets to answer it right.']
 }[rk];
 const seedTag = c => c.seedInfo ? `the ${c.seedInfo.conf}'s #${c.seedInfo.seed} seed` : 'a conference champion';
 const sgap = (A.seedInfo && H.seedInfo && rk!=='superbowl') ? Math.abs(A.seedInfo.seed-H.seedInfo.seed) : 0;
 let hook = '';
 if(sgap>=4){ const dog = A.seedInfo.seed>H.seedInfo.seed ? A : H, fav = dog===A ? H : A; hook = ` On paper it is David against Goliath: a #${dog.seedInfo.seed} seed walking into the building of a #${fav.seedInfo.seed}.`; }
 parts.push(`${pick(stakes)} ${capFirst(Tn(g.away))}, ${seedTag(A)}, ${rk==='superbowl'?'face':'visit'} ${Tn(g.home)}, ${seedTag(H)}${rk==='superbowl'?', on a neutral field':''}.${hook}`);

 // the road
 const road = c => {
  const s = c.s, gp = c.gp, diff = (s.pf-s.pa)/gp, e = 2.37, expW = gp*Math.pow(s.pf,e)/(Math.pow(s.pf,e)+Math.pow(s.pa,e)), gap = s.wins+s.ties*0.5-expW;
  return {kind: gap>=1.5?'lucky':gap<=-1.5?'unlucky':'honest', head:`the ${c.N} went ${c.rec} (${diff>=0?'+':'−'}${Math.abs(diff).toFixed(1)} points per game)`};
 };
 const ra = road(A), rh = road(H);
 const lk = {lucky:'won more games than their scoring margin says they should have', unlucky:'were better than their record suggests', honest:'won about as many games as their scoring margin says they should have'};
 if(ra.kind===rh.kind) parts.push(`${capFirst(ra.head)} and ${rh.head}; both ${ra.kind==='honest'?'won about as many games as their scoring margins say they should have':ra.kind==='lucky'?'collected more wins than their scoring margins support':'were better than their records suggest'}.`);
 else parts.push(`${capFirst(ra.head)} and ${lk[ra.kind]}; ${rh.head} and ${lk[rh.kind]}.`);

 // history
 const hist = [];
 [A,H].forEach(c=>{
  const prev = playoffGamesOf(c.team).slice(-1)[0];
  if(prev){ const sc = scoreFor(prev, c.team), mvp = prev.detail.mvp; hist.push(`The ${c.N} got here by ${sc.fs>sc.os?'beating':'surviving'} the ${nick(sc.opp)} ${sc.fs}–${sc.os}, with ${mvp.name} (${mvp.group}) taking the game ball.`); }
 });
 const meets = h2hGames(g.home, g.away).filter(m=>m!==g);
 if(meets.length){ const one = m=>{ const w = m.result.homeScore>m.result.awayScore ? m.home : m.away, sc = scoreFor(m, w); return `Week ${m.week}, when the ${nick(w)} won ${sc.fs}–${sc.os}${m.result.ot?' in overtime':''}`; };
  hist.push(meets.length>1 ? `They met twice in the regular season: ${meets.map(one).join(' and ')}. Both coaching staffs will have worn out the film from those two games.` : `They also met in ${one(meets[0])} — ${pick(['and nobody in the losing locker room has forgotten it','a result both coaching staffs will have circled on the film'])}.`); }
 else hist.push(`They did not meet in the regular season, so there is no tape to lean on and no revenge to claim.`);
 parts.push(hist.join(' '));

 // the players
 const bits = [];
 if(A.qbE && H.qbE){
  const sl = c => c.qbRec ? `${c.qbRec.st.passTD||0} TD, ${c.qbRec.st.int||0} INT this year` : '';
  bits.push(`The quarterback duel is ${A.qbE.name} (${sl(A)}) against ${H.qbE.name} (${sl(H)}).`);
 }
 formBits(A, H, bits);
 const stars = [A,H].map(c=>{ const t = topStarters(c.team,1)[0]; return `${t.name} (${LABELS[t.slot]||t.slot}, ${t.ovr})`; });
 bits.push(`Star power is not in short supply — ${stars[0]} for the visitors and ${stars[1]} for the home team.`);
 parts.push(bits.join(' '));

 // the matchups
 const sw = topMatchupSwings(g.home, g.away, 3, g), lines = matchupLines(g, sw, true);
 const giveRank = c => rankIn(T,'give',c.team,false), takeRank = c => rankIn(T,'take',c.team,false);
 const xfac = `The x-factor is the turnover line: the ${A.N} gave it away ${(T[A.team].give/A.gp).toFixed(1)} times a game (#${giveRank(A)} most) and the ${H.N} took it away ${(T[H.team].take/H.gp).toFixed(1)} times a game (#${takeRank(H)}).`;
 parts.push(`${lines.join(' ')} ${xfac}`);

 const hp = sw.projHome, ap = sw.projAway, gap = Math.abs(hp-ap), fav = hp>=ap ? g.home : g.away;
 const closer = {
  wildcard:['One bad quarter and it is over; one big play and a team is suddenly a threat to win it all.','By Sunday night, one fan base will be planning a parade route and another an autopsy.'],
  divisional:['The favorite has everything to lose, the underdog nothing — and that is exactly how upsets are born.','This is where reputations are built or burned.'],
  champ:['A trip to the Super Bowl is a single, ruthless step away.','Somebody is about to have the most memorable afternoon of their season; somebody else will replay it for years.'],
  superbowl:['Legacies, trophies, and a whole offseason of narrative ride on the next three and a half hours.','There is no tomorrow, no next week, and nobody will remember the runner-up.']
 }[rk];
 parts.push(planPreviewParagraph(g));
 parts.push(`${gap<1 ? 'The ratings see a coin flip' : `The ratings lean ${Tn(fav)} by about ${gap.toFixed(1)} points (${Math.max(hp,ap).toFixed(1)}–${Math.min(hp,ap).toFixed(1)})`}, which is the kind of margin January loves to erase. ${pick(closer)}`);
 return parts.map(t=>`<p class="detail-item">${t}</p>`).join('');
}
function generatePreviewHTML(g, mode){ return mode==='playoff' ? playoffPreview(g) : regularPreview(g); }
function starsFaceoffHTML(g){
 const rowsFor = team=>{
  const sm = seasonState.teams[team].slotmap;
  return ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
 };
 const A = rowsFor(g.away), H = rowsFor(g.home);
 const n = Math.max(A.length, H.length);
 const cell = (x, team, side)=>{
  if(!x) return '<div class="zpb-star-cell"></div>';
  const mine = team===seasonUserTeam();
  const st = (typeof zpbRowVars==='function') ? zpbRowVars(team) : '';
  return `<div class="zpb-star-cell ${side} ${x.ovr>=90?'sf90':''}" style="${st}">${x.ovr>=90?'<span class="zpb-sglow">★</span>':''}<span class="${mine?'ub':''}">${x.name}</span><span class="narr">${LABELS[x.slot]||x.slot}</span><b>${x.ovr}</b></div>`;
 };
 const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
 let body = '';
 for(let i=0;i<n;i++) body += `<div class="zpb-star-row">${cell(A[i], g.away, 'zsc-l')}${cell(H[i], g.home, 'zsc-r')}</div>`;
 return `<div class="zpb-stars"><div class="zpb-stars-hd"><div>${lg(g.away)} ${nick(g.away)}</div><div>${nick(g.home)} ${lg(g.home)}</div></div>${body||'<div class="narr" style="padding:10px;">No 85+ starters</div>'}</div>`;
}
function renderPreviewPanel(g, mode){
 if(!g.preview) g.preview = generatePreviewHTML(g, mode);
 if(!g.headline) g.headline = previewHeadline(g, mode);
 return `<div class="panel zpb-glowpanel" style="margin-bottom:14px;"><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">${mode==='playoff'?'Playoff preview':'Game preview'}</div>${zpbPreviewStripHTML(g)}${starsFaceoffHTML(g)}</div>`;
}

// ================= REVIEW FRAGMENTS (v2) =================
function playoffTeamsList(S){ return S.seeds.AFC.concat(S.seeds.NFC).map(x=>x.team); }

// what tends to be common among playoff teams, and how this team differed
function fragPlayoffField(F){
 const S = F.S, po = playoffTeamsList(S), others = F.names.filter(n=>!po.includes(n)), user = F.user, N = F.N;
 const inField = po.includes(user), units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const rows = units.map(u=>{
  const pa = mean_(po.map(t=>S.unitRanks[t][u])), na = mean_(others.map(t=>S.unitRanks[t][u]));
  return {u, pa, na, gap: na-pa, mine: S.unitRanks[user][u], top10: po.filter(t=>S.unitRanks[t][u]<=10).length};
 });
 const common = rows.slice().sort((a,b)=>b.gap-a.gap).slice(0,2);
 const g0 = common[0].gap, c0 = common[0], c1 = common[1];
 const flat = rows.slice().sort((a,b)=>Math.abs(a.gap)-Math.abs(b.gap))[0];
 let s1;
 if(g0>=7) s1 = pick([
  `Across the playoff field, one trait stood out: ${shortUnit(c0.u)}. ${c0.top10} of the ${po.length} playoff teams ranked top-10 there, averaging #${c0.pa.toFixed(0)} against #${c0.na.toFixed(0)} for everyone else.`,
  `If one thing defined the teams that made it, it was ${shortUnit(c0.u)} — ${c0.top10} of ${po.length} playoff teams were top-10 at it, versus an average of #${c0.na.toFixed(0)} for the teams left at home.`
 ]);
 else if(g0>=3.5) s1 = `The separation between the playoff teams and the rest was modest this year. The biggest tilt was ${shortUnit(c0.u)} (${c0.top10} of ${po.length} playoff teams ranked top-10; an average of #${c0.pa.toFixed(0)} against #${c0.na.toFixed(0)}), but with only ${po.length} teams in the field that is a lean, not a rule.`;
 else s1 = `No single unit cleanly separated the playoff teams from everyone else this year; even the biggest tilt, ${shortUnit(c0.u)}, was only #${c0.pa.toFixed(0)} for playoff teams against #${c0.na.toFixed(0)} for the rest.`;
 s1 += ` ${capFirst(shortUnit(c1.u))} was the next-largest difference (#${c1.pa.toFixed(0)} against #${c1.na.toFixed(0)})${Math.abs(flat.gap)<=1.2 ? `, while ${shortUnit(flat.u)} told us nothing — playoff teams ranked the same there as everyone else` : ''}.`;
 const above = rows.filter(r=>r.mine <= r.pa-6).sort((a,b)=>(a.mine-a.pa)-(b.mine-b.pa)).slice(0,2);
 const below = rows.filter(r=>r.mine >= r.pa+6).sort((a,b)=>(b.mine-b.pa)-(a.mine-a.pa)).slice(0,2);
 let s2 = '';
 if(above.length) s2 += `Where the ${N} stood apart from the field: ${joinList(above.map(r=>`${shortUnit(r.u)} (#${r.mine} against a playoff average of #${r.pa.toFixed(0)})`))}. `;
 if(below.length) s2 += `Where they trailed it: ${joinList(below.map(r=>`${shortUnit(r.u)} (#${r.mine} against #${r.pa.toFixed(0)})`))}. `;
 if(!above.length && !below.length) s2 += `The ${N} looked a lot like a typical playoff team across the board, with no group far above or below the field's average. `;
 const T = F.T, diffMe = (T[user].pf-T[user].pa)/F.gp, diffPo = mean_(po.map(t=>(T[t].pf-T[t].pa)/T[t].g));
 const toMe = (T[user].take-T[user].give)/F.gp, toPo = mean_(po.map(t=>(T[t].take-T[t].give)/T[t].g));
 s2 += `On the scoreboard, playoff teams averaged a ${diffPo>=0?'+':'−'}${Math.abs(diffPo).toFixed(1)} point differential and a ${toPo>=0?'+':'−'}${Math.abs(toPo).toFixed(2)} turnover margin per game; the ${N} were at ${diffMe>=0?'+':'−'}${Math.abs(diffMe).toFixed(1)} and ${toMe>=0?'+':'−'}${Math.abs(toMe).toFixed(2)}${inField?'':', which is part of why they were watching from home'}.`;
 return s1 + ' ' + s2;
}
function renderFieldTableHTML(){
 const F = factsBase(), S = F.S, po = playoffTeamsList(S), others = F.names.filter(n=>!po.includes(n));
 const rows = Object.keys(UNIT_INFO).filter(u=>u!=='kicker').map(u=>{
  const pa = mean_(po.map(t=>S.unitRanks[t][u])), na = mean_(others.map(t=>S.unitRanks[t][u])), mine = S.unitRanks[F.user][u];
  const col = mine<=pa-4 ? 'var(--good)' : mine>=pa+6 ? 'var(--bad)' : 'var(--text)';
  return `<tr><td>${UNIT_INFO[u].label}</td><td class="score">#${pa.toFixed(0)}</td><td class="score">#${na.toFixed(0)}</td><td class="score" style="color:${col};font-weight:700;">#${mine}</td></tr>`;
 }).join('');
 return `<details class="panel" style="margin-bottom:14px;"><summary style="cursor:pointer;font-weight:700;">What separated the playoff teams <span class="narr" style="font-weight:400;">(average league rank by unit)</span></summary>
  <p class="narr" style="margin:8px 0;">Lower is better. Green = your unit was clearly better than the playoff average; red = clearly worse.</p>
  <table><thead><tr><th>Unit</th><th>Playoff teams</th><th>Everyone else</th><th>${F.user}</th></tr></thead><tbody>${rows}</tbody></table></details>`;
}

// what the weaknesses actually cost, in points, wins, catches, sacks and QB production
function weaknessDetail(F, u, totPts, gp){
 const S = F.S, user = F.user, T = F.T, t = T[user], lg = S.league, R = S.unitRatings[user], U = S.unitRanks[user];
 const per = -totPts/gp, mine = teamPlayerStats(user);
 const qb = mine.find(r=>r.group==='QB'), rb = mine.filter(r=>r.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0];
 const avgOf = k => mean_(F.names.map(n=>T[n][k]));
 let body = '';
 if(u==='rec'){
  const yds = Math.abs(PASS_BASE*(Math.exp(MC.rec*(R.rec-lg.rec))-1)), qpg = qb ? qb.st.passYds/gp : null;
  Object.values(T).forEach(x=>{ x.cr = x.rec/Math.max(x.tgt,1); });
  const fewer = t.cr >= avgOf('cr');
  body = `Its receivers caught ${t.rec} of ${t.tgt} targets (${(t.cr*100).toFixed(1)}%; a typical team catches ${(avgOf('cr')*100).toFixed(1)}%)${fewer?' — no worse than usual, so the damage came from lack of separation rather than from dropped balls':' — the missed connections cost real drives'}${qb?`, and the model puts the cost to the passing game at about ${yds.toFixed(0)} yards a night: ${qb.name} threw for ${qpg.toFixed(0)} a game when an average group behind him would have been worth closer to ${(qpg+yds).toFixed(0)}`:''}.`;
 } else if(u==='olPass'){
  const yds = Math.abs(PASS_BASE*(Math.exp(MC.olPass*(R.olPass-lg.olPass))-1));
  const fewer = t.skTaken <= avgOf('skTaken');
  body = `The line allowed ${t.skTaken} sacks (a typical team allows ${avgOf('skTaken').toFixed(0)})${fewer?' — the raw total flatters them, because the damage showed up in hurried throws and lost yardage rather than in sacks, and some of that is simply sack luck that tends to even out':''}${qb?`; ${qb.name} was robbed of roughly ${yds.toFixed(0)} passing yards a game by the protection`:''}.`;
 } else if(u==='olRun'){
  const yds = Math.abs(RUSH_BASE*(Math.exp(MC.olRun*(R.olRun-lg.olRun))-1));
  const better = (t.rush/gp) >= (avgOf('rush')/gp);
  body = `The team ran for ${(t.rush/gp).toFixed(0)} yards a game (a typical team runs for ${(avgOf('rush')/gp).toFixed(0)})${better?' — respectable, but only because the backs and game script covered for the blocking':''}${rb?`; ${rb.name} finished with ${fmtN(rb.st.rushYds)} yards, and the blocking alone cost the ground game about ${yds.toFixed(0)} yards a night`:''}.`;
 } else if(u==='rb'){
  const yds = Math.abs(RUSH_BASE*(Math.exp(MC.rb*(R.rb-lg.rb))-1));
  body = `${rb?`${rb.name} and the backs managed ${fmtN(rb.st.rushYds)} rushing yards, about ${yds.toFixed(0)} a game less than an average set of running backs would have produced from the same blocking`:'The running backs could not create on their own'}.`;
 } else if(u==='qb'){
  const yds = Math.abs(PASS_BASE*(Math.exp(MC.qb*(R.qb-lg.qb))-1));
  body = `${qb?`${qb.name} threw ${qb.st.int||0} interceptions against ${qb.st.passTD||0} touchdowns, and the model figures the position cost about ${yds.toFixed(0)} passing yards a game plus extra giveaways`:'Quarterback play capped the offense'}.`;
 } else if(u==='passRush'){
  const more = t.skForced >= avgOf('skForced');
  body = `The defense produced ${t.skForced} sacks (a typical team has ${avgOf('skForced').toFixed(0)})${more?', a number that hides the real problem — pressure that arrived late or not at all':', which let opposing quarterbacks settle in'}; opponents threw for ${(t.passA/gp).toFixed(0)} yards a game.`;
 } else if(u==='frontRun'){
  body = `Opponents ran for ${(t.rushA/gp).toFixed(0)} yards a game against them (a typical defense allows ${(avgOf('rushA')/gp).toFixed(0)}), which kept games on the opponent's terms.`;
 } else if(u==='coverage'){
  body = `The secondary allowed ${(t.passA/gp).toFixed(0)} passing yards a game (typical: ${(avgOf('passA')/gp).toFixed(0)}) and produced only ${t.take} takeaways in total.`;
 } else if(u==='kicker'){
  const k = mine.find(r=>r.group==='K');
  body = `${k?`${k.name} made ${k.st.fg||0} field goals`:'The kicker was unreliable'}, leaving points on the board in tight games.`;
 }
 return `The ${shortUnit(u)} (${R[u].toFixed(1)}, #${U[u]}) cost the ${F.N} roughly ${per.toFixed(1)} points a game. ${body}`;
}
function fragWeaknessCost(F){
 const games = F.S.schedule.filter(g=>g.played && (g.home===F.user||g.away===F.user)), gp = games.length;
 const tot = unitSwingsForTeam(F.user, games);
 const costly = Object.entries(tot).filter(([u,p])=>p/gp<=-0.35).sort((a,b)=>a[1]-b[1]).slice(0,2);
 if(!costly.length){
  const bestEdge = Object.entries(tot).sort((a,b)=>b[1]-a[1])[0];
  return `No single unit cost the ${F.N} more than about a third of a point a game, a rare clean bill of health. The biggest net positive was the ${shortUnit(bestEdge[0])}, worth roughly +${(bestEdge[1]/gp).toFixed(1)} points per game.`;
 }
 const sum = costly.reduce((s,[,p])=>s+p,0);
 const intro = pick(['Every roster has a price tag on its weak spots.','The tape also shows exactly what the holes cost.','The flip side of the strengths is what the weaknesses took back.']);
 return `${intro} ${costly.map(([u,p])=>weaknessDetail(F,u,p,gp)).join(' ')} Added up, ${costly.length>1?'those two holes':'that hole'} cost the ${F.N} about ${Math.abs(sum).toFixed(0)} points over the season — roughly ${(Math.abs(sum)/POINTS_PER_WIN).toFixed(1)} wins.`;
}

// ---------- final-review fragments (playoff-centered, deliberately different from the regular-season review) ----------
function fragFinalVerdict(F){
 const {user, N, me, S} = F, rec = `${me.wins}-${me.losses}${me.ties?'-'+me.ties:''}`, champ = S.champion===user, plog = userPlayoffLog();
 if(champ) return pick([`It ended the way every team in this league hopes to: the ${N} turned a ${rec} regular season into the Super Bowl title, winning ${plog.length} straight elimination games to do it.`, `A ${rec} regular season was only the opening act. The ${N} won ${plog.length} straight playoff games and finished with the trophy.`]);
 if(!plog.length) return S.seeds.AFC.concat(S.seeds.NFC).some(x=>x.team===user)
  ? `A ${rec} season earned the ${N} a first-round bye, but the bracket never handed them a game they could win.`
  : pick([`A ${rec} season was not enough: the ${N} finished outside the field and spent January watching other teams play for the title.`, `The ${N} went ${rec} and missed the playoffs, so the story of their year ends in the standings rather than the bracket.`]);
 const last = plog[plog.length-1], s = scoreFor(last.game, user);
 return last.round==='Super Bowl'
  ? `The ${N} went ${rec} and made it all the way to the Super Bowl, but lost ${s.os}–${s.fs} when it mattered most.`
  : (plog.filter(g=>g.won).length===0
     ? `The ${N} went ${rec} and made the postseason, but it lasted one game: they lost to the ${nick(s.opp)} in the ${last.round}, ${s.os}–${s.fs}.`
     : `The ${N} went ${rec} and won ${numWord(plog.filter(g=>g.won).length)} playoff game${plog.filter(g=>g.won).length===1?'':'s'} before their run ended against the ${nick(s.opp)} in the ${last.round}, ${s.os}–${s.fs}.`);
}

// Varied, specific explanations of the biggest unit swing in a playoff game (never the same sentence twice in one recap).
function unitStar(game, team, unit){
 const side = game.home===team ? 'home' : 'away', pl = game.detail[side].players;
 const top = (grp, f)=> pl.filter(p=>p.group===grp).sort((a,b)=>f(b)-f(a))[0];
 const p = unit==='passRush' ? top('DL', p=>(p.st.sack||0)*3+(p.st.hur||0)*0.3) : unit==='frontRun' ? top('LB', p=>(p.st.tfl||0)*2+(p.st.tkl||0)*0.2)
  : unit==='coverage' ? top('DB', p=>(p.st.dint||0)*3+(p.st.pd||0)) : unit==='qb' ? top('QB', p=>p.st.passYds||0) : unit==='rec' ? pl.filter(q=>q.group==='WR'||q.group==='TE').sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0))[0]
  : unit==='rb' ? top('RB', p=>p.st.rushYds||0) : (unit==='olPass'||unit==='olRun') ? top('OL', p=>(p.st.pk||0)+(p.st.rbk||0)*0.05-(p.st.sa||0)*2) : unit==='kicker' ? top('K', p=>p.st.fg||0) : null;
 return p ? p.name : null;
}
function edgeLine(game, mine, won, user, used){
 const U = shortUnit(mine.unit), pts = Math.abs(mine.pts).toFixed(1), star = unitStar(game, user, mine.unit), opp = nick(game.home===user?game.away:game.home);
 const withStar = star ? ` ${star} was at the center of it.` : '';
 const T = won
  ? (mine.pts>0 ? [
     `The ${U} gave them the clearest advantage (about ${pts} points on paper)${star?', and '+star+' made it count':''}.`,
     `${capFirst(U)} tilted the matchup their way, worth roughly ${pts} points a game over what the ${opp} could match.`,
     `The ${U} did the quiet work that decided it${star?' \u2014 '+star+' in particular':''}.`,
     `On paper the ${U} was the biggest gap between the teams, and the game played out that way.${withStar}`,
     `Their ${U} outplayed the ${opp}'s answer to it, a ${pts}-point swing in the model.${withStar}`,
     `The deciding factor was the ${U}: it won its matchup and everything else could be average.${withStar}`
    ] : [
     `They won in spite of a weak ${U}; the ${opp} had a ${pts}-point edge there that they never cashed in.`,
     `The ${U} was a soft spot the ${opp} could not exploit enough to matter.`,
     `A shaky ${U} nearly cost them, but the rest of the roster covered for it.`])
  : (mine.pts>0 ? [
     `Their best pregame advantage, the ${U}, was not enough to carry them.${withStar}`,
     `The ${U} held up its end (${pts} points of edge on paper) but the other side won enough of the remaining matchups.`,
     `They did what they could with the ${U}${star?' \u2014 '+star+' played well':''} \u2014 it just was not the part of the game that decided it.`,
     `Having the better ${U} did not translate into the win; the margins elsewhere were too large.`]
   : [
     `The ${U} was the weak link the ${opp} went after, a ${pts}-point swing against them.`,
     `The ${opp} attacked the ${U} and it showed.`,
     `A ${U} that could not match up cost them about ${pts} points.`,
     `The ${U} was where the game tilted away from them.`]);
 const k = mine.unit+won, pool = T.map((t,i)=>i).filter(i=>!used.has(k+i));
 const i = (pool.length?pool:T.map((t,j)=>j))[Math.floor(Math.random()*(pool.length||T.length))];
 used.add(k+i);
 return T[i];
}
function fragPlayoffDeep(F){
 const {user, S} = F, plog = userPlayoffLog();
 if(!plog.length){
  const sb = S.playoffRounds.superbowl && S.playoffRounds.superbowl[0];
  if(sb && sb.result){ const w = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away; return `The bracket played out without them. The ${nick(w)} won the Super Bowl, ${Math.max(sb.result.homeScore,sb.result.awayScore)}–${Math.min(sb.result.homeScore,sb.result.awayScore)}.`; }
  return '';
 }
 const usedEdge = new Set();
 const bits = plog.map(g=>{
  const s = scoreFor(g.game, user), mvp = g.game.detail.mvp, sw = gameSwingList(g.game);
  const mine = sw.filter(e=>teamOfSide(g.game,e.ownerSide)===user).sort((a,b)=>Math.abs(b.pts)-Math.abs(a.pts))[0];
  const myTO = s.home ? g.game.result.homeStats.turnovers : g.game.result.awayStats.turnovers, oppTO = s.home ? g.game.result.awayStats.turnovers : g.game.result.homeStats.turnovers;
  let why = '';
  if(Math.abs(myTO-oppTO)>=2) why = myTO>oppTO ? `Turnovers sank them (${myTO} giveaways to ${oppTO}).` : `Turnovers tilted it their way (${oppTO} takeaways to ${myTO} giveaways).`;
  else if(mine) why = edgeLine(g.game, mine, g.won, user, usedEdge);
  const ballFor = mvp.team===user ? `${mvp.name} took the game ball (${mvp.line})` : `${mvp.name} of the ${nick(mvp.team)} took the game ball (${mvp.line})`;
  return `${g.round}: ${g.won?'beat':'lost to'} the ${nick(s.opp)} ${g.won?s.fs:s.os}–${g.won?s.os:s.fs}. ${ballFor}. ${why}`;
 });
 return bits.join(' ');
}
function fragPlayoffVsRegular(F){
 const {user, N, S} = F, pg = userPlayoffLog();
 if(!pg.length) return '';
 const avg = games => { const n = games.length, a = {pts:0, allowed:0, rush:0, pass:0, sacks:0, give:0, take:0}; games.forEach(g=>{ const side = g.home===user?'home':'away', o = side==='home'?'away':'home', r = g.result, me = side==='home'?r.homeStats:r.awayStats, th = side==='home'?r.awayStats:r.homeStats; a.pts += side==='home'?r.homeScore:r.awayScore; a.allowed += side==='home'?r.awayScore:r.homeScore; a.rush += me.rushYards; a.pass += me.passYards; a.sacks += me.sacks; a.give += me.turnovers; a.take += th.turnovers; }); Object.keys(a).forEach(k=>a[k]/=n); return a; };
 const reg = avg(S.schedule.filter(g=>g.played && (g.home===user||g.away===user))), po = avg(pg.map(x=>x.game));
 const d = (a,b,u)=>{ const x = a-b; return `${a.toFixed(1)}${u||''} (${x>=0?'+':'−'}${Math.abs(x).toFixed(1)} vs. the regular season)`; };
 if(pg.length===1) return `In that single playoff game the offense scored ${po.pts.toFixed(0)} points (against ${reg.pts.toFixed(1)} a game in the regular season) and the defense allowed ${po.allowed.toFixed(0)} (against ${reg.allowed.toFixed(1)}). The ground game gained ${po.rush.toFixed(0)} yards (${reg.rush.toFixed(0)} per game before) and the passing game ${po.pass.toFixed(0)} (${reg.pass.toFixed(0)}); they gave the ball away ${po.give.toFixed(0)} time${po.give===1?'':'s'} and took it ${po.take.toFixed(0)}, with ${po.sacks.toFixed(0)} sack${po.sacks===1?'':'s'} allowed.`;
 return pick([
  `January looked different. In the playoffs the offense averaged ${d(po.pts,reg.pts,' points')} and the defense allowed ${d(po.allowed,reg.allowed,'')}; the ground game produced ${po.rush.toFixed(0)} yards a game against ${reg.rush.toFixed(0)} in the regular season, the passing game ${po.pass.toFixed(0)} against ${reg.pass.toFixed(0)}.`,
  `The postseason version of the ${N} scored ${d(po.pts,reg.pts,' points a game')} and allowed ${po.allowed.toFixed(1)} (against ${reg.allowed.toFixed(1)} before). They threw for ${po.pass.toFixed(0)} a night (${reg.pass.toFixed(0)} in the regular season) and ran for ${po.rush.toFixed(0)} (${reg.rush.toFixed(0)}).`
 ]) + ` They took the ball away ${po.take.toFixed(1)} times a game and gave it up ${po.give.toFixed(1)}${po.give>reg.give+0.4?', a drift in the wrong direction':po.give<reg.give-0.4?', a tighter ship than in the regular season':''}, and absorbed ${po.sacks.toFixed(1)} sacks a game.`;
}
function fragSeasonStars(F){
 const mine = teamPlayerStats(F.user);
 const off = mine.filter(r=>['QB','RB','WR','TE'].includes(r.group) && PRIMARY_SLOTS.has(r.slot)).sort((a,b)=>(b._rating||0)-(a._rating||0));
 const def = mine.filter(r=>['DL','LB','DB'].includes(r.group) && PRIMARY_SLOTS.has(r.slot)).sort((a,b)=>(b._rating||0)-(a._rating||0));
 const parts = [];
 if(off[0]) parts.push(`The highest-rated offensive player was ${playerBlurb(off[0])}${off[1]?`, followed by ${playerBlurb(off[1])}`:''}.`);
 if(def[0]) parts.push(`On defense it was ${playerBlurb(def[0])}${def[1]?`, with ${playerBlurb(def[1])} close behind`:''}.`);
 const balls = fragAwards(F); if(balls) parts.push(balls);
 return parts.join(' ');
}
function fragExitCause(F){
 const {user, N, S} = F, plog = userPlayoffLog(), lost = plog.find(g=>!g.won);
 if(lost){
  const gm = lost.game, s = scoreFor(gm, user);
  const sw = gameSwingList(gm).filter(e=>teamOfSide(gm,e.ownerSide)===user && e.pts<0).sort((a,b)=>a.pts-b.pts).slice(0,2);
  const mySacks = s.home ? gm.result.homeStats.sacks : gm.result.awayStats.sacks, myTO = s.home ? gm.result.homeStats.turnovers : gm.result.awayStats.turnovers;
  const units = sw.map(e=>`the ${shortUnit(e.unit)} (#${S.unitRanks[user][e.unit]}, about ${Math.abs(e.pts).toFixed(1)} points of drag)`);
  return `The ${lost.round} loss to the ${nick(s.opp)} had identifiable causes. ${units.length?`The model's two biggest knocks against the ${N} were ${joinList(units)}.`:`The numbers did not show a single glaring mismatch.`} They also took ${mySacks} sack${mySacks===1?'':'s'} and gave it away ${myTO} time${myTO===1?'':'s'}, and ${gm.detail.mvp.team===user?'even with a standout game from '+gm.detail.mvp.name:gm.detail.mvp.name+' ('+gm.detail.mvp.group+') made the difference for the other side'}.`;
 }
 if(S.champion===user){
  const closest = plog.slice().sort((a,b)=>Math.abs(scoreFor(a.game,user).fs-scoreFor(a.game,user).os)-Math.abs(scoreFor(b.game,user).fs-scoreFor(b.game,user).os))[0];
  const s = scoreFor(closest.game, user);
  return `Even champions have close calls. The nearest the ${N} came to losing was the ${closest.round} against the ${nick(s.opp)}, a ${s.fs}–${s.os} game that could have gone either way.`;
 }
 const plain = F.log.filter(g=>Math.abs(g.margin)<=8), lostClose = plain.filter(g=>g.margin<0).length;
 return `What kept the ${N} out of the bracket was not one bad game but a pattern: ${lostClose} of their ${plain.length} one-score games went the wrong way, and the weaknesses detailed in the regular-season review never got fixed.`;
}
function slotsForUnit(u,k){ const spec = RATING_SPECS[u]; return Object.keys(spec).sort((a,b)=>spec[b]-spec[a]).slice(0, k||99); }
function userPicksAt(slots){
 return draftSim.log.filter(p=>p.isUser && slots.includes(p.slot)).map(p=>({name:p.player[0], round:p.round, slot:p.slot, ovr:p.player[3]}));
}

// ---- pick-order critique: replay the draft, and for each of your picks compare it with the best player you could have taken for your open spots ----
function pickCritique(){
 const pool = PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]).slice(), byName = new Map(pool.map(p=>[p[0],p]));
 const open = new Set(ROSTER_SLOTS), out = [], taken = new Set();
 const valueAt = (p, s)=> slotWins(s, effOvr(p,s)) - slotWins(s, WINS_BASE);
 draftSim.log.forEach(l=>{
  if(l.isUser){
   const avail = pool.filter(p=>!taken.has(p[0]));
   let best = null;
   avail.forEach(p=>{ (POS_SLOT_MAP[p[1]]||[]).forEach(s=>{ if(!open.has(s)) return; const v = valueAt(p,s); if(!best || v>best.v+1e-9) best = {p, s, v}; }); });
   const v = valueAt(l.player, l.slot), natBest = best && best.p[0]===l.player[0];
   out.push({overall:l.overall, round:l.round, pickInRound:l.pickInRound, player:l.player, slot:l.slot, v, flex:isOutOfPosition(l.player[1], l.slot), best, regret: best ? Math.max(0,best.v - v) : 0, wasBest: natBest});
   open.delete(l.slot);
  }
  taken.add(l.player[0]);
 });
 return out;
}
function pickCritiqueHTML(inner){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.log) return '';
 const rows = pickCritique(); if(!rows.length) return '';
 const verdict = r=> r.regret<=0.05 ? ['Best available','var(--good)'] : r.regret<0.10 ? ['OK','var(--sub)'] : r.regret<0.50 ? ['Costly Miss','var(--bad)'] : ['Giveaway','var(--bad)'];
 const body = rows.map(r=>{ const [vt,col] = verdict(r);
  return `<tr><td class="narr">R${r.round}.${String(r.pickInRound).padStart(2,'0')}</td><td>${r.player[0]} <span class="narr">${POS_DISPLAY[r.player[1]]||r.player[1]} ${r.player[3]}${r.flex?' (flexed)':''}</span></td><td>${slotName(r.slot)}</td><td class="score">${fmtWar(r.v)}</td><td>${r.best && !r.wasBest ? `${r.best.p[0]} <span class="narr">${POS_DISPLAY[r.best.p[1]]||r.best.p[1]} ${r.best.p[3]} at ${slotName(r.best.s)}, ${fmtWar(r.best.v)}</span>` : '<span class="narr">your pick</span>'}</td><td class="score">${r.regret>0.005?'\u2212'+r.regret.toFixed(2):'0.00'}</td><td style="color:${col};font-weight:600;">${vt}</td></tr>`; }).join('');
 const early = rows.filter(r=>r.round<=3).sort((a,b)=>b.regret-a.regret);
 const misses = rows.slice().sort((a,b)=>b.regret-a.regret).filter(r=>r.regret>0.2).slice(0,3);
 const good = rows.filter(r=>r.wasBest && r.v>=0.5).slice(0,3);
 const lowEarly = rows.filter(r=>r.round<=3 && r.v<0.35);
 const totalLeft = rows.reduce((a,r)=>a+r.regret,0);
 const paras = [];
 paras.push(`Replaying the draft, your ${rows.length} picks left about ${totalLeft.toFixed(1)} wins a season on the board compared with always taking the best-available fit for your open spots (those wins are not all recoverable: a team cannot take everyone). The table shows each pick, what it was worth at the spot he filled (against a 75-rated player), and the best alternative that was still available.`);
 if(good.length) paras.push(`The best calls were ${joinList(good.map(r=>`${r.player[0]} (round ${r.round}, ${fmtWar(r.v)} wins)`))}: the highest-value player available for your open spots at the time.`);
 if(misses.length) paras.push(`The costliest decisions: ${joinList(misses.map(r=>`round ${r.round}, ${r.player[0]} (${slotName(r.slot)}, ${fmtWar(r.v)}) when ${r.best.p[0]} (${slotName(r.best.s)}, ${fmtWar(r.best.v)}) was available`))}. Early picks that are worth little to winning matter most, because those picks are the hardest to replace later.`);
 if(lowEarly.length) paras.push(`Early draft capital went to low-impact spots: ${joinList(lowEarly.map(r=>`${r.player[0]} in round ${r.round} (${slotName(r.slot)}, ${fmtWar(r.v)} wins)`))}. Spots like these contribute far less to winning than the quarterback, edge rushers, cornerbacks and tackles, and their ceiling is low even for an elite player.`);
 if(!misses.length && !lowEarly.length) paras.push(`There were no costly misses: every early pick was close to the best available value. Remaining gains come from the margins (flex choices and the late rounds).`);
 const content = `${paras.map(p=>`<p class="detail-item">${p}</p>`).join('')}
  <div class="tablewrap" style="max-height:520px;"><table><thead><tr><th>Pick</th><th>Player</th><th>Spot filled</th><th title="Wins above a 70-rated player at that spot">Wins</th><th>Best alternative then</th><th title="Wins you gave up versus the best alternative">Left on board</th><th>Verdict</th></tr></thead><tbody>${body}</tbody></table></div>`;
 return inner ? content : `<details class="panel" style="margin-bottom:14px;" open><summary style="cursor:pointer;font-weight:700;">Draft critique: your pick order, pick by pick</summary>${content}</details>`;
}
function fragDraftLessons(F){
 const {user, N, S} = F, U = S.unitRanks[user], R = S.unitRatings[user], lg = S.league;
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const needs = units.map(u=>{ const gap = Math.max(0, lg[u]-R[u]), val = unitValuePerPoint(u); return {u, gap, val, gain: gap*val}; }).sort((a,b)=>b.gain-a.gain);
 const picks = needs.slice(0,2).filter(x=>x.gain>=0.25);
 const sentences = [];
 picks.forEach((x,i)=>{
  const pk = userPicksAt(slotsForUnit(x.u,3)), late = pk.length ? mean_(pk.map(p=>p.round)) : null;
  const who = pk.length ? joinList(pk.map(p=>`${p.name} (round ${p.round})`)) : 'no one in particular';
  sentences.push(`${i===0?'Start with':'Next came'} the ${shortUnit(x.u)}. It graded ${R[x.u].toFixed(1)} (#${U[x.u]}) and was led by ${who}${late!==null && late>=10 ? ' — late-round help for a group that needed real investment' : late!==null && late<=4 ? ' — real draft capital that still did not close the gap' : ''}. Lifting it to the league average of ${lg[x.u].toFixed(1)} would have been worth about +${x.gain.toFixed(1)} points a game, roughly ${(x.gain*17/POINTS_PER_WIN).toFixed(1)} extra wins.`);
 });
 if(!sentences.length) sentences.push(`The draft held up well: no unit was far enough below the league average to point to a clear mistake, so the improvement here is about polish rather than a different strategy.`);
 return sentences.join(' ');
}
function fragPriorities(F){
 const {user, N, S} = F, U = S.unitRanks[user], R = S.unitRatings[user], lg = S.league;
 const units = Object.keys(UNIT_INFO).filter(u=>u!=='kicker');
 const rows = units.map(u=>({u, v:unitValuePerPoint(u), gap:lg[u]-R[u]})).sort((a,b)=>b.v-a.v);
 const top3 = rows.slice(0,3);
 const flex = flexReport(user);
 return `For next time, the model puts the most value on each rating point at ${joinList(top3.map(r=>`the ${shortUnit(r.u)} (+${r.v.toFixed(2)} points a game per point)`))}, and the least on the kicker and the running backs. The best shopping list is the intersection of high-value units and your own gaps: ${joinList(units.map(u=>({u, s:Math.max(0,lg[u]-R[u])*unitValuePerPoint(u)})).sort((a,b)=>b.s-a.s).slice(0,3).map(x=>`${shortUnit(x.u)} (${x.s.toFixed(1)} points a game on the table)`))}. ${flex.list.length ? `Also stop flexing: ${flex.list.length} starter${flex.list.length===1?'':'s'} played out of position, a ${flex.total}-point rating tax on the lineup.` : 'The lineup was naturally positioned, so there is no flex tax to remove.'} Start a new draft to run it back.`;
}

function generateRegularSeasonRecap(){
 const S0 = seasonState; if(S0 && S0.cacheRecap && S0.cacheRecapKey===S0.schedule.filter(g=>g.played).length) return S0.cacheRecap;
 const out0 = generateRegularSeasonRecapRaw(); if(S0){ S0.cacheRecap = out0; S0.cacheRecapKey = S0.schedule.filter(g=>g.played).length; } return out0;
}
function generateRegularSeasonRecapRaw(){
 const F = factsBase();
 return [fragArc(F), fragMoments(F), fragOffense(F), fragDefense(F), fragPlayoffField(F), fragWeaknessCost(F), fragOutlook(F,false)]
  .map(t=>`<p class="detail-item">${t}</p>`).join('') + whyBoxHTML(F);
}
function generateSeasonReview(){
 const S0 = seasonState; if(S0 && S0.cacheReview) return S0.cacheReview;
 const out0 = generateSeasonReviewRaw(); if(S0 && S0.phase==='complete') S0.cacheReview = out0; return out0;
}
function generateSeasonReviewRaw(){
 const F = factsBase();
 return [fragFinalVerdict(F), fragPlayoffDeep(F), fragPlayoffVsRegular(F), fragSeasonStars(F), fragExitCause(F), fragDraftLessons(F), fragPriorities(F)]
  .filter(Boolean).map(t=>`<p class="detail-item">${t}</p>`).join('');
}


function renderReportCardHTML(){
 const F = factsBase(), U = F.S.unitRanks[F.user], R = F.S.unitRatings[F.user], T = F.T, t = T[F.user], g = F.gp;
 const mine = teamPlayerStats(F.user);
 const rb = mine.filter(r=>r.group==='RB').sort((a,b)=>(b.st.rushYds||0)-(a.st.rushYds||0))[0];
 const rec = mine.filter(r=>r.group==='WR'||r.group==='TE').sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0))[0];
 const k = mine.find(r=>r.group==='K');
 const results = {
  olRun: `${(t.rush/g).toFixed(0)} rush yds/gm (#${rankIn(T,'rush',F.user,false)})`,
  olPass: `${t.skTaken} sacks allowed (#${rankIn(T,'skTaken',F.user,true)} fewest)`,
  rb: rb ? `${rb.name}: ${fmtN(rb.st.rushYds)} rush yds, ${rb.st.rushTD||0} TD` : '—',
  qb: `${(t.pass/g).toFixed(0)} pass yds/gm (#${rankIn(T,'pass',F.user,false)})`,
  rec: rec ? `${rec.name}: ${fmtN(rec.st.recYds)} rec yds, ${rec.st.recTD||0} TD` : '—',
  passRush: `${t.skForced} sacks (#${rankIn(T,'skForced',F.user,false)})`,
  frontRun: `${(t.rushA/g).toFixed(0)} rush yds allowed/gm (#${rankIn(T,'rushA',F.user,true)} fewest)`,
  coverage: `${(t.passA/g).toFixed(0)} pass yds allowed/gm (#${rankIn(T,'passA',F.user,true)}), ${t.take} takeaways`,
  kicker: k ? `${k.name}: ${k.st.fg||0} FG` : '—'
 };
 const rows = Object.keys(UNIT_INFO).map(u=>{
  const pct = ((32-U[u])/31)*100, lg = letterGrade(pct);
  const col = U[u]<=8 ? 'var(--good)' : U[u]>=25 ? 'var(--bad)' : 'var(--text)';
  return `<tr><td>${UNIT_INFO[u].label}</td><td class="score">${R[u].toFixed(1)}</td><td class="score" style="color:${col};">#${U[u]}</td><td class="score" style="color:${col};font-weight:800;">${lg}</td><td class="narr">${results[u]}</td></tr>`;
 }).join('');
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Unit Report Card — ${F.user}</h4>
  <table><thead><tr><th>Unit</th><th>Grade</th><th>League rank</th><th>Letter</th><th>What it produced</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
// ================= AWARDS & HONORS =================
// Regular-season honors (MVP, OPOY, DPOY, Coach of the Year, statistical titles, All-Pro, Pro Bowl) are struck when the regular season ends;
// playoff honors (Super Bowl MVP, round MVPs, all-playoff team, playoff leaders) after the Super Bowl.
// The dataset has no age, draft-year or coaching data, so rookie, comeback and individual-coach awards cannot be given; the
// Coach of the Year goes to the team that most outperformed its own projections.
const SLOT_POS = {DE1:'EDGE',DE2:'EDGE',DT1:'DT',DT2:'DT',MIKE:'LB',WILL:'LB',SAM:'LB',CB1:'CB',CB2:'CB',CB3:'CB',SS:'S',FS:'S',QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',K:'K',FB:'RB',P:'K'};
const HONOR_COUNTS = { // [All-Pro 1st, All-Pro 2nd, Pro Bowl per conference]
 QB:[1,1,3], RB:[2,1,3], WR:[2,2,4], TE:[1,1,3], OT:[2,2,3], OG:[2,2,3], C:[1,1,2], EDGE:[2,2,4], DT:[2,2,3], LB:[3,2,4], CB:[2,2,3], S:[2,1,3], K:[1,1,1], RET:[1,1,1]
};
const HONOR_ORDER = ['QB','RB','WR','TE','OT','OG','C','EDGE','DT','LB','CB','S','K','RET'];
function wins17(){ const st = computeStandings(seasonState.schedule, teamNames()); const m = {}; Object.keys(st).forEach(t=>m[t]=st[t].wins+0.5*st[t].ties); return m; }
function expectedWinsMap(){
 const m = {}; teamNames().forEach(t=>m[t]=0);
 seasonState.schedule.forEach(g=>{ if(!g.played) return; const ph = normCdf((g.result.proj.home-g.result.proj.away)/10.5); m[g.home]+=ph; m[g.away]+=1-ph; });
 return m;
}
function honorCandidates(){
 const S = seasonState, W = wins17(); ensureRatings();
 const cands = [];
 Object.values(S.playerStats).forEach(r=>{
  const pos = SLOT_POS[r.slot]; if(!pos || r.gp<8 || r.group==='OL') return;   // linemen are judged below by rating and line performance, not by stat rows
  cands.push({name:r.name, team:r.team, pos, group:r.group, rec:r, score:(r._rating||0)+0.5*(W[r.team]-8.5), line:seasonStatLine(r.group, r.st)});
 });
 Object.values(S.playerStats).forEach(r=>{
  const n = (r.st.krN||0)+(r.st.prN||0); if(r.gp<8 || n<15) return;
  cands.push({name:r.name, team:r.team, pos:'RET', group:'RET', rec:null, score:50+((r.st.retYds||0)/n-11)*4+0.2*(W[r.team]-8.5), line:`${fmtN(r.st.retYds)} return yards on ${n} returns (${((r.st.retYds||0)/n).toFixed(1)} a return)`});
 });
 teamNames().forEach(t=>{
  const sm = S.teams[t].slotmap;
  [['OT1','OT'],['OT2','OT'],['OG1','OG'],['OG2','OG'],['C','C']].forEach(([slot,pos])=>{
   const e = effEntry(sm, slot); if(!e) return;
   cands.push({name:e.name, team:t, pos, group:'OL', rec:null, score:50+(e.ovr-80)*3.2+0.5*(W[t]-8.5)-0.8*Math.max(0,S.unitRanks[t].olPass-16)/16*4, line:`${e.ovr} OVR · line ranked #${S.unitRanks[t].olPass} in pass protection, #${S.unitRanks[t].olRun} in run blocking`});
  });
 });
 return cands;
}
function computeRegularSeasonAwards(){
 const S = seasonState, W = wins17(), EW = expectedWinsMap(), cands = honorCandidates(), conf = conferenceOfTeam;
 const rate = c => c.rec ? c.rec._rating : null;
 const best = (arr, f)=> arr.slice().sort((a,b)=>f(b)-f(a))[0];
 const out = {individual:[], stat:[], allPro:{first:{},second:{}}, proBowl:{AFC:{},NFC:{}}};
 const off = cands.filter(c=>['QB','RB','WR','TE'].includes(c.pos)), def = cands.filter(c=>['EDGE','DT','LB','CB','S'].includes(c.pos));
 const poTeams = S.seeds ? S.seeds.AFC.concat(S.seeds.NFC).map(x=>x.team) : [];
 const mvpPool = off.filter(c=>poTeams.includes(c.team)); 
 const mvp = best(mvpPool.length?mvpPool:off, c=> (rate(c)-50)/17 + 0.12*(W[c.team]-9) + (c.pos==='QB'?1.2:0));
 const opoy = best(off.filter(c=>c.pos!=='QB'), c=> (rate(c)-50)/17 + 0.05*(W[c.team]-9));
 const dpoy = best(def, c=> (rate(c)-50)/17 + 0.05*(W[c.team]-9));
 const qbs = off.filter(c=>c.pos==='QB').sort((a,b)=>rate(b)-rate(a));
 const coach = teamNames().slice().sort((a,b)=>(W[b]-EW[b])-(W[a]-EW[a]))[0];
 const rank = (c, arr)=> arr.length ? arr.filter(x=>rate(x)>rate(c)).length+1 : 0;
 const mvpWhy = c => pick([`${rate(c).toFixed(1)}-rated ${c.pos} on a ${W[c.team]}-win team`, `the league's top-rated ${c.pos} profile, carrying ${c.team} to ${W[c.team]} wins`, `${c.pos} production (${rate(c).toFixed(1)} rating) and ${W[c.team]} wins`]);
 out.individual.push({title:'Most Valuable Player', c:mvp, why:mvpWhy(mvp)});
 out.individual.push({title:'Offensive Player of the Year', c:opoy, why:`the top non-quarterback on offense, rated ${rate(opoy).toFixed(1)}`});
 out.individual.push({title:'Defensive Player of the Year', c:dpoy, why:`rated ${rate(dpoy).toFixed(1)} among the league's defenders (${dpoy.pos})`});
 const cw = W[coach], ce = EW[coach];
 out.individual.push({title:'Coach of the Year', team:coach, coach:headCoach(coach), why:`${headCoach(coach)} led them to ${cw} wins against ${ce.toFixed(1)} projected from the roster's own ratings (+${(cw-ce).toFixed(1)})`});
 // statistical titles
 const rows = Object.values(S.playerStats);
 const lead = (group, key, label, fmt)=>{ const r = rows.filter(x=>x.group===group && x.gp>=8).sort((a,b)=>(b.st[key]||0)-(a.st[key]||0))[0]; if(r) out.stat.push({title:label, name:r.name, team:r.team, line:fmt(r)}); };
 lead('QB','passYds','Passing Yards', r=>`${fmtN(r.st.passYds)} yds, ${r.st.passTD||0} TD, ${r.st.int||0} INT`);
 lead('RB','rushYds','Rushing Yards', r=>`${fmtN(r.st.rushYds)} yds on ${fmtN(r.st.car)} carries, ${r.st.rushTD||0} TD`);
 const recLead = rows.filter(x=>(x.group==='WR'||x.group==='TE') && x.gp>=8).sort((a,b)=>(b.st.recYds||0)-(a.st.recYds||0))[0];
 if(recLead) out.stat.push({title:'Receiving Yards', name:recLead.name, team:recLead.team, line:`${fmtN(recLead.st.rec)}/${fmtN(recLead.st.tgt)} rec, ${fmtN(recLead.st.recYds)} yds, ${recLead.st.recTD||0} TD`});
 const recs = rows.filter(x=>(x.group==='WR'||x.group==='TE') && x.gp>=8).sort((a,b)=>(b.st.rec||0)-(a.st.rec||0))[0];
 if(recs && recs!==recLead) out.stat.push({title:'Receptions', name:recs.name, team:recs.team, line:`${fmtN(recs.st.rec)}/${fmtN(recs.st.tgt)} rec, ${fmtN(recs.st.recYds)} yds`});
 const tdLead = rows.filter(x=>x.gp>=8 && ['RB','WR','TE','QB'].includes(x.group)).sort((a,b)=>((b.st.rushTD||0)+(b.st.recTD||0))-((a.st.rushTD||0)+(a.st.recTD||0)))[0];
 if(tdLead) out.stat.push({title:'Scrimmage Touchdowns', name:tdLead.name, team:tdLead.team, line:`${(tdLead.st.rushTD||0)+(tdLead.st.recTD||0)} TD (${tdLead.st.rushTD||0} rushing, ${tdLead.st.recTD||0} receiving)`});
 { const r = rows.filter(x=>(x.group==='DL'||x.group==='LB') && x.gp>=8).sort((a,b)=>(b.st.sack||0)-(a.st.sack||0))[0]; if(r) out.stat.push({title:'Sacks', name:r.name, team:r.team, line:`${r.st.sack||0} sacks, ${r.st.tkl||0} tkl`}); }
 const intLead = rows.filter(x=>x.gp>=8 && ['LB','DB'].includes(x.group)).sort((a,b)=>(b.st.dint||0)-(a.st.dint||0))[0];
 if(intLead) out.stat.push({title:'Interceptions', name:intLead.name, team:intLead.team, line:`${intLead.st.dint||0} INT, ${intLead.st.tkl||0} tkl`});
 const tkl = rows.filter(x=>x.gp>=8 && ['LB','DB','DL'].includes(x.group)).sort((a,b)=>(b.st.tkl||0)-(a.st.tkl||0))[0];
 if(tkl) out.stat.push({title:'Tackles', name:tkl.name, team:tkl.team, line:`${tkl.st.tkl||0} tackles`});
 lead('K','fg','Field Goals', r=>`${r.st.fg||0} FG`);
 const retLead = rows.filter(x=>x.gp>=8 && (x.st.krN||0)+(x.st.prN||0)>=15).sort((a,b)=>(b.st.retYds||0)-(a.st.retYds||0))[0];
 if(retLead) out.stat.push({title:'Return Yards', name:retLead.name, team:retLead.team, line:`${fmtN(retLead.st.retYds)} return yards on ${(retLead.st.krN||0)+(retLead.st.prN||0)} returns`});
 // All-Pro / Pro Bowl
 HONOR_ORDER.forEach(pos=>{
  const [n1,n2,npb] = HONOR_COUNTS[pos], list = cands.filter(c=>c.pos===pos).sort((a,b)=>b.score-a.score);
  out.allPro.first[pos] = list.slice(0,n1); out.allPro.second[pos] = list.slice(n1,n1+n2);
  ['AFC','NFC'].forEach(cf=>{ out.proBowl[cf][pos] = list.filter(c=>conf(c.team)===cf).slice(0,npb); });
 });
 out.mvpName = mvp.name;
 // user honors
 const user = seasonUserTeam(), mine = [];
 out.individual.forEach(a=>{ if((a.c && a.c.team===user) ) mine.push(`${a.c.name} — ${a.title}`); if(a.team===user) mine.push(`${user} coaching staff — ${a.title}`); });
 out.stat.forEach(a=>{ if(a.team===user) mine.push(`${a.name} — ${a.title} leader`); });
 let ap1=0, ap2=0, pb=0;
 HONOR_ORDER.forEach(pos=>{ ap1 += out.allPro.first[pos].filter(c=>c.team===user).length; ap2 += out.allPro.second[pos].filter(c=>c.team===user).length; pb += out.proBowl[conf(user)][pos].filter(c=>c.team===user).length; });
 out.userSummary = {mine, ap1, ap2, pb};
 return out;
}
function computePlayoffAwards(){
 const S = seasonState, book = Object.values(S.playerStatsPO), out = {rounds:[], leaders:[], team:[], sbMvp:null, mvp:null};
 const sb = S.playoffRounds.superbowl[0];
 if(sb && sb.detail) out.sbMvp = {...sb.detail.mvp, game:sb};
 [['champ','Conference Championship MVPs'],['divisional','Divisional Round Game Balls'],['wildcard','Wild Card Game Balls']].forEach(([rk,label])=>{
  const games = (S.playoffRounds[rk]||[]).filter(g=>g.detail);
  if(games.length) out.rounds.push({label, items:games.map(g=>({g, p:g.detail.mvp}))});
 });
 const lead = (groups, key, label, fmt)=>{ const r = book.filter(x=>groups.includes(x.group)).sort((a,b)=>(b.st[key]||0)-(a.st[key]||0))[0]; if(r && (r.st[key]||0)>0) out.leaders.push({title:label, name:r.name, team:r.team, line:fmt(r)}); };
 lead(['QB'],'passYds','Postseason Passing Yards', r=>`${fmtN(r.st.passYds)} yds, ${r.st.passTD||0} TD, ${r.st.int||0} INT in ${r.gp} games`);
 lead(['RB'],'rushYds','Postseason Rushing Yards', r=>`${fmtN(r.st.rushYds)} yds, ${r.st.rushTD||0} TD in ${r.gp} games`);
 lead(['WR','TE'],'recYds','Postseason Receiving Yards', r=>`${r.st.rec||0}/${r.st.tgt||0} rec, ${fmtN(r.st.recYds)} yds, ${r.st.recTD||0} TD`);
 lead(['DL'],'sack','Postseason Sacks', r=>`${r.st.sack||0} sacks in ${r.gp} games`);
 lead(['LB','DB'],'dint','Postseason Interceptions', r=>`${r.st.dint||0} INT in ${r.gp} games`);
 // all-playoff team by cumulative game impact
 const spec = [['QB','QB',1],['RB','RB',1],['WR','WR',2],['TE','TE',1],['DL','DL',3],['LB','LB',2],['DB','DB',3],['K','K',1]];
 spec.forEach(([label,group,n])=>{
  book.filter(x=>x.group===group).sort((a,b)=>(b.zSum||0)-(a.zSum||0)).slice(0,n).forEach(r=>out.team.push({pos:label, name:r.name, team:r.team, line:seasonStatLine(r.group, r.st)+` (${r.gp} G)`}));
 });
 // the postseason MVP comes from a Super Bowl team: the champion's best player, unless the runner-up's was clearly better
 let pool = book; { const sbg = (seasonState.playoffRounds.superbowl||[])[0]; if(sbg && sbg.result){ const champ = sbg.result.homeScore>sbg.result.awayScore ? sbg.home : sbg.away, ru = champ===sbg.home ? sbg.away : sbg.home; const best = t=>book.filter(x=>x.team===t).sort((a,b)=>(b.zSum||0)-(a.zSum||0))[0]; const c = best(champ), r = best(ru); pool = (r && c && (r.zSum||0) > 1.3*(c.zSum||0)) ? [r] : (c ? [c] : book); } }
 const top = pool.slice().sort((a,b)=>(b.zSum||0)-(a.zSum||0))[0];
 if(top) out.mvp = {name:top.name, team:top.team, line:seasonStatLine(top.group, top.st)+` (${top.gp} G)`};
 return out;
}
function honorLineHTML(c, user, shm){
 const pk = (shm && typeof zpbPackFor==='function') ? zpbPackFor(c.team) : null;
 const attr = shm && pk ? ` class="zpb-shm" style="--zrb:${pk.accL};"` : (c.team===user?' style="color:var(--accent);font-weight:700;"':'');
 return `<span${attr}>${c.name}</span> <span class="narr">${nick(c.team)}</span>`; // w19: first-team All-Pro always shimmers
}
function renderRegularAwardsHTML(A, open){
 const user = seasonUserTeam();
 const ind = A.individual.map(a=> a.c
  ? `<tr><td>${a.title==='Most Valuable Player'?'<div class="zpb-mvptitle zpb-shm">Most<br>Valuable<br>Player</div>':a.title}</td><td>${honorLineHTML(a.c,user)} <span class="narr">${a.c.pos}</span><div class="zpb-schiprow" style="margin-top:5px;">${a.c.rec?zpbStatChipsHTML(a.c.rec):''}</div><div class="narr">${a.why}</div></td></tr>`
  : `<tr><td>${a.title}</td><td><span${a.team===user?' style="color:var(--accent);font-weight:700;"':''}>${a.coach?a.coach+' \u00b7 ':''}${a.team}</span><div class="narr">${a.why}</div></td></tr>`).join('');
 const stat = A.stat.map(a=>`<tr><td>${a.title}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');
 const teamBox = (tm)=> HONOR_ORDER.map(pos=>`<tr><td class="narr">${pos}</td><td>${tm[pos].map(c=>honorLineHTML(c,user)).join(', ')||'—'}</td></tr>`).join('');
 const pbBox = (cf)=> HONOR_ORDER.map(pos=>`<tr><td class="narr">${pos}</td><td>${A.proBowl[cf][pos].map(c=>honorLineHTML(c,user)).join(', ')||'—'}</td></tr>`).join('');
 const us = A.userSummary, usTxt = us.mine.length||us.ap1||us.ap2||us.pb ? `${user}: ${us.ap1} First-Team All-Pro, ${us.ap2} Second-Team All-Pro, ${us.pb} Pro Bowl selection${us.pb===1?'':'s'}${us.mine.length?` — ${us.mine.join('; ')}`:''}.` : `No ${user} players earned league-wide honors this year.`;
 return `<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">Regular-Season Awards &amp; Honors</summary>
  <p class="narr" style="margin:8px 0;">${usTxt}</p>
  <table><tbody>${ind}</tbody></table>
  <h5 class="narr" style="margin:14px 0 4px;">Statistical champions</h5><table><tbody>${stat}</tbody></table>
  <div class="draft-columns" style="grid-template-columns:1fr 1fr;margin-top:14px;gap:14px;">
   <div><h5 class="narr" style="margin:0 0 4px;">First-Team All-Pro</h5><table><tbody>${teamBox(A.allPro.first)}</tbody></table></div>
   <div><h5 class="narr" style="margin:0 0 4px;">Second-Team All-Pro</h5><table><tbody>${teamBox(A.allPro.second)}</tbody></table></div>
   <div><h5 class="narr" style="margin:0 0 4px;">Pro Bowl — AFC</h5><table><tbody>${pbBox('AFC')}</tbody></table></div>
   <div><h5 class="narr" style="margin:0 0 4px;">Pro Bowl — NFC</h5><table><tbody>${pbBox('NFC')}</tbody></table></div>
  </div>
  </details>`;
}
function renderPlayoffAwardsHTML(P){
 const user = seasonUserTeam();
 const gb = (p, g)=> `<tr><td class="narr">${g.roundLabel||''}</td><td>${honorLineHTML(p,user)} <span class="narr">${p.group} · ${p.line}</span><div class="narr">${g.away} ${g.result.awayScore}, ${g.home} ${g.result.homeScore}</div></td></tr>`;
 const sb = P.sbMvp ? `<tr><td><b>Super Bowl MVP</b></td><td>${honorLineHTML(P.sbMvp,user)} <span class="narr">${P.sbMvp.group} · ${P.sbMvp.line}</span><div class="narr">${P.sbMvp.game.away} ${P.sbMvp.game.result.awayScore}, ${P.sbMvp.game.home} ${P.sbMvp.game.result.homeScore}</div></td></tr>` : '';
 const mvp = P.mvp ? `<tr><td><b>Postseason MVP</b> <span class="narr">(cumulative impact)</span></td><td>${honorLineHTML(P.mvp,user)} <span class="narr">${P.mvp.line}</span></td></tr>` : '';
 const rounds = P.rounds.map(r=>`<h5 class="narr" style="margin:14px 0 4px;">${r.label}</h5><table><tbody>${r.items.map(i=>gb(i.p, i.g)).join('')}</tbody></table>`).join('');
 const lead = P.leaders.map(a=>`<tr><td>${a.title}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');
 const team = P.team.map(a=>`<tr><td class="narr">${a.pos}</td><td>${honorLineHTML(a,user)} <span class="narr">${a.line}</span></td></tr>`).join('');
 return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Playoff Awards</h3><table><tbody>${sb}${mvp}</tbody></table>${rounds}
  <h5 class="narr" style="margin:14px 0 4px;">Postseason statistical leaders</h5><table><tbody>${lead}</tbody></table>
  <h5 class="narr" style="margin:14px 0 4px;">All-Playoff Team <span style="font-weight:400;">(by cumulative game impact)</span></h5><table><tbody>${team}</tbody></table></div>`;
}

function renderSeasonCompleteView(container){
 const user = seasonUserTeam();
 const champ = seasonState.champion;
 const sb = seasonState.playoffRounds.superbowl[0];
 const won = champ===user;
 let html = `<div class="champion-banner"><h2>🏆 ${champ} — Super Bowl Champions</h2>
  <p>${won ? `${user} won it all — a championship from draft day to the final whistle.` : `${user} did not bring home the Lombardi Trophy this year.`}</p></div>`;
 html += renderGameResultHTML(sb, (sb.home===user||sb.away===user) ? user : null);
 if(!seasonState.showReview){
  html += renderBracketHTML() + `<div class="panel" style="margin-bottom:14px;text-align:center;"><button class="resetbtn" id="seasonReviewBtn" style="width:auto;margin:0;padding:12px 28px;">Season Review →</button><div class="narr" style="margin-top:6px;">Awards, stats, your report card and how the season was decided.</div></div>`;
  container.innerHTML = html; wireScheduleClicks(container); wireStatsTabs();
  document.getElementById('seasonReviewBtn').addEventListener('click', ()=>{ seasonState.showReview = true; renderSeasonTab(container); window.scrollTo(0,0); });
  return;
 }
 html = `<div class="panel" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">Season Review</h2><span style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:8px 18px;">Try again to go <b class="zpb-shine">20-0</b>?</button><button class="tabbtn" id="backToSbBtn" style="width:auto;margin:0;padding:8px 18px;">← Super Bowl</button></span></div>`;
 html += `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">${user}</h3>${zpbMetricsHTML()}</div>`;
 html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + renderReportCardHTML() + pickCritiqueHTML() + renderFieldTableHTML() + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + renderBracketHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML();
 container.innerHTML = html;
 { const b = document.getElementById('backToSbBtn'); if(b) b.addEventListener('click', ()=>{ seasonState.showReview = false; renderSeasonTab(container); window.scrollTo(0,0); }); }
 wireScheduleClicks(container); wireStatsTabs(); wireSeasonOptions(container);
}

// ================= 100-SEASON SIMULATION =================
// Replays the season 100 times with the same drafted rosters (no re-draft, no multi-year mode) and reports what the model says
// about the league, your team and the game-plan system. Nothing here touches your current season.
let league100 = null;
function newAgg(names, user){
 const t = {}; names.forEach(n=>{ t[n] = {w:[], pf:0, pa:0, g:0, po:0, div:0, bye:0, sbApp:0, champ:0, reach:[0,0,0,0,0,0], seedCnt:{}, wcount:{}}; });
 return {seasons:0, teams:t, user, leagueRows:[], plan:{}, def:{}, script:{}, leaders:{pass:[],rush:[],rec:[],recvYds:[],sack:[],int:[],td:[],tfl:[],pd:[]}, thresholds:{p5000:0,p4500:0,r2000:0,r1800:0,rec1700:0,rec1500:0,s20:0,s17:0,i10:0,td20:0},
  mvpPos:{}, mvpNames:{}, userHon:{ap1:0,ap2:0,pb:0,mvp:0,opoy:0,dpoy:0,coach:0}, sbMvpPos:{}, userPl:{}, totals:{g:0,pts:0,yds:0,to:0,sacks:0,homeW:0,ties:0,margin:0,rushAtt:0,passAtt:0,rushYds:0,passYds:0,close:0,blow:0,ot:0}};
}
function liteSeason(L, agg){
 const names = Object.keys(L.teams), user = agg.user;
 L.schedule = buildFullSchedule(names); L.playerStats = {}; L.playerStatsPO = {}; L.phase = 'regular'; L.ratingsDirty = true; L._ratingsReady = false;
 L.schedule.forEach(g=>playGame(g, false));
 const st = computeStandings(L.schedule, names);
 L.seeds = computeSeeding(st, L.schedule);
 const awards = computeRegularSeasonAwards();
 // playoffs
 L.phase = 'playoffs'; L.playoffRounds = {wildcard: buildWildCardRound(L.seeds)};
 const order = ['wildcard','divisional','champ','superbowl'], reach = {};
 L.seeds.AFC.concat(L.seeds.NFC).forEach(x=>{ reach[x.team] = 0; });
 for(const rk of order){
  const games = L.playoffRounds[rk];
  games.forEach(g=>{ g.roundLabel = ROUND_LABELS[rk]; playGame(g, true); const hw = g.result.homeScore>g.result.awayScore; const w = hw?g.home:g.away, l = hw?g.away:g.home; reach[w] = Math.max(reach[w], order.indexOf(rk)+1); reach[l] = Math.max(reach[l], order.indexOf(rk)); });
  if(rk==='wildcard') L.playoffRounds.divisional = buildDivisionalRound(L.seeds, games);
  else if(rk==='divisional') L.playoffRounds.champ = buildConfChampRound(games);
  else if(rk==='champ') L.playoffRounds.superbowl = buildSuperBowl(games);
  else { const sb = games[0]; L.champion = sb.result.homeScore>sb.result.awayScore ? sb.home : sb.away; }
 }
 L.phase = 'complete';
 // ---- aggregate ----
 agg.seasons++;
 const seedOf = {}; ['AFC','NFC'].forEach(c=>L.seeds[c].forEach(x=>{ seedOf[x.team] = x.seed; }));
 names.forEach(n=>{
  const t = agg.teams[n], s = st[n]; t.w.push(s.wins + 0.5*s.ties); t.pf += s.pf; t.pa += s.pa; t.g += s.wins+s.losses+s.ties;
  if(seedOf[n]){ t.po++; if(seedOf[n]<=4) t.div++; if(seedOf[n]===1) t.bye++; t.seedCnt[seedOf[n]] = (t.seedCnt[seedOf[n]]||0)+1; }
  const r = reach[n]===undefined ? 0 : reach[n] + 1;   // 0 missed; 1 lost WC; 2 lost div; 3 lost champ; 4 lost SB; 5 champion
  const lvl = reach[n]===undefined ? 0 : (n===L.champion ? 5 : reach[n]+1);
  t.reach[lvl]++;
  if(lvl>=4) t.sbApp++; if(n===L.champion) t.champ++;
 });
 // totals & game-level
 L.schedule.forEach(g=>{
  const r = g.result, tt = agg.totals; tt.g++; tt.pts += r.homeScore + r.awayScore; tt.yds += r.homeStats.totalYards + r.awayStats.totalYards;
  tt.to += r.homeStats.turnovers + r.awayStats.turnovers; tt.sacks += r.homeStats.sacks + r.awayStats.sacks;
  if(r.homeScore>r.awayScore) tt.homeW++; if(r.homeScore===r.awayScore) tt.ties++;
  const mg = Math.abs(r.homeScore-r.awayScore); tt.margin += mg; if(mg<=3) tt.close++; if(mg>=21) tt.blow++;
  tt.rushYds += r.homeStats.rushYards + r.awayStats.rushYards; tt.passYds += r.homeStats.passYards + r.awayStats.passYards;
  ['home','away'].forEach(side=>{
   const po = g.plans[side].off, pd = g.plans[side].def, mine = side==='home' ? r.homeScore : r.awayScore, theirs = side==='home' ? r.awayScore : r.homeScore, win = mine>theirs ? 1 : mine===theirs ? 0.5 : 0;
   const k = po.pers+'|'+po.strat, e = agg.plan[k] || (agg.plan[k] = {n:0,w:0,pts:0,to:0,rush:0,pass:0,sk:0,fxP:0,fxT:0});
   e.fxP += r.planFx[side].pts; e.fxT += r.planFx[side].to;
   const stt = side==='home' ? r.homeStats : r.awayStats; e.n++; e.w += win; e.pts += mine; e.to += stt.turnovers; e.rush += stt.rushYards; e.pass += stt.passYards; e.sk += stt.sacks;
   const dk = pd.pkg+'|'+pd.focus, d = agg.def[dk] || (agg.def[dk] = {n:0,w:0,pa:0,sk:0,to:0}); d.n++; d.w += win; d.pa += theirs; d.sk += (side==='home'?r.awayStats:r.homeStats).sacks; d.to += (side==='home'?r.awayStats:r.homeStats).turnovers;
   tt.rushAtt += g.detail[side].plays.rush; tt.passAtt += g.detail[side].plays.pass;
  });
  if(r.script && r.script.trailFrom){ const tr = r.script.trail, won = (tr==='home') ? r.homeScore>r.awayScore : r.awayScore>r.homeScore; const kk = STRAT[r.script.trailFrom.strat].label; const e = agg.script[kk] || (agg.script[kk] = {n:0,w:0,sw:0}); e.n++; e.sw += r.script.swing||0; if(won) e.w++; }
 });
 // leaders (regular season)
 const rows = Object.values(L.playerStats);
 const top = (f, key)=>{ const b = rows.filter(f).sort((a,b)=>(b.st[key]||0)-(a.st[key]||0))[0]; return b ? (b.st[key]||0) : 0; };
 const lp = top(r=>r.group==='QB','passYds'), lr = top(r=>r.group==='RB','rushYds'), lc = top(r=>r.group==='WR'||r.group==='TE','recYds'), ls = top(r=>r.group==='DL','sack'), li = top(r=>r.group==='LB'||r.group==='DB','dint');
 const ltd = rows.map(r=>(r.st.rushTD||0)+(r.st.recTD||0)).sort((a,b)=>b-a)[0], ltfl = top(r=>true,'tfl'), lpd = top(r=>true,'pd');
 agg.leaders.pass.push(lp); agg.leaders.rush.push(lr); agg.leaders.recvYds.push(lc); agg.leaders.sack.push(ls); agg.leaders.int.push(li); agg.leaders.td.push(ltd); agg.leaders.tfl.push(ltfl); agg.leaders.pd.push(lpd);
 const th = agg.thresholds; rows.forEach(r=>{ const s = r.st;
  if(r.group==='QB'){ if((s.passYds||0)>=5000) th.p5000++; if((s.passYds||0)>=4500) th.p4500++; }
  if(r.group==='RB'){ if((s.rushYds||0)>=2000) th.r2000++; if((s.rushYds||0)>=1800) th.r1800++; }
  if(r.group==='WR'||r.group==='TE'){ if((s.recYds||0)>=1700) th.rec1700++; if((s.recYds||0)>=1500) th.rec1500++; }
  if(r.group==='DL' && (s.sack||0)>=20) th.s20++; if(r.group==='DL' && (s.sack||0)>=17) th.s17++;
  if((r.group==='LB'||r.group==='DB') && (s.dint||0)>=10) th.i10++;
  if(((s.rushTD||0)+(s.recTD||0))>=20) th.td20++;
 });
 // awards
 const mv = awards.individual[0].c; agg.mvpPos[mv.pos] = (agg.mvpPos[mv.pos]||0)+1; const mk = mv.name+'|'+mv.team; agg.mvpNames[mk] = (agg.mvpNames[mk]||0)+1;
 const U = awards.userSummary; agg.userHon.ap1 += U.ap1; agg.userHon.ap2 += U.ap2; agg.userHon.pb += U.pb;
 awards.individual.forEach(a=>{ const key = a.title.startsWith('Most')?'mvp':a.title.startsWith('Offensive')?'opoy':a.title.startsWith('Defensive')?'dpoy':'coach'; if((a.c&&a.c.team===user) || a.team===user) agg.userHon[key]++; });
 agg.awardBy = agg.awardBy || {}; agg.statBy = agg.statBy || {};
 const tally = (store, title, name, team, pos)=>{ const e = store[title] || (store[title] = {pos:{}, who:{}, teams:{}, user:0}); if(pos) e.pos[pos] = (e.pos[pos]||0)+1; const k = name+'|'+team; e.who[k] = (e.who[k]||0)+1; e.teams[team] = (e.teams[team]||0)+1; if(team===user) e.user++; };
 awards.individual.forEach(a=>{ if(a.c) tally(agg.awardBy, a.title, a.c.name, a.c.team, a.c.pos); else tally(agg.awardBy, a.title, a.coach||a.team, a.team, 'Head coach'); });
 awards.stat.forEach(a=>tally(agg.statBy, a.title, a.name, a.team, null));
 // user's players
 rows.filter(r=>r.team===user).forEach(r=>{ const e = agg.userPl[r.name] || (agg.userPl[r.name] = {name:r.name, group:r.group, slot:r.slot, n:0, st:{}}); e.n++; Object.entries(r.st).forEach(([k,v])=>{ e.st[k] = (e.st[k]||0)+v; }); });
}
function runLeague100(N, container){
 const real = seasonState;
 const base = real || null;
 const entries = draftSim ? draftSim.rosters.map(r=>({teamName:r.teamName, slotmap:r.slots, isUser:r.isUser})) : null;
 if(!entries) return;
 const teams = {}; entries.forEach(e=>{ teams[e.teamName] = {pool:Object.values(e.slotmap).filter(Boolean), slotmap:e.slotmap, isUser:e.isUser}; });
 const names = Object.keys(teams), league = leagueBaseline(names.map(n=>teams[n].slotmap));
 const unitRatings = {}; names.forEach(n=>{ unitRatings[n] = teamRatings(teams[n].slotmap); });
 const L = {teams, schedule:[], currentWeek:1, phase:'regular', playerStats:{}, playerStatsPO:{}, league, unitRatings, unitRanks:computeUnitRanks(unitRatings), identity:{}, planCache:(base&&base.planCache)||{}, userPlan:{mode:'auto',pers:'auto',strat:'auto',pkg:'auto',focus:'auto'}};
 names.forEach(n=>{ L.identity[n] = teamIdentity(unitRatings[n], league); });
 const user = names.find(n=>teams[n].isUser), agg = newAgg(names, user);
 container.innerHTML = `<div class="panel"><h3 style="margin-top:0;">Running 100 seasons…</h3><div style="background:var(--border,#ccc);height:10px;border-radius:5px;overflow:hidden;"><div id="sim100Bar" style="height:10px;width:0%;background:var(--accent);"></div></div><p class="narr" id="sim100Txt">Starting…</p></div>`;
 let done = 0;
 const step = ()=>{
  const prev = seasonState; seasonState = L;
  try{ const t0 = Date.now(); while(done<N && Date.now()-t0<120){ liteSeason(L, agg); done++; } }
  finally{ seasonState = prev; }
  const bar = document.getElementById('sim100Bar'), txt = document.getElementById('sim100Txt');
  if(bar) bar.style.width = (done/N*100)+'%'; if(txt) txt.textContent = `Season ${done} of ${N}…`;
  if(done<N) setTimeout(step, 0);
  else { league100 = {agg, L:{unitRatings, unitRanks:L.unitRanks, league, identity:L.identity, teams, names}, user, N, scores:null}; render100(container); }
 };
 setTimeout(step, 20);
}
function r2(v){ return Math.round(v*100)/100; }
function pctS(v, d){ return (v*100).toFixed(d==null?0:d)+'%'; }
function corr(xs, ys){ return pearson(xs, ys); }
function ridgeSolve(Z, y, lam){
 const n = Z.length, k = Z[0].length, A = Array.from({length:k},()=>Array(k+1).fill(0));
 for(let i=0;i<k;i++){ for(let j=0;j<k;j++){ let sm = 0; for(let r=0;r<n;r++) sm += Z[r][i]*Z[r][j]; A[i][j] = sm + (i===j?lam:0); } let sy = 0; for(let r=0;r<n;r++) sy += Z[r][i]*y[r]; A[i][k] = sy; }
 for(let i=0;i<k;i++){ let piv = i; for(let r=i+1;r<k;r++) if(Math.abs(A[r][i])>Math.abs(A[piv][i])) piv = r; [A[i],A[piv]] = [A[piv],A[i]];
  const d = A[i][i] || 1e-9; for(let j=i;j<=k;j++) A[i][j] /= d;
  for(let r=0;r<k;r++){ if(r===i) continue; const f = A[r][i]; if(!f) continue; for(let j=i;j<=k;j++) A[r][j] -= f*A[i][j]; } }
 return A.map(row=>row[k]);
}

function awardPatternsHTML(A, N, user){
 const top = (obj, k)=> Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,k);
 const pctN = v=> Math.round(v/N*100)+'%';
 const rowsI = Object.entries(A.awardBy||{}).map(([title,e])=>{
  const pos = top(e.pos,4).map(([p,n])=>`${p} ${pctN(n)}`).join(' \u00b7 ');
  const who = top(e.who,3).map(([k,n])=>`${k.split('|')[0]} <span class="narr">(${nick(k.split('|')[1])})</span> \u00d7${n}`).join(', ');
  const teams = top(e.teams,2).map(([t,n])=>`${nick(t)} \u00d7${n}`).join(', ');
  return `<tr><td><b>${title}</b></td><td>${pos}</td><td>${who}</td><td class="narr">${teams}</td><td class="score">${e.user}\u00d7 <span class="narr">(${pctN(e.user)})</span></td></tr>`; }).join('');
 const rowsS = Object.entries(A.statBy||{}).map(([title,e])=>{
  const who = top(e.who,2).map(([k,n])=>`${k.split('|')[0]} <span class="narr">(${nick(k.split('|')[1])})</span> \u00d7${n}`).join(', ');
  return `<tr><td>${title}</td><td>${who}</td><td class="score">${e.user}\u00d7</td></tr>`; }).join('');
 const U = A.userHon;
 return `<p class="narr" style="margin:4px 0 8px;">Across ${N} seasons: who wins each award (by position and by player), which teams collect them, and how often your team's players or coach did. The same awards you see at the end of a single season, in aggregate.</p>
  <table><thead><tr><th>Award</th><th>Winner's position</th><th>Most frequent winners</th><th>Teams that win it most</th><th>Your team</th></tr></thead><tbody>${rowsI}</tbody></table>
  <h5 class="narr" style="margin:12px 0 4px;">Statistical champions</h5>
  <table><thead><tr><th>Title</th><th>Most frequent champions</th><th>Your team</th></tr></thead><tbody>${rowsS}</tbody></table>
  <p class="detail-item" style="margin-top:10px;">Your team averaged ${(U.ap1/N).toFixed(1)} First-Team All-Pros, ${(U.ap2/N).toFixed(1)} Second-Team All-Pros and ${(U.pb/N).toFixed(1)} Pro Bowlers per season.</p>`;
}
function render100(container){
 const D = league100, A = D.agg, N = A.seasons, user = D.user, names = D.L.names, R = D.L.unitRatings;
 const perStatsRows = ['11','12','13','21','22'].map(p=>{
  const tot = ['run','neutral','pass'].reduce((a,s)=>a+((A.plan[p+'|'+s]||{n:0}).n),0);
  if(!tot) return '';
  const sh = s=>{ const e = A.plan[p+'|'+s]; return e ? Math.round(e.n/tot*100) : 0; };
  return `<tr><td>${p} personnel</td><td class="score">RUN+ ${sh('run')}% / EVEN ${sh('neutral')}% / PASS+ ${sh('pass')}%</td></tr>`;
 }).join('');
 const avgW = {}, T = A.teams; names.forEach(n=>{ avgW[n] = mean_(T[n].w); });
 const sorted = names.slice().sort((a,b)=>avgW[b]-avgW[a]);
 const mine = T[user], myW = mine.w, myAvg = avgW[user], myRank = sorted.indexOf(user)+1;
 const ws = myW.slice().sort((a,b)=>a-b), q = p=>ws[Math.min(ws.length-1,Math.floor(p*ws.length))];
 const hist = {}; myW.forEach(w=>{ const k = Math.round(w); hist[k] = (hist[k]||0)+1; });
 const maxH = Math.max(...Object.values(hist));
 const histHTML = Array.from({length:18},(_,k)=>k).map(k=>`<div style="display:flex;align-items:center;gap:8px;font-size:0.8rem;"><span style="width:34px;text-align:right;" class="narr">${k}-${17-k}</span><div style="background:var(--accent);height:12px;width:${((hist[k]||0)/maxH*100).toFixed(1)}%;min-width:${hist[k]?2:0}px;border-radius:2px;"></div><span class="narr">${hist[k]||0}</span></div>`).join('');
 const reachN = mine.reach; const cum = [0,1,2,3,4,5].map(i=>reachN.slice(i).reduce((a,b)=>a+b,0)/N);
 const userName = nick(user);
 // what drives winning
 const units = ['qb','rb','rec','olPass','olRun','passRush','frontRun','coverage','kicker'];
 const xsW = names.map(n=>avgW[n]), unitCorr = units.map(u=>({u, r:corr(names.map(n=>R[n][u]), xsW)}));
 const z = (arr)=>{ const m = mean_(arr), s = sd_(arr)||1; return arr.map(v=>(v-m)/s); };
 const zU = {}; units.forEach(u=>{ zU[u] = z(names.map(n=>R[n][u])); });
 const comp = (list)=> names.map((n,i)=> mean_(list.map(u=>zU[u][i])));
 const groups = [['Trenches (both lines)',comp(['olRun','olPass','passRush','frontRun'])],['Offensive line',comp(['olRun','olPass'])],['Defensive front (pass rush + run D)',comp(['passRush','frontRun'])],['Skill & quarterback',comp(['qb','rb','rec'])],['Quarterback',comp(['qb'])],['Secondary',comp(['coverage'])]].map(([lab,arr])=>({lab, r:corr(arr, xsW), slope:(()=>{ const m=mean_(arr), my=mean_(xsW); let nu=0,de=0; arr.forEach((v,i)=>{ nu+=(v-m)*(xsW[i]-my); de+=(v-m)**2; }); return de? nu/de : 0; })()}));
 const tr = (lab, r)=>`<tr><td>${lab}</td><td class="score">${r>=0?'+':'−'}${Math.abs(r).toFixed(2)}</td><td><div style="height:8px;width:${Math.abs(r)*100}%;background:${r>=0?'var(--good)':'var(--bad)'};border-radius:2px;"></div></td></tr>`;
 const ym = mean_(xsW), yC = xsW.map(v=>v-ym), Zm = names.map((n,i)=>units.map(u=>zU[u][i]));
 const beta = ridgeSolve(Zm, yC, 3), lgR = D.L.league;
 const ptsPP = u=>unitValuePerPoint(u, lgR);
 unitCorr.forEach(x=>{ x.beta = beta[units.indexOf(x.u)]; x.sdU = sd_(names.map(n=>R[n][x.u])); x.model = ptsPP(x.u)*x.sdU*17/POINTS_PER_WIN; });
 const sgn2 = v=>(v>=0?'+':'−')+Math.abs(v).toFixed(2);
 const unitRows = unitCorr.slice().sort((a,b)=>b.beta-a.beta).map(x=>`<tr><td>${UNIT_INFO[x.u].label}</td><td class="score">${sgn2(x.r)}</td><td class="score">${sgn2(x.beta)}</td><td class="score">${sgn2(x.model)}</td></tr>`).join('');
 const grpRows = groups.map(g=>`<tr><td>${g.lab}</td><td class="score">${g.r>=0?'+':'−'}${Math.abs(g.r).toFixed(2)}</td><td class="score">${g.slope>=0?'+':'−'}${Math.abs(g.slope).toFixed(2)}</td></tr>`).join('');
 // league table
 const leagueRows = sorted.map((n,i)=>{ const t = T[n]; return `<tr style="${n===user?'background:rgba(120,120,255,.12);font-weight:700;':''}"><td class="rank">${i+1}</td><td class="team">${n}</td><td class="score">${avgW[n].toFixed(1)}</td><td class="score">${pctS(t.po/N)}</td><td class="score">${pctS(t.div/N)}</td><td class="score">${pctS(t.sbApp/N)}</td><td class="score">${pctS(t.champ/N,1)}</td><td class="narr">${(t.pf/t.g).toFixed(1)} – ${(t.pa/t.g).toFixed(1)}</td></tr>`; }).join('');
 // plans
 const PN = Object.keys(A.plan), totalPlans = PN.reduce((a,k)=>a+A.plan[k].n,0);
 const planRows = ['11','12','13','21','22'].map(p=>['run','neutral','pass'].map(s=>{ const e = A.plan[p+'|'+s]; if(!e||e.n<30) return ''; return `<tr><td>${PERS[p].label}</td><td>${STRAT[s].label}</td><td class="score">${pctS(e.n/totalPlans,1)}</td><td class="score">${(e.pts/e.n).toFixed(1)}</td><td class="score">${(e.to/e.n).toFixed(2)}</td><td class="score">${(e.rush/e.n).toFixed(0)} / ${(e.pass/e.n).toFixed(0)}</td><td class="score">${pctS(e.w/e.n,1)}</td></tr>`; }).join('')).join('');
 const DN = Object.keys(A.def), totalDef = DN.reduce((a,k)=>a+A.def[k].n,0);
 const defRows = ['base','nickel'].map(k=>['run','neutral','pass'].map(f=>{ const e = A.def[k+'|'+f]; if(!e||e.n<30) return ''; return `<tr><td>${DEF_PKG[k].label}</td><td>${DEF_FOCUS[f].label}</td><td class="score">${pctS(e.n/totalDef,1)}</td><td class="score">${(e.pa/e.n).toFixed(1)}</td><td class="score">${(e.sk/e.n).toFixed(2)}</td><td class="score">${(e.to/e.n).toFixed(2)}</td><td class="score">${pctS(e.w/e.n,1)}</td></tr>`; }).join('')).join('');
 const scriptRows = Object.entries(A.script).map(([k,e])=>`<tr><td>${capFirst(k)} plan, trailing by 3–18 late</td><td class="score">${e.n} games</td><td class="score">${(e.sw/e.n>=0?'+':'−')+Math.abs(e.sw/e.n).toFixed(1)} margin swing · ${pctS(e.w/e.n,1)} still won</td></tr>`).join('');
 const sp = Object.entries(A.script); const runE = A.script['run-heavy'], passE = A.script['pass-heavy'];
 // identities
 const idCount = {}; names.forEach(n=>{ const k = capFirst(offStyleName(D.L.identity[n].off)); idCount[k] = (idCount[k]||0)+1; });
 const idTxt = Object.entries(idCount).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} (${v})`).join(', ');
 // realism
 const lg = A.leaders, tt = A.totals, ppg = tt.pts/tt.g/2, ypg = tt.yds/tt.g/2;
 const rr = (arr)=>`${Math.round(mean_(arr)).toLocaleString('en-US')} avg · ${Math.round(Math.max(...arr)).toLocaleString('en-US')} max`;
 const perSeason = v=>(v/N).toFixed(2);
 const topMvp = Object.entries(A.mvpNames).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>`${k.split('|')[0]} (${nick(k.split('|')[1])}) ×${v}`).join(', ');
 const mvpPos = Object.entries(A.mvpPos).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k} ${v}%`.replace(/(\d+)%/, (m,x)=>Math.round(x/N*100)+'%')).join(', ');
 const U = A.userHon;
 // user players avg lines
 const upl = Object.values(A.userPl).filter(p=>p.n>=N*0.6).sort((a,b)=>GROUP_ORDER.indexOf(a.group)-GROUP_ORDER.indexOf(b.group) || ((b.st.passYds||0)+(b.st.rushYds||0)*1.4+(b.st.recYds||0)+(b.st.sack||0)*40+(b.st.tkl||0)*4)-((a.st.passYds||0)+(a.st.rushYds||0)*1.4+(a.st.recYds||0)+(a.st.sack||0)*40+(a.st.tkl||0)*4));
 const avgLine = p=>{ const s = {}; Object.entries(p.st).forEach(([k,v])=>{ s[k] = v/p.n; }); const r0 = v=>Math.round(v); const G = p.group;
  if(G==='QB') return `${r0(s.cmp)}/${r0(s.att)}, ${r0(s.passYds).toLocaleString('en-US')} yds, ${r0(s.passTD)} TD, ${r0(s.int)} INT`;
  if(G==='RB') return `${r0(s.car)} car, ${r0(s.rushYds).toLocaleString('en-US')} yds, ${r0(s.rushTD||0)} TD${s.recYds>150?`, ${r0(s.recYds)} rec yds`:''}`;
  if(G==='WR'||G==='TE') return `${r0(s.rec)}/${r0(s.tgt)} rec, ${r0(s.recYds).toLocaleString('en-US')} yds, ${r0(s.recTD||0)} TD`;
  if(G==='DL') return `${(s.sack||0).toFixed(1)} sacks, ${r0(s.tfl||0)} TFL, ${r0(s.hur||0)} pressures, ${r0(s.tkl||0)} tkl`;
  if(G==='LB') return `${r0(s.tkl||0)} tkl, ${r0(s.tfl||0)} TFL, ${(s.sack||0).toFixed(1)} sacks`;
  if(G==='DB') return `${(s.dint||0).toFixed(1)} INT, ${r0(s.pd||0)} PD, ${r0(s.tkl||0)} tkl`;
  if(G==='OL') return `${r0(s.rbk||0).toLocaleString('en-US')} rush yds behind, ${r0(s.pk||0)} pancakes, ${(s.sa||0).toFixed(1)} sacks allowed`;
  return `${(s.fg||0).toFixed(1)} FG`;
 };
 const gradeOf = p=>{ const pl = PLAYERS.find(x=>x[0]===p.name); if(!pl) return {g:'\u2014', w:null, o:null};
  const tg = WV_TAG_GROUP[pl[1]], cnt = Object.values(STATIC_SLOTS).length && ROSTER_SLOTS.filter(sl=>WV_SLOT_GROUP[sl]===tg).length*32;
  const peers = PLAYERS.filter(x=>WV_TAG_GROUP[x[1]]===tg).sort((a,b)=>b[3]-a[3]).slice(0, Math.max(cnt, 8));
  const pct = peers.filter(x=>x[3]<pl[3]).length/peers.length*100;
  return {g:letterGrade(pct), w:playerWar(pl).war, o:pl[3]}; };
 const uplHTML = upl.map(p=>{ const gr = gradeOf(p); return `<tr><td>${p.name}</td><td class="narr">${p.group}</td><td class="narr">${p.n}</td><td class="score">${gr.o==null?'\u2014':gr.o}</td><td class="score"><b>${gr.g}</b></td><td class="score">${gr.w==null?'\u2014':fmtWar(gr.w)}</td><td>${avgLine(p)}</td></tr>`; }).join('');
 // narrative
 const best = sorted[0], worst = sorted[sorted.length-1];
 const trench = groups[0], skill = groups[3];
 const verdict = trench.r>skill.r+0.1 ? `The lines carried more of the winning than the skill positions did in this model (trenches r = ${trench.r.toFixed(2).replace('-','−')} vs. skill/QB r = ${skill.r.toFixed(2).replace('-','−')})` : skill.r>trench.r+0.1 ? `Skill positions and the quarterback carried more of the winning than the lines did here (skill/QB r = ${skill.r.toFixed(2)} vs. trenches r = ${trench.r.toFixed(2)})` : `Trenches (r = ${trench.r.toFixed(2)}) and skill/quarterback (r = ${skill.r.toFixed(2)}) were about equally predictive`;
 const sumPlan = st_=>{ let n=0,to=0,pts=0,fxP=0,fxT=0; ['11','12','13','21','22'].forEach(p=>{ const e=A.plan[p+'|'+st_]; if(e){ n+=e.n; to+=e.to; pts+=e.pts; fxP+=e.fxP; fxT+=e.fxT; } }); const m=Math.max(n,1); return {n, to:to/m, pts:pts/m, fxP:fxP/m, fxT:fxT/m}; };
 const pl = {r:sumPlan('run'), p:sumPlan('pass'), nn:sumPlan('neutral')};
 const p11 = ['run','neutral','pass'].reduce((a,st_)=>a+((A.plan['11|'+st_]||{n:0}).n),0);
 const nar = [
  `Over ${N} simulated seasons the ${userName} averaged ${myAvg.toFixed(1)} wins (${myRank===1?'the best':'#'+myRank+' of 32 in the league'}), with a typical range of ${q(0.1).toFixed(0)}–${q(0.9).toFixed(0)} wins and extremes of ${ws[0]}–${ws[ws.length-1]}. They made the playoffs ${pctS(mine.po/N)} of the time, won the division ${pctS(mine.div/N)}, earned the #1 seed ${pctS(mine.bye/N)}, reached the Super Bowl ${pctS(mine.sbApp/N)} and won it ${pctS(mine.champ/N,1)} (${mine.champ} title${mine.champ===1?'':'s'}). A single season can land anywhere in that range, which is the real lesson of the exercise: one 17-game year is a small sample.`,
  `What decided games in this league: ${unitCorr.slice().sort((a,b)=>b.beta-a.beta).slice(0,2).map(x=>shortUnit(x.u)).join(' and ')} moved the win total the most, and ${unitCorr.slice().sort((a,b)=>b.beta-a.beta).slice(-2).map(x=>shortUnit(x.u)).join(' and ')} moved it the least. `,
  `Game plans behaved the way football people expect. Most teams played a balanced approach (${pctS(pl.nn.n/totalPlans)} of games); ${pctS(pl.r.n/totalPlans)} ran heavily and ${pctS(pl.p.n/totalPlans)} threw heavily. Compared with the same team playing a plain balanced game, a run-heavy plan was worth ${pl.r.fxP>=0?'+':'−'}${Math.abs(pl.r.fxP).toFixed(1)} points a game and cut giveaways by ${pctS(Math.abs(pl.r.fxT))}, while a pass-heavy plan was worth ${pl.p.fxP>=0?'+':'−'}${Math.abs(pl.p.fxP).toFixed(1)} points with ${pctS(Math.abs(pl.p.fxT))} ${pl.p.fxT>=0?'more':'fewer'} giveaways. ${runE ? `Teams that fell behind switched to throwing late, and that switch helped them by about ${Math.abs(runE.sw/runE.n).toFixed(1)} points over the final stretch.` : ''} The full breakdown by personnel group is in the Game plans section below.`,
  `Does it look like the NFL? Teams averaged ${ppg.toFixed(1)} points and ${ypg.toFixed(0)} yards a game, with ${(tt.to/tt.g/2).toFixed(1)} turnovers a game, ${pctS(tt.homeW/tt.g)} of games won by the home team, and ${pctS(tt.close/tt.g)} of games decided by 3 points or fewer. The best individual seasons stayed near real-life records: ${Math.max(...lg.pass).toLocaleString('en-US')} passing yards (record 5,477), ${Math.max(...lg.rush).toLocaleString('en-US')} rushing (record 2,105), ${Math.max(...lg.recvYds).toLocaleString('en-US')} receiving (record 1,964) and ${Math.max(...lg.sack)} sacks (record 22.5). The detailed numbers are in the sections below.`
 ];
 const sec = (title, inner, open)=>`<details class="panel" style="margin-bottom:14px;" ${open?'open':''}><summary style="cursor:pointer;font-weight:700;">${title}</summary><div style="margin-top:10px;">${inner}</div></details>`;
 const stat = (v,l)=>`<div style="flex:1;min-width:110px;text-align:center;"><div style="font-size:1.5rem;font-weight:800;">${v}</div><div class="narr">${l}</div></div>`;
 container.innerHTML = `<div class="panel" style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">100 SEASONS: ${user}</h2><div style="display:flex;gap:8px;flex-wrap:wrap;"><button class="tabbtn" id="rerun100Btn">Re-run</button><button class="resetbtn" id="back100Btn" style="width:auto;padding:10px 24px;">Back to season</button></div></div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">${stat(myAvg.toFixed(1),'avg wins')}${stat(pctS(mine.po/N),'make playoffs')}${stat(pctS(mine.div/N),'win division')}${stat(pctS(mine.bye/N),'#1 seed')}${stat(pctS(mine.sbApp/N),'reach Super Bowl')}${stat(pctS(mine.champ/N,1),'win title')}${stat(Math.round(ppg),'points / game')}${stat(pctS(tt.homeW/tt.g),'home wins')}${stat(pctS(tt.close/tt.g),'within 3')}${stat(pctS(tt.blow/tt.g),'by 21+')}${stat(pctS(tt.ties/tt.g),'tied')}</div>
  ${nar.map(t=>`<p class="detail-item">${t}</p>`).join('')}</div>`
 + sec('Your win distribution & playoff path', `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;"><div><h5 class="narr" style="margin:0 0 6px;">Seasons by win total</h5>${histHTML}</div><div><h5 class="narr" style="margin:0 0 6px;">How far you got</h5><table><tbody><tr><td>Missed playoffs</td><td class="score">${pctS(reachN[0]/N)}</td></tr><tr><td>Lost Wild Card</td><td class="score">${pctS(reachN[1]/N)}</td></tr><tr><td>Lost Divisional</td><td class="score">${pctS(reachN[2]/N)}</td></tr><tr><td>Lost Conference Championship</td><td class="score">${pctS(reachN[3]/N)}</td></tr><tr><td>Lost Super Bowl</td><td class="score">${pctS(reachN[4]/N)}</td></tr><tr><td><b>Won Super Bowl</b></td><td class="score">${pctS(reachN[5]/N,1)}</td></tr></tbody></table><p class="narr">Playoff seeds earned: ${[1,2,3,4,5,6,7].map(s=>`#${s} ${pctS((mine.seedCnt[s]||0)/N)}`).join(' · ')}</p></div></div>`, true)
 + sec('The league, by average wins', zpbLeagueBarsHTML(avgW, T, N, user), false)
 + (window.zpb100More ? zpb100More(myW, N, mine) : '')
 + sec('What actually drove winning (neutral model, 32 rosters)', `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;"><div><h5 class="narr" style="margin:0 0 6px;">Each unit's link to average wins</h5><table><thead><tr><th>Unit</th><th>r</th><th>Wins/SD, others equal</th><th>Model-implied wins/SD</th></tr></thead><tbody>${unitRows}</tbody></table><p class="narr">Raw correlation (r) is muddied because drafting trade-offs make strong lines come with weaker secondaries. The middle column is a ridge regression holding the other units equal; the last column is what the matchup model's own coefficients imply for one standard deviation of that unit.</p></div><div><h5 class="narr" style="margin:0 0 6px;">Position groups <span style="font-weight:400;">(r, wins per +1 SD)</span></h5><table><thead><tr><th></th><th>r</th><th>Wins / SD</th></tr></thead><tbody>${grpRows}</tbody></table></div></div>`, true)
 + sec('Game plans: personnel × strategy', `<table><thead><tr><th>Personnel</th><th>Strategy</th><th>Share</th><th>Pts/gm</th><th>Giveaways</th><th>Rush / pass yds</th><th>Win%</th></tr></thead><tbody>${planRows}</tbody></table><h5 class="narr" style="margin:14px 0 4px;">Defensive packages</h5><table><thead><tr><th>Package</th><th>Focus</th><th>Share</th><th>Pts allowed</th><th>Sacks</th><th>Takeaways</th><th>Win%</th></tr></thead><tbody>${defRows}</tbody></table><h5 class="narr" style="margin:14px 0 4px;">Late-game script</h5><table><tbody>${scriptRows||'<tr><td class="narr">No data</td></tr>'}</tbody></table><p class="narr">Win% by plan is confounded by who chooses it: favorites run more, underdogs throw more, so read these as style fingerprints, not as proof that one plan wins.</p>`, false)
 + sec('Your draft: pick-by-pick critique', pickCritiqueHTML(true), false)
 + sec('Your players: average season', `<p class="narr">Grade = where the player's rating ranks among every starter-caliber player at his position in the pool (A = top 10%, C = middle, F = bottom 10%). Wins = the static per-season value from the draft board (extra wins over a 70-rated player at the position).</p><table><thead><tr><th>Player</th><th>Pos</th><th>Seasons</th><th>OVR</th><th>Grade</th><th>Wins</th><th>Average season</th></tr></thead><tbody>${uplHTML}</tbody></table><p class="narr">Honors per season: ${(U.ap1/N).toFixed(1)} First-Team All-Pro, ${(U.ap2/N).toFixed(1)} Second-Team, ${(U.pb/N).toFixed(1)} Pro Bowlers; MVP ${U.mvp}×, OPOY ${U.opoy}×, DPOY ${U.dpoy}×, Coach of the Year ${U.coach}× in ${N} seasons.</p>`, false)
 + sec('STATS', `<table><tbody><tr><td>Passing yards leader</td><td>${rr(lg.pass)} (NFL record 5,477)</td></tr><tr><td>Rushing yards leader</td><td>${rr(lg.rush)} (record 2,105)</td></tr><tr><td>Receiving yards leader</td><td>${rr(lg.recvYds)} (record 1,964)</td></tr><tr><td>Sack leader</td><td>${(mean_(lg.sack)).toFixed(1)} avg · ${Math.max(...lg.sack)} max (record 22.5)</td></tr><tr><td>Interception leader</td><td>${(mean_(lg.int)).toFixed(1)} avg · ${Math.max(...lg.int)} max (record 14)</td></tr><tr><td>Scrimmage TD leader</td><td>${(mean_(lg.td)).toFixed(1)} avg · ${Math.max(...lg.td)} max (record 31)</td></tr><tr><td>Tackles for loss leader</td><td>${(mean_(lg.tfl)).toFixed(1)} avg · ${Math.max(...lg.tfl)} max</td></tr><tr><td>Passes defensed leader</td><td>${(mean_(lg.pd)).toFixed(1)} avg · ${Math.max(...lg.pd)} max</td></tr><tr><td>Players per season with ≥5,000 pass yds / ≥2,000 rush / ≥1,700 rec / ≥20 sacks</td><td>${perSeason(A.thresholds.p5000)} / ${perSeason(A.thresholds.r2000)} / ${perSeason(A.thresholds.rec1700)} / ${perSeason(A.thresholds.s20)} </td></tr><tr><td>Rush attempts / dropbacks per team-game</td><td>${(tt.rushAtt/tt.g/2).toFixed(1)} / ${(tt.passAtt/tt.g/2).toFixed(1)}</td></tr><tr><td>Overtime / tie rate</td><td>${pctS(tt.ties/tt.g,2)} ties</td></tr>${perStatsRows}</tbody></table>`, false)
 + sec('Does the model predict real results?', `<p class="detail-item">A check against real life: the model rated all 32 real rosters from the Madden NFL 27 ratings (the same ratings used here, set after the 2025 season) and converted each team's strength into projected wins. Those projections were compared with the actual 2025 regular-season records (wins, ties as half).</p><table><tbody><tr><td>Correlation with real 2025 wins</td><td class="score">0.66</td></tr><tr><td>Rank correlation (Spearman)</td><td class="score">0.69</td></tr><tr><td>Typical miss</td><td class="score">2.6 wins</td></tr><tr><td>Spread of projected wins vs real wins (std. dev.)</td><td class="score">2.5 vs 3.4</td></tr></tbody></table><p class="narr">How to read it: about 44% of the variation in real wins is explained by roster ratings alone. That is in the range of good preseason projections, because real seasons also depend on injuries, trades, schedule and plain luck, and these ratings were set after the 2025 season and reflect offseason roster moves. The model's projections are somewhat more bunched together than real life (2.5 vs 3.4 wins), which is expected: real records include luck, while a projection is a pure talent estimate. Largest misses were teams whose real seasons far outran or trailed their rosters, for example Denver and New England (more wins than projected) and Baltimore (fewer). This check was run once at build time on 2025 results and is not recomputed live.</p>`, false)
 + sec('Award patterns', awardPatternsHTML(A, N, user), false)
 + sec('Reading this report: what the terms mean', readingStatsHTML(), false);
 const back = document.getElementById('back100Btn'); if(back) back.addEventListener('click', ()=>renderSeasonTab(container));
 const rr_ = document.getElementById('rerun100Btn'); if(rr_) rr_.addEventListener('click', ()=>{ league100 = null; runLeague100(100, container); });
}

function add100Button(container){
 if(!draftSim) return;
 const d = document.createElement('div'); d.style.cssText = 'margin:0 0 12px;text-align:right;';
 d.innerHTML = `<button class="tabbtn" id="sim100Btn">100 SEASONS</button>${league100?' <button class="tabbtn" id="sim100Re">Re-run</button>':''}`;
 const ops = document.getElementById('zpbDraftOps'); if(ops) ops.appendChild(d); else container.insertBefore(d, container.firstChild);
 const b = document.getElementById('sim100Btn'); if(b) b.addEventListener('click', ()=>{ if(league100) render100(container); else runLeague100(100, container); });
 const r = document.getElementById('sim100Re'); if(r) r.addEventListener('click', ()=>{ league100 = null; runLeague100(100, container); });
}
function renderSeasonTab(container){
 renderSeasonTabInner(container); add100Button(container);
 try{ checkRewards(); }catch(e){}
 try{ updateStepper(); }catch(e){}
}
function renderSeasonTabInner(container){
 if(!seasonState){
  container.innerHTML = `<div class="zpb-stageintro">
   <button class="resetbtn zpb-startbtn" id="startSeasonBtn">SEASON</button>
   <p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine" style="font-size:1.1em;">?</b></p>
  </div>`;
  document.getElementById('startSeasonBtn').addEventListener('click', ()=>{ startSeason(); renderSeasonTab(container); });
  return;
 }
 if(seasonState.phase==='regular' && seasonState.preseason && !seasonState.scriptLocked) renderPreseasonView(container);
 else if(seasonState.phase==='regular') renderRegularSeasonView(container);
 else if(seasonState.phase==='regularReview') renderRegularReviewView(container);
 else if(seasonState.phase==='playoffs') renderPlayoffsView(container);
 else if(seasonState.phase==='complete') renderSeasonCompleteView(container);
}


function buildResultEntries(){
 const draftEntries = draftSim.rosters.map((r,i)=>({
  label: `${r.teamName}`, teamName: r.teamName,
  score: scoreRoster(r), pool: Object.values(r.slots).filter(Boolean), slotmap: r.slots, pickRounds: r.pickRounds||{},
  isUser:r.isUser, type: r.isUser?'You':'CPU draft'
 }));
 const realEntries = Object.keys(TEAM_DATA).map(t=>({
  label: `${t}`, teamName: t,
  score:computeScore(t), pool:PLAYERS.filter(p=>p[2]===t), slotmap: TEAM_DATA[t], pickRounds:{},
  isUser:false, type:'Real NFL'
 }));
 return {draftEntries, realEntries};
}

function finishDraft2(){
 optimizeCpuLineups();
 try{ zpbFillAllLineups(); }catch(e){}
 { const ur = draftSim.rosters.find(r=>r.isUser); if(ur){ try{ applyLineup(ur, lineupAdvice(ur).best); }catch(e){} } }   // your roster always starts the season in the recommended lineup, however the picks went
 document.getElementById('draftLive').style.display='none';
 const panel = document.getElementById('draftFinalResults');
 panel.style.display='block';
 resultsView = 'season';
 renderDraftResults();
 updateStepper();
}

function entryRowsHTML(all, startIdx){
 let h='';
 all.forEach((e,i)=>{
  const idx = startIdx + i;
  h += `<tr class="teamrow" data-idx="${idx}" style="${e.isUser?'font-weight:700;':''}"><td class="rank">${i+1}</td><td${e.isUser?' class="zpb-shm"':''}>${e.label}</td><td class="score">${Math.round(e.score)}</td></tr>
   <tr class="detailrow" id="detailrow-${idx}" style="display:none;"><td colspan="3"><div class="detailwrap" id="detailwrap-${idx}"></div></td></tr>`;
 });
 return h;
}

function wireRowClicks(panel, allForClick){
 function fillDetail(idx){
  const e = allForClick[idx];
  const metrics = computeDetailMetrics(e.pool);
  const wrap = document.getElementById(`detailwrap-${idx}`);
  let html = `<h4 style="margin-top:0;">Roster (as drafted)</h4>${renderDepthChartHTML(e.slotmap, e.pickRounds, e.isUser ? e.teamName : '')}`;
  html += renderDetailHTML(e.label, metrics).replace(/<button class="closebtn"[^>]*>[^<]*<\/button>/,'');
  if(e.isUser){
   const realOnlySorted = buildResultEntries().realEntries.slice().sort((a,b)=>b.score-a.score);
   const rankAmongReal = Math.min(32, realOnlySorted.filter(r=>r.score>e.score).length + 1);
  }
  wrap.innerHTML = html;
 }
 panel.querySelectorAll('tr.teamrow').forEach(tr=>{
  const idx = parseInt(tr.dataset.idx,10);
  tr.addEventListener('click', ()=>{
   const row = document.getElementById(`detailrow-${idx}`);
   const isOpen = row.style.display !== 'none';
   if(isOpen){ row.style.display='none'; return; }
   if(!document.getElementById(`detailwrap-${idx}`).innerHTML) fillDetail(idx);
   row.style.display='table-row';
  });
 });
 return fillDetail;
}

function renderDraftResults(){ if(typeof zpbMaybeFinishCine==='function') zpbMaybeFinishCine();
 const panel = document.getElementById('draftFinalResults');
 const {draftEntries, realEntries} = buildResultEntries();
 const myEntry = draftEntries.find(e=>e.isUser);
 const realOnlySorted = realEntries.slice().sort((a,b)=>b.score-a.score);
 const rankAmongReal = Math.min(32, realOnlySorted.filter(e=>e.score>myEntry.score).length + 1);

 let h = `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;"><span class="zpb-draftops" id="zpbDraftOps"><button class="resetbtn" id="seasonOpsBtn" style="font-size:0.78rem;padding:5px 12px;width:auto;margin:0 6px 0 0;">SEASON</button><button class="tabbtn" id="newDraftBtn" style="font-size:0.78rem;padding:5px 10px;">NEW DRAFT</button></span><p class="dsub zpb-cygdsub" style="margin:0;"><span class="zpb-cyg">Can you go </span><b class="zpb-shine">20-0</b><b class="zpb-shine zpb-cygq">?</b></p></div>
  <div class="tabs" style="margin-bottom:10px;flex-wrap:wrap;">
   <button class="tabbtn ${resultsView==='season'?'active':''}" id="resultsSeasonBtn">SEASON</button>
   ${seasonState?'':`<button class="tabbtn ${resultsView==='nfl'?'active':''}" id="resultsNflBtn">VS. ACTUAL NFL TEAMS</button>`}
   <button class="tabbtn ${resultsView==='mine'?'active':''}" id="resultsMineBtn">YOUR ROSTER</button>
   <button class="tabbtn ${resultsView==='compare'?'active':''}" id="resultsCompareBtn">TEAM COMPARISON</button>
  </div>
  <div id="draftResultsBody"></div>
  `;
 panel.innerHTML = h;

 const body = document.getElementById('draftResultsBody');

 if(resultsView==='sim' || resultsView==='nfl'){
  const all = resultsView==='sim' ? draftEntries.slice() : [myEntry].concat(realEntries);
  all.sort((a,b)=>b.score-a.score);
  const myIdx = all.findIndex(e=>e.isUser);
  body.innerHTML = `<table><thead><tr><th>#</th><th>Team</th><th>Score</th></tr></thead><tbody>${entryRowsHTML(all,0)}</tbody></table>`;
  const fillDetail = wireRowClicks(body, all);
  fillDetail(myIdx);
  document.getElementById(`detailrow-${myIdx}`).style.display = 'table-row';
 } else if(resultsView==='mine'){
  renderYourRosterTab(body, myEntry, rankAmongReal);
 } else if(resultsView==='compare'){
  renderComparisonTab(body, draftEntries, realEntries);
 } else if(resultsView==='season'){
  renderSeasonTab(body);
  if(!seasonState){
   const rk = draftEntries.slice().sort((a,b)=>b.score-a.score), mi = rk.findIndex(e=>e.isUser);
   const w = document.createElement('div'); w.style.marginTop = '18px';
   w.innerHTML = `<div class="zpb-ranks-fade"><h3 class="zpb-shm" style="margin:0 0 6px;">How your draft ranks</h3><p class="zpb-swmini">All 32 simulated rosters, best to worst. Click any row for its full roster.</p><table><thead><tr><th>#</th><th>Team</th><th>Score</th></tr></thead><tbody>${entryRowsHTML(rk,0)}</tbody></table></div>`;
   body.appendChild(w); wireRowClicks(w, rk);
  }
 }

 
 { const _nb = document.getElementById('resultsNflBtn'); if(_nb) _nb.addEventListener('click', ()=>{ resultsView='nfl'; renderDraftResults(); }); }
 document.getElementById('resultsMineBtn').addEventListener('click', ()=>{ resultsView='mine'; renderDraftResults(); });
 document.getElementById('resultsCompareBtn').addEventListener('click', ()=>{ resultsView='compare'; renderDraftResults(); });
 document.getElementById('resultsSeasonBtn').addEventListener('click', ()=>{ resultsView='season'; renderDraftResults(); });
 document.getElementById('newDraftBtn').addEventListener('click', ()=> confirmDialog('This discards your drafted roster and any season in progress and takes you back to the draft setup.', 'Yes, start a new draft', startNewDraftFlow));
}

function renderYourRosterTab(container, myEntry, rankAmongReal){
 const realTeams = Object.keys(TEAM_DATA);
 const zstM = (typeof zpbRowVars==='function') ? zpbRowVars(myEntry.teamName) : '';
 let slotRows = '';
 [].concat(...DEPTH_CHART_GROUPS.map(g=>g[2])).forEach(s=>{
  const def = GROUP_DEFS.find(g=>g.key===s);
  const p = myEntry.slotmap[s];
  const e = normalizeSlotEntry(p);
  const rnd = myEntry.pickRounds[s];
  if(!def){ return; }
  const myVal = e ? effOvr(p, s) : 70;
  const leagueVals = realTeams.map(t=>groupAvgForTeam(t,def).avg);
  const rank = Math.min(32, leagueVals.filter(v=>v>myVal).length + 1);   // ranked against the 32 real teams: last place is #32
  const pct = ((32-rank)/31)*100;
  const grade = letterGrade(pct);
  const oop = e && e.pos && isOutOfPosition(e.pos, s);
  const effCell = `<span class="score">${e?e.ovr:'—'}</span>`;
  const nmCell = (e && e.name) ? `<span class="${e.ovr>=85?'zpb-shm':''}">${e.name}</span>` : '—';
  slotRows += `<tr class="zpb-trow" style="${zstM}"><td>${LABELS[s]||s}</td><td>${nmCell}</td><td>${effCell}</td><td class="narr">${rnd?`Round ${rnd}`:'—'}</td><td class="score">#${rank}/32</td><td class="score">${grade}</td></tr>`;
 });

 const metrics = computeDetailMetrics(myEntry.pool);
 let catRows = metrics.map(m=>`<tr><td>${m.label}</td><td class="score">${m.avg.toFixed(1)}</td><td class="score">#${m.rank}/32</td><td class="score">${letterGrade(m.pct)}</td></tr>`).join('');

 const overallPct = ((32-rankAmongReal)/31)*100;

 container.innerHTML = `
  ${seasonState ? `
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Lineup &amp; flex</h4>
   <p class="narr" style="margin-top:0;">Pick who plays where. Players can flex to any spot their position allows.</p>
   <div id="lineupHost"></div>
  </div>` : '' /* w19 (Owner): before the season begins there is nothing to flex yet — the panel waits */}
  <div class="panel" style="margin-bottom:14px;">
   <h4 style="margin-top:0;">Your Full Depth Chart</h4>
   ${zpbDepthZonesHTML(myEntry.slotmap, myEntry.pickRounds, myEntry.teamName)}
  </div>
  <div class="panel" style="margin-bottom:14px;">
   <h3 style="margin-top:0;">Overall Grade <span style="color:var(--accent);">${letterGrade(overallPct)}</span></h3>
   <table><thead><tr><th>Slot</th><th>Player</th><th>Effective OVR</th><th>Drafted</th><th>League Rank</th><th>Grade</th></tr></thead><tbody>${slotRows}</tbody></table>
  </div>
 `;
 const roster = draftSim.rosters.find(r=>r.isUser), host = document.getElementById('lineupHost');
 if(host){
  host.innerHTML = lineupEditorHTML(roster, 'lineupEd');
  wireLineupEditor(roster, 'lineupEd', ()=>{ if(seasonState) refreshUserAfterLineup(); renderDraftResults(); });
 }
}

function renderComparisonTab(container, draftEntries, realEntries){
 container.innerHTML = `
  <div class="panel" style="margin-bottom:14px;">
   <div class="filters">
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team A
     <select id="cmpTeamA"></select>
    </label>
    <label style="display:flex;flex-direction:column;gap:4px;font-size:0.85rem;color:var(--sub);">Team B
     <select id="cmpTeamB"></select>
    </label>
   </div>
  </div>
  <div id="cmpResult"></div>
 `;
 function buildOptions(sel, defaultVal){
  const og1 = document.createElement('optgroup'); og1.label = 'Your Draft';
  draftEntries.filter(e=>e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='YOU'; o.textContent='Your Team ('+e.teamName+')'; og1.appendChild(o); });
  sel.appendChild(og1);
  const og2 = document.createElement('optgroup'); og2.label = 'Simulated Draft Teams';
  draftEntries.filter(e=>!e.isUser).forEach(e=>{ const o=document.createElement('option'); o.value='SIM:'+e.teamName; o.textContent=e.teamName+' (sim)'; og2.appendChild(o); });
  sel.appendChild(og2);
  const og3 = document.createElement('optgroup'); og3.label = 'Actual NFL Rosters';
  realEntries.forEach(e=>{ const o=document.createElement('option'); o.value='NFL:'+e.teamName; o.textContent=e.teamName+' (actual)'; og3.appendChild(o); });
  sel.appendChild(og3);
  sel.value = defaultVal;
 }
 const selA = document.getElementById('cmpTeamA');
 const selB = document.getElementById('cmpTeamB');
 buildOptions(selA, 'YOU');
 buildOptions(selB, 'NFL:'+Object.keys(TEAM_DATA).sort()[0]);

 function resolve(key){
  if(key==='YOU') return draftEntries.find(e=>e.isUser);
  if(key.startsWith('SIM:')) return draftEntries.find(e=>e.teamName===key.slice(4) && !e.isUser);
  if(key.startsWith('NFL:')) return realEntries.find(e=>e.teamName===key.slice(4));
  return null;
 }

 function renderCompare(){
  const a = resolve(selA.value), b = resolve(selB.value);
  const resultDiv = document.getElementById('cmpResult');
  if(!a || !b){ resultDiv.innerHTML=''; return; }
  const edges = countLineupEdges(a.slotmap, b.slotmap);
  const units = unitComparisonHTML(a.pool, b.pool);
  const leader = a.score>=b.score ? a : b;
  const verdict = `${leader.label} grades ${Math.abs(a.score-b.score).toFixed(2)} points higher. ${a.label} holds the edge at ${edges.a} starting spots to ${edges.b}, and wins ${units.aUnits} of ${units.total} unit comparisons to ${units.bUnits}.`;
  resultDiv.innerHTML = `
   <div class="panel" style="margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:1.1rem;font-weight:700;gap:10px;flex-wrap:wrap;">
     <span>${a.label}</span><span class="score" style="color:var(--accent);">${a.score.toFixed(2)} vs ${b.score.toFixed(2)}</span><span>${b.label}</span>
    </div>
    <p class="detail-item" style="margin-top:10px;">${verdict}</p>
   </div>
   <div class="panel" style="margin-bottom:14px;">
    <h4 style="margin-top:0;">Starter-by-Starter</h4>
    ${renderLineupTableHTML(a.slotmap, b.slotmap, a.teamName, b.teamName)}
   </div>
   <div class="panel">
    <h4 style="margin-top:0;">Unit Comparison</h4>
    ${units.html}
   </div>
  `;
 }
 selA.addEventListener('change', renderCompare);
 selB.addEventListener('change', renderCompare);
 renderCompare();
}

initDraftSetup();
personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights(); buildControls(); render();
// ---- the user's team and players, in blue everywhere ----
(function(){
 let lastKey = '', rx = null, busy = false, queued = false;
 const esc = t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 function build(){
  try{
   if(typeof draftSim==='undefined' || !draftSim || !draftSim.rosters) return null;
   const ur = draftSim.rosters.find(r=>r.isUser); if(!ur) return null;
   const names = new Set(); (draftSim.log||[]).forEach(l=>{ if(l.isUser && l.player){ const n = Array.isArray(l.player)?l.player[0]:l.player.name; if(n) names.add(n); } });
   Object.values(ur.slots||{}).forEach(p=>{ if(p && p[0]) names.add(p[0]); });
   if(ur.teamName){ names.add(nick(ur.teamName)); names.add(ur.teamName); }
   const list = Array.from(names).filter(n=>n && n.length>3).sort((a,b)=>b.length-a.length);
   const key = list.join('|'); if(key===lastKey) return rx; lastKey = key;
   rx = list.length ? new RegExp('(^|[^A-Za-z])('+list.map(esc).join('|')+')(?![A-Za-z])','g') : null; return rx;
  }catch(e){ return null; }
 }
 const SKIP = {SCRIPT:1,STYLE:1,SELECT:1,OPTION:1,TEXTAREA:1,INPUT:1,BUTTON:1,TITLE:1};
 function pass(){
  busy = true;
  try{
   const R = build(); if(!R) return;
   const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {acceptNode:n=>{
    if(!n.nodeValue || n.nodeValue.length<4) return NodeFilter.FILTER_REJECT;
    for(let p=n.parentNode;p&&p!==document.body;p=p.parentNode){ if(SKIP[p.nodeName] || (p.classList && p.classList.contains('ub')) || (p.style && p.style.color && p.style.color.indexOf('accent')>=0)) return NodeFilter.FILTER_REJECT; }
    R.lastIndex = 0; return R.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }});
   const nodes = []; while(w.nextNode()) nodes.push(w.currentNode);
   nodes.forEach(n=>{
    const txt = n.nodeValue, frag = document.createDocumentFragment(); let last = 0, m; R.lastIndex = 0;
    while((m = R.exec(txt))){ const st = m.index + m[1].length; if(st>last) frag.appendChild(document.createTextNode(txt.slice(last, st))); const sp = document.createElement('span'); sp.className = 'ub'; sp.textContent = m[2]; frag.appendChild(sp); last = st + m[2].length; }
    if(last<txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    n.parentNode.replaceChild(frag, n);
   });
  } finally { busy = false; }
 }
 function schedule(){ if(queued || busy) return; queued = true; setTimeout(()=>{ queued = false; pass(); }, 120); }
 new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true, characterData:true});
 schedule();
})();
// ---- celebrations: confetti and small rewards when the user's team wins big ----
const FX = (function(){
 let cv = null, ctx = null, parts = [], raf = 0;
 const reduce = ()=> window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function ensure(){ if(cv) return; cv = document.createElement('canvas'); cv.id = 'fxCanvas'; document.body.appendChild(cv); ctx = cv.getContext('2d'); size(); window.addEventListener('resize', size); }
 function size(){ if(!cv) return; const d = window.devicePixelRatio||1; cv.width = innerWidth*d; cv.height = innerHeight*d; ctx.setTransform(d,0,0,d,0,0); }
 const COLORS = ['#4f8cff','#ffffff','#ffc43c','#ff6b4a','#3ecf8e','#b48cff'], GOLD = ['#ffc43c','#ffd75e','#fff6c4','#ffffff','#e8a317'];
 const FXC = ()=>{ try{ if(typeof zpbState!=='undefined' && zpbState.teamName && typeof zpbPackFor==='function'){ const pk=zpbPackFor(zpbState.teamName); if(pk&&pk.raw) return [pk.raw[0],pk.raw[1],pk.raw[2],'#ffffff','#ffc43c']; } }catch(e){} return COLORS; };
 function confetti(n, colors, x0, y0, spread, speed){ for(let i=0;i<n;i++){ const a = (-Math.PI/2) + (Math.random()-.5)*spread, v = speed*(0.5+Math.random()); parts.push({x:x0, y:y0, vx:Math.cos(a)*v, vy:Math.sin(a)*v, g:0.18+Math.random()*0.08, w:5+Math.random()*6, h:3+Math.random()*5, r:Math.random()*6, vr:(Math.random()-.5)*.35, c:colors[(Math.random()*colors.length)|0], life:1, decay:0.0035+Math.random()*0.004, kind:'c'}); } }
 function firework(x, y, colors){ const n = 70; for(let i=0;i<n;i++){ const a = Math.PI*2*i/n + Math.random()*.1, v = 2.5+Math.random()*3.8; parts.push({x, y, vx:Math.cos(a)*v, vy:Math.sin(a)*v, g:0.05, w:2.6, h:2.6, r:0, vr:0, c:colors[(Math.random()*colors.length)|0], life:1, decay:0.012+Math.random()*0.01, kind:'f'}); } }
 function loop(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  parts = parts.filter(p=>p.life>0 && p.y<innerHeight+40);
  parts.forEach(p=>{
   p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= p.kind==='f'?0.985:0.992; p.r += p.vr; p.life -= p.decay;
   ctx.globalAlpha = Math.max(0, Math.min(1, p.life*1.6)); ctx.fillStyle = p.c;
   if(p.kind==='f'){ ctx.beginPath(); ctx.arc(p.x,p.y,p.w*0.5,0,6.283); ctx.fill(); }
   else { ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.r*1.3))*0.8+0.2); ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); }
  });
  ctx.globalAlpha = 1;
  if(parts.length) raf = requestAnimationFrame(loop); else { raf = 0; if(cv){ cv.remove(); cv = null; window.removeEventListener('resize', size); } }
 }
 function start(){ if(!raf) raf = requestAnimationFrame(loop); }
 function toast(msg){ const t = document.createElement('div'); t.className = 'fxtoast'; t.textContent = msg; document.body.appendChild(t); setTimeout(()=>t.remove(), 3700); }
 function banner(html){ const b = document.createElement('div'); b.className = 'fxbanner'; b.innerHTML = html; document.body.appendChild(b); setTimeout(()=>b.remove(), 4300); }
 function play(kind, msg){
  if(msg) toast(msg);
  if(reduce()) return;
  ensure(); const W = innerWidth, H = innerHeight;
  if(kind==='small'){ confetti(70, FXC(), W/2, H*0.85, 1.4, 11); }
  else if(kind==='medium'){ confetti(110, FXC(), W*0.1, H*0.95, 1.1, 15); confetti(110, FXC(), W*0.9, H*0.95, 1.1, 15); }
  else if(kind==='conf'){ banner('CONFERENCE CHAMPIONS!<small>On to the Super Bowl</small>'); confetti(140, FXC(), W*0.1, H*0.95, 1.0, 17); confetti(140, FXC(), W*0.9, H*0.95, 1.0, 17); setTimeout(()=>{ if(!cv) ensure(); confetti(120, FXC(), W/2, H*0.9, 1.6, 15); start(); }, 700); }
  else if(kind==='sb'){
   banner('🏆 SUPER BOWL CHAMPIONS! 🏆<small>The Lombardi Trophy is yours</small>');
   [0,500,1100].forEach(t=>setTimeout(()=>{ if(!cv) ensure(); confetti(170, GOLD.concat(FXC()), W*0.08, H*0.97, 1.0, 19); confetti(170, GOLD.concat(FXC()), W*0.92, H*0.97, 1.0, 19); start(); }, t));
   [300,900,1500,2100,2700,3300].forEach(t=>setTimeout(()=>{ if(!cv) ensure(); firework(W*(0.15+Math.random()*0.7), H*(0.15+Math.random()*0.35), GOLD.concat(['#4f8cff'])); start(); }, t));
   [1800,2600].forEach(t=>setTimeout(()=>{ if(!cv) ensure(); confetti(200, GOLD, W/2, H*0.95, 1.8, 17); start(); }, t));
  }
  start();
 }
 return {play, toast};
})();
function checkRewards(){
 const S = seasonState; if(!S || !S.teams) return; const user = seasonUserTeam(); if(!user) return;
 S.rewards = S.rewards || {}; const done = k=>{ if(S.rewards[k]) return false; S.rewards[k] = true; return true; };
 const won = g=> g.result && (g.home===user ? g.result.homeScore>g.result.awayScore : g.result.awayScore>g.result.homeScore);
 const lost = g=> g.result && (g.home===user ? g.result.homeScore<g.result.awayScore : g.result.awayScore<g.result.homeScore);
 if(S.phase==='regular' || S.phase==='regularReview'){
  const mine = S.schedule.filter(g=>g.played && g.result && (g.home===user||g.away===user)); if(!mine.length) return;
  let streak = 0; for(let i=mine.length-1;i>=0;i--){ if(won(mine[i])) streak++; else break; }
  const w = mine.filter(won).length, l = mine.filter(lost).length;
  if(streak>=3 && streak<=17 && [3,5,7,10,13,17].includes(streak) && done('streak'+streak)) FX.play(streak>=7?'medium':'small', streak===17?'Perfect season: 17-0!':`${streak} wins in a row!`);
  else if([5,10,13].includes(w) && done('wins'+w)) FX.play('small', `${w} wins on the season`);
  if(S.phase==='regularReview'){
   const e = S.seeds.AFC.concat(S.seeds.NFC).find(x=>x.team===user);
   if(e){
    if(e.seed===1 && done('seed1')) FX.play('medium', 'No. 1 seed: first-round bye!');
    else if(e.seed<=4 && done('div')) FX.play('medium', 'Division champions!');
    else if(done('clinch')) FX.play('small', 'You made the playoffs!');
   }
   if(w===17 && l===0 && done('perfect')) FX.play('medium','Perfect regular season: 17-0!');
  }
 } else if(S.phase==='playoffs'){
  const g = (S.playoffRounds.champ||[]).find(x=>x.result && (x.home===user||x.away===user));
  if(g && won(g) && done('conf')) FX.play('conf');
  else { for(const rk of ['wildcard','divisional']){ const gg = (S.playoffRounds[rk]||[]).find(x=>x.result && (x.home===user||x.away===user)); if(gg && won(gg) && done('po'+rk)) FX.play('small', rk==='wildcard'?'Playoff win! On to the divisional round':'Divisional round won! One win from the Super Bowl'); } }
 } else if(S.phase==='complete'){
  if(S.champion===user && !S.showReview && done('sb')){ FX.play('sb'); setTimeout(()=>{ const b = document.querySelector('.champion-banner'); if(b) b.classList.add('fxwon'); }, 50); }
 }
}
// ---- phone layout: any table that would need sideways scrolling becomes a stack of labelled cards ----
(function(){
 const mq = window.matchMedia('(max-width:760px)'); let busy = false, queued = false;
 function pass(){
  busy = true;
  try{
   document.querySelectorAll('table').forEach(t=>{
    if(!mq.matches){ if(t.classList.contains('mstack')) t.classList.remove('mstack'); return; }
    if(t.dataset.nostack) return;
    const bodyRows = t.querySelectorAll('tbody tr');
    const cols = t.rows.length ? t.rows[t.rows.length-1].cells.length : 0;
    const parentW = t.parentElement ? t.parentElement.clientWidth : 0;
    const fits = t.scrollWidth <= parentW + 1;
    // Once a table is stacked it stays stacked, unless it genuinely fits with few columns.
    const stack = !(fits && (cols<=3 || !t.tHead));
    if(!stack){ if(t.classList.contains('mstack')) t.classList.remove('mstack'); return; }
    const heads = t.tHead && t.tHead.rows.length ? Array.from(t.tHead.rows[t.tHead.rows.length-1].cells).map(c=>c.textContent.trim()) : [];
    // Every render replaces the cells, so labels have to be reapplied each time. Checking
    // the first row is cheap and catches a re-render that keeps the same row count, which
    // a row-count signature missed: wide tables then showed bare numbers on phones with
    // no way to tell the columns apart.
    const firstRow = bodyRows[0];
    const missing = !!(firstRow && heads.length && Array.from(firstRow.cells).some((c,i)=>heads[i] && c.dataset.label!==heads[i]));
    if(missing) bodyRows.forEach(r=>{ Array.from(r.cells).forEach((c,i)=>{ if(heads[i] && c.dataset.label!==heads[i]) c.dataset.label = heads[i]; }); });
    t.classList.add('mstack');
   });
  } finally { busy = false; }
 }
 function schedule(){ if(queued || busy) return; queued = true; setTimeout(()=>{ queued = false; pass(); }, 150); }
 new MutationObserver(schedule).observe(document.body, {childList:true, subtree:true});
 window.addEventListener('resize', schedule); schedule();
})();
setActiveTab('viewDraft','tabDraftBtn');

// ================= Z-POST-BLUE V11-B (Owner rounds 6+7) =================

// 100 Seasons league table: logo rank bars, no numbers
window.zpbLeagueBarsHTML = function(avgW, T, N, user){
 const names = Object.keys(avgW).sort((a,b)=>avgW[b]-avgW[a]);
 const best = Math.max(0.1, ...names.map(n=>avgW[n]));
 const zlg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
 return '<div class="zpb-100bars">' + names.map(n=>{
  const t = T[n] || {po:0,sbApp:0,champ:0};
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(n) : null;
  const uv = pk ? '--zrb:'+pk.accL+';--zr1:'+pk.r1+';' : '';
  return '<div class="zpb-100bar'+(n===user?' zpb-100merow':'')+'" style="'+uv+'" title="Playoffs '+Math.round(t.po/N*100)+'% \u00b7 Super Bowl '+Math.round(t.sbApp/N*100)+'% \u00b7 Titles '+Math.round(t.champ/N*100)+'%">'
   + '<span class="zpb-100name">'+zlg(n)+nick(n)+'</span>'
   + '<span class="tr"><i style="width:'+(avgW[n]/best*100).toFixed(1)+'%;"></i></span>'
   + '<span class="score">'+avgW[n].toFixed(1)+'</span></div>';
 }).join('') + '</div>';
};

// Season review: every metric, draft-board depth-chart order, clickable with a breathing explanation
window.zpbMetricsHTML = function(){
 try{
  const user = seasonUserTeam(), S = seasonState;
  const R = S.unitRatings[user], rk = S.unitRanks[user];
  const ORDER = ['qb','rb','rec','olRun','olPass','passRush','frontRun','coverage','kicker'];
  const mine = (typeof teamPlayerStats==='function') ? teamPlayerStats(user) : [];
  const KEYOF = {qb:['QB'],rb:['RB'],rec:['WR','TE'],olRun:['OL'],olPass:['OL'],passRush:['DL'],frontRun:['DL','LB'],coverage:['DB'],kicker:['K']};
  const pk = (typeof zpbPackFor==='function') ? zpbPackFor(user) : null;
  const uv = pk ? '--zrb:'+pk.accL+';--zr1:'+pk.r1+';' : '';
  const tiles = ORDER.map(u=>{
   const r0 = rk[u]||32;
   return '<button type="button" class="zpb-met'+(r0>=25?' zpb-met-bad':'')+'" data-u="'+u+'" style="'+uv+'">'+UNIT_INFO[u].label+'<i></i></button>';
  }).join('');
  window.__zpbMetData = {user, ORDER, KEYOF, mine};
  return '<div class="zpb-metgrid">'+tiles+'</div><div class="zpb-metpop" id="zpbMetPop"></div>';
 }catch(err){ return ''; }
};
(function(){
 let hideT = null;
 const show = btn=>{
  const pop = document.getElementById('zpbMetPop'); if(!pop) return;
  const D = window.__zpbMetData || {};
  const u = btn.dataset.u, user = D.user || seasonUserTeam(), S = seasonState;
  const R = S.unitRatings[user], lg = S.league, rk = S.unitRanks[user];
  const rank = rk[u]||32, diff = Math.round((R[u]-lg[u])*10)/10;
  let who = '';
  try{
   const groups = (D.KEYOF && D.KEYOF[u]) || [];
   const cands = (D.mine||[]).filter(p=>groups.includes(p.group));
   let key = null;
   if(u==='passRush') key = cands.slice().sort((a,b)=>(b.st.sack||0)-(a.st.sack||0))[0];
   else if(u==='coverage') key = cands.slice().sort((a,b)=>((b.st.dint||0)*3+(b.st.pd||0))-((a.st.dint||0)*3+(a.st.pd||0)))[0];
   else if(u==='olRun') key = cands.slice().sort((a,b)=>(b.st.rbk||0)-(a.st.rbk||0))[0];
   else if(u==='olPass') key = cands.slice().sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];
   else key = cands.slice().sort((a,b)=>(b.ovr||0)-(a.ovr||0))[0];
   if(key) who = rank<=12 ? ' — '+key.name+' led the team there' : '';
  }catch(e){}
  pop.classList.remove('zpb-popin'); void pop.offsetWidth;
  pop.innerHTML = '<b>#'+rank+'</b> in the league \u00b7 '+Math.round(R[u])+' ('+(diff>=0?'+':'\u2212')+Math.abs(diff)+' vs league)'+who;
  pop.classList.add('zpb-popin');
  clearTimeout(hideT); hideT = setTimeout(()=>pop.classList.remove('zpb-popin'), 6500);
 };
 document.addEventListener('click', e=>{ const b = e.target.closest('.zpb-met'); if(b) show(b); });
 document.addEventListener('mouseover', e=>{ const b = e.target.closest('.zpb-met'); if(b) show(b); });
})();

// Game preview: the stars as player cards, one per line — season stats, or just OVR in week 1
function starsFaceoffHTML(g){
 try{
  const lg = tm=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(tm) : '';
  const stv = (typeof zpbRowVars==='function') ? zpbRowVars : function(){ return ''; };
  const colOf = t=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(t) : null; return pk ? pk.accL : 'var(--accent)'; };
  const pre = seasonState && seasonState.currentWeek===1 && !seasonState.weekSimulated;
  const cardsOf = team=>{
   let rows = [];
   try{ rows = teamPlayerStats(team).filter(r=>r.group!=='OL'&&r.ovr).sort((a,b)=>(b.ovr||0)-(a.ovr||0)).slice(0,5); }catch(e){}
   if(!rows.length){
    try{
     const sm = seasonState.teams[team].slotmap;
     rows = ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {name:e.name, group:SLOT_POS[sl]||sl, ovr:e.ovr, st:{}, gp:0, slot:sl} : null; })
      .filter(Boolean).filter(e=>e.ovr>=80).sort((a,b)=>b.ovr-a.ovr).slice(0,5);
    }catch(e2){}
   }
   return rows.map(r=>{
    const star90 = (r.ovr||0)>=90, col = colOf(team);
    const chips = (!pre && r.gp>0 && typeof seasonStatLine==='function') ? seasonStatLine(r.group, r.st||{}).split(', ').filter(Boolean).slice(0,4) : [];
    return '<div class="zpb-pcard zpb-pvcard" style="'+stv(team)+'">'
     + '<div class="zpb-pcard-hd"><b class="'+(star90?'zpb-shm':'')+'">'+r.name+'</b>'
     + (star90 ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+col+'">\u2605</span>' : '')
     + '<span class="zpb-poschip">'+(LABELS[r.slot] || r.group || SLOT_POS[r.slot] || r.slot || 'Starter')+'</span></div>'
     + '<div class="zpb-pcard-rt">'+(pre||!r.gp ? (r.ovr||'\u2013') : (r._rating!=null?Math.round(r._rating):Math.round(r.ovr||0)))+'<i>'+(pre||!r.gp ? 'OVR' : '#'+(r._rank||'\u2013')+' '+r.group)+'</i></div>'
     + (chips.length ? '<div class="zpb-pcard-stats">'+chips.map(c=>'<span>'+c+'</span>').join('')+'</div>' : '')
     + '</div>';
   });
  };
  const AW = cardsOf(g.away), HM = cardsOf(g.home);
  const N = Math.max(AW.length, HM.length);
  const empty = '<div class="zpb-pvcard zpb-pvempty"></div>';
  let rowsHTML = '';
  for(let i=0;i<N;i++) rowsHTML += '<div class="zpb-pvfrow">'+(AW[i]||empty)+(HM[i]||empty)+'</div>';
  // w19 (Owner): the stars face each other across the row, not stacked; the "player by player" note is gone
  return '<div class="zpb-pvwrap"><div class="zpb-pvface"><span class="zpb-pvteamhd" style="'+stv(g.away)+'">'+lg(g.away)+'<b>'+nick(g.away)+'</b></span>'
   + '<span class="zpb-pvvs">VS</span>'
   + '<span class="zpb-pvteamhd" style="'+stv(g.home)+'"><b>'+nick(g.home)+'</b>'+lg(g.home)+'</span></div>'
   + (rowsHTML || '<div class="narr" style="padding:10px;">No rated starters</div>') + '</div>';
 }catch(err){ return ''; }
}


// Game review: key players as the same cards, game stats, and a guaranteed player of the game
renderKeyPlayersHTML = function(g){
 try{
  const det = g.detail || {};
  let mvp = det.mvp;
  if(!mvp){
   const cands = ((det.home&&det.home.players)||[]).concat((det.away&&det.away.players)||[]);
   mvp = cands.slice().sort((a,b)=>(b.impact||0)-(a.impact||0))[0] || null;
  }
  if(!mvp) return '';
  const lg = n=> (typeof zpbTeamLogo==='function') ? zpbTeamLogo(n) : '';
  const stv = (typeof zpbRowVars==='function') ? zpbRowVars : function(){ return ''; };
  const colOf = t=>{ const pk = (typeof zpbPackFor==='function') ? zpbPackFor(t) : null; return pk ? pk.accL : 'var(--accent)'; };
  const card = (p, team, star)=>{
   const col = colOf(p.team||team);
   const chips = (p.line||'').split(', ').filter(Boolean).slice(0,5);
   return '<div class="zpb-pcard zpb-pvcard" style="'+stv(p.team||team)+'">'
    + '<div class="zpb-pcard-hd"><b class="'+(star?'zpb-shm':'')+'">'+p.name+'</b>'
    + (star ? '<span class="zpb-cstar zpb-shm" style="--zrb:'+((typeof zpbPackFor==='function'&&zpbPackFor(p.team||team))?(zpbPackFor(p.team||team).acc2L||col):col)+'">\u2605</span>' : '')
    + '<span class="zpb-poschip">'+(p.group||'')+'</span></div>'
    + (chips.length ? '<div class="zpb-pcard-stats">'+chips.map(c=>'<span>'+c+'</span>').join('')+'</div>' : '')
    + '</div>';
  };
  let mvpShown = false;
  const side = (sd, team)=>{
   const rows = (typeof notablePlayers==='function') ? notablePlayers(det[sd]||{}) : [];
   let list = rows.slice();
   list = list.filter((p,i)=> list.findIndex(q=>q.name===p.name && (q.team||team)===(p.team||team))===i);   // one row per player
   if(mvp && !list.some(p=>p.name===mvp.name)) list = [mvp].concat(list);
   return '<div class="kp-card"><div class="kp-title" style="'+stv(team)+'">'+lg(team)+'<b>'+team+'</b></div>'
    + '<div class="zpb-pvcards">'+list.map(p=>{
        const isM = mvp && p.name===mvp.name && (p.team||team)===mvp.team;
        const star = isM && !mvpShown;
        if(isM) mvpShown = true;
        return card(p, team, star);
      }).join('')+'</div></div>';
  };
  return '<h4 style="margin:14px 0 8px;">Key Players</h4><div class="kp-grid">'+side('away', g.away)+side('home', g.home)+'</div>';
 }catch(err){ return ''; }
};

// Awards: the same card language, no white, no prose
renderRegularAwardsHTML = function(A, open){
 try{
  const user = seasonUserTeam();
  const stv = (typeof zpbRowVars==='function') ? zpbRowVars : function(){ return ''; };
  const aw = (title, name, team, sub, why, star, rec, stackTitle)=>'<div class="zpb-pcard zpb-awcard" style="'+stv(team||'')+'">'
   + (stackTitle
      ? '<span class="zpb-awt"><span class="zpb-mvptitle zpb-shm">Most<br>Valuable<br>Player</span></span>'
      : '<span class="zpb-awt">'+title+'</span>')
   + '<span class="zpb-awm">'
   + '<b class="'+(star?'zpb-shm':'')+'">'+name+'</b>'
   + (sub?'<span class="narr">'+sub+'</span>':'') + (why?'<span class="narr">'+why+'</span>':'')
   + (rec?'<div class="zpb-schiprow" style="margin-top:6px;">'+zpbStatChipsHTML(rec)+'</div>':'')
   + '</span></div>'; // w19 (Owner): the stat line reads as badges; the MVP title stacks three shimmering words
  const ind = A.individual.map(a=> a.c
   ? aw(a.title, a.c.name, a.c.team, a.c.pos, a.why, a.c.team===user, a.c.rec||null, a.title==='Most Valuable Player')
   : aw(a.title, (a.coach? a.coach+' \u00b7 ':'')+(a.team||''), a.team, '', a.why, a.team===user)).join('');
  const stat = A.stat.map(a=>aw(a.title, a.name, a.team, a.line, '', a.team===user)).join('');
  const us = A.userSummary;
  const usTxt = (us.mine.length||us.ap1||us.ap2||us.pb)
   ? (user+': '+us.ap1+' First-Team All-Pro, '+us.ap2+' Second-Team All-Pro, '+us.pb+' Pro Bowl selection'+(us.pb===1?'':'s')+(us.mine.length?' — '+us.mine.join('; '):'')+'.')
   : ('No '+user+' players earned league-wide honors this year.');
  const posRows = (box, shm)=> HONOR_ORDER.map(pos=>'<div class="zpb-aprow"><span class="zpb-apos">'+pos+'</span>'
    + ((box[pos]||[]).length ? box[pos].map(c=>'<span class="zpb-apchip" style="'+stv(c.team)+'">'+(shm?'<b class="zpb-shm">'+c.name+'</b>':c.name)+' <i class="narr">'+nick(c.team)+'</i></span>').join('') : '<span class="narr">\u2014</span>')+'</div>').join(''); // w19: first-team All-Pro names always shimmer
  return '<details class="panel" style="margin-bottom:14px;" '+(open?'open':'')+'><summary style="cursor:pointer;font-weight:700;">Regular-Season Awards &amp; Honors</summary>'
   + '<p class="narr" style="margin:8px 0;">'+usTxt+'</p>'
   + '<div class="zpb-awgrid">'+ind+'</div>'
   + '<h5 class="narr" style="margin:14px 0 4px;">Statistical champions</h5><div class="zpb-awgrid">'+stat+'</div>'
   + '<div class="draft-columns" style="grid-template-columns:1fr 1fr;margin-top:14px;gap:14px;">'
   + '<div><h5 class="narr" style="margin:0 0 4px;">First-Team All-Pro</h5>'+posRows(A.allPro.first, true)+'</div>'
   + '<div><h5 class="narr" style="margin:0 0 4px;">Second-Team All-Pro</h5>'+posRows(A.allPro.second)+'</div>'
   + '<div><h5 class="narr" style="margin:0 0 4px;">Pro Bowl \u2014 AFC</h5>'+posRows(A.proBowl.AFC)+'</div>'
   + '<div><h5 class="narr" style="margin:0 0 4px;">Pro Bowl \u2014 NFC</h5>'+posRows(A.proBowl.NFC)+'</div>'
   + '</div></details>';
 }catch(err){ return ''; }
};

renderPlayoffAwardsHTML = function(P){
 try{
  const user = seasonUserTeam();
  const stv = (typeof zpbRowVars==='function') ? zpbRowVars : function(){ return ''; };
  const aw = (title, p, sub2, star)=>'<div class="zpb-pcard zpb-awcard" style="'+stv(p?p.team:'')+'">'
   + '<span class="zpb-awt">'+title+'</span><span class="zpb-awm">'
   + (p?'<b class="'+(star?'zpb-shm':'')+'">'+p.name+'</b><span class="narr">'+(p.group?p.group+' \u00b7 ':'')+(p.line||sub2||'')+'</span>':('<b>'+(sub2||'\u2014')+'</b>'))
   + '</span></div>';
  const cards = [];
  if(P.sbMvp) cards.push(aw('Super Bowl MVP', P.sbMvp, (P.sbMvp.game? P.sbMvp.game.away+' '+P.sbMvp.game.result.awayScore+', '+P.sbMvp.game.home+' '+P.sbMvp.game.result.homeScore : ''), P.sbMvp.team===user));
  if(P.mvp) cards.push(aw('Postseason MVP', P.mvp, 'cumulative impact', P.mvp.team===user));
  (P.rounds||[]).forEach(r=> r.items.forEach(i=> cards.push(aw(i.g.roundLabel||r.label, i.p, i.g.away+' '+i.g.result.awayScore+', '+i.g.home+' '+i.g.result.homeScore, i.p && i.p.team===user))));
  const lead = (P.leaders||[]).map(a=>aw(a.title, a, '', a.team===user)).join('');
  const team = (P.team||[]).map(a=>'<div class="zpb-aprow"><span class="zpb-apos">'+a.pos+'</span><span class="zpb-apchip" style="'+stv(a.team)+'">'+a.name+' <i class="narr">'+nick(a.team)+'</i></span></div>').join('');
  return '<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Playoff Awards</h3>'
   + '<div class="zpb-awgrid">'+cards.join('')+'</div>'
   + (lead?'<h5 class="narr" style="margin:14px 0 4px;">Postseason statistical leaders</h5><div class="zpb-awgrid">'+lead+'</div>':'')
   + (team?'<h5 class="narr" style="margin:14px 0 4px;">All-Playoff Team <span style="font-weight:400;">(by cumulative game impact)</span></h5>'+team:'')
   + '</div>';
 }catch(err){ return ''; }
};

// Safety net: no draft slot may sit empty once the season begins (the Cardinals WR1 class of bug)
window.zpbFillAllLineups = function(){
 if(typeof draftSim==='undefined' || !draftSim || !draftSim.rosters) return;
 if(typeof ROSTER_SLOTS==='undefined' || typeof WV_SLOT_GROUP==='undefined') return;
 (draftSim.rosters||[]).forEach(r=>{
  const sm = r.slots || {};
  const used = new Set(Object.keys(sm).filter(k=>sm[k]).map(k=> Array.isArray(sm[k]) ? sm[k][0] : sm[k].name));
  ROSTER_SLOTS.forEach(s=>{
   if(sm[s]) return;
   const g = WV_SLOT_GROUP[s];
   let best = null, bestO = -1e9;
   (draftSim.pool||[]).forEach(p=>{
    if(used.has(p[0])) return;
    const fit = (WV_TAG_GROUP[p[1]]===g) ? p[3] : p[3]-9;
    if(fit > bestO){ bestO = fit; best = p; }
   });
   if(best){ sm[s] = [best[0], best[1], best[2], best[3]]; used.add(best[0]); }
  });
 });
};


// ---- w13 add-on (was a second <script>) ----

// ================= Z-POST-BLUE v13 (wave 13) =================
// helpers first: palette lightness lift + deterministic display yardage
window.zpbLift = function(hex, minL){
 try{
  const c = zpbHsl(hex);
  if(!c || c.l >= minL) return hex;
  return zpbFromHsl(c.h, c.s, minL);
 }catch(err){ return hex; }
};
// W13-9: "x yds" for the cinematic replay — display-only, deterministic per event
window.zpbCineYds = function(e, kind){
 try{
  const seed = ((e.q||1)*97 + Math.round((e.t||0)*1000) + (e.side==='home'?7:13) + (e.pts||0)*31) % 997;
  const r = (seed % 1000) / 1000;
  if(kind==='fg')   return (19 + Math.floor(r*35)) + ' yds';
  if(kind==='run')  return (1 + Math.floor(Math.pow(r,1.6)*70)) + ' yds';
  return (3 + Math.floor(Math.pow(r,1.35)*78)) + ' yds';
 }catch(err){ return ''; }
};
// W13-1: the Owner's 26-step cumulative series as ranking entries (P and FB sit outside it)
window.zpbSeriesSteps = function(){
 if(typeof slotWins !== 'function' || typeof ROSTER_SLOTS === 'undefined') return [];
 const SKIP = {P:1, FB:1};
 const rows = ROSTER_SLOTS.filter(s=>!SKIP[s]).map(s=>({s, w: slotWins(s,90)-slotWins(s,70)}))
   .filter(r=>r.w>0.001).sort((a,b)=>b.w-a.w);
 let acc = [];
 return rows.map((r,i)=>{
  acc.push((typeof LABELS!=='undefined' && LABELS[r.s]) || r.s);
  return {n:i+1, slots: rows.slice(0,i+1).map(x=>x.s), label: acc.join(' + ')};
 });
};
window.zpbSeriesSelectHTML = function(){
 const steps = window.zpbSeriesSteps();
 if(!steps.length) return '';
 window.__zpbSeriesSteps = steps;
 let h = '<div class="zpb-sessel"><select id="zpbSeriesSel" aria-label="Ranking series">';
 h += '<option value="all">MODEL · ALL SLOTS</option>';
 steps.forEach(st=>{ h += '<option value="'+st.n+'">'+st.n+' '+st.label+'</option>'; });
 return h + '</select></div>';
};
document.addEventListener('change', e=>{
 const sel = e.target && e.target.id==='zpbSeriesSel' ? e.target : null;
 if(!sel || !window.__zpbSeriesSteps || typeof modelWeights !== 'function' || typeof render !== 'function') return;
 const mw = modelWeights();
 if(sel.value === 'all'){ weights = {...mw}; }
 else {
  const st = window.__zpbSeriesSteps[+sel.value - 1];
  if(!st) return;
  const set = new Set(st.slots);
  weights = {...mw};
  Object.keys(weights).forEach(k=>{ if(!set.has(k)) weights[k] = 0; });
 }
 const el = document.getElementById('controls');
 if(el) el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; });
 render();
});
// buildControls runs before this payload loads: rebuild once so the series select lands,
// and re-inject whenever the controls panel is re-rendered without it
(function(){
 const inject = ()=>{
  const el = document.getElementById('controls');
  if(!el || document.getElementById('zpbSeriesSel')) return;
  if(typeof buildControls !== 'function') return;
  try{ buildControls(); }catch(err){}
 };
 inject();
 if('MutationObserver' in window){
  new MutationObserver(inject).observe(document.body, {childList:true, subtree:true});
 }
})();
// W13-3: three-state weights buttons (inert -> armed -> MY WEIGHTS saved)
window.zpbWDirty = false;
window.zpbWeights3State = function(mode){
 const save = document.getElementById('personalWBtn');
 if(!save) return;
 if(mode==='init'){ save.classList.add('zpb-winert'); save.disabled = true; }
 else if(mode==='dirty'){ save.classList.remove('zpb-winert'); save.disabled = false; }
 else if(mode==='saved'){
  save.classList.add('zpb-winert'); save.disabled = true;
  let my = document.getElementById('zpbMyWBtn');
  if(!my && save.parentNode){
   my = document.createElement('button'); my.id = 'zpbMyWBtn'; my.className = 'resetbtn';
   my.style.marginLeft = '6px';
   my.addEventListener('click', ()=>{ if(!personalWeights) return; weights = {...personalWeights}; const el=document.getElementById('controls'); if(el) el.querySelectorAll('input[data-slot]').forEach(inp=>{ inp.value = weights[inp.dataset.slot]; }); if(typeof render==='function') render(); });
   save.parentNode.insertBefore(my, save.nextSibling);
  }
  if(my) my.textContent = 'MY WEIGHTS';
 }
 else if(mode==='model'){ /* model loaded: stays inert until the next manual change */ }
};
document.addEventListener('input', e=>{
 const t = e.target;
 if(t && t.matches && t.matches('#controls input[data-slot]')){
  window.zpbWDirty = true;
  if(typeof zpbWeights3State === 'function') zpbWeights3State('dirty');
 }
}, true);
(function(){
 if(!('MutationObserver' in window)) return;
 const mo = new MutationObserver(()=>{
  const b = document.getElementById('personalWBtn');
  if(!b || b.dataset.zw13) return;
  b.dataset.zw13 = '1';
  zpbWeights3State(window.zpbWDirty ? 'dirty' : (personalWeights ? 'saved' : 'init'));
 });
 mo.observe(document.body, {childList:true, subtree:true});
})();
// W13-4: welcome to the draft — WELCOME / TO THE DRAFT / DRAFT, equidistant from center
// W14-1 (restored) + W15: WELCOME / TO THE / DRAFT stacked dead center; 'welcome to the' fades out
// together, DRAFT rises slowly to the center, and done() — the CPU kickoff — fires the instant DRAFT
// begins to fade. A tap anywhere skips (fast fade, immediate kickoff). Fallbacks: reduced motion or
// a repeat call fire done() right away, so the draft can never be left waiting on the cinematic.
window.zpbWelcomeCine = function(done){
 const fire = ()=>{ setTimeout(()=>{ try{ if(typeof done==='function') done(); }catch(err){} }, 0); };
 if(window._zpbWelDone){ fire(); return; } window._zpbWelDone = true;
 if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){ fire(); return; }
 if(typeof window._zpbWelCleanup==='function') window._zpbWelCleanup();
 const ov = document.createElement('div'); ov.className = 'zpb-fin zpb-fin-welcome';
 ['WELCOME','TO THE','DRAFT'].forEach(t=>{ const p = document.createElement('p'); p.innerHTML = t; ov.appendChild(p); });
 document.body.appendChild(ov);
 const ps = [...ov.querySelectorAll('p')], timers = [];
 const at = (ms, fn)=>{ timers.push(setTimeout(fn, ms)); };
 window._zpbWelCleanup = ()=>{ timers.forEach(clearTimeout); window._zpbWelCleanup = null; try{ ov.remove(); }catch(err){} };
 const beginFade = (fast)=>{
  if(ov.dataset.fading) return; ov.dataset.fading = '1';
  fire(); // the CPU draft starts exactly when DRAFT begins to fade — never behind the cinematic
  try{ ps[2].classList.add('zpb-draft-fade'); ov.classList.add('zpb-fin-fadebg'); }catch(err){}
  if(fast){ ov.style.transition = 'opacity .45s ease'; setTimeout(()=>{ try{ ov.remove(); }catch(err){} }, 480); }
 };
 ov.addEventListener('pointerdown', ()=>{ try{ ps.forEach(p=>p.classList.add('zpb-fin-in')); }catch(err){} beginFade(true); });
 at(100,  ()=>ps[0].classList.add('zpb-fin-in'));        // WELCOME
 at(450,  ()=>ps[1].classList.add('zpb-fin-in'));        // TO THE
 at(800,  ()=>ps[2].classList.add('zpb-fin-in'));        // DRAFT
 at(3400, ()=>{ try{ ov.classList.add('zpb-wt-out'); }catch(err){} });   // 'welcome to the' fades out together
 at(4100, ()=>{ try{ ps[2].classList.add('zpb-draft-center'); }catch(err){} }); // DRAFT rises slowly to the center
 at(7400, ()=>beginFade(false));                         // DRAFT starts to fade — the CPU draft may begin
 at(9300, ()=>{ try{ ov.remove(); }catch(err){} window._zpbWelCleanup = null; });
};
// (the old sequential cine was retired in wave 15)
// W15-2: WHERE THEY LINE UP — plain field map + what the abbreviations mean (Owner: no duty sentences).
// W15-2: WHERE THEY LINE UP — plain field map + what the abbreviations mean (Owner: no duty sentences).
// W18: WRs line out ON the line (2 right, 1 left), CBs mirrored opposite and wider; CB3 is NICKEL;
// DIME sits on its own deep station; every station carries its flex chips (gold FREE -> wine -6).
window.zpbFieldMapHTML = function(){
 const FM_FLEX = {
  QB:[[6,'WR, S']], RB:[[2,'FB'],[4,'WR'],[6,'TE']],
  WR:[[4,'RB, TE, S, Nickel, Dime'],[6,'CB']], TE:[[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime']],
  OT:[[0,'OG, C'],[4,'DT, FB']], OG:[[0,'C'],[4,'OT, DT, FB']], C:[[0,'OG'],[4,'OT, DT, FB']],
  DT:[[4,'OG, C, DE, FB'],[6,'OT']], DE:[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB, FB'],[6,'TE, RB, Nickel']],
  MIKE:[[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S, Nickel, Dime']],
  OLB:[[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE, Nickel'],[6,'DT, TE, S, FB, Dime']],
  SS:[[0,'Nickel, Dime'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']],
  FS:[[0,'Nickel, Dime'],[2,'SS'],[4,'CB, WR']], CB:[[0,'FS, Nickel, Dime'],[2,'SS'],[4,'WR']],
  NICKEL:[[0,'CB, SS, FS']], DIME:[[0,'CB, SS, FS']], FB:[[4,'RB, TE']], K:[[0,'P']], P:[[2,'K']]
 };
 const cls = c => c===0 ? 'zpb-ft-free' : c===2 ? 'zpb-ft-2' : c===4 ? 'zpb-ft-4' : 'zpb-ft-6';
 const tag = c => c===0 ? 'FREE' : (c===2 ? '\u22122' : c===4 ? '\u22124' : '\u22126');
 const chipOf = (fam, r) => '<i class="zpb-ftchip '+cls(r[0])+'" title="'+fam+' plays '+r[1]+' at '+tag(r[0])+'">'+tag(r[0])+' '+r[1]+'</i>';
 const strip = fams => { const groups = fams.filter(f=>FM_FLEX[f]).map(f=>'<span class="zpb-fm-grp"><b>'+f+'</b>'+FM_FLEX[f].map(r=>chipOf(f,r)).join('')+'</span>');
  return groups.length ? '<div class="zpb-fm-rowflex">'+groups.join('')+'</div>' : ''; };
 const row = (a, cls) => '<div class="zpb-fm-row'+(cls?' '+cls:'')+'">' + a.map(x=>'<i>'+x+'</i>').join('') + '</div>';
 return '<div class="zpb-fm" role="img" aria-label="Field map: where each position lines up">'
  + '<div class="zpb-fm-side zpb-fm-off">'
  + row(['RB']) + strip(['RB'])
  + row(['QB']) + strip(['QB'])
  + row(['WR','OT','OG','C','OG','OT','TE','WR','WR'], ' zpb-fm-line') + strip(['WR','OT','OG','C','TE'])
  + '</div>'
  + '<div class="zpb-fm-scrim"><span>LINE OF SCRIMMAGE</span></div>'
  + '<div class="zpb-fm-side zpb-fm-def">'
  + row(['DE','DT','DT','DE']) + strip(['DE','DT'])
  + row(['CB','NICKEL','CB'], ' zpb-fm-wide') + strip(['CB','NICKEL'])
  + row(['WILL','MIKE','SAM']) + strip(['OLB','MIKE'])
  + row(['DIME']) + strip(['DIME'])
  + row(['FS','SS']) + strip(['FS','SS'])
  + '</div>'
  + strip(['FB','K','P'])
  + '</div>'
  + '<div class="zpb-fm-legend">'
  + '<div class="zpb-fm-lh">OFFENSE</div>'
  + '<span><b>QB</b> Quarterback</span>'
  + '<span><b>RB</b> Running Back</span>'
  + '<span><b>WR</b> Wide Receiver</span>'
  + '<span><b>TE</b> Tight End</span>'
  + '<span><b>OT</b> Offensive Tackle</span>'
  + '<span><b>OG</b> Offensive Guard</span>'
  + '<span><b>C</b> Center</span>'
  + '<div class="zpb-fm-lh">DEFENSE</div>'
  + '<span><b>DE</b> Defensive Edge</span>'
  + '<span><b>DT</b> Defensive Tackle (NT in a 3-4)</span>'
  + '<span><b>MIKE</b> Middle Linebacker (ILB in a 3-4)</span>'
  + '<span><b>WILL / SAM</b> Outside Linebackers (OLB in a 3-4)</span>'
  + '<span><b>NICKEL</b> Nickel Cornerback (CB3)</span>'
  + '<span><b>DIME</b> Dime Cornerback (CB4)</span>'
  + '<span><b>FS</b> Free Safety</span>'
  + '<span><b>SS</b> Strong Safety</span>'
  + '<div class="zpb-fm-lh">FLEX</div>'
  + '<span><b>FREE</b> plays there free</span>'
  + '<span><b>\u22122 / \u22124 / \u22126</b> rating points lost playing elsewhere</span>'
  + '</div>';
};
// W17: the Owner's position board — categories -> position cards (awards-badge language).
// Chips = the flex chart (gold FREE -> wine -6, one-way: the position playing elsewhere).
// Hover/focus a card for the job it does; nothing sentence-long is visible on the board.
// Display-only: the sim engine is untouched (Owner, 26 Oct 2026).
window.zpbDimeOf = function(slotmap){
 try{
  if(!slotmap) return null;
  if(slotmap.CB4) return slotmap.CB4;
  const ovrOf = p => Array.isArray(p) ? p[3] : (p && p.ovr != null ? p.ovr : 0);
  const posOf = p => Array.isArray(p) ? p[1] : (p && p.pos) || null;
  const cbs = Object.keys(slotmap).map(k=>slotmap[k]).filter(p=>p && posOf(p)==='CB');
  cbs.sort((a,b)=>ovrOf(b)-ovrOf(a));
  return cbs.length>=4 ? cbs[3] : null;
 }catch(err){ return null; }
};
window.zpbDimeCell = function(slotmap, c, s){
 if(s && s!=='CB4') return c || {text:'\u2014', val:70};
 if(c && c.text && c.text!=='\u2014') return c;
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 if(!d) return c || {text:'\u2014', val:70};
 const e = (typeof normalizeSlotEntry==='function') ? normalizeSlotEntry(d) : null;
 return (e && e.name!=null) ? {text:`${e.name} ${e.ovr}`, val:e.ovr} : (c || {text:'\u2014', val:70});
};
window.zpbDimeRow = function(slotmap){
 const d = window.zpbDimeOf ? window.zpbDimeOf(slotmap) : null;
 const e = d ? normalizeSlotEntry(d) : null;
 const nm = (e && e.name!=null) ? `${e.name} (${e.ovr})` : ''; // w19 (Owner): no dash placeholder on an empty Dime
 return `<div class="depth-row zpb-dimerow"><span class="slotname">Dime</span><span class="${e&&e.name!=null?'playername':'empty'}">${nm}</span></div>`;
};
window.zpbDimeDrafRow = function(roster){
 const d = window.zpbDimeOf ? window.zpbDimeOf(roster.slots) : null;
 return `<div class="depth-row dgrid zpb-dimerow"><span class="slotname">Dime</span><span class="${d?'playername':'empty'}">${d?d[0]:''}</span><span class="dovr">${d?d[3]:''}</span><span class="narr dwar"></span></div>`; // w19 (Owner): no box, no dash, no PKG chip
};
window.zpbFlexTree = function(){
 const cls = c => c===0 ? 'zpb-ft-free' : c===2 ? 'zpb-ft-2' : c===4 ? 'zpb-ft-4' : 'zpb-ft-6';
 const tag = c => c===0 ? 'FREE' : (c===2 ? '\u22122' : c===4 ? '\u22124' : '\u22126');
 const CARDS = {
  QB:{n:'Quarterback', tip:'Touches the ball on every offensive snap \u2014 throws it, hands it off, or runs it.', rows:[[6,'WR, S']]},
  RB:{n:'Running Back', tip:'Carries the ball and catches short passes out of the backfield.', rows:[[2,'FB'],[4,'WR'],[6,'TE']]},
  FB:{n:'Fullback', tip:'Leads the block for the runner and catches the occasional short pass.', rows:[[4,'RB, TE']]},
  WR:{n:'Wide Receiver', tip:'Runs the routes and catches the ball downfield.', rows:[[4,'RB, TE, S, Nickel, Dime'],[6,'CB']]},
  TE:{n:'Tight End', tip:'Blocks like a lineman and catches like a receiver.', rows:[[2,'WR, FB'],[6,'RB, C, OG, OT, DE, DT, LB, S, Nickel, Dime']]},
  OT:{n:'Offensive Tackle', tip:"Protects the quarterback's blind side and blocks the edge on runs.", rows:[[0,'OG, C'],[4,'DT, FB']]},
  OG:{n:'Offensive Guard', tip:'Blocks the interior \u2014 pass protection first, run blocking a close second.', rows:[[0,'C'],[4,'OT, DT, FB']]},
  C:{n:'Center', tip:'Anchors the line, makes the protection calls, and snaps the ball.', rows:[[0,'OG'],[4,'OT, DT, FB']]},
  DT:{n:'Defensive Tackle', tip:'Takes on blockers inside \u2014 stops runs first, pressures the quarterback second.', rows:[[4,'OG, C, DE, FB'],[6,'OT']]},
  DE:{n:'Defensive Edge', tip:'Rushes the passer off the edge and sets the edge against the run.', rows:[[2,'DT, WILL, SAM, OLB'],[4,'MIKE, ILB, FB'],[6,'TE, RB, Nickel']]},
  MIKE:{n:'MIKE / ILB', tip:'The middle linebacker \u2014 makes the calls, stops the run, covers the middle.', rows:[[0,'ILB, WILL, SAM, OLB'],[4,'DT, FB'],[6,'DE, TE, S, Nickel, Dime']]},
  OLB:{n:'WILL / SAM / OLB', tip:'The outside linebackers \u2014 chase runs, cover backs and tight ends, sometimes rush.', rows:[[0,'OLB, WILL, SAM'],[2,'MIKE'],[4,'DE, Nickel'],[6,'DT, TE, S, FB, Dime']]},
  SS:{n:'Strong Safety', tip:'The box safety \u2014 supports against the run and covers tight ends and backs.', rows:[[0,'Nickel, Dime'],[2,'FS'],[4,'WILL, SAM, OLB'],[6,'CB, MIKE, WR, TE, RB, FB']]},
  FS:{n:'Free Safety', tip:'The deep safety \u2014 reads the quarterback and takes away the deep pass.', rows:[[0,'Nickel, Dime'],[2,'SS'],[4,'CB, WR']]},
  CB:{n:'Cornerback', tip:'Covers receivers man-to-man on the outside.', rows:[[0,'FS, Nickel, Dime'],[2,'SS'],[4,'WR']]},
  ND:{n:'Nickel / Dime', tip:'Nickel: the extra defensive back in five-defensive-back packages. Dime: plays around 10% of the snaps, mainly on 3rd and long or 4th and long, especially at the end of the game, preventing Hail Marys. Played free by cornerbacks and safeties.', rows:[[0,'CB, SS, FS']]},
  K:{n:'Kicker', tip:'Kicks the field goals and extra points.', rows:[[0,'P']]},
  P:{n:'Punter', tip:'Punts \u2014 and pins teams back with hidden yards.', rows:[[2,'K']]}
 };
 const CATS = [
  ['DEFENDS THE PASS', ['CB','ND','SS','FS']],
  ['PRESSURES THE QB', ['DE','DT']],
  ['STOPS THE RUN', ['MIKE','OLB']],
  ['MOVES THE OFFENSE', ['QB']],
  ['RUNS THE BALL', ['RB','FB']],
  ['CATCHES PASSES', ['WR','TE']],
  ['PROTECTS THE PASSER', ['OT','OG','C']],
  ['THE KICKING GAME', ['K','P']]
 ];
 const card = k => { const c = CARDS[k];
  return '<div class="zpb-poscard" tabindex="0" aria-label="'+c.n+'. '+c.tip.replace(/"/g,'&quot;')+'">'
   + '<span class="zpb-postip">'+c.tip+'</span>'
   + '<span class="zpb-posname">'+c.n+'</span>'
   + c.rows.map(r=>'<span class="zpb-ftchip '+cls(r[0])+'"><b>'+tag(r[0])+'</b> \u00b7 '+r[1]+'</span>').join('')
   + '</div>'; };
 return '<div class="zpb-posboard">'
  + CATS.map(cat=>'<div class="zpb-poscat"><div class="zpb-poscat-h">'+cat[0]+'</div><div class="zpb-poscards">'+cat[1].map(card).join('')+'</div></div>').join('')
  + '</div>'
  + '<p class="narr" style="margin:8px 0 0;">Hover any card for the job it does; the chips show what playing elsewhere costs.</p>';
};
// W13-19: a second row of same-size stat bubbles under the 100-seasons report
window.zpb100More = function(myW, N, mine){
 try{
  if(!Array.isArray(myW) || !myW.length || !N) return '';
  const best = Math.max.apply(null, myW), worst = Math.min.apply(null, myW);
  const ten = Math.round(myW.filter(x=>x>=10).length / N * 100);
  const los = Math.round(myW.filter(x=>x<8).length / N * 100);
  const po = (mine && mine.po != null) ? Math.round(mine.po / N * 100) : null;
  return '<div class="zpb-100hero zpb-100hero2">'
   + '<div><b>'+best+'</b><span>best season</span></div>'
   + '<div><b>'+worst+'</b><span>worst season</span></div>'
   + '<div><b>'+ten+'%</b><span>10+ win seasons</span></div>'
   + '<div><b>'+los+'%</b><span>losing seasons</span></div>'
   + (po!=null ? '<div><b>'+po+'%</b><span>playoff rate</span></div>' : '')
   + '</div>';
 }catch(err){ return ''; }
};
// ================= end v13 =================

// ---- bridge: lets the app read and restore the engine's state (types in ./index.ts) ----
function quiet(label, fn) {
  try { return fn(); } catch (e) { console.warn("[engine] " + label, e); }
}
return {
  snapshot: function () {
    return {
      weights: weights,
      personalWeights: personalWeights,
      synergy: synergy,
      zpbState: zpbState,
      draftSim: draftSim,
      seasonState: seasonState,
      league100: league100,
    };
  },

  // Short string that changes whenever the game moves forward; cheap enough to poll.
  signature: function () {
    var d = draftSim, s = seasonState;
    return [
      JSON.stringify(weights),
      d ? d.userIndex + ":" + d.pos + ":" + (d.awaitingUser ? 1 : 0) : "-",
      s ? s.phase + ":" + s.currentWeek + ":" + (s.weekSimulated ? 1 : 0) + ":" + JSON.stringify(s.playoffs || null).length : "-",
    ].join("|");
  },

  restore: function (snap) {
    quiet("stop timers", function () { if (slowTimer) { clearTimeout(slowTimer); slowTimer = null; } });
    quiet("stop watchdog", function () { zpbStopDraftWatchdog(); });

    weights = snap.weights || Object.assign({}, DEFAULT_WEIGHTS);
    personalWeights = snap.personalWeights || null;
    if (snap.synergy) synergy = snap.synergy;
    if (snap.zpbState) zpbState = snap.zpbState;
    draftSim = snap.draftSim || null;
    seasonState = snap.seasonState || null;
    league100 = snap.league100 || null;
    draftUI = newDraftUI();
    window._zpbKickStarted = true; // never let a stale kickoff timer restart the CPU draft

    quiet("rankings", function () { render(); });
    quiet("tab", function () { setActiveTab("viewDraft", "tabDraftBtn"); });
    var show = function (id, on) { var el = document.getElementById(id); if (el) el.style.display = on ? "block" : "none"; };
    if (!draftSim) {
      show("draftSetup", true); show("draftLive", false); show("draftFinalResults", false);
      quiet("home", function () { zpbSyncHome(); });
      return;
    }
    var user = draftSim.teamNames[draftSim.userIndex];
    quiet("theme", function () { if (typeof zpbApplyTeamTheme === "function") zpbApplyTeamTheme(user); });
    show("draftSetup", false); show("draftGuideHost", false);
    if (draftSim.pos >= draftSim.order.length) {
      show("draftLive", false); show("draftFinalResults", true);
      resultsView = "season";
      window._zpbFinDone = true; // the end-of-draft cinematic already played when this save was made
      quiet("results", function () { renderDraftResults(); });
    } else {
      show("draftFinalResults", false); show("draftLive", true);
      quiet("board", function () { renderDraftLive(); });
      quiet("resume", function () { processUntilUserTurn(); });
    }
    quiet("stepper", function () { updateStepper(); });
    quiet("home", function () { zpbSyncHome(); });
  },
};

}
