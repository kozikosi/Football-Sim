SPEAKER: hy4 | ROLE: advisor | TASK: bring to light the existing account-system and career-stat plans | DATE: 2026-11-21T04:43Z
FOR: Owner · Architect (Claude) · MUSE · Z.ai relay. Retrieval + status report. No decision, no implementation, no edits outside my own files.

## 0 · Answer in one line

**Yes — the plans exist.** MUSE locked a **10-stat career list** on 2026-11-02 (two reviews filed), Claude published the **storage/account contract** on 2026-11-01, the **UI architecture §7** has the sign-in rules, and the **offline conflict rule was already approved by you on 2026-11-05**. I should have found these before designing new ones. This filing surfaces them verbatim-by-citation and flags where they conflict with my `0436` proposal.

## 1 · The career-stat plan — P-208, "locked: 10 stats"

**Source:** `origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md` (SPEAKER MUSE, 2026-11-02T07:45Z). Queue row P-208 in `origin/council/muse:_agents/QUEUE.md:93`, origin "Owner 1 Nov storage decisions".

**Rules (from the locked contract + Owner):** record once at **elimination** (miss playoffs / lose any round / win Super Bowl), flagged on the slot by `statsRecorded`; scope is **global by overall AND by franchise** ("the user should know their best record with each franchise"); every stat must be **earned** and have a **display home**; source is the season envelope only — game logs were pruned.

**The ten stats:** (1) Super Bowl wins, with teams; (2) Undefeated seasons (20-0) with shimmer treatment; (3) Best playoff run, non-title; (4) Playoff appearances by franchise; (5) Best regular-season record, overall and per franchise; (6) Longest win streak within a season; (7) First Super Bowl per franchise; (8) Draft steals (round 4+ draftees with 10+ starts); (9) Best draft class (most starter-seasons from one draft); (10) Franchise legend formula `titles×100 + playoff_appearances×10 + best_Wins`.

**Cut list (settled):** blowout wins/biggest margin, total career wins (participation), fewest points allowed/most scored, comeback wins, anything requiring play-by-play.

**Status — important:** the author calls it "locked", but the queue row is still open and only **two** reviews exist: `origin/council/beam:inbox/20261103-0256-beam-P-208-review.md` (**improved**) and `origin/council/vl:inbox/20261104-0521-vl-P-208-review.md` (**ok**) — a third seat would make it REVIEWED ✓✓✓.

**Unresolved finding in both reviews:** stats **8 and 9 are not computable from the locked season envelope** — "games started" / starter-seasons are not carried in `SeasonPayload`. Beam proposed reworking them to "draft hits = draftees still on the final 32-man roster" or extending the payload (an Architect/Z.ai scope call). VL flagged the same as the list's weakest point. The legend formula weights (100/10/1) are INFERRED and may be retuned by you.

## 2 · The account-system plan — two existing documents

**(a) `origin/architect/engine-and-seats:_agents/COLORS-V1-UI-ARCHITECTURE.md:44-45`, §7 "Optional sign-in and cloud saves (Owner idea, 1 Nov; STORED, later)":** local save comes first; sign-in is **optional** (simulator works with no account); use a **maintained OAuth 2.0 / OpenID Connect implementation — Auth.js, Better Auth or a managed provider — never homemade password handling or unverified email/password**; test authorization boundaries: a user can never read or write another user's saves, shared links scoped read-only. It recommends keeping the simulator fully offline and shipping accounts/cloud saves as a **separate optional portfolio module talking to the same save record**. The technical rules are still good; your new directive changes *optional/later* to **mandatory at release** — that is a scope amendment to §7, not a rewrite of its security rules.

**(b) `origin/architect/engine-and-seats:inbox/20261101-2100-architect-to-zai-storage-contract.md` (Claude, 1 Nov):** envelope `{ kind: 'draft'|'week'|'season', schemaVersion:int, engineVersion:string, dataVersion:string, slot:'A'|'B'|'C', savedAt:ISO, payload }`, plain JSON; payload shapes for draft/week/season (the latter carries final table, user's results, champion, frozen roster, `statsRecorded`); **async facade `list, load, save, delete(soft), migrate`**, localStorage adapter, temp-key write safety, typed load result `ok | empty | corrupt | newer-version | unavailable`, multi-tab warning; **global stores for profile, settings, stats overall AND by franchise, achievements**; brag share; no compression in v1. Facade must not import `colors/src/engine/**`.

## 3 · The conflict rule you already approved — P-254

**Source:** `origin/council/muse:_agents/QUEUE.md:132` — "**Owner APPROVED 2026-11-05 (Q4)**: per-slot **last-write-wins on the WHOLE save, never a field merge**; the losing lineage is kept on disk as a **rung-back**; a fork is resolved as **'keep both' at the slot level**; additive **`deviceId` field now** so v1.1 never unfreezes. The Architect implements the mechanics; Z.ai incorporates the behavior into the envelope freeze." Raised by Pickle (2026-11-05) and OR (2026-11-04) precisely because offline-first + OAuth sync implies two devices with one mid-season save.

**This conflicts with my `0436` proposal** (replay two action logs from a common ancestor and choose by engine state). Mine was a fresh design made without checking the queue. **I defer to the approved rule**; my replay idea is withdrawn unless you explicitly want to override P-254. The approved rule is simpler, already ratified, and keeps the envelope frozen.

## 4 · Brag share — also already specified

P-209 proposal `origin/council/muse:inbox/20261102-0607-muse-storage-priorities-proposal.md` calls for the exact text template, the deployed game URL (**never file:// or localhost, no parameters, no encoded state**), clipboard + confirmation toast, fallback, and **no save data in the share**. The 1 Nov owner brief (`origin/architect/engine-and-seats:_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt`) supplies the copy: *"I went 14-3 and won it all with Carolina. Can you go undefeated? [link]"*, and reiterates "it's not a seed challenge, it's a brag share". This matches what I said in `0436`; now it has a source.

## 5 · The standing principle that makes all of this safe

`origin/council/muse:_agents/owner-notes/2026-11-12-server-ready-engine-verbatim.txt`: **"design the simulation engine as if it will eventually run on a centralized server… keep it independent of browser APIs, UI state, local storage, and framework-specific code. It should accept defined inputs and produce defined outputs."** MUSE's note calls it a standing architectural principle. The 12 Nov platform vision note adds "a substantial online sports-gaming platform", 10,000-user online leagues and "whether the database can preserve historical franchises and seasons". So accounts + long-term stats were in the architecture from the start; my `0414`/`0417` "future possibility" framing had no basis.

## 6 · Other open rows that touch this (from the live queue)

P-207 storage-contract review · **P-208** (2/3 reviews) · P-209 brag spec · P-210 storage-origin/browser measurements · P-214 RunState↔WeekPayload seam · **P-254** conflict rule (approved) · P-259 F2: Z.ai flagged that WeekPayload/SeasonPayload have **no player stat book, awards or unit grades** — the season-summary screen has no payload home for the richer stats view; needs an Architect ruling · P-272 envelope conformance tester.

## 7 · What changes in my recommendation

- **Stats:** do not invent a new list — adopt the locked ten, and get the third P-208 review plus an Architect ruling on stats 8/9 data availability and the P-259 F2 payload home. That is the actual blocker for "which stats will be recorded", not a missing idea.
- **Accounts:** keep the §7 security rules (managed OIDC, boundary tests, shared links read-only); amend its *scope* from optional/later to release gate.
- **Conflicts:** use the approved P-254 rule; withdraw my replay design.
- **Host:** Workers remains my recommendation for the server boundary, but the collision to resolve is §7's "separate optional portfolio module" and the 1 Nov "no backend" wave rule versus your new mandatory-at-release directive — the latter wins, and the docs should say so explicitly.

**Status:** retrieval and status report only. No decision, no implementation, no product/engine/queue/governance edits. Earlier filings `0414`/`0417` and the conflict-resolution part of `0436` are superseded by this finding.
