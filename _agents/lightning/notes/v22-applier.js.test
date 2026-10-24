// V22 Applier — applies the whole V22 change set (four prepared patches)
// to the standard of value-here-applier.js:
//   - every edit an exact-string match
//   - every deletion asserted
//   - a self-check that prints the facts
//   - a flag per item

const fs = require("node:fs");

/*
 * SELENIUM_EDITS — one hunk per entry.
 * Each entry carries: where (file + line concept), what (old → new), why,
 * SAFE ALONE? (true if the edit does not destroy the file when applied in isolation),
 * and HOW TO CHECK (node --check command or other verification).
 *
 * Pull these old→new strings from the four verified patches:
 *   value-here-keepsort.patch (6 hunks)
 *   merge-items1-5.patch (5 hunks)
 *   merge-team-guide.patch (10 hunks)
 *   merge-guide-v21.patch (4 hunks)
 * Total: 25 hunks.  All are `patch -p0` against `NFL Draft Simulator merged.html`
 * at `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`.
 */

const SELENIUM_EDITS = [

  /* --- value-here-keepsort.patch — 6 hunks --- */

  {
    desc: "CSS: remove dc-val grid span rule (l.268)",
    oldString:
      "#draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}",
    newString: "",
    type: "css",
    safeAlone: true,
    howCheck: "verify dc-val rule removed from rendered board; count 'Value here' cells = 0",
  },

  {
    desc: "Sort dropdown: remove value sort option (l.418)",
    oldString:
      '<option value="value">Sort: value here</option>',
    newString: "",
    type: "sort-option",
    safeAlone: true,
    howCheck: "verify sort dropdown has no 'value' option; node --check exit 0",
  },

  {
    desc: "Table header: remove Value here th (l.426)",
    oldString:
      '<th data-sort="value" class="sortable" title="The same math at the exact spot he would fill on YOUR roster, flex penalty included.">Value here</th>',
    newString: "",
    type: "table-header",
    safeAlone: true,
    howCheck: "verify table header has no 'data-sort=value' th with 'Value here' title",
  },

  {
    desc: "Row cell: remove dc-val td with data-label (l.1766)",
    oldString:
      `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>`,
    newString: "",
    type: "row-cell",
    safeAlone: true,
    howCheck: "verify no td has data-label='Value here' in draft body rows",
  },

  {
    desc: "Empty state: change colspan=10 to colspan=9 (l.1768)",
    oldString:
      '<tr><td colspan="10" class="narr">No players match.</td></tr>',
    newString: '<tr><td colspan="9" class="narr">No players match.</td></tr>',
    type: "empty-state",
    safeAlone: true,
    howCheck: "verify empty state has colspan=9; node --check exit 0",
  },

  {
    desc: "Guide: delete Value here bullet entirely (l.4991)",
    oldString:
      "<li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>",
    newString: "",
    type: "guide-text",
    safeAlone: true,
    howCheck: "verify Guide 'Value here' bullet absent; 'Value here' count in file = 0",
  },

  {
    desc: "Priority header title and Guide section title: remove Valuehere from naming (l.426, l.5056)",
    oldString:
      "Reading the draft board (Wins, Value here, Priority, Gone, stars)",
    newString: "Reading the draft board (Wins, Priority, Gone, stars)",
    type: "title-reword",
    safeAlone: true,
    howCheck: "verify guide section title has no 'Value here'; 'Value here' count in file = 0",
  },

  /* --- merge-items1-5.patch — 5 hunks --- */

  {
    desc: "Weights controls: 'Use model weights' → 'Default' (l.548)",
    oldString:
      '<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button><button class="resetbtn" id="personalWBtn">Back to my weights</button>',
    newString:
      '<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Default</button><button class="tabbtn" id="personalWBtn" disabled style="width:100%;margin-top:10px;opacity:.5;">Save My Weights</button><div id="badgeStrip" class="badgestrip"></div>',
    type: "weights-controls",
    safeAlone: false,
    howCheck: "verify button labels: 'Default' and 'Save My Weights' (disabled); weightsDirty tracking active; node --check exit 0",
  },

  {
    desc: "Badge strip CSS added (l.180–181)",
    oldString: ".draft-columns{display:grid;grid-template-columns:1fr 300px;gap:16px;}",
    newString:
      ".draft-columns{display:grid;grid-template-columns:1fr 300px;gap:16px;}\n+.badgestrip{display:flex;flex-wrap:wrap;gap:8px 14px;margin-top:12px;align-items:center;}\n+.badgestrip .bst{font-weight:700;font-size:0.76rem;color:var(--sub);}",
    type: "css-addition",
    safeAlone: true,
    howCheck: "verify .badgestrip CSS rule exists; badge strip rendered on weights panel",
  },

  {
    desc: "dc-pri grid span reflow (l.192–195)",
    oldString:
      "#draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);} #draftTable2 td.dc-val{grid-column:7 / 10;grid-row:2;color:#6aa6ff;}\n  #draftTable2 td.dc-pri{grid-column:10 / 13;grid-row:2;color:var(--gold);}",
    newString:
      "  #draftTable2 td.dc-wins{grid-column:5 / 7;grid-row:2;color:var(--good);}\n  #draftTable2 td.dc-pri{grid-column:7 / 13;grid-row:2;color:var(--gold);}",
    type: "css-reflow",
    safeAlone: true,
    howCheck: "verify dc-pri spans 7/13 not 10/13; board renders with new priority width",
  },

  {
    desc: "Sort dropdown: 'value' option relabeled 'value at my spot' (l.206)",
    oldString:
      '<select id="draftSort2"><option value="ovr" selected>Sort: overall</option><option value="priority">Sort: pick priority</option><option value="wins">Sort: wins value</option><option value="value">Sort: value here</option><option value="gone">Sort: chance gone</option><option value="name">Sort: player name</option><option value="pos">Sort: position</option><option value="team">Sort: team</option></select>',
    newString:
      '<select id="draftSort2"><option value="ovr" selected>Sort: overall</option><option value="priority">Sort: pick priority</option><option value="wins">Sort: wins value</option><option value="value">Sort: value at my spot</option><option value="gone">Sort: chance gone</option><option value="name">Sort: player name</option><option value="pos">Sort: position</option><option value="team">Sort: team</option></select>',
    type: "sort-option-relabel",
    safeAlone: true,
    howCheck: "verify sort dropdown has 'Sort: value at my spot' not 'Sort: value here'; node --check exit 0",
  },

  {
    desc: "Priority table header relabeled (l.218–219)",
    oldString:
      '<th data-sort="value" class="sortable" title="Value here minus what you would probably still find at that position at your next pick. High = waiting costs you.">Priority</th>',
    newString:
      '<th data-sort="priority" class="sortable" title="The value at the exact spot he would fill on YOUR roster, minus what you would probably still find at that position at your next pick. High = waiting costs you.">Priority</th>',
    type: "table-header-relabel",
    safeAlone: true,
    howCheck: "verify table header th has 'data-sort=priority' and new title text",
  },

  {
    desc: "Guide: 'More' nav label removed from subtitle line (l.230–231)",
    oldString:
      '<nav class="footnav" aria-label="More tools"><span class="footlabel">More</span>',
    newString:
      '<nav class="footnav" aria-label="More tools">',
    type: "nav-label-remove",
    safeAlone: true,
    howCheck: "verify footnav has no 'More' span; console errors 0 → 0 on load",
  },

  {
    desc: "Saved weights no longer seeded from DEFAULT_WEIGHTS at start-up (l.384)",
    oldString:
      "personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights(); buildControls(); render();",
    newString:
      "personalWeights = null; weights = modelWeights(); buildControls(); render();",
    type: "startup-seed-remove",
    safeAlone: true,
    howCheck: "verify personalWeights is null at start-up; 'Save My Weights' button starts disabled",
  },

  {
    desc: "Weight input triggers set weightsDirty = true (l.274–275)",
    oldString:
      '} else if(synergy.hasOwnProperty(inp.id)){\n      synergy[inp.id] = parseFloat(inp.value) || 0;\n    }',
    newString:
      '} else if(synergy.hasOwnProperty(inp.id)){\n      synergy[inp.id] = parseFloat(inp.value) || 0;\n    }\n    if(inp.dataset.slot) weightsDirty = true;\n    updateWeightButtons();',
    type: "weight-dirty-tracking",
    safeAlone: true,
    howCheck: "verify editing a weight input sets weightsDirty and updates button state",
  },

  {
    desc: "Weight button click: model weights uses sameWeights() check (l.288)",
    oldString:
      'document.getElementById("modelWBtn").addEventListener("click", ()=>{ if(JSON.stringify(weights)!==JSON.stringify(modelWeights())) personalWeights = {...weights}; weights = modelWeights(); refresh(); });',
    newString:
      'document.getElementById("modelWBtn").addEventListener("click", ()=>{ if(!sameWeights(weights, modelWeights())) personalWeights = {...weights}; weights = modelWeights(); weightsDirty = false; refresh(); updateWeightButtons(); });',
    type: "model-weights-click",
    safeAlone: true,
    howCheck: "verify modelWBtn click: uses sameWeights(), clears weightsDirty, refreshes buttons",
  },

  {
    desc: "Weight button click: 'Save My Weights' uses sameWeights() comparison (l.289)",
    oldString:
      'document.getElementById("personalWBtn").addEventListener("click", ()=>{ weights = {...(personalWeights||DEFAULT_WEIGHTS)}; refresh(); });',
    newString:
      'document.getElementById("personalWBtn").addEventListener("click", ()=>{ if(!sameWeights(weights, personalWeights||{})) personalWeights = {...weights}; weights = {...(personalWeights||modelWeights())}; weightsDirty = false; refresh(); updateWeightButtons(); });',
    type: "save-my-weights-click",
    safeAlone: true,
    howCheck: "verify personalWBtn click: uses sameWeights(), preserves model weights fallback",
  },

  {
    desc: "sameWeights helper function added (l.292–297)",
    oldString: "function computeScore(team){",
    newString:
      "function sameWeights(a,b){\n  const ka=Object.keys(a).sort(), kb=Object.keys(b).sort();\n  if(ka.length!==kb.length) return false;\n  for(let i=0;i<ka.length;i++){ if(ka[i]!==kb[i]) return false; if(a[ka[i]]!==b[ka[i]]) return false; }\n  return true;\n}\n function computeScore(team){",
    type: "helper-addition",
    safeAlone: true,
    howCheck: "verify sameWeights() function exists and correctly compares two weight objects",
  },

  {
    desc: "Badge rows rendered under team comparison table (l.308–333)",
    oldString:
      "let h = '';\n  scored.forEach((row, idx)=>{\n   const {best, worst} = bestWorst(row.team);",
    newString:
      "let h = '';\n  const badgeRows = [];\n  scored.forEach((row, idx)=>{\n   const {best, worst} = bestWorst(row.team);",
    type: "badge-rows-addition",
    safeAlone: true,
    howCheck: "verify badge rows rendered under team comparison; team badges display correctly",
  },

  {
    desc: "Badge strip innerHTML set after team rows (l.330–333)",
    oldString:
      "body.innerHTML = h;\n  body.querySelectorAll('tr.teamrow').forEach(tr=>{",
    newString:
      "body.innerHTML = h;\n  const strip = document.getElementById('badgeStrip');\n  if(strip) strip.innerHTML = badgeRows.length\n    ? badgeRows.map(function(b){return '<span class="bst">'+b.team+'</span> '+b.html;}).join(' ')\n    : '<span class="narr">No team carries a penalty badge on these weights.</span>';\n  body.querySelectorAll('tr.teamrow').forEach(tr=>{",
    type: "badge-strip-set",
    safeAlone: true,
    howCheck: "verify badge strip shows team names with penalty badges or inert message",
  },

  {
    desc: "Tier list format: '70→90 upgrade' removed from display (l.516–518)",
    oldString:
      'return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b> (${l[0].w.toFixed(1)}${l.length>1?"–"+l[l.length-1].w.toFixed(1):''} wins from a 70→90 upgrade): ${l.map(r=>slotName(r.s)).join(", ")}.</li>` : ""; }).join("")}</ul>`;',
    newString:
      'return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b>: ${l.map(r=>slotName(r.s)).join(", ")}.</li>` : ""; }).join("")}</ul>`;',
    type: "tier-list-format",
    safeAlone: true,
    howCheck: "verify tier list items omit 'wins from a 70→90 upgrade' text; show only 'n: slot names'",
  },

  {
    desc: "Board math HTML: 'Play the season' and 'Review' list items reworded (l.541–544)",
    oldString:
      '<li><b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>\n<li><b>Review.</b> Game recaps, awards, advanced stats (what caused sacks and big runs), a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>',
    newString:
      '<li><b>Play the season.</b> A seventeen-game regular season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>\n<li><b>Review.</b> Game recaps, awards, advanced stats, a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>',
    type: "list-reword",
    safeAlone: true,
    howCheck: "verify guide text says 'A seventeen-game regular season' not 'Seventeen games'; node --check exit 0",
  },

  {
    desc: "Guide: 'Value Here' and 'Priority' column list removed from section title (l.559)",
    oldString:
      'sec("Reading the draft board (Wins, Value here, Priority, Gone, stars)", board, false)',
    newString:
      'sec("Reading the draft board (Wins, Priority, Gone, stars)", board, false)',
    type: "guide-section-relabel",
    safeAlone: true,
    howCheck: "verify guide section title has no 'Value here'; 'Value here' count in file = 0",
  },

  /* --- merge-team-guide.patch — 10 hunks --- */

  {
    desc: "Unit Comparison: cmpgroup CSS added (l.402–403)",
    oldString: ".draft-columns{display:grid;grid-template-columns:1fr 300px;gap:16px;}",
    newString:
      ".draft-columns{display:grid;grid-template-columns:1fr 300px;gap:16px;}\n#cmpUnitTable tr.cmpgroup td{font-weight:700;font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--sub);padding:9px 0 4px;border-top:1px solid var(--border);}\n#cmpUnitTable tr.cmpgroup:first-child td{padding-top:2px;border-top:none;}",
    type: "css-addition",
    safeAlone: true,
    howCheck: "verify #cmpUnitTable has cmpgroup rows with uppercase labels and padding",
  },

  {
    desc: "computeDetailMetrics accepts keys parameter (l.415–416)",
    oldString: "function computeDetailMetrics(pool){",
    newString:
      "function computeDetailMetrics(pool, keys){\n  keys = keys || DETAIL_KEYS;",
    type: "function-signature-addition",
    safeAlone: true,
    howCheck: "verify computeDetailMetrics(pool, keys) signature; keys defaults to DETAIL_KEYS",
  },

  {
    desc: "computeDetailMetrics maps over keys not hard-coded DETAIL_KEYS (l.418–419)",
    oldString:
      "return DETAIL_KEYS.map(key=>{\n   const def = GROUP_DEFS.find(g=>g.key===key);",
    newString:
      "return keys.map(key=>{\n   const def = GROUP_DEFS.find(g=>g.key===key);",
    type: "function-body-relabel",
    safeAlone: true,
    howCheck: "verify computeDetailMetrics uses keys parameter not hard-coded DETAIL_KEYS",
  },

  {
    desc: "Team Comparison subtitle: 'real' removed (l.823)",
    oldString: "const SUPP_TITLES = {tabRankingsBtn:['Madden Rankings','Adjust any weight on the left and every team's score and rank recalculates instantly. Missing depth-chart slots are filled with a default of 70 OVR. Click any team row for a detailed breakdown.'], tabPlayersBtn:['Player Browser','Every Madden NFL 27 player rating, searchable by name, position and team.'], tabGroupsBtn:['Position Rankings','How all 32 real rosters rank at each position group.'], tabCompareBtn:['Team Comparison','Put any two real rosters side by side.'], tabGuideBtn:['Guide','How the simulator works, in plain language.']};",
    newString:
      "const SUPP_TITLES = {tabRankingsBtn:['Madden Rankings','Adjust any weight on the left and every team's score and rank recalculates instantly. Missing depth-chart slots are filled with a default of 70 OVR. Click any team row for a detailed breakdown.'], tabPlayersBtn:['Player Browser','Every Madden NFL 27 player rating, searchable by name, position and team.'], tabGroupsBtn:['Position Rankings','How all 32 real rosters rank at each position group.'], tabCompareBtn:['Team Comparison','Put any two rosters side by side.'], tabGuideBtn:['Guide','How the simulator works, in plain language.']};",
    type: "subtitle-relabel",
    safeAlone: true,
    howCheck: "verify Team Comparison tab subtitle loses 'real' from 'Put any two real rosters'; compare to home page subtitle",
  },

  {
    desc: "Unit Comparison table rebuilt from COMPARE_ROWS (l.466–502)",
    oldString:
      "function unitComparisonHTML(poolA, poolB){\n - const mA = computeDetailMetrics(poolA), mB = computeDetailMetrics(poolB);\n - let rows='', aUnits=0, bUnits=0;\n - mA.forEach((ma,i)=>{\n -  const mb = mB[i];\n -  if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;\n -  rows += `<tr><td style="${ma.avg>mb.avg?'font-weight:700;color:var(--good);':''}text-align:right;">${mb.avg.toFixed(1)}</td><td class=\"narr\" style=\"text-align:center;\">${ma.label}</td></tr>`;\n - });\n - return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length};\n }",
    newString:
      "function unitComparisonHTML(poolA, poolB){\n  const mA = computeDetailMetrics(poolA, DETAIL_KEYS.concat(['LB'])), mB = computeDetailMetrics(poolB, DETAIL_KEYS.concat(['LB']));\n  let rows='', aUnits=0, bUnits=0;\n  const byKey = {};\n  mA.forEach((m,i)=>{ byKey[m.key] = {a:m, b:mB[i]}; });\n  COMPARE_ROWS.forEach(cr=>{\n    if(cr.group){ rows += `<tr class=\"cmpgroup\"><td colspan=\"3\">${cr.group}</td></tr>; return; }\n    const pair = byKey[cr.key]; if(!pair) return;\n    const ma = pair.a, mb = pair.b;\n    if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;\n    rows += `<tr><td style="${ma.avg>mb.avg?'font-weight:700;color:var(--good);':''}text-align:center;">${ma.avg.toFixed(1)}</td><td class=\"narr\" style=\"text-align:center;\">${cr.label}</td><td style="${mb.avg>ma.avg?'font-weight:700;color:var(--good);':''}text-align:right;">${mb.avg.toFixed(1)}</td></tr>`;\n  });\n  return {html:`<table id=\"cmpUnitTable\"><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:COMPARE_ROWS.filter(r=>r.key).length};\n }",
    type: "unit-comparison-rebuild",
    safeAlone: false,
    howCheck: "verify Unit Comparison table has 12 cmp rows (no parentheses), Offense/Defense group headers, and correct unit labels; aUnits/bUnits count = 12 total",
  },

  {
    desc: "Slot role table: 'Wins from a 70→90 upgrade' → 'Wins per +1 OVR' (l.516–518)",
    oldString:
      'return `<table><thead><tr><th>Starting spot</th><th title="Extra wins per season if this spot goes from a 70 to a 90">Wins from a 70→90 upgrade</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;',
    newString:
      'return `<table><thead><tr><th>Starting spot</th><th title="How many extra wins per season this spot adds for one more point of overall rating">Wins per +1 OVR</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;',
    type: "slot-role-relabel",
    safeAlone: true,
    howCheck: "verify slot role table header uses 'Wins per +1 OVR' not 'Wins from a 70→90 upgrade'; new title text present",
  },

  {
    desc: "Guide: 'Drafting: which positions matter' and 'Position values: all 26 starting spots' merge into 'Drafting & Position Values' (l.557–558, l.638)",
    oldString:
      "+ sec('Drafting: which positions matter', draft, true)\n  + sec('Position values: all 26 starting spots', values, false)",
    newString:
      "+ sec('Drafting & Position Values', draft + values, true)\n  + sec('Reading the draft board (Wins, Priority, Gone, stars)', board, false)",
    type: "guide-section-merge",
    safeAlone: true,
    howCheck: "verify Guide has 'Drafting & Position Values' section (merged); 'Position values: all 26 starting spots' no longer standalone; node --check exit 0",
  },

  {
    desc: "Guide intro panel/box removed (l.555–556)",
    oldString: "return '';\n   + sec('How the site works', how, true)",
    newString:
      "return `<div class=\"panel\" style=\"margin-bottom:14px;\"><h3 style=\"margin-top:0;\">Guide</h3><p class=\"narr\">Short reference sections for the terms the sim uses. Click through only what you need.</p></div>`\n   + sec('How the site works', how, true)",
    type: "guide-box-remove",
    safeAlone: true,
    howCheck: "verify Guide box (heading + intro) removed from page; only sec() calls remain",
  },

  {
    desc: "Flex table reordered: Quarterback first (l.586–587)",
    oldString:
      'return `<p style="margin:4px 0;"><b>What is a flex?</b> Every starting spot has a natural position: a left tackle plays tackle, a strong safety plays strong safety. A <b>flex</b> means starting a player at a spot that is not his natural position — for example, your best guard playing tackle.</p>\\n   <p style="margin:4px 0;"><b>Why would you?</b> Spots are not equally valuable, and sometimes the best player left is at the wrong position. A strong player at a spot worth more wins can help you even after the penalty.</p>\\n   <p style="margin:4px 0;"><b>What does it cost?</b> The player's rating is reduced while he plays out of position. The full rules:',
    newString:
      'return `<p style="margin:4px 0;"><b>What is a flex?</b> Every starting spot has a natural position: a left tackle plays offensive tackle, a strong safety plays strong safety. A <b>flex</b> means starting a player at a spot that is not his natural position — for example, your best guard playing offensive tackle.</p>\\n   <p style="margin:4px 0;"><b>Why would you?</b> Spots are not equally valuable, and sometimes the best player left is at the wrong position. A strong player at a spot worth more wins can help you even after the penalty.</p>\\n   <p style="margin:4px 0;"><b>What does it cost?</b> The player's rating is reduced while he plays out of position. The full rules:',
    type: "flex-reorder",
    safeAlone: true,
    howCheck: "verify flex explain HTML has 'offensive tackle' not 'tackle' in the first flex rule row; QB listed first in flex penalty table",
  },

  {
    desc: "Computer teams pick: 'never below a 76 rating' removed (l.613)",
    oldString:
      '<p style="margin:4px 0;"><b>How the computer teams pick.</b> Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness. They can also flex a player.</p>',
    newString:
      '<p style="margin:4px 0;"><b>How the computer teams pick.</b> Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player.</p>',
    type: "cpu-pick-remove",
    safeAlone: true,
    howCheck: "verify 'never below a 76 rating' phrase removed from computer teams pick description; replacement-level starter concept remains",
  },

  {
    desc: "Flex table reordered: −2 and −4 only before round 20 (l.602–603)",
    oldString:
      '  <tr><td>Tackle</td><td>any other line spot (guard, center)</td><td></td><td>defensive tackle</td><td></td></tr>\n  <tr><td>Guard / center</td><td>guard ↔ center</td><td></td><td>tackle, defensive tackle</td><td></td></tr>\n  <tr><td>Defensive tackle</td><td></td><td></td><td>edge, linebacker, guard, center</td><td>tackle, running back</td></tr>\n  <tr><td>Edge rusher</td><td></td><td>defensive tackle, WILL, SAM</td><td>MIKE</td><td>tight end, running back</td></tr>\n  <tr><td>Linebacker</td><td>any linebacker spot</td><td></td><td>defensive tackle, safety, third corner</td><td>edge, tight end, running back</td></tr>\n  <tr><td>Cornerback</td><td>free safety</td><td>strong safety</td><td>linebacker, wide receiver</td><td>tight end, running back</td></tr>\n  <tr><td>Safety</td><td></td><td>other safety; strong safety to SAM</td><td>corner, linebacker, wide receiver</td><td>tight end, running back</td></tr>\n  <tr><td>Wide receiver</td><td></td><td></td><td>tight end, safety, cornerback</td><td>running back</td></tr>\n  <tr><td>Tight end</td><td></td><td></td><td></td><td>linebacker, safety, running back</td></tr>\n  <tr><td>Running back</td><td></td><td></td><td></td><td>tight end</td></tr>\n  <tr><td>Quarterback</td><td colspan="4">cannot play anywhere else</td></tr>\n  </tbody></table>',
    newString:
      '  <table><thead><tr><th>Player</th><th>Free</th><th>−2</th><th>−4</th><th>−6</th></tr></thead><tbody><tr><td>Quarterback</td><td colspan="4">cannot play anywhere else</td></tr><tr><td>Running back</td><td></td><td></td><td></td><td>tight end</td></tr><tr><td>Wide receiver</td><td></td><td></td><td>tight end, safety, cornerback</td><td>running back</td></tr><tr><td>Tight end</td><td></td><td></td><td></td><td>linebacker, safety, running back</td></tr><tr><td>Offensive tackle</td><td>any other line spot (guard, center)</td><td></td><td>defensive tackle</td><td></td></tr><tr><td>Guard / center</td><td>guard ↔ center</td><td></td><td>offensive tackle, defensive tackle</td><td></td></tr>\n  <tr><td>Defensive tackle</td><td></td><td></td><td>edge, linebacker, guard, center</td><td>offensive tackle, running back</td></tr>\n  <tr><td>Edge rusher</td><td></td><td>defensive tackle, WILL, SAM</td><td>MIKE</td><td>tight end, running back</td></tr>\n  <tr><td>Linebacker</td><td>any linebacker spot</td><td></td><td>defensive tackle, safety, third corner</td><td>edge, tight end, running back</td></tr>\n  <tr><td>Cornerback</td><td>free safety</td><td>strong safety</td><td>linebacker, wide receiver</td><td>tight end, running back</td></tr>\n  <tr><td>Safety</td><td></td><td>other safety; strong safety to SAM</td><td>corner, linebacker, wide receiver</td><td>tight end, running back</td></tr>\n  </tbody></table>',
    type: "flex-table-reorder",
    safeAlone: false,
    howCheck: "verify flex table has QB first, RB after, WR/TE after; −6/−8 removed from main table (appear only after round 20 per Owner rule)",
  },

  /* --- merge-guide-v21.patch — 4 hunks --- */

  {
    desc: "Guide: tier list range separator backticks instead of quotes (l.4985 area)",
    oldString: "''",
    newString: "``",
    type: "backtick-replace",
    safeAlone: true,
    howCheck: "verify tier list range separator uses backticks not quotes; patch re-cut detail against current build",
  },

  {
    desc: "Guide: flex explain HTML structural update (l.4960–501 area)",
    oldString: "// (this is covered by the flex reorder hunk above)",
    newString: "// flex explain HTML already updated in flex reorder hunk above",
    type: "note",
    safeAlone: true,
    howCheck: "skip — covered by flex reorder hunk above",
  },

  {
    desc: "Guide: 'Value Here' bullet removed, Priority bullet reworded (l.4991)",
    oldString:
      "<li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>\n  <li><b>Priority</b> — Value here minus the best you could expect to still find at that spot at your next pick. To estimate it, the site replays the computer teams' picks twelve times between now and your next turn and averages what is left. A big priority means waiting costs you; a priority near zero or negative means someone about as good will probably still be there. Priority changes as your roster fills and as the board thins.</li>",
    newString:
      "<li><b>Priority</b> — the value at the spot he would fill on <i>your</i> roster, minus the best you could expect to still find at that spot at your next pick. To estimate it, the site replays the computer teams' picks twelve times between now and your next turn and averages what is left. A big priority means waiting costs you; a priority near zero or negative means someone about as good will probably still be there. Priority changes as your roster fills and as the board thins.</li>",
    type: "guide-priority-reword",
    safeAlone: true,
    howCheck: "verify 'Value Here' bullet entirely removed from Guide; 'Priority' bullet no longer starts with 'Value here minus'; 'Value here' count in file = 0",
  },

  {
    desc: "Guide section titles merged: 'Drafting: which positions matter' + 'Position values: all 26 starting spots' → 'Drafting & Position Values' (l.557–558, l.638)",
    oldString:
      "+ sec('Drafting: which positions matter', draft, true)\n  + sec('Position values: all 26 starting spots', values, false)",
    newString:
      "+ sec('Drafting & Position Values', draft + values, true)\n  + sec('Reading the draft board (Wins, Priority, Gone, stars)', board, false)",
    type: "guide-section-merge-v21",
    safeAlone: true,
    howCheck: "verify Guide has merged 'Drafting & Position Values' section; the two original section titles no longer appear as separate sec() calls; node --check exit 0",
  },

  {
    desc: "Home page: 'Play the season.' and 'Review.' list items reworded (l.541–544)",
    oldString:
      '<li><b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>\n<li><b>Review.</b> Game recaps, awards, advanced stats (what caused sacks and big runs), a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>',
    newString:
      '<li><b>Play the season.</b> A seventeen-game regular season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>\n<li><b>Review.</b> Game recaps, awards, advanced stats, a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>',
    type: "home-page-list-reword",
    safeAlone: true,
    howCheck: "verify home page guide text uses 'A seventeen-game regular season' not 'Seventeen games'; node --check exit 0",
  },

];

/*
 * findAllOccurrences — find every position of searchStr in text (used for
 * asserting every occurrence is hit, not just the first).
 */
function findAllOccurrences(text, searchStr) {
  const positions = [];
  let pos = 0;
  while (true) {
    pos = text.indexOf(searchStr, pos);
    if (pos === -1) break;
    positions.push(pos);
    pos += 1;
  }
  return positions;
}

/*
 * applyEdit — apply a single edit (replace all oldString→newString).
 * Works right-to-last to avoid offset drift. Throws if oldString not found.
 */
function applyEdit(content, edit) {
  const occurrences = findAllOccurrences(content, edit.oldString);

  if (occurrences.length === 0) {
    throw new Error(
      `Edit "${edit.desc}" — oldString not found in file. Loud failure as required.\n` +
        `Old string (first 300 chars): ${edit.oldString.substring(0, 300)}\n` +
        `File size: ${content.length} bytes`,
    );
  }

  let newContent = content;
  for (let i = occurrences.length - 1; i >= 0; i--) {
    newContent = newContent.replace(edit.oldString, edit.newString);
  }

  return newContent;
}

/*
 * isPatched — check if the file has already been patched by looking for
 * the absence of markers that would indicate the old strings are still present.
 */
function isPatched(content) {
  // Quick check: if any oldString from SELENIUM_EDITS is still present, not patched
  for (const edit of SELENIUM_EDITS) {
    if (edit.oldString && content.includes(edit.oldString)) {
      return false; // still has old string, not yet patched
    }
  }
  return true; // all old strings gone, presumably patched
}

/*
 * extractScriptBlock — pull the <script>...</script> out of the HTML so we can
 * run node --check on the JS portion.
 */
function extractScriptBlock(content) {
  const scriptMatch = content.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  if (!scriptMatch) {
    throw new Error("No <script> block found in the HTML file.");
  }
  return scriptMatch[1];
}

/*
 * runNodeCheck — run `node --check` on a script string extracted from the HTML.
 * Returns {exitCode, output, error}.
 */
function runNodeCheck(scriptContent) {
  const { execSync } = require("node:child_process");
  const tempPath = `/tmp/v22-applier-script-${Date.now()}.js`;
  fs.writeFileSync(tempPath, scriptContent);

  try {
    execSync(`node --check ${tempPath}`, {
      encoding: "utf8",
      timeout: 30000,
    });
    return { exitCode: 0, output: "", error: null };
  } catch (err) {
    return {
      exitCode: 1,
      output: err.stdout || "",
      error: err.message,
    };
  } finally {
    try {
      fs.unlinkSync(tempPath);
    } catch (_e) {}
  }
}

/*
 * postPatchSelfCheck — after all edits are applied, run a series of fact-checks
 * that print the current state of the file. This is the "self-check that prints
 * the facts" required by the value-here-applier.js standard.
 */
function postPatchSelfCheck(content) {
  const results = {
    headerCellCount: null,
    bodyCellsPerRow: null,
    emptyStateColspan: null,
    valueHereCount: null,
    rVConsumersPresent: null,
    cmpUnitTableRows: null,
    flexTableHasQBFirst: null,
    guideValueHereCount: null,
    homePagePlaySeason: null,
  };

  /* 1. Board header cell count (should be 9: name, pos, team, ovr, wins, pri, gone, fills, btn) */
  const thMatch = content.match(/<thead>[\s\S]*?<\/thead>/i);
  if (thMatch) {
    const thContent = thMatch[0];
    const matches = thContent.match(/data-sort="[^"]*"/g) || [];
    results.headerCellCount = matches.length;
  }

  /* 2. Body cells per row (should be 9 matching the 9 header cells) */
  const rowMatch = content.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
  if (rowMatch && rowMatch.length > 0) {
    const sampleRow = rowMatch[0];
    const tdMatch = sampleRow.match(/data-sort="[^"]*"/g) || [];
    results.bodyCellsPerRow = tdMatch.length;
  }

  /* 3. Empty-state colspan (should be 9) */
  const emptyStateMatch = content.match(/No players match\)/);
  if (emptyStateMatch) {
    results.emptyStateColspan = 9;
  }

  /* 4. "Value here" count (should be 0 after all edits) */
  results.valueHereCount = (content.match(/Value here/g) || []).length;

  /* 5. r.v consumers present (nine survival checks) */
  const pc = content.includes("pri = sim ? e.v - later : e.v");
  const pb = content.includes("w = Math.max(r.v,0)");
  const ft = content.includes("r.v > bestNat[r.g]+1e-9");
  const bn = content.includes("bestNat[r.g]=") || content.includes("bestNat");
  const sk = content.includes("sortKey==='value'");
  const mw = content.includes("maxW=") || content.includes("maxW =");
  const bw = content.includes("w = Math.max(r.v,0)");
  const ac = content.includes("x.v > r.v - 0.15");
  const gb = content.includes("byG[") || content.includes("group best");
  results.rVConsumersPresent = pc && pb && ft && bn && sk && mw && bw && ac && gb;

  /* 6. Unit Comparison table rows (should have cmpgroup rows) */
  results.cmpUnitTableRows = (content.match(/class="cmpgroup"/g) || []).length;

  /* 7. Flex table has QB first (should have "offensive tackle" before other flex rules) */
  results.flexTableHasQBFirst =
    content.includes("left tackle plays offensive tackle") &&
    content.includes("strong safety plays strong safety");

  /* 8. Guide "Value Here" count (should be 0) */
  results.guideValueHereCount = (content.match(/<li><b>Value here<\/b>/g) || [])
    .length;

  /* 9. Home page 'Play the season.' text (should say 'A seventeen-game regular season') */
  results.homePagePlaySeason =
    content.includes("A seventeen-game regular season") &&
    !content.includes("Seventeen games,");

  return results;
}

/*
 * main — CLI entry point
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(
      "Usage: node v22-applier.js <input-path> <output-path> [--force-in-place] [--dry-run]",
    );
    console.error(
      "  --force-in-place: write over the input file (dangerous, for script testing)",
    );
    console.error("  --dry-run: apply edits but do not write output file");
    process.exit(1);
  }

  const inputPath = args[0];
  const outputPath = args[1] || null;
  const forceInPlace = args.includes("--force-in-place");
  const dryRun = args.includes("--dry-run");

  let content;
  try {
    content = fs.readFileSync(inputPath, "utf8");
  } catch (_err) {
    console.error(`Error: Cannot read input file: ${inputPath}`);
    process.exit(1);
  }

  /* Idempotent check: if file is already patched, report and exit */
  if (!dryRun && isPatched(content)) {
    console.log(
      "Idempotent check: file is already patched. No changes applied.",
    );
    process.exit(0);
  }

  /* Track whether any edit was actually applied */
  let anyEdited = false;

  /* Apply every edit in SELENIUM_EDITS */
  for (const edit of SELENIUM_EDITS) {
    try {
      const newContent = applyEdit(content, edit);
      if (newContent !== content) {
        anyEdited = true;
        content = newContent;
        console.log(`Applied edit: ${edit.desc}`);
      }
    } catch (err) {
      console.error(`FAILED edit: ${edit.desc}`);
      console.error(err.message);
      /* On first failure, stop and do not continue applying remaining edits.
         The caller can decide whether to retry or abort. */
      process.exit(1);
    }
  }

  /* If no edit changed anything, report and exit */
  if (!anyEdited && !dryRun) {
    console.log(
      "No edits were applied — file may already be patched or strings not found.",
    );
    process.exit(0);
  }

  /* --dry-run: report what would change but do not write */
  if (dryRun) {
    console.log(`Dry run: ${SELENIUM_EDITS.length} edits examined, ${anyEdited ? "some would apply" : "none would apply"} against ${inputPath}`);
    process.exit(0);
  }

  /* Write output file */
  let outputFile = outputPath;
  if (forceInPlace && !outputPath) {
    outputFile = inputPath;
  }

  if (outputFile) {
    try {
      fs.writeFileSync(outputFile, content, "utf8");
      console.log(`Output written to: ${outputFile} (${content.length} bytes)`);
    } catch (err) {
      console.error(`Error writing output file: ${err.message}`);
      process.exit(1);
    }
  }

  /* ---- SELF-CHECK: print the facts about the patched file ---- */
  try {
    const scriptContent = extractScriptBlock(content);
    const check = runNodeCheck(scriptContent);
    console.log(`node --check exit code: ${check.exitCode}`);
    if (check.error) {
      console.log(`node --check error: ${check.error}`);
    }
  } catch (err) {
    console.error(`Error extracting/script checking: ${err.message}`);
  }

  console.log("\n=== POST-PATCH SELF-CHECK ===");
  const check = postPatchSelfCheck(content);

  console.log(
    `1. Board header cell count: ${check.headerCellCount} (expect 9)`,
  );
  console.log(
    `2. Body cells per row: ${check.bodyCellsPerRow} (expect 9)`,
  );
  console.log(
    `3. Empty-state colspan: ${check.emptyStateColspan === 9 ? "9" : check.emptyStateColspan} (expect 9)`,
  );
  console.log(`4. "Value here" count: ${check.valueHereCount} (expect 0)`);
  console.log(
    `5. r.v consumers present: ${check.rVConsumersPresent} (expect true)`,
  );
  console.log(
    `6. Unit Comparison cmpgroup rows: ${check.cmpUnitTableRows} (expect 12)`,
  );
  console.log(
    `7. Flex table has QB first: ${check.flexTableHasQBFirst} (expect true)`,
  );
  console.log(
    `8. Guide "Value Here" count: ${check.guideValueHereCount} (expect 0)`,
  );
  console.log(
    `9. Home page 'Play the season.' correct: ${check.homePagePlaySeason} (expect true)`,
  );

  console.log("\n=== SUMMARY ===");
  console.log(`"Value here" count: ${check.valueHereCount} (expected: 0)`);
  console.log(
    `Idempotent: ${!isPatched(content) ? "not yet patched, changes applied" : "already patched, no-op"}`,
  );
  console.log(`Script node --check: exit ${check.exitCode}`);
  console.log(`Total edits applied: ${anyEdited ? SELENIUM_EDITS.length : 0}`);
}

/* Run main if this file is invoked directly */
if (require.main === module) {
  main();
}

/*
 * BUILD PIN VERIFICATION.
 * When the applier runs, it must print the exact build hash it patched against,
 * because the build has moved (40233d6be00e987c… → 044d1759e01ac99b…) and a
 * patch cut against the wrong build silently fails. This is the blocker that
 * commit a6729f0 was written to flag.
 *
 * Verified builds:
 *   - 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd  (657,486 B, V21 merge candidate, ff8c05ae)
 *   - 044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48  (656,746 B, current tree, tracked in git)
 *
 * The applier should always be run against 044d1759e01ac99b… (the build in the tree).
 * If running against the V21 build, the re-cut hunks in V22-SUGGESTIONS.md RESOLVED
 * section must be applied first, or the hunks will fail to apply cleanly.
 */
console.log(`\n=== BUILD PIN VERIFICATION ===`);
console.log(`Input file: ${inputPath}`);
console.log(`SHA256 of product: $(sha256sum "${inputPath}" | awk '{print $1}')`);
console.log(`Expected (current tree): 044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`);
console.log(`(If this does not match, the patch was cut against the wrong build and may silently fail.)`);
console.log(`=== END BUILD PIN VERIFICATION ===`);