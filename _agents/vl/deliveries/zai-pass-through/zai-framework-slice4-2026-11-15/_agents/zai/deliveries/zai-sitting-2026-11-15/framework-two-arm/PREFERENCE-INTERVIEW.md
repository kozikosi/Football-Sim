# PREFERENCE-INTERVIEW — Z.ai · 2026-11-15 · the four-slice sitting

Written per INKLING's §3: one section per question, in order, one short paragraph + evidence per
answer. Every answer re-derived this sitting from the bytes in the delivery tree; where no evidence
exists the answer says `evidence: NONE` and names what would have been needed. The threshold for
the slope (q13) was registered BEFORE any four-slice code or count existed (sitting-notes.md,
written first; reproduced verbatim in q13). The five-part verdict is at the end (§V).

Paths below are relative to `framework-two-arm/` (this file's folder). Line counts are `wc -l`
(total lines) unless stated. The probe is `two-arm-fourslice.mjs`; receipts are in `receipts/`.

---

## A · About the code that exists

### 1 · Which file in each arm carries the most logic?

By line count the biggest framework-owned file in BOTH arms is the Saves screen (svelte
`src/lib/screens/Saves.svelte` 72 · vue `src/components/Saves.vue` 71) — but most of its bulk is
markup. The most LOGIC-dense file in both is the store glue — svelte `src/lib/appStore.svelte.ts`
(68) / vue `src/lib/appStore.ts` (61): it holds the engine-store wrap, the draft snapshot, the
board derivation, the team/pick/undo/save actions and the load transition — every state change in
the app passes through it; the screens are views over its outputs.

evidence: `wc -l arm-svelte/src/lib/appStore.svelte.ts arm-svelte/src/lib/screens/Saves.svelte
arm-vue/src/lib/appStore.ts arm-vue/src/components/Saves.vue` → 68 / 72 / 61 / 71; the store files
contain all four dispatch call sites (`grep -c "dispatch" arm-svelte/src/lib/appStore.svelte.ts`
→ 4 · same file, vue → 4).

### 2 · What did you have to write twice?

Six pieces exist in both arms because the framework owns them: (1) the store glue whole file —
svelte 68 / vue 61; (2) `chooseTeam` — 5 lines each, identical except `ui.screen` vs
`ui.value.screen`; (3) `loadIntoStore` — 9 lines each, same exception; (4) the screens' read-side
derivations (board rows/header/mine/teamName/toneColor) — ~14 ($derived) vs ~11 (computed);
(5) the saves screen's service calls (refresh/doSave/doLoad/doInject) — ~30 vs ~30, near-verbatim;
(6) the root nav — ~8 lines each, two syntaxes. Everything framework-FREE (feedVM, boardVM, the
envelope save service, team persistence, slot keys, the whole engine) exists ONCE as shared
identical bytes (`cmp` clean): bootData.ts 74, savesService.ts 71, feedVM.ts 160, abbr.ts 20,
ink.ts 35, feed.css 106 — the architecture pushed duplication down to the reactive idiom layer.

evidence: receipts/two-arm-fourslice.txt §"what was written twice" (the table above with counts);
`cmp arm-svelte/src/lib/savesService.ts arm-vue/src/lib/savesService.ts` → identical.

### 3 · Where did each framework fight you?

Svelte fought on module exports of reactive state: the compiler rejected `export let snap =
$state.raw(...)` reassigned by the store subscription, and separately rejected exporting `$derived`
— verbatim: "Cannot export state from a module if it is reassigned. Either export a function
returning the state value or only mutate the state value's properties" (state_invalid_export) and
"Cannot export derived state from a module. To expose the current derived value, export a function
returning its value" (derived_invalid_export) — the remedy (getter functions) then broke TS
narrowing across two getter calls: "Error: Object is possibly 'null'. (ts)". Vue fought on the
script/template ref duality: I wrote `:feed="feed.value"` in a template where vue-tsc types `feed`
as ALREADY unwrapped — verbatim: "src/App.vue(28,35): error TS2339: Property 'value' does not
exist on type 'FeedVM'." The asymmetry (.value in script, bare in template) is Vue's standing trap.
One shared fight: both checkers caught a type re-export slip (BoardSort) and a wrong-module import
(FrozenPoolRow) — that one is mine, not the frameworks'.

evidence: receipts/fourslice-typecheck-first-run.txt (the verbatim first-run outputs, quoted
above); the build log compile errors are quoted in receipts/two-arm-fourslice.txt §debugging.

### 4 · Which file would you least like to open in six months, and why?

Svelte: `src/lib/appStore.svelte.ts` (68 lines). Size is not the issue; the state it holds (the
whole external-store wrap) plus the idiom is: a six-months me must remember that `draftSnap()`,
`feed()` and `board()` are FUNCTIONS because exported `$state.raw`/`$derived` cannot be reassigned
or exported directly (state_invalid_export / derived_invalid_export) — the why lives in two
comments; the pattern is non-obvious and its absence would read as a bug. Dependents: all four
screens + the root import it. Vue: `src/lib/appStore.ts` (61 lines) — same state, but the idiom
(shallowRef + computed) is mainstream Vue; the six-months risk is smaller and the reason is
convention, not a compiler ruling. Say which: by "state held × non-obvious idiom", the svelte
store file wins (loses) — 68 lines holding a wrap the compiler forced into getter shapes.

evidence: the file headers themselves (appStore.svelte.ts lines 17–20 carry the
state_invalid_export comment); `grep -n "state_invalid_export\|derived_invalid_export"
arm-svelte/src/lib/appStore.svelte.ts` → 2 hits.

### 5 · What did the framework give you free?

Svelte: the `class:cp-feedtool-on={cond}` directive and keyed `{#each}` (Board.svelte, TeamSelect.svelte
— code absent: no ternary class concatenation strings, no explicit :key objects); `$derived` reads
like arithmetic; and svelte-check's a11y pass — it flagged the feed line's `tabindex="0"` on a
noninteractive `<article>` (a11y_no_noninteractive_tabindex, Warn) which vue-tsc does not attempt:
a whole class of check absent from the vue arm's checker. Vue: `shallowRef` as the external-store
idiom (code absent: NO getter-wrapper functions exist in appStore.ts — shallowRef made the whole
workaround unnecessary); template ref-unwrap typed by the checker (it caught my `.value` —
typed DX I did not expect); terser wide-row template bindings (`v-for` + `:key` on one element vs
{#each}(…)(key)). Both: the reactive layer itself — zero manual re-render/subscription code in
either arm (the code that would have existed in a hand-rolled DOM build is absent from both trees;
in this architecture the engine's store.subscribe is the only subscription, one line per arm).

evidence: `grep -c "class:" arm-svelte/src/lib/screens/*.svelte` → 3 uses; the absence: `grep -c
"shallowRef\|computed\|ref(" arm-vue/src/lib/appStore.ts` → the whole file stands on them;
the a11y warning is in receipts/fourslice-typecheck-first-run.txt (svelte section only).

---

## B · About the failure modes

### 6 · Which gave you the better error message?

Both checkers ran clean-clean FIRST (receipts/fourslice-typecheck-first-run.txt): svelte-check 3
errors + 1 warning, exit 1; vue-tsc 3 errors, exit 2. The two worst, verbatim: (1) svelte-check,
Board.svelte 13:56 — "Error: Object is possibly 'null'. (ts)" on the `teamName` derived — bad
because it is a CONSEQUENCE of the svelte compiler's own export remedy: narrowing cannot cross two
calls of the getter the compiler forced me to write; the message is true but names the symptom, not
the cause. (2) vue-tsc, App.vue(28,35) — "error TS2339: Property 'value' does not exist on type
'FeedVM'." — good because it is one-line precise (file(line,col)), names the exact type, and in
fact taught me the template-unwrap rule. Verdict: vue-tsc's type errors are the more actionable
messages (coordinates); svelte's BUILD-time compiler messages are the better teaching messages
(they name the rule URL and the remedy sentence — nothing vue printed matched that quality). Split
verdict: svelte for compile errors, vue for type errors.

evidence: receipts/fourslice-typecheck-first-run.txt (both outputs verbatim, captured before any
fix); the two quotes above appear there verbatim.

### 7 · Which would fail more quietly in production?

The honest evidence is the one behavioral bug I shipped this sitting — LOAD did not navigate to the
board (both arms, identical) — NEITHER checker saw it: it is a missing state transition, invisible
to type systems and to both compilers; only the probe caught it (Playwright timeout on the board
locator). Point at the absence of a check: nothing in either arm asserts "a load lands on the
board" — the fix added one line plus the probe law. What I would add for production: the e2e
battery per slice (the probe IS it — made a delivery file) and, at the type level, a discriminated
Screen union with exhaustive switching (both arms have the union; an exhaustive-switch lint would
catch future screens). Framework-specific quiet channel: Vue's bare-in-template / .value-in-script
duality — my own `feed.value` bug WAS that channel; vue-tsc caught it only because the prop is
TYPED, and an untyped or `any` prop would have shipped a blank panel silently. So: Vue has the
quieter failure channel; svelte-check's a11y pass additionally closes a quiet channel Vue leaves
open. Net: Vue, narrowly, on the untyped-prop channel.

evidence: the probe's run-1 log (both arms' "FAIL: locator.textContent: Timeout… waiting for
.cp-mine h4") in receipts/two-arm-fourslice.txt §debugging; the TS2339 in q6; the a11y Warn only in
the svelte section of the first-run receipt.

### 8 · What does each dev build tell you that the other's does not?

The svelte dev/build output carries the a11y pass (a11y_no_noninteractive_tabindex with the code
frame and rule URL) and the runes compiler's structural rulings (state_invalid_export as a hard
build error) — vue's build prints nothing equivalent (verified: the vue build log is silent). The
vue toolchain prints template type errors with one-line coordinates that svelte-check's svelte-file
diagnostics do not (it points at the file, then quotes a frame). Dev-mode HMR measured this
sitting: svelte 51 ms vs vue 42 ms round-trip (a tie at this scale); dev server ready 336 vs
220 ms; a real compile error shows vite's overlay on the svelte arm; the vue arm's overlay check
was inconclusive because my injected "error" was valid markup for Vue's compiler (test artifact,
not a finding). Page console: identical (same engine bytes do the work).

evidence: hmr probe output (devServerReadyMs 336/220 · hmrRoundTripMs 51/42 · overlay true/false-
inconclusive · both files reverted sha-verified); the build logs quoted in the receipts.

---

## C · About the decision, not the code

### 9 · What is the cost of being wrong (migration at slice 8, per direction)?

From the counts: a port rewrites the FRAMEWORK-OWNED surface only — svelte→vue = 347 lines, vue→
svelte = 332 (7 files each, same shapes, and this sitting proved the translation is mechanical:
each screen was written as the twin of the other within minutes). The shared identical bytes move
for free: bootData 74 + savesService 71 + feedVM 160 + abbr 20 + ink 35 + feed.css 106 + the
engine's 52 files + the probe (framework-neutral except two selectors' class names, which are
shared chrome). So the slice-8 migration cost is ~0.35 KLoC per direction, a re-probe run, and
re-verification — cheap BECAUSE the engine sits behind the plain-JSON VM law and the framework-free
store; that is the R-1 seam doing exactly what it was pinned for. The asymmetry (347 vs 332) is
inside the band, so neither direction is meaningfully cheaper.

evidence: receipts/two-arm-fourslice.txt §lines (the final counts + the shared-bytes exclusion
list); the translation symmetry is visible file-pair by file-pair (Board.svelte 61 vs Board.vue 57).

### 10 · Which has the better answer to "the Owner wants a native shell in two years"?

Neither framework changes the hard part: a native shell means a WebView (or a rewrite to native
views), and BOTH arms already boot from file:// in a headless WebView with zero network — the
probe IS that proof (0 blocked, 0 errors, 390 px clean). What actually changes per layer:
renderer = a WebView hosting either bundle unchanged (named source: this sitting's probe runs —
chromium, file://, network blocked); build target = `vite build` with `base: './'` already ships
relative paths loadable from an embedded asset dir (arm-*/vite.config.js line 4; the dist assets
in receipts/two-arm-bundles.txt); state layer = unchanged EITHER way, because the engine store is
framework-free by construction (named source: `src/engine/sports/nfl/app/store.ts` header: "The
app store: framework-free, so Svelte (store contract) and React (useSyncExternalStore) wrap the
same object") and the view-models are plain JSON. The only framework-dependent native question is
runtime weight in the WebView — svelte's compiled output is 10.9 KB gz lighter on this build
(bundle receipt). Do not assert beyond that: I have no source that either vendor guarantees an
official native-view story (Svelte's is none; Vue's is unrelated projects), so the honest answer
is: the decision is framework-insensitive for a WebView shell, and a true native-views rewrite
costs the same ~0.35 KLoC of view layer either way while the VM law and engine survive untouched.

evidence: two-arm-fourslice.mjs results (file:// boot, 0/0 on both arms); store.ts lines 1–2;
vite.config.js `base: './'` in both arms; receipts/two-arm-bundles.txt (the gz delta).

### 11 · What did you NOT measure that you should have? Could it change the answer? Measure it now if it is cheap.

Not measured going in: devtools ergonomics (the falsifier names "composables + devtools"), HMR
ergonomics, and a real low-end boot profile for the four-slice build. Measured NOW because cheap:
HMR round-trip (svelte 51 ms / vue 42 ms — a tie; dev server ready 336/220 ms; both files
reverted sha-verified) — it does not change the answer. Still not measured, and why: devtools
needs the Vue devtools extension plus human eyes — not headless-measurable this sitting, and it
is the one input that could plausibly move the decision (a large devtools advantage is Vue's best
remaining card); a four-slice low-end boot would extend the settled ±100 ms tie to the new bundle
sizes — cheap-ish (the two-arm-coldload.mjs protocol reruns as-is) but it re-opens a settled
measurement (§0 forbids re-measuring the six criteria; the four-slice cold load is NEW, so it is
allowed — flagging it as the next sitting's cheap measurement). Would either change the answer?
The band is wide (R 0.978 vs 0.85): no plausible lines/devtools delta flips the SLOPE verdict;
only the bundle dissolving (q14) flips the DECISION.

evidence: hmr probe output (numbers above); evidence: NONE for devtools (would have needed: a
headed browser with the Vue devtools extension installed and a scripted task battery timed by a
human or a DOM-mutation-based proxy).

### 12 · Where does your confidence come from — a measurement, or the fact that the tree you build in is Svelte?

The measurements: the bundle (the one criterion that has separated the arms at BOTH scales —
11,569 B gz at one slice, 10,946 B at four, the same direction), the probe's identical-DOM
equality (every law, both arms, same numbers: rev 64 · 63 picks, 25 lines, 13 mine), and the flat
slope inside the registered band. The familiarity test, answered head-on: if the four-slice
numbers were IDENTICAL and the tree were greenfield, I would still pick Svelte 5 — because the
deciding input would then be the compile-away runtime on a product whose low-end receipts are a
standing concern, and that input is a measurement, not a memory of the tree. The tree being
Svelte (the reviewed Cakepanz slices 1–4) is a real second argument — one idiom, zero re-learning
— but the receipt stands without it, which is exactly why I can state it separately.

evidence: receipts/two-arm-bundles.txt (the 11,569 figure + method), receipts/two-arm-fourslice.txt
(the 10,946 figure + the probe equality), sitting-notes.md (the threshold registered first).

---

## D · About the band

### 13 · Is 15% the right threshold for the slope?

Registered BEFORE any four-slice code or count existed (sitting-notes.md, first file written this
sitting; the prompt's falsifier fixed the 15%, I fixed the metric form). The registered form: R =
mean marginal lines per slice (slices 2–4) vue/svelte; R < 0.85 fires, R > 1.18 is Svelte-better,
else inside-the-band; R_total (cumulative at slice 4) reported beside, deciding nothing unless it
disagrees in SIGN. Is 15% right? Yes — three reasons: (1) the slice-1 panel already showed ±5%
line differences settling into ties, so anything under ~10% would noise-fire on formatting and
comment style alone; (2) 15% over this surface is ~20 lines per slice — a delta big enough to mean
real maintainability (a whole extra sub-screen per two slices) rather than idiom jitter; (3) the
same band in both directions (0.85 / 1.18) keeps the test symmetric — no threshold tuned to make
either arm win. What I would change: nothing in the number; I would ADD repetition (a second
author building slice 5) if the band were ever approached, because one author's idiom habits bound
the result's precision more than the threshold does.

evidence: sitting-notes.md §"REGISTERED BEFORE ANY FOUR-SLICE CODE OR COUNT EXISTS" (verbatim
threshold, timestamped first); q13 in this file carries the same text's substance.

### 14 · What single measurement would make you switch tomorrow?

One: the Vue arm rebuilt with vapor mode / composition-only tree-shaking, same four-slice surface,
same receipt protocol — if its JS-only gz delta against svelte closes to <5 KB, the last
separating criterion dissolves and the tooling side (vue-tsc's precision, devtools, router/pinia,
the 61-line store) decides, so I switch. Cheap for the Owner to order next sitting: it is one
dependency bump and a rerun of the two bundle receipts (`npm run build` + `cat *.js *.css | gzip -9
-c | wc -c`), no UI changes, no re-probe needed beyond a smoke pass.

evidence: receipts/two-arm-bundles.txt (the method, re-runnable verbatim) + the README's own
falsifier #3 (framework-two-arm/README.md §2, written last sitting, unchanged).

### 15 · If the Owner forced you to ship both forever, which would you rather maintain?

From the counts, not preference: Vue — 332 vs 347 total framework-owned lines, a smaller store file
(61 vs 68) with NO compiler-forced idiom (no getter wrappers to remember why), one-line-precise
type-error coordinates on the file that changes most (the screens), and the near-verbatim saves
logic (30 vs 30) shows its template syntax costs nothing extra on the heaviest forms. The costs I
accept with that answer: carrying the .value duality rule forever, and losing svelte-check's a11y
pass (I would substitute an eslint a11y plugin — an added tool the svelte arm does not need).
Svelte's compensating virtue — reading denser in-markup — is real but worth less than the store
file, which is where the long-term maintenance actually happens.

evidence: receipts/two-arm-fourslice.txt §lines (332/347, 61/68) and §"what was written twice"
(saves logic 30/30); q3 (the compiler-forced idiom is svelte-only).

---

## E · Tracking questions (blunt answers beat flattering ones)

### 16 · What did you plan vs what you shipped?

Planned (the prompt's four slices + two receipts + questionnaire): ALL shipped. Variance, named:
the saves panel is DRAFT-only — week/season envelope kinds are refused with their kind named
("slot C holds a week save; this panel loads drafts") rather than hydrated, because the slice
table's saves row lists save/load/refuse-corrupt/refuse-newer only; hydration lives in the
Cakepanz tree, not the arms. Also not re-measured: the six settled criteria (§0 forbids it); the
four-slice build's cold load was NOT measured (flagged in q11 as the cheap next measurement, not
a drop).

evidence: savesService.ts `readSlot` (the week/season refusal branch, verbatim message);
receipts/two-arm-fourslice.txt §saves.

### 17 · What took longer than expected?

The Svelte export fights: three build failures before green (state_invalid_export,
derived_invalid_export, then my own wrong relative path) — the runes-in-modules model cost real
minutes and 8 fix lines, and it produced the sitting's main framework finding (q3/q4). My second
time sink was self-inflicted: the probe's slot-B expectation ("rev 2 · 1 picks") contradicted the
engine's own advance law (the reducer auto-advances the CPU to the user's next turn: 63 picks,
rev 64) — the focused re-probe found it in minutes, the engine was right, my expectation was wrong.

evidence: the build logs quoted in receipts/two-arm-fourslice.txt §debugging;
scripts/reprobe-slotb.mjs output (envelope B: schemaVersion 1 · rev 64 · picks 63 · userTeam 0).

### 18 · What did you skip, and would you have shipped it if the sitting had been twice as long?

Skipped: the devtools ergonomics measurement (needs a headed browser + extension — see q11),
the four-slice cold-load run, and visual review of every screenshot at every viewport. With twice
the sitting: I would run the cold-load protocol on the four-slice dists (it reuses
two-arm-coldload.mjs unchanged), do the devtools battery with the extension, and add a week-save
hydration path to the saves panel so the arms match the Cakepanz tree's full envelope surface.
None of the three plausibly flips the band verdict; the cold load is the one with decision
relevance (it tests whether the 10.9 KB matters at the low end).

evidence: q11 (the same list, with the reason each was deferred).

### 19 · Which files changed unintentionally?

Inside the delivery, none: every changed or new file is on the sitting's intended list (two
receipts fixed + one added, two slice checksum files normalized, the arms' four-slice files, the
probe, PREFERENCE-INTERVIEW.md, this README's four-slice section, MANIFEST/CHECKSUMS regenerated).
The rebuild-timing edit was reverted sha-verified byte-identical; the HMR probe likewise. The
workspace repo's status (the clone in boot/ has no modified tracked files; the delivery tree is a
plain folder, not a repo). Commands: `git -C /home/z/my-project/boot status --short` → empty;
`git -C /home/z/my-project status --short` → `?? upload/` (pre-existing at sitting start, listed
in the environment's own git snapshot).

evidence: the two `git status --short` outputs above, run at sitting end; the sha-verified
reverts in scripts/measure-rebuild.sh and scripts/hmr-probe.mjs output (`reverted: true`).

### 20 · What is the weakest part of this delivery?

The per-slice marginal reconstruction for the store glue: slice-2's glue was measured in-flight
(38 svelte / 40 vue — logged), but slices 3–4's glue block sizes come from the sitting's edit
record rather than fresh snapshots at each stage boundary — a hostile reviewer can call that
reconstruction (±2 lines of risk). The decision does not hang on it: the FINAL counts (347/332)
are exact and recountable by anyone with `wc -l`, and the verdict would need R to move 0.978 →
0.85 (~13 lines per slice) to fire. Second weakness, stated: I wrote the svelte arm first in each
slice pair — an authorship order bias I did not alternate (q23 lists it).

evidence: receipts/two-arm-fourslice.txt §marginals (the block provenance stated in the receipt
itself); scripts/slope-arithmetic.py (the recomputation, checkable).

### 21 · What would a hostile reviewer attack first? Name it and answer the attack now.

Attack: "one author wrote both arms to the same design; the 2% line difference measures that
author's Svelte fluency, not the frameworks." Answer, three parts: (1) the numbers put SVELTE at
a DISADVANTAGE on the store file (68 vs 61 — the compiler forced lines into my file), so the bias
argument cuts against my own preference, not for it; (2) the architecture moved everything
framework-free into shared identical bytes (466 lines verified `cmp`-clean), so the comparison
surface was minimized by design, not by accident; (3) the DECISION does not rest on the lines at
all — the registered band makes the slope a no-signal, and the preference rests on the bundle
(which is measured by gzip on shipped bytes, author-free). The attack, granted, still limits the
SLOPE claim: it is one author, one sitting, four slices — I say so in the receipt, and I do not
generalize past it.

evidence: q13's registered threshold; the cmp-verified shared-file list in
receipts/two-arm-fourslice.txt; the gz method in receipts/two-arm-bundles.txt (byte-level, no
author in the loop).

### 22 · Did anything measured this sitting contradict something filed earlier?

One correction, mine, now on the record: last sitting's bundle receipt totals were unlabelled
(concatenation gzip) and a reviewer who added the columns would have filed a false defect — this
sitting's §1.1 fix labels the method, shows the per-file sums beside the totals, and states the
JS-only delta (11,569 B) the conclusion rests on; I verified the concatenation totals reproduce
byte-exactly (`cat *.js *.css | gzip -9 -c`). Second, an environment note, not a contradiction:
the first sitting's receipt headers recorded vite 7.3.6; this sitting's re-run resolved 7.3.8 from
the same lock range and produced BYTE-IDENTICAL assets (same content hashes) — noted in the
reproducibility block. Nothing measured contradicts §0's settled list; the five ties and the pin
migration table were not re-measured.

evidence: receipts/two-arm-bundles.txt (the METHOD block + reproducibility block, both new);
the §1.1 verification in the sitting notes.

### 23 · What did you assume without checking?

Listed, small ones included: (1) localStorage persists on file:// origins in chromium — assumed,
then the probe's reload step PASSED (evidence landed); (2) `crypto.randomUUID()` availability on
file:// — not checked, defensively coded instead (a fallback string in bootData.ts); (3) that the
council/muse START-OF-CHAT is the maintained copy — taken from the prompt's instruction; I did
not fetch council/zai to confirm it is stale (the muse file itself asserts it, no independent
check); (4) that `gzip -9` CLI output is stable across environments for the byte-exact
recomputation instructions — verified within this sandbox only; (5) authorship order: I built
svelte first in every slice pair (no alternation — a bias I named but did not remove); (6) that
the fixture's frozen pool is byte-identical across arms — verified (`cmp`), not assumed;
(7) that vite's dev server ports (5199/5189) were free — assumed, both boots succeeded.

evidence: each item's check status is as stated; the probe's `surviveReload` step and the `cmp`
commands are in the probe and receipts.

### 24 · What do you not understand well enough to be confident about?

UNKNOWN, honestly held: (1) WHY svelte 5 bans exported reassignable state at the language level
(the compiler names the rule and the remedy; the runtime rationale — module mutability vs signals
— I have not read up on); (2) Vue vapor mode's actual behavior — my q14 falsifier ASSUMES it can
close the bundle gap; I have not built with it; (3) the devtools question end to end (q11);
(4) whether the goneOdds rng convention I copied (`makeRng(seed*7+13)`) matches the Cakepanz
battery's exact intent — I copied the expression from the tree's own battery text, which is
evidence, but the convention's rationale is the Architect's, not mine; (5) the low-end boot
behavior of the four-slice bundle (the 10.9 KB's real-world weight is untested on the w89
protocol). Each is named so the next sitting can close it; none is guessed at in this file.

evidence: NONE needed — the answer IS the unknown list; the items are checkable next sitting.

### 25 · What would you do differently in the next sitting?

Snapshot the framework-owned line counts at EVERY stage boundary with a script before writing the
next slice (removes the q20 reconstruction attack entirely), and build the Vue arm first to cancel
the authorship-order bias (q23.5) — one line of protocol, both attacks gone.

evidence: q20 and q23 (the two weaknesses this protocol change closes).

---

## V · The verdict (§4 — the five parts)

**1 · The slope answer: held — INSIDE THE BAND.** The cumulative curve is flat: svelte 103 → 202
→ 248 → 347, vue 99 → 198 → 244 → 332 (vue −1.6% to −4.3% at every stage, no widening, no
closing). Mean marginal R = 0.9778, R_total = 0.9568, both inside the registered 0.85–1.18 band:
no signal. The falsifier does not fire; no winner is manufactured on lines.

**2 · Preference: Svelte 5, narrowly — and the strongest single reason is the bundle.** It is the
only criterion that has separated the arms at either scale, and it separates TOWARD svelte on the
four-slice build too: JS-only gz 114,553 − 103,607 = **10,946 B** (11,569 B at one slice — the gap
held its shape as the surface grew), on a product whose low-end receipts are a standing concern.

**3 · The strongest argument against my own preference, steelmanned:** Vue's arm is genuinely
smaller (332 vs 347) with a simpler store idiom (no compiler-forced wrappers), its checker names
type errors with one-line precision on exactly the files that change most, its devtools/router/
pinia ecosystem is mature and UNMEASURED headroom, and the line difference it concedes is 2–4%
— smaller than the noise the band itself acknowledges. If any one of those headrooms is real —
above all if vapor mode closes the 10.9 KB to noise — every remaining input points Vue's way,
and my preference would be carrying 11 KB for a tree's familiarity.

**4 · Confidence: 70%.** What would move it ten points: a vapor-mode Vue build of this same
four-slice surface measured with the same receipt protocol — under 5 KB gz and the preference
flips to Vue (confidence in Vue would then be the high one); or a four-slice low-end boot
(the w89 protocol) showing the 10.9 KB moves interactive time beyond the ±100 ms noise floor —
either measurement, run once, moves the number because it closes the sitting's two honest UNKNOWNs
(q11, q24).

**5 · The falsifier, restated:** the one measurement that flips me is the bundle measured as
irrelevant — a Vue build (vapor/composition-only) within 5 KB gz of svelte on this surface, or a
low-end profile showing boot-time parity. Then the last separating criterion dissolves, tooling
decides, and tooling points to Vue. Until then: Svelte 5, narrowly, by measurement — and the
narrowness is still the finding.

— Z.ai · 2026-11-15 · 25 answers + this verdict; every number in this file is re-derived in
receipts/two-arm-fourslice.txt, receipts/two-arm-bundles.txt and scripts/slope-arithmetic.py.
