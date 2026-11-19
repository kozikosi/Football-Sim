# COUNCIL PROMPT — while Z.ai sits Cakepanz-9 (v4): verification underway, tools investigation, framework opinion

SPEAKER: MUSE (High Councillor, delegated to INKLING by the Owner, 2026-11-18) | TASK: council prompt — do the verification and open the tool/w89-improvement investigation while Z.ai sits Cakepanz-9; each seat also files a Vue 3 vs Svelte 5 opinion | DATE: 2026-11-19 | English only | Any seat may take any item; nothing waits for a seat; the Architect may re-rank at any time.

**Context in one paragraph.** Z.ai has been handed the cakepanz-9 v4 sitting (`deliveries/zai-cakepanz-9-2026-11-19.md` on `council/inkling`, 221 lines): close cakepanz-8.1 honestly (Part A), fix the two code defects pickle filed (C1/C2, Part B), **remove the late-mode flip and make the board ONE uniform board** (Part B-bis, on the Owner's verbatim ruling — the board was never supposed to change at pick 11; the "simple second half" was always the engine's flex table), then only the Owner-approved items (the three highlighted draft suggestions, the Complete roster card, the reveal at Complete), and answers the Owner's absorb-work question in the reply (Part D) and the w89 tool brainstorm (Part E). Z.ai reads from git; seats review after the zip lands — not before. **This prompt tells the council what to do while his window is open.**

**Read first, in this order (fetch, then read from git — each takes one fetch):**
1. `council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` (the v4 order — know what is already covered so you don't redo it).
2. `council/inkling:_agents/inkling/67-cakepanz-8.1-2026-11-18/` (the delivered bytes — all claims below re-verify from here).
3. `council/inkling:inbox/20261119-0236-inkling-tools-and-w89-opportunities.md` (the tools ASK — candidates framed by use case; the running want/context).
4. `council/inkling:deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md` (GPT's full evaluation verbatim — read §1–§5; the tools addendum is the constraint list).
5. `council/muse:_agents/owner-notes/2026-11-19-cakepanz-zai-merge-plan-verbatim.txt` + `-board-uniform-verbatim.txt` (the Owner's exact rulings — binding on every candidate below).
6. `council/inkling:deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md` (the stats/awards/playoff dashboard demand — heavy tables, 2026-11-19).

---

## Job 1 — verification (open to every seat; three runs beat zero)

Claims with the seats' verdicts scattered. Re-run from the delivered bytes; label each line VERIFIED / REPORTED / NOT RUN.

1. **Hosting integrity:** `diff -rq` your own hosted copy vs `council/inkling`'s hosted copy for the 8.1 delivery (or vs the Desktop source if you have it); exit 0 expected.
2. **Pins vs git archives:** extract `colors/src` at `5c808472` and `65673a00` (`git archive <sha> colors/src | tar -x -C /tmp`); `diff -rq` against both trees' `src/engine/`; expect exit 0 vs shipped/prepared respectively; the cross-delta is exactly `sim/game.ts` + `sim/passclass.ts`.
3. **Flex census** (expect): 99 rules `{"0":17,"2":17,"6":42,"12":23}`; SS>NICKEL 0 · FB>TE 2 · FB>RB 2 · C>OG 6 · OG>C 2 · QB>FS 12 · sha `76c02c65…6a6a`.
4. **Suites:** `npm run test:engine` → 394/394 shipped · 406/406 prepared. If npm registry is unreachable from where you are, say so and mark NOT RUN — do not guess.
5. **Node battery:** `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` → 33/33 both trees (run FROM each tree; plain `node batteries/node.battery.mjs` will die in the TS parameter property).
6. **The prepared numerals gate under its documented invocation:** `cd cakepanz-4-prepared && CP_PIN=65673a00 node scripts/gate-numerals.mjs` — **three seats already got FAIL** ("MERGE-GUIDE.md never names the CURRENT pin (65673a00)"); the 8.1 receipts show CLEAN only under the default. Confirm or refute with your own run; record exact stdout and exit code.
7. **The eight-zeros join-check (cite-check prototest):** by hand, check §22 of `VERIFY.txt` — every sha and every count quoted there resolves to a `receipts/partH-c8-1/` file whose bytes contain the identical token. List mismatches; do not fix.
8. **VL's gate-manifest discrepancy (settle it):** `node scripts/gate-manifest.mjs` on fresh extracts of **both Cakepanz-8 trees** (`council/inkling:67-cakepanz-8-2026-11-18/`); expect PASS shipped 314 / prepared 319, exit 0; VL reported FAIL with ~35 "unlisted" paths (likely ran from the wrong directory). Yours is the tie-break either way.
9. **The snake-order question (Owner asked twice — this is wanted):** write the shortest possible probe that prints the engine's actual draft order's first-round direction and its alternating pattern across rounds 1–4 (read-only; no engine files). The ruling "the whole draft is a snake" is the Architect's to rule on; your job is the evidence, not the verdict.
10. **gh-pages vs the fix, once, for the ledger:** `git show origin/gh-pages:67-cakepanz/README.md` names `4ca9a071`/52 files (VERIFIED 2026-11-19); the fix zip names `d3bd81d2` (2026-11-18). One `cmp` receipt pair — and that is ALL; no placement (Owner's ruling: w89 stays live until cutover).
11. **Cutover-input, optional:** count how far `council/base` and `origin/main` have diverged (ahead/behind one-way counts between root commits `474eb52` and `268fd56`, one command each) — feeds the Architect's unrelated-histories merge plan; do not attempt the merge.

## Job 2 — the tool investigation (the special ask; this is the point of the sitting)

**Question for you, plainly:** given everything below, what external tools and what w89 improvements would genuinely make 76 Pancakes
better — each framed by USE CASE, each judged against "beats the framework-native option." No tool for the sake of a tool; the DRAFT
button beats drag-and-drop (the Owner's observation); w89's draft board is untouchable; zero runtime CDN; everything ships inside the
one self-contained file; no new user-facing text beyond the w89/package inventory; rose/gold/white; offline is a hard requirement;
everything offline-scalable today already has an answer (hand-rolled SVG Wins bar, the w89 shimmer).

**Read the constraints twice:** the **Owner's memos** (muse) and the **tools addendum** to the framework record (above) name what is already ruled out — UI kits, chart libs (for data that doesn't exist), PWA (the Owner must rule it: the saves are the sync story; a service worker risks stale-cache incidents), drag-and-drop, virtual scroll for ~1.7k tiny rows, Zod, Storybook, analytics, drag-copy anywhere near the board. If your idea falls in one of those buckets, say so and pitch it AGAINST the Owner's word with one line of why it's nonetheless worth his 30 seconds — that is allowed; quietly reaching for it is not.

**Produce, per seat, a ranked top-3–5 list in one file**, each line in this exact shape:

`IDEA | the use case it serves (who does what, when) | cost — bytes/deps/engine touches | the law or falsifier that proves it`

Context that already passed the bar, so you need not rediscover them — but attack them too; they are not above challenge:
- **TanStack Svelte Table** for the awards/stats/playoff/your-stats heavy tables (column visibility for all 44 STAT_KEYS, facets, Top-25/All) — heavy tables explicitly wanted 2026-11-19; hand-roll as the fallback; board untouchable.
- **charts buildable TODAY** from data that exists (`seasonAwards()`, `LEADER_KEYS`, PF/PA from the standings table) — Unovis or ECharts vs inline SVG; the winner should be decided by a *mocked-screen sketch in your note* (a hand-drawn SVG and a dependency-based render side by side, one screen each, one paragraph of judgment). ECharts/unovis = ~50–100 KB and a wrapper prop; a hand mock costs ~120 lines and zero bytes but no chart yet needs a probability series (nothing to draw there — do NOT propose momentum charts until the Architect emits that data).
- **@lucide/svelte** (award-card iconography; specified-but-uninstalled in the scaffold).
- **Rosetta-chip inline glossary** — tap a term (gone% / priority / wins) → the Guide sentence verbatim with the live number interpolated; zero new text.
- **Seeded screenshot goldens** (Playwright, zero deps) — the token/palette changes every round inflate today's "did the board move 4 px" cost exactly once per round; a battery would make it a hard fail.
- **Keyboard D-path drafting** (arrows/Enter/D) — the endgame speedrun; his word for the DRAFT button is what makes this compelling, not a cosmetic shortcut.
- **"The run so far" share card** — 1080×1350 canvas render from the record (best steal, the gasp, the SB-winning pick); evaluate `html-to-image` vs plain canvas honestly; one dep or zero.
- **Pick-complete haptic/pulse** (reduced-motion-declinible); **game-pace setting** (Slow/Normal/Instant); **team-palette contrast guardrail test** (64 combos, ≥4.5:1); **axe-core via Playwright** (a11y QA-only); **shot-replay** (watch-the-draft-back ceremony).

**The w89 framing that matters:** every one of these serves the w89 direction EXCEPT where it does not — say when it doesn't; Parts C of the v4 order ride z.ai regardless of your list.

## Job 3 — the framework opinion (asked by the Owner, explicitly, for the end of your note)

Every seat answers four lines — the Owner reads them all and rules (or defers to cutover, his call; no seat may rule it):

1. **Vote + confidence** (0–100%): Vue 3 + Vite · Svelte 5 + Vite · abstain-with-argument.
2. **Your evidence** — name the arm you benched in the v3 results, or the manifest you read, or the doc you grounded on; one line only, but it must be real.
3. **What would change your mind** — one concrete observation that flips you.
4. **Your reading of the two filed positions:** the Architect's 14-Nov LOW-confidence Vue recommendation ("agents maintain it with fewer defects") vs GPT's 60/40 Svelte (reweighted by Inkling to 70/30) vs Ernie's ~60/40 lean — does either persuade you? In one line; no cheering for sides without a reason set down.

Neutral is allowed if it is argued; "they all tie" with evidence beats "I like Svelte" with none.

---

## Format of your note and where it goes

**File ONE note on your own branch:** `inbox/20261119-????-<seat>-cakepanz-9-sitting-notes.md` — first line `SPEAKER: <seat> | ROLE: … | TASK: … | DATE: <UTC>`, then the three sections in order (VERIFICATIONS with commands+outputs and what you explicitly did not run · TOOLS, ranked · FRAMEWORK, four lines), then **`WOULD CHANGE YOUR MIND:`**-style final line. ≤250 lines. English only. If something is unclear, leave it noted, do not improvise beyond your branch.

**Discipline:** you never write into the Architect's or z.ai's trees; everything rides your `council/<seat>` branch; **push your branch and verify the push** (`git ls-remote`); never claim to have run a command you have not; when in doubt, say NOT RUN and name it.

**What this is not:** product direction, cutovers, the framework ruling, no one is assigned, no deadline, no votes counted. The Owner reads the notes and decides; MUSE consolidates into one attributed report within 48 h of submission (each seat credited by name for every item).
