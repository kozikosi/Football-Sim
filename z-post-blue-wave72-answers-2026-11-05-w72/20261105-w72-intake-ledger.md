# W72 INTAKE LEDGER — the Owner's briefing (relayed via Muse), itemized

**Source:** Owner's message, received 2026-11-05 · **Form:** nine questions (§1–§9) + decisions + one hard requirement.
**Rule:** Owner's words are law verbatim. Nothing here is paraphrased into permission.

## Decisions received (locked)

| # | Decision | My action |
|---|---|---|
| D1 | No storage migration; `legacy.ts` deleted at cutover; old saves orphaned by design; confirm no other callers first | Confirmed: sole caller is its own test file (`test/core/namespacing.test.ts`) [V this session] |
| D2 | `rngState` → `runCounter`: accepted in principle, pending proof | Proof delivered (fork purity + order-independence run); `run` semantics nailed in the answer §9 |
| D3 | Sport discriminator `'nfl'`/`'nba'` on the envelope only, not on actions | Already true in `envelope.ts`/`store.ts` [V] |
| D4 | Sync dispatch + async storage accepted, pending race-condition design | Delivered: ADR-4 (per-slot FIFO queue, monotonic revisions, pagehide flush) |
| D5 | Full replay: not a v1 priority; don't architect against it | Honored: additive `kind:'game'` checkpoint path documented, nothing built |
| D6 | Outcome Lab: read FINDINGS-for-architect.md | **Read this session** (both findings now carry Kosi's rulings: home win rate fine as-is; parity compression by design — both dropped from the queue) |
| D7 | **HARD REQUIREMENT: fully offline** (tent in the woods; local-first, sync-on-reconnect; offline login impossible, account picks up everything on reconnect) | Designed: ADR-5 (SW precache-all + acceptance test) and §3 merge-on-reconnect = the v1.1 mechanism with no separate path |
| D8 | OAuth replaces my 6-digit pairing; `/v1/pair` goes away; five endpoints revised | Delivered: ADR-6 (six endpoints, PKCE-in-SPA, opaque sessions) |
| D9 | N1 exhibit approved with four answers (role names; archive links mine+Claude's; full story incl. 20-0 + message-loss incident as incident handling; cadence by long-term goals) | Build plan §8; ready to build, no open questions |

## Questions received (all answered in `20261105-zai-to-muse-executor-answers.md`)

- §1 Framework (ranked; Svelte walls honestly; React speed; SvelteKit vs Workers) → answered, ADR-1
- §2 Storage (swappable substrate?; real byte sizes; queue + failure behavior) → answered with measurements, ADR-2/3/4
- §3 Offline + SW (cache policy; update strategy; minimal SW; merge-on-reconnect) → answered, ADR-5
- §4 Sync revision (OAuth endpoints; tokens; Workers changes; four sync laws) → answered, ADR-6
- §5 Game feed (does drive data already exist; example; ordering; emission vs derivation; FeedEvent union) → answered, ADR-7
- §6 What I need from Claude (minimum surface; hard-to-replicate patterns; underspecified items) → listed (6 items + 4 gaps)
- §7 Debt (43 Math.random classification; dunder rulings; window.* approach; inventory coverage) → answered with a fresh w70 sweep
- §8 N1 build plan (six files; questions?) → ready, none open
- §9 Overall take → given unfiltered, incl. determinism proof + envelope field split (now vs v1.1)

## Veto/precision flags (things the Owner's text could be misread as saying)

1. "Answer all the same questions" was read as: the Z.ai-version nine sections are the assignment; the Claude-version's overlapping items are answered **from the executor seat** where I hold the evidence (determinism proof, save sizes, legacy callers, datasetHash canonicalization) and left to Claude where he holds the pen (FeedEvent freeze, VM boundary).
2. The storage brief's "compressed localStorage" preference is treated as superseded by measurement, not silently ignored — flagged in the answer §2 and ADR-3.
3. "The brief proposed localStorage-first" — confirmed implemented as: interface async-native, substrate swappable, v1 default localStorage **uncompressed** (the compression half of the old preference dies).
4. §5's "440 seasons" — the sweep aggregates and discards per-game results; the *engine* emits drives per game on demand. Answered precisely to avoid "the data is in the JSON" being overclaimed.
