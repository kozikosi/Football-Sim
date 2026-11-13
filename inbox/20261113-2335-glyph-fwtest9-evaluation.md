SPEAKER: glyph | ROLE: council | TASK: fwtest9 evaluation wave | DATE: 2026-11-13T23:35Z

# fwtest9 evaluation — glyph (Lane A verification on available bytes + preflight)

**Scope/limits (stated up front).** VERIFIED claims cite `ref@sha + path + command + hash/output`. REPORTED/INFERRED/UNKNOWN labeled. No product/governance/queue/shared edits. No framework winner/ranking verdict. Z.ai’s v3 delivery is the wave gate; council evaluates/verifies. I did not run independent `npm ci/build/typecheck/Playwright` reruns in this session (no fresh per-arm runtime execution beyond script/manifest checks below); prior runtime runs cited are REPORTED.

## §3 lanes touched
- **Lane A (partial, available bytes):** A1/A3(partial)/A4/A5(partial evidence)/A7 evidence notes on v2 + INKLING deliveries; v3 A1–A8 **BLOCKED** (not delivered).
- **Lane B (measurement summary only):** carry-forward from VERIFIED/REPORTED receipts; no ranking, no winner.
- **Lane C/D/E:** not executed (blocked on consolidated v3 / runtime reruns / maintainer-inspector runs). Digest is INKLING’s (or nearest seat if silent).
- **Lane F cross-checks:** F3/F15 notes where relevant (CHECKSUMS defects, nuxt generate vs build evidence).

## §1 four-line receipts (VERIFIED unless noted)

### V1 — Governance sync (step 0)
1. cwd: `/Users/kosi/Desktop/wt/glyph`
2. cmd: `git fetch -q origin && git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md && git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md && git diff --cached --stat && git commit -m "glyph: sync START-HERE from council/muse (step 0)" -- _agents/START-HERE.md && git push origin council/glyph`
3. ref/sha: `origin/council/muse@59181af82d101875495ec2fe9a9a95e93336932d` → `council/glyph@5f95a888c0141a1410033a6d4e88cb1144b11a0d`
4. output: porcelain empty before checkout; cached stat `_agents/START-HERE.md | 10 ++++++++--`; commit created and pushed `5f95a888..`; all four governance docs now sha256-match muse (AGENTS `64768b89...`, PROJECT-KNOWLEDGE `39427f19...`, START-HERE `daf5abf4...`, START-OF-CHAT `589b4b84...`).

### V2 — Z.ai v2 delivery present and fresh CHECKSUMS verification
1. cwd: `/tmp/kilo-glyph-beamv2/zai-fwtest7-dynamic-engine-2026-11-13` (scratch extraction)
2. cmd: `rm -rf /tmp/kilo-glyph-beamv2 && mkdir -p /tmp/kilo-glyph-beamv2 && git archive origin/council/beam -- zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C /tmp/kilo-glyph-beamv2 && cd ... && shasum -a 256 CHECKSUMS.txt; wc -l CHECKSUMS.txt; shasum -a 256 -c CHECKSUMS.txt`
3. ref/sha: `origin/council/beam@16cf462918861e00e1b86fe237099bced85c98fe` (2026-11-13T13:07:06-10:00), path `zai-fwtest7-dynamic-engine-2026-11-13/`
4. output: `CHECKSUMS.txt` sha256 `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec`, 539 lines. `shasum -a 256 -c` → `537` `OK` lines, exit `1`, `fwtest-7/arm-next/next-env.d.ts: FAILED open or read`, `fwtest-7/arm-next/tsconfig.tsbuildinfo: FAILED open or read`, `shasum: WARNING: 2 listed files could not be read`. **Do not treat as “539/539 OK”.**

### V3 — Z.ai v2 structure, goldens, spec bug, arm-nuxt/solidstart evidence
1. cwd: `/Users/kosi/Desktop/wt/glyph`
2. cmd: `git ls-tree -d --name-only origin/council/beam -- zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7`; `git ls-tree -r --name-only origin/council/beam -- zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7 | grep golden.json`; `git show origin/council/beam:<paths> | shasum -a 256`; `git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/playwright/offensive-focus.spec.ts | sed -n '10,30p'`; `git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-nuxt/package.json`; `git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart/package.json`; `git show origin/council/beam:zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/arm-solidstart/src/routes/index.tsx|app.tsx|entry-server.tsx|entry-client.tsx` (sampled)
3. ref/sha: `origin/council/beam@16cf4629`, path `zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/...`
4. output: 7 arms + `engine-contract,logs,playwright,results,round2`. Goldens (canonical + react/svelte/sveltekit/vue/solidstart/next/src path/nuxt/app path) all `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`. Contract sample `focus.ts` `2bddc2cae61f153d122d54d1f83285f465b47398ad82fda8bbcbc3c1cb1227ca` across checked arms. Spec: `async function boardRows(page: any) { return page.locator(...) }` then `const rows = await boardRows(page).count();` (Promise misuse; shipped bug). Nuxt scripts include `"build": "nuxt build"`, `"generate": "nuxt generate"`, `"preview": "serve .output/public -l 4173"`; Playwright commands note `npm run generate` for arm-nuxt (evidence supports generate for static acceptance target). Solidstart scripts: `dev/build/start` via vinxi (no `preview`), route imports `../app.css` in `src/routes/index.tsx`, entry mounts `#app`; runtime root cause remains disputed/UNRESOLVED by me (prior glyph/ernie/inkling runs REPORTED).

### V4 — INKLING arm-solid/arm-lit delivery, fresh CHECKSUMS verification, hashes
1. cwd: `/tmp/kilo-glyph-inkarms/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13` (scratch extraction)
2. cmd: `git archive origin/council/inkling -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13 | tar -x -C /tmp/kilo-glyph-inkarms && cd ... && shasum -a 256 CHECKSUMS.txt; wc -l CHECKSUMS.txt; shasum -a 256 -c CHECKSUMS.txt; shasum -a 256 DELIVERY.md MAINTAINER-INSPECTOR.md PLAYWRIGHT-RESULTS.md PLAYWRIGHT-V3-2026-11-14.md arm-solid/src/engine-contract/fixtures/golden.json arm-lit/src/engine-contract/fixtures/golden.json`
3. ref/sha: `origin/council/inkling@94c6f7e06b63e7f686dcfdd07501c2023b2b2fed` (2026-11-13T13:03:46-10:00), path `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/`
4. output: `CHECKSUMS.txt` sha256 `267469c1569667c459aeffa8d6379cf28f30979fb5097b585c5e068a314369b9`, 109 lines. `shasum -a 256 -c` → `106 OK`, exit `1`, `WARNING: 3 computed checksums did NOT match`: `DELIVERY.md` (listed `77d7a677...`, extracted file `bb0f7eca...`), `PLAYWRIGHT-RESULTS.md` (listed `c97dd1e8...`, extracted `20b0382a...`), `PLAYWRIGHT-V3-2026-11-14.md` (listed `72949619...`, extracted `e63a2d36...`). Manifest/byte mismatch on those three files must be explained before treating manifest as clean. Goldens both `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`. Contract `focus.ts` sample `2bddc2ca...` (git-shown earlier). Ernie ledger/work-request report WR-1 measured 5/5 each (REPORTED).

### V5 — v3 delivery search (BLOCKED)
1. cwd: `/Users/kosi/Desktop/wt/glyph`
2. cmd: `git for-each-ref --format='%(refname:short)' refs/remotes/origin` loop with `git ls-tree -r --name-only` grep for `FRAMEWORK-TEST-RESULTS-2026-11-14|fwtest-9|fwtest9|zai-fwtest-v3|zai-fwtest9`; targeted `git ls-tree` checks on beam/zai/inkling/ernie
3. refs: all origin heads at fetch time (tips include beam `16cf4629`, zai `25e3b2f9`, inkling `94c6f7e0`, ernie `6a84391e`, glyph `1922155f`/pre-push states recorded)
4. output: only `origin/council/ernie:_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` and `origin/council/inkling:_agents/inkling/prompts-2026-11-13/dispatch-council-fwtest9-2026-11-13.md`; **no v3/9-arm/2026-11-14 result package found**.

### V6 — A3 script execution
1. cwd: `/tmp/kilo-glyph-a3` (scratch)
2. cmd: `git show origin/council/vl:_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/parta/a3_plays_ledger_check.py > a3_plays_ledger_check.py; shasum -a 256 ...; python3 a3_plays_ledger_check.py`
3. ref/sha: `origin/council/vl` path blob `2b6224db...`, copied sha256 `a09e020ce65db2c144d8c39cfc756abdf5de8cbbe304adf9fe5037657c3219fb`
4. output: exit `0`, 11/11 rows reproduce, assertions pass (FB>TE tier 6 @4.74, OLB>FS tier 12 @11.74, C>OG tier 6 @5.13, C>DT tier 12 @9.12, FB>RB tier 2 @3.30).

## Lane B — scoring/measurement notes (no verdict, no ranking)

| Column (GPT weights) | Glyph measurement status (this session) | Notes |
|---|---|---|
| Correctness 20% (gate) | **PARTIAL / REPORTED** | v2/v3 spec bug: shipped locator misuse means Priority-not-Wins acceptance assertion could not complete as written (V3). Prior reruns with harness-fixed spec: 6/7 v2 arms 5/5, solidstart 0/5 (REPORTED). INKLING/Ernie report solid/lit 5/5 fixed-spec (REPORTED). v3 consolidated: UNKNOWN. |
| Round-2 modification 20% | **NOT MEASURED** this session | No per-arm round2 manifest re-run performed by glyph now. |
| Agent implementation quality 15% | **NOT SCORED** | Single-author confound caveat remains (REPORTED in prior filings). |
| Engine integration 10% | **PARTIAL / VERIFIED samples** | Goldens identical across sampled arms/deliveries (V3,V4); contract sample parity on checked files; full forbidden-global/leakage scan not rerun glyph now. |
| Maintainability & clarity 10% | **NOT MEASURED** | Maintainer-inspector (WR-G3) not run. |
| UI quality & responsiveness 10% | **NOT MEASURED** | No browser rerun now; prior 390px/DOM observations REPORTED only. |
| Server-ready architecture 10% | **PARTIAL / REPORTED** | Ernie reports offline `file://` blocked for tested arms, `base:'./'` insufficient (REPORTED). Solidstart hydration issue REPORTED/disputed. |
| Tooling friction 5% | **PARTIAL** | Nuxt requires `generate` for static acceptance artifact per scripts/playwright commands (V3); solidstart has no `preview` script (V3). Full install/build timing matrix not rerun by glyph. |

**Eliminations:** none declared by glyph (insufficient consolidated verified rerun). Prior evidence flags arm-solidstart as acceptance-red in v2 (REPORTED) — v3 disposition required.

## Open questions (§8) — glyph answers

1. **Does your machine rebuild all nine arms from cold?** UNKNOWN (not attempted this session). Toolchain present: Node `v26.13.0`, npm `11.20.0`, Python `3.15.1` (VERIFIED). Only 7 v2 + 2 INKLING arm sources currently available in checked refs; v3 consolidated package not delivered.
2. **Does the corrected spec pass on your machine?** UNKNOWN (not rerun now). Prior glyph harness-fixed rerun on v2 reported 6/7 pass, solidstart 0/5 (REPORTED). Ernie/INKLING report corrected/fixed spec outcomes per their filings (REPORTED).
3. **Is `npm run generate` required for arm-nuxt per your machine?** INFERRED/REPORTED from artifacts: `package.json` has `build/generate`; Playwright commands instruct `npm run generate` and preview `.output/public`; INKLING notes generate required for acceptance target. Not independently rerun by glyph.
4. **Does CHECKSUMS in the v3 delivery verify on your machine?** BLOCKED — v3 not found (V5). v2: 537 OK, 2 unreadable, exit 1 (V2). INKLING arms: 106 OK, 3 checksum mismatches, exit 1 (V4).
5. **Is `file://` a legitimate standing gate, or a separate wave?** INFERRED: legitimate product-requirement gate candidate (offline/one-file direction) but current arms appear to fail as-is (REPORTED by Ernie); should be measured as its own explicit column/wave decision with reproducible single-file experiments (WR-2). Owner decides.
6. **Any arm you'd strike from contention on correctness alone?** UNKNOWN by glyph direct rerun. REPORTED evidence: arm-solidstart 0/5 in v2/v3 probes due rendering/hydration failure — candidate for elimination/repair pending verified v3 receipts.
7. **Weakest link in this protocol itself — and what would you have written instead?** Manifests/checksums not reproducible from shipped bytes (v2 unreadables, inkling listed-vs-extracted mismatches) and spec drift (bug shipped; nuxt generate/build ambiguity) create false confidence. I would require: (a) CI/script-generated CHECKSUMS from the exact packaged tree as final step, (b) `shasum -c` zero-failure line attached, (c) per-arm “how to serve for acceptance” in a single machine-checked table, (d) shipped Playwright spec executed once in clean env with JSON attached.
8. **What did you do this wave that nobody asked for, and why does it matter?** Re-ran A3 plays-ledger check script from `origin/council/vl` in scratch (V6, exit 0) and verified beam A4 arithmetic correction consistency to reduce unverified correction carry-over; also verified INKLING CHECKSUMS against fresh archive and surfaced 3 manifest/file mismatches (V4) which affects trust in “106/106” style claims.
9. **What is UNKNOWN after your pass, and who unblocks it?** v3 artifact existence/contents (Z.ai/any seat who finds it unblocks), consolidated 9-arm independent build/typecheck/Playwright matrix (any seat with env/time), solidstart true root cause/fix (WR-G4/WR-4), offline single-file feasibility (WR-2), maintainer-inspector/shape-change amplification (WR-G3/WR-3), lambda grid rerun underlying numbers. Owner unblocks policy decisions (framework choice, offline gate, acceptance of repairs/eliminations).
10. **If INKLING vanished mid-digest tomorrow, what exactly would you tell the next seat to do?** Pin v3 ref@sha; fresh-extract and run `shasum -c` with 0 failed/unreadable; inventory 9 arms and spec fix; independently rerun install/build/typecheck/Playwright per arm with env+commands+JSON; record solidstart as repaired-with-receipts or eliminated; merge with v2+inkling receipts in one measurement-only table (no winner); file discrepancies/dissent; hand digest packet to Owner and cite every row.

## Caveats and blockers
- **Primary blocker:** Z.ai fwtest v3/9-arm package not found on checked origin refs (V5).
- No glyph independent runtime reruns this session (time/scope); prior runs are REPORTED.
- INKLING delivery CHECKSUMS does not validate cleanly against extracted bytes for 3 doc files (V4) — needs explanation/correction from source owner.
- Nuxt/Next/SvelteKit static behavior and Solidstart hydration require runtime verification on v3 bytes.
- `file://` offline behavior remains a critical open axis (REPORTED failures).

## One move I learned this wave
Treat “CHECKSUMS exists” and “manifest numbers in prose” as untrusted until `shasum -a 256 -c` runs on a fresh extraction with exit 0 and explicit 0-failure/0-unreadable output — v2 and inkling both showed why.

## Dissent
- I dissent from any claim that v2 or inkling manifests are clean without showing `shasum -c` exit/output neighborhood: v2 has 2 unreadable listed files (exit 1), inkling extraction shows 3 computed mismatches (exit 1) despite prior “106/106” style statements.
- I dissent from treating `npm run build` as sufficient nuxt acceptance evidence when static preview/generate path is the acceptance target; the protocol must name the per-arm serve/build command that matches the artifact.
- No dissent with Inkling’s “no verdicts, Owner decides” framing; I support it.

*End of glyph fwtest9 evaluation filing.*
