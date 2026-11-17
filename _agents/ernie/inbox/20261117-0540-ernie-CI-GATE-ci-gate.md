SPEAKER: ernie | ROLE: council | TASK: CI-GATE — is the production build a real gate now? | DATE: 2026-11-17T05:40Z
FOR: CI-GATE

**Tip tested: `5c808472`.** The gate change itself is `7828d914` ("CI: the production build is a gate (remove continue-on-error)").

# The workflow reading

`.github/workflows/ci.yml` — the header comment states the change and the date:

> `# Minimal CI for colors/ (Architect, 14 Nov 2026). The production build is a GATE since 17 Nov 2026 (Owner: flip it when green; it passed on Node 24 in the last three runs). The type check and the tests stay REPORT-ONLY: they have continue-on-error…`

The build step (lines 33-34):

```yaml
- name: "Production build (GATE since 17 Nov 2026: a failing build fails the run)"
  run: npm run build
```

**No `continue-on-error` on the build step.** The two remaining `continue-on-error: true` entries are at lines 29 and 32 — the **type check** (`npm run tsc:check`) and the **tests** (`npm test`) — which is exactly the scope the header describes. So the removal is **correctly targeted**: the gate is the build, and the report-only steps are still report-only.

# The last three runs, per run

| run | sha | build step | run conclusion | matched? |
|---|---|---|---|---|
| 44010235789 | `5c808472` | **success** | success | yes |
| 44006643913 | `db33bfa0` | **success** | success | yes |
| 44002436907 | `7828d914` | **success** | success | yes |

Full step list in all three: Type check → success, Tests → success, **Production build → success**, job `colors` → success, run → success. The run's overall status **matched** the build step in every case.

# Can I point to a run where a build failure would have failed the run?

**No — and I will not manufacture one.** No run in the last twelve on this branch has a failed build step; every one is `success`. So the *positive* claim — "the gate is real" — rests on two things, and I can only give you one of them as an observation:

1. **Observed:** the workflow file has no `continue-on-error` on the build step (above). That is a *reading*, and under GitHub's semantics a step without `continue-on-error` that exits non-zero fails the job and the run. VERIFIED as a reading.
2. **Not observed:** an actual run where a build failed and the run went red. I checked the twelve most recent runs — all success. **UNKNOWN / does not exist yet.**

There is one historical near-miss worth recording rather than claiming: my earlier session noted run `43749063203` (sha `6dcf13b2`) as a case where the build *log* showed an error while the run was green. I re-checked it this round and the API reports **build step `success`, run `success`** — so I cannot substantiate the "green on a red build" story from the API, and I am withdrawing it as evidence. If it was ever true, it was pre-gate and it is not reproducible now.

# Verdict

- **The workflow change is correct and correctly scoped:** the build is a gate; the type check and tests remain report-only. **VERIFIED (reading).**
- **The last three runs are consistent with it:** build step success, run success, status matched. **VERIFIED (three runs).**
- **"The gate is real" is not empirically demonstrated:** there is no run with a build failure. **UNKNOWN.** The claim rests on the workflow file, not on an observed red run.

**What would settle it in one action:** a throwaway branch with a deliberate build error (e.g. a bad import in `colors/src/main.ts`), pushed to a test branch, and the run observed. Until someone does that, "the build is a gate" is a correct reading of the YAML and an untested behaviour.