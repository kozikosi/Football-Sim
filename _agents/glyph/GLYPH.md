# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then run START-HERE §1 step 0 (refresh governance docs from `origin/council/muse`): check `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`, checkout the four from muse if clean, confirm `git diff --cached --stat` lists only those four before committing.
2. Read this file to the end — it is the handover: measured facts, open items, what not to redo.
3. Read your own open/canonical documents (already in worktree; do not ask for a list):
   - `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`
   - Canonical stable handoff: `_agents/glyph/HANDOFF.md` (or `git show origin/council/glyph:_agents/glyph/HANDOFF.md`)
   - Latest immutable session records: `_agents/glyph/inbox/20261113-2228-glyph-session-handoff-and-council-work-requests.md`, `_agents/glyph/inbox/20261113-2335-glyph-fwtest9-evaluation.md`
4. If something is missing you are behind your branch: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
5. Live queue: `git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete tool before push). Take next action you can complete with receipts, or complete WR-G*/review work from handoffs.

Nothing else is needed to resume.

## Current snapshot (2026-11-13T23:35Z, glyph)
- **Tip:** `origin/council/glyph@1922155f52bf7d2c15460e9fe0d4b2ca516801d1` (+ this session’s pending push if newer commits follow).
- **Governance synced:** START-HERE refreshed to `origin/council/muse@59181af8` in commit `5f95a888`. All four governance docs in worktree sha256-match `origin/council/muse@59181af8` (VERIFIED 2026-11-13T23:33Z). Known MUSE-owned doc defects remain unpatched (AGENTS 99-rules/97d7e9d note wording; PROJECT-KNOWLEDGE 97-rule/105 expected and old PRIORITIES header) — do not edit governance files.
- **Z.ai fwtest v2:** `origin/council/beam@16cf462918861e00e1b86fe237099bced85c98fe:zai-fwtest7-dynamic-engine-2026-11-13/` (7 arms). `CHECKSUMS.txt` sha256 `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec` (539 lines). Fresh `git archive` extraction + `shasum -a 256 -c`: **537 OK, 2 unreadable/missing listed** (`fwtest-7/arm-next/next-env.d.ts`, `fwtest-7/arm-next/tsconfig.tsbuildinfo`), exit 1, WARNING 2 (VERIFIED). Goldens sampled all `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`; contract `focus.ts` sample `2bddc2cae61f153d122d54d1f83285f465b47398ad82fda8bbcbc3c1cb1227ca` across checked arms. Prior glyph Playwright/build rerun REPORTED (react/vue/svelte/sveltekit/next/nuxt 5/5, solidstart 0/5 SSR shell/no testids; spec bug fixed in harness copy).
- **INKLING arms:** `origin/council/inkling@94c6f7e06b63e7f686dcfdd07501c2023b2b2fed:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` (arm-solid, arm-lit). Extracted `CHECKSUMS.txt` sha256 `267469c1569667c459aeffa8d6379cf28f30979fb5097b585c5e068a314369b9` (109 lines); `shasum -a 256 -c` in fresh archive extraction: **106 OK, 3 computed checksums did NOT match** for `DELIVERY.md`, `PLAYWRIGHT-RESULTS.md`, `PLAYWRIGHT-V3-2026-11-14.md` (listed hashes differ from extracted file hashes), exit 1 (VERIFIED). Goldens `0ccb6319...`, contract `focus.ts` `2bddc2ca...`. Ernie WR-1 measured 5/5 each in fixed-spec env (REPORTED).
- **Z.ai fwtest v3 / 9-arm (2026-11-14):** **not found** on checked origin refs at 2026-11-13T23:3xZ (`git for-each-ref` + `git ls-tree` search for `FRAMEWORK-TEST-RESULTS-2026-11-14*|fwtest-9|fwtest9|zai-fwtest-v3`) — **BLOCKED on delivery**.
- **Flex (live):** `origin/architect/engine-and-seats@425f72a8:tools/mathlab/flex.json` sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (99 rules, tiers `{0:23,2:10,6:43,12:23}`) = muse mirror; glyph local mirror differs (`28a2e993...`) — needs verified resync in glyph lane if updated.
- **A3/A4:** A3 script `origin/council/vl:.../parta/a3_plays_ledger_check.py` (blob `2b6224db...`, copied sha256 `a09e020ce65db2c144d8c39cfc756abdf5de8cbbe304adf9fe5037657c3219fb`) ran in `/tmp` → exit 0, 11/11 reproduce/assertions OK (VERIFIED). A4 sentence arithmetic in beam filing verified consistent; grid values REPORTED/UNKNOWN (not rerun).

## This session’s filings (glyph)
- `inbox/20261113-2314-glyph-WR-G1G2G8-A3A4-fwtest-v3-preflight-coverage.md` (WR-G1 preflight BLOCKED, WR-G2 map, WR-G8 flex evidence, A3 run, A4 note) — commit `1922155f`, pushed.
- `inbox/20261113-2335-glyph-fwtest9-evaluation.md` (Inkling fwtest9 evaluation wave filing: Lane A on available bytes, open questions, blockers, dissent/corrections) — this session.
- `inbox/20261113-2336-glyph-P-141-review.md` (queue review, byte-checked against PreColors/docs/Z-post-blue refs) — this session.

## Open gaps / next useful actions
- **WR-G1:** byte-check Z.ai fwtest v3 immediately on delivery (fresh extraction, CHECKSUMS 0 failed/unreadable, 9 arms, spec fix diff, contracts/goldens/leakage/round2, independent per-arm reruns, solidstart disposition, arm identity).
- **WR-G2/Ernie ledger:** consolidate v2 + INKLING + v3 when available; Ernie WR-1 done for solid/lit (REPORTED).
- **WR-G3:** maintainer-inspector uniform pass (data-only focus add, pristine copies, arm-owned touched counts).
- **WR-G4:** solidstart root-cause/fix investigation (scratch copy patch + 5/5 or elimination receipts).
- **WR-G5:** measurement-only scoring/aggregation packet (no winner).
- **WR-G6:** staged GitHub Actions plan proposal.
- **WR-G7:** engine-intent specs/proposals (#11/#13, dynamic/layered engine) with invariants/determinism/test plans.
- **WR-G8 follow-up:** resync glyph `tools/mathlab/flex.json` mirror to architect if needed (verified).
- **WR-G9:** lambda synthesis aligned to Owner ruling.
- **Queue reviews:** P-141 review filed this session; P-142/143/144/151 and others remain open for reviews/work by any seat.

## Standing rules
- Byte-check everything (Owner 2026-11-13): VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits. Only Architect edits product.
- Football first; Svelte not a lock; 8 stacks on table; do not delete React until ruled out; framework-neutral plain TS core. Z.ai test = definitive data, council evaluates/verifies. Server-ready deterministic core direction. No injuries; follow settled rulings.
- Nothing delivered until pushed commit (hash) or download link.

## Session close
Update `GLYPH.md` + `HANDOFF.md` + dated immutable inbox handoff/bulletin as needed; `git add -- <paths>`; commit; `git push origin council/glyph`; record hashes/tip.
