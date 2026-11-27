# DS — lane file

## Identity
- **Seat:** DS · **Model:** deepseek-v4.1-flash-free via OpenChamber · **State:** advisor
- **First seen:** 2026-10-25 · **ID block:** none used
- **Strengths shown (evidence):** byte-checks that hold or break a delivery — Z.ai framework-eval v4 (14 Nov: manifest 44/44, suite 323/323, flex 99; found the `C5b` log 101-vs-99); P-337 cakepanz-8 / 8.1 / c9 reviews (pins, gates, D1–D5, L10 closed); P-342 engine-design review; P-347 λ identification; P-346 v3 review; flex rebuild 9–10 Nov; GLM pass-class state-bucket (17 Nov: 12,000 paired games, within-bucket bias isolated); R-13 tools evaluation (19 Nov: five measured builds, Svelte 5 vs Vue 3); S17 continuation review (26 Nov: hosted 840 files / 26 MB; claims 25/8; engine 69/69 @408410477 and 430/430; final visual 18/0, slot 28/0 at distHash 3f053afd; node 35/37; board 23/1; offline tent fails; Wave B battery parse; path bug; left s2 overlay).
- **Pattern to keep:** I take the verification half of a delivery and the mechanism half of a spec. I file the *delta*, not a restatement.

## Where
- **Worktree:** `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds` (OpenChamber worktree; the equivalent of `../wt/ds`)
- **Branch:** `council/ds`
- **merge-base HEAD origin/council/base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **Last session end:** 2026-11-26 (S17 continuation hosted + reviewed; shell round 2 filed)

## Current state (26 Nov 2026)

### S17 continuation — hosted and reviewed (26 Nov)
- **Hosted:** the Owner's `zai-s17-continuation-2026-11-25` at `d626a5262` (840 files, 26 MB; byte-for-byte from the desktop folder, no `node_modules`; the hosting note is the sibling `deliveries/zai-s17-continuation-2026-11-25-HOSTING-NOTE.md`). The artifact has its own 401-entry `CHECKSUMS.txt` and an extra 839-line `SHA256SUMS-2026-11-25.txt`; `verify-package` is 401 OK/0/0 with 1 EXTRA, exit 1.
- **Review:** `inbox/20261126-0157-ds-zai-s17-continuation-review.md` — **Wave A closed; Wave B code-landed, PARTIAL; NOT ACCEPTED at the delivered bytes.** The package's own gate is **25 OK · 8 RED** (packaging **18 OK · 3 RED**), not the 30 OK · 0 RED in the top state block. The state block/`SHELL-STATUS`/freshness/seam card/seal accounting are Wave A; the final source/dist is Wave B. The A3/A4 instrument correctly turns red; the release shipped the red gate under a green line.
- **Verified at the final bytes:** engine fence **69/69 @`408410477`** (byte-identical; `diff -rq` empty); engine **430/430**; acceptance **COMPLETE and attested** (log sha `d536d63f…`, every step exit 0; at the Wave A tree, not the final tree); final **visual 18/0** and **slot 28/0** at `distHash 3f053afd…`; final **node 35/37** (N26/N27 source-string drift from the Wave B provenance/heat-strip; behavior appears intact); final **board 23/1** (L20 aria-label parse; L13 still 3/36/60 at picks 1/13/27); **Wave B battery does not parse** (`as const` at `batteries/waveB.node.battery.mjs:57`); **offline tent fails** (`dist/single.html` under `file://` shows “No player dataset yet”; 0 external, 0 page errors); **left s2 PNG still the w89 intro overlay**, non-vacuity says `met:true` (rows behind the overlay); **path bug** (`check-claims` from a path with a space: `ENOENT … /Football%20Sim%20s17/claims.json`); **seam card** `sealCount 385` vs live 401, `claims.total 31` vs 33, `distHash 8144…` vs final `3f053afd…`.
- **Ideas:** `inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md` — 12 ranked + 2 bonus: final-byte release gate + `PROOF.md`; phone card deck; top-three cap; offline first-run demo; decision rail; proof chip; share story; toolbar/one method; text-safe palette; motion budget; structured why; experience laws. No engine edit proposed; `rawSort` remains the Architect's move.
- **Prior state:** the 23 Nov S17 close-out review and the 19 Nov R-13 tools evaluation remain below; the close-out is superseded by the continuation, not deleted.

### S15 WIP + S17 close-out — hosted and reviewed (23 Nov)
- **Hosted:** the Owner's `67-cakepanz-15-WIP-2026-11-21` at `aaaee04f4` (545 files, 18 MB) and `zai-s17-closeout-2026-11-23` at `7b94a40ec` (677 files, 24 MB), both byte-identical to the desktop copies (`diff -r`); no `node_modules`/`.git`/symlinks.
- **Review:** `inbox/20261123-1756-ds-zai-s17-closeout-review.md` — **TRUSTWORTHY BYTES · NOT UI-ACCEPTED**. Seal 370 OK/0/converse clean (the S15 WIP `verify-package` md5 bug is fixed); engine fence 69/69 @`408410477`; `dist/` byte-reproducible; node 37/37, engine 430/430, board 24/0, shell 53/0, visual 18/0, slot 28/0, slice 29/0/10/3, contrast 2/0 (3 known AA holes), viewport 45/45; manifest/numerals gates PASS/CLEAN.
- **Board falsifier (independent):** F0 both baselines green; **F15/F17–F31 all DIED by name; EXIT 0; zero TAUTOLOGY/COULD-NOT-RUN** (the S15 WIP F24/F27/F28 tautologies and F30/F31 anchor failures are fixed). Caveat: F27/F28 die at pick 1; at pick 13 the product's own top3=36 makes the same all-rows mutants indistinguishable — the law needs `top3 === 3` at late checkpoints too.
- **P1s:** the "top three" is 4–45 rows (L13 says 36 at pick 13, 60 at pick 27; my probe 4→45); the 390 board is unreadable (42 px name, 34 px team vs 58 px content, 85–169 px rows; the no-h-scroll law is blind); both themes below AA (light gold 1.51/1.65:1, dark text 3.17:1; contrast gate records them as known). **P2s:** top rows shift the team/OVR columns 62 px; sort at y3307 after 60 rows leaves the user at the bottom; 216 tab stops; panel and row both say "Draft at QB" but behave differently; accessible name starts "TOPBrock Purdy"; left side-by-side board shots are the w89 intro overlay.
- **Ideas:** `inbox/20261123-1756-ds-cakepanz-shell-ideas.md` — cap at 3 until `rawSort`; phone card + collapsed needs; fixed action rail/columns; sticky board toolbar; one method disclosure; text-safe palette; motion budget; status rail; layout/a11y battery. **No engine edit proposed; `rawSort` is the Architect's move.**
- S15 WIP is the pre-close-out tree; its review is folded into the S17 file (the close-out supersedes it). The folder name says S17; every internal doc says S15 close-out — see F12.

### R-13 tools evaluation — filed this session
- `inbox/20261119-0451-ds-R-13-w89-stats-tools-svelte-vue.md` — **recommendation: stay on Svelte 5 + Vite**, measured, with falsifiers (§6) and the framework-free `statsTable` VM hedge. Contains the T1–T10 reframing of the w89 "Your team stats" / "Playoff stats" screens.
- Measured (five fresh Vite 8 builds of one identical stats-table app; gzip -9 of built JS): Svelte 5 hand-rolled **15,511 B**; Svelte 5 + TanStack v9 **25,940**; Vue 3 hand-rolled **26,353**; Vue 3 + TanStack v9 **34,701**; Vue 3 + PrimeVue 4.5.5 DataTable **150,529** (raw 694,053). Product context: c9 dist 527,177 B raw / 221,814 B gz -9.
- Harness + `MEASUREMENTS.txt`: `_agents/ds/deliveries/tools-eval-2026-11-19/` (re-runnable; apps carry no node_modules/dist).
- Licence/version traps: `@tanstack/svelte-table` 9.3.2 MIT with `peer svelte ^5.0.0`; `svelte-headless-table` 0.18.3 peers Svelte **4** (dead for us); `primevue` 5 is the commercial PrimeUI licence, 4.5.5 is MIT; AG Grid has no first-party Svelte adapter.
- w89 anchors: `renderStatsTabsHTML` 8381 · `userStatsInner` 8374 (last column is one `seasonStatLine` string; the rating cell mixes value + `#rank`) · `leaderBoards` 8406 (ten ad-hoc boards) · `renderTeamStatsHTML` 8448 (the per-game box, not a season aggregate) · no per-game player log (`grep gameLog|playerGameStats|byGame|perGame` = 0 hits) — game logs/sparklines are an engine request.

### c81 / c9 — standing, awaiting a builder
- Review `inbox/20261119-0427-ds-c81-review.md`: **D1** a mid-season boot deletes the week autosave, so the *second* reload lands on "Your draft is complete"; **D2** at 390 px the gone% tooltip is raised by the tap that opens the row detail and sits over its chips (`elementFromPoint` at chip centre = the tooltip). Both VERIFIED at 8.1's bytes.
- Addendum `inbox/20261119-0455-ds-c81-addendum-c9.md`: both still live at c9's shipped dist `670d4c08…`; c9's 390 px width rule is inert by CSS order (equal specificity; base 240 px comes later, measured 262 px). D5.4 (flip) superseded by the Owner's ruling; D3/D5.3 live.
- Fixes + laws: op `inbox/20261119-0427-ds-OP-add-cakepanz-8-2-close-the-two-she.md` (P2; MUSE assigns the ID) — patches, S29b, L7b, L10 per tree, re-zip.
- Receipts: `_agents/ds/deliveries/cakepanz-8.1-review-2026-11-18/` (`receipts-c81-ds-review.md` R1–R12, `receipts-c81-c9-addendum.md`, probes, the L10 run 18/18 exit 0).

### Standing results from earlier sessions
- **GLM state-bucket (17 Nov):** sack rate 7.07 → 6.97%, within-bucket −0.10 pp (z −2.2), state-mix −0.00; real, small, score-dependent; source (league drift vs model form) still INFERRED/open. `inbox/20261117-2056-ds-GLM-state-bucket.md`.
- **Shell pin v4 (16 Nov):** gh-pages `67-cakepanz/src/engine` = `d3bd81d2` 57/57; `67-cakepanz-s5` = `4ca9a071` 52/52; its README is stale. `inbox/20261116-2102-ds-CAKEPANZ-SHELL-{pin,neutrality,seam}.md`.
- **Open filings:** relay spec `inbox/20261115-1132-ds-delivery-fix-relay.md` (the tool is MUSE's); direction `inbox/20261115-1149-ds-direction-innovation.md` (`file://` root cause, 11,569 B gz delta); pin-watch retired (canonical is `council/inkling` @ `0bd76860`).

## What the next session needs
1. **The S17 continuation review is filed** (`inbox/20261126-0157-ds-zai-s17-continuation-review.md`): Wave A closed; Wave B partial; **not accepted at the delivered bytes** (25/8; packaging 18/3; final node 35/37; board 23/1; offline tent fails; Wave B battery parse; left s2 overlay; path bug). The next round starts with the final-byte release gate, the phone card, the top-three cap and the offline demo; the prior F1/F2/F3 are still open. `rawSort` is the Architect's engine move; do not build a shell oracle against raw values until it lands.
2. Read the live round prompt and **check the tip before working**; `node tools/council.mjs next` (from `origin/council/muse`) is the queue truth.
3. **Round K — still owed.** (a) merge gate: the five checks, four fixes documented; (b) 4-3/3-4: the ~947 floor appears in no council filing, Ernie's EDGE→ILB=0 + EDGE→DT=2 gives gap 0 / bias +334, and "947 worse than 720" is a category error; (c) Wins calibration: policy→outcome exists (greedy N=1000: 89.5% playoffs, 11.43 mean wins), the slope and the 20-0 rate do not.
4. If a new delivery lands, check **D1 and D2 first** (receipts above); do not re-run the whole review.
5. Do not rebuild pin-watch or bucket-bar variants.
6. If R-13 is taken, the harness is ready — re-run it before changing any number.
7. **S17 continuation red set:** the package's own gate is 25/8 and the state block 25/7; the final visual/slot pass but the shipped receipts are pre-final; the seam card is 385/401; the extra `SHA256SUMS` makes `verify-package` exit 1. The first action is a release re-run at the final tree, not a new feature; the review's §7 has the order.

## Open questions (mine, not the council's)
- GLM sack bias source: league drift vs model form (the score-state sign flip points to model form; INFERRED). Claude's source analysis is the open input.
- Does the Owner want the default decision now, or after the source analysis?
- Does "one adapter" mean one facade over the six VMs, or a new interface layer?
- Does the Owner want **exactly 3** top rows or **3 + ties**? Recommended: exactly 3 until `rawSort`, with a “+N tied” strip; the final board's 36/60 is not a top three.
- Offline first run: `?dev=1` demo or an Owner-approved demo dataset? Recommended: `?dev=1` as a labelled demo until the Owner approves a dataset; the real ratings stay out of the cutover.
- Must a Wave B package carry a Wave B acceptance? Recommended: yes; a Wave A acceptance can be complete and attested and still not certify Wave B bytes. The `acceptance-covers-this-tree` claim is the minimum.

## Live files
`inbox/20261126-0157-ds-zai-s17-continuation-review.md` · `inbox/20261126-0157-ds-cakepanz-shell-round2-ideas.md` · `deliveries/zai-s17-continuation-2026-11-25/` · `deliveries/zai-s17-continuation-2026-11-25-HOSTING-NOTE.md` · `inbox/20261123-1756-ds-zai-s17-closeout-review.md` · `inbox/20261123-1756-ds-cakepanz-shell-ideas.md` · `inbox/20261119-0451-ds-R-13-w89-stats-tools-svelte-vue.md` · `_agents/ds/deliveries/tools-eval-2026-11-19/` · `inbox/20261119-0455-ds-c81-addendum-c9.md` · `inbox/20261119-0427-ds-c81-review.md` · `inbox/20261119-0427-ds-c81-ui-ideas.md` · `inbox/20261119-0427-ds-OP-add-cakepanz-8-2-close-the-two-she.md` · `_agents/ds/deliveries/cakepanz-8.1-review-2026-11-18/` · `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` · `inbox/20261118-1956-ds-R-13-cakepanz-shell-innovations.md` · `_agents/ds/deliveries/prompt-zai-cakepanz-9-2026-11-18.md` · `inbox/20261117-2056-ds-GLM-state-bucket.md` · `_agents/ds/deliveries/glm-state-bucket-2026-11-17/` · `inbox/20261116-2102-ds-CAKEPANZ-SHELL-{pin,neutrality,seam}.md` · `inbox/20261115-1149-ds-direction-innovation.md` · `inbox/20261115-1132-ds-delivery-fix-relay.md`

## Method notes
- zsh: `$r:tools/...` is a **parameter modifier** (`:t` = tail) — quote the whole ref, and print the ref + byte count beside every hash.
- Verify **blob bytes** (`git cat-file blob HEAD:<p>`), never working-tree bytes.
- `sync-base.sh` is a trap on a worktree whose governance docs are newer than base (it rewrites `AGENTS.md`/`PROJECT-KNOWLEDGE.md`/`START-HERE.md` to the 2026-11-02 ghost). The live `START-HERE.md` §1 says do not run it; use the Step-0 checkout from `origin/council/muse`.
- End of chat: `node tools/preserve.mjs check`; commit only by path; push only `council/ds`.
