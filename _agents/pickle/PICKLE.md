# PICKLE — seat identity

SEAT: pickle · ROLE: Council Adviser · BRANCH: `council/pickle`
WORKTREE: `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-pickle`
MERGE-BASE: `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (`git merge-base HEAD origin/council/base`, re-verified 19 Nov 2026).

## Current state (20 Nov 2026, eleventh session) — executed the whole v4 sitting order as one seat

Owner's task: "execute all of this yourself" — the full v4 council sitting order (A1–A3, B1–B5, C1′–C4′, D1–D8). Done: four parallel read-only research passes over the remote refs, two load-bearing claims re-verified directly, then **one Pickle inbox file per item** plus an errata filing, plus the one-line bulletin. All pushed to `council/pickle`.

- **A1** (`inbox/20261120-0410-pickle-A1-c12-ring-synthesis.md`): C12 converges — Beam A, hy4orca A+`rawSort`, **orcabeam 0358 supersedes its own 0349 B position** → A+`rawSort`, porca B alone. One law: ring = first3(sortBy(rawKey, candidates)) ∪ ties, raw keys from `rawSort`/`suggestions.ids`, never the display-string parse at `DraftBoard.svelte:40` / `board.battery.mjs:52`. Re-pin string conflict named for the Architect. Declared interest: I authored S1.
- **A2 / A3** (`0411`, `0412`): Architect delta pack (S1 ruling, N1 D18, N2 paths, N3 baseball-recommendation vs recorded basketball, NOW.md 16→≤15, four gates already VERIFIED). Q7 week/season gap **CONFIRMED** — `valueprovider.test.ts:89-92` uses week 5 for both snapshots; fix loaded to `week: 6`.
- **B1** (`0413`): C24's "no verbatim Owner note" premise **REFUTED** — `council/pickle:_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt` (blob `0d5a6734…`, commit `8227b1464`) holds the 19 Nov Part 0 disposition verbatim. Directive VERIFIED; **acceptance label stays REPORTED** (the note says "pose the problem … let him fix it himself", not "accepted"). Corrects v4 §2.7 and this lane's old line.
- **B2–B5** (`0414`–`0417`): landing script VERIFIED end-to-end on five c10 roots (49/49, EXIT 0/2/3, idempotent) with a latent idempotency-path count gate missing; C14 wording edits real but **v1-anchored only** (do not apply to v2/v3); C23 stale `tabGuideBtn` anchor exact but severity overstated (reporting hygiene, not a gate failure) with a one-eval DOM filter; C29 four-pin map fully VERIFIED (`4ca9a071` stale README, `d3bd81d2` deployed, `5c808472` shipped c10, `65673a00` prepared c10, `408410477` Architect tip).
- **C1′–C4′** (`0418`–`0421`): seeded battery laws L1–L8 (shipped viewport is **1180×950**, not 1180×900; no 390 px law today; no `?seed=` seam); BoardRow a11y exact `aria-describedby`/`:focus-visible` snippets; one-click drafting spec (before `.cp-chip.cp-primary`, existing `onpick`, no `undo()`, keep `pickSlot` out); P-316 DONE in dist / PARTIAL in source audit, P-315 no harness (UNKNOWN).
- **D1–D8** (`0422`–`0429`): cutover checklist (rows 1–6 PARTIAL/CONTESTED, not cutover-ready), five-risk register, deduplicated Owner-owes (no new asks), PROJECT-KNOWLEDGE replacement (reject the `4ca9a071` pin swap; Part 0 label corrected), item-6/passGap consistency (λ not reopened), ratings→gap design, **Retrosheet licence resolved** (https://www.retrosheet.org/notice.txt — permissive commercial use conditional on prominent attribution; NOT public domain; re-fetched live this round), queue-hygiene proposals.
- **ERRATA** (`inbox/20261120-0430-pickle-ERRATA-v4-order-corrections.md`): four corrections to my own v4 order folded into one file — C12 no longer 50/50, verbatim Owner note exists, battery viewport 1180×950, Q7 gap confirmed third-seat. Prevails over v4 where they conflict.
- No product HTML, engine file, pin, protected constant, governance file, queue row or other seat's file edited. No force-push. One seat's filings do not manufacture REVIEWED ✓✓✓.

## Twelfth session (20 Nov 2026) — hosted + reviewed Z.ai's cakepanz-11 sitting zip

Owner's task: push the desktop folder `zip-root-cakepanz-10` to my branch so anyone can read it, then review thoroughly and push the review, then brainstorm shell improvements. Done: folder (41 files, 424 KB, no build bytes) hosted at `_agents/pickle/deliverables/zip-root-cakepanz-10/`, pushed to `council/pickle` (ad2cb4267 + af228b338, verified via ls-remote); 40/40 content files md5-byte-compared at source and destination. Review `inbox/20261120-0445-pickle-CAKEPANZ11-review.md` — VERDICT improved, two SHOWN doc defects (macOS `md5 -c` no-op; CHECKSUMS.txt self-line = empty-string hash) with exact replacement text, F20 stale-build risk CONFIRMED (falsify-board lacks shell-falsifier's D-2 served-hash guard), nine WCAG ratios recomputed exact. Innovation `inbox/20261120-0446-pickle-TO-ARCHITECT-cakepanz-shell-innovation.md` — 6 proposals. Bulletin `bulletin/20261120-0447-pickle.md`. Suite numbers stay REPORTED (zip has no runnable tree). No product/engine/pin/constant/governance/queue edits.

## What the next session needs

1. Take a NEW top item from the live `_agents/QUEUE.md` on `origin/council/muse` with the **v11** tool (`git show origin/council/muse:tools/council.mjs > <real /private/var/... path>`; macOS `/tmp` is a symlink — older tools no-op there). Do NOT re-run the v4 items or the four gates.
2. Wait for the Architect's three rulings (S1 contract + re-pin string, plan-M N1/N2/N3, NOW.md 16→≤15); the pack is `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` plus A2 this round. Do not edit his files.
3. Do not duplicate Z.ai's v4 build (slot picker, one-click drafting, `?seed=`, a11y, seeded battery, tooling). The C1′–C4′ specs are for him to integrate.
4. C24 should be read as "reviewed with correction", not a clean ✓✓✓: B1 refuted the premise of the two prior filings. C13/C14/C23/C29 now have a third seat each; C12 awaits the Architect.
5. A seat with a full (non-shallow) fetch may settle historical ancestry claims; do not treat this checkout's shallow `NO` as evidence either way.
6. Keep the hosted c9, c10, item-6 and v3-sitting copies as read sources. Do not edit another seat's lane or inbox. Run `node tools/preserve.mjs check` on any clean-up; do NOT touch other seats' unsaved worktrees (`council/q`, `council/vloc` flagged previously — left untouched).

## Open questions (Owner / Architect / MUSE — never a seat)

- Owner: land the c10 one-file repair on inkling + orcaink; the three doc fixes **with the three CHECKSUMS md5 lines in the same action**; rule hosted-c9 byte-state policy; four ALL-CAPS tabs; ring export shape; the word on Part 0 (REPORTED, not accepted); gh-pages two-file fix (README pin + `index.html` = w89); sport two at MS-2 (recorded basketball post-v1.1, plan M recommends baseball).
- Architect: S1 suggestions contract vs raw-only/rawSort, with which pin re-pinned; `?seed=` store seam; Q7 `week: 6` fix; passclass/drive nit paths; sport-two framing as a recommendation, not a built change.
- MUSE/INKLING: live `PROJECT-KNOWLEDGE.md` is stale (current-state block dated 2026-11-09, "no Owner decisions pending") — D4 supplies a paste-ready replacement; C33 queue proposals in D8. Only MUSE integrates.

## Live files (eleventh session)

- `inbox/20261120-0410…0430-pickle-*` — the 20 v4 items plus ERRATA (one file per item; labels VERIFIED / REPORTED / INFERRED / UNKNOWN; raw stdout receipts).
- `bulletin/20261120-0431-pickle.md` — this session's one-line bulletin.
- Prior session (kept as read sources): `inbox/20261119-2252-pickle-P-287-v3-sitting-review.md` (D1 apply instruction, D2 byte-truth), `inbox/20261119-2252-pickle-P-345-v3-shell-implications.md` (S1–S5, I1–I4), `inbox/20261119-2327-pickle-P-287-review-of-peer-reviews.md`, `inbox/20261119-2335-pickle-TO-ARCHITECT-da0cf927-verification.md` (427/427, tsc 89/89), `inbox/20261120-0200-pickle-TO-ARCHITECT-92f87f7e-verification.md` (428/428 + 14/1 negative control), `inbox/20261120-0235-pickle-TO-ARCHITECT-ed16fd8f-verification.md`, `inbox/20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md` (430/430, tsc 89/89), `inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md`, `inbox/20261120-0345-pickle-TO-ARCHITECT-four-gates-verified.md`, hosted v3/c9/c10/item-6 folders.
- Deliveries: `council-sitting-order-2026-11-20-v4-pickle.md` (work order this session executed), `architect-return-order-2026-11-20.md`, `zai-sitting-order-2026-11-20.md`, `zai-continuation-brief-2026-11-20-v2.md`.
- **No product HTML edits, ever.** Work → `inbox/`; code → `_agents/pickle/deliveries/`.

## Standing recipes / rules that changed

- Framework **final: Svelte 5 + Vite 8** (Owner R-13, 2026-11-19). Do not reopen.
- **Part 0 acceptance = REPORTED**, not ACCEPTED. Verbatim disposition note: `council/pickle:_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt`. Dist hashes `76de5658…` (527,162 B) / `670d4c08…` (527,177 B) are REPORTED sitting-doc figures; neither blob is in this repo's object store. C′1: match w89; tab labels SEASON STATS / PLAYOFF STATS / YOUR PLAYERS / LEAGUE LEADERS (ALL CAPS).
- Live tooling/queue: queue file is `_agents/QUEUE.md` on `council/muse`; `tools/council.mjs` is **v11** (the v9 in the frozen worktree AGENTS.md is stale). Cite the branch measured.
- Engine pin vs snapshot pin: `d3bd81d2` = deployed engine (57/57 blobs, 99-rule flex); `4ca9a071` = stale README pin; `5c808472` / `65673a00` = shipped / prepared c10 pins; `408410477` = Architect tip. Name the tree.
- Blob-first: `git show <ref>:<path>` / `git archive <ref> -- <dir>` → temp dir; print the sha resolved. Test the Architect's tree without touching it. Prove a survivor with a mutation. Manifest checks: report rows AND file count. macOS `/tmp` is a symlink; use `/private/var/folders/…`.
- Shallow-checkout trap: `git log | grep <sha>` can match a commit message; use `git rev-list | grep` or `git merge-base --is-ancestor` and check `.git/shallow` before calling ancestry either way.
- Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Receipts are raw stdout at the final state. No product bytes, engine files, protected constants, governance or queue rows edited by me.
