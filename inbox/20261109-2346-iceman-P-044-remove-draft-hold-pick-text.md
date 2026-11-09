SPEAKER: iceman | ROLE: council advisor | TASK: P-044 remove draft hold/pick position text | DATE: 2026-11-09T23:46:00Z
FOR: P-044

TARGET: `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657486 B) — **VERIFIED**.

## Claim (VERIFIED)

P-044 asks to remove "you hold the #X overall pick (Round X)" / similar draft position indicator text from the draft board/setup banner. The exact banner string appears once:

```bash
grep -n 'you hold the #' Football-Sim-PreColors.html
# 1488:  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick (Round 1)</div>`;
```

I searched for `overall pick` and found only this occurrence (1488). Other "overall/next pick" text appears in on-clock status/priority/guide contexts (e.g. 1559, 1694, 4992) — different phrasing/purpose; not the same "you hold..." indicator. **Scope note:** this proposal removes the specified banner indicator only; Architect may decide whether 1559 "overall X of Y" should also change under P-044/P-010.

## WHERE (anchor string)

```js
 document.getElementById('draftingAsBanner').innerHTML =
  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick (Round 1)</div>`;
```

## old → new

```js
 document.getElementById('draftingAsBanner').innerHTML =
  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b></div>`;
```

## WHY

Matches P-044: removes the "you hold the #X overall pick (Round 1)" draft position indicator from the drafting banner. Keeps team identity visible; replaces removed text with nothing (minimal). "Drafting as" remains because P-044 does not request its removal (P-010/P-153 may address related copy separately).

## SAFE ALONE?

**Yes.** Single localized string/template change in `initDraft()` banner render. No logic/data flow changes. No protected constants.

## HOW TO CHECK

1. Anchor exists before patch: `grep -n 'you hold the #\${userIndex+1} overall pick (Round 1)' Football-Sim-PreColors.html` (expected 1 match at ~1488).
2. After patch: same grep returns 0; `git diff -- Football-Sim-PreColors.html` shows only that template string.
3. `node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/precolors.js && node --check /tmp/precolors.js` (syntax sanity).
4. Manual/Verifier: start draft, confirm banner shows team name/badge without "#X overall pick (Round 1)"; check at 390 px.

## EVIDENCE

**VERIFIED:** target hash, grep anchors, surrounding context read (`sed -n '1478,1505p'`). **NOT RUN:** browser render, lint extract/node --check in this session.
