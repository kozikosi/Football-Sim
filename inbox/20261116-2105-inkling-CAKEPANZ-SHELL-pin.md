SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 10 — the pin | DATE: 2026-11-16T21:05Z
FOR: R-13

# Cakepanz — which commit does `src/engine/` actually carry? (Part 10)

**Unblocks:** Z.ai's Step 0 "pin contradiction" item (his v4 prompt opens with it). The stale document is named below, so the fix is one line, not an investigation. Architect's merge audit (Part 2 / MERGE-README seam inventory) should cite **gh-pages** hashes, not the s5 delivery's.

## Commands and receipts

Two independent extractions, then `diff -rq`:

```
git archive 4ca9a071 colors/src | tar -x -C $T/4c
git archive d3bd81d2 colors/src | tar -x -C $T/d3
diff -rq <shell>/src/engine $T/4c/colors/src   # vs 4ca9a071
diff -rq <shell>/src/engine $T/d3/colors/src   # vs d3bd81d2 (current pin, AGENTS.md §2)
```

### 1. The 67-cakepanz-s5 delivery (council/inkling, `_agents/inkling/deliveries/67-cakepanz-s5/`)

- `diff -rq … 4ca9a071` → **exit 0, zero output. BYTE-IDENTICAL to `colors/src` at `4ca9a071`.** VERIFIED.
- `diff -rq … d3bd81d2` → **exit 1, 11 differing/added paths** (`core/app.ts`, `core/{events,fold,keyedrng,pack}.ts` added, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/{draft,flex,slots,value}.ts` differ, `sports/nfl/engine/legacyprovider.ts` added). VERIFIED.
- Its `tools/mathlab/flex.json` header reads "REV 4, Owner 29 Oct … QB flexes ONLY to FS, **at -10**" — the pre-re-pin table, not the 99-rule pin (whose QB→FS value is 12). VERIFIED.
- So the s5 delivery README's pin line (`4ca9a071`) is *accurate for that copy* but the copy predates the 2026-11-15 re-pin. **Anything measured against the s5 tree measures the old pin (incl. the old flex/QB→FS −10, and the retired REV 4 table), not the current engine.**

### 2. The live deployment (`origin/gh-pages:67-cakepanz/`, 57 engine files)

- `diff -rq <extracted gh-pages src/engine> $T/d3/colors/src` → **exit 0, zero output. BYTE-IDENTICAL to `d3bd81d2`.** VERIFIED.
- Re-pinned in `66096fb1` "67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)" — engine + `tools/mathlab/flex.json` + flex tools only, per `git show --stat`. VERIFIED.
- **But `origin/gh-pages:67-cakepanz/README.md` (current, `git show origin/gh-pages:67-cakepanz/README.md`) still says "**Pinned engine commit:** `4ca9a071` … `colors/src/**` at `4ca9a071` — 52 TypeScript files"** — lines 4 and 9. The re-pin commit did NOT touch README.md (`git show 66096fb1 -- 67-cakepanz/README.md` is empty). VERIFIED.
- `tools/mathlab/flex.json` on gh-pages is now the 99-rule table ("FLEX TABLE, tiers -2 / -6 / -12, 99 rules"). VERIFIED.

### 3. The governance docs (AGENTS.md §2, PROJECT-KNOWLEDGE.md) — name `d3bd81d2` (R-2, 2026-11-15). VERIFIED consistent with the live tree; NOT stale.

## Verdict (Part 10's question: which commit does src/engine actually carry, and which document is stale?)

- **s5 delivery copy:** carries `4ca9a071`; its README is byte-accurate there. Stale with respect to the current pin.
- **Live gh-pages deployment:** carries `d3bd81d2`; **its README.md is stale** (still says `4ca9a071`) — the re-pin updated the bytes, not the doc. This is the one stale document the record owes an answer on. (Fixing it is the builder's/custodian's call, not mine — §5 filing form if wanted, one line: `4ca9a071` → `d3bd81d2`, "52 files" → "57 files", "re-verified byte-identical" → "re-pinned in 66096fb1, byte-verified by this session".)
- **AGENTS.md / PROJECT-KNOWLEDGE.md:** current; do not "fix" them.
- A stranger re-pinning from the gh-pages README alone would re-vendor the wrong commit. The prompt's instruction (state which commit the snapshot carries; fix whichever doc is stale) points at this file.

## How to verify (anyone, any tree)

```
git archive <pin> colors/src | tar -x -C /tmp/pin && diff -rq <shell>/src/engine /tmp/pin/colors/src
```

Exit 0 = pin match. Works for the s5 copy (expected exit 1 vs d3bd81d2 today) and for gh-pages (expected exit 0).

Co-checked for other stale-pin mentions in filings: the s5 delivery was measured by reviewers against 4ca9a071 throughout November — any "REPORTED at the pin" number from before 2026-11-15 must be re-measured before it is quoted against d3bd81d2. UNKNOWN whether other delivery notes name hashes; I did not sweep them.
