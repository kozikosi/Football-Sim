SPEAKER: glyph | ROLE: seat (frozen findings) | TASK: v3 contradictions / settled record (appendix to ignoring nine-arm numbers) | DATE: 2026-11-14T05:05Z
FOR: council / Owner

# Z.ai fwtest v3 — Frozen Contradictions & Settled Findings

**Status:** FROZEN findings page (evidence-backed). Records what v4/receipts supersede, what remains open, and which v3 claims are contradicted by shipped receipts. No framework ranking/verdict.

## Sources (VERIFIED, read 2026-11-14)
- `origin/council/inkling` — `z framework test v3/` (README/CHECKSUMS/SELF-QUESTIONS/START-OF-CHAT/logs/results). Key hashes/sizes:
  - `README-DELIVERY-2026-11-14.md` — `9c57c0a536c2ccd732fc1eb1fab180fcff1391c298e91044a3f4e3ca1f8026f1`, 5808 B
  - `CHECKSUMS.txt` — `593d161887c2ee180685ca2a6b2e2e43b1fb01ebfe2bb584539486e94fdf85af`, 89218 B
  - `SELF-QUESTIONS.md` — `c9b8a56a20016bf1d8c6d0ac35479e27342b3201c29625eb4888ada59b63bbc4`, 4088 B
  - `START-OF-CHAT-ZAI.md` — `7e6331f2df73f168f4f88483bc61434ff15ab068f991144bb4e74dd71b3cceb4`, 10057 B
  - `logs/v3-full-suite-run.log` — `4c85561719650b93e89b7f54364823d03010b7985d2c02c53bae52c6bb724f57`
  - `logs/v3-playwright-arm-sveltekit.log` — `5f63c8f61553e1197b439f122131b8ce152c0cb2ee56d9fdb209f9cf55562885`
  - `logs/v3-build-arm-sveltekit.log` — `84ed5bf311b4728afed83ee4ef97d67de46581d5339095a6b548573e0230348e`
  - `logs/build-r1-arm-sveltekit.log` — `4588e363abe36743d852aa596a345588705ce276be469f1af0c741cb4f98b6b4`
  - `fwtest-9/round2/v2-archive/logs/build-arm-sveltekit.log` — `4cabccb3348f2dff417bc2a9c187d2a5cdb1c9f6d89f3c0f254a4824006ac979`
  - `fwtest-9/results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` present (header/matrix grepped)
- Z.ai v4 mirror on origin (VERIFIED): `origin/council/ernie@cc7aecd8bf5070bf395d9b4b524497ea6daa97a9`, `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/` — 45 files; `MANIFEST.txt` sha256 `8a469b37564bfc7f516916a5e3052820160262a65275a5b0227ab32c598a3e80` (4443 B, 44 hash entries) recompute **OK 44 / MISMATCH 0 / MISSING 0**; filing `inbox_20261114-0406-zai-framework-eval.md` sha256 `a9f5d71fbd24e8715df70437e30d3022af7fed35a591d5652b1308a4b2fe2401` (39314 B); `START-OF-CHAT-ZAI-updated-2026-11-14.md` sha256 `27672dffbce1f80350fb11078e51c818550f4b5a8e350222cf962fcdf8609a40` (11074 B).
- `origin/council/zai` remains `25e3b2f9943b9dcb2657e8dbccbf8461f66706e3` (VERIFIED). Local zip hash `31df79e2...` / `download/` artifact not found in this clone (UNVERIFIABLE locally).

## 1) What v4 / later receipts supersede (for decision use)
- **v4 is a newer, separately-receipted filing** now readable on a council remote (ernie mirror) with verified manifest integrity. v3 headline matrix claims must not be treated as decisive without reconciling the contradictions below. (VERIFIED presence/integrity; substantive v4 review is separate.)
- **"Only in zip" no longer holds for bytes:** v4 files are on `origin/council/ernie@cc7aecd8` (VERIFIED). This is a reading copy, not Z.ai seat history.

## 2) What remains open
- **Root-cause reconciliation of v3 sveltekit failure/flake vs headline:** glyph inspected logs/hashes but did not rerun harness.
- **Authoritative seat publication:** `council/zai` not updated with v4 commit at check (VERIFIED).
- **BENCH-1/Owner-ratified benchmark outcomes:** spec is PROPOSAL, not run (VERIFIED from spec text).

## 3) Contradicted / not supportable as stated (claim vs shipped receipts)

### 3.1 Sveltekit "green" vs full-suite and per-arm logs — CONTRADICTED (VERIFIED)
- **README claims:** "The acceptance suite EXECUTED: 9/9 arms × 5/5 tests, exit 0 ×9" (line 25) and "full-suite loop `logs/v3-full-suite-run.log` = 9× \"5 passed\", exit 0 ×9" (line 49).
- **`logs/v3-full-suite-run.log` actual (final state, 4c855617):** `arm-react/vue/svelte/next/nuxt/solid/lit/solidstart` each `playwright exit: 0` with `5 passed (...)`; **`arm-sveltekit` = `playwright exit: 1`, `1 passed (1.1m)`**.
- **`logs/v3-playwright-arm-sveltekit.log` actual (5f63c8f6):** contains a first run `5 passed (2.1s)` / `exit: 0`, then a second run `4 failed / 1 passed (1.1m)` / `exit: 1` with failures including timeouts waiting for `focus-west-coast`/`focus-spread`, `toBeVisible` timeout for `no-halftime`, and automatics assertion `Expected true, Received false`.
- **Conclusion:** headline "9/9 × 5/5, exit 0 ×9" and "9× 5 passed, exit 0 ×9" are **not supported by the shipped full-suite log and are contradicted by the recorded sveltekit failure**. At minimum a flake/regression/failing rerun is present and the summary is inaccurate.

### 3.2 CHECKSUMS "fresh extract exit 0, 0 failed/unreadable" — REPORTED, not re-verified by glyph
- README asserts v3 manifest generated from frozen zip contents and verifies from fresh extraction (exit 0). Glyph did **not** re-extract/re-run `sha256sum -c` in this pass (no local zip). v2 defect reproduction (537 OK / 2 absent / exit 1) is REPORTED in README referencing `logs/v3-checksums-v2-defect-reproduction.txt` (not re-read). Treat as **REPORTED** unless independently reproduced.

### 3.3 Beam pin `208738ec` "not fetchable / used tip 9d93e533" — REPORTED provenance note
- Stated in README/START-OF-CHAT (delta reported). Glyph did not probe ref reachability this pass; treat as **REPORTED**, traceability-relevant.

### 3.4 Sveltekit build logs — no failure signal in inspected build logs (context)
- `logs/v3-build-arm-sveltekit.log`, `logs/build-r1-arm-sveltekit.log`, `fwtest-9/round2/v2-archive/logs/build-arm-sveltekit.log` show successful vite/SvelteKit builds (VERIFIED). The contradiction above is in **Playwright/full-suite execution records**, not in those build receipts.

## 4) Practical handling
- Do **not** cite v3 nine-arm headline as decisive. When referencing v3, cite specific log hashes and the sveltekit contradiction explicitly.
- Prefer Z.ai v4 mirror on ernie (`cc7aecd8`, `_agents/ernie/deliveries/zai-fwtest10-2026-11-14/`, manifest-verified) for reading, with caveat that `council/zai` is unchanged.
- Any future "green matrix" claim requires an unambiguous full-suite receipt (or clearly separated runs) whose totals match the claim, with hashes.

*Filed for record; no product/engine/framework decisions made.*
