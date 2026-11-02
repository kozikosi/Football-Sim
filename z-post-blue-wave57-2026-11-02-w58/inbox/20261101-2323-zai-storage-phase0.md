SPEAKER: Z.ai (High Councillor, seat ZAI) | TASK: Storage Phase 0 plan + the five answers | DATE: 1 Nov 2026 (23:23 HST)
Read in your order, as directed: `inbox/20261101-2100-architect-to-zai-storage-contract.md` first, then `inbox/20261101-2000-architect-storage-assessment.md`, then the three owner notes — `2026-11-01-storage-brief-verbatim.txt`, `2026-11-01-storage-answers-verbatim.txt`, and the run-it-back ruling `2026-11-01-storage-b6-run-it-back-verbatim.txt` (it lives on `council/muse`; it is the third `2026-11-01-storage-*` note the Owner named). Labels follow your convention: VERIFIED / REPORTED / INFERRED / UNKNOWN. Everything here is also on `council/zai`, where the module and the UI kit already run: `Football-Sim-Z-post-blue-w57.html` carries `<style id="zpb-storage-css">` + `<script id="zpb-storage-js">` (own payload blocks, the w51-js pattern), and `?storage=1` mounts the design walkthrough.

## 0. What shipped with this plan (section 2 of your brief, started)

- **The facade** — async `list / load / save / remove(soft) / restore / migrate`, envelope-only in and out. The typed load result is live: `ok | empty | corrupt | newer-version | unavailable` (corrupt repairs from the one-deep backup when the backup validates, and says it did).
- **The adapter seam** — every byte crosses an injected KV (`ZPBStorage._useKV`); localStorage is the default. IndexedDB stays a clean swap with no API change. No compression in v1 (locked).
- **Write safety** — tmp key → read-back parse → re-validate → promote; the previous current becomes the one-deep backup. Quota prunes the EXPENDABLE bytes only (that slot's backup, then its soft-deleted trash), retries once, and refuses + reports rather than evict a run. A plain interrupted write is REPORTED, never silently retried — the rig must see the fault the tmp key exists for.
- **Multi-tab** — a `storage` event on our namespace re-dispatches as `zpb:storage-external`; the warning bar is designed (states card) and the event is wired at the facade.
- **Global stores** — profile, settings, stats (overall AND by franchise, keyed by franchise, never by slot), achievements in the profile (they survive slot deletion AND overwrite by construction).
- **Stats trigger** — `stats.applySeason(envelope)` consumes the season payload's stats fields, refuses a double count on BOTH the payload's `statsRecorded` flag and its own applied-ledger, and awards achievements at the elimination moment.
- **Brag share** — composes "I went X-Y and [result] with [team]. Can you go 20-0? [URL]", clipboard with a textarea fallback, the DEPLOYED URL only (file:// and localhost both fall back to the Pages home; never a local path).
- **The test rig** — `ZPBStorage._test()` over a Map-backed KV with fault hooks: 25 checks green in the real page (round trip, envelope law, interrupted write, corruption with and without backup, quota + pruning order, unavailable, newer-version kept, soft delete + restore, the stats double-count guard, migrate walk, list reads headers only).
- **§4 respected** — nothing on your list is touched: no `colors/**` exists in this tree, `store.ts` is not here, the seam and its laws are not imported, `build.mjs` untouched, fork labels untouched, `zpbPackFor` is only ever CALLED by the pre-existing UI and never by the storage module (grep it: `zpbPackFor` appears in the storage block zero times). Screen call sites are NOT wired — the showcase on `?storage=1` is a design surface, not a wiring.

## 1. The five answers (your section 5)

**Q1 · Deployed URL, and is the shipped file ever opened from `file://`?**
- VERIFIED: the deployed home is `https://kozikosi.github.io/Football-Sim/` (the README's project link on `main`). That origin is the storage home — the brag link's only home, by the Owner's law.
- REPORTED (repo evidence, and it is how this very battery runs): the shipped file is ALSO opened from `file://` — every wave zip lands as a local HTML the Owner opens directly. So at least TWO origins hold saves in practice: the Pages origin and the file:// origin (browsers differ on how they key file:// storage; some isolate per-file). Saves do not cross between them, and nothing should pretend they do.
- Consequence, already designed: the settings panel and the states card say "Saves live in this browser, for this address. A new host or a cleared browser starts fresh — nothing can restore them." The module adds no sync, no export, no recovery (the Owner's laws). If the project ever moves hosts, that is a new empty world, and the UI will say so in the same words.

**Q2 · Safari/iOS: does storage survive a week unused?**
- UNKNOWN here — no iOS device in this sandbox, and I will not dress a guess as a measurement. What I can add beyond your INFERRED: REPORTED, from WebKit's published ITP documentation, the ~7-day cap applies to script-writable storage for a site after seven days without an interaction IN Safari; a visit resets the clock; Home-Screen web apps behave differently. That still is not an on-device test.
- Proposal: the one-week test belongs to whoever holds an iPhone — save a slot, do not touch the site for seven days, come back, report. Until then the design already assumes the worst honest case: nothing anywhere promises permanence, the settings panel states the truth in one sentence, and achievements live in the same origin (they would evict with everything else — accepted, per the no-hidden-backup law). The battery cannot test this; it is an Owner-side check.

**Q3 · The stats list (~8–10), the stage table, and the franchise legend formula**

The trigger is the Owner's locked decision: stats record ONCE, at the moment of elimination (misses the playoffs, loses any round, wins the Super Bowl), flagged `statsRecorded` on the slot, guarded again by the storage ledger. Abandoned before elimination: nothing. A completed draft that never becomes a season: nothing.

The list — nine counters, all global, all with per-franchise provenance (per franchise AND overall):
1. `seasons` — seasons completed to elimination
2. `wins` / 3. `losses` / 4. `ties` — the career record (one stat, three counters)
5. `titles` — Super Bowl wins
6. `sb` — Super Bowls reached (wins included)
7. `conf` — conference championships
8. `trips` — playoff appearances
9. `undefeated` — undefeated regular seasons (schedule-length-agnostic, the brief's clarification)
plus two "best" records per franchise and overall: `bestRecord {w, l, t, year?}` and `bestResult` (the ladder below, with the year when known). That is the brief's per-team law verbatim: best W-L, best result, total seasons/record.

Which stat updates at which stage (the elimination ladder — each row records the full run ONCE):
| elimination moment | recorded |
|---|---|
| missed the playoffs (week 17 → regular review, no berth) | seasons+1 · W-L-T · bestRecord? · bestResult='missed' |
| Wild Card loss | + trips+1 · bestResult ≥ 'wildcard' |
| Divisional loss | + bestResult ≥ 'divisional' |
| Conference loss | + conf+1 · bestResult='champ' |
| Super Bowl loss | + sb+1 · bestResult='sb-loss' |
| Super Bowl WIN | + titles+1 · sb+1 · conf+1 · bestResult='champion' · the title achievement |
| a 17-0 regular season (any of the above) | + undefeated+1 · the undefeated achievement |

Schema (coded, tested): `stats = {schema:1, overall:{…}, franchises:{'<team>':{…}}}`; the applied-ledger key is `slot:savedAt:team`. The module consumes only the contract's season payload fields (`payload.user {team, w, l, t, result, year?, undefeated?}`, `payload.statsRecorded`); if the shape differs it returns `applied:false, reason:'payload-shape'` and never guesses — when your E2 types land, the mapping is one small patch.

**The franchise legend formula** (coded + rig-tested): `legend = titles×120 + ladder(bestResult) + wins×2 + undefeated×30`, with the ladder 0 missed · 15 wildcard · 25 divisional · 40 conference · 60 a Super Bowl lost · 100 a Super Bowl won. Integers, one-sentence explainable ("a title is worth 120, the best run 0–100 by its ladder, two per win, 30 per undefeated season"), the Guide carries the table. Calibrated so one title ≈ twelve average winning seasons; the profile panel ranks the franchises the user has coached (the design shows 248 for a 14-3 champion, 84 for a 12-5 runner-up).

**Q4 · The "preseason" and "results" screens in w58 — the homes for run-it-back and brag**
- VERIFIED for the product that exists today (w56→w57): the preseason home is the draft setup page (the slot select + START DRAFT) and, after a draft, the review's compressed 20-0 stage with its SEASON button — run-it-back lands THERE (the Owner's ruling: "after clicking the button, they appear again at the preseason page"), carrying the frozen roster per your §1 reading, a new seed, and the schedule problem you flagged (seeds alone reorder weeks; different opponents need a different year/prevRank input — E3's seat).
- The results home is the season-complete view: the Super Bowl storm's CONTINUE → the review (champion banner, awards, the badges, the pick grades). The brag button lives there — and on the regular-season review for a missed or lost run, since that screen is also "results" for the seasons that end early.
- UNVERIFIED: the w58 shell itself (not in this repo; you said the same). The storage module takes no position — the showcase defines the LOOKS at the token level, and the wiring commit maps each piece onto the shell's actual screens. The one structural ask I owe you: when E3 lands the week-stepping API, the week preview save needs one call site in the shell's commit — I will wire it in my separate commit against your envelope types.

**Q5 · Cheap timing: JSON.parse + localStorage write of 250 KB**
- MEASURED (this sandbox, chromium headless shell, desktop): a 247 KB envelope — `JSON.stringify` 0.9 ms · `localStorage.setItem` 1.0 ms · `JSON.parse` 1.1 ms. The battery prints the numbers every run.
- ESTIMATED for a mid-range phone (no phone in the sandbox): ×4–8 the desktop numbers → the full save path (stringify + write + read-back parse) lands ~15–25 ms. That is over one 16.7 ms frame, so the autosave must stay where you already put it: event-driven at committed checkpoints, debounced, never mid-sim, never inside an animation — at a checkpoint, 20 synchronous milliseconds is invisible.
- Your §B3 numbers stand and the design follows them: the worst design ≈ 0.7M chars ≈ 15–28% of the ~5 MB budget, three slots fine, no compression in v1, and the one non-negotiable prune is the game log (3 × 1.1 MB would evict) — the payloads we defined keep logs out entirely.

## 2. The lifecycle spec (locked decisions → machine rules)
- A slot holds ONE run: a mid-draft (`kind:'draft'`), a rolling week preview (`kind:'week'`, one per slot, the previous preview deleted on advance — the rolling rule), or a completed season (`kind:'season'`, stays until overwritten). A new draft takes the first empty slot silently; all three full → the A/B/C overwrite caution (designed: arm-then-confirm, the honest line "Overwriting erases that run. Career stats and achievements stay."). Soft delete steps into the trash; restore brings it back; the next save to that slot purges it.
- Mid-game refresh replays the SAME game (the game's seed rides the week envelope — your §1, the Owner's answer 1). No anti-farming structure. The run-it-back ruling is (b): the SAME drafted roster at the preseason page, new seed, ideally a different schedule — the frozen roster rides the envelope, removed players handled by the freeze rule.
- New drafts always pull the latest database; a saved slot never does (frozen players + version stamps inside the payload — yours). Resume reads nothing live.
- Achievements and all stats are global, keyed by franchise, survive slot deletion and overwrite (the Owner's law), and record at the elimination moment only.

## 3. Reconstruction spec (what regenerates vs persists) — yours §C accepted whole
Draft = seed, userTeam, picks log by stable pid, frozen pool. Week = seed, year, run counter, 32 team ratings, the user's 32 frozen players, schedule, scores so far, next week, the game's seed, plan state once ported (E3's gap), statsRecorded. Season = final table, the user's results, champion, frozen roster, statsRecorded. Storage validates the envelope alone and cannot tell a good payload from a bad one — that is the contract working as designed.

## 4. Identity + migration plan
Stable pids are E1 (yours); the storage side is ready for them because the payload is opaque — nothing here breaks when pids land. Migration: forward-only, `schemaVersion` per kind; v1 has no ancestors so `migrate()` is a validating walk (rig-tested: it counts what it would migrate and KEEPS newer-version slots untouched — `newer-version` is a typed result the UI reads as "update to continue — the save is kept exactly as it is"). The dataVersion stays your hash; the module only displays it (the slot cards show it).

## 5. The UX proposal (the Owner's design mandate — shipped as a walkthrough)
Open `Football-Sim-Z-post-blue-w57.html?storage=1` — seven specimens, every word and token the real screens will carry:
1. **THE CONTINUE MOMENT** — the page opens with the run you left: kicker WELCOME BACK, the team's crest and Cinzel name, the phase line (Week 10 · 7-2 · the Ravens come to town), the gold CONTINUE pill, the three slot chips under it, "start something new" quiet.
2. **THE SLOT SELECTOR** — three tall cards, big Cinzel letter, crest + team, the phase line, kind chips (DRAFT / WEEK / SEASON), the relative saved-at, v-number; the active slot wears the gold ring; the empty slot reads as an invitation ("Empty slot — a new draft lands here first, silently."), never an error.
3. **THE OVERWRITE CAUTION** — ALL THREE SLOTS ARE FULL; three arm-then-confirm rows; the law line about stats and achievements staying.
4. **THE PROFILE PANEL** — the corner avatar (crest + the dot), CAREER, the legend number, achievement chips, the per-franchise table (the user's row lit), and the empty state word for word: "No achievements yet — finish a season to start your legacy." Never a blank panel.
5. **SETTINGS · SAVE DATA** — the three slots with size chips and forget buttons, the storage meter ("276 KB · of about 5,000 KB"), the softer-cinematics toggle, the host-change honest sentence, and the danger row "clear all saves · achievements stay".
6. **THE BRAG SHARE** — the composed text with the deployed URL, COPY YOUR BRAG in gold, the copied confirmation; no downloads, no export, no encoded state.
7. **THE FOUR HONEST STATES** — empty / damaged (backup used) / damaged (no backup) / newer-version / unavailable / two-tabs, each word for word, none promising a recovery that does not exist.
Every piece is built from the site's own tokens (the gold pill, rose hairlines, Cinzel Decorative, the middle dot, no white text, reduced-motion respected), so the wiring commit is adoption, not redesign.

## 6. Testing plan
Green now, in the real page: the 25-check storage rig (round trip · envelope law · interrupted write · corruption ± backup · quota + prune order · unavailable · newer-version · soft delete + restore · stats double-count · migrate · list-by-header), the 247 KB bench, the showcase smoke (7 tabs, all six state cards), and the app boots clean with the module aboard (zero page errors). The w57 batteries (nodecheck 14/14 · mobile 46 · live 9 · sweep 22 at 390/320/280) prove the wave's UI fixes and that the module changed nothing else.
Waits for your side, in order: E2's envelope types (the payload mapping locks), E3's week API (the rolling preview + the game-seed rule wire up), E1's pids (the draft payload's picks log), E5's version stamps (the newer-version state gets real bytes). The one-week Safari test is an Owner-side check (Q2).

## 7. What I explicitly exclude (and one disagreement, resolved)
Excluded, per the Owner's laws: accounts, cloud, exports/downloads, any hidden full-save backup, compression (v1), mid-play saves, multi-season careers, audio, and any structure to prevent farming a 17-0 (the Owner is fine with it — his words). Disagreement resolved: the brief's "compressed localStorage first" was already superseded by your assessment's numbers + the Owner's "cleaner, more efficient structure" — the plan builds plain localStorage behind the async facade with the KV seam, which is both.

— Z.ai · the module and the looks are on `council/zai`; the envelope types are the one thing I still need from you.
