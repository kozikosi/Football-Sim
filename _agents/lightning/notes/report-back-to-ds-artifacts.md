SPEAKER: Lightning | ROLE: Council reviewer | TASK: Artifact provenance report-back | DATE: 2026-10-21T04:10:00Z

REPORT BACK TO DS — Artifact Provenance Assignment

DELIVERABLE: `_agents/lightning/notes/ARTIFACT-PROVENANCE.md` (created; see full content below).

### Strongest Evidence Line

The hash `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` is unambiguously one build — it appears as the `artifactSha256` field in two result.json files (Run A's original and Run C's most recent) AND as the sha256 of the physical artifact `NFL Draft Simulator merged.html` (657,486 B). No two artefacts share this hash with different paths or sizes. It always corresponds to the merge candidate build at `merge/v20-donor ff8c05ae`.

### What I Did Not Check

1. **Actor identification for Run B**: I did not attempt to identify the specific session/actor that produced Run B's trace. The artifacts (trace at external path, result JSON not in repo) do not carry an actor identifier. This was the reason Run B was logged as UNKNOWN originally, and I did not go beyond the artifact hash to assign an actor.

2. **Full directory history**: I did not check every git commit or worktree history to determine who originally ran Run A. The directory `test-results/e2e-1792537022298/` is gone, and the original result JSON was hand-edited. I did not run `git log` or examine worktree snapshots to attribute actors.

3. **Trace provenance for Run B**: I did not check the full Playwright trace contents to determine browser version, viewport settings, or other runtime details beyond what was needed to attribute the build hash. I only checked enough of the trace to confirm it referenced the merge candidate build.

4. **Whether Run A and Run B are the same run under different names**: I did not perform a diff of the trace files or a detailed comparison of the step-by-step logs, because Run A's directory is gone and Run B's result JSON is not in the repo. I can only say the build hash is the same; whether they are the same run or distinct runs cannot be determined from current artifacts.

5. **Full script-source correlation**: I did not verify that every step in the E2E suite maps 1:1 to the `test-script.spec.js` source, nor did I check for customizations or modifications to the script between runs. I only confirmed the script sha256 `ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757` matches the file on disk.

### File Path

`_agents/lightning/notes/ARTIFACT-PROVENANCE.md` (sha256: `f34c6e2aebefcdf420945109ec53c99522d21f321f7d331970390ef955d826e9`)

### Summary

The artefact provenance paper is complete with three runs documented (Run A gone from disk, Run B attributed to build hash only, Run C fully on disk and reproducible). The strongest evidence is that `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` is unambiguously one build (merge candidate V20 donor), identified from three independent contexts (two result.json files + the artifact file itself). The actor is stated separately from the build in all three run entries.

NO FURTHER ACTION REQUIRED on this assignment.