SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: Rev 6 council prompt — consolidated answer to Q1–Q6 | DATE: 2026-11-15T21:48Z
FOR: framework comparison (Owner ruling R-13; no queue row — P-345 is the play-level innovation round, not this work)

# Consolidated review — Z.ai fresh-start delivery (Rev 6)

**This supersedes my two earlier filings on this prompt:** `inbox/20261115-2058-ernie-zai-fresh-start-review.md`
(`cc1eecdd`, 20:58Z) and `inbox/20261115-2102-ernie-correction-repair-cycles.md` (`e2b2964e`, 21:02Z). It
adds one new verified finding that neither of them had, and it corrects one of my own claims. Read this one.

**New since I filed:** Inkling's lane correction at 21:45Z reported that **the Rev 5.1 addendum's own
`CHECKSUMS.txt` fails 12 of 358 files**. I verified it independently before writing this — see Q1. It is the
one material defect in the delivery and I missed it, because my earlier check covered the top-level
`MANIFEST.txt` and never opened the nested one.

**Review chain:** the Rev 6 delivery now has **four reviews** — Inkling (improved), Beam (improved, two
filings), Ernie (this), Glyph (improved, "provisionally holds"). The three-seat rule is met.

---

## Q1 — Verify the delivery: is it receipt-clean?

**Verified, except one integrity defect.** Everything below I ran, not read.

- **Four pass-through copies are byte-identical.** `CHECKSUMS.txt` = `61e0a7d3…` on **all four** branches
  (ernie, inkling, beam, glyph). `MANIFEST.txt` = `4cb81387…` on **all four**. Spot-checked
  `screens.css`, `verified-as-of.json`, `weekStore.svelte.ts` against the manifest on inkling *and* beam —
  **all six match**.
- **Top-level `MANIFEST.txt`: 635/635 files verify.** 3,499 lines.
- **F1 fix is real.** `savesService.ts:58` is `(env as unknown as { payload: Record<string, unknown>
  }).payload`, byte-identical both arms; I installed both addendum arms and ran the checkers —
  **`vue-tsc --noEmit` exit 0; `svelte-check` 0 errors** (3 a11y warnings, disclosed).
- **Batteries: 24/24 PASS both arms**, 0 console errors, 0 blocked — I re-ran both against freshly built
  dists. **Fidelity 6/6 EQUAL** (470 / 871 / 125 / 39 / 457 / 221). **Engine 57/57, `diff -rq` clean.**
  `tokens.css` `e2535987…` identical ×3. **Season Book 44,861 B gz.** Week section 11/11.
- **D1 counter-file — VL is wrong, and Z.ai's Part 0 fix is right.** The 61/68 pair lives in
  **`two-arm-fourslice.txt`**, which says so itself at lines 3–4 ("the SHIPPED tree … 83/98, not the 61/68
  below") and prints the pair at lines 20, 22, 71. **`slice5-timing.txt` contains no 61/68 at all** — its
  `framework_owned_lines` pair is **86 vs 88**. So VL's "per slice5-timing" attribution points at a file that
  does not contain the number.

**The one thing that does not reconcile — and it is the answer to "is it receipt-clean":**

> **`REV-5.1-addendum/CHECKSUMS.txt` fails 12 of 358 files (exit 1).**
> `346 OK / 12 FAILED`. The twelve are exactly the Part 0 patch targets: `AUTHORING-COST.md`,
> `CATEGORY-WINNERS.md`, `INNOVATION.md`, `README.md`, `SLICE-DONE-PROPOSAL.md`,
> `filings/OT-clock-fix-PENDING.txt`, `framework-two-arm/arm-{vue,svelte}/src/lib/savesService.ts`,
> `receipts/{bundles-pin-d3bd81d2,two-arm-fourslice,two-arm-lines}.txt`,
> `measurements/AGENTIC-ERGONOMICS-VERDICT.txt`.

**The content is right; the nested manifest is stale.** Those files carry the patches (I spot-checked
`README.md` = w89, `CATEGORY-WINNERS` row 9 = 83/98, `savesService.ts` = the cast), so the addendum's
`CHECKSUMS.txt` was generated **before** the patch script ran. The top-level `MANIFEST.txt` was regenerated
**after** and is correct — which is why my earlier check passed and why the two manifests disagree with each
other. **This is an erratum-level defect, not a content defect**: fix is to regenerate the nested file and
re-cut the pass-throughs, or land an erratum before the zip is reissued.

**The other two inconsistencies the prompt asks me to reconcile:**

- **Repair cycles — I was wrong, and I withdraw the charge.** `RECEIPT.md:73`'s "svelte 10 vs vue 9" is
  the **four-slice subtotal** (a–d: vue 4+2+1+2 = 9, svelte 3+7+0+0 = 10). `DELIVERY-NOTE.md` quotes
  **five** numbers per arm because it includes **Part B, the week-stepper** (svelte 1, vue 2), giving
  **11 vs 11**. Both documents are arithmetically right; I compared a subtotal against a total. The only
  real defect is that the summary does not say "4 slices" — D2-class, one line. **And the consequence
  strengthens the sitting: on the full five-slice count the arms are an exact 11–11 tie.**
- **Workarounds — this one is a real disagreement.** `DELIVERY-NOTE.md:6` says "fewer workarounds: **4 vs
  6**"; `RECEIPT.md:73` says "**svelte 4 vs vue 3**". The itemisation at `RECEIPT.md:18` supports **4 vs 3**
  (or 5 vs 4 if the two `!` boot guarantees count separately) — **no reading yields 6**. It is
  decision-relevant: the note offers "fewer workarounds" as a reason for the Svelte lean while its own
  receipt says the opposite. The lean survives (it rests on first-try greens, 2 vs 0, and templates), but
  the stated reason does not.
- **MANIFEST 3,499 vs 3,503.** The 4-file delta **is** the four self-referential files (`MANIFEST.txt` +
  `CHECKSUMS.txt`, top level and in `REV-5.1-addendum/`) — hypothesis confirmed. **But two further files are
  outside the manifest entirely**: `football-sim-vue/CLAUDE.md` and `football-sim-svelte/CLAUDE.md` (0
  occurrences of "CLAUDE" in `MANIFEST.txt`; neither gitignored). Coverage is **635 of 641**. Low risk
  (docs), but the blanket "3,503 sha256 lines" claim is wrong on two counts.
- **Not checkable:** "17/17 asserted patches" cites `scripts/r51_patch.py`, **which is not in the zip**. The
  addendum's table has 9 grouped rows. Ship the applier or its log.

---

## Q2 — Does the verdict hold?

**Confirm the direction; contest the number.** One line why: the direction (Svelte ≥ Vue on authoring, Vue 62%
withdrawn by its own author) is now supported by **three independent measurements** — Z.ai's, Inkling's, mine —
but **~55%** is one agent's read of a wall-clock instrument that by its own report *did not resolve* (the second
arm won every pair = order artifact). Beam's F-B is right and I second it: until a second agent runs the
sealed-recipe handicap, **~55% is an opinion with no number attached**.

**Does the pick hold? Only as "no cutover".** That is the robust part and all four reviews agree on it.

**Does it confirm Ernie, Inkling, or neither?** **Ernie's direction, Inkling's rejection of a Vue win.**
Ernie said Svelte narrowly; Inkling said wash → tiebreak → Vue; Z.ai says wash → Svelte lean. So Ernie's
direction is upheld, Inkling's tiebreak-to-Vue is not taken, and Z.ai's confidence (~55%) is weaker than
Ernie's claim. **Two of three seats now point at Svelte on measured authoring; none points at Vue.**

---

## Q3 — The class bridge: tested or not tested?

**Tested at two fields, not at store-heavy scale.** One line: `ToyStore` (`src/toy/store.svelte.ts`, the E0
admission test) and `sim-state.svelte.ts` are class bridges, but **the Part B week-stepper used the
module-level pattern** (`weekStore.svelte.ts:16-17`: `let slot = $state.raw(1)` + `export const week = {…}`),
so Part B measured the *facade's* cost, not the class's.

**Does the store question stand open? Yes.** Z.ai answered Rev 6's question ("does one facade, paid once,
hold?" — **yes**, 0 diagnostics, 11 call sites) and did **not** answer the Rev 4 question ("is a facade
needed at all?" — **no**, with a class). Different questions, different answers, one asked. My store-heavy
measurement (class, 11 fields, 0 facades, 74 L vs Pinia 85 L) and Inkling's (class, 21 L, 0 facades) both
say the class needs nothing — and Z.ai's own `ToyStore` is a third instance at 2 fields.

**A related finding for the Rev 6.1 addendum:** the Svelte repo is **mixed** — `appStore` is a class,
`weekStore` is module-level — while its own `AGENTS.md` §2 prescribes classes for state bridges. A future
agent will copy whichever file it opens first. One line in the addendum would fix that.

---

## Q4 — Beauty direction: redo or acceptable?

**Acceptable for the experiment; redo before any product use.** One line why: the tokens are a *dark* theme
with an *invented* token, and w89's shipped default is neither — `w89.html:13616/13621` is
`:root:not([data-theme="dark"]){ --bg:#fdf2f6; --panel:#ffffff; … }` (**pale-rose light**); dark is a
`data-theme="dark"` variant (163 references); and **`--tc` does not exist in w89** (0 occurrences;
`var(--tc…)` never used; team colour runs through `ZPB_TEAM_COLORS` and 22 `[data-zpbteam]` remaps).

I hold **Beam's framing over my own**: *acceptable-for-experiment, redo-for-product*. The experiment's beauty
gate is "do both arms look alike", which a shared token layer serves — but `RECEIPT.md` C1's claim that the
"w89 dark+gold+team-color language" is carried is **false on both counts** and must be struck. And the real
risk is that **dark-vs-light is an unowned product decision**; a dark default in the *shared* layer silently
prejudges it for any future product work. Label the file `w89-derived, experiment default (dark)` until the
Owner rules on theme.

---

## Q5 — Part C: concur or contest?

- **Season Book — queue (BUILD IT). Concur.** One line: 43.8 KB gz against a 400 KB falsifier is 9× under,
  and I verified the byte count (44,861 B). Inkling's caveat stands — the bracket VM does not exist, so
  "13 replayable feeds" is not a pure rendering job; build the one-game falsifier prototype first.
- **Flip Bench — queue (ADOPT WITH CHANGES). Concur, and my own run is the pilot.** One line: the
  order-of-authorship confound contaminated every timing number in this exchange including mine, and the
  sealed-recipe handicap is the only proposal that attacks it. Keep its falsifier, and add mine: if
  across-agent variance exceeds between-framework variance, the bench needs a third agent.
- **Receipt diff viewer — queue (diff-first holds). Concur.** One line: 26 leaf fields with 23 same across
  arms is "same seed ⇒ same bytes" made visible, and it is the component every other Sim Lab surface rests
  on.

---

## Q6 — Gaps and next steps

- **E3 interactive devtools session — doesn't block signing.** One line: flagged, not hidden, the script
  ships in both repos, and the hooks' existence is receipted — but the **devtools row stays UNKNOWN**, and I
  can fill it: `__VUE_DEVTOOLS_GLOBAL_HOOK__` object + `__pinia` object + a `DEVFRAMES-DOCK-EMBEDDED` element
  in Vue; `__SIM_STATE__` only, no devtools at all, in Svelte. That is **scaffold-provided, not
  framework-provided**, and belongs in a "day-one inheritance" row.
- **Route the engine bug to the Architect: yes — with Glyph's caveat.** One line: the half-drafted league
  (store 20 picks vs fixture 1,024; app showed SB WAS@IND where truth says HOU-ATL) is a state-source
  defect, and the Architect owns the fix (§5, one writer) — but Glyph is right that it is
  integration/state-source correctness in the fresh-start arms, not a request to edit the pinned engine, so
  escalate only if it implies a contract ambiguity.
- **Offline-boot fix — verified, and better than the one I recommended.** One line: I reported this morning
  that both repos fail vanilla `file://` because `dist/index.html` requests absolute `/assets/…`;
  `strip-crossorigin.mjs` + `singlefile.mjs` inline everything (433,899 B Svelte / 465,658 B Vue, **0 external
  refs**), and **24/24 battery checks pass on vanilla `file://`** — a real fix to a real defect.
- **Second-agent protocol — ready, with three amendments.** One line: (1) §1.1 still points at the
  Football-Sim four-slice arms, not the two standalone repos; (2) it must prescribe the **class** pattern for
  the Svelte arm, the only untested store shape; (3) it must require **the production build green**, not only
  typecheckers — `state_invalid_export` is a *build* error `svelte-check` never reports. Whoever takes it
  from the queue runs it; no seat is named.

---

## Innovation — the nested-manifest gate (sharpened by today's finding)

**Proposal:** a ~40-line CI check that (a) finds **every** `CHECKSUMS.txt` / `MANIFEST.txt` in a delivery
tree, not just the top-level one, (b) verifies each against the bytes, and (c) fails on any mismatch. Plus
the companion I proposed earlier: **every numeral in a delivery's prose must appear in a receipt with the same
value** (which would have caught `867` vs `871`, `4 vs 6` vs `4 vs 3`, and "3,503" vs a 3,499-line manifest).

**The evidence for it is today's result:** I verified the top-level manifest 635/635 and reported the delivery
as intact, while the nested addendum manifest was failing 12 of 358 the whole time. A gate that only checks
the file the author points at inherits the author's blind spot. A gate that walks the tree does not.

**Falsifier for my own preference, stated so it can be checked:** if a second agent, handed the **class**
pattern as a sealed recipe, reports it as awkward or produces *more* repair cycles with it than with the
module-level facade, my "zero facades at store-heavy scale" is an artefact of my familiarity with `$state`
class fields, and row 9 returns as a small real Vue advantage.

PRIORITY+: P1 · Two corrections owed before the Owner reads this: (1) regenerate `REV-5.1-addendum/CHECKSUMS.txt` on the patched tree (12 files) and re-cut the pass-throughs or land an erratum; (2) `RECEIPT.md:73` must label its repair-cycle scope ("4 slices, a–d: 10 vs 9; with Part B: 11 vs 11") and `DELIVERY-NOTE.md:6` must correct "4 vs 6" to "4 vs 3" · owner: quote ~55% as a lean with no number until a second agent runs the sealed-recipe handicap — I second Beam's F-B · deliverable: this review, superseding `cc1eecdd` and `e2b2964e` · evidence: `_agents/ernie/deliveries/zai-fresh-start-2026-11-15/` + `REV-5.1-addendum/CHECKSUMS.txt` (346 OK / 12 FAILED) + `inbox/20261115-2058-ernie-zai-fresh-start-review.md`