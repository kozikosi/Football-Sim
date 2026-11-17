SPEAKER: inkling | ROLE: council | TASK: Part 3d of the superseding council prompt — adjudicate the F2/F3 falsifier dispute on the Cakepanz-4 tree; re-derive with corrected target strings; run them; say which is true | DATE: 2026-11-17T21:27Z
FOR: R-13

# F2/F3 falsifiers on the Cakepanz-4 tree — VERDICT: **SETTLED (both laws die, fresh runs) — with a Node ≥ 26 portability caveat the whole falsifier class shares**

**Verdict first:** MUSE's v1 reading is the one that matches measurement. Beam's "still UNFALSIFIED-THIS-SITTING" does not reproduce on this tree, and the premise "the mutation targets moved since Cakepanz-3" is **not true** — both anchors are present verbatim in the delivered tree. What IS true: on Node ≥ 26 the falsifier/battery cannot run at all as delivered (see §4) — so "settled" is Node-24-conditional, and the Cakepanz-5 precompile ask is what makes the receipts portable. This is my own run, not a citation of the delivery's receipts.

**Machine:** macOS arm64 · Node v26.13.0 (default) · Node v24.22.3 via `npx node@24` · fresh copies under `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/falsify-{clean,f2,f3}` made from the delivered tree (never touched the delivered bytes).

**The Cakepanz-4 tree under test:** `_agents/inkling/deliveries/cakepanz-4/` on `council/inkling` (the Owner-delivered, verbatim repo copy; byte-identical to the Desktop original, verified when filed 20261117-0747). The hosted copies on `council/beam`, `council/ernie`, `council/vl` are the same bytes by construction (pushed for read access); not re-diffed — say so if you need that check stated as VERIFIED rather than INFERRED.

## 1. The re-derivation (what the anchors are, exactly)

F2 (N14 offline/no-CDN), `scripts/receipt-falsifier.mjs` lines ~64: target string **`.card { max-width:420px`** in `src/lib/port/shareable.ts` line 22 → replacement plants **`background:url(http://cdn.example/x.png);`**. Present verbatim in the delivered tree (grep VERIFIED, line 22). The mutation, when it lands, puts an external http URL inside every rendered shareable card's CSS.

F3 (N12a saves roundtrip), same file lines ~73: target string **`return rostersOfRecord(fx.record)[fx.userTeam].map`** in `src/lib/port/fixture.ts` line 51 → replacement **`return ([]).map`**. Present verbatim (grep VERIFIED, line 51). The mutation empties the fixture's frozen user roster inside `fixtureRoster()` — which `fixtureWeekPayload()` embeds in the week envelope. The "roster 32 → 31" wording in the delivery's falsifier.log understates it: the mutant is a 0-player roster.

## 2. The runs (fresh copies, Node v24.22.3 as delivered under, `--experimental-transform-types --test`)

Baseline (F0 equivalent — unmutated): **exit 0 · 24 pass · 0 fail** (VERIFIED; log `/tmp/falsify-clean-24.log`).

F2: mutation applied OK (assert fired; the target was present). Battery: **exit 1**; exactly one law dies — **`N14: every shareable card is ONE self-contained blob (no CDN, no network, provenance inside)`** at `batteries/node.battery.mjs:209` (the `/https?:\/\//` assertion in the N14 law, VERIFIED). Pass 23 / fail 1. ✓ DIED.

F3: mutation applied OK. Battery: **exit 1**; exactly one law dies — **`N12a: the week payload round-trips (serialize → restore → hydrate)`** at `batteries/node.battery.mjs:177`, with `AssertionError: week: roster must be 32 frozen players` (line 181, thrown inside `restore()`), VERIFIED. Pass 23 / fail 1. ✓ DIED.

Both mutants kill **precisely their own law and nothing else** — the falsifier class behaves.

## 3. The delivery's receipts vs mine

The delivery's `deliveries/receipts/falsifier.log`, `node-falsifier.log` and VERIFY.txt §7 already recorded both dying on the author's machine, and attributed the Beam↔Inkling split to a stale-wording/re-anchored-target reconciliation. **My independent fresh-copy re-run reproduces that conclusion exactly — so the reconciliation is now double-receipted, in two machines' hands, and Beam's "still unfalsified / targets moved" is closed with evidence, not with citations.** The one correction I owe the record: the F3 mutant is an empty roster, not "lose a player"; the law died inside `restore()`'s own 32-frozen-players guard, which is a stronger and earlier gate than a hydration-length check would have been.

## 4. The Node ≥ 26 caveat (the only surviving reading of "unfalsified")

On this machine (Node v26.13.0):
- `node --experimental-transform-types --test batteries/node.battery.mjs` → **`node: bad option: --experimental-transform-types`, exit 9** (VERIFIED) — the falsifier script's hard-coded flag no longer exists.
- `node --experimental-strip-types --test batteries/node.battery.mjs` (the battery's own documented invocation) → **`SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript parameter property is not supported in strip-only mode`** at `src/engine/platform/localstorage.ts:31` (VERIFIED; this is the same D-1-class blocker the Cakepanz-5 prompt asks Z.ai to precompile away).
- The `receipt-falsifier.mjs` as delivered on Node ≥ 26: F0's clean baseline exits 1 with the mislabelled message "CLEAN BASELINE RED — the copy fails without any mutation" and stops (its child can never start, so `dyingLaws()` returns truthy `['(nonzero exit, failing test not parsed)']`). **It fails loudly, never as TAUTOLOGY — good — but the diagnosis names the wrong cause.** Worth one line in the Cakepanz-5 acceptance checks for the precompile fix: after `localstorage.ts:31` is precompiled out, `receipt-falsifier.mjs` must still not report TAUTOLOGY/DIED spuriously on Node ≥ 26; either the flag is resolved by the runner (resolve a Node 24 binary, as my D-2 said) or the child preflights and exits 1 with a named error. Do not accept "the falsifier passes on my machine" as the fix's receipt — the F0 baseline check must be re-run under whichever Node the fix targets.

So: **on Node 24 both laws are settled-died (double receipt); on Node ≥ 26 the whole battery/falsifier class is unexecutable-as-delivered** until the precompile fix lands. Beam's instinct was half right — not the targets, the portability. If Z.ai's Cakepanz-5 ships the precompile, the F2/F3 receipts should be re-taken under both majors in the same sitting; that re-take is part of 3a/3c, not of this filing.

## 5. Naming the target strings (as the prompt requires)

F2/N14: `.card { max-width:420px` (shareable.ts:22) — planted `background:url(http://cdn.example/x.png)`. F3/N12a: `return rostersOfRecord(fx.record)[fx.userTeam].map` (fixture.ts:51) — replaced with `return ([]).map`. Both VERIFIED present, both mutations verified applied before the battery ran (assert before write), both batteries exit 1 with their own law red.

**BLOCKED:** nothing. **OPEN:** whether Beam's v3 prompt gets a one-line correction when the Cakepanz-5 prompt goes out (his "still UNFALSIFIED" clause now has my receipt to close against — that's the Owner's/MUSE's call, not mine). **NEXT:** (1) if the Cakepanz-5 precompile lands, re-take F2/F3 under Node 24 AND Node 26 — one command each; (2) the Cakepanz-5 acceptance battery should include the flag/preflight line above; (3) the "roster 32 → 31" wording in the falsifier source should be corrected to "roster → 0" — cosmetic, say it so the next reader isn't misled.

VERIFIED — every run in §§1–4 on this machine. REPORTED — the delivery's own receipts (falsifier.log, VERIFY.txt §7). INFERRED — the premise of "targets moved" originated in Cakepanz-3 review notes; not re-audited. UNKNOWN — whether Beam re-ran his side after the delivery landed.
