# PROJECT-KNOWLEDGE — 76 Pancakes (Football Sim) — the living block as of 20 Nov 2026 — replacement block (the current block is on `origin/council/muse`; MUSE integrates; facts cite receipts)

## State as of 20 Nov
- The queue and docs are on `council/muse` (the `council/base` copies are stale); the Owner does not read or sweep `PRIORITIES.md` manually.
- Part 0 is REPORTED, not accepted (Z.ai's seat UNKNOWN, discrepancy §10.4) — the v3 sitting report states it and the Owner owes "confirm Part 0's word" (sitting v3 :71).
- P-316 (Z.ai Slice 3, the board chrome pass — the gone% tooltip + the my-needs row) is queued and unblocked; verified PRESENT in the c10 package (C15-verified: the tooltip `BoardRow.svelte:33` — `role="tooltip"` + the method text; the needs row — `App.svelte:63` `needsSel`, `NeedsRow.svelte`, `DraftBoard` filter).
- The nine pending flex corrections (EDGE cluster + snapping rules to 6, OG>C to 2; C>OG stays 6) are OPEN (the flex corrections prompt is the next Claude prompt — the sitting v2 STATE).
- The ring is adjudicated (C12, build A — see below).
- The four ALL-CAPS tabs are OPEN to confirm (see below).

## Identity
Product: **76 Pancakes** (Owner, 2026-11-05). "20-0" is the season record, not the product name. Framework: **Svelte 5 + Vite 8** (Owner ruling, 2026-11-19; final — R-13 closed). Public data: real player names/teams with non-EA ratings. Ratings generation is the Owner's alone, later. Owner: Kosi. Architect: Claude (product/engine only). Council infrastructure owner + queue custodian: MUSE. Executor: Z.ai. Second sport (basketball) is post-v1.1. License: MIT. Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect).

## Build truth
- **Pre-Colors** (`Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B): frozen reference build — the engine-math reference.
- **Z-post-blue waves** (`Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages`): Z.ai's single-file HTML wave series. Latest published: **w89** (the Owner's 2026-11-10 chat — 26 verbatim asks). Live `index.html` is w89 — a wave is "live" only when the Owner/Beam replaces it (the make-live step).
- **67 Cakepanz** (`67-cakepanz/` on `origin/gh-pages`, Svelte app): Z.ai's parallel Colors/UI track. Slices: 1 Draft Board (done), 2 Team Select (done, being revised per P-317 — the draft-position picker, slot 1–32), 3 hydration + board chrome (P-316, queued/verified present), 4 feed, 5 shareables.
- **Colors v1 (Claude's)** (`colors/` on `architect/engine-and-seats`): the Architect's tree — the c10 build (tip 408410477 — the multisport plan M, docs only; the seat timed out — sitting v2 STATE). Cutover ships it when it is fully functioning.
- **Engine pins (split — the sitting v3 correction):** `d3bd81d2` = the Colors engine pin; `4ca9a071` = the 67-cakepanz snapshot pin. Name the tree when you cite a pin (Beam C6 vs C11 disagree — the sitting v3 correction).

## The five commits (architect tree — VERIFIED: `git log origin/architect/engine-and-seats -8 --format='%h %ad %s' --date=short | head -10` — receipt above)
1. `408410477` — "Multisport engine plan M: kernel plus thin sport modules, rule of two, phases MS-0..7 (docs only)" (2026-11-20) — the tip.
2. `aa4f9b3d0` — "S1 seam: ValueProvider takes an optional snapshot; Q7 law pinned by test; NOW" (2026-11-20).
3. `92f87f7e3` — "dispatchAsync: catch throwing subscribers, stop poisoning the queue; test; NOW" (2026-11-20).
4. `ed16fd8f0` — "passGap at team-season granularity: repeatable per-offense/defense tilt; lambda is a unit conversion; product stays lambda 0 (report-only)" (2026-11-20).
5. `da0cf927e` — "S3 context snapshot + S4 async twins (additive); item 6 read and decided in NOW" (2026-11-19).
(Sitting v2 STATE agrees: "Architect: architect/engine-and-seats @ 408410477 — da0cf927 (S3 + S4), 92f87f7e (dispatchAsync fix), ed16fd8f (passGap study), aa4f9b3d (S1 seam), 408410477 (multisport plan M, docs only)" — `3cf3e91f2` ("passGap report: verification caveats (theta-dependence, schedule, SE, fit targets)") is also in the log.)

## The open ring (C12 — adjudicated)
- The ring: the top-three-by-order rows (C′1 — the Owner's speedrun ruling). The law (Ernie's C5 §4 — `origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md`): `ring == first3(sortBy(rawKey)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }` — where rawKey is the raw numeric the engine sorted on (`r._p` priority, `r._w` wins, `Number(r.ovr)` OVR), recomputed by re-running the view's sort — never by parsing the DOM or the formatted string.
- Verdict: build A — `vm.suggestions.ids` — the view computes the ring (my adjudication — `inbox/20261120-0342-orcatide-C12-ring-fix-adjudication.md` — VERIFIED). Beam's review (`inbox/20261120-0411-orcatide-C12-review.md` — VERIFIED: "VERDICT: ok — adjudicate to A confirmed"). Ernie and Porca agree (settled — sitting v3 SETTLED: "C5 ring proposal: ERNIE, BEAM, PORCA — all recommend Contract A").
- The ring is built in the Architect tree (the c10 build); the c10 package (the UI track) carries the ring's inputs — the gone% tooltip (`BoardRow.svelte:33` — role=tooltip + the method text) and the needs row (`App.svelte:63` `needsSel`, `NeedsRow.svelte`, the DraftBoard filter) — C15-verified PRESENT.
- The battery law (under A — the battery expectation is `vm.suggestions.ids` + a raw-key recomputation — Ernie's C5 §4): the battery file `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/.../cakepanz-4-prepared/batteries/board.battery.mjs` (L13 — the ring expectation, lines 86-99).
- **The ring export shape is OPEN** — the Architect's call on how the ring is exported.

## The four tabs
- Product tab buttons on the architect tree — grep receipt (`git show origin/architect/engine-and-seats:Football-Sim-PreColors.html | grep -oE 'id="tab[A-Za-z0-9]+"' | sort -u`): `tabCompareBtn, tabDraftBtn, tabGroupsBtn, tabGuideBtn, tabPlayersBtn, tabRankingsBtn`.
- The four ALL-CAPS table tabs: Rankings, Players, Position Rankings, Team Comparison — `tabRankingsBtn, tabPlayersBtn, tabGroupsBtn, tabCompareBtn` (`tabDraftBtn` is the Draft board, `tabGuideBtn` the Guide).
- **"Owner owes: confirm the four ALL-CAPS tabs" — OPEN** (sitting v2 STATE).

## The cutover definition (OPEN — the definition itself)
- "Cutover trigger: a fully functioning Colors v1 first, then cut over" — AGENTS.md §2 (the Architect's tree — `origin/architect/engine-and-seats`) — VERIFIED.
- The delivery gate for a build (AGENTS.md §10): draft completes (32 teams × all rounds) · season runs to the Super Bowl · no horizontal scroll at 390 px · no console errors · weights change Team Rankings instantly · recaps show chronological scoring, turnovers and the game ball · protected constants re-pinned · receipts attached.

## Pending landings (the Owner owes — sitting v2 STATE + sitting v3)
1. **Land the c10 repair** — the c10 package: rehearsal three seats agree (sitting v3 SETTLED: "inkling/orcaink 51 files, 48 OK / 1 missing → 52 files, 49 OK / 0 failed; pickle 49/49; repair 6,418 B, md5 0a2869538a706e7e6ea864664b7e5c9f, sha256 3e6476de…"). Script: Ernie's `tools/land-c10-repair.sh` (`inbox/20261120-0342-ernie-C13-c10-landing-script.md` — VERIFIED by Ernie: idempotent, "after = 49 OK / 0 failed / 52 files"). Propose to MUSE for `tools/`.
2. **Land the doc fixes + the three md5 lines** — the FIX-NOTES §4 md5s (`08f30249…`, `aba2f58a…`, `ad1e0a96…`); the diffs: `origin/council/ernie:_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/doc-fixes/{hosted-c9.diff, c10-package.diff}` (VERIFIED). The wording fixes per the corrections (the "-p5 alternative", `06d89724d`, "48 OK / 1 missing, exit 1", Porca's C7 path — sitting v3 SETTLED + standing corrections).
3. **Rule the hosted-c9 policy question** — sitting v3 STATE — UNKNOWN.
4. **The four ALL-CAPS tabs** — above — OPEN.
5. **Ring export shape** — above — OPEN.
6. **Part 0's word** — C24 — relay only (sitting v3: "Part 0 is REPORTED, not accepted (Z.ai's seat UNKNOWN)" — the Owner owes "confirm Part 0's word" — sitting v3 :71) — OPEN.
7. **Click the gh-pages two-file fix** — the sitting v3 STATE — OPEN.

## Open design
- The ratings→gap mapping (C20 — the design note — `inbox/20261120-0427-orcatide-ratings-to-gap-design.md` — the passgap doc: `origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md` — VERIFIED).
- Multisport plan M (done docs-only; phases MS-1..MS-7 — the plan — `origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md` — VERIFIED, read).
- The cutover definition itself — above — OPEN.
- The ring — done (A).

## Current state (the old file's §29 block, live facts)
- MUSE owns council infrastructure (Owner directive). `tools/council.mjs` v9 fixed (macOS /tmp silent failure, CONFIRM-as-note restoring VL's P-008 review, fetch-failure banner, `next` fallback). The live queue and docs are on `council/muse`; `council/base` is a stale ghost (last moved 2026-11-02).
- P-314 (Slice 2 review) REVIEWED ✓✓✓ (MUSE, Super, Iceman, Inkling). Slice 2 is NOT accepted as-is — P-317 (draft-position picker) waits on the Architect's store change. Z.ai Slice 3 (P-316) is queued and unblocked (verified present — C15).
- New seats Iceman and Inkling are working. Crouton and CK are ignored indefinitely (Owner).
- Open Owner decisions: none pending on the queue — the Owner decides product direction when asked, and does not read or sweep `PRIORITIES.md` manually.

## Where to work
One worktree per seat, `../wt/<seat>`, branch `council/<seat>`, created by the Owner with `tools/new-seat-worktree.sh <seat>` before the chat opens (`AGENTS.md` §4). The Owner's shared tree is read-only for everyone. Push your own `council/<seat>` branch at the end of every task and session. Run `pwd` and `git branch --show-current` before reading or writing.

## If stuck
Question for the Architect or Owner → `QUESTIONS-FOR-THE-ARCHITECT.md` (≤5, each with a recommended default; the Architect forwards Owner questions). A question about council infrastructure, the queue, or the tool → tell MUSE in your bulletin entry. A bug: write it up for the Architect, do not fix the product file. An idea: `SUBMISSIONS.md` with exact change, blast radius and evidence.

## Verification receipt
The block was built from: the live PK (`git show origin/council/muse:PROJECT-KNOWLEDGE.md` — 40 lines — read at 04:36Z); the Architect's log (`git log origin/architect/engine-and-seats -8 --format='%h %ad %s' --date=short | head -10` — VERIFIED, receipt above); the product's tab-ID grep (`git show origin/architect/engine-and-seats:Football-Sim-PreColors.html | grep -oE 'id="tab[A-Za-z0-9]+"' | sort -u` — receipt above); the standing corrections (the sitting v2 + v3 messages — the standing-correction list is quoted verbatim where used); Ernie's C5 (`origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md` — VERIFIED, read); Porca's rehearsal (settled — sitting v3 SETTLED); my ring adjudication (`inbox/20261120-0342-orcatide-C12-ring-fix-adjudication.md` — VERIFIED, read); the passgap result (`origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md` — VERIFIED, read); the sitting v3 C25 text (the user message).
