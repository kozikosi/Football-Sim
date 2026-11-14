SPEAKER: inkling | ROLE: council · deeper sweep | TASK: review the remaining unread seats' filings (ernie, beam, glyph, vl) | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — deeper sweep review, filing-by-filing

Labels: VERIFIED (INKLING re-ran) / REPORTED (seat filings) / INFERRED / UNKNOWN. **Verdicts are receipts, never frameworks.**

## Ernie (council/ernie)

- **`…-0312-comparison-readiness…`** — the comparison-invalidation list (scaffolds moved mid-measurement; Vue 16→13→0 dirty; svelte no-git→commit within ~50 minutes; stale `.svelte-kit/`; jsdom vs node unit envs; Node 26 vs pin 24) is the sharpest process finding of the wave; its fix is already the state of the world (repos published + frozen; `.svelte-kit` gitignored; Node split honestly recorded everywhere). BUT it carries the same two recurring wrong figures this whole wave produces: "1,200 rows / 7-round draft ~224 picks" — the live engine is **1,941 rows / 32 × 32 = 1,024 picks** (`draft.ts` SLOT_IDS), three independent receipts; the `~224` figure was INKLING's own error that same day (corrected inline at `a0512633`). It also proposes its own "41-file contract + WR-7 blocked on 43/41" — **re-anchored this pass at `inbox/20261114-0532`: 43 shipped, 41 vendored, both named tools absent from every arm. WR-7 is REAL; Ernie was right.** Its "Layer-4 AI-agent column" is empty until the engine lands in the arms (agrees with Z.ai's C1 and Claude's BENCH-1 state row).
- **`…-0330-harness-audit`** — honest census; key contaminations flagged, two now rotting on this machine that predate frameworks talk: (a) `/Users/alexledger/.vite-plus/bin/xcodebuildmcp` inside `~/agent/mcp.json` — a foreign user's config on THIS machine, flagged to the Owner verbatim (anyone's config that reaches here is a problem); (b) the `Football-Sim` vs `Football Sim` duplicate-name collision — both live, different content. Node 26 everywhere vs pin 24 repeated as warning (accepted).
- **`…-0331/0345/0355` handoff reconciliations** — template for the whole wave's method: state the stale fact, re-verify, date-stamp everything ("every capture must carry `date -u +%Y-%m-%dT%H:%M:%SZ` + top-line `package.json` deps" — adopted as house rule). His correction of his own "no Vue MCP" line inside `…-0345` §3 is exactly the self-correction pattern this wave needs to pay for; takes courage, costs nothing.
- **`…-WR-1`** — measured INKLING's arms 8/9 honestly: CHECKSUMS 110 entries → 106 OK, 1 mismatch (**self-referential empty-file entry** `e3b0c442…b855`, the manifest listing itself), 3 "missing" = his own extraction omission, not real misses. His independent note that a Python parser beats macOS `shasum -c` for that manifest matches INKLING's own earlier receipt finding the same class of failure — both true, different files.
- **`…-WR-2`** — **material for the record**: "file:// is a build step, not a framework axis" — arms 8 and 9 (INKLING's) went SINGLE-FILE via two-line `vite.config.ts` change (`vite-plugin-singlefile@2.3.4` + `build:{cssCodeSplit:false, assetsInlineLimit:100_000_000, modulePreload:false}`) and then render, hydrate and pass 5/5 from `file://` with **zero console errors**. This overturns the flat "0/9 offline" reading: it is a *bundle architecture* fact, fixable, and today only acted on for the two plain-Vite arms. Recorded, not applied (nobody rebuilds arms without the Owner's word); the offline column needs re-baselining when the product ships a single-file build.
- **`…-WR-3/WR-4/WR-5/WR-G2/WR-6`** — internally consistent with the INKLING/beam/glyph record everywhere they touch it; the arm-lit and arm-solid measurements (5/5, builds exit 0, 341 ms/281 ms) add receipts for the last two arms; the eight-stack coverage map matches the steering record (Lit is the ninth, not one of the 8 named stacks). One small item noted in review rather than corrected since it's ancestral data: he quotes `LEAKED constants "5deca930"` ref — refers to a dead lineage cell this wave (struck at `46b8fbb9`; cat-file today: 0 objects — VERIFIED).
- **`…-0120/…0255/…0312`** — the framework-eval files: all consistent with the byte-locked chain (v4, v3) except those two repeating 7/28/… exactly two wrong-deck figures (the 1,200-row board and the "~224"), flagged above, like his §B/E claims. Nothing contradicts the byte-locked items and none of it should be cited for a ruling without the re-anchors above.
- **Disposition**: ERNIE'S WR-7 RIGHT, TODAY. Everything else from him either verifies or holds as opinion; nothing else in this pass overturns the standing picture.

## VL (council/vl)

- **`…-2115 / -2140-fwtest8-evaluation.md`** — methodically honest; explicitly labels its two arm-gaps (arm-solid / arm-lit absent — INKLING's
— VERIFIED unavailable locally to him), the Node 26 vs pin 24 deviation, the 539-manifest closure, and the 7-arm mechanical table (build ✓, forbidden globals 0, contract byte-identity, golden `0ccb6319…` across all 7, audit where measured). **The one stat worth repeating in the digest: `arm-solid` is 5/5 green, `arm-solidstart` is 0/5 in SSR and 5/5 in SPA mode — same component tree, so the SSR path is the difference, not the component code.** The "Type-check is not a column yet" finding (arm configs disagree: `strict:false`, none, 143 errors) stands — type-check discipline is unresolved across the suite; not a framework quality signal either way. The output-bytes column shows every arm between 89,600 and 668,007 B with 1,200-file-scale noise — bundle deltas here mean demos, not the product (consistent with INKLING's §E3 and Z.ai v4 §E3).
- VL's volatile tree (20 modified + ~8 untracked under `deliveries/zai-pass-through/…fwtest/`) is the single most at-risk artifact on this list of seats; no action taken; flagged for the Owner in the same breath as always.

## Beam (council/beam)

- **`…-1906…-1984`** and **`…-2325/-2345/-2355`** — his fwtest8/P-wave reviews are consistent with INKLING's prior observations where they overlap (contract identity, focus-list data sufficiency, exp-arms measurement baseline grid); no new contradiction in this pass. His P-232 review references a **navy/`BEFORE/AFTER`** measurement of the same acceptance spec — coherent with the 4ca9a071 pin and contract fixture homes; nothing contradicts it. His `-2125-framework-evaluation` scored arms on a qualitative rubric without a Primary wire — read as opinion, not used as evidence; in the record.
- His three stop-sign filings (-0515/0520/0525) are recorded at `inbox/20261114-0504…` §1 and in `P-356`; his once-over carve-out (flex D2 note → the `bce305fa` commit he pushed this week) is acknowledged as closing his lane correctly under your directive.

## Glyph (council/glyph)

- Assignment receipts (0421 ×5): byte-locked corroboration stands (sha256 flex `0a26d7c2…` EXACT match this pass; smoke specs exactly as claimed (waitForFunction pattern), demo route matches source; the one substantive omission is **the same smoke ENOENT note all seats now carry** — consistent, and fixed only by applying or proposing P-359; his content includes exec receipts nobody else produced (a working `waitForFunction` variant).
- His harness audit:诚恳 limitations exactly as filed, honest (`sv` via npx, no Vue/Svelte MCP, no Vue skills, `timeout` absent) — good signal for the digest.

## Cross-seat common thread INKLING would put in the digest verbatim

**Two seats measured what no other seats would do: the offline column under a *correctly repaired* build.** file:// is a build step, not a framework axis (Ernie WR-2, VERIFIED receipts in two independent arms-arm-inklings: arms 8/9). **All "performance is opinion" disclaimers are accurate and this wave produced zero valid product-scale numbers anywhere.** **Framework verdict: still UNDECIDED, and today's reading does not even inch it.**

## Notes for the Owner

- The Ernie/Z.ai "WR-7" line is the live thread connecting v3 → v4 → this review: 43 shipped, 41 vendored, arms cannot run goldens from inside; it gates the correctness half of any future BENCH-1 Tier-2 from inside an arm. Standing at P-359, now correctly framed.
- Watching one new failure mode all wave: INKLING's own two withdrawals today. Both corrected publicly; neither needs a pause to fix — but the discipline finding worth carrying is in both: **cite the denominator, never the subtree.**
- The 20 modified + ~8 untracked files in VL's tree remain the at-risk artifact; your word keeps it.

Labels: VERIFIED/REPORTED/INFERRED/UNKNOWN as marked inline; nothing here outranks the byte receipts it cites.

— inkling
