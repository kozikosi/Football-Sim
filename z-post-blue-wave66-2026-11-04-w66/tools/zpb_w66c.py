#!/usr/bin/env python3
"""w66 chain step 3 — the shared Season Review page: the standalone SEASON REVIEW door on
the regular-season review page (missed-playoffs teams), and TRY AGAIN TO GO 20-0? on its
own centered filled+shimmer panel at the bottom of the review."""
import hashlib

DST = '/home/z/my-project/work/w66/Football-Sim-Z-post-blue-w66.html'
STEP2_MD5 = '47278055cb3eb1bdd25400fe707027f1'

raw = open(DST, 'rb').read()
assert hashlib.md5(raw).hexdigest() == STEP2_MD5, 'step-2 md5 drifted'
src = raw.decode('utf-8')

def rep(old, new, tag, count=1):
    global src
    n = src.count(old)
    assert n == count, f'[{tag}] anchor count {n} != {count}: {old[:80]!r}'
    src = src.replace(old, new)
    print(f'  ok {tag}')

OLD_TOPBAR = ''' html = `<div class="panel" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">Season Review</h2><span style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="resetbtn" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:8px 18px;">Try again to go <b class="zpb-shine">20-0</b>?</button><button class="tabbtn" id="backToSbBtn" style="width:auto;margin:0;padding:8px 18px;">← Super Bowl</button></span></div>`;'''
NEW_TOPBAR = ''' renderSeasonReviewView(container); return;
}
// W66 (Owner): the Season Review page is SHARED — the Super Bowl page opens it after the
// game, and now the regular-season review page opens it too, so a team that missed the
// playoffs reaches the same review without simming anything.
function renderSeasonReviewView(container){
 html = `<div class="panel" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;">Season Review</h2><span style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;"><button class="tabbtn" id="backToSbBtn" style="width:auto;margin:0;padding:8px 18px;">${seasonState.phase==='complete'?'← Super Bowl':'← Back'}</button></span></div>`;'''
rep(OLD_TOPBAR, NEW_TOPBAR, 'review extraction + topbar', 1)

OLD_CHAIN = '''html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + pickGradePanelHTML() + renderBracketHTML() + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w33 (R38, Owner): the pick grades sit below the advanced stats panel on the Season Review too
 container.innerHTML = html;'''
NEW_CHAIN = '''html += renderPlayoffAwardsHTML(seasonState.awardsPO) + renderRegularAwardsHTML(seasonState.awardsRS, false) + renderStatsTabsHTML('po') + renderStatsTabsHTML() + teamAdvancedHTML() + advancedStatsHTML() + pickGradePanelHTML() + (seasonState.phase==='complete'?renderBracketHTML():'') + renderUserScheduleHTML() + renderStandingsHTML() + seasonOptionsHTML(); // w33 (R38, Owner): the pick grades sit below the advanced stats panel on the Season Review too · w66: the bracket shows only once the playoffs have been played
 html += `<div class="panel zpb-sr-own" style="margin-top:26px;text-align:center;padding:18px 12px;"><button class="resetbtn zpb-ctabig" id="zpbTryAgainBtn" style="width:auto;margin:0;padding:13px 34px;">TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?</button></div>`; // W66 (Owner): filled and shimmering like every season-progress button, on its own centered panel — the SEASON REVIEW treatment
 container.innerHTML = html;'''
rep(OLD_CHAIN, NEW_CHAIN, 'bracket gate + try-again panel', 1)

rep("else if(seasonState.phase==='regularReview') renderRegularReviewView(container);",
    "else if(seasonState.phase==='regularReview' && seasonState.showReview) renderSeasonReviewView(container); // W66 (Owner): the review opens from the regular-season review too\n else if(seasonState.phase==='regularReview') renderRegularReviewView(container);",
    'dispatcher route', 1)

rep(" html = html + zpbSeasonStoryHTML(); // w32 (Owner): the Regular Season Review panel (and its SIM PLAYOFFS button) sits ABOVE the badges",
    " if(!made) html = `<div class=\"panel zpb-sr-own\" style=\"margin-bottom:24px;text-align:center;padding:18px 12px;\"><button class=\"resetbtn zpb-ctabig\" id=\"seasonReviewBtn\" style=\"width:auto;margin:0;padding:13px 34px;\">SEASON REVIEW</button></div>` + html; // W66 (Owner): the shiny door sits on its own panel, first on the page — the user never has to sim the playoffs to reach the review\n html = html + zpbSeasonStoryHTML(); // w32 (Owner): the Regular Season Review panel (and its SIM PLAYOFFS button) sits ABOVE the badges",
    'sr panel on regular review', 1)

rep("{ const bp = document.getElementById('beginPlayoffsBtn'); if(bp) bp.addEventListener('click', ()=>{ startPlayoffs(); renderSeasonTab(container); }); }\n document.getElementById('simPlayoffsBtn').addEventListener('click', ()=>{",
    "{ const bp = document.getElementById('beginPlayoffsBtn'); if(bp) bp.addEventListener('click', ()=>{ startPlayoffs(); renderSeasonTab(container); }); }\n { const srb = document.getElementById('seasonReviewBtn'); if(srb) srb.addEventListener('click', ()=>{ seasonState.showReview = true; renderSeasonTab(container); window.scrollTo(0,0); }); } // W66 (Owner): the review door on the regular-season review page\n document.getElementById('simPlayoffsBtn').addEventListener('click', ()=>{",
    'sr wiring on regular review', 1)

open(DST, 'w', encoding='utf-8').write(src)
h = hashlib.md5(src.encode('utf-8')).hexdigest()
print(f'step 3 → md5 {h} · {len(src.encode("utf-8")):,} bytes')
