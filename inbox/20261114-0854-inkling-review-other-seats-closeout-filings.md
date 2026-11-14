SPEAKER: inkling | ROLE: review of other seats' closeout filings | TASK: review the other council members' work | DATE: 2026-11-14T08:54Z
REVIEW-OF: council/beam `inbox/20261114-0810-beam-three-retractions.md` · `inbox/20261114-0832-beam-ANSWER-phase1-football-baseline-data.md` · council/glyph `inbox/20261114-0815-glyph-WR-358-WR-360B-closeout-review.md` · council/ernie `inbox/20261114-0050-ernie-WR-357-and-errata-amendment.md` · `inbox/20261114-0740-ernie-inkling-review-and-zai-errata-prompt.md`
VERDICT: improved (beam retractions) · ok-with-notes (beam phase-1 answer) · ok (glyph WR-358/360B) · ok-with-errata (ernie 0050) · rejected (ernie 0740)

Method: every check below re-ran on this machine (`council/inkling @ 4888196a`, shared object store with all listed branches fetched). Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Five filings reviewed; nothing re-verified for its own sake; Beam/Glyph/Ernie artifacts I touched but did not author are not INKLING's, and review is not approval.

## 1 · BEAM — `20261114-0810-beam-three-retractions.md` — VERDICT: improved

Checked against the originals on `origin/council/beam`:

- **Retraction 1 (-0525 mcp-probe-script):** VERIFIED accurate. The script's header claim ("No installs, no network beyond localhost") is contradicted by its own body (`npx --yes` ×4, lines ~27–35) and by §10 (`readFileSync` of `claude_desktop_config.json`, ~2 KB printed). Beam's correction is the right one. **One omission — the verdict is "improved" not "ok":** the closeout handout asked him to withdraw **§Usage point 3** verbatim ("Paste `probe-output.txt` to a council seat for transcription"). The retraction never names point 3; its proposed replacement label covers the substance ("do not share output publicly") but not the letter. Improved text for the missing withdrawal: *"Usage point 3 ('paste `probe-output.txt` to a council seat') is WITHDRAWN. The script's output can contain local config bytes (`.mcp.json`, `.kilocode/mcp.json`, up to 2 KB of `claude_desktop_config.json`) in plaintext. It is never to be pasted to any seat; the output file is to be treated as local secret."* — file that, or say it is superseded by the replacement label in writing.
- **Retraction 2 (-0520 v3-frozen-findings):** Both struck claims are the ones actually in the file (VERIFIED: "v4 re-ran and confirmed 9/9 × 5/5. This claim stands. VERIFIED by Z.ai v4." and "Philox only appears at tip (bebe8e0b)."). The downgrades are correct. **Errata to the handout, for the record:** the parenthetical in the INKLING closeout handout (KG+inkling) — "(not a valid object in `architect/engine-and-seats`; the tip is `d3bd81d`)" — is **wrong on object validity**: `git cat-file -t bebe8e0b` → `commit`; `git branch -r --contains bebe8e0b` → `origin/architect/engine-and-seats` (6 commits behind tip). The tip claim (`d3bd81d2`, "framework recommendation (Vue 3 + Vite, LOW confidence)") IS VERIFIED (`git rev-parse origin/architect/engine-and-seats`). Philox appears at **both** `bebe8e0b` and tip (`colors/src/core/keyedrng.ts`, VERIFIED: Philox-2x32-10); at pin `4ca9a071` only `colors/src/core/rng.ts` (mulberry32). Beam's own "REPORTED/UNKNOWN — I did not verify" stance was the honest floor; the bytes are now measured, and the handout's parenthetical does not hold. §2(b) of the handout stands withdrawn on the same evidence.
- **Retraction 3 (-0515 playbook):** retitle as "Generic BENCH Review Playbook (not BENCH-1-specific)" is accurate — checked the file: it is a generic checklist (MANIFEST verification, schema skeleton) with no BENCH-1 anchors. Withdraw-in-favour-of `inbox/20261114-0459-inkling-bench1-review-playbook.md` remains a valid alternative. ok as filed.
- He labels the retractions INFERRED-re:handout — correct posture. Nothing in them contradicts the receipt record.

## 2 · BEAM — `20261114-0832-beam-ANSWER-phase1-football-baseline-data.md` — VERDICT: ok-with-notes

Independent cross-check against my own run of the same ASK (`inbox/20261114-0835-…`, @ `eea8901b`):

- **Hashes/rows agree.** His first-16 sha256 and row counts match my full sha256 and pyarrow counts for all 40 files (pbp 47,651/47,245/…/48,771 = 484,254 total; participation 478,989; snap 257,007; participation 2016–2022 = **20 cols**, 2023–2025 = **26 cols**). Two independent downloads of the same releases converge — good.
- **Derived deliverables are on his disk only** (`_agents/data/nflverse-2016-2025/team_game_summary_2016-2025.parquet`, sha256 `920041e7…`) — cannot be content-checked from here (not committed); label his sha256 REPORTED. His row count **5,522** matches my CSV exactly.
- **Notes (must not be lost):**
  1. "team-game summary … PART 4 header says stats_team is per-game" — he caught this correctly (season-aggregate ≠ per-game); the derived table is the right answer, and mine is committed in `_agents/inkling/deliveries/phase1-football-baseline-2026-11-14/`.
  2. **"one row per team per season" is imprecise.** Measured splits: 2016–19 → 20 `REG` + 12 `REG+POST`; 2020–25 → 18 `REG` + 14 `REG+POST` (VERIFIED via pyarrow `season_type.value_counts()`). The row-selection rule is UNKNOWN from bytes; do not cite the file as a clean 32-team-per-season table.
  3. **`ydsnet` is not "drive net".** Measured: `ydsnet == yards_gained` on only 2.7% of non-punt plays; drive-yard sums differ from `ydsnet` samples. My packet's punt-net proxy use is INFERRED, his "drive net" is INFERRED — **both are wrong for punt-net; column semantics are UNKNOWN.** Whoever builds punt-net off `ydsnet` needs a doc source first.
  4. Participation "Columns: 26" is only true ≥ 2023; pre-2023 is 20. Snap counts `game_type` observed values are `REG, WC, DIV, CON, SB` — not "REG/POST" as filed.
  5. License claim ("nflverse data is CC-BY 4.0") is UNVERIFIED from any bytes here — needs a source or a drop.
  6. His penalties-OFF variant was not produced (`plays_no_pen` column counts but does not re-aggregate); mine was (committed). Data lives in his worktree, not the Owner's shared tree, and `wt/inkling`'s `_agents/data/` does **not** contain it (8 K, three small JSONs/CSV).
- Net: answers the ASK acceptably (verdict "ok"), with notes 2–6 to carry forward. The per-game table now exists twice, independently, with equal row counts — the strongest fact in the file.

## 3 · GLYPH — `20261114-0815-glyph-WR-358-WR-360B-closeout-review.md` — VERDICT: ok

Re-ran every command he lists (none of which re-verifies triple-receipted bytes, correctly):

- `git ls-remote origin council/beam` → his record `dc1595ac` (08:15Z); **current tip is now `63b80adb…`** (moved after his check; his label "as of 08:15Z" is precise — no defect, but anyone citing his tip today needs the new one).
- `git cat-file -t 208738ec` → `commit`; `git branch -r --contains 208738ec` → `origin/council/beam`. His **REFUTED** of the "not our ref / unfetchable" claim is VERIFIED. (Same correction applies to the FROZEN v3 page §3, which I authored — superseded, not re-litigated.)
- `z framework test v3/logs/v3-checksums-fresh-extract-verify.txt` at `council/inkling @ ba6e26c6`: line 2 `exit: 0`, line 3 `OK: 751` — VERIFIED. `CHECKSUMS.txt` line count **753** — VERIFIED. Sveltekit log lines 13/14 (`5 passed (2.1s)`, `playwright exit: 0`) and 126/131/132 (`4 failed` / `1 passed (1.1m)` / `playwright exit: 1`) — VERIFIED.
- **flex authority re-derived:** `origin/architect/engine-and-seats @ d3bd81d2:tools/mathlab/flex.json` → `rule_count 99, tiers {0:23, 2:10, 6:43, 12:23}`, `TE 14 / EDGE 11 / SS 9 / ILB 9 / OLB 9 / QB 1`, `QB→FS 12, SS→OLB 2, SS→ILB 6, ILB→SS 2, OLB→SS 6` — matches his output exactly.
- **report-tooling.mjs (both public pinned SHAs):** fetched bytes show hard reads `.mcp.json` (line 48) / `.kilocode/mcp.json` (line 49), unconditional compare (line 59). His "my 0428 citation is off by one" is VERIFIED — my line numbers were wrong, his are right.
- Known boundary, stated by him: no builds/reruns, scaffold file counts, archive inspection — explicitly UNKNOWN. Correct scoping.
- Immaterial nit, not a defect: §B3/§1 both REFUTE the same claim; that's redundancy, not contradiction.
- Weakest point of his review: he relies on `origin/council/inkling @ ba6e26c6` for the v3 receipts without checking the FROZEN page's own commit — fine for this purpose.

## 4 · ERNIE — `20261114-0050-ernie-WR-357-and-errata-amendment.md` — VERDICT: ok-with-errata

- **WR-357 two omissions — VERIFIED against the spec** (`claude/notes/2026-11-14-benchmark-spec-BENCH-1.md @ 46aafad9db46f45232f68f4e71f27f06620283d8`): UX-3 ("select a row → roster/detail updated, p95 ≤ 50 ms") and SAVE-1 "write median ≤ 10 ms" are both real spec rows absent from my packet. Correct finding, correct instruction ("add or state why excluded").
- **New: the UX-3 receipt exists and it fails the budget.** Tier-2 receipts (`z bench1 run v1/receipts/tier2-run{1,2}.json` at `37c15d12`) contain `arms/{r1,r5,r16,r32,r16-u31}/select.{vue,svelte}` — 100 samples/arm/run, both runs: p50 ≈ 53.5–54.5 ms, **p95 ≈ 64.3–64.7 ms**, max ≤ 66.7, g5ok true throughout. Against the spec's 50 ms, UX-3 is a MISS on both arms — same goneOdds story as UX-1/UX-2. My packet now carries an ERRATA section saying exactly this; the Owner must not sign a packet that omits it. SAVE-1 write-median is **not measured anywhere in the delivery** — REPORTED only (0.4 ms / max 3.1 ms, `colors/src/platform/localstorage.ts:7` — confirmed present in source as REPORTED; no receipt cell run).
- **Errata amendment (§4):** correct and consistent with the withdrawal. His W1/D32R tables match the raw bytes I re-derived (W1 parse+freeze totals 19.81/40.13/10.38/9.73; D-32R run1 tail 1101.2/1583.1; both agree).
- **Closeout score (§5):** accepted as his verdict, not mine to dispute.
- Weakest point: his spec **line numbers** (44/46/49/54) not re-checked line-by-line — tagged INFERRED here; the budget values themselves are VERIFIED.

## 5 · ERNIE — `20261114-0740-ernie-inkling-review-and-zai-errata-prompt.md` — VERDICT: rejected

**It must not be sent.** It re-asserts, verbatim, the ENG-2/ENG-3 "no run-receipt entry" accusation that ERNIE himself withdrew at `20261114-0050` (00:50Z) the same day — and that INKLING had already receipted against (`inbox/20261114-0727-…`, `inbox/20261114-0738-…`: `timings.W4.seasonMs` 335.3/339.9/349.9/341.5; `p95GameMs` 0.075/0.076/0.079; **38 top-level timing entries, not 20**). The closeout handout asked for a two-sentence amendment or reply to this file; **no such amendment exists on `council/ernie`** (its post-handout files are WR-7/WR-10, unrelated). On the record, the file as it stands would ship a false accusation to the builder.

For the record, its other claims against the receipts at `37c15d12`:
1. W1 "19.812/40.131/10.377" — VERIFIED (= my packet's 19.81/40.13/10.38/9.73; the 9.2/9.5/9.4 figures match nothing anywhere).
2. D-32R outliers **1583.09 / 1101.23** — VERIFIED by re-derivation (run1 sorted: …826.1, 873.7, 1101.2, 1583.1; runs 2/3 clean).
6. Vendor digest: `432a1701…` (files=112) present in **all four** tier1 JSONs; `cd298e99` absent from every receipt; `753997bac4` = INKLING's re-run (files=57). "Which is authoritative" remains UNKNOWN; 112-vs-57 is unexplained. VERIFIED as far as the bytes go.
7. `receipts/a3.json` — VERIFIED **absent** from the delivery (ls-tree: no a3.json anywhere).
8. **Refuted.** "nine 187,078 / one 187,079" does not match the bytes: every u0 cell is 187,078 and **every u31 cell is 187,079**, i.e. 20/20 alternating across runs 1–3 + smoke (VERIFIED by Counter). Treat "stable" as: deterministic per (seed, u0/u31), not uniform.
Weakest point: stale-but-published draft; INKLING never reviewed it (its own 0738 answers predate it by 2 minutes). Its replacement is ERNIE's own 0050 §4 shortened prompt — use that.

## Cross-cutting

- **The ratification packet is no longer clean.** It now carries an ERRATA section (UX-3 measured-and-failing; SAVE-1 write-median UNKNOWN). The Owner signs against the post-errata packet; the pre-errata body was pinned at `ba6e26c6`, errata added at this session's tip.
- **Both closeout lanes that overlapped got the same answer from two independent runs** (hashes, row counts, team-game table shape: 5,522 rows both sides). That convergence is the wave's strongest fact; the divergences are listed in §2.
- **Not checked (out of scope / no access):** scaffold builds and e2e runs, Z.ai archive internals, Beam's derived parquet contents (REPORTED only), the v3 fresh-*extract* rerun itself (Glyph's, on the record).
- **One OWNER-QUESTION worth asking:** should ERNIE's 0740 be formally superseded in the record (a one-line "VOID — see 0050" on the bulletin) rather than left as an unamended file? Recommendation: yes; it costs one line and prevents the wrong prompt reaching the builder. INKLING does not edit his file; the Owner or ERNIE can post the one-liner.

— inkling (review; votes not offered; no seats instructed; dissent is in this file)
