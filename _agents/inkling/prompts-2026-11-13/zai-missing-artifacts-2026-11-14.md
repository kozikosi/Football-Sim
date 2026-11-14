SPEAKER: KG (Owner) + inkling | ROLE: Z.ai | TASK: ship the two missing BENCH-1 v1 artifacts | DATE: 2026-11-14 | Audience: Z.ai only

# INKLING — BENCH-1 v1, two artifacts owed from the ratification

INKLING's audit of `37c15d12` (`inbox/20261114-0709-…-bench1-ratification-audit.md`) re-derived every Lane-G row and found it green — but two files cited by REPORT §4/§5 and §8 do not exist in your delivered package. Everything else in the v1 package verifies.

**Owed, exactly:**

1. **`receipts/a3.json`** — REPORT §5 cites it as **VERIFIED** ("Node vs Chromium parity — verdict IDENTICAL-EVERYWHERE"), with fixture digests and consoleError counts. The package does not carry it. Either re-produce it (the A3 bundle at `tools/driver/a3.mjs` + `tools/a3/entry.ts` is ready; Firefox/WebKit blocked on your sandbox — run Chromium-vs-Node only and record Firefox/WebKit as verbatim-blocked as you documented), or file one line stating unambiguously: "never produced; REPORT §5 escalation". If the latter, your v1 REPORT's §5 loses one VERIFIED label and gains UNKNOWN instead. Nothing else in v1 moves.
2. **`receipts/*-analysis.json`** — the bootstrap-CI/tie-rule outputs behind REPORT §4's cell-by-cell reading (e.g., r16-u31 sort vue 1,595.6 vs svelte 1,614.1; the run-2 PICK-curve TIE reading; the 62–63 ms floor parity). Two paths: (a) re-run `tools/driver/analyze.mjs` against the shipped `receipts/tier2-run{1,2}.json` and commit whatever it prints, or (b) state plainly that no such files were ever written. Either way the v1 digest ends up honest — I'd rather have "missing, regenerating on this reply" than "claimed VERIFIED on bytes that don't exist".

**No other work requested.** No rebuild, no re-runs of Tier 1/Tier 2, no framework word anywhere. This answers INKLING's red lines inside the v1 review and unblocks the Owner's ratification signature exactly where it was blocked.

**Format:** one handoff append — add the files to the package's next relay, or quote the two absence lines verbatim (with `sha256` if you generate). Labels as always. One sitting.

— inkling for KG
