#!/usr/bin/env python3
# w33_patch6.py — wave 33 stage 6: the bracket and the sweep.
# R28 · the playoff bracket becomes a March-Madness-style tree of schedule-style panels, clickable to review each game
# w33 · SLOT_GROUP learns the three new slots
# R42 · the mobile sweep: the fixed button never covers content, the tree stacks, nothing overflows
# Beam · the hover-brighten contrast law lands site-wide
import sys

SRC = '/home/z/my-project/scripts/w33_stage5.html'
DST = '/home/z/my-project/scripts/w33_stage6.html'

E = []
def add(old, new, n=1):
    E.append((old, new, n))

# ---------- SLOT_GROUP learns WR4 / TE3 / DL5 ----------
add(
"const SLOT_GROUP = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',TE1:'TE',TE2:'TE',K:'K',",
"const SLOT_GROUP = {QB:'QB',RB1:'RB',RB2:'RB',WR1:'WR',WR2:'WR',WR3:'WR',WR4:'WR',TE1:'TE',TE2:'TE',TE3:'TE',DL5:'DL',K:'K',"
)

# ---------- R28 · the March-Madness tree ----------
add(
"""function renderBracketHTML(){
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
}""",
"""// w33 (R28, Owner): the bracket reads like the tournament trees everyone knows — two conference
// sides feeding the Super Bowl, every matchup in the schedule's own panel style, and every played
// game clicks open into its review.
window.zpbTreeCardHTML = function(g, rk, i){
 const tag = (s,k)=> g[k+'Seed'] ? ` <span class="narr">(${g[k+'Conf']?g[k+'Conf']+' ':''}#${g[k+'Seed']})</span>` : '';
 const played = !!(g.result);
 const homeWon = played && g.result.homeScore>g.result.awayScore;
 const inner = played
  ? `<span class="${!homeWon?'bg-winner':''}">${g.away}${tag(g,'away')} ${g.result.awayScore}</span><span class="narr">final</span><span class="${homeWon?'bg-winner':''}">${g.result.homeScore} ${g.home}${tag(g,'home')}</span>`
  : `<span>${g.away}${tag(g,'away')}</span><span class="narr">${g.neutral?'neutral site':'@'}</span><span>${g.home}${tag(g,'home')}</span>`;
 return `<div class="bracket-game bg3 zpb-tree-card${played?' zpb-tree-live':''}" data-pog="${rk}|${i}" title="${played?'Review this game':''}">${inner}</div>`;
};
function renderBracketHTML(){
 const order = ['wildcard','divisional','champ','superbowl'];
 const PO = seasonState.playoffRounds || {};
 const confOf = (g,k)=> g[k+'Conf'] || (typeof conferenceOfTeam==='function' ? conferenceOfTeam(g[k]) : '');
 const side = (games, cf)=> (games||[]).map((g,i)=>({g,i,cf: confOf(g,'home')===cf || confOf(g,'away')===cf})).filter(x=>x.cf);
 const wc = PO.wildcard||[], dv = PO.divisional||[], cm = PO.champ||[], sb = PO.superbowl||[];
 const col = (label, items, cls)=>{
  if(!items.length) return '';
  return `<div class="zpb-tree-col ${cls||''}"><h6>${label}</h6>${items.map(x=>window.zpbTreeCardHTML(x.g, x.rk, x.i)).join('')}</div>`;
 };
 const pair = (games, rk, cf)=> (games||[]).map((g,i)=>({g, rk, i, cf: confOf(g,'home')===cf || confOf(g,'away')===cf})).filter(x=>x.cf);
 const tree =
  col('AFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','AFC'), 'zpb-tree-afc')
  + col('AFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','AFC'), 'zpb-tree-afc')
  + col('AFC · '+ROUND_LABELS.champ, pair(cm,'champ','AFC'), 'zpb-tree-afc')
  + col(ROUND_LABELS.superbowl, (sb||[]).map((g,i)=>({g, rk:'superbowl', i})), 'zpb-tree-sb')
  + col('NFC · '+ROUND_LABELS.champ, pair(cm,'champ','NFC'), 'zpb-tree-nfc')
  + col('NFC · '+ROUND_LABELS.divisional, pair(dv,'divisional','NFC'), 'zpb-tree-nfc')
  + col('NFC · '+ROUND_LABELS.wildcard, pair(wc,'wildcard','NFC'), 'zpb-tree-nfc');
 if(!tree) return '';
 return `<div class="panel" style="margin-bottom:14px;"><h4 style="margin-top:0;">Playoff Bracket</h4><div class="zpb-tree">${tree}</div><div id="zpbTreeDetail" style="display:none;margin-top:12px;"></div><div class="narr" style="margin-top:8px;">Click a played game to review what happened.</div></div>`;
}
// one delegated listener wires every tree card, wherever the bracket renders
(function(){
 document.addEventListener('click', function(e){
  const card = e.target.closest ? e.target.closest('.zpb-tree-card[data-pog]') : null;
  if(!card) return;
  try{
   const [rk, s] = card.dataset.pog.split('|'); const i = parseInt(s,10);
   const g = ((seasonState.playoffRounds||{})[rk]||[])[i];
   const host = card.closest('.panel').querySelector('#zpbTreeDetail');
   if(!g || !g.result || !host) return;
   const user = seasonUserTeam();
   host.innerHTML = renderGameResultHTML(g, (g.home===user||g.away===user)?user:null);
   host.style.display = 'block';
   host.scrollIntoView({block:'nearest', behavior:'smooth'});
  }catch(err){}
 });
})();""")

# the tree CSS — schedule-style panels, mirrored sides, mobile stacks with zero page overflow
add(
"""@media (prefers-reduced-motion: reduce){ .zpb-intro-star{animation:none;opacity:1;position:static;transform:none;} .zpb-intro-stars{position:static;margin-top:10px;} }""",
"""@media (prefers-reduced-motion: reduce){ .zpb-intro-star{animation:none;opacity:1;position:static;transform:none;} .zpb-intro-stars{position:static;margin-top:10px;} }
/* w33 (R28): the tournament tree — the schedule's own panels, the conferences mirrored */
.zpb-tree{display:flex;gap:12px;align-items:stretch;min-width:0;}
.zpb-tree-col{flex:1 1 0;display:flex;flex-direction:column;gap:8px;justify-content:space-around;min-width:0;padding:4px 10px;border-left:1px dashed var(--rosehair,var(--border));}
.zpb-tree-col:last-child{border-right:1px dashed var(--rosehair,var(--border));}
.zpb-tree-col h6{margin:2px 0 4px;font-size:.56rem;letter-spacing:.16em;color:var(--sub);text-align:center;font-weight:800;}
.zpb-tree .bracket-game{font-size:.7rem;padding:6px 8px;gap:6px;}
.zpb-tree-card.zpb-tree-live{cursor:pointer;transition:border-color .15s ease, box-shadow .15s ease;}
.zpb-tree-card.zpb-tree-live:hover{border-color:var(--accent);box-shadow:0 0 10px var(--glow,rgba(217,169,76,.3));}
.zpb-tree-sb{flex:1.35 1 0;justify-content:center;}
.zpb-tree-sb .bracket-game{border-color:color-mix(in srgb,#d9a94c 55%,var(--border));}
@media (max-width:900px){
 .zpb-tree{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
 .zpb-tree-col{border-left:0;padding:4px;}
 .zpb-tree-col:last-child{border-right:0;}
 .zpb-tree-sb{grid-column:1 / -1;}
}
@media (max-width:560px){
 .zpb-tree{grid-template-columns:1fr;}
}""")

# ---------- R42 + Beam · the sweep: the fixed button reserves air; hover brightens; the season rails stay tight ----------
add(
"""/* w33 (R22b): the preview strip honors the K/P 80+ rule — the bar wears both team colors */""",
"""/* w33 (R42): the fixed LIGHT/DARK button never covers the page — the wrap reserves its lane */
.wrap{padding-bottom:calc(52px + env(safe-area-inset-bottom,0px));}
@media (max-width:760px){
 .wrap{padding-bottom:calc(58px + env(safe-area-inset-bottom,0px));}
 #themeToggleBtn{padding:8px 22px;}
}
/* Beam PRIORITY+: interactive elements brighten on hover — dark-on-dark hover is banned */
.tabbtn:hover,.resetbtn:hover,.zpb-srbtn:hover,.footlink:hover,.posbtn:hover,.chip:hover{filter:brightness(1.12) saturate(1.06);}
.tabbtn:focus-visible,.resetbtn:focus-visible,.zpb-srbtn:focus-visible,.footlink:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
/* w33 (R22b): the preview strip honors the K/P 80+ rule — the bar wears both team colors */""")

def main():
    src = open(SRC, encoding='utf-8').read()
    for i, (old, new, n) in enumerate(E):
        c = src.count(old)
        if c != n:
            print(f'FAIL entry {i}: expected {n} match(es), found {c}')
            print('--- snippet head ---')
            print(old[:240])
            sys.exit(1)
        src = src.replace(old, new)
    open(DST, 'w', encoding='utf-8').write(src)
    print('w33_patch6 OK ->', DST, len(src), 'bytes')

if __name__ == '__main__':
    main()
