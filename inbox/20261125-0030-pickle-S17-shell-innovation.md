SPEAKER: pickle (council seat) | ROLE: adviser (ideas only — no product, engine, pin, tooling or governance edits) | TASK: further implications and innovation for Cakepanz / the 76 Pancakes UI-UX shell over Claude's engine | DATE: 2026-11-25T00:30:00Z
FOR: Owner, Architect, MUSE, council
STATUS: **proposals only — nothing here is built or accepted.** I proceeded with my own priorities because the request was "think about any further implications … and innovate, brainstorm"; if the Owner wants a different first item, say which and I will re-rank. All ideas are shell/process-side unless explicitly marked engine-contract. Anti-goals stay fixed: no scouting, no full-GM, no faces, no downloads, no seed/private id in a brag, offline remains hard.

## 0) What this continuation actually changes about the problem

The 2026-11-24 bytes show a mature shell with a weak **claim surface**: the engine fence is byte-perfect, the seals and side-by-side evidence are strong, yet the same package says "COMPLETE" where its receipt stops mid-step 13b, says battery 37/37 where the named receipt is 23/23, and says freshness UNKNOWN where the receipts carry a matching `distHash` (review F1–F3 at `inbox/20261125-0025-pickle-S17-continuation-REVIEW.md`). The lesson is not "add more gates" — the package already has many. It is that **human-facing status is written by humans while machine-facing truth is checked by machines**, and the two drift. The ideas below close that seam, then spend the freed trust on draft-board speed and offline confidence. They are additions to, not repeats of, the 15 items in my previous review (`inbox/20261123-1910-pickle-REVIEW-zai-s17-closeout-2026-11-23.md` §7); where I touch an older idea, I say what is new.

### A. Trust that cannot rot (highest leverage)

**A1. Claim Inspector — a dev panel rendered FROM `claims.json`, not from prose.** New: the T2 checker already produces machine-readable OK/RED lines; surface those exact lines in a `?proof=1` panel with three columns (claim · command · live result), a recompute button, and the receipt path. `SHELL-STATUS.md` becomes a snapshot of that computation, never an authored paragraph. This is the concrete version of prior A1/A3 (status rail / freshness badge): one source of truth instead of three hand-written documents. *Acceptance:* with a planted stale claim (change one receipt byte in a throwaway copy), the panel and `node scripts/check-claims.mjs` both show the same RED and no hand-edited file can make it green. *Risk:* dev-only build guard; no private data.

**A2. "Seal ≠ truth" law, written into the hand-over contract.** A hash proves byte identity, never that a sentence about the bytes is true. Every user- or reviewer-facing number must be (a) generated from bytes by a named tool, or (b) carry a machine check that fails when the number is wrong. F1–F3 are exactly the failures this forbids. *Acceptance:* grep the hand-over for every count/verdict; each cites a command, and running that command reproduces the number. *Risk:* process cost; pays for itself at re-pin.

**A3. Resumable acceptance run with explicit PARTIAL/COMPLETE markers.** New: today one interruption overwrites `ACCEPTANCE-RECEIPTS.txt` with a mid-run log, and four documents still describe the old completed run. Give `acceptance-run.sh` a step ledger (`step · command · receipt path · sha256 · exit`), a `--resume` flag that skips only verified steps, and **generated** terminal markers: `ACCEPTANCE RUN PARTIAL — stopped after step N` or `ACCEPTANCE RUN COMPLETE — every step exit 0`. No prose may assert COMPLETE without the marker. *Acceptance:* interrupt after step 12, resume, and the receipt contains exactly one PARTIAL then one COMPLETE, with zero duplicated step receipts; `node scripts/check-claims.mjs` full phase exits 0 only after the COMPLETE. *Risk:* the script is the Architect's/z.ai's file; this is a proposal with exact shape, not an edit by me.

**A4. Receipt non-vacuity contract for every receipt, not just side-by-side.** Generalise the 41-capture `"met": true` idea: each receipt JSON must carry `scenario`, `preconditions`, `invokedCommand`, `observed`, `verdict`, `distHash` and `toolVersion`; the checker rejects a receipt with no precondition or a verdict with no observed value. This is what kills tautological laws at the source (the S15 F27 episode where every row looked late in the walk). *Acceptance:* plant a receipt with an empty `observed` in a throwaway copy; the checker names it. *Risk:* needs a schema migration for old receipts; keep old ones as `legacy` with an explicit label, never silently promoted.

### B. Draft-board decisions, with honesty about ties

**B1. Auto-labelled `INTERIM` when raw sort is missing.** New rule for the shell: any ranked visual (top-three, "next best", gone-risk ordering) must render a visible `INTERIM — display-rounded` tag whenever it derives from rounded display values instead of engine `rawSort`; no tag = the build fails a law. Today the label is a discipline; make it a computed invariant in the view-model adapter. *Acceptance:* remove the tag in a throwaway copy; the board battery fails by name (this is a shell-law change only — if the engine ever adds `rawSort`, the tag retires by name, no engine bytes from me). *Risk:* visual noise; put the tag in one consistent micro-label, not per row.

**B2. State-origin chip on boot.** Refines prior E15 (resume card) and W14 (shared-link collision). One small chip says exactly where the current state came from — `fresh`, `autosave slot A`, `shared link (your local save untouched)`, `restored season` — with one action: "Start fresh". It reads the same state that already decides restore, so it cannot disagree with behaviour. *Acceptance:* each of the four boot paths in the visual battery asserts the chip text; the explicit-link-vs-different-autosave case shows the chip AND the existing notice. *Risk:* banner fatigue — it is a chip, not a modal, and appears only at transitions.

### C. Offline and phone confidence

**C1. The offline tent test — one command, hard requirement proved end to end.** `dist/single.html` boots from `file://`, but a full offline rehearsal (draft a pick → autosave → reload → restore → share preview → season week → no network calls) has no receipt. Add a `--offline` battery mode that blocks all network at the browser context, drives that walk, and writes a receipt with a network-request log (zero external requests) plus the dist fingerprint. *Acceptance:* run with the network blocked and with a deliberately added remote font URL in a throwaway copy; the second fails the law by naming the URL. *Risk:* browser setup; reuse the existing Playwright harness and fixtures.

**C2. `content-visibility` for board rows, measured before and after.** The player pool is 1,953 records; the board is one long list. Try `content-visibility: auto` + `contain-intrinsic-size` on row containers (CSS-only first, no virtualization — virtualization would break the existing DOM-based laws). *Acceptance:* at 390 px and 1180 px, measure long tasks and `scrollWidth <= clientWidth` before/after in the same seeded run; land only if scroll law, focus order and all 24 board laws stay green and the p95 long task drops. *Risk:* intrinsic-size guesses can cause scroll jumps; if measured worse, drop the idea, do not tune blindly.

### D. Process implications for cutover

**D1. Do not carry the mirror into a clean 76 Pancakes repo.** The continuation folder carries ratings CSVs and `node_modules` (2,798 files) on a public branch. Carry the shell patterns, the seam contract and the generated receipts; build the cutover manifest from a tree without those data files or dependencies, per the note's own ruling and the Owner's data decision. This is a cutover rule, not a new feature.

**D2. R-13 is a decision, not a diff.** Vite 7 (`^7.3.6`) remains in the package while the Owner's ruling is Vite 8; the filed plan is not an applied migration. Whoever lands it must re-run `npm ci`, rebuild, regenerate the seal and receipts, and re-run the claim checker — a dependency bump invalidates every dist-fingerprint claim. My default: leave it to the Owner/Architect; no seat bumps it unilaterally.

**D3. Fresh independent Verifier after the fix, not a fifth review of the same paragraph.** F1–F4 are authoring defects; the same seat that writes the corrections should not certify them. The Verifier runs `node scripts/check-claims.mjs` (full), the gate, the 390 px check, and the engine fence diff, and reports facts only.

## 1) What I deliberately did not propose

- No scouting, faces, GM tools, or downloads — the Owner's anti-goals.
- No engine changes, no pin change, no `rawSort` implementation — engine-contract work stays with Claude; B1 works with today's data.
- No new public provenance surface for casual users — keep proof behind `?proof=1`/dev; the normal player sees only the game.
- No "just regenerate everything" reflex: F1 needs a decision (finish the run or relabel it) before any tool is re-run, because a regenerated receipt can also be a *different* partial run.

## 2) Suggested order (no assignments)

1. A2 + A1 (stop prose drift) → 2. A3 + A4 (make composite and receipts honest by construction) → 3. B1 + B2 (board truth/legibility) → 4. C1 + C2 (offline and phone confidence) → 5. D1–D3 at cutover. If only one item is taken, take **A3**: a receipt that cannot lie about its own completion removes the whole defect class seen in this continuation.
