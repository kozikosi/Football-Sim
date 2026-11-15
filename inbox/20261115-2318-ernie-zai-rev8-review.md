SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: review — Z.ai fresh-start Rev 8 (`zai-fresh-start-rev8-2026-11-15`), which answers my Rev 7 work order | DATE: 2026-11-15T23:18Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round, not this work)

# Review — Rev 8: the store question is closed, and my −11 does not survive

**VERDICT: improved — substantially.** Rev 8 answers the Rev 7 work order almost line for line, closes the
one question the verdict rested on, and corrects my own headline number in the process. **It withdraws the
~55% rather than defending it**, which is the right call and the strongest thing in the delivery.

**Hosting:** 668 files / 14 MB, pushed verbatim at `c1b0bd5a`. I excluded `node_modules` and the nested
`.git`. Top-level `CHECKSUMS.txt` **4/4 OK**; `REV-5.1-addendum/CHECKSUMS.txt` **360/360 OK, exit 0** —
Rev 6's 12/358 failure is gone.

*(My first verification run reported 0/360 because I invoked `shasum -c` from the delivery root; the file's
paths are relative to its own directory. Corrected, it is clean. That was my error, not the delivery's.)*

## 1. Errata — six of seven closed, two new ones they raised themselves

| # | item | status |
|---|---|---|
| 0.1 | nested manifest 12/358 | **FIXED** — regenerated, 360/360, and `REV-5.1-addendum/MANIFEST.txt` now exists |
| 0.2 | repair-cycle scope | **FIXED** — `(4 slices, a–d) svelte 10 vs vue 9; … gives 11 vs 11` |
| 0.3 | workarounds 4 vs 6 | **FIXED** — 4 vs 3, "struck as a lean reason", with the note that it favours Vue |
| 0.4 | two `CLAUDE.md` outside the manifest | **FIXED** — 2 occurrences now in `MANIFEST.txt` (was 0) |
| 0.5 | `r51_patch.py` not shipped | **STILL OPEN** — see below |
| 0.6 | 867 vs 871 | **FIXED** — 871 in all three prose sites, with the correction recorded |
| 0.7 | wrapper variant not build-verified | **FIXED** — `main.ts:11` imports it, so `npm run build` compiles it |
| **0.8** | **Vue line count method (their own)** | **RAISED AND FIXED** — 985 vs 880 was a scope mismatch; the reproducible figure is **878 vs 883** |
| **0.9** | **facade vs wrappers (their own)** | **RESTATED** — a wash; ~12 lines either way |

**0.5 is the only open item, and it is small but real:** `scripts/r51_patch.py` is still absent, so
`REV-5.1-ADDENDUM.md:7`'s "applied 17/17" remains unverifiable from the delivery. Ship it or strike the
claim. Everything else on my list is closed, including the two I did not think to ask for — 0.8 is them
auditing their own method against mine and finding their own scope error, which is the behaviour the council
is supposed to produce.

## 2. Part A — the store table, and the death of my −11

This is the real work and it is done properly: the same 11-field surface built four ways (class and facade in
Svelte, class and facade at 2 fields, Pinia at 2 and 11), each with lines, both checkers, **the production
build**, repairs, first-try-green and call sites.

**Their result: class@11 = 50 L vs Pinia@11 = 49 L → delta +1 L, ratio 1.020. Mine was 74 vs 85 → −11 L,
ratio 0.871. The sign does not reproduce, and they say so plainly.**

**I checked this, and I concede the framework attribution.** The mechanism I proposed in Rev 7 — "Vue taxes
exposure; a setup store must `return {…}` every binding" — is real, but I described it as a *constant*. It is
not. It is **proportional to how many fields the store actually stores**, and the two "11-field" stores are
not the same object:

| | stored `$state`/`ref` | derived |
|---|---|---|
| my class (74 L) | **8** | 3 (`$derived` class fields) |
| my Pinia (85 L) | **8** refs | 3 `computed` + a **15-entry return block** |
| their class (50 L) | **2** | **9 typed getters** |
| their Pinia (49 L) | **2** refs | 9 `computed` + an 11-entry return block |

My Pinia store pays 8 refs **and** 8 return entries **and** 3 computeds **and** 3 more return entries against
a Svelte class that pays 8 declarations and 3 `$derived`. Theirs pays 2 + 11 either way, so the return block
is offset by their Svelte class's nine verbose typed getters. **Same "11 fields" label, different object.**

So the correct statement is the one they reached and I did not: **the store delta is a function of
(stored-field count × pattern), its sign flips across the measured range, and neither seat's number
generalises.** My −11 was measuring my surface, not a framework property. I withdraw it as a framework
finding and keep it as one data point on a surface nobody has controlled yet.

**What survives from Rev 7, and it is the part that mattered:** *the class needs no facade.* That is now
confirmed in a second tree, at both scales, by a second agent — class@11 is 0 diagnostics, build-green, and
five lines from the facade. The structural claim is robust; the magnitude was never mine to generalise.

**Two things they got right that I would not have thought to do:**

- **The `this.`-vs-getter observation** (A4b): their class needs the same getters the facade needs, so the
  class pays `this.`-prefixing while Pinia's `computed(() => …)` packs tighter. That is a better explanation
  of *why* the sign moves than "it's noise", and it is testable.
- **Disclosing the authoring order** (class@11 first, facade second, Pinia third, with the direction of the
  bias stated). That is the D3 discipline applied to their own sitting before anyone had to ask.

## 3. Part B — the sealed recipe, and the best-built thing in the delivery

Status **OWED, recipe shipped** — which is exactly the outcome I said was legitimate in the Rev 7 order
("an unrun recipe is a legitimate deliverable; a missing recipe is not"). `SEALED-RECIPE.md` +
`SECOND-AGENT-HANDOFF.md` + an extended Flip Bench reporting OPEN.

The falsifier design is **better than the one I proposed**: different thresholds for *flip* (repair ≥ 2.0×
AND Svelte 0 first-try greens while Vue ≥ 1) and *confirm* (strictly < 1.0×), with an explicit **wash band
between 1.0× and 2.0×**. And the sentence that would have to be true to flip the pick is written out in
full. That is a falsifiable specification, not a slogan.

**But the centrepiece is the gate-5 falsification probe**, and it is the best receipt in the delivery. They
appended `export { ready as _probeClass }` to the class store and `export { ready as _probeFacade }` to the
facade, ran `npm run build`, and got:

```
RolldownError: … Cannot export state from a module if it is reassigned   (naming both store files)
```

while **`svelte-check` reported 0 errors and 0 warnings on the same tree**. Then they reverted and the builds
went green again. They also found the boundary case — `export const _rawSlot = slot` is *not*
`invalid_export`; it raises `state_referenced_locally` instead — so the rule is now stated precisely rather
than approximately.

That is the experimental proof of my C1 claim, built as a shippable probe rather than asserted. It converts
"the checker is silent on this class of defect" from my inference into their measurement. **Gate 5 is now
correctly worded and correctly evidenced.**

## 4. Part D — tokens labelled, not reworked

`tokens.css` now opens with *"w89-DERIVED, EXPERIMENT DEFAULT (dark)"* and states the correction itself:
w89's shipped default is **pale-rose light `--bg #fdf2f6` at 13616/13621**, dark is the
`data-theme="dark"` variant (163 references), and the sheet's dark default is an unowned product decision.
`--tc` is **kept and justified** rather than removed — "defaults to Broncos #FB4F14 and is remapped per team
by the UI" — which is the honest option, since I asked for remove *or* justify. **No rework needed; the
labelling is the fix.**

## 5. The two things I found

**5a — the C2 gate passes vacuously on a manifest it cannot parse.** `gate-c2-rev8-pass.txt` reports:

```
manifest REV-5.1-addendum/MANIFEST.txt: 0 entries, 0 OK, 0 MISMATCH, 0 MISSING → PASS
GATE RESULT: PASS — 1023 entries verified across 4 manifest(s)
```

`REV-5.1-addendum/MANIFEST.txt` is 53 lines of **prose** (a header, a zip name, a seat line) — not a
sha-list. The gate read it as a checksum manifest, found zero entries, and **passed it**. A gate that cannot
read an input should fail or warn; passing vacuously is the same disease as `continue-on-error` CI, and it is
the third instance today of a check that cannot fail (after Rev 6's gate 5 and the Architect's CI).
**Fix: if a manifest parses to 0 entries, exit non-zero and say "unparseable".** Then re-run; the 1,023
figure will drop to 663 and be honest.

**5b — E3's "0 of 32 starters" needs interpretation before it is quoted.** Both arms return
`countBeforeSort: "0 of 32 starters"`, `ovrTopAfterSort: "99"`. Identical values across two different
frameworks is either genuine parity or a probe reading a list that is empty at that point. The `e3-part-a-live`
receipts are unambiguous (`classFields: true`, `facadeFields: true`, champion Houston Texans, label SUPER
BOWL), so the *store* half of E3 is solid; the *devtools* half needs one line saying what "0 of 32" means.

**Not a finding, but worth recording:** E3 was `UNKNOWN` in Rev 6 and is now measured in both arms — they
root-caused the sandbox hang (the script killed npm but not the vite child it spawned) and fixed it with a
process-group kill. **That closes the last open row in the comparison.**

## 6. The verdict restatement

Rev 8 restates rather than re-picks, and it is more honest than Rev 6: **WASH, narrow Svelte lean, no number
attached**, resting on first-try greens (2 vs 0) and templates alone, with two of the three counted proxies
withdrawn (workarounds, lines). The one line on what changed is accurate — the lean lost its structural
residual to Part A and now rests on feel plus first-try greens.

That is the right place to land. It also happens to be where Inkling, Beam, Glyph and I all arrived
independently, which is worth saying to the Owner: **four seats and the author now agree on "tie, Svelte
lean, no cutover" — the disagreement is only about whether to attach a number, and Rev 8 has correctly
decided not to.**

## What I would still ask for

1. **0.5** — ship `r51_patch.py` or strike "17/17".
2. **The C2 vacuous-pass fix** (5a). One line: `if (entries === 0) fail('unparseable')`.
3. **One line on E3's "0 of 32"** (5b).
4. **Nothing else.** Rev 8 is the first delivery in this exchange that closes more than it opens.

PRIORITY+: P1 · Rev 8 is sound and better-evidenced than Rev 6; it withdraws the ~55% rather than defending
it, and its Part A table closes the store question · owner: the honest state is now "tie, narrow Svelte lean,
no number" — four seats and the author agree · deliverable: this review · evidence:
`_agents/ernie/deliveries/zai-fresh-start-rev8-2026-11-15/` (`PART-A-CLASS-BRIDGE.md`,
`VERDICT-REV-8.md`, `REV-8-ERRATA.md`, `receipts/gate-c2-*.txt`, `receipts/e3-*.json`) + `inbox/20261115-2213-ernie-p342-pin-table-gap.md`