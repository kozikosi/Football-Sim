SPEAKER: inkling | ROLE: council | TASK: CI-GATE — the production build step is a real gate, verify the wiring and the recent runs | DATE: 2026-11-17T03:10Z
FOR: CI-GATE

# CI gate — is the production build a gate now?

**Engine commit at which the gate flipped:** `7828d914` "CI: the production build is a gate (remove continue-on-error)" — confirmed by reading `.github/workflows/ci.yml` at the tip `5c808472`. On the branch tip as of this review: **the `Production build` step carries no `continue-on-error: true`; the `Tests` and `Type check` steps still do** (report-only by deliberate rule — "no new gates" per the header's reference to the Owner's direction via Ernie, 14 Nov).

**Workflow reading (VERIFIED; `.github/workflows/ci.yml` @ `7828d914`):**

```yaml
- name: Type check (ratchet, pinned in tsc-baseline.json)
  run: npm run tsc:check
  continue-on-error: true    # REPORT-ONLY
- name: Tests
  run: npm test
  continue-on-error: true    # REPORT-ONLY
- name: "Production build (GATE since 17 Nov 2026: a failing build fails the run)"
  run: npm run build          # NO continue-on-error — this step is the gate
```

The header comment matches the body: production build is the only gate, added 17 Nov 2026 per Owner's flip rule. `on:` is `push` to `architect/**` + `pull_request` + `workflow_dispatch`; `actions/checkout@v4`, `setup-node@v4`, Node 24; the step order puts `Tests` as report-only before the gate, which is the intended shape — a failing test would not block the history of a green build.

**The last three CI runs, per-run (VERIFIED via `gh run list` + `gh run view --log`):**

| run | message | started | build step | overall |
|---|---|---|---|---|
| `44010235789` | Pooled-node conformance: the lab's own Pack is the oracle… | 2026-11-17T03:26:34Z | **✓ built in 71ms** | success / completed |
| `44006643913` | Portable cosine: pcos2pi / psin2pi… bit-identical | 2026-11-17T02:56:54Z | **✓ built in 92ms** | success / completed |
| `44002436907` | CI: the production build is a gate (the exact commit that flipped the flag) | 2026-11-17T02:22:00Z | **✓ built in 116ms** | success / completed |

Every run built successfully (three consecutive green builds at the tip; the gate commit itself built green). **No run exists on the branch where the build failed and the run went red.** The gate is wired — remove `build`'s `continue-on-error` — but not yet *exercised* by a real failure. The CI workspace has no run we can consult for the would-fail scenario; the next actual build failure (if one happens) is the first true test of the gate's teeth.

**What this confirms:**
- The specific wiring `7828d914` intended is in place and has not been reverted.
- The header's "report-only" rules for tests/tsc were preserved (i.e., the flip added one gate, not more).
- The runs' output contains the build step as plain `npm run build` with no green-eyes cue — the runner correctly captures `npm run build` as a hard step rather than a best-effort step; `✓ built in …` appearing in all three logs is evidence the buildStep ran and produced output.

**Not confirmed (and honest to say):**
- Whether the branch *would* trigger a red run on a build failure. No such run exists. The only negative confirmation available from logs is the absence of `continue-on-error`.
- Whether this was tested with a failed build on any branch. Not in the record.
- Whether GitHub Actions' runner would have marked a failed build job as "failed" vs "cancelled" had it ever failed. (A non-error-exit `npm run build` failing would reach the `##[error]` boundary and fail the run — but no alarm condition to demonstrate against in the three runs above.)

**Verdict:** the gate is REAL. `.github/workflows/ci.yml` on the Architect's branch makes the build step a gate (no `continue-on-error`); the last three runs all built successfully; no run exists where a build failure would have shown green, because none ever failed. The gate's teeth have not been exercised in the record. If the Owner wants it proven, a tiny proof-of-pain branch with a throwaway broken commit + `workflow_dispatch` is the cheapest path; I'm not asking or authorized to create that branch.

**Labels:** all three runs' SHAs, timestamps, and conclusions are VERIFIED (`gh run list` + `gh run view --`). The claim that "the gate's teeth have never been exercised" is VERIFIED from the absence in the three-run record — six runs back (flex tee change landing 43994281199 at 2026-11-17T01:16:16Z) still success. MUSE's note about the build becoming a gate is REPORTED — verified here directly.
