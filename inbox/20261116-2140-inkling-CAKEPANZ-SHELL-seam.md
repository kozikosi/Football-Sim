SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 2 — the seam + the swap test | DATE: 2026-11-16T21:40Z
FOR: R-13

# Cakepanz — the engine↔shell seam, as it stands, and the swap test (Part 2)

**Unblocks:** Z.ai's M1/M2/M5 work (the merge cone is his to build — v4-1); Claude's merge (each finding below is a fact he can schedule around). **Verdict up front: there is no seam today — 66 engine-reaching lines across 15 files, no adapter module — but the shell swaps engine pins with ZERO source edits (proven twice below). Both things are true; the first is why the second needed proof.**

## 1. The one-door claim — attacked (s5 delivery, pin 4ca9a071)

Canonical counts (one pattern both times: any line containing `engine/` outside `src/engine/`):

- **66** engine-reaching lines; **65** import statements; **15** files.
- **11 files** carry direct VALUE imports from the snapshot outside any adapter, incl. `.svelte` components: `SlotPicker.svelte` (`SLOT_IDS`, `fit`, `SLOTS`), `NeedsRow.svelte` (`SLOTS`, `slotLabel`), `TeamSelect.svelte` (`TEAMS`, `DIVS`, `divisionTeams`, `TEAM_BY_NAME`), `Saves.svelte` (`TEAMS`), `DraftBoard.svelte`/`BoardRow.svelte`/`BoardHeader.svelte`/`SortControls.svelte` (engine types, value-reachable), `App.svelte` (8 lines), `feedVM.ts` (22), `savesApp.ts` (11), `shareVM.ts` (2), `draftStore.ts` (3), `abbr.ts`, `ink.ts` (1 each).
- `.svelte` value-import lines: **14**; `import type` lines: **46**.
- **No single adapter module exists.** The boundary as shipped is `src/engine/**` itself, imported directly by the UI layer. VERIFIED (commands in §4).

Same shape on the live gh-pages tree (slice 1–2 + re-pin, `d3bd81d2`): same direct-import pattern, no adapter. VERIFIED.

**Lines of app code that touch engine values today: 14 (`.svelte`) + 19 (value imports in `.ts`) = 33 value-importing lines across 15 files.** That number is Z.ai's to publish and drive down; it is NOT yet the "thin seam" the merge cone needs.

## 2. The swap test — INDEPENDENTLY, twice (not his receipts)

Procedure: pristine copy of the s5 delivery → replace `src/engine/` with the engine at the target pin → `npm ci` (network, clean) → symlink global playwright (`NODE_PATH`-free) → `vite preview` → `npm run build` → `npm run battery` (Playwright, `--no-sandbox`) → compare. No source file edited in any tree; the only writes the battery itself makes are `batteries/slice1-battery.json` and `shots/*.png` (its own receipts).

### Swap A — `4ca9a071 → d3bd81d2` (the pin move that actually happened 2026-11-15)

- Build: **PASS** (183 modules, `dist/` produced, no edits). VERIFIED.
- Battery: **75 pass · 0 fail · 10 SKIP · 3 DEFER** — identical counts to the author's run at 4ca9a071. VERIFIED (full output pasted below the fold).
- Engine tests (the Architect's suite rides with the tree): **277 pass · 9 FAIL**. The 9 are **pin-coupled tests**: flex laws asserting the REV 4 table ("QB→FS 12" vs expected −10), "every penalty is 0/2/4/6", the REV 3/REV 4 owner-ruling block, `flexcheck`-style rules, and the E5 dataset stamps in `store.test.ts`/`versions.test.ts`. **At d3bd81d2 these assertions are stale by definition — the pin moved under them.** The failure is correct, named, and expected; it is NOT an engine defect and NOT a shell defect. Named laws: `lineup.test.ts` (flex REV 4 ×5) + `versions.test.ts`/`store.test.ts` (E5 stamps) + `lineup.test.ts:43` ("every penalty 0,2,4,6").
- **Battery is pin-agnostic; the delivery's test suite is pin-coupled.** Consequence for the merge cone: on every re-pin, `src/engine/` AND its `test/engine/**` must be re-vendored together — "the battery re-proves the snapshot in one command" (README §4) is true only for the battery; `npm run test:engine` will go red at the next pin unless the tests are re-vendored too. FLAG to Z.ai + Claude.

### Swap B — `4ca9a071 → 86f22d10` (the current engine tip, sim-era, ahead of the shell)

- Build: **PASS** (184 modules). VERIFIED.
- Battery: **74 pass · 1 FAIL · 10 SKIP**. VERIFIED. The one failure: "season brag renders the SAVE's own numbers" — root-caused NOT to engine/save/wiring but to the battery's OWN TOKEN casing (`slice1.battery.mjs:371-374` expects the uppercase `SUPER BOWL`/`CONFERENCE`/`WILD-CARD`/`MISSED THE PLAYOFFS` substrings; the shell's `shareVM.ts` renders `fell in the Super Bowl` etc. — mixed case). **All four non-champion TOKEN branches are dead: the law can only ever pass via the champion branch.** At 4ca9a071/d3bd81d2 the fixture lands BUF as champion, so the dead branch never fired; at 86f22d10 the same seed produces a NY Giants championship (BUF loses the Super Bowl), the branch executes, and the law dies. Details + proposed §5 fix in Part 7 filing.
- The season fixture at 86f22d10 is deterministic and consistent with itself: the save classifies, the node replay reproduces the same champion and the same record row (the "seed card is PROVEN" law PASSED). So the swap exposed a battery tautology, not an engine/save defect.
- Same-seed outcomes differ between pins (BUF champion @d3bd81d2 vs NYG champion @86f22d10, seed 4275): expected engine evolution; every "REPORTED at the pin" number must name its pin. (See my Part 10 filing.)

### The hard environment finding both swaps inherit

- **file:// boot is broken as shipped.** `vite.config.js` has no single-file postbuild; `dist/index.html` loads `./assets/index-*.js|css` (relative, good) but with `crossorigin` + `type="module"`, which Chromium blocks over `file://` ("Cross origin requests are only supported for protocol schemes: chrome, chrome-untrusted, data, http, https"). Measured: **4 blocked/failed requests, body text empty, 9 DOM nodes, app never mounts.** VERIFIED (Playwright console capture, 2026-11-16). The v4-1 w89-pattern requirement (strip-crossorigin + singlefile postbuild) is unmet; the battery runs over `http://localhost` and never exercises file://. FLAG to Z.ai: the "offline-first, boots from vanilla file://" law is not yet inherited by any delivery to date.
- `?dev=1` over http://localhost: **0 console errors** on Team Select (empty + populated), detail view, and the board after START. VERIFIED @1180px and @390px.
- `npm ci` needs the `allowScripts` caveat: `esbuild`'s postinstall is blocked by default in this environment ("install-scripts not yet covered by allowScripts"); the build still worked (Vite 7 prebuild). UNKNOWN whether a fresh machine would need `npm install-scripts approve esbuild` — document it in the runbook.

## 3. The seam the shell needs (proposal, §5 form — not applied)

One module, `src/lib/enginePort.ts`, plain TS, no framework imports, the ONLY file importing `src/engine/**`. Interface sketch (types from the snapshot, re-exported):

```ts
// reads/queries
boardVM(): BoardVM                                  // the board as data (rows sorted by priority)
goneOdds(userTeam: number, sims: number): GoneOdds   // engine's own odds object (meta included)
openSlots(): SlotId[]                                // which 32 slots remain open (user roster)
fitWith(player: Player): { best: SlotId; penalty: number }[]   // flex costs per destination
// commands
startDraft(args: { seed: number; userTeam: number; order?: number[] }): void  // order default = engine snakeOrder()
pick(playerId: string, slot: SlotId): void           // through the store reducer
playWeek(week: number): WeekResultVM                 // season step; engine-simulated
// persistence (through the snapshot's own envelope code)
saveDraft(slot: 'A'|'B'|'C', note?): void; loadDraft(slot): DraftPayload | Corrupt | Newer
```

Rules the proposal carries: (a) screens import the port or a VM, never the snapshot; (b) the port RE-EXPORTS engine types so screens never path-import; (c) the engine's `engineVersion`/`dataVersion` stamp is surfaced by the port for provenance lines; (d) anything the shell needs that the port cannot express becomes a §5 filing (e.g. P-317's slot — see Part 4); (e) the battery gains ONE law: "no file under `src/` imports `src/engine/**` except `enginePort.ts`" (a grep law — see Part 7).

**What this does not contain:** no re-implemented flex, no re-implemented draft order math, no ratings. If the port starts accumulating math, the seam has failed — the Architect deletes the duplicated piece and the shell re-asks.

## 4. Commands (re-runnable)

```
# one-door counts
D=_agents/inkling/deliveries/67-cakepanz-s5
grep -rn "engine/" "$D/src" --include='*.ts' --include='*.svelte' | grep -v "^$D/src/engine/"   # 66 lines, 65 imports, 15 files

# swap rehearsal (throwaway tree; nothing pushed)
git archive d3bd81d2 colors/src | tar -x -C <tmp>
diff -rq --exclude=node_modules --exclude=dist <delivery> <swapped>   # only src/engine/* paths + battery receipts differ
cd <swapped> && npm ci && npm run build && npm run battery           # 75/0/10/3 @ d3bd81d2
```

## 5. Not done / UNKNOWN

- No seam module exists to review — M1/M2/M5 of the merge cone are Z.ai's to build; my contract sketch above is input, not law.
- The "seam inventory table → hash-check" (Part 2's highest-value audit) has nothing to check against yet: no handoff note exists on disk (searched `git ls-files` + branches for `MERGE-README|MERGE-GUIDE|SHELL-STATUS|SNAPSHOT.md` — none in the Cakepanz trees). UNKNOWN until Z.ai files one.
- The swap used the battery as-is; a dedicated **merge-day seam-checker** (zip → per-VM file+sha256 verification, non-zero exit) is the artifact the Owner asked for — specified but NOT built in this filing (timebox); see my Part 7 filing for the spec, or flip a coin with my other rate-limited artifacts.
- Swap B was one run on one seed (4275); a different seed may die on a different law. One point of evidence, not a distribution.
- Ernie's 86f22d10 box-score survivors are covered by my Part 6 open-question filing; not repeated here.
