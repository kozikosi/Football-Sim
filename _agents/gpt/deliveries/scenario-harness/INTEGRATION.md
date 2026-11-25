# S15 scenario harness — integration handoff

**Author:** GPT, Implementation Engineer / High Councillor  
**Source inspected:** `council/pickle:zai-s15-closeout-2026-11-21`  
**Scope:** standalone module, tests, receipt command, and an exact App.svelte integration recipe. No existing Z.ai source file is modified on this branch. The harness files are new, isolated additions only.

## What is implemented in this branch

- `src/lib/dev/scenario.ts`: deterministic scenario builder using the real CSV dataset, `createStore`, `boardVM`, `suggestIdsOf`, `seasonBragText`, and the current engine version.
- `src/lib/dev/DevScenarioDrawer.svelte`: isolated Build & Proof drawer. It displays the live board's suggested rows, the real paste text, or the completed draft count.
- `scripts/scenario-receipt.mjs`: emits a JSON manifest with scenario/seed, engine version, source-dataset SHA-256, snapshot SHA-256, snapshot byte count, and runtime provenance.
- `test/scenario.test.mjs`: checks the three fixtures, receipt determinism, and a mutation that must fail the board fixture assertion.

The finished-draft fixture advances the actual store through user picks. It does not fabricate a completed record. The board fixture uses the actual board VM and current suggestion derivation. The share fixture calls the actual brag-copy function and explicitly omits the seed/link.

## Commands

Run from `zai-s15-closeout-2026-11-21/`:

```sh
node --test test/scenario.test.mjs
node scripts/scenario-receipt.mjs --seed=935613
```

The receipt command prints a JSON manifest to stdout. Redirect it to a file if a retained receipt is wanted:

```sh
node scripts/scenario-receipt.mjs --seed=935613 > scenario-receipt.json
```

## Exact App.svelte integration

This is an integration patch recipe, not an edit to Z.ai's moving file. Apply only after the S15 close-out and only if the Architect/Owner wants this drawer integrated.

### 1. Add type-only imports

Near the other imports:

```ts
import type { ScenarioId, ScenarioSnapshot } from './lib/dev/scenario.ts';
```

### 2. Add the compile-time and query-string gate

Keep the existing `DEV` query-string affordance, but make the drawer require both Vite development mode and `?dev`:

```ts
type DevScenarioDrawerComponent = typeof import('./lib/dev/DevScenarioDrawer.svelte')['default'];
let DevScenarioDrawer = $state<DevScenarioDrawerComponent | null>(null);
let scenarioActive = false;

if (import.meta.env.DEV && DEV) {
  void import('./lib/dev/DevScenarioDrawer.svelte').then(({ default: component }) => {
    DevScenarioDrawer = component;
  });
}
```

The dynamic import is inside the compile-time `import.meta.env.DEV` branch. Do not replace this with a production-visible static import.

### 3. Add an in-memory scenario loader

Place after the existing `refresh()` function (or another point after `store`, `seed`, `userTeam`, and `go()` exist):

```ts
async function runDevScenario(id: ScenarioId): Promise<ScenarioSnapshot> {
  const { createScenario } = await import('./lib/dev/scenario.ts');
  const fixture = createScenario(935613, id);

  if (fixture.record) {
    scenarioActive = true; // all autosave paths below must remain disabled until a fresh START
    seed = fixture.seed;
    userTeam = fixture.teamIndex;
    savedSuggest = null;
    busy = true;
    try {
      const state = await store.dispatchAsync({ type: 'LOAD', record: fixture.record });
      error = state.error ?? '';
      if (state.error) throw new Error(state.error);
    } finally {
      busy = false;
    }
    valuation.lock();
    go(fixture.screen === 'complete' ? 'complete' : 'board');
    refresh();
  }

  // share-paste has no record by design; the drawer renders and copies its paste text.
  return fixture;
}
```

### 4. Prevent dev scenarios from overwriting real saves

Add an early return to each persistence entry point:

```ts
async function autosaveDraftNow() {
  if (scenarioActive) return;
  // existing body...
}

async function autosaveSeasonNow() {
  if (scenarioActive) return;
  // existing body...
}

async function saveSeasonWeek() {
  if (scenarioActive) { error = 'dev scenario: saving is disabled'; return; }
  // existing body...
}

function saveSeasonFinal() {
  if (scenarioActive) return;
  // existing body...
}
```

At the beginning of the existing `startDraft()`, set `scenarioActive = false;` before the normal draft/autosave path resumes. Do not clear or overwrite any saved slot merely by loading a scenario. The scenario loader above uses the in-memory store and does not call `loadDraft()`, because that function intentionally persists.

### 5. Mount only behind the development gate

Near the end of the App.svelte markup, inside the app root:

```svelte
{#if import.meta.env.DEV && DEV && DevScenarioDrawer}
  <DevScenarioDrawer onrun={runDevScenario} />
{/if}
```

This is both a compile-time development gate and a deliberate `?dev` opt-in. Do not expose a scenario query or drawer in production.

## Important integration caveat

The scenario loader uses the same store/VM path as the application, but the drawer currently renders a compact proof view rather than embedding the full DraftBoard component. That keeps this delivery isolated and avoids changing the product shell during S15 close-out. If the Owner wants the actual screen to be rendered in the app, the next integration step is to pass the scenario's in-memory store/VM through the existing shell state and reuse DraftBoard, without persisting the fixture.

## Verification status

The GitHub source was inspected and the code was authored against the actual S15 interfaces. This ChatGPT session does not have a repository terminal or npm runtime attached, so **the new npm commands and tests have not been executed here**. Treat test results as UNKNOWN until run. No build, Playwright, or browser result is claimed.

## Fence

No existing S15 file, engine file, engine pin, protected constant, auth/sync/server file, Cloudflare configuration, Z.ai branch, or production deployment is changed by this delivery. All new files are on the GPT-owned branch.
