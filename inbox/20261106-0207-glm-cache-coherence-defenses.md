SPEAKER: GLM | ROLE: council seat, analytics/scribe lane | TASK: cache-coherence defenses (owner-letter follow-up) | DATE: 2026-11-06T02:07Z

FOR: P-3/OWNER 5 Nov letter §1d (my own letter response "Two cheap defenses" — the Owner asked these
become a concrete proposal; one proposal file, exact behavior and checks)

IDEA: two defenses against the one offline deploy-does-not-mean-deployed loan the service worker creates.

## What actually breaks (the mechanism, from the build as shipped)

`cache coherence at 2.5% p99`: the service worker installs a cache, serves from cache when offline or on
his tab load racing a redeploy (a tab that loads 300 ms before the deploy finishes reads the old runtime
and the old files; a tab reopened two days later reads the new runtime is the *reverse* case). Two failure
families result:

1. **Old runtime + new engine code ("half-cached")**: SW precache incomplete for a chunked bundle →
   runtime JS loads but a lazy route/screen chunk misses the cache → blank screen offline instead of a
   working app. (Structural: chunked bundle, §3c of my letter response.)
2. **Version skew between runtime and save envelope ("half-loaded")**: cached app JS is an old version;
   the OWNER's save sits in localStorage; the old engine tries to render/apply a save from a newer build.
   Silent corruption of the user's own season is the worst outcome in the whole offline design, because
   it strikes the one user offline where "refresh and it fixes itself" cannot work.

## Defense 1 — envelope version floor (the save-side contract)

Exact behavior to build, as one screen of code in the loader:

```ts
// envelope header (already has: version, hash, platform tag — quoted from the locked contract)
if (Number(save.envelope_version) < RUNTIME.minEnvelopeVersion) {
  // refuse to simulate, refuse to silently "repair"; show a plain-language screen:
  // "This save is from an older build. It can be viewed but not played until an
  //  importer upgrades it. [View copy] [Delete] [Export]"
}
```

- The floor lives in ONE constant in the runtime (`minEnvelopeVersion`); the envelope spec's version is
  contract-tested (already proposed to add a conformance test: `envelope.conform.test.ts`), so a contract
  change cannot drift the floor without one failing check.
- Refusal (not best-effort load): deterministic engines make a downgrade-load a *reproducible wrong
  answer*, which is exponentially worse than its random-engine twin. This is the same shape as the
  release-note floor the envelope contract already carries.
- The Property-based determinism gate proposed on 6 Nov by Beam (`inbox/20261106-0200-beam-OP-add-property-based-determinism-gat.md`,
  REPORTED — I have not read the file this session) is the engine-side habit this save-side habit pairs
  with; if that lands, note the floor as its skewed-reading counterpart.

## Defense 2 — airplane-mode CI run (fail the PR when offline breaks)

One Playwright job (`test/offline.mjs` or as part of the existing Playwright config):

```
1. build (vite build), serve dist/ locally
2. context = browser.newContext(); page loads the app once (SW installs, cache warms)
3. context.setOffline(true)
4. hard reload the page (bypass = stale-runtime case #1)
5. click through: new draft → draft rounds 1-3 → save → hard reload → load save
6. assert no console errors, draft completes, playoff game simulates, save round-trips bit-identical
   (JSON.stringify equality of the envelope before/after offline reload — the determinism gate free-rides)
7. EJECT NUKE: assert the budget shows no network requests in the offline phase (Playwright request log)
```

- Runs in the same CI lane as the golden-match test (5 min budget): worst-possible-cost design; it
  should lap pre-step us catching the SW-cache drift, the chunk-miss class (#1) and the stale-runtime
  save read (#2). One CI line kills both failure families.
- Named deployment test in CI terms, not a "the waiter in the tent" story: it IS the product behavior the
  Owner requires offline; the fixture is free because the app is deterministic.

## What needs the Owner/Architect

1. Owner: the plain-language refusal copy for Defense 1 (the proposed text is above; his taste rules).
2. Architect: the floor constant position in the loader (engine vs storage facade — I propose storage
   facade only, since view of anything below engine is not the engine's problem).
3. `context.setOffline(true)` needs no test-timeout extension: it runs the SAME build path as the
   determinism PR gate; if the team ever wants the gate to also flip the flag, the mode where the job
   runs offline-only is a separate lane label (WINDOWS only: the first run catches most).
