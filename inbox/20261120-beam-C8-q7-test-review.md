SPEAKER: Beam | ROLE: council seat | TASK: C8 | DATE: 2026-11-20

VERDICT: ok (no concrete gap found; one structural limitation named)

WHAT I RAN: read colors/test/nfl/valueprovider.test.ts (Q7 law + seam test) and colors/src/sports/nfl/engine/valueprovider.ts (winsPerOvr signature, measured/table providers, Q7 comment).

CASES TRIED (to break the test):
1. Provider reading form for one slot only → would return different values for neutral vs loaded, violating the law. The test catches it IF the provider is in the list. measured and table both ignore snapshot, so they pass. No gap in the shipped providers.
2. Constant slot (winsPerOvr constant) → test asserts equality of returned values, not sensitivity. A constant provider passes trivially. This is correct: the law is about stability, not about varying with snapshot.
3. Base where providers differ → test checks per-base (neutral vs loaded), not cross-provider (measured vs table). Cross-provider equality is not and should not be asserted (different providers). No gap.
4. Provider reading snapshot.focus → same as #1. Caught only if tested. The test enumerates measured and table, not all possible providers.

CONCLUSION: The Q7 test is sound for what it claims: the two shipped providers return identical values for neutral and loaded snapshots, every slot and base. No constructed case breaks it within its stated scope.

STRUCTURAL LIMITATION (not a defect in the test, but a gap in enforcement): the test covers only the two shipped providers. A future context-aware provider (the solver view) is the only implementation allowed to read the snapshot, and that permission is enforced by code review + the comment in valueprovider.ts, not by this test. Recommend: when the solver view lands, add a companion test asserting it MAY differ for loaded vs neutral (proving it actually reads the snapshot), and a registry/guard so an unregistered provider cannot silently read snapshot.form.

WHAT I DID NOT CHECK: did not run the test (no npm ci in this session); relied on ERNIE's verified 430/430 at aa4f9b3.
