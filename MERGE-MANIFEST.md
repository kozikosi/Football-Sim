# merge/v20-donor — candidate manifest

Base: `9ab0292` (origin/council-intake). Candidate: `Football-Sim-PreColors.html`
(sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B).
Both parent builds are untouched on this branch and serve as verifier references.

## Markup decision: option (a) — v20 markup kept
No `viewSeason` / `tabSeasonBtn` / `seasonHost` is added. Season stays reachable through
v20's results Season sub-tab (`resultsSeasonBtn`).

## 17 differing common functions — 11 donor / 4 v20 / 2 synthesize
Donor (11): cpuPick, render100, buildDefenseDetail, dramaticEnding, fitNoteHTML,
generateGameSummary, matchupTagHTML, playByPlay, renderGuideHTML, renderPlayoffsView,
turnoverParagraph.
v20 (4): renderDraftBoard2, renderSeasonTabInner, renderDraftResults, finishDraft2.
Synthesize (2): setActiveTab (v20 body + null guards on both loops), renderSeasonTab (v20 body;
keeps the updateStepper call; identical to v20 pin 06116b2fa88a).
renderDraftResults and finishDraft2 are markup-coupled like renderSeasonTabInner: the donor
versions drop the Season sub-tab / call setActiveTab('viewSeason') and land on 'sim'.
Taking them on v20 markup makes Season unreachable (verified: literal 14/1/2 build never leaves results).

## Donor-only helpers kept (4)
seasonToast, goSeason, meetingInfo, meetingTagText. meetingInfo/meetingTagText are live
(matchupTagHTML). seasonToast/goSeason are inert under v20 markup (goSeason guards on missing #seasonHost).
v20-only kept: updateStepper.

## Wrapper / CSS / phone block
- Line-1 compact wrapper deleted; 372 B base style relocated after `<head>` with one
  `color-scheme:light dark`; stray `</body></html>` tail removed. One doctype, one body.
- Main style block untouched (v20 216–273 kept; donor 254–263 not taken — coupled to donor markup).
- Phone block = Variant A (donor block + `if(t.dataset.nostack) return;`), v20 final
  `setActiveTab('viewDraft','tabDraftBtn')` kept.

## Hash gate (merged == donor unless noted)
cpuPick 94b878605b73, render100 cc1016eacc78, plus the 8 shared math functions and
6 protected constants (identical in v20, donor, merged).
Raw funcdiff-full vs donor: 405 identical / 7 differing (renderDraftBoard2, renderDraftResults,
finishDraft2, renderSeasonTab, renderSeasonTabInner, setActiveTab + checkRewards boundary artifact).
