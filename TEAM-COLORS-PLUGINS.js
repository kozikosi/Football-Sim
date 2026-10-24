// TEAM COLORS PLUGIN PACKAGE FOR CLAUDE'S PROTOTYPE
// Drop this into the HTML <script> block. Follow the PLUG-IN markers.

// ============================================================
// 1) PLUG-IN: Add TEAM_COLORS data (32 teams, t1/t2/t3)
// Insert near other constants (after TEAM_ABBR or TEAM_DATA)
// ============================================================
const TEAM_COLORS = {
  "Arizona Cardinals": {t1:"#97233F",t2:"#FFFFFF",t3:"#000000",abbr:"ARI"},
  "Atlanta Falcons":   {t1:"#A71930",t2:"#000000",t3:"#A5ACAF",abbr:"ATL"},
  "Baltimore Ravens":  {t1:"#241773",t2:"#000000",t3:"#9E7C0C",abbr:"BAL"},
  "Buffalo Bills":     {t1:"#00338D",t2:"#C60C30",t3:"#FFFFFF",abbr:"BUF"},
  "Carolina Panthers": {t1:"#0085CA",t2:"#101820",t3:"#BFC0BF",abbr:"CAR"},
  "Chicago Bears":     {t1:"#0B162A",t2:"#C83803",t3:"#FFFFFF",abbr:"CHI"},
  "Cincinnati Bengals":{t1:"#FB4F14",t2:"#000000",t3:"#FFFFFF",abbr:"CIN"},
  "Cleveland Browns":  {t1:"#311D00",t2:"#FF3C00",t3:"#FFFFFF",abbr:"CLE"},
  "Dallas Cowboys":    {t1:"#041E42",t2:"#869397",t3:"#FFFFFF",abbr:"DAL"},
  "Denver Broncos":    {t1:"#FB4F14",t2:"#002244",t3:"#FFFFFF",abbr:"DEN"},
  "Detroit Lions":     {t1:"#0076B6",t2:"#B0B7BC",t3:"#FFFFFF",abbr:"DET"},
  "Green Bay Packers": {t1:"#203731",t2:"#FFB612",t3:"#FFFFFF",abbr:"GB"},
  "Houston Texans":    {t1:"#03202F",t2:"#A71930",t3:"#FFFFFF",abbr:"HOU"},
  "Indianapolis Colts":{t1:"#002C5F",t2:"#FFFFFF",t3:"#A2AAAD",abbr:"IND"},
  "Jacksonville Jaguars":{t1:"#006778",t2:"#9F792C",t3:"#000000",abbr:"JAX"},
  "Kansas City Chiefs": {t1:"#E31837",t2:"#FFB81C",t3:"#FFFFFF",abbr:"KC"},
  "Las Vegas Raiders":  {t1:"#000000",t2:"#A5ACAF",t3:"#FFFFFF",abbr:"LV"},
  "Los Angeles Chargers":{t1:"#0080C6",t2:"#FFC20E",t3:"#FFFFFF",abbr:"LAC"},
  "Los Angeles Rams":   {t1:"#003594",t2:"#FFD100",t3:"#FFFFFF",abbr:"LAR"},
  "Miami Dolphins":     {t1:"#008E97",t2:"#FC4C02",t3:"#FFFFFF",abbr:"MIA"},
  "Minnesota Vikings":  {t1:"#4F2683",t2:"#FFC62F",t3:"#FFFFFF",abbr:"MIN"},
  "New England Patriots":{t1:"#002244",t2:"#C60C30",t3:"#B0B7BC",abbr:"NE"},
  "New Orleans Saints": {t1:"#D3BC8D",t2:"#101820",t3:"#FFFFFF",abbr:"NO"},
  "New York Giants":    {t1:"#0B2265",t2:"#A71930",t3:"#FFFFFF",abbr:"NYG"},
  "New York Jets":      {t1:"#125740",t2:"#FFFFFF",t3:"#000000",abbr:"NYJ"},
  "Philadelphia Eagles":{t1:"#004C54",t2:"#A5ACAF",t3:"#000000",abbr:"PHI"},
  "Pittsburgh Steelers":{t1:"#FFB612",t2:"#101820",t3:"#FFFFFF",abbr:"PIT"},
  "San Francisco 49ers":{t1:"#AA0000",t2:"#B3995D",t3:"#FFFFFF",abbr:"SF"},
  "Seattle Seahawks":   {t1:"#002244",t2:"#69BE28",t3:"#A5ACAF",abbr:"SEA"},
  "Tampa Bay Buccaneers":{t1:"#D50A0A",t2:"#FF7900",t3:"#0A0A08",abbr:"TB"},
  "Tennessee Titans":   {t1:"#0C2340",t2:"#4B92DB",t3:"#C8102E",abbr:"TEN"},
  "Washington Commanders":{t1:"#5A1414",t2:"#FFB612",t3:"#FFFFFF",abbr:"WAS"}
};

// ============================================================
// 2) PLUG-IN: Helpers for team colors
// Insert in JS section
// ============================================================
// Resolve team name (accept full or nickname)
function teamColorKey(name){
  if(!name) return null;
  if(TEAM_COLORS[name]) return name;
  // try nickname match (last token)
  const nick = String(name).split(/\s+/).pop();
  const found = Object.keys(TEAM_COLORS).find(k => k.split(/\s+/).pop() === nick);
  return found || null;
}
function getTeamColors(name){
  const k = teamColorKey(name);
  return k ? TEAM_COLORS[k] : null;
}
function teamAbbr(name){
  const c = getTeamColors(name);
  if(c && c.abbr) return c.abbr;
  const k = teamColorKey(name);
  if(k) return k.split(/\s+/).pop().slice(0,3).toUpperCase();
  return (name||'').slice(0,3).toUpperCase();
}
// Apply team vars to element (role-based)
function applyTeamVars(el, teamName, role='primary'){
  if(!el || !teamName) return;
  const c = getTeamColors(teamName);
  if(!c) return;
  el.setAttribute('data-team', teamName);
  // expose t1/t2/t3
  el.style.setProperty('--t1', c.t1);
  el.style.setProperty('--t2', c.t2);
  el.style.setProperty('--t3', c.t3);
  el.dataset.teamRole = role;
}

// ============================================================
// 3) PLUG-IN: Emit CSS variables per team at runtime
// Call once after defining TEAM_COLORS, e.g. on DOMContentLoaded
// ============================================================
function emitTeamColorCSS(){
  if(document.getElementById('teamColorVars')) return;
  const style = document.createElement('style');
  style.id = 'teamColorVars';
  let css = `/* Auto-generated team color vars */\n`;
  css += `:root{--team1:var(--accent);--team2:#ffffff;--team3:var(--gold);}\n`;
  for(const [name, c] of Object.entries(TEAM_COLORS)){
    // Escape quotes if any (names have spaces)
    const sel = `[data-team="${name.replace(/"/g,'\\"')}"]`;
    css += `${sel}{--t1:${c.t1};--t2:${c.t2};--t3:${c.t3};}\n`;
  }
  // Fallbacks for common classes
  css += `.teamrow[data-team]{border-left:3px solid var(--t1,var(--accent));}\n`;
  css += `.dc-name[data-team]{box-shadow:inset 3px 0 0 var(--t1,var(--team1));padding-left:8px;}\n`;
  style.textContent = css;
  document.head.appendChild(style);
}

// ============================================================
// 4) PLUG-IN: teamTag() helper (fixes nickname lookup)
// ============================================================
function teamTag(name, opts={}){
  const full = teamColorKey(name) || name;
  const ab = teamAbbr(full);
  const c = getTeamColors(full);
  const cls = opts.chip ? 'teamtag teamtag-chip' : 'teamtag';
  const style = c ? `style="--tt1:${c.t1};--tt2:${c.t2}"` : '';
  return `<span class="${cls}" data-team="${(full||'').replace(/"/g,'&quot;')}" ${style}>${ab}</span>`;
}

// ============================================================
// 5) PLUG-IN: S11 - .vscard markup generator
// ============================================================
function renderVsCard(homeTeam, awayTeam){
  const ch = getTeamColors(homeTeam)||{}, ca = getTeamColors(awayTeam)||{};
  return `<div class="vscard" 
    style="--t1-a:${ch.t1||'#4f8cff'};--t2-a:${ch.t2||'#fff'};--t1-b:${ca.t1||'#ff6b4a'};--t2-b:${ca.t2||'#fff'}">
    <div class="vscard-side vscard-side--home">
      <span class="vscard-team-name">${homeTeam}</span>
      <span class="vscard-team-abbr">${teamAbbr(homeTeam)}</span>
    </div>
    <span class="vscard-vs">vs</span>
    <div class="vscard-side vscard-side--away">
      <span class="vscard-team-name">${awayTeam}</span>
      <span class="vscard-team-abbr">${teamAbbr(awayTeam)}</span>
    </div>
  </div>`;
}

// ============================================================
// 6) PLUG-IN: S4/S20 - .teamframe markup generator
// ============================================================
function renderTeamFrame(teamName, opts={}){
  const c = getTeamColors(teamName)||{t1:'#4f8cff',t2:'#fff',t3:'#ffc43c'};
  const isSeason = opts.season ? 'teamframe--season' : '';
  const role = opts.role || 'home';
  return `<div class="teamframe teamframe--${role} ${isSeason}" 
    style="--t1-a:${c.t1};--t2-a:${c.t2};--t3-a:${c.t3};" data-team="${(teamName||'').replace(/"/g,'&quot;')}">
    <div class="teamframe-header">
      <span class="teamframe-badge">${teamAbbr(teamName)}</span>
      <span class="teamframe-name">${opts.label || teamName}</span>
      ${opts.record ? `<span class="teamframe-record">${opts.record}</span>` : ''}
    </div>
    <div class="teamframe-content">${opts.content||''}</div>
  </div>`;
}

// Auto-init
if(typeof document !== 'undefined'){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', emitTeamColorCSS);
  }else{
    emitTeamColorCSS();
  }
}
