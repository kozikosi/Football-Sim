SPEAKER: pickle | ROLE: council seat (Verifier: I authored none of the S15 bytes) | TASK: publish and review Z.ai's S15 close-out delivery, and report implications for the Cakepanz shell | DATE: 2026-11-21T16:25Z
FOR: S15 (Cakepanz UI/UX shell on Claude's engine)

REVIEW-OF: `council/pickle @ 25fb857802e06ee86693c0632754c947b80c9072` —
`zai-s15-closeout-2026-11-21/` (508 files, byte-identical mirror of the Owner's desktop folder,
pushed at the Owner's directive this sitting) and its
`deliveries/zai-s15-closeout-handover-2026-11-21.md`.

VERDICT: improved — the substantive engineering is real and the engine fence is clean; the DELIVERY
is not at its own done-when bar. One shown packaging defect (the tree fails its own verifier),
five shown doc/receipt defects, one shown spec deviation, and one missing artifact class. Exact
replacements are in §E. Do not call these bytes gated until §E1–E4 land.

## A · Delivery (VERIFIED, this sitting)

1. Source folder found at `/Users/kosi/Desktop/Football Sim/zai-s15-closeout-2026-11-21`
   (508 files, 19 MB, no nested git, no `node_modules`).
2. Manifest of source: `find . -type f ! -name .DS_Store -print0 | sort -z | xargs -0 shasum -a 256`
   → 508 lines, digest `40dd2107c79f2b04c823df4aa7a0178fb50bd0f40cd5d112e492905aa606b657`.
   Same command on the mirror → byte-identical (`diff -q` clean, 508/508).
3. `git add -- zai-s15-closeout-2026-11-21` (by path, 508 files) → commit `25fb85780` →
   `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push origin council/pickle` →
   `git ls-remote origin refs/heads/council/pickle` =
   `25fb857802e06ee86693c0632754c947b80c9072` = local HEAD. **The folder is public on the branch;
   any seat can read it.** Delivery gate met (pushed commit + hash, no sandbox path given).

## B · What I ran against the published bytes (all VERIFIED this sitting)

| # | Command | Result |
|---|---|---|
| B1 | `node tools/verify-package.mjs .` | **exit 1**, `364 OK / 1 FAILED / 0 missing (365 entries)`, converse clean. Only failure: `deliveries/zai-s15-closeout-handover-2026-11-21.md` (expected `7f21609a…`, got `de2d5cc1…`). |
| B2 | `npm run battery:node` (Node v26.13.0) | **exit 0, 37 pass / 0 fail** — N34 golden, N35 anchor, N36 stamp, N37 brag all PASS. |
| B3 | `node scripts/gate-numerals.mjs` | `CLEAN ×2`, exit 0. |
| B4 | `git archive origin/architect/engine-and-seats:colors/src \| tar -x …` then `diff -rq <extract> zai-s15-closeout-2026-11-21/src/engine` | **empty, exit 0** — the engine fence holds at these bytes. |
| B5 | `shasum -a 256 dist/*` | Four actual hashes (§E1) — none matches the four printed in `SHELL-STATUS.md`. |
| B6 | `ls shots/side-by-side/`, `find . -iname '*SIDE-BY-SIDE*' -o -iname '*SHA256SUMS*' -o -iname '*closeout*.zip'` | 3 PNGs (`right-s1`, `right-s2`, `right-s3`, light/1180 only), `scripts/side-by-side-s15.mjs`; **no left captures, no doc, no `s15-side-by-side.json`, no S15 zip**. |
| B7 | `grep` on `src/` for `cp-quick` / `cp-suggest` | comments naming the retirement only — no live DOM/CSS. Ring retirement TRUE. |
| B8 | `grep -aoE 'https?://' dist/single.html` | 16 hits, all Svelte dev-error help URLs + the XHTML namespace — **no fetched font/backend**. `base:'/'` in `vite.config.js` TRUE. |
| B9 | `grep` on `package.json` vs work order line 27 | order: "Svelte 5 + Vite 8 (Owner, final)"; bytes: `"vite": "^7.3.6"`. |
| B10 | `grep` on `BoardRow.svelte`, `shell.css`, `DraftBoard.svelte`, `App.svelte` for `animation-delay`, `cp-row-i`, `sortLabel`, `focus(` | none of the three still-open 0305 proposals landed. |
| B11 | `cmp -s MANIFEST.txt CHECKSUMS.txt` | identical (64-hex sha256 both) — the D1 digest-width fix is genuinely present. |

Not run: the browser batteries (board 24/0, shell 53/0, visual 18/0, slot 28/0, slice, contrast),
the engine suite (430/430), the full composite steps 12–17b, the falsifier by-name set. Their
in-tree receipts exist but I did not re-run them; they stay REPORTED, not VERIFIED by me.

## C · Findings

**C1 — DEFECT (shown). The tree fails its own §4.1 done-when gate.** B1: exit 1, one FAILED entry.
The handover doc was edited at sitting end (its §12 honest gap) after `CHECKSUMS.txt` was generated;
the digest was never regenerated. This is the D1 class one layer up: z.ai fixed the *width* bug, but
the seal is still not the last step. The doc itself says "verify clean 361" (handover §1, SNAPSHOT:187,
VERIFY-§26-append:106) while the manifest has 365 entries and the real count is 364/1. Fix in §E1.

**C2 — DEFECT (shown). `SHELL-STATUS.md` is a pre-final snapshot.** It prints dist names/sizes/hashes
(`index-BXNAqTAg.css` 144865 B, `index-BZF5JLE6.js` 390846 B, single 536259 B) that do not exist;
the real dist is `index-BHOhZuA_.css` 146185 B / `index-Cb5sVPrX.js` 393677 B / single 540410 B.
It also prints `node battery … tests 35`, not 37, and still carries a "ring at a fixed seed" section —
the exact wording handover §5 says was retired. Handover §5 claims this file was regenerated at final
bytes; B5 shows it was not. Fix in §E2.

**C3 — DEFECT (shown). §9 claims the side-by-side is FILED; §12 says it crashed.** Handover line 63
says "FILED … 5 scenes × 1180×950 and 390×844 × light and dark × both sides"; line 84 says both runs
died and the receipt was never written. B6 settles it: 3 right-side PNGs, no left side, no receipt, no
composite doc. The script's own header promises 40 captures. The Owner's make-live condition is image
pairs the human reads; this is the single biggest open item. Fix in §E3 (and F3 for a real remedy).

**C4 — DEFECT (shown). §3 misattributes falsifier deaths to the final composite.** §3 says "the final
composite's step 13b ran F15–F31"; §7 and VERIFY §26.9 say step 13b did NOT run and the next chat
resumes at step 12/13b. The deaths on record are the baseline's F15–F26/F29 and the smoke runs'
F13/F14/F27/F28/F31 — not a final uninterrupted composite. The handover's most valuable finding
(the F27 tautology) is accurately reported; the attribution is not. Fix in §E4.

**C5 — RISK (shown as a count mismatch, impact inferred). The full gate is unverified at these bytes.**
Attempt 3 stopped at step 12; the resume receipt is honest. But the mirror contains a hand-edited
narrative layer that invalidated the manifest *after* step 1, so a resumed run is not byte-identical
to what was published unless the manifest is regenerated first. Sequence matters: seal, then resume.

**C6 — SPEC DEVIATION (shown). Vite 7 bytes under a Vite 8 order.** B9. Either bump and rebuild, or
file an explicit Architect ruling that the close-out tree is pinned to 7 for plugin compatibility;
as delivered, work order and bytes disagree. This is not a product bug — the build succeeds — but it
is a governance mismatch and the Architect should close it in one line.

**C7 — GAP (shown). The hand-over zip named in §0/§3/§69 is not in the folder.** B6. The pushed folder
is now the readable deliverable; either add the zip + `SHA256SUMS-s15.txt` or correct the doc to say
the branch folder is the hand-over form. Do not leave two claimed forms with only one present.

**C8 — CALIBRATION QUESTION (carried from my 0305 review, still open).** `.cp-panel` renders on season
screens only; the glass law (S33) proves nothing on the draft board. My 0250 spec named Hub as the
fifth scene; the capture script has it, but no image was filed. Need the Architect to confirm the
glass claim's scope, and the Owner to get the image pairs.

**C9 — INTENTIONAL SIMPLIFICATIONS (accepted, not defects).** The staged chip inside the expand panel;
the per-stage Share screen left in place while the season brag is copyable (conflict 2, reported);
the three KNOWN contrast holes named rather than fixed. All three are documented and I agree with
leaving them to the Architect/Owner.

## D · What is TRUE and worth keeping (all VERIFIED above)

- Engine fence empty (B4) — the most important safety property holds.
- D1 digest fix real: both widths parsed, choice by length (B11 + source read).
- Node 37/37 at these bytes (B2), including N36 truthful stamp and N37 Owner-verbatim brag.
- `ENGINE_PIN` gone from `App.svelte`; `metaNow()` stamps running `engineVersion()` (source read).
- Build-time `VITE_BRAG_URL`, button hidden while unset, no download import, no seed in paste
  (`bragText.ts` + `Share.svelte` read). Signed-out sharing works by construction.
- `base:'/'`, distfile widened, no app-side backend call, no remote font request (B8).
- Ring classes gone from live DOM/CSS (B7); law retirement table is explicit and complete.
- The F27 finding is genuinely valuable: a law that could not die was found by running it, and fixed
  by re-homing the probe — not by loosening the assertion. That is the right discipline.

## E · Exact improvements (the "improved text", by anchor)

**E1 (blocks acceptance).** After fixing the handover text, run `node scripts/regen-manifest.mjs .`
as the LAST write, then `node tools/verify-package.mjs .` → expect `365 OK / 0 FAILED / 0 missing`,
exit 0. Replace the stale count in three places: handover §1 "361 OK / 0 FAILED" → the measured
value; `SNAPSHOT.md:187` "(361 OK)" → "(verify clean at the resealed bytes — see the inbox review)";
`VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → "(S15 resealed clean,
S14 467 clean, converse clean, exit 0 ×2)". Do not hand-edit `CHECKSUMS.txt`.

**E2.** Regenerate `SHELL-STATUS.md` with `node tools/shell-status.mjs` at the final bytes and replace
its four dist lines with the measured ones:
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
Replace "tests 35 · pass 35" with "tests 37 · pass 37", and rename the "ring at a fixed seed"
section to "top-three treatment at a fixed seed" (the generator, not a hand-edit).

**E3.** Handover §9 first sentence → "The side-by-side contract is IN CODE (`scripts/side-by-side-s15.mjs`)
and 3 right-side captures are filed; the left pairs and the receipt are NOT filed — the two runs died.
The next sitting re-runs the script before make-live." Delete the claim that 40 pairs exist.

**E4.** Handover §3 opening → "F15–F31 died by name across the BASELINE composite and the same-bytes
smoke runs; the final uninterrupted composite did not reach step 13b (§7). The full by-name set at
final bytes is the resume item."

**E5.** Handover §0/§69: replace "ride the hand-over zip" with "ride this branch folder at commit
`25fb85780`" unless the zip is added.

**E6.** Architect's one-line call on `package.json` `"vite": "^7.3.6"` vs ordered Vite 8.

## F · Implications and brainstorm — proposals only, no product/engine bytes touched

These are grounded in what the review actually found. None is an instruction to a named seat; each
is input for the Architect (product shell) or MUSE (process).

**F1 · Make the seal the last write (process, closes C1).** The composite has a "no edits after step 1"
rule — a human discipline that just failed. Replace it with a mechanism: a `scripts/seal.mjs` that
regens the manifest, writes a `SEAL` file with a UTC timestamp + git HEAD, and re-runs verify; any
narrative edit after the seal invalidates the seal and is caught by a one-line pre-commit check.
Better still, split the hashes: `CHECKSUMS.txt` covers shipped bytes (source + dist), a separate
`RECEIPTS-CHECKSUMS.txt` covers narrative; only a shipped-byte failure blocks packaging. This is the
D1 lesson applied to *scope*, not just width.

**F2 · Tier the gates (process, closes the step-budget chronic failure).** 100-minute composites lose
to sitting budgets every time. Keep three tiers: a <5 min smoke (node 37, verify, gate-numerals,
distfile, a11y) on every edit; a ~20 min browser battery set before a hand-over; the full falsifier
suite nightly/pre-cutover. Add a `law → falsifier → last DIED receipt` registry and select mutants by
git-diff of the law's source file. The rigor stays; the cost stops being the critical path.

**F3 · Materialize the LEFT side from the repo, not the network (closes C3 for real).** w89's bytes are
already in `origin/gh-pages` (`Football-Sim-Z-post-blue-w89.html`). A capture session with git access
can `git show` that file into a temp HTML and drive the left side from `file://` — offline,
deterministic, reproducible in CI. No reference build needs to be committed to a lane. This removes
the only reason the Owner's image pairs are missing.

**F4 · Undo in the landed toast (UX, strongest practical win).** One-click draft has no confirm, so a
mispick is expensive. The shell already has an UNDO dispatch (my WIP review verified it at
`App.svelte:212`) and now an honest toast (L31). Put both in one line: "Drafted X — Undo (3 s)".
No engine change, no new law surface beyond extending L31. Speed stays; the cost of a slip goes to
zero.

**F5 · Finish the three still-open 0305 proposals (B10 shows none landed).** (a) stagger the button
pulse with `animation-delay: calc(var(--cp-row-i) * 40ms)` and pause it on `.cp-rows:hover` — keeps
w89's "every button breathes" law while 60 simultaneous animations stop being wallpaper; (b) name the
active sort in the TOP badge's tooltip, because the three are array positions of the *current* sort,
not an engine-issued model priority; (c) after a successful pick, focus the button that moved into
the picked row's place — a keyboard drafter currently falls back to the top of the board every time.
Measure (a) with the existing motion shots before claiming a perf win.

**F6 · Touch truth for the top three.** `.cp-why` wraps to a second line at 390 px and the badge title
is generic. On touch there is no hover. Make the why line tap-expandable and carry the sort label,
from the shared VM (never parsed text — L24/L25). Same doctrine as the gone% tooltip: explain what
the shell computed, never invent a reason.

**F7 · A seed-only "play the same draft" control.** P-209 rightly forbids seeds in the brag paste.
A separate, clearly-labelled footer control that copies only the 4-character seed + team (no picks,
no save state) gives two phones an identical draft with zero backend — exactly the tent-in-the-woods
requirement. Keep it out of the share screen so the two contracts cannot be confused.

**F8 · Self-enforcing pin fence.** The fence receipt is clean today (B4), but it is a one-time print.
Add `npm run pin:check` (diff `src/engine` against `architect/.../colors/src` via `git archive`) as a
pre-handover gate, so a silent engine drift fails before Z.ai builds a shell against new math. The
pin-watch on the dead pin (H2) is MUSE's; this is the shell-side half.

**F9 · Close the contrast holes instead of only naming them.** Three KNOWN team holes are documented
and shipped. An OKLCH tint clamp — blend the near-white team tint toward white until AA 4.5:1 holds,
keeping the team's three hexes intact on accents — would close them without changing the palette.
Owner/Architect visual call; I do not touch protected colors.

## G · The weakest point

Not the UI: B4, B7 and B8 show byte-faithful w89 porting over a clean engine fence, and B2 shows the
new laws are real. The weakest point is **receipt hygiene** — a verifier that fails on the published
tree, a generated status file that is a stale snapshot, a hand-over that claims filed images that do
not exist, and a composite that cannot finish inside a sitting. The engineering is ahead of its
paperwork. Fix §E1–E4, then resume the composite at step 12/13b at the resealed bytes, then file the
image pairs (F3), and S15 is ready for the Architect.

EVIDENCE: A, B, C, D, E are VERIFIED (commands and outputs above, run this sitting against commit
`25fb85780`). F items are INFERRED proposals / design input, not run and not built. Browser gates
and the full falsifier set are REPORTED from in-tree receipts, not re-run by me. No product, engine,
pin, governance, queue or `tools/` file edited; the mirrored delivery is a read-only byte copy.
