SPEAKER: pickle | ROLE: Council Adviser | TASK: improve cakepanz / the UI-UX shell around Claude's engine | DATE: 2026-11-20T19:35Z
FOR: the cutover handoff (Z.ai's S13 `deliverables/`) and Claude's merge
EVIDENCE: the D1 defect and every gate count in `inbox/20261120-1934-pickle-CAKEPANZ13-review.md` are VERIFIED by my own commands; the proposals below are INFERRED design (nothing here is built).

**Framing.** The shell is already strong where it was made into a law: seeded visual battery, five-path engine fence, VM→JSON seam golden, per-file package verifier with a converse check, skip-loud falsifiers. The pattern that produced those wins is the one to extend: turn every implicit contract into a named, executable law with a loud failure. D1 (a shared link losing to a stale autosave) is the clearest remaining example — the contract existed in prose and in three comments, but not in a law.

## 1 · Make the URL/link/autosave relationship a state machine, not three scattered calls (highest value)

**Problem (VERIFIED, D1):** `?seed=` is written in `startDraft`, `loadDraft` and the boot rehydrate, and read in `parseSeed`; the precedence rule lives only in comments. The result is that a shared link is overwritten by a local autosave, and the naive fix breaks the same-seed reload (W9).

**Proposal:** one module `src/lib/port/linkPolicy.ts` owning the whole relation:
```ts
type LinkInput = { urlSeed: string | null; autosave: { seed: number; record: unknown } | null };
type LinkDecision =
  | { kind: 'replay-link'; seed: number }       // explicit seed ≠ autosave → fresh draft at link seed
  | { kind: 'restore'; seed: number }           // no URL seed, or same seed → rehydrate the autosave
  | { kind: 'fresh-draw'; seed: null };          // garbage seed → random draw
export function decideLink(i: LinkInput): LinkDecision;
```
`hydrateBoot()` and `loadDraft()` call `decideLink` instead of each embedding their own precedence. Four laws, each with a named seed: fresh browser + link (existing W6/W8), same-seed reload (W9), plain reload (W12), **link + different autosave (new W14)**. A fifth law asserts `decideLink` is total (no input throws).

**Why it helps the cutover:** the merge touches `App.svelte` anyway for `dispatchAsync`; moving seed precedence into one pure function makes that 4-line migration reviewable in isolation and gives Claude one place to check that the engine's record seed and the URL agree.

**How to check:** the probe I wrote for D1 (link seed 935613 with autosave 470990 → START yields 935613) becomes W14; the full visual battery must stay 17/0.

## 2 · Turn the five-path fence into an executable CI gate

**Problem:** `deliveries/receipts/partH-s13/fence-paths-sha256.txt` (75 rows, 74 pin-comparable, VERIFIED byte-identical to `408410477`) is evidence, not enforcement. A future commit can change `colors/src/**` or `tools/mathlab/flex.json` with no automatic failure.

**Proposal:** `scripts/check-fence.mjs` takes a pin ref and a tree root, maps cakepanz paths → pin paths (`src/engine/* → colors/src/*`), hashes both, and exits 1 with a named row on any mismatch or missing file. Run it in the merge rehearsal and in CI on both trees. On a deliberate re-pin require a `pin:<sha>` commit trailer; otherwise fail. This is the "no engine edits" doctrine made mechanical — AGENTS.md stays prose, the gate is the teeth.

**How to check:** `node scripts/check-fence.mjs 408410477 .` → 74/74 clean, exit 0; mutate one byte of a flex rule → exit 1 naming that row. I already ran the equivalent comparison ad hoc; promoting it to a script is a few lines.

## 3 · One typed shell adapter so the engine can be swapped without touching screens

**Problem:** `DISPATCHASYNC-WIRING.md` names four call sites (START/PICK/UNDO/LOAD at `App.svelte:148/178/184/208`), and port VMs are spread across ~20 files in `src/lib/port/`. The handoff asks Claude to "diff against this list" — a human step.

**Proposal:** define
```ts
interface ShellRuntime {
  getState(): ShellState;                 // serialisable; the seam golden's input
  dispatch(a: ShellAction): Promise<void>; // serialised, never rejects, yields a macrotask
  subscribe(fn: (s: ShellState) => void): () => void;
}
```
`App.svelte` holds one `runtime: ShellRuntime` and all four sites call `runtime.dispatch(...)`. Claude's engine implements the interface; cakepanz screens never import engine paths directly. The existing `dispatchAsync` contract (serialised, promise-returning, never rejects, yields a macrotask first — VERIFIED from the engine's `store.ts:147` and its test) becomes the interface's documented postcondition rather than a prose promise.

**Why it helps UX too:** `refresh()` currently catches engine exceptions in three separate `try` blocks (board odds, lineup advice). With one runtime, error state is reported once, so a UI-facing "the engine refused that action" can be consistent instead of silently empty panels.

**How to check:** a contract test that feeds START→PICK→UNDO→LOAD through a fake runtime and asserts order, no rejection, and one macrotask yield; plus N34's seam golden unchanged.

## 4 · Expand the seam golden from one seed to a corpus

**Problem:** N34 (VERIFIED MATCH, `e8fed8ab…`) pins `boardVM/goneOdds/lineupFor` at seed 2026. A re-pin that happens to agree at that seed but drifts elsewhere would pass the merge gate.

**Proposal:** `batteries/seam-golden.json` holds a corpus of ~8 seeds including the named battery seeds (`a3f2`=470990, `k1x9`=935613, `777777`) and the contract boundaries (1, SEED_MAX). Store per-seed hashes plus a JSON-schema-style shape check (row count 60, three ring ids, no `NaN`/`Infinity` anywhere). N34 becomes "every seed matches" and gains a clear `--write` ritual requiring a pin trailer.

**How to check:** deliberately alter one engine coefficient in a temp tree → N34 dies with the seed named; restore → MATCH. This is the same falsification discipline as 13b, applied to the seam.

## 5 · Visual regression by hash, not by eyeball

**Problem:** `shots/` holds PNGs (motion, takeover, aesthetics) as manual artifacts. They prove a state existed but cannot fail a build; a token change that shifts a colour by 2% passes every numeric battery.

**Proposal:** a `visual-baseline.mjs` probe renders a fixed matrix (the 15 surfaces × 390/768/1280 already used by `viewport-matrix.mjs`, at the two named seeds) and records each PNG's sha256 in `batteries/visual-baselines.json`. A `--check` run fails on any changed hash, naming the surface; `--write` is a deliberate, receipted act. Store only hashes (not new images) initially — the existing `shots/` already gives the human reference.

**Why it is cheap:** the screenshotting code and the surface list already exist (`scripts/viewport-matrix.mjs`, `scripts/probe-motion-shots.mjs`); this adds a hash comparison and a manifest, not a new harness.

## 6 · UX: explain link-vs-save instead of silently switching

**Problem (VERIFIED, D1's user impact):** opening a shared link on a browser with an autosave silently swaps in 43 old picks. Even with proposal 1's fix, the user's local draft appears to vanish.

**Proposal:** when `decideLink` returns `replay-link`, show a one-line, self-dismissing notice: *"Opened a shared draft — your local save is untouched."* Keep the autosave under its original key and offer "Return to my saved draft" as a link that restores it. This turns a surprising state change into an explained, reversible one — exactly the Owner's "plain informative language" rule, with no new permanent chrome. It also gives W14 a visible assertion target rather than only a seed number.

## Ordering suggestion

1 and 6 together close D1 and are small; 2 and 4 make the cutover merge mechanically safe; 3 is the architectural change that pays off after v1.1; 5 is a follow-up once the 45/45 viewport matrix is stable. None of these edits the engine, the ratings or a protected constant, and none waits for another seat.

**Not proposed here (deliberately):** ring work, multisport, Contract B, What-If alternate history, deterministic multiplayer, 20-0 roguelike, cross-era draft pools — all closed by Owner or AGENTS.md.
