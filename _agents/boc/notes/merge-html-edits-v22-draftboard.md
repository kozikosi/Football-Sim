# Copy-Pasteable Edits: V22 Draft Board (MOC request) — BOC — 21 Oct 2026

Build: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (V21 merge candidate).

## DB-1: "Drafting as ..." round number + right-align

### Edit DB-1a (l.1488, drafting-as banner)
Old:
```
 document.getElementById('draftingAsBanner').innerHTML =
  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick (Round 1)</div>`;
```
New (remove static "(Round 1)" — round info is in the status text below):
```
 document.getElementById('draftingAsBanner').innerHTML =
  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick</div>`;
```

### Edit DB-1b (l.405, status text right-align)
Old:
```
   <div id="draftStatusText" style="font-weight:700;margin-bottom:6px;"></div>
```
New:
```
   <div id="draftStatusText" style="font-weight:700;margin-bottom:6px;text-align:right;"></div>
```
The status text (l.1559-1560) already uses `${round}` dynamically. No change needed there.

## DB-2: "Undo my last pick" → "Undo"

### Edit DB-2a (l.403)
Old:
```
    <button class="tabbtn" id="undoPickBtn" style="display:none;" title="Take back your last pick">↶ Undo my last pick</button>
```
New:
```
    <button class="tabbtn" id="undoPickBtn" style="display:none;" title="Take back your last pick">↶ Undo</button>
```

## DB-3: "You're on the clock" text bigger

### Edit DB-3a (l.405)
Old:
```
   <div id="draftStatusText" style="font-weight:700;margin-bottom:6px;"></div>
```
New:
```
   <div id="draftStatusText" style="font-weight:700;margin-bottom:6px;font-size:1.15rem;text-align:right;"></div>
```

## DB-4: Expand draft board visible size (~2 more names)

### Edit DB-4a (l.187)
Old:
```
.tablewrap{max-height:640px;overflow:auto;border:1px solid var(--border);border-radius:8px;}
```
New:
```
.tablewrap{max-height:min(704px,65vh);overflow:auto;border:1px solid var(--border);border-radius:8px;}
```
(Each row ~32px; +64px = 2 more names. min() prevents overwhelming mobile.)

## DB-5: "1 of 26 starters · +3.69 wins above a replacement-level lineup" → bottom

### Edit DB-5a (l.1778, renderDraftRoster2)
Move this line from the top of renderDraftRoster2 to after the roster list renders. Current (l.1778):
```
 document.getElementById('draftRosterTotal').innerHTML = n ? `${n} of ${ROSTER_SLOTS.length} starters \u00b7 <b>${fmtWar(tot)} wins</b> above a replacement-level lineup` : 'No picks yet.';
```
Restructure: compute tot/n first, render the list (l.1785/1788), then set the total line. Claude must reorder within renderDraftRoster2.

## DB-6: "Denzel Ward (93 OVR) · +1.65 wins here · priority +0.23 · 100% chance he is gone by your next pick"

### Edit DB-6a (l.1731, prow rendering)
Old score div:
```
<div class="score" title="Wins at this spot on your roster (flex penalty included)">${wavg(r.v)}</div>
```
New:
```
<div class="score" title="Wins at this spot on your roster (flex penalty included)">${r.v>=0?'+':''}${wavg(r.v)} wins</div>
```
(Displays "+1.65 wins" or "-0.23 wins" with sign.)

## DB-7: "also fits: CB1 +1.37" → "also CB1 (−2 flex)"

### Edit DB-7a (l.1764)
Old:
```
   const altTxt = alt ? `<div class="narr" title="The other spot he could fill, with the value he would have there">also fits: ${LABELS[alt.slot]||alt.slot} ${fmtWar(alt.v)}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>` : '';
```
New:
```
   const altTxt = alt ? `<div class="narr" title="The other spot he could fill, with the value he would have there">also ${LABELS[alt.slot]||alt.slot}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>` : '';
```
(Remove "fits:" and the wins number. Keep the flex penalty.)

## DB-8: Collapse position cards on mobile

### Edit DB-8a (CSS, mobile media query)
Add to `@media (max-width:760px)`:
```
.pcard .prow { display: none; }
.pcard.compact { /* show icon + position abbr + OVR only */ }
```
Plus JS toggle: add `.compact` class to pcards on mobile, expand on tap. Claude to implement.

## DB-9: "Pick order / Depth chart" → "Your Roster / Depth Chart. Pick Order"

### Edit DB-9a (l.432)
Old:
```
     <span><button class="tabbtn" id="rosterPickBtn" style="padding:4px 9px;font-size:0.74rem;">Pick order</button><button class="tabbtn active" id="rosterDepthBtn" style="padding:4px 9px;font-size:0.74rem;">Depth chart</button></span></div>
```
New:
```
     <span><button class="tabbtn" id="rosterPickBtn" style="padding:4px 9px;font-size:0.74rem;">Your Roster</button><button class="tabbtn active" id="rosterDepthBtn" style="padding:4px 9px;font-size:0.74rem;">Depth Chart. Pick Order</button></span></div>
```

## DB-10: Undo feature on guide page and home page

The undoPickBtn is in the draft view (l.403). The Owner wants undo mentioned in the Guide's "Reading the draft board" section and on the home page. Add a brief note: "You can undo your last pick with the Undo button." in the Guide's drafting section and the home page draft board help.

## DB-11: Team colors on roster (aesthetics)

The Owner wants the roster's left-side colors to reflect the user's selected team (e.g., Chiefs = red/white/yellow, Seahawks = blue/green/white). This requires a team-color lookup and CSS variable application. Claude to implement: map team name → primary/secondary/tertiary colors, apply to roster panel border/header. Special teams color = team's third color.

## DB-12: Flex potential display

"Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round." So in the draft board, flex penalties of -6 or -8 should be hidden until round 20+. Requires: in the render code, conditionally show flex penalty based on current round. `if(pen >= 6 && round < 20) hide flex indicator`.

## DB-13: Position card order follows roster order

"The order of the position cards should follow the order of your roster order." Currently cards are rendered in GROUP_DEFS order or filtered group order. Change to follow ROSTER_SLOTS order.

## DB-14: Remove "MORE" from tab footer

Already in merge-html-changes-spec.md item 2. Remove `<span class="footlabel">More</span>` (l.439).

## DB-15: Move badges to bottom under weights

Already in merge-html-changes-spec.md item 3. Badges out of table rows (l.631) into strip below weights buttons (l.548).

## DB-16: "Use model weights" → "Default" + "Back to my weights" → "Save My Weights"

Already in merge-html-changes-spec.md items 4-5.

## What BOC did not check
- Whether the flex table reorder (QB first) affects other views that use the same table data.
- Whether the mobile collapse (DB-8) needs JS changes or can be pure CSS.
- Whether team colors need a full 32-team color map or can be derived.
- Whether the "Undo" feature on guide/home page needs the button or just a text mention.
