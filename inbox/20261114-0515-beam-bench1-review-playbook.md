SPEAKER: beam | ROLE: council | TASK: Lane 3 — BENCH-1 Review Playbook (pre-written for ruling day) | DATE: 2026-11-14T05:15Z

## Purpose

Pre-written checklist for the Owner to verify Z.ai's v4 artifacts when they land. No engine touched, no run required. Design-only.

## 1. MANIFEST verification (adapt Ernie's sketch)

```bash
cd /tmp/zai-extract && python3 - <<'PY'
import hashlib, pathlib, sys
root = pathlib.Path('.')
manifest = root / 'MANIFEST'  # or CHECKSUMS.txt
ok = True
for line in manifest.read_text().splitlines():
    if not line.strip(): continue
    parts = line.split()
    expected_hash = parts[0]
    filepath = parts[-1]
    actual = hashlib.sha256((root / filepath).read_bytes()).hexdigest()
    if actual != expected_hash:
        print(f"MISMATCH: {filepath}")
        ok = False
print("ALL OK" if ok else "FAILURES ABOVE")
PY
```

Expected: exit 0, 0 mismatches. If any mismatch, the handoff is corrupted — do not trust any receipt.

## 2. Result-JSON schema checklist (keyed to spec §5/§7)

For each arm's result JSON, verify these fields exist and are non-null:
- `arm_id` (string, one of: arm-react, arm-vue, arm-svelte, arm-sveltekit, arm-next, arm-nuxt, arm-solid, arm-lit, arm-solidstart)
- `install.exit_code` (integer, expected 0)
- `build.exit_code` (integer, expected 0)
- `build.wall_seconds` (number)
- `build.js_bytes` (integer)
- `build.gzip_bytes` (integer)
- `typecheck.exit_code` (integer, expected 0)
- `typecheck.error_count` (integer, expected 0)
- `unit_tests.passed` (integer)
- `unit_tests.failed` (integer, expected 0)
- `e2e_tests.passed` (integer, expected 5)
- `e2e_tests.failed` (integer, expected 0)
- `leakage.findings` (integer, expected 0)
- `drift.files_changed` (integer, expected 0)
- `file_probe.app_children` (integer, expected >0 for PASS)
- `golden_hash` (string, must match 0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5)

Missing or null fields = schema violation. Reject the filing.

## 3. G5 string-identity (DOM-text-hash) verification per RIFinteraction

For each arm, run the Playwright spec and capture the DOM text hash:
```bash
npx playwright test --grep "offensive-focus" --reporter=json > result.json
# Extract the DOM text hash from the JSON output
python3 -c "import json; d=json.load(open('result.json')); print(d['suites'][0]['specs'][0]['tests'][0]['results'][0]['status'])"
```
Expected: "passed" for all 9 arms. If any arm fails, the contract is violated — the framework's rendering diverges from the shared engine output.

## 4. Tie-rule application math (CI overlap + ratio ≥ 1.2)

For any two arms A and B on a metric (e.g., build time, bundle size):
- CI_overlap = (CI_A_upper > CI_B_lower) and (CI_B_upper > CI_A_lower)
- ratio = max(mean_A, mean_B) / min(mean_A, mean_B)
- If CI_overlap is true AND ratio < 1.2: declare TIE (no discriminant).
- If CI_overlap is false OR ratio >= 1.2: declare DIFFERENCE (discriminant found).

Worked example: Arm A build time = 0.7s ± 0.1s (CI: 0.6-0.8), Arm B = 3.8s ± 0.5s (CI: 3.3-4.3). CI_overlap = (0.8 > 3.3) = false → DIFFERENCE. Ratio = 3.8/0.7 = 5.4 >= 1.2 → DIFFERENCE. Conclusion: Arm A builds faster (discriminant).

## 5. Ratification-packet mechanics (per-budget rows)

For each budget category (install time, build time, bundle size, type-check time, test time), produce a row:
| Category | Arm | Value | CI | Verdict |
|---|---|---|---|---|
| Build time | svelte | 0.7s | ±0.1 | FASTER |
| Build time | vue | 3.8s | ±0.5 | SLOWER |

Verdict options: FASTER, SLOWER, TIE (per tie-rule above). No "winner" — just per-category verdicts.

## 6. How to cite in your decision note

Template: "On [date], Z.ai delivered v4 artifacts (commit [sha], zip [hash]). MANIFEST verified: [N]/[N] OK. All 9 arms passed Playwright 5/5. [N] arms showed discriminant on [metric]. [N] arms tied on [metric]. The evidence supports [conclusion] with [confidence level]. Decision: [Owner's call]."

Labels: VERIFIED (ran it), REPORTED (Z.ai says so), INFERRED (reasoned), UNKNOWN (not checked).
