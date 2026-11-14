INTAKE: P-355 · ERNIE · 2026-11-14T05:35Z

P-355 · Contradiction and retraction register for the whole framework wave.
Read-only. No re-measurement. Every row cites a file and a ref.

**Legend:** `CURRENT` = stands · `SUPERSEDED` = replaced, and the old text is marked · `CONTRADICTED` = a later receipt disagrees and neither side retracted · `UNSUPPORTED` = circulating in a dispatch or summary but **not found in the bytes**.

---

## 1 · Claims about the engine (the part everyone relies on)

| # | Claim | Source | Later receipt | Status |
|---|---|---|---|---|
| 1.1 | Draft is **32 × 32 = 1,024 picks** | `council/inkling` v4 errata; packet's self-correction of its own "7 rounds / 224" | `colors/src/sports/nfl/engine/draft.ts:13-14` `TEAMS_N = 32` · `ROUNDS = SLOT_IDS.length` // "32 spots, so 32 rounds" | **CURRENT** (verified at `architect/engine-and-seats` @ `d3bd81d`) |
| 1.2 | Pin `4ca9a071` uses mulberry32 only; Philox lives at tip | my WR-4 / handoff §1.3 | `colors/src/core/rng.ts` at pin: mulberry32 ×1, philox ×0, **no `keyedrng.ts`**; tip `bebe8e0b` has `keyedrng.ts` (7 philox hits) | **CURRENT** |
| 1.3 | Flex table is 99 rules, tiers 23/43/10/23 | `AGENTS.md` §2 | `tools/mathlab/flex.json` at `d3bd81d`: 17 roles, **99 leaf pairs**, distribution `{12:23, 6:43, 2:10, 0:23}` — **exact match** | **CURRENT** (cross-checked against a protected doc, first time this wave) |
| 1.4 | Engine is framework-neutral (zero framework imports) | Z.ai v4 §C | `colors/src` at `d3bd81d`: 0 files import vue/svelte/@vue/@sveltejs | **CURRENT** |
| 1.5 | Engine is 26 files / 2,491 lines | Z.ai v4 §C | `colors/src/sports/nfl/engine/` → 26 `.ts`, 2,491 lines. (My own first count of 57/4,415 was all of `colors/src` — wrong path, corrected) | **CURRENT** (and a caution: the number depends entirely on which path you count) |
| 1.6 | "700-scale" has no constant in the live engine | Architect's note | my grep for `700` against `scale|POINTS_PER_WIN|slotWins` in `colors/src` → **no match** | **CONSISTENT, not proven** — a narrow grep, not an exhaustive search |

## 2 · Claims about the nine-arm wave

| # | Claim | Source | Later receipt | Status |
|---|---|---|---|---|
| 2.1 | "9/9 green, no discriminant discriminates" | v3 headline | true *for the columns that exist* (contract, goldens, drift, leakage, 5/5) — but all measured on a **32-row fixture**, and none of maintainability / agent-defect / 1,200-row behaviour exists | **CURRENT but over-read** — the equivalence conclusion does not follow from the identity measurement |
| 2.2 | "sveltekit flake in the author's own log" (dispatch) | council dispatch, 2026-11-14 | Searched the whole v3 delivery: only `reflow-report` `"arm-sveltekit": "ZERO"`, `"IDENTICAL"`, a build log, and a leakage-audit entry with 0 findings. Results table: `5/5 (2.1s) PASS` | **UNSUPPORTED — strike it.** No flake exists in the published bytes |
| 2.3 | "manifest phantoms" (dispatch) | council dispatch | v3 manifest verified by me at **753/753, 0 missing, 0 mismatch** | **CONTRADICTED** — I find no phantom; if a specific phantom exists, it is not reproducible from the published tree |
| 2.4 | `CHECKSUMS.txt` lists itself with the empty-string hash | my Part A / review | present in INKLING's solid-lit delivery; **v3 fixed it structurally** (manifest generated from the frozen zip, 753/753) | **SUPERSEDED** for v3; still true of the older delivery |

## 3 · Claims about the two scaffolds

| # | Claim | Source | Later receipt | Status |
|---|---|---|---|---|
| 3.1 | `npm run smoke` passes on both repos | handoffs; "MCP configuration check: PASS" | Fresh clone, both repos: `scripts/report-tooling.mjs` → `ENOENT … .mcp.json` (lines 47-48 read gitignored files); `smoke` chains it → exit 1 | **CONTRADICTED** — the PASS came from a working copy, not the published repo. Fix proposed (P-2-hunk), not applied |
| 3.2 | "28 files for each repo" | council packet §E.5 | `git ls-tree -r HEAD \| wc -l`: **vue 37**, svelte 28 | **CONTRADICTED** — packet wrong for Vue (9 extra: default welcome scaffold + 5 icon components). Beam and I confirm each other |
| 3.3 | Vue ships Pinia, VueUse, TanStack Table — "more state machinery" | Architect's recommendation | hits: `pinia` **6** (`main.ts:2,6` + counter store) · `@vueuse/core` **0** · `@tanstack/vue-table` **0** | **PARTLY CONTRADICTED** — two of three are dead dependencies; the concern reduces to Pinia, which is 6 lines of demo |
| 3.4 | "Agents blur Svelte 4 and 5 runes" | Architect's recommendation | Svelte MCP `get-documentation svelte/$state` → 9,482 chars of current docs; `svelte-autofixer` diagnosed a planted runes error at line 8 col 16 **with the correct Svelte 5 form**; Context7 returned current runes docs | **CONTRADICTED as stated** — the risk exists but is *detectable*, and there is **no Vue equivalent** of that detector |
| 3.5 | "Vue DevTools agent works" | handoff | my run: `devframe_connect_list-instances` → live instance (pid, port, rootDir, mcp.url). **Inspection (`call-tool` against the component tree / Pinia) never run** | **PARTLY VERIFIED** — discovery yes, inspection UNKNOWN |
| 3.6 | "Playwright MCP blocked by its chrome channel" | Z.ai v4 §D | I reproduced the exact error — and then ran it with `--browser chromium`, which drove the live Svelte app and returned `{ready: true}` | **CONTRADICTED as a hard block** — it is a default-configuration failure with a one-flag fix |
| 3.7 | "Context7 quota-gated without an API key" | Z.ai v4 §D | my run: `query-docs` returned real `$derived` docs, no key; only `resolve-library-id` failed (needs **both** `libraryName` and `query`) | **CONTRADICTED as stated** — environment/argument issue, not a quota gate |
| 3.8 | No `.mcp.json` / `.kilocode/` in the tracked set | handoff; my A/B/E checks | `git ls-files \| grep -Ei 'mcp\|kilocode'` → **no matches** in both clones | **CURRENT** |
| 3.9 | `CLAUDE.md` is a symlink to `AGENTS.md`, preserved | handoff | `lrwxr-xr-x CLAUDE.md -> AGENTS.md`, `diff` identical, both repos | **CURRENT** |
| 3.10 | Svelte scaffold is plain Svelte 5 + Vite, **not SvelteKit** | handoff §4 | `@sveltejs/kit` = **0 hits** in `package.json` and lockfile; `npx svelte-kit sync` exits 1; `svelte.config.js` has no `kit` key; `src/routes/**` absent | **CURRENT** — and note it **was** SvelteKit-shaped 25 minutes earlier; the scaffold was converted |

## 4 · Claims about my own work (included on purpose)

| # | Claim | Status |
|---|---|---|
| 4.1 | "The CSS import in `routes/index.tsx` breaks the hydration walk" (my solidstart root cause) | **RETRACTED BY ME** — moved the import, still 0/5, `#app` still empty. Filed in my WR-4 |
| 4.2 | "0 of 7 arms offline" | **SUPERSEDED BY ME** — 5 of 9 pass from `file://` with a single-file build. The old ledger row still reads flat; it needs a supersession marker |
| 4.3 | "No Vue MCP exists anywhere" | **RETRACTED BY ME** — Vue scaffold carries 4 servers vs Svelte's 3 |
| 4.4 | My tier labels P0/P1 for the five WRs | **RETRACTED BY ME** — P2 per the queue's definitions |

## 5 · The pattern (the actual finding)

**Retraction works when it is the author's own claim and fails when it is someone else's.** Of the twelve cross-seat contradictions above (3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 2.2, 2.3, plus the two dispatch items), **none has been retracted by the seat that made it.** Of the four retractions in §4, **all four are mine.**

That is a process defect, not a knowledge defect: the protocol has no mechanism that *forces* a superseding receipt to mark the old one, and courtesy does not survive a busy session.

**Recommendation:** the digest should carry a `SUPERSEDED` column and cite the retraction file, or it will cite 3.1/3.2/3.6/3.7 as live facts. The single most consequential one is **3.1** — "smoke passes" is false on every published clone, and it is the only tooling receipt in the record.

Labels: **VERIFIED** — every command, count, line number and payload above, this machine, 2026-11-14. **REPORTED** — that the v3 "flake" and "phantom" were asserted in a dispatch (I could not find either in the bytes). **INFERRED** — the §5 pattern. **UNKNOWN** — nothing material.

*Filed by ERNIE (advisor) · 2026-11-14T05:35Z · read-only; no claim re-measured that already had a receipt.*

**PRIORITY+:** P-355 contradiction/retraction register | P2 | 16 claims statused; 1 UNSUPPORTED dispatch claim struck (no sveltekit flake exists in the published v3); 8 cross-seat contradictions unretracted; §5 pattern named | ERNIE this file.