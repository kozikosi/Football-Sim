SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 14 — the cutover checklist for the Architect | DATE: 2026-11-16T22:25Z
FOR: R-13

# Cakepanz cutover — the one page Claude reads before he merges (Part 14)

**Unblocks:** merge day. Each line is a check with the command. Verdict at the end is mine alone.

## What "perfect shell" means, as checks (in order; stop at the first FAIL)

1. **The pin is named in three places and they agree** — `SNAPSHOT.md` (Z.ai's, per v4-1), the delivery's delivery-note, and `package.json` description/version: `grep -E "d3bd81d2|4ca9a071" SNAPSHOT.md package.json` → all three the SAME commit. If one names a different pin, stop.
2. **The snapshot is byte-identical to the pin**: `git archive <pin> colors/src | tar -x -C /tmp/p` → `diff -rq --exclude=node_modules --exclude=dist src/engine /tmp/p/colors/src` → empty. (I ran exactly this: live gh-pages tree = d3bd81d2, exit 0; s5 delivery = 4ca9a071.)
3. **The seam is the only door**: `! grep -rn "engine/" src --include='*.ts' --include='*.svelte' | grep -v "src/lib/enginePort.ts"` → zero output. (Today: 66 lines across 15 files — this check FAILS until Z.ai builds the port; that failure is the v4-1 work order.)
4. **No framework-specific import outside the bindings** (`main.ts`, `*.svelte`, `src/lib/draftStore.ts`): `grep -rn -E "from '(svelte|vue)" src --include='*.ts' | grep -v -E "main.ts|draftStore.ts"` → zero.
5. **The merge-day gate passes against the post-merge tree**: `node seam-check.mjs --inventory seam-inventory.json --engine src/engine` → `… 0 FAIL`, exit 0. (The checker is in my lane at `_agents/inkling/deliveries/cakepanz-merge-gate-2026-11-16/seam-check.mjs`; inventory example hashes generated from `d3bd81d2` with `git archive`; falsified with a 1-byte flip — FAIL on the exact VM, exit 1.)
6. **Build is clean**: `npm ci && npm run build` → exit 0; and the **file:// law passes**: open `dist/index.html` from `file://*` in a stock browser → app mounts, **zero console errors, zero blocked requests**. (Today: FAIL — CORS/crossorigin; v4-1 requires strip-crossorigin + singlefile postbuild.)
7. **The battery is green on the vanilla file:// dist** — SEVEN laws minimum: every *new-surface* screen renders in `loading/empty/no-save/corrupt-save/newer-build/reduced-motion/` state with zero console errors (matrix, not spot checks), PLUS the one-grep M1 law of #3 enforced in the battery.
8. **The engine's own suite rides with the tree and is re-vendored**: `npm run test:engine` → same pass/fail signature as the Architect's CI at the pin. At `d3bd81d2` run in the swapped delivery: **277 pass · 9 FAIL** — all 9 are pin-coupled flex/REV-4/E5-stamp assertions in the DELIVERED test copy; Claude re-vendors `test/engine/**` from the pin so the suite is his again, not the shell's. Do not "fix" the 9 — re-vendor them.
9. **The battery is pin-agnostic and stays green**: `npm run battery` → same APPLY count as pre-merge; any FAIL names a law that moved — say which and why; do not edit the law to pass.
10. **Numbers discipline preserved**: integers except Wins/Priority; every on-screen number carries its valuation-mode label; measured default + Owner preset one click away; the mode switch locked mid-draft.
11. **Shareables are static artifacts**: no URL/href/link out of the card; provenance (seed · gameSeed · pinned engine · dataset sha256) in every export; PNG bytes verified.
12. **390 px**: every screen `scrollWidth ≤ 390`. (Today: board = 444 → FAIL until fixed.)
13. **Palette**: the Owner's ruling is implemented as ruled — light gold2 + dark `--text` fixes applied ONLY if/when the Owner rules them; no improvisation; `.ub`/team-blue per his word; Cinzel inlined (base64, ~54 KB) — never Google Fonts.
14. **Offline is real**: airplane-mode boot of the artifact; zero network; the font and dataset are local.
15. **The handoff note is complete**: seam inventory (every VM · backing engine file · its sha256 · callers), state coverage matrix with receipts, the battery in reduced-motion, the runbook + failure-mode report, and the verdict one line per screen with the honest UNKNOWN list. If any of these is missing, merge day is not ready — say so and stop.

## Verdict (mine alone)

**Would I sign it? NO — not today.** Six of fifteen can go red right now on the s5 delivery as measured this round: #1 (pin moved; s5 = 4ca9a071), #3 (66 engine-reaching lines, no port), #6 (file:// CORS fail), #7–8 (battery unproven on file://; engine tests pin-coupled), #11 (dead TOKEN branch — law fails at 86f22d10), #12 (390 board overflow). #13 and #15 are blocked on the Owner and on Z.ai respectively. What I *would* sign today: the pin hygiene of the live gh-pages tree (§2 PASS), the swap-with-zero-edits result at d3bd81d2 (§Part 2 filing §2), and the merge-day gate itself (§5 PASS/FAIL demonstrated). The cutover is a checklist the shell passes, not a declaration the shell is done.

## How to verify

Every line names its command or the filing that carries its receipt (Part 2/8/10/12 filings this round). Nothing here is asserted without one.
