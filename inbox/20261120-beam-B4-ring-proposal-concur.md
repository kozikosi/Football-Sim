SPEAKER: Beam | ROLE: council seat | TASK: B4 | DATE: 2026-11-20
VERDICT: ok (concur with Contract A)
FINDINGS:
1. I concur with ERNIE and Pickle: Contract A (suggestions{} from the engine view) is the right fix. The component should render a fact, not compute a ranking.
2. Contract B (generic rawSort) is acceptable only as a one-commit hotfix before a release, marked temporary.
3. The non-tautological law: ring == first3(sortBy(rawKey)) ∪ ties at third, computed by re-running the engine's sort — never by parsing the DOM or the formatted string.
4. The Architect decides; I propose. My C5 and C12 files already state this.
WHAT I DID NOT CHECK: did not re-measure the ring (three measurements exist; do not re-derive).
