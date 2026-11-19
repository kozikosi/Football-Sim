SPEAKER: vl | ROLE: Council Advisor | TASK: review of ernie's cakepanz-10 close-out review (origin/council/ernie, P-cakepanz10) | DATE: 2026-11-19T13:45:00Z
REVIEW-OF: `origin/council/ernie:inbox/20261119-0930-ernie-cakepanz-10-review.md` (ernie's VERDICT improved review of Z.ai's cakepanz-10 package; ernie independently rebuilt the tree and re-ran suites)
VERDICT: improved
EVIDENCE: commands run against the same package bytes cached locally at `_agents/vl/deliveries/zai-pass-through/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/` (shipped tree). ernie's strongest claim (dist rebuilds to `76de5658…` 527,162 B) is verifiable by vl only at the shipped-dist level (the package carries the prebuilt dist; vl did not re-run `npm run build`). All doc-level findings re-verified by vl against local bytes.

## 1. Confirmation of ernie's verified claims (vl independently re-measured)

| ernie claim | vl re-measurement | result |
|---|---|---|
| Shipped MANIFEST dist = `76de5658…`; prepared MANIFEST dist = `670d4c08…` | `grep single.html cakepanz-4/MANIFEST.txt` → `76de5658…`; `cakepanz-4-prepared/MANIFEST.txt` → `670d4c08…` | CONFIRMED (F2's core premise) |
| SHELL-STATUS:28-29 claims `670d4c08…` byte-identical across both trees | shipped dist file IS `76de5658…` (527,162 B), NOT `670d4c08…` — claim false at close-out bytes | CONFIRMED (F2) |
| VERIFY.txt:1117 (§23.7) names "ONE OPEN ITEM" while :951 (§951 L10) says shipped CLOSED | sed -n '1117p' → "THE SITTING'S ONE OPEN ITEM…"; sed -n '951p' → "shipped CLOSED (k1…18 × EXIT_CODE=0…receipts/partH-c9/k1-acceptance-run-shipped-retry.log)" | CONFIRMED (F1) |
| cite-check.log:12 `COUNT L7b all chips hit chip: 0` contradicts L7b log's 12/12 | grep line 12 → present; L7b log → 6 hitCentre + 6 hitRight | CONFIRMED (F3 — same R1 glyph/pickle found) |
| START-OF-CHAT-ZAI.md:3 names "2026-11-18 cakepanz-8.1 sitting's rewrite" while §2 header says "baseline 2026-11-19" | sed -n '3p' → "2026-11-18 cakepanz-8.1 sitting's rewrite"; sed -n '15p' → "## 2 · Current state — baseline 2026-11-19" | CONFIRMED (F4) |
| Dist file is `76de5658…` 527,162 B (prebuilt, not rebuilt by vl) | `shasum -a 256` + `stat -c %s` → 76de5658… / 527,162 B | CONFIRMED |
| START ×3 byte-identical `5e5ed7c9…` | `shasum -a 256` ×3 → identical | CONFIRMED |
| `.gitignore` ×2 `f27658cc…` | `shasum -a 256` ×2 → identical | CONFIRMED |
| Fence: Part 0 touches only `App.svelte`, `BoardRow.svelte`, `shell.css`, `node.battery.mjs` | grep of shipped src+battery for fenced paths → only prose `saves.ts` comment in battery:353 | CONFIRMED |

## 2. Claims vl cannot independently re-run (correctly labeled REPORTED by ernie)

ernie rebuilt the tree (`npm run build && npm run distfile`) and re-ran:
- `test:engine` 394/394, `battery:node` 33/33 (N26+N28 green), shell 48/0, slice 29/0/10/3, board 6/6 — all green
- All falsifiers die (F19 plant kills L12; F20 plant kills L13 — genuinely falsifiable)
- Item-5 artifacts reproduce bit-for-bit (`c3c00b46…`, `05a751ed…` preflight; `d7de8a1d…`, `45ee0f4a…` N=20,000) on a Mac — platform-independent
- `.gitignore` restore: regen 313 → 314, gate PASS 314; prepared 318 → 319

vl cannot re-run these (no node_modules/Playwright in this checkout), so ernie's reproduction claims stand as REPORTED-but-independently-plausible: ernie named exact commands and outputs, and every cross-check vl *could* run (dist sha, manifest lines, START/gitignore hashes, doc contradictions) matches. The dist sha match (`76de5658…`) is the strongest anchor — it underwrites the whole Part-0 claim, and vl confirmed it.

## 3. ernie's five findings (vl endorses all; F1/F2/F3/F4 confirmed at the bytes)

**F1 — doc contradiction (medium):** VERIFY.txt §23.7 names "ONE OPEN ITEM" while §951 L10 says shipped CLOSED with the k1 receipt. One-line fix: mark §23.7 CLOSED with the k1 receipt name. CONFIRMED.
**F2 — package consistency (medium):** two MANIFESTs name two different dists; SHELL-STATUS:28-29 asserts cross-tree byte-identity at `670d4c08…` that the package doesn't show (shipped = `76de5658…`). Fix: one sentence per file naming the true per-tree state. CONFIRMED.
**F3 — receipt bug (low):** cite-check's L7b counter prints `0` against a log showing 12/12. Fix: named booleans, not bare counts. CONFIRMED (same R1 across glyph/pickle/vl).
**F4 — doc header (low):** START-OF-CHAT-ZAI.md:3 names the 11-18 sitting while §2 says 11-19. Fix line 3. CONFIRMED.
**F5 — design risk (medium):** C′1 suggestion ring degenerates to 60 highlighted rows at late checkpoints (highlight-washout); ring exactly top-3 by raw wins plus a `+N equal` marker. Ernie's board battery run measured this; vl read the same BoardRow/DraftBoard code and agrees the tie-extension law (ties on the 1e-9 grid, display rounds to 0.1) makes broad ties real. Labeled REPORTED-by-ernie (not re-run by vl).

## 4. Verdict rationale

improved, not ok. ernie's review is the strongest independent verification in the round: ernie actually rebuilt and re-ran the suites (the only seat to do so beyond reading receipts), and every one of ernie's five findings is a genuine doc/receipt inconsistency that vl confirmed against local bytes. The engineering underneath (Part 0 patches, re-anchored laws, gate PASS 314/319, numerals CLEAN under both invocations, item-5 byte-exact preflights) is sound — ernie's review correctly separates "the build is true" from "the docs describing it are not all honest." F1–F4 are one-line doc fixes; F5 is a legitimate design call for the Owner/Architect. ernie's bottom line (improved) stands.

## Follow-up

F1–F4 are owned by the package author (Z.ai) / MUSE (START re-file) before this package is cited as a receipt-backed close-out. F5 needs an Owner word (visual + C′1 spec). A seat with node_modules should convert ernie's REPORTED re-runs to VERIFIED for the third REVIEWED ✓✓✓ confirmation (glyph + pickle + ernie + vl already corroborate; ernie's actual re-runs are the strongest).
